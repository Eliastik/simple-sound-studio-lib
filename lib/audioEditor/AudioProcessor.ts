import BufferPlayer from "@/BufferPlayer";
import EventEmitter from "@/utils/EventEmitter";
import AudioContextManager from "./AudioContextManager";
import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import FilterManager from "./FilterManager";
import { ConfigService } from "@/services/ConfigService";
import { EventType } from "@/model/EventTypeEnum";
import utils from "../utils/Functions";
import Constants from "@/model/Constants";
import BufferManager from "./BufferManager";
import RendererManager from "./RendererManager";

export default class AudioProcessor extends AbstractAudioElement {
    
    /** The filter manager */
    private filterManager: FilterManager | undefined;
    /** The filter manager */
    private rendererManager: RendererManager | undefined;
    /** The context manager */
    private contextManager: AudioContextManager | undefined;
    /** The current event emitter */
    private eventEmitter: EventEmitter | undefined;
    /** The audio player */
    private bufferPlayer: BufferPlayer | undefined;
    /** The save buffer manager */
    private bufferManager: BufferManager | undefined;

    /** The current offline context */
    private currentOfflineContext: OfflineAudioContext | null | undefined;
    /** The resulting audio buffer */
    private _renderedBuffer: AudioBuffer | null = null;
    /** true if the user wanted to cancel audio rendering */
    private audioRenderingLastCanceled = false;

    /** true if initial rendering for the current buffer was done */
    initialRenderingDone = false;
    /** The sum of all the samples of the principal buffer,
     * used to detect the need to enable the compatibility mode */
    sumPrincipalBuffer: number = 0;

    constructor(contextManager: AudioContextManager | undefined, configService: ConfigService | null, eventEmitter: EventEmitter | null, bufferPlayer: BufferPlayer, filterManager: FilterManager, rendererManager:RendererManager, bufferManager: BufferManager) {
        super();

        this.contextManager = contextManager;
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.bufferPlayer = bufferPlayer;
        this.configService = configService;
        this.filterManager = filterManager;
        this.rendererManager = rendererManager;
        this.bufferManager = bufferManager;
    }

    /** Prepare the AudioContext before use */
    async prepareContext(principalBuffer: AudioBuffer | null) {
        if (this.contextManager) {
            const changed = this.contextManager.createNewContextIfNeeded(principalBuffer);

            if (changed && this.bufferManager) {
                await this.bufferManager.resetBufferFetcher();
            }
    
            if (this.contextManager.currentContext) {
                this.contextManager.currentContext.resume();
            }
        }
    }

    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    async renderAudio(principalBuffer: AudioBuffer | null): Promise<boolean> {
        await this.prepareContext(principalBuffer);

        if (!this.contextManager || !this.contextManager.currentContext) {
            throw new Error("AudioContext is not yet available");
        }

        if(!this.filterManager) {
            throw new Error("Filter manager is not available");
        }

        if (!this.rendererManager) {
            throw new Error("Renderer manager is not available");
        }

        if (!this.filterManager.entrypointFilter) {
            throw new Error("Entrypoint filter is not available");
        }

        if (!principalBuffer) {
            throw new Error("No principal buffer available");
        }

        // If initial rendering is disabled and compatibility mode is disabled, we stop here
        if (!this.initialRenderingDone && this.configService && this.configService.isInitialRenderingDisabled() && !this.configService.isCompatibilityModeEnabled()) {
            this.loadInitialBuffer(principalBuffer);
            this.initialRenderingDone = true;
            return true;
        }

        // If switching from compatiblity mode to normal mode, we stop the audio player
        if (this.configService && this.bufferPlayer && !this.configService.isCompatibilityModeEnabled() && this.bufferPlayer.compatibilityMode) {
            this.bufferPlayer.stop();
        }

        const speedAudio = this.filterManager.entrypointFilter.getSpeed();
        const durationAudio = utils.calculateAudioDuration(principalBuffer, this.filterManager, speedAudio);
        const offlineContext = new OfflineAudioContext(2, this.contextManager.currentContext.sampleRate * durationAudio, this.contextManager.currentContext.sampleRate);
        const outputContext = this.configService && this.configService.isCompatibilityModeEnabled() ? this.contextManager.currentContext : offlineContext;

        this._renderedBuffer = await this.rendererManager.executeAudioRenderers(principalBuffer, outputContext);
        this.currentOfflineContext = null;
        this.audioRenderingLastCanceled = false;


        utils.resetAudioRenderingProgress(this.eventEmitter);
        this.filterManager.setupPasstroughFilter(durationAudio, this.contextManager.currentContext);

        return await this.setupOutput(principalBuffer, outputContext, durationAudio, offlineContext);
    }
    
    /**
     * Setup output buffers/nodes, then process the audio
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @param offlineContext An offline context to do the rendering (can be omited, in this case the rendering is done in real time - "compatibility mode")
     * @returns A promise resolved when the audio processing is done. The promise returns false if the audio processing was cancelled, or if an error occurred.
     */
    async setupOutput(principalBuffer: AudioBuffer | null, outputContext: BaseAudioContext, durationAudio?: number, offlineContext?: OfflineAudioContext): Promise<boolean> {
        if (this._renderedBuffer && this.configService && this.eventEmitter && this.bufferPlayer && this.filterManager) {
            // Initialize worklets then connect the filter nodes
            await this.filterManager.initializeWorklets(outputContext);
            await this.filterManager.connectNodes(outputContext, this._renderedBuffer, false, this.configService.isCompatibilityModeEnabled());

            this.filterManager.setupPlayerSpeed(this.bufferPlayer);

            // Standard mode
            if (!this.configService.isCompatibilityModeEnabled() && offlineContext && this.filterManager.currentNodes) {
                this.currentOfflineContext = offlineContext;
                this.filterManager.currentNodes.output.connect(outputContext.destination);

                const renderedBuffer = await offlineContext.startRendering();

                if (this.contextManager && !this.loadRenderedAudio(principalBuffer, renderedBuffer)) {
                    return await this.setupOutput(principalBuffer, this.contextManager.currentContext!, durationAudio);
                }

                if (this.audioRenderingLastCanceled) {
                    return false;
                }

                this.eventEmitter.emit(EventType.OFFLINE_AUDIO_RENDERING_FINISHED);
            } else { // Compatibility mode
                this.bufferPlayer.setCompatibilityMode(this.filterManager.currentNodes!.output, durationAudio);
                this.initialRenderingDone = true;
            }

            this.eventEmitter.emit(EventType.AUDIO_RENDERING_FINISHED);

            return true;
        }

        return false;
    }

    /**
     * Load rendered audio buffer into audio player
     * @param renderedBuffer Rendered audio buffer - AudioBuffer
     * @returns false if the rendred audio buffer is invalid, true otherwise
     */
    private loadRenderedAudio(principalBuffer: AudioBuffer | null, renderedBuffer: AudioBuffer): boolean {
        if (this.eventEmitter && this.bufferPlayer) {
            if (!this.audioRenderingLastCanceled) {
                const sumRenderedAudio = utils.sumAudioBuffer(renderedBuffer);

                if (sumRenderedAudio == 0 && this.sumPrincipalBuffer !== 0) {
                    if (this.configService && !this.configService.isCompatibilityModeChecked()) {
                        this.setCompatibilityModeChecked(true);
                        this.configService.enableCompatibilityMode();
                        this.eventEmitter.emit(EventType.COMPATIBILITY_MODE_AUTO_ENABLED);

                        return false;
                    }

                    this.eventEmitter.emit(EventType.RENDERING_AUDIO_PROBLEM_DETECTED);
                }

                this._renderedBuffer = renderedBuffer;
                this.bufferPlayer.loadBuffer(this._renderedBuffer);
            } else if (!this.initialRenderingDone) {
                this.loadInitialBuffer(principalBuffer);
                this.eventEmitter.emit(EventType.CANCELLED_AND_LOADED_INITIAL_AUDIO);
            }

            this.initialRenderingDone = true;
        }

        return true;
    }

    /**
     * Load the initial audio buffer to the buffer player
     */
    private loadInitialBuffer(principalBuffer: AudioBuffer | null) {
        if (this.bufferPlayer) {
            this._renderedBuffer = principalBuffer;
            this.bufferPlayer.loadBuffer(principalBuffer!);
        }
    }

    /**
     * Cancel the audio rendering
     */
    public cancelAudioRendering() {
        if (this.currentOfflineContext && !this.audioRenderingLastCanceled && this.filterManager) {
            this.audioRenderingLastCanceled = true;
            this.filterManager.disconnectOldNodes(false);

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.CANCELLING_AUDIO_PROCESSING);
            }
        }
    }

    /**
     * Set compatibility/direct audio rendering mode already checked for auto enabling (if an error occurs rendering in offline context)
     * @param checked boolean
     */
    private setCompatibilityModeChecked(checked: boolean) {
        if (this.configService) {
            this.configService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "" + checked);
        }
    }

    get renderedBuffer() {
        return this._renderedBuffer;
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.AUDIO_PROCESSOR;
    }
}
