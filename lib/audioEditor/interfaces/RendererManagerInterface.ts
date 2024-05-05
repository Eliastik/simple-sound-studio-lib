import AbstractAudioRenderer from "@/filters/interfaces/AbstractAudioRenderer";
import { FilterState } from "@/model/FilterState";

export default interface RendererManagerInterface {

    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer[]): void;

    /**
     * Get enabled/disabled state of all filters/renderers
     * @returns The filters state (enabled/disabled)
     */
    getRenderersState(): FilterState;

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
