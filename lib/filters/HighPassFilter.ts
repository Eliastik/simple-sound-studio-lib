import AbstractAudioFilter from "./interfaces/AbstractAudioFilter";
import Constants from "../model/Constants";
import HighPassSettings from "../model/filtersSettings/HighPassSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import utilFunctions from "../utils/Functions";

export default class HighPassFilter extends AbstractAudioFilter {
    private highFrequency = 3500;

    getNode(context: BaseAudioContext) {
        const highPassFilter = context.createBiquadFilter();
        highPassFilter.type = "highpass";
        highPassFilter.frequency.value = this.highFrequency;

        return {
            input: highPassFilter,
            output: highPassFilter
        };
    }

    get order(): number {
        return 4;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.HIGH_PASS;
    }

    getSettings(): HighPassSettings {
        return {
            highFrequency: this.highFrequency
        };
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        if(!utilFunctions.isSettingValueValid(value)) {
            return Promise.resolve();
        }

        switch(settingId) {
        case "highFrequency":
            this.highFrequency = parseInt(value as string, 10);
            break;
        }

        return Promise.resolve();
    }
}
