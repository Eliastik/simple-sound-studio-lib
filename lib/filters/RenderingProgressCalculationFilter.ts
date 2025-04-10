import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import Constants from "../model/Constants";
import "./worklets/RenderingProgressCalculation.worklet";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import RenderingProgressCalculationFilterEvent from "@/model/RenderingProgressCalculationFilterEvent";
import { EventType } from "@/model/EventTypeEnum";

export default class RenderingProgressCalculationFilter extends AbstractAudioFilterWorklet<RenderingProgressCalculationFilterEvent> {

    private currentTime = 0;
    private lastSampleCount = 0;
    private samplePerSecond = 0;
    private currentTimeSamplesPerSecond = 0;

    receiveEvent(message: MessageEvent<RenderingProgressCalculationFilterEvent>): void {
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
        const percentageProcessed = (samplesProcessed / this._totalSamples) * 100;

        if (this.eventEmitter && timeDifference >= Constants.TREATMENT_TIME_COUNTING_THROTTLE_INTERVAL) {
            this.eventEmitter.emit(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, percentageProcessed);
            this.currentTime = currentTime;
        }

        if (percentageProcessed >= 100) {
            this.stop();
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

        if (this.eventEmitter && remainingSamples <= 0) {
            this.eventEmitter.emit(EventType.UPDATE_REMAINING_TIME_ESTIMATED, 0);
            return;
        }

        if (this.eventEmitter && timeDifferenceSamplePerSecond >= 1000) {
            this.calculateSmoothedSamplePerSecond(timeDifferenceSamplePerSecond, samplesProcessed);

            const remainingTimeSeconds = remainingSamples / this.samplePerSecond;

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
    private calculateSmoothedSamplePerSecond(timeDifferenceSamplePerSecond: number, samplesProcessed: number): void {
        if (timeDifferenceSamplePerSecond > 0) {
            const currentSampleRate = (samplesProcessed - this.lastSampleCount) / (timeDifferenceSamplePerSecond / 1000);
            this.samplePerSecond = (Constants.TREATMENT_TIME_COUNTING_SMOOTHING_FACTOR * currentSampleRate) + ((1 - Constants.TREATMENT_TIME_COUNTING_SMOOTHING_FACTOR) * this.samplePerSecond);
        }
    }

    get workletName(): string {
        return Constants.WORKLET_NAMES.RENDERING_PROGRESS_CALCULATION;
    }

    get workletPath(): string {
        return Constants.WORKLET_PATHS.RENDERING_PROGRESS_CALCULATION;
    }

    get order(): number {
        return 10;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.RENDERING_PROGRESS_CALCULATION;
    }

    set totalSamples(value: number) {
        super.totalSamples = value;
        this.currentTime = 0;
        this.currentTimeSamplesPerSecond = 0;
        this.samplePerSecond = 0;
        this.lastSampleCount = 0;
    }

    getSettings() {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async setSetting(settingId: string, value: FilterSettingValue) { }
}
