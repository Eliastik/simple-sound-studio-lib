// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { PitchShifter } from "soundtouchjs";
import Constants from "../model/Constants";
import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import AudioFilterEntrypointInterface from "./interfaces/AudioFilterEntrypointInterface";
import { AudioFilterNodes } from "../model/AudioNodes";
import SoundtouchSettings from "../model/filtersSettings/SoundtouchSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import utilFunctions from "../utils/Functions";

export default class SoundtouchWrapperFilter extends AbstractAudioFilterWorklet<void> implements AudioFilterEntrypointInterface {

    private speedAudio = 1;
    private frequencyAudio = 1;
    private currentSpeedAudio = 1;
    private currentPitchShifter: PitchShifter;
    private currentBufferSource: AudioBufferSourceNode | null = null;
    private isOfflineMode = false;

    constructor() {
        super();
        this.setDefaultEnabled(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    receiveEvent(message: MessageEvent<void>): void {
        // Do nothing
    }

    get workletPath(): string {
        return Constants.WORKLET_PATHS.SOUNDTOUCH;
    }

    get workletName(): string {
        return Constants.WORKLET_NAMES.SOUNDTOUCH;
    }

    getEntrypointNode(context: BaseAudioContext, buffer: AudioBuffer, offline: boolean): Promise<AudioFilterNodes> {
        this.isOfflineMode = offline;

        this.cleanUpOldNodes();

        // In offline (compatibility) mode
        const { isWorklet, renderWithSoundtouch } = this.getCurrentRenderingMode();

        if(renderWithSoundtouch) { // Rendering with soundtouch enabled
            if (isWorklet && utilFunctions.isAudioWorkletCompatible(context)) {
                return this.renderWithWorklet(buffer, context);
            }

            if(offline) {
                return this.renderWithScriptProcessorNode(buffer, context);
            }

            // Not in offline mode: get classic soundtouch script processor node
            this.currentPitchShifter = this.getSoundtouchScriptProcessorNode(buffer, context);
            this.updateState();

            return Promise.resolve({
                input: this.currentPitchShifter,
                output: this.currentPitchShifter
            });
        }

        // Rendering with soundtouch disabled
        // Just return an audio buffer source node
        const bufferSource = this.constructBufferSourceNode(context, buffer);

        return Promise.resolve({
            input: bufferSource,
            output: bufferSource
        });
    }

    private getSoundtouchScriptProcessorNode(buffer: AudioBuffer, context: BaseAudioContext): AudioNode {
        return new PitchShifter(context, buffer, Constants.SOUNDTOUCH_PITCH_SHIFTER_BUFFER_SIZE);
    }

    /**
     * Setup an audio buffer source from the audio buffer
     * @param context The audio context
     * @param buffer The buffer
     * @returns The AudioBufferSourceNode
     */
    private constructBufferSourceNode(context: BaseAudioContext, buffer: AudioBuffer) {
        const bufferSource = context.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.start();

        this.currentBufferSource = bufferSource;

        return bufferSource;
    }

    /** Cleanup old nodes (worklets, pitch shifter) */
    private cleanUpOldNodes() {
        if (this.currentPitchShifter) {
            this.currentPitchShifter.disconnect();
            this.currentPitchShifter._filter = null;
        }

        if (this.currentBufferSource) {
            this.currentBufferSource.disconnect();
            this.currentBufferSource = null;
        }
    }

    /**
     * Use script processor node (deprecated) to render the audio buffer with Soundtouch, according to the current settings.
     * Not working on Firefox
     * @param buffer Audio buffer
     * @param context Audio context
     * @returns A promise resolving to audio nodes with the rendered audio as a buffer source
     */
    private async renderWithScriptProcessorNode(buffer: AudioBuffer, context: BaseAudioContext): Promise<AudioFilterNodes> {
        const durationAudio = utilFunctions.calcAudioDuration(buffer, this.speedAudio);
        const offlineContext = new OfflineAudioContext(2, context.sampleRate * durationAudio, context.sampleRate);

        this.currentPitchShifter = this.getSoundtouchScriptProcessorNode(buffer, offlineContext);

        this.updateState();

        this.currentPitchShifter.connect(offlineContext.destination);

        const renderedBuffer = await offlineContext.startRendering();

        const bufferSourceRendered = this.constructBufferSourceNode(context, renderedBuffer);

        this.currentPitchShifter.disconnect();

        return {
            input: bufferSourceRendered,
            output: bufferSourceRendered
        };
    }

    /**
     * Use audio worklet to render the audio buffer with Soundtouch, according to the current settings.
     * Working in Firefox and Chrome
     * @param buffer Audio buffer
     * @param context Audio context
     * @returns A promise resolving to audio nodes with the rendered audio as a buffer source
     */
    private renderWithWorklet(buffer: AudioBuffer, context: BaseAudioContext): Promise<AudioFilterNodes> {
        try {
            const bufferSource = this.constructBufferSourceNode(context, buffer);

            const workletNode = this.getNode(context);

            // Connect the node for correct rendering
            bufferSource.connect(workletNode.input);

            // Setup pitch/speed of Soundtouch
            this.updateState();

            return Promise.resolve({
                input: workletNode.input,
                output: workletNode.output
            });
        } catch (e) {
            // Fallback to script processor node
            console.error(e);
            return this.renderWithScriptProcessorNode(buffer, context);
        }
    }

    get order(): number {
        return 2;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.SOUNDTOUCH;
    }

    getSettings(): SoundtouchSettings {
        return {
            speedAudio: this.speedAudio,
            frequencyAudio: this.frequencyAudio
        };
    }

    protected isAudioWorkletEnabled() {
        if (this.configService) {
            return this.configService.isSoundtouchAudioWorkletEnabled();
        }

        return Constants.ENABLE_SOUNDTOUCH_AUDIO_WORKLET;
    }

    private getCurrentRenderingMode() {
        // If the settings are untouched, we don't use Soundtouch
        if (this.isOfflineMode && (!this.isEnabled() || (this.speedAudio == 1 && this.frequencyAudio == 1))) {
            return { isWorklet: false, renderWithSoundtouch: false };
        }

        if (this.isAudioWorkletAvailable()) {
            return { isWorklet: true, renderWithSoundtouch: true };
        }

        return { isWorklet: false, renderWithSoundtouch: true };
    }

    updateState(): void {
        const { isWorklet } = this.getCurrentRenderingMode();

        this.currentSpeedAudio = 1;

        let pitch = 1;
        let tempo = 1;

        if (this.isEnabled()) {
            tempo = this.speedAudio;

            if(isWorklet) {
                pitch = this.frequencyAudio * (1 / this.speedAudio);
            } else {
                pitch = this.frequencyAudio;
            }

            this.currentSpeedAudio = this.speedAudio;
        }

        if (isWorklet) {
            this.setWorkletSetting("pitch", pitch);

            if (this.currentBufferSource) {
                this.currentBufferSource.playbackRate.value = tempo;
            }
        } else if(this.currentPitchShifter) {
            this.currentPitchShifter.pitch = pitch;
            this.currentPitchShifter.tempo = tempo;
        }
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        if (!utilFunctions.isSettingValueValid(value)) {
            return Promise.resolve();
        }

        const valueFloat = parseFloat(value as string);

        switch (settingId) {
        case "speedAudio":
            this.speedAudio = valueFloat;
            break;
        case "frequencyAudio":
            this.frequencyAudio = valueFloat;
            break;
        // TODO add key setting?
        default:
            break;
        }

        this.updateState();

        return Promise.resolve();
    }

    setEnabled(state: boolean): void {
        super.setEnabled(state);

        this.updateState();
    }

    getSpeed(): number {
        return this.currentSpeedAudio;
    }
}
