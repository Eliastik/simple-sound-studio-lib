import AbstractAudioFilterWorklet from "./interfaces/AbstractAudioFilterWorklet";
import Constants from "../model/Constants";
import LimiterSettings from "../model/filtersSettings/LimiterSettings";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import "./worklets/Limiter.worklet";
import utilFunctions from "../utils/Functions";

export default class LimiterFilter extends AbstractAudioFilterWorklet<void> {
    private preGain = 0; // dB
    private postGain = 0; // dB
    private attackTime = 0; // s
    private releaseTime = 6; // s
    private threshold = 0; // dB
    private lookAheadTime = 0.3; // s

    constructor() {
        super();
        this.keepCurrentNodeIfPossible = true;
        this.setDefaultEnabled(true);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    receiveEvent(message: MessageEvent<void>): void {
        // Do nothing
    }

    get workletPath(): string {
        return Constants.WORKLET_PATHS.LIMITER;
    }
    
    get workletName(): string {
        return Constants.WORKLET_NAMES.LIMITER;
    }

    get order(): number {
        return 11;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.LIMITER;
    }

    getAddingTime() {
        return this.lookAheadTime;
    }

    getSettings(): LimiterSettings {
        return {
            preGain: this.preGain,
            postGain: this.postGain,
            attackTime: this.attackTime,
            releaseTime: this.releaseTime,
            threshold: this.threshold,
            lookAheadTime: this.lookAheadTime
        };
    }

    async setSetting(settingId: string, value: FilterSettingValue) {
        if(!utilFunctions.isSettingValueValid(value)) {
            return;
        }
        
        switch (settingId) {
        case "preGain":
            this.preGain = parseFloat(value as string);
            break;
        case "postGain":
            this.postGain = parseFloat(value as string);
            break;
        case "attackTime":
            this.attackTime = parseFloat(value as string);
            break;
        case "releaseTime":
            this.releaseTime = parseFloat(value as string);
            break;
        case "threshold":
            this.threshold = parseFloat(value as string);
            break;
        case "lookAheadTime":
            this.lookAheadTime = parseFloat(value as string);
            break;
        }

        this.applyCurrentSettingsToWorklet();
    }
}
