import { EventEmitterCallback } from "@/model/EventEmitterCallback";
import { RecorderSettings } from "@/model/RecorderSettings";

export default interface VoiceRecorderInterface {

    /** Initialize this voice recorder */
    init(): Promise<void>;

    /**
     * Enable or disable audio feedback
     * @param enable boolean
     */
    audioFeedback(enable: boolean): void;

    /**
     * Enable/disable noise suppression
     * @param enable boolean
     */
    setNoiseSuppression(enable: boolean): void;

    /**
     * Enable/disable auto gain
     * @param enable boolean
     */
    setAutoGain(enable: boolean): void;

    /**
     * Enable/disable echo cancellation
     * @param enable boolean
     */
    setEchoCancellation(enable: boolean): void;

    /**
     * Change audio input
     * @param deviceId Device ID
     * @param groupId Group ID (optional)
     */
    changeInput(deviceId: string, groupId: string | undefined): void;

    /**
     * Start audio recording
     */
    record(): Promise<void>;

    /**
     * Stop audio recording
     */
    stop(): void;

    /**
     * Pause audio recording
     */
    pause(): void;

    /**
     * Reset this voice recorder
     */
    reset(): void;

    /**
     * Get current recording time in text format
     */
    get currentTimeDisplay(): string;

    /**
     * Get current recording time in seconds
     */
    get currentTime(): number;

    /**
     * Get the current settings for this voice recorder
     * @returns RecorderSettings
     */
    getSettings(): RecorderSettings;

    /**
     * Observe an event
     * @param event The event name
     * @param callback Callback called when an event of this type occurs
     * @deprecated Will be removed in a future release, use the EventEmitter.on method instead.
     */
    on(event: string, callback: EventEmitterCallback): void;

    /**
     * Check if browser is compatible with audio recording
     * @returns boolean
     */
    isRecordingAvailable(): boolean;
}
