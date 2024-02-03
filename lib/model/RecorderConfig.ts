import { RecorderCallback } from "./RecorderCallback";

export default interface RecorderConfig {
    bufferLen: number,
    numChannels: number,
    mimeType: "audio/wav",
    sampleRate: number,
    workletBasePath: string,
    callback?: RecorderCallback<Blob | Float32Array[]>
};
