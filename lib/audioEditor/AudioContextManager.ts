import { inject, injectable } from "inversify";
import { EventType } from "@/model/EventTypeEnum";
import Constants from "@/model/Constants";
import EventEmitter from "@/utils/EventEmitter";
import AudioContextManagerInterface from "./interfaces/AudioContextManagerInterface";
import { ConfigService } from "@/services/interfaces/ConfigService";
import EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import { TYPES } from "@/inversify.types";

@injectable()
export default class AudioContextManager implements AudioContextManagerInterface {

    /** The current event emitter */
    private eventEmitter: EventEmitterInterface | undefined;

    /** The config service */
    private configService: ConfigService | null;

    /** The current audio context */
    private _currentContext: AudioContext | null | undefined;

    /** The previous sample rate setting */
    private previousSampleRate = Constants.DEFAULT_SAMPLE_RATE;

    constructor(
        @inject(TYPES.EventEmitter) eventEmitter: EventEmitterInterface | null,
        @inject(TYPES.ConfigService) configService: ConfigService | null) {
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

    createNewContextIfNeeded(principalBuffer?: AudioBuffer | null) {
        const isCompatibilityModeEnabled = this.configService && this.configService.isCompatibilityModeEnabled();

        if (isCompatibilityModeEnabled && principalBuffer) {
            // If compatibility mode is enabled, we use the sample rate of the input audio buffer
            if (this.currentSampleRate != principalBuffer.sampleRate) {
                this.createNewContext(principalBuffer.sampleRate);
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
                return true;
            }
        }

        return false;
    }

    /** 
     * Stop previous audio context and create a new one
     * @param sampleRate New sample rate
     */
    createNewContext(sampleRate: number) {
        if (this._currentContext) {
            this.destroyOldContext(this._currentContext);
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

        this.previousSampleRate = sampleRate;
    }

    /**
     * Destroy previous AudioContext
     */
    private destroyOldContext(oldAudioContext: AudioContext) {
        if(oldAudioContext) {
            oldAudioContext.close();
        }
    }

    get currentSampleRate(): number {
        if (this.currentContext) {
            return this.currentContext.sampleRate;
        }

        return 0;
    }

    get currentContext() {
        return this._currentContext;
    }
}
