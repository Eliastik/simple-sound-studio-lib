import { Container } from 'inversify';
import BufferFetcherServiceInterface from '@/services/interfaces/BufferFetcherServiceInterface';
import BufferDecoderServiceInterface from '@/services/interfaces/BufferDecoderServiceInterface';
import EventEmitterInterface$1 from '@/utils/interfaces/EventEmitterInterface';
import AbstractAudioFilter$1 from '@/filters/interfaces/AbstractAudioFilter';
import AbstractAudioRenderer$1 from '@/filters/interfaces/AbstractAudioRenderer';
import { EventEmitterCallback as EventEmitterCallback$1 } from '@/model/EventEmitterCallback';
import { FilterState as FilterState$1 } from '@/model/FilterState';
import SaveBufferOptions$1 from '@/model/SaveBufferOptions';
import { FilterSettings as FilterSettings$1 } from '@/model/filtersSettings/FilterSettings';
import BufferPlayerInterface$1 from '@/bufferPlayer/interfaces/BufferPlayerInterface';
import * as ConfigService$1 from '@/services/interfaces/ConfigService';
import { ConfigService as ConfigService$2 } from '@/services/interfaces/ConfigService';
import AudioContextManagerInterface from '@/audioEditor/interfaces/AudioContextManagerInterface';
import AudioEditorEvents$1 from '@/model/AudioEditorEvent';
import { RecorderSettings as RecorderSettings$1 } from '@/model/RecorderSettings';
import FilterManagerInterface from '@/audioEditor/interfaces/FilterManagerInterface';
import AudioEditorInterface$1 from '@/audioEditor/interfaces/AudioEditorInterface';
import VoiceRecorderInterface$1 from '@/voiceRecorder/interfaces/VoiceRecorderInterface';

declare const audioEditorContainer: Container;

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
     * Check if initial audio rendering (when opening a file or buffer) is disabled
     */
    isInitialRenderingDisabled(): boolean;
}

declare abstract class AbstractAudioElement {
    /** Is this element enabled? */
    private enabled;
    /** Is this element enabled by default? */
    private defaultEnabled;
    bufferFetcherService: BufferFetcherServiceInterface | null;
    bufferDecoderService: BufferDecoderServiceInterface | null;
    configService: ConfigService | null;
    eventEmitter: EventEmitterInterface$1 | undefined;
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

declare abstract class AbstractAudioRenderer extends AbstractAudioElement {
    /** Render an AudioBuffer based on another input AudioBuffer */
    abstract renderAudio(context: BaseAudioContext, buffer: AudioBuffer): Promise<AudioBuffer>;
}

type EventEmitterCallback = (data: string | number | AudioBuffer | undefined) => void;

interface FilterState {
    [filterId: string]: boolean;
}

interface SaveBufferOptions {
    format?: "mp3" | "wav";
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
    /** Decode and load an audio buffer from an audio file */
    loadBufferFromFile(file: File): Promise<void>;
    /** Change the principal audio buffer of this editor */
    loadBuffer(audioBuffer: AudioBuffer): void;
    /**
     * Get the rendered audio buffer
     * @returns The AudioBuffer
     */
    getOutputBuffer(): AudioBuffer | null;
    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    renderAudio(): Promise<boolean>;
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
     */
    on(event: string, callback: EventEmitterCallback$1): void;
    /**
     * Unsubscribe to an event
     * @param event The event ID
     * @param callback The callback function
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
}

declare class AudioEditor extends AbstractAudioElement implements AudioEditorInterface {
    /** The filter manager */
    private filterManager;
    /** The renderer manager */
    private rendererManager;
    /** The context manager */
    private contextManager;
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
    constructor(player?: BufferPlayerInterface$1, eventEmitter?: EventEmitterInterface$1, configService?: ConfigService$1.ConfigService);
    private setup;
    addFilters(...filters: AbstractAudioFilter[]): void;
    addRenderers(...renderers: AbstractAudioRenderer[]): void;
    get currentSampleRate(): number;
    get defaultDeviceSampleRate(): number;
    loadBufferFromFile(file: File): Promise<void>;
    loadBuffer(audioBuffer: AudioBuffer): void;
    getOutputBuffer(): AudioBuffer | null;
    renderAudio(): Promise<boolean>;
    isAudioWorkletAvailable(): boolean;
    /** Filters settings */
    getFiltersState(): FilterState;
    getFiltersSettings(): Map<string, FilterSettings>;
    reconnectNodesIfNeeded(): Promise<void>;
    toggleFilter(filterId: string): void;
    changeFilterSettings(filterId: string, settings: FilterSettings): Promise<void>;
    resetFilterSettings(filterId: string): Promise<void>;
    resetAllFiltersState(): void;
    /** Events and exit */
    exit(): void;
    cancelAudioRendering(): void;
    on(event: string, callback: EventEmitterCallback): void;
    off(event: string, callback: EventEmitterCallback): void;
    saveBuffer(options?: SaveBufferOptions): Promise<boolean>;
    set downloadingInitialData(state: boolean);
    get downloadingInitialData(): boolean;
    get order(): number;
    get id(): string;
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
}

declare class BufferPlayer extends AbstractAudioElement implements BufferPlayerInterface {
    private _contextManager;
    private buffer;
    private source;
    currentTime: number;
    displayTime: number;
    duration: number;
    private intervals;
    playing: boolean;
    loop: boolean;
    speedAudio: number;
    private onBeforePlayingCallback;
    compatibilityMode: boolean;
    currentNode: AudioNode | null;
    constructor(contextManager: AudioContextManagerInterface | undefined | null, eventEmitter?: EventEmitterInterface$1);
    init(direct?: boolean): void;
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
    onBeforePlaying(callback: () => void): void;
    toggleLoop(): void;
    on(event: string, callback: EventEmitterCallback): void;
    get currentTimeDisplay(): string;
    get maxTimeDisplay(): string;
    get percent(): number;
    get remainingTimeDisplay(): string;
    get order(): number;
    get id(): string;
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

interface EventEmitterInterface {
    on(event: string, callback: EventEmitterCallback$1): void;
    emit(event: string, data?: string | number | AudioBuffer): void;
    off(event: string, callback: EventEmitterCallback$1): void;
    get listeners(): AudioEditorEvents$1;
    set listeners(listeners: AudioEditorEvents$1);
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
    stop(): Promise<void>;
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
     */
    on(event: string, callback: EventEmitterCallback$1): void;
    /**
     * Check if browser is compatible with audio recording
     * @returns boolean
     */
    isRecordingAvailable(): boolean;
}

declare class VoiceRecorder extends AbstractAudioElement implements VoiceRecorderInterface {
    private contextManager;
    private input;
    private stream;
    private recorder;
    private alreadyInit;
    private timer;
    private enableAudioFeedback;
    private recording;
    private deviceList;
    private constraints;
    private sampleRateConfigNotSupported;
    constructor(contextManager?: AudioContextManagerInterface | null, eventEmitter?: EventEmitterInterface, configService?: ConfigService);
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
    stop(): Promise<void>;
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

declare abstract class AbstractAudioFilterWorklet<T> extends AbstractAudioFilter {
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
        PASSTHROUGH: string;
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
        PASSTHROUGH: string;
    };
    WORKLET_NAMES: {
        BITCRUSHER: string;
        LIMITER: string;
        SOUNDTOUCH: string;
        RECORDER_WORKLET: string;
        PASSTHROUGH: string;
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

declare class EventEmitter implements EventEmitterInterface {
    listeners: AudioEditorEvents;
    constructor();
    on(event: string, callback: EventEmitterCallback): void;
    emit(event: string, data?: string | number | AudioBuffer): void;
    off(event: string, callback: EventEmitterCallback): void;
}

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
    getBitrateMP3(): number;
    enableCompatibilityMode(): void;
    disableCompatibilityMode(): void;
    getWorkletBasePath(): string;
    getWorkerBasePath(): string;
    getSoundBasePath(): string;
    isInitialRenderingDisabled(): boolean;
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
    /**
     * Calculate approximative audio duration according to enabled filters and their settings
     * @param speedAudio Current audio speed
     * @returns The audio duration
     */
    calculateAudioDuration(buffer: AudioBuffer, filterManager: FilterManagerInterface, speedAudio: number): number;
    /**
     * Reset audio rendering progress
     */
    resetAudioRenderingProgress(eventEmitter: EventEmitterInterface | undefined): void;
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
    RECORDER_UNKNOWN_ERROR = "recorderUnknownError",
    UPDATE_AUDIO_TREATMENT_PERCENT = "updateAudioTreatmentPercent",
    UPDATE_REMAINING_TIME_ESTIMATED = "updateRemainingTimeEstimated",
    CANCELLED_AND_LOADED_INITIAL_AUDIO = "cancelledAndLoadedInitialAudio",
    CANCELLING_AUDIO_PROCESSING = "cancellingAudioProcessing"
}

declare class SoundStudioFactory {
    private static ready;
    static createAudioEditor(configService?: ConfigService$2, buffersToFetch?: string[]): AudioEditorInterface$1;
    static createVoiceRecorder(): VoiceRecorderInterface$1;
    static getAudioEditorInstance(): AudioEditorInterface$1 | null;
    static getAudioPlayerInstance(): BufferPlayerInterface$1 | null;
    static getAudioRecorderInstance(): VoiceRecorderInterface$1 | null;
    static getEventEmitterInstance(): EventEmitterInterface | null;
    static getConfigServiceInstance(): ConfigService$2 | undefined;
}

export { AbstractAudioElement, AbstractAudioFilter, AbstractAudioFilterWorklet, AbstractAudioRenderer, AudioEditor, type AudioFilterEntrypointInterface, type AudioFilterNodes, BufferPlayer, type ConfigService, Constants, EventEmitter, type EventEmitterCallback, EventType, type FilterSettingValue, type FilterSettings, type FilterState, GenericConfigService, type GenericSettingValueAdditionalData, type RecorderSettings, type SaveBufferOptions, type SelectFormValue, SoundStudioFactory, utilFunctions as UtilFunctions, VoiceRecorder, audioEditorContainer };
