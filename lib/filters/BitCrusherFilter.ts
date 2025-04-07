import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import Constants from "../model/Constants";
import BitCrusherSettings from "../model/filtersSettings/BitCrusherSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import "./worklets/BitCrusher.worklet";
import utilFunctions from "../utils/Functions";

export default class BitCrusherFilter extends AbstractAudioFilterWorklet<void> {
    private bits = 16;
    private normFreq = 0.9;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    receiveEvent(message: MessageEvent<void>): void {
        // Do nothing
    }

    get workletPath(): string {
        return Constants.WORKLET_PATHS.BITCRUSHER;
    }

    get workletName(): string {
        return Constants.WORKLET_NAMES.BITCRUSHER;
    }

    get order(): number {
        return 6;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.BITCRUSHER;
    }

    getSettings(): BitCrusherSettings {
        return {
            bits: this.bits,
            normFreq: this.normFreq,
        };
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        if (!utilFunctions.isSettingValueValid(value)) {
            return Promise.resolve();
        }

        switch (settingId) {
        case "bits":
            this.bits = parseInt(value as string, 10);
            break;
        case "normFreq":
            this.normFreq = parseFloat(value as string);
            break;
        }

        this.applyCurrentSettingsToWorklet();

        return Promise.resolve();
    }
}
