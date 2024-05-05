import SaveBufferOptions from "@/model/SaveBufferOptions";

export default interface SaveBufferManagerInterface {
    /**
     * Save the rendered audio to a buffer
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    saveBuffer(renderedBuffer: AudioBuffer | null, options?: SaveBufferOptions): Promise<boolean>;
}
