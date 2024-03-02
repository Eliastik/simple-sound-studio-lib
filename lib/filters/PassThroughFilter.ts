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
        const currentTime = performance.now();
        const timeDifference = currentTime - this.currentTime;

        if (this.eventEmitter && message.data.command === "update" && timeDifference >= Constants.TREATMENT_TIME_COUNTING_THROTTLE_INTERVAL) {
            this.eventEmitter.emit(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, (message.data.samplesCount / this._totalSamples) * 100);
            this.eventEmitter.emit(EventType.UPDATE_REMAINING_TIME_ESTIMATED, ((this._totalSamples - message.data.samplesCount) / this.samplePerSecond));
            this.currentTime = currentTime;
        }

        const timeDifferenceSamplePerSecond = currentTime - this.currentTimeSamplesPerSecond;
        this.lastSampleCount += message.data.samplesCount;

        if (timeDifferenceSamplePerSecond >= 1000) {
            this.samplePerSecond = this.lastSampleCount / (timeDifferenceSamplePerSecond / 1000);
            this.lastSampleCount = 0;
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
        this.currentTime = performance.now();
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
