import { AudioEncoderFormat } from "./AudioEncoderFormat";

export default interface AudioEncoderMetadata {
    format: AudioEncoderFormat,
    supported: boolean,
    implementationType: "custom" | "audioEncoderAPI";
};
