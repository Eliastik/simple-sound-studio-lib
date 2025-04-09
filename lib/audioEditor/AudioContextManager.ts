import { inject, injectable } from "inversify";
import { EventType } from "@/model/EventTypeEnum";
import Constants from "@/model/Constants";
import EventEmitter from "@/utils/EventEmitter";
import AudioContextManagerInterface from "./interfaces/AudioContextManagerInterface";
import { ConfigService } from "@/services/interfaces/ConfigService";
import EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import { TYPES } from "@/inversify.types";
import WindowWithOfflineAudioContext from "@/model/WindowWithOfflineAudioContext";

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
            this._currentContext.close();
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

    createOfflineAudioContext(numberOfChannels: number, duration: number, sampleRate: number) {
        /* Hack: we use an iframe to force the garbage collector to clean up the memory
           used by the OfflineAudioContext, including audio buffers. This helps avoid
           memory leaks in Chrome, where offline audio contexts may not be properly cleaned up. */
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";

        document.body.appendChild(iframe);

        const iframeWindow = iframe.contentWindow;

        if (!iframeWindow) {
            throw new Error("Failed to create isolated OfflineAudioContext");
        }

        const OfflineAudioContextConstructor = (iframeWindow as WindowWithOfflineAudioContext).OfflineAudioContext as typeof OfflineAudioContext;
        const offlineAudioContext = new OfflineAudioContextConstructor(numberOfChannels, duration, sampleRate);

        offlineAudioContext.addEventListener("complete", () => {
            /* We use setTimeout (macro task) to ensure that the iframe removal happens after the audio processing is finished
               and after event handling from other parts of the code has been completed. This ensures that the iframe
               is removed at the right time, without interfering with the ongoing execution of other tasks related to
               audio processing in the offline context. */
            setTimeout(() => document.body.removeChild(iframe));
        });

        return offlineAudioContext;
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
