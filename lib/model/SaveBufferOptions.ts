import { AudioEncoderFormat } from "./encoder/AudioEncoderFormat";

export default interface SaveBufferOptions {
    format?: AudioEncoderFormat,
    bitrate?: number
};
