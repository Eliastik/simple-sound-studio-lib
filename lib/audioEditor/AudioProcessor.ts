import AbstractAudioElement from "@/interfaces/AbstractAudioElement";
import { EventType } from "@/model/EventTypeEnum";
import utils from "../utils/Functions";
import Constants from "@/model/Constants";
import AudioProcessorInterface from "./interfaces/AudioProcessorInterface";
import { inject, injectable } from "inversify";
import type BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";
import type BufferManagerInterface from "./interfaces/BufferManagerInterface";
import AudioContextManagerInterface from "./interfaces/AudioContextManagerInterface";
import type RendererManagerInterface from "./interfaces/RendererManagerInterface";
import type FilterManagerInterface from "./interfaces/FilterManagerInterface";
import { TYPES } from "@/inversify.types";

@injectable()
export default class AudioProcessor extends AbstractAudioElement implements AudioProcessorInterface {

    /** The filter manager */
    private filterManager: FilterManagerInterface | undefined;

    /** The filter manager */
    private rendererManager: RendererManagerInterface | undefined;

    /** The context manager */
    private contextManager: AudioContextManagerInterface | undefined;

    /** The audio player */
    private bufferPlayer: BufferPlayerInterface | undefined;

    /** The save buffer manager */
    private bufferManager: BufferManagerInterface | undefined;

    /** The current offline context */
    private currentOfflineContext: OfflineAudioContext | null | undefined;

    /** The resulting audio buffer */
    private _renderedBuffer: AudioBuffer | null = null;

    /** true if the user wanted to cancel audio rendering */
    private audioRenderingLastCanceled = false;

    /** true if initial rendering for the current buffer was done */
    initialRenderingDone = false;
    /** The sum of all the samples of the input buffer,
     * used to detect the need to enable the compatibility mode */
    sumInputBuffer: number = 0;

    constructor(
        @inject(TYPES.FilterManager) filterManager: FilterManagerInterface | undefined,
        @inject(TYPES.RendererManager) rendererManager: RendererManagerInterface | undefined,
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface | undefined,
        @inject(TYPES.BufferPlayer) bufferPlayer: BufferPlayerInterface | undefined,
        @inject(TYPES.BufferManager) bufferManager: BufferManagerInterface | undefined) {
        super();

        this.contextManager = contextManager;
        this.bufferPlayer = bufferPlayer;
        this.filterManager = filterManager;
        this.rendererManager = rendererManager;
        this.bufferManager = bufferManager;
    }

    async prepareContext(inputBuffer: AudioBuffer | null) {
        if (this.contextManager) {
            const changed = this.contextManager.createNewContextIfNeeded(inputBuffer);

            if (changed && this.bufferManager) {
                await this.bufferManager.resetBufferFetcher();
            }

            if (this.contextManager.currentContext) {
                this.contextManager.currentContext.resume();
            }
        }
    }

    async renderAudio(inputBuffer: AudioBuffer | null, forceInitialRendering?: boolean): Promise<boolean> {
        await this.prepareContext(inputBuffer);

        if (!this.contextManager || !this.contextManager.currentContext) {
            throw new Error("AudioContext is not yet available");
        }

        if (!this.filterManager) {
            throw new Error("Filter manager is not available");
        }

        if (!this.rendererManager) {
            throw new Error("Renderer manager is not available");
        }

        if (!this.filterManager.entrypointFilter) {
            throw new Error("Entrypoint filter is not available");
        }

        if (!inputBuffer) {
            throw new Error("No principal buffer available");
        }

        // If initial rendering is disabled and compatibility mode is disabled, we stop here
        if (!this.initialRenderingDone && this.configService && this.configService.isInitialRenderingDisabled() && !this.configService.isCompatibilityModeEnabled() && !forceInitialRendering) {
            this.loadInitialBuffer(inputBuffer);
            this.initialRenderingDone = true;
            return true;
        }

        // If switching from compatiblity mode to normal mode, we stop the audio player
        if (this.configService && this.bufferPlayer && !this.configService.isCompatibilityModeEnabled() && this.bufferPlayer.compatibilityMode) {
            this.bufferPlayer.stop();
        }

        const speedAudio = this.filterManager.entrypointFilter.getSpeed();
        const durationAudio = utils.calculateAudioDuration(inputBuffer, this.filterManager, speedAudio);
        const offlineContext = new OfflineAudioContext(2, this.contextManager.currentContext.sampleRate * durationAudio, this.contextManager.currentContext.sampleRate);
        const outputContext = this.configService && this.configService.isCompatibilityModeEnabled() ? this.contextManager.currentContext : offlineContext;

        this._renderedBuffer = await this.rendererManager.executeAudioRenderers(inputBuffer, outputContext);
        this.currentOfflineContext = null;
        this.audioRenderingLastCanceled = false;

        utils.resetAudioRenderingProgress(this.eventEmitter);
        this.filterManager.setupTotalSamples(durationAudio, this.contextManager.currentContext);

        return this.setupOutput(inputBuffer, outputContext, durationAudio, offlineContext);
    }

    private setupPlayerSpeed(bufferPlayer: BufferPlayerInterface) {
        if (this.filterManager && this.filterManager.entrypointFilter) {
            const speedAudio = this.filterManager.entrypointFilter.getSpeed();
            bufferPlayer.speedAudio = speedAudio;
        }
    }

    async setupOutput(inputBuffer: AudioBuffer | null, outputContext: BaseAudioContext, durationAudio?: number, offlineContext?: OfflineAudioContext): Promise<boolean> {
        if (this._renderedBuffer && this.configService && this.eventEmitter && this.bufferPlayer && this.filterManager) {
            // Initialize worklets then connect the filter nodes
            await this.filterManager.initializeWorklets(outputContext);
            await this.filterManager.connectNodes(outputContext, this._renderedBuffer, false, this.configService.isCompatibilityModeEnabled());

            this.setupPlayerSpeed(this.bufferPlayer);

            // Standard mode
            if (!this.configService.isCompatibilityModeEnabled() && offlineContext && this.filterManager.currentNodes) {
                this.currentOfflineContext = offlineContext;
                this.filterManager.currentNodes.output.connect(outputContext.destination);

                const renderedBuffer = await offlineContext.startRendering();

                this.filterManager.clearWorklets();

                if (this.contextManager && !this.loadRenderedAudio(inputBuffer, renderedBuffer)) {
                    return this.setupOutput(inputBuffer, this.contextManager.currentContext!, durationAudio);
                }

                if (this.audioRenderingLastCanceled) {
                    return false;
                }

                this.eventEmitter.emit(EventType.OFFLINE_AUDIO_RENDERING_FINISHED);
            } else { // Compatibility mode
                if (this.filterManager.currentNodes) {
                    this.bufferPlayer.setCompatibilityMode(this.filterManager.currentNodes.output, durationAudio);
                    this.initialRenderingDone = true;
                }
            }
        
            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.AUDIO_RENDERING_FINISHED);
            }

            return true;
        }

        return false;
    }

    /**
     * Load rendered audio buffer into audio player
     * @param renderedBuffer Rendered audio buffer - AudioBuffer
     * @returns false if the rendered audio buffer is invalid, true otherwise
     */
    private loadRenderedAudio(inputBuffer: AudioBuffer | null, renderedBuffer: AudioBuffer): boolean {
        if (this.eventEmitter && this.bufferPlayer) {
            if (!this.audioRenderingLastCanceled) {
                const sumRenderedAudio = utils.sumAudioBuffer(renderedBuffer);

                if (sumRenderedAudio == 0 && this.sumInputBuffer !== 0) {
                    if (this.configService && !this.configService.isCompatibilityModeChecked()) {
                        this.setCompatibilityModeChecked(true);
                        this.configService.enableCompatibilityMode();
                        this.eventEmitter.emit(EventType.COMPATIBILITY_MODE_AUTO_ENABLED);

                        console.warn("Compatibility mode has been automatically enabled because a problem has been detected with the web browser.");

                        return false;
                    }

                    this.eventEmitter.emit(EventType.RENDERING_AUDIO_PROBLEM_DETECTED);
                }

                this._renderedBuffer = renderedBuffer;
                this.bufferPlayer.loadBuffer(this._renderedBuffer);
            } else if (!this.initialRenderingDone) {
                this.loadInitialBuffer(inputBuffer);
                this.eventEmitter.emit(EventType.CANCELLED_AND_LOADED_INITIAL_AUDIO);
            }

            this.initialRenderingDone = true;
        }

        return true;
    }

    /**
     * Load the initial audio buffer to the buffer player
     */
    private loadInitialBuffer(inputBuffer: AudioBuffer | null) {
        if (this.bufferPlayer) {
            this._renderedBuffer = inputBuffer;
            this.bufferPlayer.loadBuffer(inputBuffer!);
        }
    }

    public cancelAudioRendering() {
        if (this.currentOfflineContext && !this.audioRenderingLastCanceled && this.filterManager) {
            this.audioRenderingLastCanceled = true;
            this.filterManager.disconnectOldNodes(false);

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.CANCELLING_AUDIO_PROCESSING);
            }
        }
    }

    clearRenderedBuffer() {
        utils.clearAudioBuffer(this._renderedBuffer);
        this._renderedBuffer = null;
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
}
