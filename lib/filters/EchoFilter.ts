import AbstractAudioFilter from "./interfaces/AbstractAudioFilter";
import Constants from "../model/Constants";
import EchoSettings from "../model/filtersSettings/EchoSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import utilFunctions from "../utils/Functions";

export default class EchoFilter extends AbstractAudioFilter {
    private delay = 0.2;
    private gain = 0.75;

    getNode(context: BaseAudioContext) {
        const delayNode = context.createDelay(179);
        delayNode.delayTime.value = this.delay;

        const gainNode = context.createGain();
        gainNode.gain.value = this.gain;

        gainNode.connect(delayNode);
        delayNode.connect(gainNode);

        return {
            input: gainNode,
            output: delayNode
        };
    }

    get order(): number {
        return 7;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.ECHO;
    }

    getAddingTime() {
        return 5;
    }

    getSettings(): EchoSettings {
        return {
            delay: this.delay,
            gain: this.gain
        };
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        if (!utilFunctions.isSettingValueValid(value)) {
            return Promise.resolve();
        }

        switch (settingId) {
        case "delay":
            this.delay = parseFloat(value as string);
            break;
        case "gain":
            this.gain = parseFloat(value as string);
            break;
        }

        return Promise.resolve();
    }
}
