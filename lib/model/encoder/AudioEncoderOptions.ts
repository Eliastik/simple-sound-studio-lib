import { AudioEncoderFormat } from "./AudioEncoderFormat";

export default interface AudioEncoderOptions {
    format: AudioEncoderFormat,
    bitrate?: number,
    numChannels: number,
    sampleRate: number,
    audioLength: number;
};
