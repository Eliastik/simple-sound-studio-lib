import AbstractAudioFilter from "@/filters/interfaces/AbstractAudioFilter";
import AudioFilterEntrypointInterface from "@/filters/interfaces/AudioFilterEntrypointInterface";
import { AudioFilterNodes } from "@/model/AudioNodes";
import { FilterState } from "@/model/FilterState";
import { FilterSettings } from "@/model/filtersSettings/FilterSettings";

export default interface FilterManagerInterface {

    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter[]): void;

    /**
     * Get enabled/disabled state of all filters
     * @returns The filters state (enabled/disabled)
     */
    getFiltersState(): FilterState;

    /**
     * Get the settings of all filters
     * @returns 
     */
    getFiltersSettings(): Map<string, FilterSettings>;

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
    changeFilterSettings(filterId: string, settings: FilterSettings): Promise<void>;

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
    connectNodes(context: BaseAudioContext, buffer: AudioBuffer, keepCurrentInputOutput: boolean, isCompatibilityMode: boolean): void;

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
    get entrypointFilter(): (AbstractAudioFilter & AudioFilterEntrypointInterface) | null;

    /**
     * Get current audio nodes
     */
    get currentNodes(): AudioFilterNodes | null;
}
