import BufferFetcherServiceInterface from '@/services/interfaces/BufferFetcherServiceInterface';
import BufferDecoderServiceInterface from '@/services/interfaces/BufferDecoderServiceInterface';
import EventEmitterInterface$1 from '@/utils/interfaces/EventEmitterInterface';
import AudioContextManagerInterface$1 from '@/audioEditor/interfaces/AudioContextManagerInterface';
import AbstractAudioElement$1 from '@/interfaces/AbstractAudioElement';
import AbstractAudioFilter$1 from '@/filters/interfaces/AbstractAudioFilter';
import AbstractAudioRenderer$1 from '@/filters/interfaces/AbstractAudioRenderer';
import { EventEmitterCallback as EventEmitterCallback$1 } from '@/model/EventEmitterCallback';
import { FilterState as FilterState$1 } from '@/model/FilterState';
import SaveBufferOptions$1 from '@/model/SaveBufferOptions';
import { FilterSettings as FilterSettings$1, FilterSettingValue as FilterSettingValue$1 } from '@/model/filtersSettings/FilterSettings';
import AudioFilterEntrypointInterface$1 from '@/filters/interfaces/AudioFilterEntrypointInterface';
import { AudioFilterNodes as AudioFilterNodes$1 } from '@/model/AudioNodes';
import BufferPlayerInterface$1 from '@/bufferPlayer/interfaces/BufferPlayerInterface';
import { RecorderSettings as RecorderSettings$1 } from '@/model/RecorderSettings';
import AudioEditorEvents$1 from '@/model/AudioEditorEvent';
import { EventType as EventType$1 } from '@/model/EventTypeEnum';
import { TypedArray } from '@/model/TypedArray';
import FilterManagerInterface$1 from '@/audioEditor/interfaces/FilterManagerInterface';
import AudioEditorInterface$1 from '@/audioEditor/interfaces/AudioEditorInterface';
import { ConfigService as ConfigService$1 } from '@/services/interfaces/ConfigService';
import VoiceRecorderInterface$1 from '@/voiceRecorder/interfaces/VoiceRecorderInterface';
import SoundStudioFactoryNewInstanceOptions$1 from '@/model/SoundStudioFactoryNewInstanceOptions';
import SoundStudioFactoryInstance$1 from '@/model/SoundStudioFactoryInstance';

interface ConfigService {
    /**
     * Get config with a key
     * @param key The key
     */
    getConfig(key: string): string | undefined | null;
    /**
     * Set config
     * @param key The key
     * @param value The config value
     */
    setConfig(key: string, value: string): void;
    /**
     * Check if the compatibility/direct audio rendering mode is enabled
     */
    isCompatibilityModeEnabled(): boolean;
    /**
     * Was compatibility/direct audio rendering mode already checked for auto enabling? (if an error occurs rendering in offline context)
     */
    isCompatibilityModeChecked(): boolean;
    /**
     * Check if AudioWorklet is enabled for the filters
     */
    isAudioWorkletEnabled(): boolean;
    /**
     * Check if AudioWorklet mode is enabled for Soundtouch
     */
    isSoundtouchAudioWorkletEnabled(): boolean;
    /**
     * Get buffer size setting
     */
    getBufferSize(): number;
    /**
     * Get sample rate, or 0 for auto
     */
    getSampleRate(): number;
    /**
     * Get MP3 bitrate
     */
    getBitrateMP3(): number;
    /**
     * Enable the compatibility/direct audio rendering mode
     */
    enableCompatibilityMode(): void;
    /**
     * Disable the compatibility/direct audio rendering mode
     */
    disableCompatibilityMode(): void;
    /**
     * Return the base path for worklet files
     */
    getWorkletBasePath(): string;
    /**
     * Return the base path for worker files
     */
    getWorkerBasePath(): string;
    /**
     * Return the base path for audio files (reverb environments for example)
     */
    getSoundBasePath(): string;
    /**
     * Set the base path for worklet files
     *
     * @param workletBasePath The base path
     */
    setWorkletBasePath(workletBasePath: string): void;
    /**
    * Set the base path for worker files
    *
    * @param workerBasePath The base path
    */
    setWorkerBasePath(workerBasePath: string): void;
    /**
    * Set the base path for audio files (reverb environments for example)
    *
    * @param soundBasePath The base path
    */
    setSoundBasePath(soundBasePath: string): void;
    /**
     * Check if initial audio rendering (when opening a file or buffer) is disabled
     */
    isInitialRenderingDisabled(): boolean;
}

declare abstract class AbstractAudioElement {
    protected bufferFetcherService: BufferFetcherServiceInterface | null;
    protected bufferDecoderService: BufferDecoderServiceInterface | null;
    protected configService: ConfigService | null;
    protected eventEmitter: EventEmitterInterface$1 | null;
    protected contextManager: AudioContextManagerInterface$1 | null;
    injectDependencies(bufferFetcherService: BufferFetcherServiceInterface | null, bufferDecoderService: BufferDecoderServiceInterface | null, configService: ConfigService | null, eventEmitter: EventEmitterInterface$1 | null, contextManager: AudioContextManagerInterface$1 | null): void;
}

interface AudioFilterNodes {
    input: AudioNode;
    output: AudioNode;
    intermediateNodes?: AudioFilterNodes[];
}

interface GenericSettingValueAdditionalData {
    [key: string]: string | number;
}

interface SelectFormValue {
    [key: string]: string | GenericSettingValueAdditionalData | undefined;
    name: string;
    value: string;
    additionalData?: GenericSettingValueAdditionalData;
}

type FilterSettingValue = string | boolean | number | File | SelectFormValue | string[] | undefined;
interface FilterSettings {
    [key: string]: FilterSettingValue;
    downloadedBuffers?: string[];
}

declare abstract class AbstractAudioNode extends AbstractAudioElement$1 {
    /** Is this element enabled? */
    private enabled;
    /** Is this element enabled by default? */
    private defaultEnabled;
    /** Returns the order in which the filter/renderer needs to be applied */
    abstract get order(): number;
    /** Returns the id of this filter/renderer */
    abstract get id(): string;
    /** Is this filter/renderer enabled? */
    isEnabled(): boolean;
    /** Is this filter/renderer enabled by default? */
    isDefaultEnabled(): boolean;
    /** Set to true if this filter/renderer needs to be enabled by default */
    setDefaultEnabled(state: boolean): void;
    /**
     * Set the enabled/disabled state
     * @param state true to enable, false to disable
     */
    setEnabled(state: boolean): void;
    /** Enable this filter/renderer */
    enable(): void;
    /** Disable this filter/renderer */
    disable(): void;
    /** Toggle to enabled/disabled this filter */
    toggle(): void;
}

declare abstract class AbstractAudioFilter extends AbstractAudioNode {
    /** The default settings */
    private defaultSettings;
    /** Total sample of the input audio buffer */
    protected _totalSamples: number;
    /** Return a input and output AudioNode of the filter */
    abstract getNode(context: BaseAudioContext): AudioFilterNodes;
    /** Return an object with current settings of this filter */
    abstract getSettings(): FilterSettings;
    /** Set a filter setting */
    abstract setSetting(settingId: string, value: FilterSettingValue): Promise<void>;
    /** Get the amount of time this filter add to the audio */
    getAddingTime(): number;
    /** Store the default settings */
    initializeDefaultSettings(): void;
    /** Returns the default settings of this filter */
    getDefaultSettings(): FilterSettings | null;
    /** Reset the default settings of this filter */
    resetSettings(): Promise<void>;
    /** Return if the current filter use an audio worklet */
    isWorklet(): boolean;
    /**
     * Called when the buffer fetcher was reseted
     * @returns boolean
    */
    bufferFetcherReseted(): Promise<boolean>;
    set totalSamples(value: number);
}

declare abstract class AbstractAudioRenderer extends AbstractAudioNode {
    /** Render an AudioBuffer based on another input AudioBuffer */
    abstract renderAudio(context: BaseAudioContext, buffer: AudioBuffer): Promise<AudioBuffer>;
}

type EventEmitterCallback = (data: string | number | AudioBuffer | undefined) => Promise<void> | void;

interface FilterState {
    [filterId: string]: boolean;
}

type AudioEncoderFormat = "mp3" | "wav" | "opus";

interface SaveBufferOptions {
    format?: AudioEncoderFormat;
    bitrate?: number;
}

interface AudioEditorInterface {
    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter$1[]): void;
    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer$1[]): void;
    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number;
    /**
     * Get the default device sample rate
     */
    get defaultDeviceSampleRate(): number;
    /** Load a list of file and load the first file into an audio buffer */
    loadFileList(fileList: FileList): Promise<void>;
    /** Decode and load an audio buffer from an audio file */
    loadBufferFromFile(file: File): Promise<void>;
    /** Load the audio buffer from the nth file from the file list loaded with the loadFileList method */
    loadBufferFromFileListIndex(index: number): Promise<void>;
    /** Change the principal audio buffer of this editor */
    loadBuffer(audioBuffer: AudioBuffer): void;
    /** Load the previous audio from list
     * @param forceInitialRendering true to force initial rendering of audio, ignoring user setting
    */
    loadPreviousAudio(forceInitialRendering?: boolean): Promise<void>;
    /**
     * Load the next audio from list
     * @param forceInitialRendering true to force initial rendering of audio, ignoring user setting
     * */
    loadNextAudio(forceInitialRendering?: boolean): Promise<void>;
    /**
     * @returns Return a map with key = filename and value = true if the audio file is currently loaded, false otherwise
     */
    getCurrentFileList(): Map<string, boolean>;
    /**
     * Get the rendered audio buffer
     * @returns The AudioBuffer
     */
    getOutputBuffer(): AudioBuffer | null;
    /**
     * Render the audio to a buffer
     * @param forceInitialRendering true to force initial rendering of audio, ignoring user setting
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    renderAudio(forceInitialRendering?: boolean): Promise<boolean>;
    /**
     * Check if AudioWorklet are available
     * @returns boolean
     */
    isAudioWorkletAvailable(): boolean;
    /**
     * Get enabled/disabled state of all filters/renderers
     * @returns The filters state (enabled/disabled)
     */
    getFiltersState(): FilterState$1;
    /**
     * Get the settings of all filters/renderers
     * @returns
     */
    getFiltersSettings(): Map<string, FilterSettings$1>;
    /** Reconnect the nodes if the compatibility/direct mode is enabled */
    reconnectNodesIfNeeded(): Promise<void>;
    /**
     * Enable a filter/renderer
     * @param filterId The filter/renderer ID
     */
    enableFilter(filterId: string): void;
    /**
     * Disable a filter/renderer
     * @param filterId The filter/renderer ID
     */
    disableFilter(filterId: string): void;
    /**
     * Toggle enabled/disabled state for a filter/renderer
     * @param filterId The filter/renderer ID
     */
    toggleFilter(filterId: string): void;
    /**
     * Change a filter setting
     * @param filterId Filter ID
     * @param settings Filter setting (key/value)
     */
    changeFilterSettings(filterId: string, settings: FilterSettings$1): Promise<void>;
    /**
     * Reset the settings of a filter
     * @param filterId Id of the filter
     */
    resetFilterSettings(filterId: string): Promise<void>;
    /**
     * Reset all filters/renderers state (enabled/disabled) based on their default states
     */
    resetAllFiltersState(): void;
    /**
     * Exit/reset the audio editor basic state
     */
    exit(): void;
    /**
     * Cancel the audio rendering
     */
    cancelAudioRendering(): void;
    /**
     * Subscribe to an event
     * @param event The event ID
     * @param callback The callback function
     * @deprecated Will be removed in a future release, use the EventEmitter.on method instead.
     */
    on(event: string, callback: EventEmitterCallback$1): void;
    /**
     * Unsubscribe to an event
     * @param event The event ID
     * @param callback The callback function
     * @deprecated Will be removed in a future release, use the EventEmitter.off method instead.
     */
    off(event: string, callback: EventEmitterCallback$1): void;
    /**
     * Save the rendered audio to a buffer
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    saveBuffer(options?: SaveBufferOptions$1): Promise<boolean>;
    set downloadingInitialData(state: boolean);
    get downloadingInitialData(): boolean;
    /** Get the index of the current loaded audio file from the file list */
    get currentIndexFileList(): number;
    /** Get the total number of audio files loaded */
    get totalFileList(): number;
}

interface FilterManagerInterface {
    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter$1[]): void;
    /**
     * Get enabled/disabled state of all filters
     * @returns The filters state (enabled/disabled)
     */
    getFiltersState(): FilterState$1;
    /**
     * Get the settings of all filters
     * @returns
     */
    getFiltersSettings(): Map<string, FilterSettings$1>;
    /**
     * Enable a filter
     * @param filterId The filter ID
     */
    enableFilter(filterId: string): void;
    /**
     * Disable a filter
     * @param filterId The filter ID
     */
    disableFilter(filterId: string): void;
    /**
     * Toggle enabled/disabled state for a filter
     * @param filterId The filter ID
     */
    toggleFilter(filterId: string): void;
    /**
     * Change a filter setting
     * @param filterId Filter ID
     * @param settings Filter setting (key/value)
     */
    changeFilterSettings(filterId: string, settings: FilterSettings$1): Promise<void>;
    /**
     * Reset the settings of a filter
     * @param filterId Id of the filter
     */
    resetFilterSettings(filterId: string): Promise<void>;
    /**
     * Reset all filters state (enabled/disabled) based on their default states
     */
    resetAllFiltersState(): void;
    /**
     * Connect the Audio API nodes of the enabled filters
     * @param context The Audio Context
     * @param buffer  The Audio Buffer
     * @param keepCurrentInputOutput Keep current first input/output nodes?
     * @param isCompatibilityMode Is compatibility mode enabled?
     */
    connectNodes(context: BaseAudioContext, buffer: AudioBuffer, keepCurrentInputOutput: boolean, isCompatibilityMode: boolean): Promise<void>;
    /**
     * Disconnect old audio nodes
     * @param keepCurrentOutput Keeps current output nodes?
     */
    disconnectOldNodes(keepCurrentOutput: boolean): void;
    /**
     * Initialize worklets filters
     */
    initializeWorklets(context: BaseAudioContext): Promise<void>;
    /**
     * Clear old worklets
     */
    clearWorklets(): void;
    /**
     * Get the total time the filters add to the audio duration
     */
    getAddingTime(): number;
    /**
     * Setup the total samples property for all filters
     * @param durationAudio Audio duration - number
     */
    setupTotalSamples(durationAudio: number, currentContext: AudioContext | null): void;
    /**
     * Call the bufferFetcherReseted method for each filter
     */
    resetFilterBuffers(): Promise<void>;
    /**
     * Returns the entrypoint filter
     */
    get entrypointFilter(): (AbstractAudioFilter$1 & AudioFilterEntrypointInterface$1) | null;
    /**
     * Get current audio nodes
     */
    get currentNodes(): AudioFilterNodes$1 | null;
}

interface RendererManagerInterface {
    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer$1[]): void;
    /**
     * Get enabled/disabled state of all renderers
     * @returns The renderers state (enabled/disabled)
     */
    getRenderersState(): FilterState$1;
    /**
     * Enable a renderer
     * @param filterId The filter ID
     */
    enableRenderer(rendererId: string): void;
    /**
     * Disable a renderer
     * @param filterId The filter ID
     */
    disableRenderer(rendererId: string): void;
    /**
     * Toggle enabled/disabled state for a renderer
     * @param filterId The renderer ID
     */
    toggleRenderer(rendererId: string): void;
    /**
     * Reset all renderers state (enabled/disabled) based on their default states
     */
    resetAllRenderersState(): void;
    /**
     * Execute audio renderers then returns audio buffer rendered
     * @param buffer The buffer to process
     * @param outputContext The output context
     * @returns Audio buffer rendered
     */
    executeAudioRenderers(buffer: AudioBuffer, outputContext: AudioContext | OfflineAudioContext): Promise<AudioBuffer>;
}

interface AudioContextManagerInterface {
    /**
     * Create new context if needed, for example if sample rate setting have changed
     * @param principalBuffer The audio buffer
     * @returns true if a new context was created, false otherwise
     */
    createNewContextIfNeeded(principalBuffer?: AudioBuffer | null): boolean;
    /**
     * Stop previous audio context and create a new one
     * @param sampleRate New sample rate
     */
    createNewContext(sampleRate: number): void;
    /**
     * Create and return a new OfflineAudioContext for one time use
     * @param numberOfChannels The number of channels
     * @param duration The duration of the buffer
     * @param sampleRate The sample rate
     * @returns The OfflineAudioContext
     */
    createOfflineAudioContext(numberOfChannels: number, duration: number, sampleRate: number): OfflineAudioContext;
    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number;
    /**
     * Return the current audio context
     */
    get currentContext(): AudioContext | null | undefined;
}

interface SaveBufferManagerInterface {
    /**
     * Save the rendered audio then download the audio
     * @param renderedBuffer The rendered buffer to save
     * @param options The save options - see SaveBufferOptions
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    saveBuffer(renderedBuffer: AudioBuffer | null, options?: SaveBufferOptions$1): Promise<boolean>;
}

interface AudioProcessorInterface {
    /**
     * Prepare the AudioContext before use
     * @param inputBuffer The input audio buffer
     */
    prepareContext(inputBuffer: AudioBuffer | null): Promise<void>;
    /**
     * Render the audio to a buffer
     * @param inputBuffer The input audio buffer
     * @param forceInitialRendering Force initial audio rendering, ignoring user setting
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "get renderedBuffer" method.
     */
    renderAudio(inputBuffer: AudioBuffer | null, forceInitialRendering?: boolean): Promise<boolean>;
    /**
     * Setup output buffers/nodes, then process the audio
     * @param inputBuffer The input audio buffer
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @returns A promise resolved when the audio processing is done. The promise returns false if the audio processing was cancelled, or if an error occurred.
     */
    setupOutput(inputBuffer: AudioBuffer | null, outputContext: BaseAudioContext, durationAudio?: number): Promise<boolean>;
    /**
     * Cancel the audio rendering
     */
    cancelAudioRendering(): void;
    /**
     * Clear and remove rendered buffer to free memory
     */
    clearRenderedBuffer(): void;
    /**
     * Reset the audio rendering progress
     */
    resetAudioRenderingProgress(): void;
    /**
     * Update the audio speed and duration
     * @param audioDuration The duration of the audio
     */
    updateAudioSpeedAndDuration(audioDuration?: number): void;
    /**
     * Get the rendered audio buffer
     */
    get renderedBuffer(): AudioBuffer | null;
    /**
     * Set initialRenderingDone boolean
     */
    set initialRenderingDone(initialRenderingDone: boolean);
    /**
     * Was initial rendering done?
     */
    get initialRenderingDone(): boolean;
    /**
     * Set the sum of all samples of the input audio buffer
     */
    set sumInputBuffer(sumInputBuffer: number);
    /**
     * Get the sum of all samples of the input audio buffer
     */
    get sumInputBuffer(): number;
}

interface BufferManagerInterface {
    /**
     * Reset the buffer fetcher and redownload the buffers. Used when changing sample rate.
     */
    resetBufferFetcher(): Promise<void>;
    set downloadingInitialData(downloadingInitialData: boolean);
    get downloadingInitialData(): boolean;
}

/**
 * Principal class used to manage audio processing: load an audio file or buffer,
 * manage filters/renderers (enable/disable, settings), add new filters/renderers,
 * download rendered audio, get rendered audio buffer
 */
declare class AudioEditor extends AbstractAudioElement implements AudioEditorInterface {
    /** The filter manager */
    private filterManager;
    /** The renderer manager */
    private rendererManager;
    /** The save buffer manager */
    private saveBufferManager;
    /** The save buffer manager */
    private audioProcessor;
    /** The save buffer manager */
    private bufferManager;
    /** The audio player */
    private bufferPlayer;
    /** The audio buffer to be processed */
    private principalBuffer;
    /** The list of file selected by user */
    private fileList;
    /** The current index of the loaded file from file list */
    private fileListCurrIndex;
    private loadingAudio;
    private renderingAudio;
    constructor(filterManager: FilterManagerInterface, rendererManager: RendererManagerInterface, contextManager: AudioContextManagerInterface, saveBufferManager: SaveBufferManagerInterface, audioProcessor: AudioProcessorInterface, bufferManager: BufferManagerInterface, player: BufferPlayerInterface$1);
    setup(): void;
    addFilters(...filters: AbstractAudioFilter[]): void;
    addRenderers(...renderers: AbstractAudioRenderer[]): void;
    get currentSampleRate(): number;
    get defaultDeviceSampleRate(): number;
    loadBufferFromFile(file: File): Promise<void>;
    loadFileList(fileList: FileList): Promise<void>;
    loadBufferFromFileListIndex(index: number): Promise<void>;
    loadPreviousAudio(forceInitialRendering?: boolean): Promise<void>;
    loadNextAudio(forceInitialRendering?: boolean): Promise<void>;
    getCurrentFileList(): Map<string, boolean>;
    get currentIndexFileList(): number;
    get totalFileList(): number;
    loadBuffer(audioBuffer: AudioBuffer): void;
    getOutputBuffer(): AudioBuffer | null;
    renderAudio(forceInitialRendering?: boolean): Promise<boolean>;
    isAudioWorkletAvailable(): boolean;
    getFiltersState(): FilterState;
    getFiltersSettings(): Map<string, FilterSettings>;
    reconnectNodesIfNeeded(): Promise<void>;
    enableFilter(filterId: string): void;
    disableFilter(filterId: string): void;
    toggleFilter(filterId: string): void;
    changeFilterSettings(filterId: string, settings: FilterSettings): Promise<void>;
    resetFilterSettings(filterId: string): Promise<void>;
    resetAllFiltersState(): void;
    exit(): void;
    private clearBuffers;
    private clearPrincipalBuffer;
    private clearRenderedBuffer;
    cancelAudioRendering(): void;
    on(event: string, callback: EventEmitterCallback): void;
    off(event: string, callback: EventEmitterCallback): void;
    saveBuffer(options?: SaveBufferOptions): Promise<boolean>;
    set downloadingInitialData(state: boolean);
    get downloadingInitialData(): boolean;
}

interface BufferPlayerInterface {
    /**
     * Init this buffer player
     * @param direct Play audio buffer directly without stopping previous play?
     */
    init(direct?: boolean): void;
    /**
     * Load an audio buffer
     * @param buffer The buffer
     */
    loadBuffer(buffer: AudioBuffer): void;
    /**
     * Enable compatibility mode
     * @param currentNode Current audio node to read
     * @param duration The audio duration
     */
    setCompatibilityMode(currentNode: AudioNode, duration?: number): void;
    /**
     * Reset this player
     * @param direct Play audio buffer directly without stopping previous play?
     */
    reset(direct?: boolean): void;
    /**
     * Stop playing the audio
     */
    stop(): void;
    /**
     * Start playing the audio
     * @param direct Play audio buffer directly without stopping previous play?
     */
    start(direct?: boolean): Promise<void>;
    /**
     * Play audio directly, without stopping previous audio play
     */
    playDirect(): void;
    /**
     * Pause the audio
     */
    pause(): void;
    /**
    * Set the current starting time of this player
    * @param percent Where to start playing, in percent
    */
    setTimePercent(percent: number): void;
    /**
      * Set the current starting time of this player
      * @param time Where to start playing, in milliseconds
      */
    setTime(time: number): void;
    /**
      * Callback called just before starting playing the audio
      * @param callback The callback
      * @deprecated Will be removed in a future release, use the EventEmitter.on(EventType.PLAYING_STARTED) method instead.
      */
    onBeforePlaying(callback: () => Promise<void>): void;
    /**
      * Enable/disable loop playing
      */
    toggleLoop(): void;
    /**
     * Enable/disable looping all audio
     */
    toggleLoopAll(): void;
    /**
      * Observe an event
      * @param event The event name
      * @param callback Callback called when an event of this type occurs
      * @deprecated Will be removed in a future release, use the EventEmitter.on method instead.
      */
    on(event: string, callback: EventEmitterCallback$1): void;
    /**
     * Get the time in text format
     */
    get currentTimeDisplay(): string;
    /**
     * Get the audio duration in text format
     */
    get maxTimeDisplay(): string;
    /**
     * Get the percent played
     */
    get percent(): number;
    /**
     * Get the remaining time in text format
     */
    get remainingTimeDisplay(): string;
    /**
     * Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)
     */
    set compatibilityMode(compatibilityMode: boolean);
    /**
     * Is compatibility mode enabled?
     */
    get compatibilityMode(): boolean;
    /**
     * Set to true to play audio in loop
     */
    set loop(loop: boolean);
    /**
     * Is audio playing in loop?
     */
    get loop(): boolean;
    /**
     * Is playing all audio list in loop?
     */
    get loopAll(): boolean;
    /**
     * Set the audio speed
     */
    set speedAudio(speedAudio: number);
    /**
     * Get the audio speed
     */
    get speedAudio(): number;
    /**
     * Set the audio duration
     */
    set duration(duration: number);
    /**
     * Get the audio duration
     */
    get duration(): number;
    /**
     * Set the volume of the audio
     */
    set volume(volume: number);
    /**
     * Get the volume of the audio
     */
    get volume(): number;
}

declare class BufferPlayer extends AbstractAudioElement implements BufferPlayerInterface {
    private buffer;
    private source;
    private gainNode;
    private intervals;
    private _volume;
    private _duration;
    currentTime: number;
    displayTime: number;
    playing: boolean;
    loop: boolean;
    loopAll: boolean;
    speedAudio: number;
    compatibilityMode: boolean;
    currentNode: AudioNode | null;
    setup(): void;
    init(direct?: boolean): void;
    private createGainNode;
    loadBuffer(buffer: AudioBuffer): void;
    setCompatibilityMode(currentNode: AudioNode, duration?: number): void;
    reset(direct?: boolean): void;
    stop(): void;
    /**
     * Clear old intervals
     */
    private clearIntervals;
    start(direct?: boolean): Promise<void>;
    playDirect(): Promise<void>;
    pause(): void;
    /** Send an event to update the informations of this player */
    private updateInfos;
    setTimePercent(percent: number): void;
    setTime(time: number): void;
    set volume(volume: number);
    private setGainNodeValue;
    get volume(): number;
    get duration(): number;
    set duration(duration: number);
    onBeforePlaying(callback: () => Promise<void>): void;
    toggleLoop(): void;
    toggleLoopAll(): void;
    on(event: string, callback: EventEmitterCallback): void;
    get currentTimeDisplay(): string;
    get maxTimeDisplay(): string;
    get percent(): number;
    get remainingTimeDisplay(): string;
}

interface ConstraintULong {
    min?: number;
    max?: number;
    ideal?: number;
    exact?: number;
}
interface AudioConstraint {
    [key: string]: ConstraintULong | string | number | boolean | undefined;
    noiseSuppression?: boolean;
    echoCancellation?: boolean;
    autoGainControl?: boolean;
    deviceId?: string;
    groupId?: string;
    sampleRate?: ConstraintULong;
}

interface RecorderSettings {
    deviceList: MediaDeviceInfo[];
    constraints: AudioConstraint;
    audioFeedback: boolean;
}

interface VoiceRecorderInterface {
    /** Initialize this voice recorder */
    init(): Promise<void>;
    /**
     * Enable or disable audio feedback
     * @param enable boolean
     */
    audioFeedback(enable: boolean): void;
    /**
     * Enable/disable noise suppression
     * @param enable boolean
     */
    setNoiseSuppression(enable: boolean): void;
    /**
     * Enable/disable auto gain
     * @param enable boolean
     */
    setAutoGain(enable: boolean): void;
    /**
     * Enable/disable echo cancellation
     * @param enable boolean
     */
    setEchoCancellation(enable: boolean): void;
    /**
     * Change audio input
     * @param deviceId Device ID
     * @param groupId Group ID (optional)
     */
    changeInput(deviceId: string, groupId: string | undefined): void;
    /**
     * Start audio recording
     */
    record(): Promise<void>;
    /**
     * Stop audio recording
     */
    stop(): void;
    /**
     * Pause audio recording
     */
    pause(): void;
    /**
     * Reset this voice recorder
     */
    reset(): void;
    /**
     * Get current recording time in text format
     */
    get currentTimeDisplay(): string;
    /**
     * Get current recording time in seconds
     */
    get currentTime(): number;
    /**
     * Get the current settings for this voice recorder
     * @returns RecorderSettings
     */
    getSettings(): RecorderSettings$1;
    /**
     * Observe an event
     * @param event The event name
     * @param callback Callback called when an event of this type occurs
     * @deprecated Will be removed in a future release, use the EventEmitter.on method instead.
     */
    on(event: string, callback: EventEmitterCallback$1): void;
    /**
     * Check if browser is compatible with audio recording
     * @returns boolean
     */
    isRecordingAvailable(): boolean;
}

declare class VoiceRecorder extends AbstractAudioElement implements VoiceRecorderInterface {
    private recorder;
    private input;
    private stream;
    private alreadyInit;
    private timer;
    private enableAudioFeedback;
    private recording;
    private deviceList;
    private constraints;
    private sampleRateConfigNotSupported;
    constructor(contextManager: AudioContextManagerInterface$1 | null, configService: ConfigService);
    init(): Promise<void>;
    private successCallback;
    private errorCallback;
    private notFoundErrorCallback;
    private unknownErrorCallback;
    audioFeedback(enable: boolean): void;
    /**
     * Get current constraints/settings
     * @returns MediaTrackSettings
     */
    private getConstraints;
    /**
     * Update the current constraints
     */
    private updateConstraints;
    /**
     * Reset the current constraints
     * @param newConstraint AudioConstraintWrapper
     */
    private resetConstraints;
    /**
     * Setup this voice recorder
     * @param stream MediaStream
     * @param precRecording Was recording?
     * @param precAudioFeedback Has audio feedback?
     */
    private setup;
    setNoiseSuppression(enable: boolean): void;
    setAutoGain(enable: boolean): void;
    setEchoCancellation(enable: boolean): void;
    /**
     * Update current audio input list
     */
    private updateInputList;
    changeInput(deviceId: string, groupId: string | undefined): void;
    record(): Promise<void>;
    stop(): void;
    pause(): void;
    /**
     * Stop stream
     */
    private stopStream;
    reset(): void;
    get currentTimeDisplay(): string;
    get currentTime(): number;
    getSettings(): RecorderSettings;
    on(event: string, callback: EventEmitterCallback): void;
    isRecordingAvailable(): boolean;
}

/**
 * This class is the standard AudioWorkletProcessor interface
 */
interface AudioWorkletProcessorInterface {
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
    get parameters(): AudioParamMap;
    get parameterDescriptors(): AudioParamMap;
    messageProcessor?: (event: MessageEvent) => void;
}
type ParameterDescriptors = {
    name: string;
    defaultValue: number;
}[];
/**
 * This class is a polyfill for the AudioWorkletProcessor interface
 */
declare class SimpleAudioWorkletProcessor implements AudioWorkletProcessorInterface {
    private messageChannel;
    messageProcessor?: ((event: MessageEvent) => void) | undefined;
    constructor();
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
    get port(): MessagePort | null;
    get port2(): MessagePort | null;
    get parameters(): AudioParamMap;
    get parameterDescriptors(): AudioParamMap;
    get defaultParameterDescriptors(): ParameterDescriptors;
}

/**
 * This class convert an audio worklet processor node to a script processor node
 * automagically. Might not work with some WorkletProcessor
 */
declare class WorkletScriptProcessorNodeAdapter {
    private workletProcessor;
    private _parameters;
    private _port;
    private _scriptProcessorNode;
    private currentContext;
    constructor(context: BaseAudioContext, node: SimpleAudioWorkletProcessor, bufferSize?: number);
    private setupPort;
    private setupProcessor;
    private setupWorkletScope;
    private stop;
    get port(): MessagePort | null;
    get parameters(): AudioParamMap;
    get node(): ScriptProcessorNode | null;
    get context(): BaseAudioContext | undefined;
}

declare abstract class AbstractAudioFilterWorklet<T> extends AbstractAudioFilter {
    protected currentWorkletNode: AudioWorkletNode | WorkletScriptProcessorNodeAdapter | null;
    protected fallbackToScriptProcessor: boolean;
    protected keepCurrentNodeIfPossible: boolean;
    private loadedModulesMap;
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
    initializeWorklet(audioContext: BaseAudioContext): Promise<void>;
    /**
     * This method checks if audio worklet are enabled
     * @param audioContext
     */
    protected isAudioWorkletEnabled(): boolean;
    /**
     * Check if the Worklet is available and can be used
     * @returns true if this is the case, false otherwise
     */
    protected isAudioWorkletAvailable(): boolean;
    /**
     * Initialize the AudioWorkletNode or fallback to ScriptProcessorNode
     * @param context The audio context
     * @param workletName The worklet name
     */
    private initializeNode;
    /**
     * Apply current settings to the audio worklet node.
     * Uses the getSettings method to extract the settings.
     */
    protected applyCurrentSettingsToWorklet(): void;
    /**
     * Set a setting of the Worklet
     * @param settingKey The setting name
     * @param currentSettings The setting value
     */
    protected setWorkletSetting(settingKey: string, settingValue: FilterSettingValue$1): void;
    /** Default implementation for GetNode - AbstractAudioFilterWorklet */
    getNode(context: BaseAudioContext): {
        input: ScriptProcessorNode;
        output: ScriptProcessorNode;
    } | {
        input: AudioWorkletNode;
        output: AudioWorkletNode;
    };
    /**
     * Stop the current worklet node. The worklet need to respond to "stop" events.
     */
    stop(): void;
    /**
     * Pass the current disabled/enabled state to the worklet.
     * The worklet need to respond to "enable"/"disable" events.
     * @param state The current disabled/enabled state
     */
    setEnabled(state: boolean): void;
    isWorklet(): boolean;
}

interface AudioFilterEntrypointInterface {
    /** Return the entrypoint node, with an audio context and an input AudioBuffer */
    getEntrypointNode(context: BaseAudioContext, buffer: AudioBuffer, offline: boolean): Promise<AudioFilterNodes>;
    /** Get the speed of the audio */
    getSpeed(): number;
    /** Update the state of the filter */
    updateState(): void;
}

declare const Constants: {
    AUDIO_EDITOR: string;
    VOICE_RECORDER: string;
    BUFFER_PLAYER: string;
    AUDIO_CONTEXT_MANAGER: string;
    AUDIO_PROCESSOR: string;
    BUFFER_MANAGER: string;
    FILTER_MANAGER: string;
    RENDERER_MANAGER: string;
    SAVE_BUFFER_MANAGER: string;
    EXPORT_WAV_COMMAND: string;
    EXPORT_MP3_COMMAND: string;
    AUDIO_WAV: string;
    AUDIO_MP3: string;
    RECORD_COMMAND: string;
    INIT_COMMAND: string;
    FILTERS_NAMES: {
        REVERB: string;
        ECHO: string;
        BASS_BOOST: string;
        BITCRUSHER: string;
        HIGH_PASS: string;
        LIMITER: string;
        LOW_PASS: string;
        RENDERING_PROGRESS_CALCULATION: string;
        RETURN_AUDIO: string;
        SOUNDTOUCH: string;
        TELEPHONIZER: string;
        VOCODER: string;
    };
    WORKLET_PATHS: {
        BITCRUSHER: string;
        LIMITER: string;
        SOUNDTOUCH: string;
        RECORDER_WORKLET: string;
        RENDERING_PROGRESS_CALCULATION: string;
    };
    WORKLET_NAMES: {
        BITCRUSHER: string;
        LIMITER: string;
        SOUNDTOUCH: string;
        RECORDER_WORKLET: string;
        RENDERING_PROGRESS_CALCULATION: string;
    };
    PREFERENCES_KEYS: {
        COMPATIBILITY_MODE_ENABLED: string;
        COMPATIBILITY_MODE_CHECKED: string;
        ENABLE_AUDIO_WORKLET: string;
        ENABLE_SOUNDTOUCH_AUDIO_WORKLET: string;
        BUFFER_SIZE: string;
        SAMPLE_RATE: string;
        DISABLE_INITIAL_RENDERING: string;
        BITRATE_MP3: string;
    };
    ENABLE_SOUNDTOUCH_AUDIO_WORKLET: boolean;
    ENABLE_AUDIO_WORKLET: boolean;
    ENABLE_RECORDER_AUDIO_WORKLET: boolean;
    SOUNDTOUCH_PITCH_SHIFTER_BUFFER_SIZE: number;
    SOUNDTOUCH_DEFAULT_SPEED: number;
    SOUNDTOUCH_DEFAULT_FREQUENCY: number;
    SOUNDTOUCH_DEFAULT_PITCH_SEMITONES: number;
    DEFAULT_REVERB_ENVIRONMENT: {
        name: string;
        url: string;
        size: number;
        addDuration: number;
        link: string;
    };
    VOCODER_MODULATOR: string;
    DEFAULT_BUFFER_SIZE: number;
    VALID_BUFFER_SIZE: number[];
    VALID_MP3_BITRATES: number[];
    DEFAULT_SAMPLE_RATE: number;
    VALID_SAMPLE_RATES: number[];
    TREATMENT_TIME_COUNTING_THROTTLE_INTERVAL: number;
    TREATMENT_TIME_COUNTING_SMOOTHING_FACTOR: number;
    DISABLE_INITIAL_RENDERING: boolean;
    DEFAULT_SAVE_FORMAT: string;
    DEFAULT_MP3_BITRATE: number;
};

interface AudioEditorEvents {
    [key: string]: EventEmitterCallback[];
}

interface EventEmitterInterface {
    /**
     * Adds a listener for a specific event.
     *
     * @param event The name of the event to listen for.
     * Can be a predefined {@link EventType} or a custom string.
     * @param callback The callback function to execute when the event is triggered.
     */
    on(event: EventType$1 | string, callback: EventEmitterCallback$1): void;
    /**
     * Emits an event with optional data.
     *
     * @param event The name of the event to emit.
     * Can be a predefined {@link EventType} or a custom string.
     * @param data (Optional) The data associated with the event,
     * which can be a string, number, AudioBuffer, or Error.
     * @returns A promise that resolves once all listeners have been executed.
     */
    emit(event: EventType$1 | string, data?: string | number | AudioBuffer | Error): Promise<void>;
    /**
     * Removes a listener for a specific event.
     *
     * @param event The name of the event.
     * Can be a predefined {@link EventType} or a custom string.
     * @param callback The callback function to remove from the event.
     */
    off(event: EventType$1 | string, callback: EventEmitterCallback$1): void;
    /**
     * Gets the current list of events and their listeners.
     */
    get listeners(): AudioEditorEvents$1;
    /**
     * Sets the list of events and their listeners.
     *
     * @param listeners - The new list of events.
     */
    set listeners(listeners: AudioEditorEvents$1);
}

declare class EventEmitter implements EventEmitterInterface {
    private _listeners;
    constructor();
    on(event: EventType$1 | string, callback: EventEmitterCallback): void;
    emit(event: EventType$1 | string, data?: string | number | AudioBuffer): Promise<void>;
    off(event: EventType$1 | string, callback: EventEmitterCallback): void;
    get listeners(): AudioEditorEvents;
    set listeners(events: AudioEditorEvents);
}

/**
 * Default implementation for a ConfigService, using a built-in map.
 * The configuration is not stored in localstorage in this case.
 */
declare class GenericConfigService implements ConfigService {
    private mapConfig;
    private workerBasePath;
    private workletBasePath;
    private soundBasePath;
    getConfig(key: string): string | undefined | null;
    setConfig(key: string, value: string): void;
    isCompatibilityModeEnabled(): boolean;
    isCompatibilityModeChecked(): boolean;
    isAudioWorkletEnabled(): boolean;
    isSoundtouchAudioWorkletEnabled(): boolean;
    getBufferSize(): number;
    getSampleRate(): number;
    getBitrateMP3(): number;
    enableCompatibilityMode(): void;
    disableCompatibilityMode(): void;
    getWorkletBasePath(): string;
    getWorkerBasePath(): string;
    getSoundBasePath(): string;
    setWorkletBasePath(workletBasePath: string): void;
    setWorkerBasePath(workerBasePath: string): void;
    setSoundBasePath(soundBasePath: string): void;
    isInitialRenderingDisabled(): boolean;
}

declare const utilFunctions: {
    calcAudioDuration: (audio: AudioBuffer, speed?: number) => number;
    loadAudioBuffer: (context: AudioContext, file: File) => Promise<AudioBuffer>;
    readAsArrayBufferPromisified: (file: File) => Promise<ArrayBuffer>;
    decodeBuffer: (context: AudioContext, buffer: AudioBuffer) => AudioBuffer;
    convertAudioBufferToFloat32Array: (buffer: AudioBuffer) => Float32Array<ArrayBufferLike>[];
    convertAudioParamToFloat32Array: (param: AudioParam, length: number) => Float32Array<ArrayBuffer>;
    sumAudioBufferChannel(buffer: AudioBuffer, channel: number): number;
    sumAudioBuffer(buffer: AudioBuffer): number;
    /**
    * This method checks if the browser is compatible with audio worklets
    * @param audioContext
    */
    isAudioWorkletCompatible(audioContext: BaseAudioContext): boolean;
    /**
     * Check that the setting value is correct
     * @param value FilterSettingValue
     */
    isSettingValueValid(value: FilterSettingValue): boolean;
    /**
     * Calculate approximative audio duration according to enabled filters and their settings
     * @param speedAudio Current audio speed
     * @returns The audio duration
     */
    calculateAudioDuration(buffer: AudioBuffer, filterManager: FilterManagerInterface$1, speedAudio?: number): number;
    forceDownload(blob: Blob, filename: string): void;
    clearAudioBuffer(buffer: AudioBuffer | null): void;
    floatTo16BitPCM(output: DataView, offset: number, input: Float32Array): void;
    /**
     * Convert a Float32Array to an Int16Array
     * @param floatbuffer The buffer to convert
     * @returns Int16Array buffer
     */
    convertFloat32Array2Int16(floatbuffer: Float32Array): Int16Array<ArrayBuffer>;
    clampFloatValue(value: number): number;
    writeStringToDataView(view: DataView, offset: number, string: string): void;
    interleaveBuffers<T extends TypedArray>(inputL: T, inputR: T): T;
    getLengthFromBuffers<T extends TypedArray>(buffers: T[]): number;
    mergeBuffers<T extends TypedArray>(buffers: T[]): T;
};

declare enum EventType {
    LOADING_BUFFERS = "loadingBuffers",
    LOADING_BUFFERS_ERROR = "loadingBuffersError",
    FETCHING_BUFFERS = "fetchingBuffers",
    FETCHING_BUFFERS_ERROR = "fetchingBuffersError",
    FINISHED_FETCHING_BUFFERS = "finishedFetchingBuffers",
    LOADED_BUFFERS = "loadedBuffers",
    COMPATIBILITY_MODE_AUTO_ENABLED = "compatibilityModeAutoEnabled",
    STARTED_RENDERING_AUDIO = "renderingAudio",
    RENDERING_AUDIO_PROBLEM_DETECTED = "renderingAudioProblemDetected",
    AUDIO_RENDERING_FINISHED = "audioRenderingFinished",
    AUDIO_RENDERING_EXCEPTION_THROWN = "audioRenderingExceptionThrown",
    OFFLINE_AUDIO_RENDERING_FINISHED = "offlineAudioRenderingFinished",
    PLAYING_STOPPED = "playingStopped",
    PLAYING_STARTED = "playingStarted",
    PLAYING_FINISHED = "playingFinished",
    PLAYING_UPDATE = "playingUpdate",
    RECORDER_INIT = "recorderInit",
    RECORDER_SUCCESS = "recorderSuccess",
    RECORDER_ERROR = "recorderError",
    RECORDER_UPDATE_CONSTRAINTS = "recorderUpdateConstraints",
    RECORDER_RECORDING = "recorderRecording",
    RECORDER_STOPPED = "recorderStopped",
    RECORDER_PAUSED = "recorderPaused",
    RECORDER_RESETED = "recorderReseted",
    RECORDER_COUNT_UPDATE = "recorderCountUpdate",
    SAMPLE_RATE_CHANGED = "sampleRateChanged",
    DECODING_AUDIO_FILE = "decodingAudioFile",
    DECODED_AUDIO_FILE = "decodedAudioFile",
    ERROR_DECODING_AUDIO_FILE = "errorDecodingAudioFile",
    RECORDER_NOT_FOUND_ERROR = "recorderNotFoundError",
    RECORDER_UNKNOWN_ERROR = "recorderUnknownError",
    UPDATE_AUDIO_TREATMENT_PERCENT = "updateAudioTreatmentPercent",
    UPDATE_REMAINING_TIME_ESTIMATED = "updateRemainingTimeEstimated",
    CANCELLED_AND_LOADED_INITIAL_AUDIO = "cancelledAndLoadedInitialAudio",
    CANCELLING_AUDIO_PROCESSING = "cancellingAudioProcessing",
    PLAYING_FINISHED_LOOP_ALL = "playingFinishedLoopAll",
    LOADED_AUDIO_FILE_FROM_LIST = "loadedAudioFileFromList",
    AUDIO_SPEED_UPDATED = "audioSpeedUpdated",
    AUDIO_DURATION_UPDATED = "audioDurationUpdated",
    FALLBACK_WORKLET_TO_SCRIPT_PROCESSOR = "fallbackWorkletToScriptProcessor",
    WORKLET_SUCCESSFULLY_LOADED = "workletSuccessfullyLoaded"
}

/**
 * Factory class to create instances of sound studio components.
 *
 * This factory supports both singleton-based methods (deprecated) and a new
 * instance-based creation model. The singleton methods will be removed in a
 * future release.
 */
declare class SoundStudioFactory {
    private static ready;
    private static audioEditor;
    private static audioPlayer;
    private static configService;
    private static eventEmitter;
    private static voiceRecorder;
    /**
     * Create a new instance of sound studio components.
     *
     * @param options Optional configuration for the new instance. See SoundStudioFactoryNewInstanceOptions
     * @returns A new instance of the sound studio components. See SoundStudioFactoryInstance
     */
    static createNewInstance(options?: SoundStudioFactoryNewInstanceOptions$1): SoundStudioFactoryInstance$1;
    /**
     * Create a singleton AudioEditor instance.
     *
     * @param configService Optional configuration service.
     * @param buffersToFetch Optional list of audio buffers to pre-fetch.
     * @returns The singleton AudioEditor instance.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static createAudioEditor(configService?: ConfigService$1, buffersToFetch?: string[]): AudioEditorInterface$1;
    /**
     * Create a singleton VoiceRecorder instance.
     *
     * @returns The singleton VoiceRecorder instance.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static createVoiceRecorder(): VoiceRecorderInterface$1;
    /**
     * Get the singleton AudioEditor instance.
     *
     * @returns The singleton AudioEditor instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getAudioEditorInstance(): AudioEditorInterface$1 | null;
    /**
     * Get the singleton BufferPlayer instance.
     *
     * @returns The singleton BufferPlayer instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getAudioPlayerInstance(): BufferPlayerInterface$1 | null;
    /**
     * Get the singleton VoiceRecorder instance.
     *
     * @returns The singleton VoiceRecorder instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getAudioRecorderInstance(): VoiceRecorderInterface$1 | null;
    /**
     * Get the singleton EventEmitter instance.
     *
     * @returns The singleton EventEmitter instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getEventEmitterInstance(): EventEmitterInterface | null;
    /**
     * Get the singleton ConfigService instance.
     *
     * @returns The singleton ConfigService instance, or undefined if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getConfigServiceInstance(): ConfigService$1 | undefined;
}

declare const FilterNames: {
    REVERB: string;
    ECHO: string;
    BASS_BOOST: string;
    BITCRUSHER: string;
    HIGH_PASS: string;
    LIMITER: string;
    LOW_PASS: string;
    RENDERING_PROGRESS_CALCULATION: string;
    RETURN_AUDIO: string;
    SOUNDTOUCH: string;
    TELEPHONIZER: string;
    VOCODER: string;
};

interface SoundStudioFactoryNewInstanceOptions {
    configService?: ConfigService$1;
    buffersToFetch?: string[];
}

interface SoundStudioFactoryInstance {
    audioEditor: AudioEditorInterface$1;
    voiceRecorder: VoiceRecorderInterface$1;
    audioPlayer: BufferPlayerInterface$1;
    eventEmitter: EventEmitterInterface$1;
    configService: ConfigService$1;
}

export { AbstractAudioElement, AbstractAudioFilter, AbstractAudioFilterWorklet, AbstractAudioNode, AbstractAudioRenderer, AudioEditor, BufferPlayer, Constants, EventEmitter, EventType, FilterNames, GenericConfigService, SoundStudioFactory, utilFunctions as UtilFunctions, VoiceRecorder };
export type { AudioFilterEntrypointInterface, AudioFilterNodes, ConfigService, EventEmitterCallback, FilterSettingValue, FilterSettings, FilterState, GenericSettingValueAdditionalData, RecorderSettings, SaveBufferOptions, SelectFormValue, SoundStudioFactoryInstance, SoundStudioFactoryNewInstanceOptions };
