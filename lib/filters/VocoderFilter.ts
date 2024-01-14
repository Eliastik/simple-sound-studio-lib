import AbstractAudioFilter from "./interfaces/AbstractAudioFilter";
import { AudioFilterNodes } from "../model/AudioNodes";
import Constants from "../model/Constants";
import Vocoder from "../utils/Vocoder";
import VocoderSettings from "../model/filtersSettings/VocoderSettings";
import utilFunctions from "../utils/Functions";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";

export default class VocoderFilter extends AbstractAudioFilter {

    private currentVocoder: Vocoder | null = null;
    private modulatorGainValue = 1.0;
    private carrierSampleGainValue = 0;
    private oscillatorGainValue = 1.0;
    private noiseGainValue = 0.2;
    private oscillatorDetuneValue = 0;

    getNode(context: BaseAudioContext): AudioFilterNodes {
        const modulatorBuffer = this.bufferFetcherService?.getAudioBuffer(Constants.VOCODER_MODULATOR);

        this.currentVocoder = new Vocoder(context, modulatorBuffer!);
        this.currentVocoder.init();
        this.applyCurrentSettingsToVocoder();

        const { modulatorGain, outputGain } = this.currentVocoder.getNodes();

        return {
            input: modulatorGain!,
            output: outputGain!
        };
    }

    getSettings(): VocoderSettings {
        return {
            modulatorGainValue: this.modulatorGainValue,
            carrierSampleGainValue: this.carrierSampleGainValue,
            oscillatorGainValue: this.oscillatorGainValue,
            noiseGainValue: this.noiseGainValue,
            oscillatorDetuneValue: this.oscillatorDetuneValue
        };
    }

    async setSetting(settingId: string, value: FilterSettingValue) {
        if(!utilFunctions.isSettingValueValid(value)) {
            return;
        }
        
        switch (settingId) {
        case "modulatorGainValue":
            this.modulatorGainValue = parseFloat(value as string);
            break;
        case "carrierSampleGainValue":
            this.carrierSampleGainValue = parseFloat(value as string);
            break;
        case "oscillatorGainValue":
            this.oscillatorGainValue = parseFloat(value as string);
            break;
        case "noiseGainValue":
            this.noiseGainValue = parseFloat(value as string);
            break;
        case "oscillatorDetuneValue":
            this.oscillatorDetuneValue = parseFloat(value as string);
            break;
        }

        this.applyCurrentSettingsToVocoder();
    }

    private applyCurrentSettingsToVocoder() {
        if(this.currentVocoder) {
            this.currentVocoder.updateModGain(this.modulatorGainValue);
            this.currentVocoder.updateSampleLevel(this.carrierSampleGainValue);
            this.currentVocoder.updateSynthLevel(this.oscillatorGainValue);
            this.currentVocoder.updateNoiseLevel(this.noiseGainValue);
            this.currentVocoder.updateDetuneValue(this.oscillatorDetuneValue);
        }
    }
    
    get order(): number {
        return 1;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.VOCODER;
    }
}
