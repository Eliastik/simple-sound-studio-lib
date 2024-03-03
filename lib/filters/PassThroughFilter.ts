import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import Constants from "../model/Constants";
import "./worklets/Passthrough.worklet";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import PassThroughWorkletEvent from "@/model/PassThroughWorkletEvent";
import { EventType } from "@/model/EventTypeEnum";

export default class PassThroughFilter extends AbstractAudioFilterWorklet<PassThroughWorkletEvent> {
    
    private _totalSamples = 0;
    private currentTime = 0;
    private lastSampleCount = 0;
    private samplePerSecond = 0;
    private currentTimeSamplesPerSecond = 0;

    constructor() {
        super();
    }

    receiveEvent(message: MessageEvent<PassThroughWorkletEvent>): void {
        if (!this.eventEmitter) {
            return;
        }
        
        const currentTime = performance.now();
        const samplesProcessed = message.data.samplesCount;

        if (this.currentTime === 0) {
            this.currentTime = currentTime;
        }

        const timeDifference = currentTime - this.currentTime;
        const percentageProcessed = (samplesProcessed / this._totalSamples);
        const remainingSamples = this._totalSamples - samplesProcessed;
        const remainingTimeSeconds = remainingSamples / this.samplePerSecond;

        if (message.data.command === "update" && timeDifference >= Constants.TREATMENT_TIME_COUNTING_THROTTLE_INTERVAL) {
            this.eventEmitter.emit(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, percentageProcessed * 100);
            this.currentTime = currentTime;
        }

        if (this.currentTimeSamplesPerSecond === 0) {
            this.currentTimeSamplesPerSecond = currentTime;
        }

        const timeDifferenceSamplePerSecond = currentTime - this.currentTimeSamplesPerSecond;

        if (timeDifferenceSamplePerSecond >= 1000) {
            this.samplePerSecond = (samplesProcessed - this.lastSampleCount) / (timeDifferenceSamplePerSecond / 1000);
            this.currentTimeSamplesPerSecond = currentTime;
            this.lastSampleCount = samplesProcessed;

            if (isNaN(remainingTimeSeconds) || !isFinite(remainingTimeSeconds)) {
                this.eventEmitter.emit(EventType.UPDATE_REMAINING_TIME_ESTIMATED, -1);
            } else {
                this.eventEmitter.emit(EventType.UPDATE_REMAINING_TIME_ESTIMATED, remainingTimeSeconds);
            }
        }
    }

    get workletName(): string {
        return Constants.WORKLET_NAMES.PASSTHROUGH;
    }

    get workletPath(): string {
        return Constants.WORKLET_PATHS.PASSTHROUGH;
    }

    get order(): number {
        return 10;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.PASSTHROUGH;
    }

    set totalSamples(value: number) {
        this._totalSamples = value;
        this.currentTime = 0;
        this.currentTimeSamplesPerSecond = 0;
        this.samplePerSecond = 0;
        this.lastSampleCount = 0;
    }

    getSettings() {
        return {};
    }

    isEnabled(): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async setSetting(settingId: string, value: FilterSettingValue) {}
}
