import AbstractAudioElement from "./filters/interfaces/AbstractAudioElement";
import AbstractAudioFilter from "./filters/interfaces/AbstractAudioFilter";
import AudioFilterEntrypointInterface from "./filters/interfaces/AudioFilterEntrypointInterface";
import AbstractAudioRenderer from "./filters/interfaces/AbstractAudioRenderer";
import BassBoosterFilter from "./filters/BassBoosterFilter";
import BitCrusherFilter from "./filters/BitCrusherFilter";
import EchoFilter from "./filters/EchoFilter";
import HighPassFilter from "./filters/HighPassFilter";
import LimiterFilter from "./filters/LimiterFilter";
import LowPassFilter from "./filters/LowPassFilter";
import ReturnAudioRenderer from "./filters/ReturnAudioRenderer";
import ReverbFilter from "./filters/ReverbFilter";
import SoundtouchWrapperFilter from "./filters/SountouchWrapperFilter";
import TelephonizerFilter from "./filters/TelephonizerFilter";
import utils from "./utils/Functions";
import BufferPlayer from "./BufferPlayer";
import BufferFetcherService from "./services/BufferFetcherService";
import EventEmitter from "./utils/EventEmitter";
import { EventType } from "./model/EventTypeEnum";
import Constants from "./model/Constants";
import AbstractAudioFilterWorklet from "./filters/interfaces/AbstractAudioFilterWorklet";
import { AudioFilterNodes } from "./model/AudioNodes";
import VocoderFilter from "./filters/VocoderFilter";
import { ConfigService } from "./services/ConfigService";
import utilFunctions from "./utils/Functions";
import { FilterSettings } from "./model/filtersSettings/FilterSettings";
import RecorderWorkerMessage from "./model/RecorderWorkerMessage";
import { EventEmitterCallback } from "./model/EventEmitterCallback";
import { FilterState } from "./model/FilterState";
import GenericConfigService from "./utils/GenericConfigService";
import getRecorderWorker from "./recorder/RecorderWorker";
import { Recorder } from "./recorder/Recorder";
import ReverbSettings from "./model/filtersSettings/ReverbSettings";
import BufferDecoderService from "./services/BufferDecoderService";
import PassThroughFilter from "./filters/PassThroughFilter";
import SaveBufferOptions from "./model/SaveBufferOptions";

export default class AudioEditor extends AbstractAudioElement {

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
    /** The entrypoint filter */
    private entrypointFilter: (AbstractAudioFilter & AudioFilterEntrypointInterface) | null = null;
    /** A list of filters */
    private filters: AbstractAudioFilter[] = [];
    /** A list of renderers */
    private renderers: AbstractAudioRenderer[] = [];
    /** The audio player */
    private bufferPlayer: BufferPlayer | undefined;
    /** The event emitter */
    private eventEmitter: EventEmitter | undefined;
    /** The current connected nodes */
    private currentNodes: AudioFilterNodes | null = null;
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

        this.setupDefaultFilters();
        this.setupDefaultRenderers();

        if (this.audioBuffersToFetch.length > 0) {
            this.fetchBuffers(false);
        }
    }

    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter[]) {
        for (const filter of filters) {
            filter.initializeDefaultSettings();
            filter.bufferFetcherService = this.bufferFetcherService;
            filter.bufferDecoderService = this.bufferDecoderService;
            filter.configService = this.configService;
            filter.eventEmitter = this.eventEmitter;
        }

        this.filters.push(...filters);
    }

    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer[]) {
        for (const renderer of renderers) {
            renderer.bufferFetcherService = this.bufferFetcherService;
            renderer.bufferDecoderService = this.bufferDecoderService;
            renderer.configService = this.configService;
        }

        this.renderers.push(...renderers);
    }

    /** Setup all audio filters */
    private setupDefaultFilters() {
        const bassBooster = new BassBoosterFilter(200, 15, 200, -2);
        const bitCrusher = new BitCrusherFilter(16, 0.9);
        const echo = new EchoFilter(0.2, 0.75);
        const highPass = new HighPassFilter(3500);
        const lowPass = new LowPassFilter(3500);
        const reverb = new ReverbFilter();
        const soundtouchWrapper = new SoundtouchWrapperFilter();
        const limiterFilter = new LimiterFilter(0, 0, 0, 3, -0.05, 0.1);
        const telephonizerFilter = new TelephonizerFilter();
        const vocoder = new VocoderFilter();
        const passthrough = new PassThroughFilter();

        this.entrypointFilter = soundtouchWrapper;
        this.addFilters(bassBooster, bitCrusher, echo, highPass, lowPass, reverb, limiterFilter, telephonizerFilter, soundtouchWrapper, vocoder, passthrough);
    }

    /** Setup the renderers */
    private setupDefaultRenderers() {
        const returnAudio = new ReturnAudioRenderer();
        this.addRenderers(returnAudio);
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
     * Connect the Audio API nodes of the enabled filters
     * @param context The Audio Context
     * @param buffer  The Audio Buffer
     * @param keepCurrentInputOutput Keep current first input/output nodes?
     */
    private async connectNodes(context: BaseAudioContext, buffer: AudioBuffer, keepCurrentInputOutput: boolean, isCompatibilityMode: boolean) {
        if (!this.entrypointFilter) {
            return;
        }

        let entrypointNode: AudioNode | null = null;

        if (keepCurrentInputOutput && this.currentNodes) {
            entrypointNode = this.currentNodes.input;
        } else {
            const entrypointNodes = await this.entrypointFilter.getEntrypointNode(context, buffer, !isCompatibilityMode);
            entrypointNode = entrypointNodes.input;
        }

        const intermediateNodes: AudioFilterNodes[] = [];
        let previousNode: AudioNode | undefined = entrypointNode;

        this.disconnectOldNodes(keepCurrentInputOutput);

        // Sort by filter order, then remove the disabled filter (but always keep the last/output filter)
        const filters = this.filters
            .sort((a, b) => a.order - b.order)
            .filter((filter, index) => filter !== this.entrypointFilter && (filter.isEnabled() || index >= this.filters.length - 1));

        for (const filter of filters) {
            const node = filter.getNode(context);

            if (previousNode) {
                previousNode.connect(node.input);
            }

            previousNode = node.output;
            intermediateNodes.push(node);
        }

        if (this.entrypointFilter) {
            this.entrypointFilter.updateState();
        }

        this.currentNodes = {
            input: entrypointNode!,
            output: previousNode!,
            intermediateNodes: intermediateNodes
                .filter(n => n.input != previousNode && n.output != previousNode &&
                    n.input != entrypointNode && n.output != entrypointNode)
        };
    }

    /**
     * Disconnect old audio nodes
     * @param keepCurrentOutput Keeps current output nodes?
     */
    private disconnectOldNodes(keepCurrentOutput: boolean) {
        if (this.currentNodes) {
            this.currentNodes.input.disconnect();

            if (!keepCurrentOutput) {
                this.currentNodes.output.disconnect();
            }

            if (this.currentNodes.intermediateNodes) {
                for (const intermediate of this.currentNodes.intermediateNodes) {
                    intermediate.input.disconnect();
                    intermediate.output.disconnect();
                }
            }
        }
    }

    /** Reconnect the nodes if the compatibility/direct mode is enabled */
    private async reconnectNodesIfNeeded() {
        if (this.bufferPlayer && this.bufferPlayer.compatibilityMode &&
            this.currentContext && this.principalBuffer &&
            this.bufferPlayer && this.entrypointFilter) {
            await this.connectNodes(this.currentContext, this.principalBuffer, true, this.bufferPlayer.compatibilityMode);

            const speedAudio = this.entrypointFilter.getSpeed();
            this.bufferPlayer.speedAudio = speedAudio;
            this.bufferPlayer.duration = this.calculateAudioDuration(speedAudio) * speedAudio;
        }
    }

    /** Initialize worklets filters */
    private async initializeWorklets(context: BaseAudioContext) {
        for (const filter of this.filters) {
            if (filter.isWorklet()) {
                await (filter as AbstractAudioFilterWorklet<object>).initializeWorklet(context);
            }
        }
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

        if (!this.entrypointFilter) {
            throw new Error("Entrypoint filter is not available");
        }

        // If initial rendering is disabled, we stop here
        if (!this.initialRenderingDone && this.configService && this.configService.isInitialRenderingDisabled()) {
            this.loadInitialBuffer();
            this.initialRenderingDone = true;
            return true;
        }

        // If switching from compatiblity mode to normal mode, we stop the audio player
        if (this.configService && this.bufferPlayer && !this.configService.isCompatibilityModeEnabled() && this.bufferPlayer.compatibilityMode) {
            this.bufferPlayer.stop();
        }

        const speedAudio = this.entrypointFilter.getSpeed();
        const durationAudio = this.calculateAudioDuration(speedAudio);
        const offlineContext = new OfflineAudioContext(2, this.currentContext.sampleRate * durationAudio, this.currentContext.sampleRate);
        const outputContext = this.configService && this.configService.isCompatibilityModeEnabled() ? this.currentContext : offlineContext;

        this.renderedBuffer = await this.executeAudioRenderers(outputContext);
        this.currentOfflineContext = null;
        this.audioRenderingLastCanceled = false;

        this.setupPasstroughFilter(durationAudio);

        return await this.setupOutput(outputContext, durationAudio, offlineContext);
    }

    /**
     * Execute audio renderers then returns audio buffer rendered
     * @param outputContext The output context
     * @returns Audio buffer rendered
     */
    private async executeAudioRenderers(outputContext: AudioContext | OfflineAudioContext) {
        let currentBuffer = this.principalBuffer!;

        for (const renderer of this.renderers.sort((a, b) => a.order - b.order)) {
            if (renderer.isEnabled()) {
                currentBuffer = await renderer.renderAudio(outputContext, currentBuffer);
            }
        }
        return currentBuffer;
    }

    /**
     * Setup the passthrough filter to count audio rendering progress
     * @param durationAudio Audio duration - number
     */
    private setupPasstroughFilter(durationAudio: number) {
        this.resetAudioRenderingProgress();

        const passthroughFilter = this.filters.find(f => f.id === Constants.FILTERS_NAMES.PASSTHROUGH);

        if (passthroughFilter && this.currentContext) {
            (passthroughFilter as PassThroughFilter).totalSamples = durationAudio * this.currentContext.sampleRate;
        }
    }

    /**
     * Setup output buffers/nodes, then process the audio
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @param offlineContext An offline context to do the rendering (can be omited, in this case the rendering is done in real time - "compatibility mode")
     * @returns A promise resolved when the audio processing is done. The promise returns false if the audio processing was cancelled, or if an error occurred.
     */
    private async setupOutput(outputContext: BaseAudioContext, durationAudio?: number, offlineContext?: OfflineAudioContext): Promise<boolean> {
        if (this.renderedBuffer && this.configService && this.eventEmitter && this.bufferPlayer) {
            // Initialize worklets then connect the filter nodes
            await this.initializeWorklets(outputContext);
            await this.connectNodes(outputContext, this.renderedBuffer, false, this.configService.isCompatibilityModeEnabled());

            if (this.entrypointFilter) {
                const speedAudio = this.entrypointFilter.getSpeed();
                this.bufferPlayer.speedAudio = speedAudio;
            }

            // Standard mode
            if (!this.configService.isCompatibilityModeEnabled() && offlineContext && this.currentNodes) {
                this.currentOfflineContext = offlineContext;
                this.currentNodes.output.connect(outputContext.destination);

                const renderedBuffer = await offlineContext.startRendering();

                if (!this.loadRenderedAudio(renderedBuffer)) {
                    return await this.setupOutput(this.currentContext!, durationAudio);
                }

                if(this.audioRenderingLastCanceled) {
                    return false;
                }

                this.eventEmitter.emit(EventType.OFFLINE_AUDIO_RENDERING_FINISHED);
            } else { // Compatibility mode
                this.bufferPlayer.setCompatibilityMode(this.currentNodes!.output, durationAudio);
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
            if(!this.audioRenderingLastCanceled) {
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
            } else if(!this.initialRenderingDone) {
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
        if (this.currentOfflineContext && !this.audioRenderingLastCanceled) {
            this.audioRenderingLastCanceled = true;
            this.disconnectOldNodes(false);

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
        if (this.principalBuffer) {
            let duration = utils.calcAudioDuration(this.principalBuffer, speedAudio);

            for (const filter of this.filters) {
                if (filter.isEnabled()) {
                    duration += filter.getAddingTime();
                }
            }

            return duration;
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
        const state: FilterState = {};

        [...this.filters, ...this.renderers].forEach(filter => {
            state[filter.id] = filter.isEnabled();
        });

        return state;
    }

    /**
     * Get the settings of all filters/renderers
     * @returns 
     */
    getFiltersSettings(): Map<string, FilterSettings> {
        const settings = new Map<string, FilterSettings>();

        for (const filter of this.filters) {
            settings.set(filter.id, filter.getSettings());
        }

        return settings;
    }

    /**
     * Toggle enabled/disabled state for a filter/renderer
     * @param filterId The filter/renderer ID
     */
    toggleFilter(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);
        const renderer = this.renderers.find(f => f.id === filterId);

        if (filter) {
            filter.toggle();
        }

        if (renderer) {
            renderer.toggle();
        }

        this.reconnectNodesIfNeeded();
    }

    /**
     * Change a filter/renderer setting
     * @param filterId Filter ID
     * @param settings Filter setting (key/value)
     */
    async changeFilterSettings(filterId: string, settings: FilterSettings) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            for (const key of Object.keys(settings)) {
                await filter.setSetting(key, settings[key]);
            }

            await this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Reset the settings of a filter/renderer
     * @param filterId Id of the filter/renderer
     */
    async resetFilterSettings(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            await filter.resetSettings();
            this.reconnectNodesIfNeeded();
        }
    }

    /**
     * Reset all filters/renderers state (enabled/disabled) based on their default states
     */
    resetAllFiltersState() {
        [...this.filters, ...this.renderers].forEach(element => {
            if (element.isDefaultEnabled()) {
                element.enable();
            } else {
                element.disable();
            }
        });

        this.reconnectNodesIfNeeded();
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
    saveBuffer(options?: SaveBufferOptions): Promise<boolean> {
        if (this.savingBuffer) {
            return Promise.reject();
        }

        this.savingBuffer = true;

        return new Promise((resolve, reject) => {
            if (!this.bufferPlayer) {
                return reject();
            }

            if (!this.bufferPlayer.compatibilityMode) {
                if (!this.renderedBuffer || !this.currentContext) {
                    return resolve(false);
                }

                const worker = getRecorderWorker();

                if (worker) {
                    const buffer: Float32Array[] = [];

                    for (let i = 0; i < this.renderedBuffer.numberOfChannels; i++) {
                        buffer.push(this.renderedBuffer.getChannelData(i));
                    }

                    if (options?.format === "mp3" || Constants.DEFAULT_SAVE_FORMAT === "mp3") {
                        this.exportMP3(buffer, options);
                        this.savingBuffer = false;
                        resolve(true);
                    } else {
                        worker.onmessage = (e: RecorderWorkerMessage) => {
                            if (e.data.command == Constants.EXPORT_WAV_COMMAND) {
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
                            command: Constants.EXPORT_WAV_COMMAND,
                            type: Constants.AUDIO_WAV
                        });
                    }
                }
            } else {
                this.bufferPlayer.start().then(() => {
                    if (!this.configService) {
                        return reject();
                    }

                    const rec = new Recorder({
                        bufferLen: this.configService.getBufferSize(),
                        sampleRate: this.configService.getSampleRate(),
                        numChannels: 2,
                        workletBasePath: this.configService.getWorkletBasePath(),
                        mimeType: options?.format == "mp3" ? Constants.AUDIO_MP3 : Constants.AUDIO_WAV,
                        bitrate: options?.bitrate || Constants.DEFAULT_MP3_BITRATE
                    });

                    rec.setup(this.currentNodes!.output).then(() => {
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

                            rec.exportWAV((blob: Blob) => {
                                this.downloadAudioBlob(blob, options);

                                this.savingBuffer = false;
                                this.off(EventType.PLAYING_FINISHED, finishedCallback);
                                rec.kill();

                                resolve(true);
                            });
                        };

                        this.on(EventType.PLAYING_FINISHED, finishedCallback);
                        this.on(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                    });
                });
            }
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

    /**
     * Export an audio to MP3
     * @param buffers The buffers
     * @param options The save options
     */
    private exportMP3(buffers: Float32Array[], options?: SaveBufferOptions) {
        if (this.configService) {
            const mp3Data = utils.encodeMP3(buffers, 2, this.currentSampleRate, options?.bitrate || Constants.DEFAULT_MP3_BITRATE);
            const blob = new Blob(mp3Data, { type: Constants.AUDIO_MP3 });
            this.downloadAudioBlob(blob, options);
        }
    };
}
