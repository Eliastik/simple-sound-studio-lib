export default interface AudioProcessorInterface {

    /**
     * Prepare the AudioContext before use
     * @param inputBuffer The input audio buffer
     */
    prepareContext(inputBuffer: AudioBuffer | null): Promise<void>;

    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "get renderedBuffer" method.
     */
    renderAudio(inputBuffer: AudioBuffer | null): Promise<boolean>;

    /**
     * Setup output buffers/nodes, then process the audio
     * @param inputBuffer The input audio buffer
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @param offlineContext An offline context to do the rendering (can be omited, in this case the rendering is done in real time - "compatibility mode")
     * @returns A promise resolved when the audio processing is done. The promise returns false if the audio processing was cancelled, or if an error occurred.
     */
    setupOutput(inputBuffer: AudioBuffer | null, outputContext: BaseAudioContext, durationAudio?: number, offlineContext?: OfflineAudioContext): Promise<boolean>;

    /**
     * Cancel the audio rendering
     */
    cancelAudioRendering(): void;

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
