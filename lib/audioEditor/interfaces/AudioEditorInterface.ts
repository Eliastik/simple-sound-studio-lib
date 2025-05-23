import AbstractAudioFilter from "@/filters/interfaces/AbstractAudioFilter";
import AbstractAudioRenderer from "@/filters/interfaces/AbstractAudioRenderer";
import { EventEmitterCallback } from "@/model/EventEmitterCallback";
import { FilterState } from "@/model/FilterState";
import SaveBufferOptions from "@/model/SaveBufferOptions";
import { FilterSettings } from "@/model/filtersSettings/FilterSettings";

export default interface AudioEditorInterface {
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
    getFiltersState(): FilterState;

    /**
     * Get the settings of all filters/renderers
     * @returns
     */
    getFiltersSettings(): Map<string, FilterSettings>;

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
    changeFilterSettings(filterId: string, settings: FilterSettings): Promise<void>;

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
    on(event: string, callback: EventEmitterCallback): void;

    /**
     * Unsubscribe to an event
     * @param event The event ID
     * @param callback The callback function
     * @deprecated Will be removed in a future release, use the EventEmitter.off method instead.
     */
    off(event: string, callback: EventEmitterCallback): void;

    /**
     * Save the rendered audio to a buffer
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    saveBuffer(options?: SaveBufferOptions): Promise<boolean>;

    set downloadingInitialData(state: boolean);

    get downloadingInitialData(): boolean;

    /** Get the index of the current loaded audio file from the file list */
    get currentIndexFileList(): number;

    /** Get the total number of audio files loaded */
    get totalFileList(): number;
}
