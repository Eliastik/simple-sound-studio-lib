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
import RecorderWorkerMessage from "../model/RecorderWorkerMessage";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import { FilterState } from "../model/FilterState";
import GenericConfigService from "../utils/GenericConfigService";
import getRecorderWorker from "../recorder/getRecorderWorker";
import { Recorder } from "../recorder/Recorder";
import ReverbSettings from "../model/filtersSettings/ReverbSettings";
import BufferDecoderService from "../services/BufferDecoderService";
import SaveBufferOptions from "../model/SaveBufferOptions";
import FilterManager from "./FilterManager";

export default class AudioEditor extends AbstractAudioElement {

    /** The filter manager */
    private filterManager: FilterManager | undefined;

    /** The current audio context */
    private currentContext: AudioContext | null | undefined;
    /** The current offline context */
    private currentOfflineContext: OfflineAudioContext | null | undefined;
    /** The audio buffer to be processed */
    private principalBuffer: AudioBuffer | null = null;
    /** The sum of all the samples of the principal buffer,
     * used to detect the need to enable the compatibility mode */
    private sumPrincipalBuffer: number = 0;
    /** The resulting audio buffer */
    private renderedBuffer: AudioBuffer | null = null;
    /** The audio player */
    private bufferPlayer: BufferPlayer | undefined;
    /** The event emitter */
    private eventEmitter: EventEmitter | undefined;
    /** If we are currently processing and downloading the buffer */
    private savingBuffer = false;
    /** The previous sample rate setting */
    private previousSampleRate = Constants.DEFAULT_SAMPLE_RATE;
    /** List of audio buffers to fetch */
    private audioBuffersToFetch: string[] = [];
    /** Callback used when saving audio */
    private playingStoppedCallback: (() => void) | null = null;
    /** true if the user wanted to cancel audio rendering */
    private audioRenderingLastCanceled = false;
    /** true if initial rendering for the current buffer was done */
    private initialRenderingDone = false;
    /** True if we are downloading initial buffer data */
    downloadingInitialData = false;

    constructor(context?: AudioContext | null, player?: BufferPlayer, eventEmitter?: EventEmitter, configService?: ConfigService, audioBuffersToFetch?: string[]) {
        super();

        this.currentContext = context;
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.bufferPlayer = player || new BufferPlayer(context!);
        this.configService = configService || new GenericConfigService();
        this.bufferFetcherService = new BufferFetcherService(this.currentContext!, this.configService, this.eventEmitter);
        this.bufferDecoderService = new BufferDecoderService(this.currentContext!, this.eventEmitter);
        
        this.filterManager = new FilterManager(this.eventEmitter, this.bufferFetcherService, this.bufferDecoderService, this.configService);

        this.audioBuffersToFetch = audioBuffersToFetch || [];

        // Callback called just before starting audio player
        this.setup();
    }

    private setup() {
        if (this.configService) {
            this.previousSampleRate = this.configService.getSampleRate();

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.SAMPLE_RATE_CHANGED, this.previousSampleRate);
            }
        }

        if (!this.currentContext) {
            this.createNewContext(this.previousSampleRate);
        }

        if (this.bufferPlayer) {
            // Callback called just before starting playing audio, when compatibility mode is enabled
            this.bufferPlayer.onBeforePlaying(async () => {
                if (this.bufferPlayer && this.bufferPlayer.compatibilityMode && this.currentContext) {
                    await this.setupOutput(this.currentContext);
                }
            });

            // Callback called when playing is finished
            this.bufferPlayer.on(EventType.PLAYING_FINISHED, () => {
                if (this.savingBuffer && this.playingStoppedCallback) {
                    this.off(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                }

                if (this.bufferPlayer && this.bufferPlayer.loop) {
                    this.bufferPlayer.start();
                }
            });
        }

        if (this.filterManager) {
            this.filterManager.setupDefaultFilters();
            this.filterManager.setupDefaultRenderers();
        }

        if (this.audioBuffersToFetch.length > 0) {
            this.fetchBuffers(false);
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
     * Fetch default buffers from network
     * @param refetch true if we need to refetch the buffers
     */
    private async fetchBuffers(refetch: boolean) {
        if (this.downloadingInitialData || !this.bufferFetcherService) {
            return;
        }

        this.downloadingInitialData = true;

        if (this.eventEmitter && !refetch) {
            this.eventEmitter.emit(EventType.LOADING_BUFFERS);
        }

        try {
            await this.bufferFetcherService.fetchAllBuffers(this.audioBuffersToFetch);
            this.downloadingInitialData = false;

            if (this.eventEmitter && !refetch) {
                this.eventEmitter.emit(EventType.LOADED_BUFFERS);
            }
        } catch (e) {
            if (this.eventEmitter && !refetch) {
                this.eventEmitter.emit(EventType.LOADING_BUFFERS_ERROR);
            }
        }
    }

    /**
     * Create new context if needed, for example if sample rate setting have changed
     */
    private async createNewContextIfNeeded() {
        const isCompatibilityModeEnabled = this.configService && this.configService.isCompatibilityModeEnabled();

        if (isCompatibilityModeEnabled && this.principalBuffer) {
            // If compatibility mode is enabled, we use the sample rate of the input audio buffer
            if (this.currentSampleRate != this.principalBuffer.sampleRate) {
                await this.createNewContext(this.principalBuffer.sampleRate);
                this.previousSampleRate = this.principalBuffer.sampleRate;

                // We need to refetch all buffers of the fetcher
                await this.resetBufferFetcher();
            }
        } else {
            // Otherwise we change the context if the sample rate has changed
            let currentSampleRate = Constants.DEFAULT_SAMPLE_RATE;

            if (this.configService) {
                currentSampleRate = this.configService.getSampleRate();
            }

            // If sample rate setting has changed, create a new audio context
            if (currentSampleRate != this.previousSampleRate) {
                await this.createNewContext(currentSampleRate);
                this.previousSampleRate = currentSampleRate;

                // We need to refetch all buffers of the fetcher
                await this.resetBufferFetcher();
            }
        }
    }

    /**
     * Reset the buffer fetcher and redownload the buffers. Used when changing sample rate.
     */
    private async resetBufferFetcher() {
        if (this.bufferFetcherService) {
            this.bufferFetcherService.reset();
            await this.fetchBuffers(true);
            // Fetch the current select environment for the reverb filter
            await this.resetReverbFilterBuffer();
        }
    }

    private async resetReverbFilterBuffer() {
        const filterSettings = this.getFiltersSettings();
        const reverbSettings = filterSettings.get(Constants.FILTERS_NAMES.REVERB);

        if (reverbSettings) {
            const reverbUrl = (reverbSettings as ReverbSettings).reverbEnvironment?.value;

            if (reverbUrl && reverbUrl !== "custom" && this.bufferFetcherService) {
                await this.bufferFetcherService.fetchBuffer(reverbUrl);
            }
        }
    }

    /** 
     * Stop previous audio context and create a new one
     */
    private async createNewContext(sampleRate: number) {
        if (this.currentContext) {
            await this.currentContext.close();
        }

        const options: AudioContextOptions = {
            latencyHint: "interactive"
        };

        if (sampleRate != 0) {
            options.sampleRate = sampleRate;
        }

        this.currentContext = new AudioContext(options);

        if (this.eventEmitter) {
            this.eventEmitter.emit(EventType.SAMPLE_RATE_CHANGED, this.currentContext.sampleRate);
        }

        if (this.bufferPlayer) {
            this.bufferPlayer.updateContext(this.currentContext);
        }

        if (this.bufferFetcherService) {
            this.bufferFetcherService.updateContext(this.currentContext);
        }

        if (this.bufferDecoderService) {
            this.bufferDecoderService.updateContext(this.currentContext);
        }
    }

    /** Prepare the AudioContext before use */
    private async prepareContext() {
        await this.createNewContextIfNeeded();

        if (this.currentContext) {
            this.currentContext.resume();
        }
    }

    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number {
        if (this.currentContext) {
            return this.currentContext.sampleRate;
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

        await this.prepareContext();

        if (this.currentContext && this.bufferDecoderService) {
            this.principalBuffer = await this.bufferDecoderService.decodeBufferFromFile(file);
            this.initialRenderingDone = false;

            if (this.principalBuffer) {
                this.sumPrincipalBuffer = utils.sumAudioBuffer(this.principalBuffer);
            } else {
                throw new Error("Error decoding audio file");
            }

            this.resetAudioRenderingProgress();
        } else {
            throw new Error("Audio Context is not ready!");
        }
    }

    /**
     * Reset audio rendering progress
     */
    private resetAudioRenderingProgress() {
        if (this.eventEmitter) {
            this.eventEmitter.emit(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, 0);
            this.eventEmitter.emit(EventType.UPDATE_REMAINING_TIME_ESTIMATED, -1);
        }
    }

    /** Change the principal audio buffer of this editor */
    loadBuffer(audioBuffer: AudioBuffer) {
        this.principalBuffer = audioBuffer;
        this.sumPrincipalBuffer = utils.sumAudioBuffer(this.principalBuffer);
        this.initialRenderingDone = false;
    }

    /**
     * Get the rendered audio buffer
     * @returns The AudioBuffer
     */
    getOutputBuffer() {
        return this.renderedBuffer;
    }

    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    async renderAudio(): Promise<boolean> {
        await this.prepareContext();

        if (!this.currentContext) {
            throw new Error("AudioContext is not yet available");
        }

        if(!this.filterManager) {
            throw new Error("Filter manager is not available");
        }

        if (!this.filterManager.entrypointFilter) {
            throw new Error("Entrypoint filter is not available");
        }

        if (!this.principalBuffer) {
            throw new Error("No principal buffer available");
        }

        // If initial rendering is disabled and compatibility mode is disabled, we stop here
        if (!this.initialRenderingDone && this.configService && this.configService.isInitialRenderingDisabled() && !this.configService.isCompatibilityModeEnabled()) {
            this.loadInitialBuffer();
            this.initialRenderingDone = true;
            return true;
        }

        // If switching from compatiblity mode to normal mode, we stop the audio player
        if (this.configService && this.bufferPlayer && !this.configService.isCompatibilityModeEnabled() && this.bufferPlayer.compatibilityMode) {
            this.bufferPlayer.stop();
        }

        const speedAudio = this.filterManager.entrypointFilter.getSpeed();
        const durationAudio = this.calculateAudioDuration(speedAudio);
        const offlineContext = new OfflineAudioContext(2, this.currentContext.sampleRate * durationAudio, this.currentContext.sampleRate);
        const outputContext = this.configService && this.configService.isCompatibilityModeEnabled() ? this.currentContext : offlineContext;

        this.renderedBuffer = await this.filterManager.executeAudioRenderers(this.principalBuffer, outputContext);
        this.currentOfflineContext = null;
        this.audioRenderingLastCanceled = false;


        this.resetAudioRenderingProgress();
        this.filterManager.setupPasstroughFilter(durationAudio, this.currentContext);

        return await this.setupOutput(outputContext, durationAudio, offlineContext);
    }

    /**
     * Setup output buffers/nodes, then process the audio
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @param offlineContext An offline context to do the rendering (can be omited, in this case the rendering is done in real time - "compatibility mode")
     * @returns A promise resolved when the audio processing is done. The promise returns false if the audio processing was cancelled, or if an error occurred.
     */
    private async setupOutput(outputContext: BaseAudioContext, durationAudio?: number, offlineContext?: OfflineAudioContext): Promise<boolean> {
        if (this.renderedBuffer && this.configService && this.eventEmitter && this.bufferPlayer && this.filterManager) {
            // Initialize worklets then connect the filter nodes
            await this.filterManager.initializeWorklets(outputContext);
            await this.filterManager.connectNodes(outputContext, this.renderedBuffer, false, this.configService.isCompatibilityModeEnabled());

            this.filterManager.setupPlayerSpeed(this.bufferPlayer);

            // Standard mode
            if (!this.configService.isCompatibilityModeEnabled() && offlineContext && this.filterManager.currentNodes) {
                this.currentOfflineContext = offlineContext;
                this.filterManager.currentNodes.output.connect(outputContext.destination);

                const renderedBuffer = await offlineContext.startRendering();

                if (!this.loadRenderedAudio(renderedBuffer)) {
                    return await this.setupOutput(this.currentContext!, durationAudio);
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
    private loadRenderedAudio(renderedBuffer: AudioBuffer): boolean {
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

                this.renderedBuffer = renderedBuffer;
                this.bufferPlayer.loadBuffer(this.renderedBuffer);
            } else if (!this.initialRenderingDone) {
                this.loadInitialBuffer();
                this.eventEmitter.emit(EventType.CANCELLED_AND_LOADED_INITIAL_AUDIO);
            }

            this.initialRenderingDone = true;
        }

        return true;
    }

    /**
     * Load the initial audio buffer to the buffer player
     */
    private loadInitialBuffer() {
        if (this.bufferPlayer) {
            this.renderedBuffer = this.principalBuffer;
            this.bufferPlayer.loadBuffer(this.principalBuffer!);
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
     * Calculate approximative audio duration according to enabled filters and their settings
     * @param speedAudio Current audio speed
     * @returns The audio duration
     */
    private calculateAudioDuration(speedAudio: number): number {
        if (this.principalBuffer && this.filterManager) {
            const duration = utils.calcAudioDuration(this.principalBuffer, speedAudio);
            return duration + this.filterManager.getAddingTime();
        }

        return 0;
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.AUDIO_EDITOR;
    }

    isEnabled(): boolean {
        return true;
    }

    /**
     * Check if AudioWorklet are available
     * @returns boolean
     */
    isAudioWorkletAvailable(): boolean {
        if (this.currentContext) {
            return utilFunctions.isAudioWorkletCompatible(this.currentContext);
        }

        return false;
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
        if (this.bufferPlayer && this.bufferPlayer.compatibilityMode &&
            this.currentContext && this.principalBuffer &&
            this.filterManager && this.filterManager.entrypointFilter) {
            await this.filterManager.connectNodes(this.currentContext, this.principalBuffer, true, this.bufferPlayer.compatibilityMode);

            const speedAudio = this.filterManager.entrypointFilter.getSpeed();
            this.bufferPlayer.speedAudio = speedAudio;
            this.bufferPlayer.duration = this.calculateAudioDuration(speedAudio) * speedAudio;
        }
    }

    /**
     * Toggle enabled/disabled state for a filter/renderer
     * @param filterId The filter/renderer ID
     */
    toggleFilter(filterId: string) {
        if (this.filterManager && this.currentContext && this.principalBuffer) {
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
        if (this.filterManager && this.currentContext && this.principalBuffer) {
            this.filterManager.changeFilterSettings(filterId, settings);
            await this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Reset the settings of a filter/renderer
     * @param filterId Id of the filter/renderer
     */
    async resetFilterSettings(filterId: string) {
        if (this.filterManager && this.currentContext && this.principalBuffer) {
            this.filterManager.resetFilterSettings(filterId);
            await this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Reset all filters/renderers state (enabled/disabled) based on their default states
     */
    resetAllFiltersState() {
        if (this.filterManager && this.currentContext && this.principalBuffer) {
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
        if (this.savingBuffer) {
            throw new Error("The buffer is currently saving");
        }

        if (!this.bufferPlayer) {
            throw new Error("No buffer player was found");
        }

        this.savingBuffer = true;

        let savingResult = false;

        if (!this.bufferPlayer.compatibilityMode) {
            savingResult = await this.saveBufferDirect(options);
        } else {
            savingResult = await this.saveBufferCompatibilityMode(options);
        }

        this.savingBuffer = false;

        return savingResult;
    }

    /**
     * Save the rendered audio to a buffer, when compatibility mode is disabled
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    private saveBufferDirect(options?: SaveBufferOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.renderedBuffer || !this.currentContext) {
                return reject("No rendered buffer or AudioContext not initialized");
            }

            const worker = getRecorderWorker(this.configService?.getWorkerBasePath());

            if (worker) {
                const buffer: Float32Array[] = [];

                for (let i = 0; i < this.renderedBuffer.numberOfChannels; i++) {
                    buffer.push(this.renderedBuffer.getChannelData(i));
                }

                worker.onmessage = (e: RecorderWorkerMessage) => {
                    if (e.data.command == Constants.EXPORT_WAV_COMMAND || e.data.command == Constants.EXPORT_MP3_COMMAND) {
                        this.downloadAudioBlob(e.data.data, options);
                    }

                    worker.terminate();
                    this.savingBuffer = false;
                    resolve(true);
                };

                worker.postMessage({
                    command: Constants.INIT_COMMAND,
                    config: {
                        sampleRate: this.renderedBuffer.sampleRate,
                        numChannels: 2,
                        bitrate: options?.bitrate || Constants.DEFAULT_MP3_BITRATE
                    }
                });

                worker.postMessage({
                    command: Constants.RECORD_COMMAND,
                    buffer
                });

                worker.postMessage({
                    command: options?.format === "mp3" || Constants.DEFAULT_SAVE_FORMAT === "mp3" ? Constants.EXPORT_MP3_COMMAND : Constants.EXPORT_WAV_COMMAND,
                    type: Constants.AUDIO_WAV
                });
            }
        });
    }

    /**
     * Save the rendered audio to a buffer, when compatibility mode is enabled
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    private saveBufferCompatibilityMode(options?: SaveBufferOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.bufferPlayer) {
                return reject("No buffer player found");
            }

            this.bufferPlayer.start().then(() => {
                if (!this.configService) {
                    return reject("No config service found");
                }

                if (!this.filterManager) {
                    return reject("No filter manager found");
                }

                const rec = new Recorder({
                    bufferLen: this.configService.getBufferSize(),
                    sampleRate: this.configService.getSampleRate(),
                    numChannels: 2,
                    workletBasePath: this.configService.getWorkletBasePath(),
                    workerBasePath: this.configService.getWorkerBasePath(),
                    mimeType: options?.format == "mp3" ? Constants.AUDIO_MP3 : Constants.AUDIO_WAV,
                    bitrate: options?.bitrate || Constants.DEFAULT_MP3_BITRATE
                });

                rec.setup(this.filterManager.currentNodes!.output).then(() => {
                    rec.record();

                    this.playingStoppedCallback = () => {
                        rec.kill();

                        this.savingBuffer = false;
                        this.off(EventType.PLAYING_FINISHED, finishedCallback);

                        if (this.playingStoppedCallback) {
                            this.off(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                        }

                        resolve(true);
                    };

                    const finishedCallback = () => {
                        if (this.playingStoppedCallback) {
                            this.off(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                        }

                        rec.stop();

                        const downloadBlobCallback = (blob: Blob) => {
                            this.downloadAudioBlob(blob, options);

                            this.savingBuffer = false;
                            this.off(EventType.PLAYING_FINISHED, finishedCallback);
                            rec.kill();

                            resolve(true);
                        };

                        if (options?.format === "mp3" || Constants.DEFAULT_SAVE_FORMAT === "mp3") {
                            rec.exportMP3(downloadBlobCallback);
                        } else {
                            rec.exportWAV(downloadBlobCallback);
                        }
                    };

                    this.on(EventType.PLAYING_FINISHED, finishedCallback);
                    this.on(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                });
            });
        });
    }

    /**
     * Download an audio Blob
     * @param blob The blob
     * @param options The save options
     */
    private downloadAudioBlob(blob: Blob, options?: SaveBufferOptions) {
        Recorder.forceDownload(blob, "audio-" + new Date().toISOString() + "." + (options?.format || Constants.DEFAULT_SAVE_FORMAT));
    }
}
