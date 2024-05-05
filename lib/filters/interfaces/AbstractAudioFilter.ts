import AbstractAudioElement from "./AbstractAudioElement";
import { AudioFilterNodes } from "../../model/AudioNodes";
import { FilterSettingValue, FilterSettings } from "../../model/filtersSettings/FilterSettings";
import EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import { TYPES } from "@/inversify.types";
import { inject } from "inversify";

export default abstract class AbstractAudioFilter extends AbstractAudioElement {

    private defaultSettings: FilterSettings | null = null;
    @inject(TYPES.EventEmitter)
        eventEmitter: EventEmitterInterface | undefined = undefined;
    /** Total sample of the input audio buffer */
    protected _totalSamples = 0;

    /** Return a input and output AudioNode of the filter */
    abstract getNode(context: BaseAudioContext): AudioFilterNodes;
    /** Return an object with current settings of this filter */
    abstract getSettings(): FilterSettings;
    /** Set a filter setting */
    abstract setSetting(settingId: string, value: FilterSettingValue): Promise<void>;

    /** Get the amount of time this filter add to the audio */
    getAddingTime(): number {
        return 0;
    }

    /** Store the default settings */
    public initializeDefaultSettings() {
        this.defaultSettings = this.getSettings();
    }

    /** Returns the default settings of this filter */
    public getDefaultSettings() {
        return this.defaultSettings;
    }

    /** Reset the default settings of this filter */
    public async resetSettings() {
        if (this.defaultSettings) {
            for (const key in this.defaultSettings) {
                if (this.defaultSettings && typeof (this.defaultSettings[key]) !== "undefined") {
                    await this.setSetting(key, this.defaultSettings[key]);
                }
            }
        }
    }

    /** Return if the current filter use an audio worklet */
    public isWorklet() {
        return false;
    }

    /**
     * Called when the buffer fetcher was reseted
     * @returns boolean
    */
    public async bufferFetcherReseted(): Promise<boolean> {
        return false;
    }

    set totalSamples(value: number) {
        this._totalSamples = value;
    }
}
