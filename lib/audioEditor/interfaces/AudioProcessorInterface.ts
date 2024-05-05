export default interface AudioProcessorInterface {

    /** Prepare the AudioContext before use */
    prepareContext(principalBuffer: AudioBuffer | null): Promise<void>;

    /**
     * Render the audio to a buffer
     * @returns A promise resolved when the audio processing is finished.
     * The promise return false if the audio processing was cancelled or if an error occurred.
     * The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.
     */
    renderAudio(principalBuffer: AudioBuffer | null): Promise<boolean>;

    /**
     * Setup output buffers/nodes, then process the audio
     * @param outputContext Output audio context
     * @param durationAudio Duration of the audio buffer
     * @param offlineContext An offline context to do the rendering (can be omited, in this case the rendering is done in real time - "compatibility mode")
     * @returns A promise resolved when the audio processing is done. The promise returns false if the audio processing was cancelled, or if an error occurred.
     */
    setupOutput(principalBuffer: AudioBuffer | null, outputContext: BaseAudioContext, durationAudio?: number, offlineContext?: OfflineAudioContext): Promise<boolean>;

    /**
     * Cancel the audio rendering
     */
    cancelAudioRendering(): void;

    get renderedBuffer(): AudioBuffer | null;

    set initialRenderingDone(initialRenderingDone: boolean);

    get initialRenderingDone(): boolean;

    set sumPrincipalBuffer(sumPrincipalBuffer: number);

    get sumPrincipalBuffer(): number;
}
