// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { PitchShifter } from "soundtouchjs";
import Constants from "../model/Constants";
import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import AudioFilterEntrypointInterface from "./interfaces/AudioFilterEntrypointInterface";
import { AudioFilterNodes } from "../model/AudioNodes";
import utils from "../utils/Functions";
import SoundtouchSettings from "../model/filtersSettings/SoundtouchSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import utilFunctions from "../utils/Functions";

export default class SoundtouchWrapperFilter extends AbstractAudioFilterWorklet<void> implements AudioFilterEntrypointInterface {

    private speedAudio = 1;
    private frequencyAudio = 1;
    private currentSpeedAudio = 1;
    private currentPitchShifter: PitchShifter;
    private isOfflineMode = false;

    constructor() {
        super();
        this.setDefaultEnabled(true);
    }

    async initializeWorklet(): Promise<void> {
        // Do nothing
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

    async getEntrypointNode(context: BaseAudioContext, buffer: AudioBuffer, offline: boolean): Promise<AudioFilterNodes> {
        this.isOfflineMode = offline;

        this.cleanUpOldNodes();

        // In offline (compatibility) mode
        const { isWorklet, renderWithSoundtouch } = this.getCurrentPitchShifter();
        
        if(renderWithSoundtouch) { // Rendering with soundtouch enabled
            if (isWorklet && utils.isAudioWorkletCompatible(context)) {
                return this.renderWithWorklet(buffer, context);
            } else {
                if(offline) {
                    return this.renderWithScriptProcessorNode(buffer, context);
                } else {
                    // Not in offline mode: get classic soundtouch script processor node
                    this.currentPitchShifter = this.getSoundtouchScriptProcessorNode(buffer, context);
                    this.updateState();

                    return {
                        input: this.currentPitchShifter,
                        output: this.currentPitchShifter
                    };
                }
            }
        } else { // Rendering with soundtouch disabled
            // Just return an audio buffer source node
            const bufferSource = context.createBufferSource();
            bufferSource.buffer = buffer;
            bufferSource.start();

            return {
                input: bufferSource,
                output: bufferSource
            };
        }
    }

    /** Cleanup old nodes (worklets, pitch shifter) */
    private cleanUpOldNodes() {
        if (this.currentPitchShifter) {
            this.currentPitchShifter.disconnect();
            this.currentPitchShifter._filter = null;
        }
    }

    private getSoundtouchScriptProcessorNode(buffer: AudioBuffer, context: BaseAudioContext): AudioNode {
        return new PitchShifter(context, buffer, Constants.SOUNDTOUCH_PITCH_SHIFTER_BUFFER_SIZE);
    }

    /**
     * Use script processor node (deprecated) to render the audio buffer with Soundtouch, according to the current settings.
     * Not working on Firefox
     * @param buffer Audio buffer
     * @param context Audio context
     * @returns A promise resolving to audio nodes with the rendered audio as a buffer source
     */
    private async renderWithScriptProcessorNode(buffer: AudioBuffer, context: BaseAudioContext): Promise<AudioFilterNodes> {
        const durationAudio = utils.calcAudioDuration(buffer, this.speedAudio);
        const offlineContext = new OfflineAudioContext(2, context.sampleRate * durationAudio, context.sampleRate);

        this.currentPitchShifter = this.getSoundtouchScriptProcessorNode(buffer, offlineContext);

        this.updateState();

        this.currentPitchShifter.connect(offlineContext.destination);

        const renderedBuffer = await offlineContext.startRendering();

        const bufferSourceRendered = context.createBufferSource();
        bufferSourceRendered.buffer = renderedBuffer;
        bufferSourceRendered.start();

        this.cleanUpOldNodes();

        return {
            input: bufferSourceRendered,
            output: bufferSourceRendered
        };
    }

    /**
     * EXPERIMENTAL - Use audio worklet to render the audio buffer with Soundtouch, according to the current settings.
     * Working in Firefox and Chrome
     * @param buffer Audio buffer
     * @param context Audio context
     * @returns A promise resolving to audio nodes with the rendered audio as a buffer source
     */
    private async renderWithWorklet(buffer: AudioBuffer, context: BaseAudioContext): Promise<AudioFilterNodes> {
        try {
            // Setup worklet JS module
            await context.audioWorklet.addModule((this.configService ? this.configService.getWorkletBasePath() : "") + Constants.WORKLET_PATHS.SOUNDTOUCH);

            // Setup an audio buffer source from the audio buffer
            const bufferSource = context.createBufferSource();
            bufferSource.buffer = buffer;
            bufferSource.start();

            const workletNode = this.getNode(context);

            // Connect the node for correct rendering
            bufferSource.connect(workletNode.input);

            // Setup pitch/speed of Soundtouch
            this.updateState();

            return {
                input: workletNode.input,
                output: workletNode.output
            };
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

    private getCurrentPitchShifter() {
        // If the settings are untouched, we don't use Soundtouch
        if (!this.isEnabled() || (this.speedAudio == 1 && this.frequencyAudio == 1)) {
            return { isWorklet: false, renderWithSoundtouch: false };
        } else {
            if (this.isAudioWorkletEnabled() && this.speedAudio == 1) {
                return { isWorklet: true, renderWithSoundtouch: true };
            } else {
                return { isWorklet: false, renderWithSoundtouch: true };
            }
        }
    }

    updateState(): void {
        const { isWorklet } = this.getCurrentPitchShifter();

        this.currentSpeedAudio = 1;

        let pitch = 1;
        let tempo = 1;

        if (this.isEnabled()) {
            pitch = this.frequencyAudio;
            tempo = this.speedAudio;
        }

        if (isWorklet) {
            this.setWorkletSetting("pitch", pitch);
            this.setWorkletSetting("tempo", tempo);
        } else {
            if(this.currentPitchShifter) {
                this.currentPitchShifter.pitch = pitch;
                this.currentPitchShifter.tempo = tempo;
            }
        }
    }

    async setSetting(settingId: string, value: FilterSettingValue) {
        if (!utilFunctions.isSettingValueValid(value)) {
            return;
        }

        const valueFloat = parseFloat(value as string);

        switch (settingId) {
        case "speedAudio":
            this.speedAudio = valueFloat;
            break;
        case "frequencyAudio":
            this.frequencyAudio = valueFloat;
            break;
        default:
            break;
        }

        this.updateState();
    }

    setEnabled(state: boolean): void {
        super.setEnabled(state);
        this.updateState();
    }

    getSpeed(): number {
        return this.currentSpeedAudio;
    }
}
