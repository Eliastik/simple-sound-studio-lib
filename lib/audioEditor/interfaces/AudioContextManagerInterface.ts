export default interface AudioContextManagerInterface {
    /**
     * Create new context if needed, for example if sample rate setting have changed
     * @param principalBuffer The audio buffer
     * @returns true if a new context was created, false otherwise
     */
    createNewContextIfNeeded(principalBuffer?: AudioBuffer | null): boolean;

    /**
     * Stop previous audio context and create a new one
     * @param sampleRate New sample rate
     */
    createNewContext(sampleRate: number): void;

    /**
     * Create and return a new OfflineAudioContext for one time use
     * @param numberOfChannels The number of channels
     * @param duration The duration of the buffer
     * @param sampleRate The sample rate
     * @returns The OfflineAudioContext
     */
    createOfflineAudioContext(numberOfChannels: number, duration: number, sampleRate: number): OfflineAudioContext;

    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number;

    /**
     * Return the current audio context
     */
    get currentContext(): AudioContext | null | undefined;
}
