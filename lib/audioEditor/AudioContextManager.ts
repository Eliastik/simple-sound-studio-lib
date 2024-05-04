import { EventType } from "@/model/EventTypeEnum";
import { ConfigService } from "@/services/ConfigService";
import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import Constants from "@/model/Constants";
import EventEmitter from "@/utils/EventEmitter";

export default class AudioContextManager extends AbstractAudioElement {

    /** The current event emitter */
    private eventEmitter: EventEmitter | undefined;
    /** The current audio context */
    private _currentContext: AudioContext | null | undefined;
    /** The old audio context */
    private oldAudioContext: AudioContext | null | undefined;
    /** The previous sample rate setting */
    private previousSampleRate = Constants.DEFAULT_SAMPLE_RATE;

    constructor(context: AudioContext | undefined | null, configService: ConfigService | null, eventEmitter: EventEmitter | null) {
        super();

        this._currentContext = context;
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.configService = configService;

        this.setup();
    }

    private setup() {
        if (this.configService) {
            this.previousSampleRate = this.configService.getSampleRate();

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.SAMPLE_RATE_CHANGED, this.previousSampleRate);
            }
        }

        if (!this.currentContext) {
            this.createNewContext(this.previousSampleRate);
        }
    }

    /**
     * Create new context if needed, for example if sample rate setting have changed
     * @param principalBuffer The audio buffer
     * @returns true if a new context was created, false otherwise
     */
    createNewContextIfNeeded(principalBuffer: AudioBuffer | null) {
        const isCompatibilityModeEnabled = this.configService && this.configService.isCompatibilityModeEnabled();

        if (isCompatibilityModeEnabled && principalBuffer) {
            // If compatibility mode is enabled, we use the sample rate of the input audio buffer
            if (this.currentSampleRate != principalBuffer.sampleRate) {
                this.createNewContext(principalBuffer.sampleRate);
                this.previousSampleRate = principalBuffer.sampleRate;

                return true;
            }
        } else {
            // Otherwise we change the context if the sample rate has changed
            let currentSampleRate = Constants.DEFAULT_SAMPLE_RATE;

            if (this.configService) {
                currentSampleRate = this.configService.getSampleRate();
            }

            // If sample rate setting has changed, create a new audio context
            if (currentSampleRate != this.previousSampleRate) {
                this.createNewContext(currentSampleRate);
                this.previousSampleRate = currentSampleRate;

                return true;
            }
        }

        return false;
    }

    /** 
     * Stop previous audio context and create a new one
     * @param sampleRate New sample rate
     */
    private createNewContext(sampleRate: number) {
        if (this._currentContext) {
            this.oldAudioContext = this._currentContext;
            this.destroyOldContext();
        }

        const options: AudioContextOptions = {
            latencyHint: "interactive"
        };

        if (sampleRate != 0) {
            options.sampleRate = sampleRate;
        }

        this._currentContext = new AudioContext(options);

        if (this.eventEmitter) {
            this.eventEmitter.emit(EventType.SAMPLE_RATE_CHANGED, this.currentSampleRate);
        }
    }

    /**
     * Destroy previous AudioContext
     */
    private destroyOldContext() {
        if (this.oldAudioContext) {
            this.oldAudioContext.close();
            this.oldAudioContext = null;
        }
    }

    /**
     * Get the current sample rate used
     */
    get currentSampleRate(): number {
        if (this.currentContext) {
            return this.currentContext.sampleRate;
        }

        return 0;
    }

    get currentContext() {
        return this._currentContext;
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.AUDIO_CONTEXT_MANAGER;
    }
}
