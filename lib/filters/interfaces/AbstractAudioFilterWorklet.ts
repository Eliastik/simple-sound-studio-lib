import WorkletScriptProcessorNodeAdapter from "../../workletPolyfill/WorkletScriptProcessorNodeAdapter";
import AbstractAudioFilter from "./AbstractAudioFilter";
import Constants from "../../model/Constants";
import "../../workletPolyfill/AudioWorkletProcessorPolyfill";
import RegisterProcessorPolyfill from "../../workletPolyfill/RegisterProcessorPolyfill";
import utilFunctions from "../../utils/Functions";
import { FilterSettingValue } from "@/model/filtersSettings/FilterSettings";

export default abstract class AbstractAudioFilterWorklet<T> extends AbstractAudioFilter {

    protected currentWorkletNode: AudioWorkletNode | WorkletScriptProcessorNodeAdapter | null = null;

    protected fallbackToScriptProcessor = false;

    protected keepCurrentNodeIfPossible = false;

    /**
     * Return the worklet name (as registered with method registerProcessor)
     */
    abstract get workletName(): string;

    /**
     * Return the path to worklet file
     */
    abstract get workletPath(): string;

    /**
     * Receive event from the worklet
     */
    abstract receiveEvent(message: MessageEvent<T>): void;

    /**
     * Initialize the audio worklet by loading the module
     * @param audioContext The audio context
     */
    async initializeWorklet(audioContext: BaseAudioContext): Promise<void> {
        this.stop();

        if (!utilFunctions.isAudioWorkletCompatible(audioContext)) {
            console.error("Audio Worklets not supported on this browser. Fallback to ScriptProcessor");
            this.fallbackToScriptProcessor = true;
            return;
        }

        const workletPath = (this.configService ? this.configService.getWorkletBasePath() : "") + this.workletPath;

        await audioContext.audioWorklet.addModule(workletPath)
            .catch(e => {
                console.error(`Error when loading Worklet (${workletPath}) for filter ${this.id}. Fallback to ScriptProcessor. Exception:`, e);
                this.fallbackToScriptProcessor = true;
            });
    }

    /**
     * This method checks if audio worklet are enabled
     * @param audioContext
     */
    protected isAudioWorkletEnabled() {
        if (this.configService) {
            return this.configService.isAudioWorkletEnabled();
        }

        return Constants.ENABLE_AUDIO_WORKLET;
    }

    /**
     * Check if the Worklet is available and can be used
     * @returns true if this is the case, false otherwise
     */
    protected isAudioWorkletAvailable() {
        return this.isAudioWorkletEnabled() && !this.fallbackToScriptProcessor;
    }

    /**
     * Initialize the AudioWorkletNode or fallback to ScriptProcessorNode
     * @param context The audio context
     * @param workletName The worklet name
     */
    private initializeNode(context: BaseAudioContext, workletName: string) {
        if (this.isAudioWorkletAvailable()) {
            // Standard Audio Worklet
            this.currentWorkletNode = new AudioWorkletNode(context, workletName);
        } else {
            // Fallback to ScriptProcessorNode (polyfill)
            const processor = RegisterProcessorPolyfill.getProcessor(workletName);

            if (processor) {
                this.currentWorkletNode = new WorkletScriptProcessorNodeAdapter(context, processor, this.configService!.getBufferSize());
            } else {
                throw new Error(`No processor registered with name ${workletName} for filter ${this.id} to use the fallback/polyfill for AudioWorklet. Make sure you have created the class.`);
            }
        }

        if (this.currentWorkletNode && this.currentWorkletNode.port) {
            this.currentWorkletNode.port.onmessage = message => this.receiveEvent(message);
        }
    }

    /**
     * Apply current settings to the audio worklet node.
     * Uses the getSettings method to extract the settings.
     */
    protected applyCurrentSettingsToWorklet() {
        const currentSettings = this.getSettings();

        for (const settingKey of Object.keys(currentSettings)) {
            this.setWorkletSetting(settingKey, currentSettings[settingKey]);
        }
    }

    /**
     * Set a setting of the Worklet
     * @param settingKey The setting name
     * @param currentSettings The setting value
     */
    protected setWorkletSetting(settingKey: string, settingValue: FilterSettingValue) {
        if(this.currentWorkletNode && this.currentWorkletNode.parameters) {
            const settingFromWorklet = this.currentWorkletNode.parameters.get(settingKey);

            if (settingFromWorklet) {
                settingFromWorklet.value = settingValue as number;
                settingFromWorklet.setValueAtTime(settingValue as number, 0);
            }
        }
    }

    /** Default implementation for GetNode - AbstractAudioFilterWorklet */
    getNode(context: BaseAudioContext) {
        if (!this.keepCurrentNodeIfPossible || !this.currentWorkletNode
            || this.currentWorkletNode.context != context) {
            this.stop();
            this.initializeNode(context, this.workletName);
        }

        this.applyCurrentSettingsToWorklet();
        this.setEnabled(this.isEnabled());

        if (this.currentWorkletNode) {
            if (this.currentWorkletNode instanceof WorkletScriptProcessorNodeAdapter) {
                return {
                    input: this.currentWorkletNode.node!,
                    output: this.currentWorkletNode.node!,
                };
            }

            return {
                input: this.currentWorkletNode,
                output: this.currentWorkletNode,
            };
        }

        throw new Error("Worklet node has not yet been created");
    }

    /**
     * Stop the current worklet node. The worklet need to respond to "stop" events.
     */
    stop() {
        if (this.currentWorkletNode && this.currentWorkletNode.port) {
            this.currentWorkletNode.port.postMessage("stop");
            this.currentWorkletNode.port.onmessage = null;
        }

        this.currentWorkletNode = null;
    }

    /**
     * Pass the current disabled/enabled state to the worklet.
     * The worklet need to respond to "enable"/"disable" events.
     * @param state The current disabled/enabled state
     */
    setEnabled(state: boolean): void {
        if (this.currentWorkletNode && this.currentWorkletNode.port) {
            this.currentWorkletNode.port.postMessage(state ? "enable" : "disable");
        }

        super.setEnabled(state);
    }

    public isWorklet(): boolean {
        return true;
    }
}
