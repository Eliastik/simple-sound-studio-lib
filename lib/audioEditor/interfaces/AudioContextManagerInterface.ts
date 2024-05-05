export default interface AudioContextManagerInterface {
    /**
     * Create new context if needed, for example if sample rate setting have changed
     * @param principalBuffer The audio buffer
     * @returns true if a new context was created, false otherwise
     */
    createNewContextIfNeeded(principalBuffer: AudioBuffer | null): boolean;
    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number;
    /**
     * Return the current audio context
     */
    get currentContext(): AudioContext | null | undefined;
}
