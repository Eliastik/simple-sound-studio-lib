import AbstractAudioFilter from "./interfaces/AbstractAudioFilter";
import Constants from "../model/Constants";
import { ReverbEnvironment } from "../model/ReverbEnvironment";
import ReverbSettings from "../model/filtersSettings/ReverbSettings";
import GenericSettingValue from "../model/filtersSettings/GenericSettingValue";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import utilFunctions from "@/utils/Functions";

export default class ReverbFilter extends AbstractAudioFilter {

    private reverbEnvironment: ReverbEnvironment = Constants.DEFAULT_REVERB_ENVIRONMENT;
    private reverbCustomEnvironmentAddTime = 5;
    private customEnvironment: AudioBuffer | null = null;

    getNode(context: BaseAudioContext) {
        const convolver = context.createConvolver();

        if (!this.reverbEnvironment || (this.reverbEnvironment.url == "custom" && !this.customEnvironment)) {
            // Fallback to default environment otherwise
            this.reverbEnvironment = Constants.DEFAULT_REVERB_ENVIRONMENT;
        }

        const buffer = this.getReverbBuffer();

        if (buffer) {
            convolver.buffer = buffer;
        }

        return {
            input: convolver,
            output: convolver
        };
    }

    private getReverbBuffer(): AudioBuffer | undefined {
        if (this.reverbEnvironment.url == "custom" && this.customEnvironment) {
            return this.customEnvironment;
        } else if (this.bufferFetcherService) {
            return this.bufferFetcherService.getAudioBuffer(this.reverbEnvironment.url);
        }

        return;
    }

    get order(): number {
        return 9;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.REVERB;
    }

    getAddingTime() {
        const settings = this.getSettings();

        if (settings && settings.reverbEnvironment) {
            if (settings.reverbEnvironment.value != "custom") {
                if (settings.reverbEnvironment.additionalData) {
                    return settings.reverbEnvironment.additionalData.addDuration as number;
                }
            } else {
                return this.reverbCustomEnvironmentAddTime;
            }
        }

        return 0;
    }

    getSettings(): ReverbSettings {
        if (!this.reverbEnvironment) {
            return {
                reverbCustomEnvironmentAddTime: this.reverbCustomEnvironmentAddTime
            };
        }

        return {
            reverbEnvironment: {
                name: this.reverbEnvironment.name,
                value: this.reverbEnvironment.url,
                additionalData: {
                    size: this.reverbEnvironment.size,
                    link: this.reverbEnvironment.link,
                    addDuration: this.reverbEnvironment.addDuration
                }
            },
            downloadedBuffers: this.bufferFetcherService?.getDownloadedBuffersList(),
            reverbCustomEnvironmentAddTime: this.reverbCustomEnvironmentAddTime
        };
    }

    async setSetting(settingId: string, value: FilterSettingValue) {
        if (settingId == "reverbEnvironment") {
            const reverbEnvironment = value as GenericSettingValue;

            if (reverbEnvironment) {
                const url = reverbEnvironment.value;

                try {
                    if (url != "custom") {
                        await this.bufferFetcherService?.fetchBuffer(url);
                    }

                    if (reverbEnvironment.additionalData) {
                        this.reverbEnvironment = {
                            name: reverbEnvironment.name,
                            url,
                            size: reverbEnvironment.additionalData.size as number,
                            addDuration: reverbEnvironment.additionalData.addDuration as number,
                            link: reverbEnvironment.additionalData.link as string
                        };
                    } else {
                        this.reverbEnvironment = {
                            name: reverbEnvironment.name,
                            url,
                            size: 0,
                            addDuration: 0,
                            link: ""
                        };
                    }
                } catch (e) { /* empty */ }
            }
        } else if (settingId == "reverbCustomEnvironmentAddTime") {
            if (utilFunctions.isSettingValueValid(value)) {
                this.reverbCustomEnvironmentAddTime = parseInt(value as string);
            }
        } else if (settingId == "reverbCustomEnvironmentFile") {
            if (this.bufferDecoderService && value) {
                this.customEnvironment = await this.bufferDecoderService.decodeBufferFromFile(value as File);

                if (!this.customEnvironment) {
                    // Fallback to default environment
                    this.reverbEnvironment = Constants.DEFAULT_REVERB_ENVIRONMENT;
                }
            }
        }
    }
}
