import { FilterSettings } from "./FilterSettings";

export default interface VocoderSettings extends FilterSettings {
    modulatorGainValue: number,
    carrierSampleGainValue: number,
    oscillatorGainValue: number,
    noiseGainValue: number,
    oscillatorDetuneValue: number
};
