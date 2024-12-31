export interface ConfigService {
    /**
     * Get config with a key
     * @param key The key
     */
    getConfig(key: string): string | undefined | null;

    /**
     * Set config
     * @param key The key 
     * @param value The config value
     */
    setConfig(key: string, value: string): void;

    /**
     * Check if the compatibility/direct audio rendering mode is enabled
     */
    isCompatibilityModeEnabled(): boolean;

    /**
     * Was compatibility/direct audio rendering mode already checked for auto enabling? (if an error occurs rendering in offline context)
     */
    isCompatibilityModeChecked(): boolean;

    /**
     * Check if AudioWorklet is enabled for the filters
     */
    isAudioWorkletEnabled(): boolean;

    /** 
     * Check if AudioWorklet mode is enabled for Soundtouch
     */
    isSoundtouchAudioWorkletEnabled(): boolean;

    /**
     * Get buffer size setting
     */
    getBufferSize(): number;

    /**
     * Get sample rate, or 0 for auto
     */
    getSampleRate(): number;

    /**
     * Get MP3 bitrate
     */
    getBitrateMP3(): number;

    /**
     * Enable the compatibility/direct audio rendering mode
     */
    enableCompatibilityMode(): void;

    /**
     * Disable the compatibility/direct audio rendering mode
     */
    disableCompatibilityMode(): void;

    /**
     * Return the base path for worklet files
     */
    getWorkletBasePath(): string;

    /**
     * Return the base path for worker files
     */
    getWorkerBasePath(): string;

    /**
     * Return the base path for audio files (reverb environments for example)
     */
    getSoundBasePath(): string;

    /**
     * Set the base path for worklet files
     * 
     * @param workletBasePath The base path
     */
    setWorkletBasePath(workletBasePath: string): void;

     /**
     * Set the base path for worker files
     * 
     * @param workerBasePath The base path 
     */
    setWorkerBasePath(workerBasePath: string): void;

     /**
     * Set the base path for audio files (reverb environments for example)
     * 
     * @param soundBasePath The base path
     */
    setSoundBasePath(soundBasePath: string): void;

    /**
     * Check if initial audio rendering (when opening a file or buffer) is disabled
     */
    isInitialRenderingDisabled(): boolean;
};
