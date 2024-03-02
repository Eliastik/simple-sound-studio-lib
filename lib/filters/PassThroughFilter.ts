import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import Constants from "../model/Constants";
import "./worklets/Passthrough.worklet";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import PassThroughWorkletEvent from "@/model/PassThroughWorkletEvent";
import { EventType } from "@/model/EventTypeEnum";

export default class PassThroughFilter extends AbstractAudioFilterWorklet<PassThroughWorkletEvent> {
    
    private _totalSamples = 0;

    constructor() {
        super();
    }

    receiveEvent(message: MessageEvent<PassThroughWorkletEvent>): void {
        if (this.eventEmitter && message.data.command === "update") {
            this.eventEmitter.emit(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, (message.data.samplesCount / this._totalSamples) * 100);
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