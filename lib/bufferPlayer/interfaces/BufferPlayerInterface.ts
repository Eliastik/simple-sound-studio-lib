import { EventEmitterCallback } from "@/model/EventEmitterCallback";

export default interface BufferPlayerInterface {

    /**
     * Init this buffer player
     * @param direct Play audio buffer directly without stopping previous play?
     */
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
     * @param direct Play audio buffer directly without stopping previous play?
     */
    reset(direct?: boolean): void;

    /**
     * Stop playing the audio
     */
    stop(): void;

    /**
     * Start playing the audio
     * @param direct Play audio buffer directly without stopping previous play?
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
    * Enable/disable looping all audio
    */
   toggleLoopAll(): void;

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

    /**
     * Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)
     */
    set compatibilityMode(compatibilityMode: boolean);

    /**
     * Is compatibility mode enabled?
     */
    get compatibilityMode(): boolean;

    /**
     * Set to true to play audio in loop
     */
    set loop(loop: boolean);

    /**
     * Is audio playing in loop?
     */
    get loop(): boolean;

    /**
     * Is playing all audio list in loop?
     */
    get loopAll(): boolean;

    /**
     * Set the audio speed
     */
    set speedAudio(speedAudio: number);

    /**
     * Get the audio speed
     */
    get speedAudio(): number;

    /**
     * Set the audio duration
     */
    set duration(duration: number);

    /**
     * Get the audio duration
     */
    get duration(): number;

    /**
     * Set the volume of the audio
     */
    set volume(volume: number);

    /**
     * Get the volume of the audio
     */
    get volume();
}
