import AbstractAudioFilter from "./interfaces/AbstractAudioFilter";
import Constants from "../model/Constants";
import LowPassSettings from "../model/filtersSettings/LowPassSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import utilFunctions from "../utils/Functions";

export default class LowPassFilter extends AbstractAudioFilter {
    private lowFrequency = 3500;

    getNode(context: BaseAudioContext) {
        const lowPassFilter = context.createBiquadFilter();
        lowPassFilter.type = "lowpass";
        lowPassFilter.frequency.value = this.lowFrequency;

        return {
            input: lowPassFilter,
            output: lowPassFilter
        };
    }

    get order(): number {
        return 5;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.LOW_PASS;
    }

    getSettings(): LowPassSettings {
        return {
            lowFrequency: this.lowFrequency
        };
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        if (!utilFunctions.isSettingValueValid(value)) {
            return Promise.resolve();
        }

        switch (settingId) {
        case "lowFrequency":
            this.lowFrequency = parseInt(value as string, 10);
            break;
        }

        return Promise.resolve();
    }
}
