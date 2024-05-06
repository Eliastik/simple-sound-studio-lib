import SaveBufferOptions from "@/model/SaveBufferOptions";

export default interface SaveBufferManagerInterface {
    /**
     * Save the rendered audio then download the audio
     * @param renderedBuffer The rendered buffer to save
     * @param options The save options - see SaveBufferOptions
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    saveBuffer(renderedBuffer: AudioBuffer | null, options?: SaveBufferOptions): Promise<boolean>;
}
