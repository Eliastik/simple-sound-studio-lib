import RecorderConfig from "@/model/RecorderConfig";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import lamejs from "lamejs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import MPEGMode from "lamejs/src/js/MPEGMode";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Lame from "lamejs/src/js/Lame";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import BitStream from "lamejs/src/js/BitStream";

if (typeof (self) !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).MPEGMode = MPEGMode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).Lame = Lame;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).BitStream = BitStream;
}

let recLength = 0,
    recBuffers: Float32Array[][] = [],
    sampleRate: number,
    numChannels: number,
    bitRate: number;

self.onmessage = function (e) {
    switch (e.data.command) {
    case "init":
        init(e.data.config);
        break;
    case "record":
        record(e.data.buffer);
        break;
    case "exportWAV":
        exportWAV(e.data.type);
        break;
    case "exportMP3":
        exportMP3(e.data.type);
        break;
    case "getBuffer":
        getBuffer();
        break;
    case "clear":
        clear();
        break;
    }
};

const init = (config: RecorderConfig) => {
    sampleRate = config.sampleRate;
    numChannels = config.numChannels;
    bitRate = config.bitrate || 128;
    initBuffers();
};

const record = (inputBuffer: Float32Array[]) => {
    for (let channel = 0; channel < numChannels; channel++) {
        recBuffers[channel].push(inputBuffer[channel]);
    }
    recLength += inputBuffer[0].length;
};

const exportWAV = (type: string) => {
    const buffers = [];
    for (let channel = 0; channel < numChannels; channel++) {
        buffers.push(mergeBuffers(recBuffers[channel], recLength));
    }
    let interleaved;
    if (numChannels === 2) {
        interleaved = interleave(buffers[0], buffers[1]);
    } else {
        interleaved = buffers[0];
    }
    const dataview = encodeWAV(interleaved);
    const audioBlob = new Blob([dataview], { type });

    self.postMessage({ command: "exportWAV", data: audioBlob });
};

const exportMP3 = (type: string) => {
    const buffers = [];
            
    for (let channel = 0; channel < numChannels; channel++) {
        buffers.push(mergeBuffers(recBuffers[channel], recLength));
    }

    const mp3Data = encodeMP3(buffers);
    const audioBlob = new Blob(mp3Data, { type });

    self.postMessage({ command: "exportMP3", data: audioBlob });
};

const getBuffer = () => {
    const buffers = [];
    for (let channel = 0; channel < numChannels; channel++) {
        buffers.push(mergeBuffers(recBuffers[channel], recLength));
    }
    self.postMessage({ command: "getBuffer", data: buffers });
};

const clear = () => {
    recLength = 0;
    recBuffers = [];
    initBuffers();
};

const initBuffers = () => {
    for (let channel = 0; channel < numChannels; channel++) {
        recBuffers[channel] = [];
    }
};

const mergeBuffers = (recBuffers: Float32Array[], recLength: number) => {
    const result = new Float32Array(recLength);
    let offset = 0;
    for (let i = 0; i < recBuffers.length; i++) {
        if (recBuffers[i]) {
            result.set(recBuffers[i], offset);
            offset += recBuffers[i].length;
        } else {
            console.warn("RecorderWorker: undefined buffer has been detected");
        }
    }
    return result;
};

const interleave = (inputL: Float32Array, inputR: Float32Array) => {
    const length = inputL.length + inputR.length;
    const result = new Float32Array(length);

    let index = 0,
        inputIndex = 0;

    while (index < length) {
        result[index++] = inputL[inputIndex];
        result[index++] = inputR[inputIndex];
        inputIndex++;
    }
    return result;
};

const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
};

const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
};

const encodeWAV = (samples: Float32Array) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, "RIFF");
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, "WAVE");
    /* format chunk identifier */
    writeString(view, 12, "fmt ");
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, numChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, numChannels * 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, "data");
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);

    return view;
};

/**
 * Encode a buffer to MP3
 * @param buffers Array of Float32Array (one for each channel)
 * @param numChannels The number of channels for the audio (max 2)
 * @param sampleRate The sample rate
 * @param bitrate The resulting MP3 bitrate
 * @returns Int16Array buffer with MP3 data
 */
const encodeMP3 = (buffers: Float32Array[]): Int16Array[] => {
    const mp3encoder = new lamejs.Mp3Encoder(Math.max(2, numChannels), sampleRate, bitRate);
    const mp3Data = [];

    const left = convertFloatArray2Int16(buffers[0]);
    const right = convertFloatArray2Int16(buffers[1]);

    const sampleBlockSize = 1152;

    for (let i = 0; i < left.length; i += sampleBlockSize) {
        const leftChunk = left.subarray(i, i + sampleBlockSize);
        const rightChunk = right.subarray(i, i + sampleBlockSize);

        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);

        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }
    }

    const mp3buf = mp3encoder.flush();

    if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
    }

    return mp3Data;
};
/**
 * Convert a Float32Array to an Int16Array
 * @param floatbuffer The buffer to convert
 * @returns Int16Array buffer
 */
const convertFloatArray2Int16 = (floatbuffer: Float32Array) => {
    const int16Buffer = new Int16Array(floatbuffer.length);

    for (let i = 0, len = floatbuffer.length; i < len; i++) {
        let floatValue = floatbuffer[i];

        if (floatValue > 1.0) floatValue = 1.0;
        if (floatValue < -1.0) floatValue = -1.0;

        int16Buffer[i] = Math.floor(floatValue * 32767);
    }

    return int16Buffer;
};
