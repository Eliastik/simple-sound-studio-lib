import GenericSettingValue from "./GenericSettingValue";

export type FilterSettingValue = string | boolean | number | File | GenericSettingValue | string[] | undefined;

export interface FilterSettings {
    [key: string]: FilterSettingValue,
    downloadedBuffers?: string[]
};
