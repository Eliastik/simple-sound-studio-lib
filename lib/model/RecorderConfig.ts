import { RecorderCallback } from "./RecorderCallback";

export default interface RecorderConfig {
    bufferLen: number,
    numChannels: number,
    mimeType: "audio/wav" | "audio/mp3",
    sampleRate: number,
    workletBasePath: string,
    bitrate?: number,
    callback?: RecorderCallback<Blob | Float32Array[]>
};
