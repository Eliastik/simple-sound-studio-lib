import { RecorderCallback } from "./RecorderCallback";

export default interface RecorderConfig {
    bufferLen: number,
    numChannels: number,
    mimeType: string,
    sampleRate: number,
    workletBasePath: string,
    bitrate?: number,
    callback?: RecorderCallback<Blob | Float32Array[]>
};
