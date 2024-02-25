type EventEmitterCallback = (data: string | number | AudioBuffer | undefined) => void;

interface AudioEditorEvents {
    [key: string]: EventEmitterCallback[];
}

declare class EventEmitter {
    listeners: AudioEditorEvents;
    constructor();
    on(event: string, callback: EventEmitterCallback): void;
    emit(event: string, data?: string | number | AudioBuffer): void;
    off(event: string, callback: EventEmitterCallback): void;
}

declare class BufferDecoderService {
    private context;
    private eventEmitter;
    constructor(context: AudioContext, eventEmitter?: EventEmitter);
    decodeBufferFromFile(file: File): Promise<AudioBuffer | null>;
    updateContext(context: AudioContext): void;
}

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
     * Return the base path for audio files (reverb environments for example)
     */
    getSoundBasePath(): string;
}

declare class BufferFetcherService {
    private context;
    private buffers;
    private bufferErrors;
    private eventEmitter;
    private configService;
    constructor(context: AudioContext, configService: ConfigService, eventEmitter?: EventEmitter);
    fetchBuffer(bufferURI: string, force?: boolean): Promise<void>;
    fetchAllBuffers(bufferURIs: string[]): Promise<void>;
    getAudioBuffer(filename: string): AudioBuffer | undefined;
    getOrFetchAudioBuffer(filename: string): Promise<AudioBuffer | undefined>;
    getDownloadedBuffersList(): string[];
    private getKeyFromLocation;
    updateContext(context: AudioContext): void;
    reset(): void;
}

declare abstract class AbstractAudioElement {
    private enabled;
    private defaultEnabled;
    bufferFetcherService: BufferFetcherService | null;
    bufferDecoderService: BufferDecoderService | null;
    configService: ConfigService | null;
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
    setEnabled(state: boolean): void;
    /** Enable this filter/renderer */
    enable(): void;
    /** Disable this filter/renderer */
    disable(): void;
    /** Toggle to enabled/disabled this filter */
    toggle(): void;
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

declare abstract class AbstractAudioFilter extends AbstractAudioElement {
    private defaultSettings;
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
}

declare abstract class AbstractAudioRenderer extends AbstractAudioElement {
    /** Render an AudioBuffer based on another input AudioBuffer */
    abstract renderAudio(context: BaseAudioContext, buffer: AudioBuffer): Promise<AudioBuffer>;
}

declare class BufferPlayer extends AbstractAudioElement {
    private context;
    private buffer;
    private source;
    currentTime: number;
    displayTime: number;
    duration: number;
    private interval;
    playing: boolean;
    loop: boolean;
    speedAudio: number;
    private eventEmitter;
    private onBeforePlayingCallback;
    compatibilityMode: boolean;
    currentNode: AudioNode | null;
    constructor(context: AudioContext | OfflineAudioContext | null, eventEmitter?: EventEmitter);
    /** Init this buffer player */
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
     */
    reset(direct?: boolean): void;
    /**
     * Stop playing the audio
     */
    stop(): void;
    /**
     * Start playing the audio
     */
    start(direct?: boolean): Promise<void>;
    /**
     * Play audio directly, without stopping previous audio play
     */
    playDirect(): Promise<void>;
    /**
     * Pause the audio
     */
    pause(): void;
    /** Send an event to update the informations of this player */
    private updateInfos;
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
     */
    onBeforePlaying(callback: () => void): void;
    /**
     * Enable/disable loop playing
     */
    toggleLoop(): void;
    /**
     * Observe an event
     * @param event The event name
     * @param callback Callback called when an event of this type occurs
     */
    on(event: string, callback: EventEmitterCallback): void;
    /**
     * Set a new audio context
     * @param context The new audio context
     */
    updateContext(context: AudioContext): void;
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
    get order(): number;
    get id(): string;
}

interface FilterState {
    [filterId: string]: boolean;
}

declare class AudioEditor extends AbstractAudioElement {
    /** The current audio context */
    private currentContext;
    /** The audio buffer to be processed */
    private principalBuffer;
    /** The sum of all the samples of the principal buffer,
     * used to detect the need to enable the compatibility mode */
    private sumPrincipalBuffer;
    /** The resulting audio buffer */
    private renderedBuffer;
    /** The entrypoint filter */
    private entrypointFilter;
    /** A list of filters */
    private filters;
    /** A list of renderers */
    private renderers;
    /** The audio player */
    private bufferPlayer;
    /** The event emitter */
    private eventEmitter;
    /** The current connected nodes */
    private currentNodes;
    /** If we are currently processing and downloading the buffer */
    private savingBuffer;
    /** The previous sample rate setting */
    private previousSampleRate;
    /** List of audio buffers to fetch */
    private audioBuffersToFetch;
    /** Callback used when saving audio */
    private playingStoppedCallback;
    /** True if we are downloading initial buffer data */
    downloadingInitialData: boolean;
    constructor(context?: AudioContext | null, player?: BufferPlayer, eventEmitter?: EventEmitter, configService?: ConfigService, audioBuffersToFetch?: string[]);
    private setup;
    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter[]): void;
    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer[]): void;
    /** Setup all audio filters */
    private setupDefaultFilters;
    /** Setup the renderers */
    private setupDefaultRenderers;
    /**
     * Fetch default buffers from network
     * @param refetch true if we need to refetch the buffers
     */
    private fetchBuffers;
    /**
     * Create new context if needed, for example if sample rate setting have changed
     */
    private createNewContextIfNeeded;
    /**
     * Reset the buffer fetcher and redownload the buffers. Used when changing sample rate.
     */
    private resetBufferFetcher;
    /**
     * Stop previous audio context and create a new one
     */
    private createNewContext;
    /** Prepare the AudioContext before use */
    private prepareContext;
    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number;
    /**
     * Get the default device sample rate
     */
    get defaultDeviceSampleRate(): number;
    /** Decode and load an audio buffer from an audio file */
    loadBufferFromFile(file: File): Promise<void>;
    /** Change the principal audio buffer of this editor */
    loadBuffer(audioBuffer: AudioBuffer): void;
    /**
     * Connect the Audio API nodes of the enabled filters
     * @param context The Audio Context
     * @param buffer  The Audio Buffer
     * @param keepCurrentInputOutput Keep current first input/output nodes?
     */
    private connectNodes;
    /**
     * Disconnect old audio nodes
     * @param keepCurrentOutput Keeps current output nodes?
     */
    private disconnectOldNodes;
    /** Reconnect the nodes if the compatibility/direct mode is enabled */
    private reconnectNodesIfNeeded;
    /** Initialize worklets filters */
    private initializeWorklets;
    /**
     * Get the rendered audio buffer
     * @returns The AudioBuffer
     */
    getOutputBuffer(): AudioBuffer | null;
    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    renderAudio(): Promise<void>;
    /**
     * Setup output buffers/nodes, then process the audio
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @param offlineContext An offline context to do the rendering (can be omited, in this case the rendering is done in real time - "compatibility mode")
     * @returns A promise resolved when the audio processing is done
     */
    private setupOutput;
    /**
     * Calculate approximative audio duration according to enabled filters and their settings
     * @param speedAudio Current audio speed
     * @returns The audio duration
     */
    private calculateAudioDuration;
    get order(): number;
    get id(): string;
    isEnabled(): boolean;
    /**
     * Check if AudioWorklet are available
     * @returns boolean
     */
    isAudioWorkletAvailable(): boolean;
    /**
     * Set compatibility/direct audio rendering mode already checked for auto enabling (if an error occurs rendering in offline context)
     * @param checked boolean
     */
    private setCompatibilityModeChecked;
    /** Filters settings */
    /**
     * Get enabled/disabled state of all filters/renderers
     * @returns The filters state (enabled/disabled)
     */
    getFiltersState(): FilterState;
    /**
     * Get the settings of all filters/renderers
     * @returns
     */
    getFiltersSettings(): Map<string, FilterSettings>;
    /**
     * Toggle enabled/disabled state for a filter/renderer
     * @param filterId The filter/renderer ID
     */
    toggleFilter(filterId: string): void;
    /**
     * Change a filter/renderer setting
     * @param filterId Filter ID
     * @param settings Filter setting (key/value)
     */
    changeFilterSettings(filterId: string, settings: FilterSettings): Promise<void>;
    /**
     * Reset the settings of a filter/renderer
     * @param filterId Id of the filter/renderer
     */
    resetFilterSettings(filterId: string): Promise<void>;
    /**
     * Reset all filters/renderers state (enabled/disabled) based on their default states
     */
    resetAllFiltersState(): void;
    /** Events and exit */
    /**
     * Exit/reset the audio editor basic state
     */
    exit(): void;
    /**
     * Subscribe to an event
     * @param event The event ID
     * @param callback The callback function
     */
    on(event: string, callback: EventEmitterCallback): void;
    /**
     * Unsubscribe to an event
     * @param event The event ID
     * @param callback The callback function
     */
    off(event: string, callback: EventEmitterCallback): void;
    /**
     * Save the rendered audio to a buffer
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    saveBuffer(): Promise<boolean>;
    /**
     * Download an audio Blob
     * @param blob The blob
     */
    private downloadAudioBlob;
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

declare class VoiceRecorder extends AbstractAudioElement {
    private context;
    private input;
    private stream;
    private recorder;
    private alreadyInit;
    private timer;
    private enableAudioFeedback;
    private recording;
    private deviceList;
    private constraints;
    private eventEmitter;
    private previousSampleRate;
    private sampleRateConfigNotSupported;
    constructor(context?: AudioContext | null, eventEmitter?: EventEmitter, configService?: ConfigService);
    /** Initialize this voice recorder */
    init(): Promise<void>;
    /**
     * Create new context if needed, for example if sample rate setting have changed
     */
    private createNewContextIfNeeded;
    /**
     * Stop previous audio context and create a new one
     */
    private createNewContext;
    private successCallback;
    private errorCallback;
    private notFoundErrorCallback;
    private unknownErrorCallback;
    /**
     * Enable or disable audio feedback
     * @param enable boolean
     */
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
     * Update current audio input list
     */
    private updateInputList;
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
    stop(): Promise<void>;
    /**
     * Pause audio recording
     */
    pause(): void;
    /**
     * Stop stream
     */
    private stopStream;
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
    getSettings(): RecorderSettings;
    /**
     * Observe an event
     * @param event The event name
     * @param callback Callback called when an event of this type occurs
     */
    on(event: string, callback: EventEmitterCallback): void;
    /**
     * Check if browser is compatible with audio recording
     * @returns boolean
     */
    isRecordingAvailable(): boolean;
    get order(): number;
    get id(): string;
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
 * automagically. Highly experimental, and might not work with some WorkletProcessor
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
    get port(): MessagePort | null;
    get parameters(): AudioParamMap;
    get node(): ScriptProcessorNode | null;
    get context(): BaseAudioContext | undefined;
}

declare abstract class AbstractAudioFilterWorklet extends AbstractAudioFilter {
    protected currentWorkletNode: AudioWorkletNode | WorkletScriptProcessorNodeAdapter | null;
    protected fallbackToScriptProcessor: boolean;
    protected keepCurrentNodeIfPossible: boolean;
    /**
     * Return the worklet name (as registered with method registerProcessor)
     */
    abstract get workletName(): string;
    /**
     * Return the path to worklet file
     */
    abstract get workletPath(): string;
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
    EXPORT_WAV_COMMAND: string;
    AUDIO_WAV: string;
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
        PASS_THROUGH: string;
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
    };
    WORKLET_NAMES: {
        BITCRUSHER: string;
        LIMITER: string;
        SOUNDTOUCH: string;
        RECORDER_WORKLET: string;
    };
    PREFERENCES_KEYS: {
        COMPATIBILITY_MODE_ENABLED: string;
        COMPATIBILITY_MODE_CHECKED: string;
        ENABLE_AUDIO_WORKLET: string;
        ENABLE_SOUNDTOUCH_AUDIO_WORKLET: string;
        BUFFER_SIZE: string;
        SAMPLE_RATE: string;
    };
    ENABLE_SOUNDTOUCH_AUDIO_WORKLET: boolean;
    ENABLE_AUDIO_WORKLET: boolean;
    ENABLE_RECORDER_AUDIO_WORKLET: boolean;
    SOUNDTOUCH_PITCH_SHIFTER_BUFFER_SIZE: number;
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
    DEFAULT_SAMPLE_RATE: number;
    VALID_SAMPLE_RATES: number[];
};

/**
 * Default implementation for a ConfigService, using a built-in map.
 * The configuration is not stored in localstorage in this case.
 */
declare class GenericConfigService implements ConfigService {
    private mapConfig;
    getConfig(key: string): string | undefined | null;
    setConfig(key: string, value: string): void;
    isCompatibilityModeEnabled(): boolean;
    isCompatibilityModeChecked(): boolean;
    isAudioWorkletEnabled(): boolean;
    isSoundtouchAudioWorkletEnabled(): boolean;
    getBufferSize(): number;
    getSampleRate(): number;
    enableCompatibilityMode(): void;
    disableCompatibilityMode(): void;
    getWorkletBasePath(): string;
    getSoundBasePath(): string;
}

declare const utilFunctions: {
    calcAudioDuration: (audio: AudioBuffer, speed: number) => number;
    loadAudioBuffer: (context: AudioContext, file: File) => Promise<AudioBuffer>;
    readAsArrayBufferPromisified: (file: File) => Promise<ArrayBuffer>;
    decodeBuffer: (context: AudioContext, buffer: AudioBuffer) => AudioBuffer;
    convertAudioBufferToFloat32Array: (buffer: AudioBuffer) => Float32Array[];
    convertAudioParamToFloat32Array: (param: AudioParam, length: number) => Float32Array;
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
};

declare enum EventType {
    LOADING_BUFFERS = "loadingBuffers",
    LOADING_BUFFERS_ERROR = "loadingBuffersError",
    FETCHING_BUFFERS = "fetchingBuffers",
    FETCHING_BUFFERS_ERROR = "fetchingBuffersError",
    FINISHED_FETCHING_BUFFERS = "finishedFetchingBuffers",
    LOADED_BUFFERS = "loadedBuffers",
    COMPATIBILITY_MODE_AUTO_ENABLED = "compatibilityModeAutoEnabled",
    RENDERING_AUDIO_PROBLEM_DETECTED = "renderingAudioProblemDetected",
    AUDIO_RENDERING_FINISHED = "audioRenderingFinished",
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
    RECORDER_UNKNOWN_ERROR = "recorderUnknownError"
}

export { AbstractAudioElement, AbstractAudioFilter, AbstractAudioFilterWorklet, AbstractAudioRenderer, AudioEditor, type AudioFilterEntrypointInterface, type AudioFilterNodes, BufferPlayer, type ConfigService, Constants, EventEmitter, type EventEmitterCallback, EventType, type FilterSettingValue, type FilterSettings, type FilterState, GenericConfigService, type GenericSettingValueAdditionalData, type RecorderSettings, type SelectFormValue, utilFunctions as UtilFunctions, VoiceRecorder };
