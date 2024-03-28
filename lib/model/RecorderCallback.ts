type RecorderCallback<T> = (buffer: T) => void;

interface RecorderCallbacks {
    getBuffer: RecorderCallback<Float32Array[]>[],
    exportWAV: RecorderCallback<Blob>[],
    exportMP3: RecorderCallback<Blob>[]
}

export type { RecorderCallback, RecorderCallbacks };
