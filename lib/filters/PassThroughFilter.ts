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

    private SMOOHTING_FACTOR = 0.9;

    constructor() {
        super();
    }

    receiveEvent(message: MessageEvent<PassThroughWorkletEvent>): void {
        const currentTime = performance.now();
        const samplesProcessed = message.data.samplesCount;

        if (message.data.command === "update") {
            this.calculatePercentageProcessed(currentTime, samplesProcessed);
        }

        this.calculateRemainingTimeProcessing(currentTime, samplesProcessed);
    }

    /**
     * Calculate percentage processed
     * @param currentTime Current time (ms)
     * @param samplesProcessed Samples count processed
     */
    private calculatePercentageProcessed(currentTime: number, samplesProcessed: number) {
        if (this.currentTime === 0) {
            this.currentTime = currentTime;
        }

        const timeDifference = currentTime - this.currentTime;
        const percentageProcessed = (samplesProcessed / this._totalSamples);

        if (this.eventEmitter && timeDifference >= Constants.TREATMENT_TIME_COUNTING_THROTTLE_INTERVAL) {
            this.eventEmitter.emit(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, percentageProcessed * 100);
            this.currentTime = currentTime;
        }
    }

    /**
     * Calculate remaining time to process the audio
     * @param currentTime Current time (ms)
     * @param samplesProcessed Samples count processed
     */
    private calculateRemainingTimeProcessing(currentTime: number, samplesProcessed: number) {
        if (this.currentTimeSamplesPerSecond === 0) {
            this.currentTimeSamplesPerSecond = currentTime;
        }

        const timeDifferenceSamplePerSecond = currentTime - this.currentTimeSamplesPerSecond;
        const remainingSamples = this._totalSamples - samplesProcessed;
        const remainingTimeSeconds = remainingSamples / this.calculateSmoothedSamplePerSecond(timeDifferenceSamplePerSecond, samplesProcessed);

        if (this.eventEmitter && remainingSamples <= 0) {
            this.eventEmitter.emit(EventType.UPDATE_REMAINING_TIME_ESTIMATED, 0);
            return;
        }

        if (this.eventEmitter && timeDifferenceSamplePerSecond >= 1000) {
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

    /**
     * Calculate smoothed samples per second
     * @param timeDifferenceSamplePerSecond Time difference 
     * @param samplesProcessed Samples count processed
     * @returns Smoothed samples per second
     */
    private calculateSmoothedSamplePerSecond(timeDifferenceSamplePerSecond: number, samplesProcessed: number): number {
        const currentSampleRate = (samplesProcessed - this.lastSampleCount) / (timeDifferenceSamplePerSecond / 1000);
        this.samplePerSecond = this.SMOOHTING_FACTOR * this.samplePerSecond + (1 - this.SMOOHTING_FACTOR) * currentSampleRate;

        return this.samplePerSecond;
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
