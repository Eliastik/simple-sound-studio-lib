export default interface AudioProcessorInterface {

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
