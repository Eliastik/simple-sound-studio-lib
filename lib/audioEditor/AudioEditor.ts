import AbstractAudioElement from "../filters/interfaces/AbstractAudioElement";
import AbstractAudioFilter from "../filters/interfaces/AbstractAudioFilter";
import AbstractAudioRenderer from "../filters/interfaces/AbstractAudioRenderer";
import utils from "../utils/Functions";
import BufferPlayer from "../BufferPlayer";
import BufferFetcherService from "../services/BufferFetcherService";
import EventEmitter from "../utils/EventEmitter";
import { EventType } from "../model/EventTypeEnum";
import Constants from "../model/Constants";
import { ConfigService } from "../services/ConfigService";
import utilFunctions from "../utils/Functions";
import { FilterSettings } from "../model/filtersSettings/FilterSettings";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import { FilterState } from "../model/FilterState";
import GenericConfigService from "../utils/GenericConfigService";
import BufferDecoderService from "../services/BufferDecoderService";
import SaveBufferOptions from "../model/SaveBufferOptions";
import FilterManager from "./FilterManager";
import AudioContextManager from "./AudioContextManager";
import SaveBufferManager from "./SaveBufferManager";
import AudioProcessor from "./AudioProcessor";
import BufferManager from "./BufferManager";

export default class AudioEditor extends AbstractAudioElement {

    /** The filter manager */
    private filterManager: FilterManager | undefined;
    /** The context manager */
    private contextManager: AudioContextManager | undefined;
    /** The save buffer manager */
    private saveBufferManager: SaveBufferManager | undefined;
    /** The save buffer manager */
    private audioProcessor: AudioProcessor | undefined;
    /** The save buffer manager */
    private bufferManager: BufferManager | undefined;

    /** The audio buffer to be processed */
    private principalBuffer: AudioBuffer | null = null;
    /** The audio player */
    private bufferPlayer: BufferPlayer | undefined;
    /** The event emitter */
    private eventEmitter: EventEmitter | undefined;

    constructor(context?: AudioContext | null, player?: BufferPlayer, eventEmitter?: EventEmitter, configService?: ConfigService, audioBuffersToFetch?: string[]) {
        super();

        this.eventEmitter = eventEmitter || new EventEmitter();
        this.configService = configService || new GenericConfigService();

        this.contextManager = new AudioContextManager(context, this.configService, this.eventEmitter);

        this.bufferPlayer = player || new BufferPlayer(this.contextManager, this.eventEmitter);
        this.bufferFetcherService = new BufferFetcherService(this.contextManager, this.configService, this.eventEmitter);
        this.bufferDecoderService = new BufferDecoderService(this.contextManager, this.eventEmitter);

        this.filterManager = new FilterManager(this.eventEmitter, this.bufferFetcherService, this.bufferDecoderService, this.configService);
        this.saveBufferManager = new SaveBufferManager(this.contextManager, this.configService, this.eventEmitter, this.bufferPlayer);
        this.bufferManager = new BufferManager(this.bufferFetcherService, this.filterManager, this.eventEmitter, audioBuffersToFetch || []);
        this.audioProcessor = new AudioProcessor(this.contextManager, this.configService, this.eventEmitter, this.bufferPlayer, this.filterManager, this.bufferManager);

        // Callback called just before starting audio player
        this.setup();
    }

    private setup() {
        if (this.bufferPlayer) {
            // Callback called just before starting playing audio, when compatibility mode is enabled
            this.bufferPlayer.onBeforePlaying(async () => {
                if (this.bufferPlayer && this.bufferPlayer.compatibilityMode
                    && this.contextManager && this.contextManager.currentContext && this.audioProcessor) {
                    await this.audioProcessor.setupOutput(this.principalBuffer, this.contextManager.currentContext);
                }
            });

            // Callback called when playing is finished
            this.bufferPlayer.on(EventType.PLAYING_FINISHED, () => {
                if (this.bufferPlayer && this.bufferPlayer.loop) {
                    this.bufferPlayer.start();
                }
            });

            this.bufferPlayer.contextManager = this.contextManager;
        }
    }

    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter[]) {
        if (this.filterManager) {
            this.filterManager.addFilters(...filters);
        }
    }

    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer[]) {
        if (this.filterManager) {
            this.filterManager.addRenderers(...renderers);
        }
    }

    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number {
        if (this.contextManager) {
            return this.contextManager.currentSampleRate;
        }

        return 0;
    }

    /**
     * Get the default device sample rate
     */
    get defaultDeviceSampleRate(): number {
        const tempContext = new AudioContext();
        let sampleRate = 0;

        if (tempContext) {
            sampleRate = tempContext.sampleRate;
            tempContext.close();
        }

        return sampleRate;
    }

    /** Decode and load an audio buffer from an audio file */
    async loadBufferFromFile(file: File) {
        this.principalBuffer = null;

        if (this.audioProcessor) {
            await this.audioProcessor.prepareContext(this.principalBuffer);
        }

        if (this.contextManager && this.contextManager.currentContext && this.bufferDecoderService && this.audioProcessor) {
            this.principalBuffer = await this.bufferDecoderService.decodeBufferFromFile(file);
            this.audioProcessor.initialRenderingDone = false;

            if (this.principalBuffer) {
                this.audioProcessor.sumPrincipalBuffer = utils.sumAudioBuffer(this.principalBuffer);
            } else {
                throw new Error("Error decoding audio file");
            }

            utilFunctions.resetAudioRenderingProgress(this.eventEmitter);
        } else {
            throw new Error("Audio Context is not ready!");
        }
    }

    /** Change the principal audio buffer of this editor */
    loadBuffer(audioBuffer: AudioBuffer) {
        this.principalBuffer = audioBuffer;

        if (this.audioProcessor) {
            this.audioProcessor.sumPrincipalBuffer = utils.sumAudioBuffer(this.principalBuffer);
            this.audioProcessor.initialRenderingDone = false;
        }
    }

    /**
     * Get the rendered audio buffer
     * @returns The AudioBuffer
     */
    getOutputBuffer() {
        if (this.audioProcessor) {
            return this.audioProcessor.renderedBuffer;
        }

        return null;
    }

    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    async renderAudio(): Promise<boolean> {
        if (this.audioProcessor) {
            return await this.audioProcessor.renderAudio(this.principalBuffer);
        }

        return false;
    }

    /**
     * Check if AudioWorklet are available
     * @returns boolean
     */
    isAudioWorkletAvailable(): boolean {
        if (this.contextManager && this.contextManager.currentContext) {
            return utilFunctions.isAudioWorkletCompatible(this.contextManager.currentContext);
        }

        return false;
    }

    /** Filters settings */

    /**
     * Get enabled/disabled state of all filters/renderers
     * @returns The filters state (enabled/disabled)
     */
    getFiltersState(): FilterState {
        if (this.filterManager) {
            return this.filterManager.getFiltersState();
        }

        return {};
    }

    /**
     * Get the settings of all filters/renderers
     * @returns 
     */
    getFiltersSettings(): Map<string, FilterSettings> {
        if (this.filterManager) {
            return this.filterManager.getFiltersSettings();
        }

        return new Map();
    }

    /** Reconnect the nodes if the compatibility/direct mode is enabled */
    async reconnectNodesIfNeeded() {
        if (this.contextManager && this.bufferPlayer && this.bufferPlayer.compatibilityMode &&
            this.contextManager.currentContext && this.principalBuffer &&
            this.filterManager && this.filterManager.entrypointFilter) {
            await this.filterManager.connectNodes(this.contextManager.currentContext, this.principalBuffer, true, this.bufferPlayer.compatibilityMode);

            const speedAudio = this.filterManager.entrypointFilter.getSpeed();
            this.bufferPlayer.speedAudio = speedAudio;
            this.bufferPlayer.duration = utilFunctions.calculateAudioDuration(this.principalBuffer, this.filterManager, speedAudio) * speedAudio;
        }
    }

    /**
     * Toggle enabled/disabled state for a filter/renderer
     * @param filterId The filter/renderer ID
     */
    toggleFilter(filterId: string) {
        if (this.filterManager && this.contextManager && this.contextManager.currentContext && this.principalBuffer) {
            this.filterManager.toggleFilter(filterId);
            this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Change a filter/renderer setting
     * @param filterId Filter ID
     * @param settings Filter setting (key/value)
     */
    async changeFilterSettings(filterId: string, settings: FilterSettings) {
        if (this.filterManager && this.contextManager && this.contextManager.currentContext && this.principalBuffer) {
            await this.filterManager.changeFilterSettings(filterId, settings);
            await this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Reset the settings of a filter/renderer
     * @param filterId Id of the filter/renderer
     */
    async resetFilterSettings(filterId: string) {
        if (this.filterManager && this.contextManager && this.contextManager.currentContext && this.principalBuffer) {
            await this.filterManager.resetFilterSettings(filterId);
            await this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Reset all filters/renderers state (enabled/disabled) based on their default states
     */
    resetAllFiltersState() {
        if (this.filterManager && this.contextManager && this.contextManager.currentContext && this.principalBuffer) {
            this.filterManager.resetAllFiltersState();
            this.reconnectNodesIfNeeded();
        }
    }

    /** Events and exit */

    /**
     * Exit/reset the audio editor basic state
     */
    exit() {
        if (this.bufferPlayer) {
            this.bufferPlayer.stop();
            this.bufferPlayer.reset();
        }
        
        this.cancelAudioRendering();
        this.principalBuffer = null;
    }
    
    /**
     * Cancel the audio rendering
     */
    cancelAudioRendering() {
        if (this.audioProcessor) {
            this.audioProcessor.cancelAudioRendering();
        }
    }

    /**
     * Subscribe to an event
     * @param event The event ID
     * @param callback The callback function
     */
    on(event: string, callback: EventEmitterCallback) {
        if (this.eventEmitter) {
            this.eventEmitter.on(event, callback);
        }
    }

    /**
     * Unsubscribe to an event
     * @param event The event ID
     * @param callback The callback function
     */
    off(event: string, callback: EventEmitterCallback) {
        if (this.eventEmitter) {
            this.eventEmitter.off(event, callback);
        }
    }

    /**
     * Save the rendered audio to a buffer
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    async saveBuffer(options?: SaveBufferOptions): Promise<boolean> {
        if (this.saveBufferManager && this.audioProcessor) {
            return await this.saveBufferManager?.saveBuffer(this.audioProcessor.renderedBuffer, options);
        }

        return false;
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.AUDIO_EDITOR;
    }

    set downloadingInitialData(state: boolean) {
        if (this.bufferManager) {
            this.bufferManager.downloadingInitialData = state;
        }
    }

    get downloadingInitialData(): boolean {
        if (this.bufferManager) {
            return this.bufferManager.downloadingInitialData;
        }

        return false;
    }

    isEnabled(): boolean {
        return true;
    }
}
