import AudioContextManager from "@/audioEditor/AudioContextManager";
import { EventEmitterCallback } from "@/model/EventEmitterCallback";

export default interface BufferPlayerInterface {

    /** Init this buffer player */
    init(direct?: boolean): void;

    /**
     * Load an audio buffer
     * @param buffer The buffer
     */
    loadBuffer(buffer: AudioBuffer): void;

    /**
     * Enable compatibility mode
     * @param currentNode Current audio node to read
     * @param duration The audio duration
     */
    setCompatibilityMode(currentNode: AudioNode, duration?: number): void;

    /**
     * Reset this player
     */
    reset(direct?: boolean): void;

    /**
     * Stop playing the audio
     */
    stop(): void;

    /**
     * Start playing the audio
     */
    start(direct?: boolean): Promise<void>;

    /**
     * Play audio directly, without stopping previous audio play
     */
    playDirect(): void;

    /**
     * Pause the audio
     */
    pause(): void;
    
    /**
    * Set the current starting time of this player
    * @param percent Where to start playing, in percent
    */
   setTimePercent(percent: number): void;

   /**
     * Set the current starting time of this player
     * @param time Where to start playing, in milliseconds
     */
   setTime(time: number): void;

   /**
     * Callback called just before starting playing the audio
     * @param callback The callback
     */
   onBeforePlaying(callback: () => void): void;

   /**
     * Enable/disable loop playing
     */
   toggleLoop(): void;

   /**
     * Observe an event
     * @param event The event name
     * @param callback Callback called when an event of this type occurs
     */
   on(event: string, callback: EventEmitterCallback): void;

    /**
     * Get the time in text format
     */
    get currentTimeDisplay(): string;

    /** 
     * Get the audio duration in text format
     */
    get maxTimeDisplay(): string;

    /**
     * Get the percent played
     */
    get percent(): number;

    /**
     * Get the remaining time in text format
     */
    get remainingTimeDisplay(): string;

    set contextManager(contextManager: AudioContextManager | undefined);

    set compatibilityMode(compatibilityMode: boolean);

    get compatibilityMode(): boolean;

    set loop(loop: boolean);

    get loop(): boolean;

    set speedAudio(speedAudio: number);

    get speedAudio(): number;

    set duration(duration: number);

    get duration(): number;
}
