import { RecorderCallback } from "@/model/RecorderCallback";

export default interface RecorderInterface {

    setup(source: AudioNode): Promise<void>;

    record(): void;

    stop(): void;

    clear(): void;

    kill(): void;

    getBuffer(cb: RecorderCallback<Float32Array[]>): void;

    exportWAV(cb: RecorderCallback<Blob>, mimeType?: string): void;

    exportMP3(cb: RecorderCallback<Blob>, mimeType?: string): void;
    
}