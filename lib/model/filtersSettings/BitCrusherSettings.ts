import { FilterSettings } from "./FilterSettings";

export default interface BitCrusherSettings extends FilterSettings {
    bits: number
    normFreq: number
};
