import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
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

if (typeof (window) !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).MPEGMode = MPEGMode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Lame = Lame;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).BitStream = BitStream;
}

const utilFunctions = {
    calcAudioDuration: (audio: AudioBuffer, speed: number) => {
        if (audio) {
            let duration = audio.duration + 1;

            if (speed) {
                duration = duration / speed;
            }

            return duration;
        }

        return 0;
    },
    loadAudioBuffer: async (context: AudioContext, file: File) => {
        const arrayBuffer = await utilFunctions.readAsArrayBufferPromisified(file);
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
        return utilFunctions.decodeBuffer(context, audioBuffer);
    },
    readAsArrayBufferPromisified: (file: File): Promise<ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = ev => {
                const result = ev?.target?.result;

                if (result instanceof ArrayBuffer) {
                    resolve(result);
                } else {
                    reject();
                }
            };

            if (file) {
                reader.readAsArrayBuffer(file); // Read the file
            }
        });
    },
    decodeBuffer: (context: AudioContext, buffer: AudioBuffer) => {
        if (buffer.numberOfChannels == 1) { // convert to stereo buffer
            context.resume();

            const duration = buffer.duration;
            const sampleRate = context.sampleRate;

            const newBuffer = context.createBuffer(2, sampleRate * duration + sampleRate * 2, sampleRate);

            // Original buffer data
            const sourceChannelData = buffer.getChannelData(0);

            // Destination buffers
            const channel0Data = newBuffer.getChannelData(0);
            const channel1Data = newBuffer.getChannelData(1);

            for (let i = 0; i < sourceChannelData.length; i++) {
                channel0Data[i] = sourceChannelData[i];
                channel1Data[i] = sourceChannelData[i];
            }

            return newBuffer;
        }

        return buffer;
    },
    convertAudioBufferToFloat32Array: (buffer: AudioBuffer) => {
        const array: Float32Array[] = [];

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            array.push(buffer.getChannelData(channel));
        }

        return array;
    },
    convertAudioParamToFloat32Array: (param: AudioParam, length: number) => {
        const array = new Float32Array(length);

        for (let i = 0; i < length; i++) {
            array.set([param.value], i);
        }

        return array;
    },
    sumAudioBufferChannel(buffer: AudioBuffer, channel: number) {
        return buffer.getChannelData(channel).reduce((a, b) => a + b, 0);
    },
    sumAudioBuffer(buffer: AudioBuffer) {
        let sum = 0;

        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            sum += this.sumAudioBufferChannel(buffer, channel);
        }

        return sum;
    },
    /**
    * This method checks if the browser is compatible with audio worklets
    * @param audioContext 
    */
    isAudioWorkletCompatible(audioContext: BaseAudioContext) {
        if (typeof (audioContext) !== "undefined" && typeof (audioContext.audioWorklet) !== "undefined") {
            return true;
        }

        return false;
    },
    /**
     * Check that the setting value is correct
     * @param value FilterSettingValue
     */
    isSettingValueValid(value: FilterSettingValue) {
        return typeof (value) !== "undefined" && !isNaN(Number(value)) && !(typeof (value) === "string" && value.trim() === "");
    },
    /**
     * Encode a buffer to MP3
     * @param buffers Array of Float32Array (one for each channel)
     * @param numChannels The number of channels for the audio (max 2)
     * @param sampleRate The sample rate
     * @param bitrate The resulting MP3 bitrate
     * @returns Int16Array buffer with MP3 data
     */
    encodeMP3(buffers: Float32Array[], numChannels: number, sampleRate: number, bitrate: number): Int16Array[] {
        const mp3encoder = new lamejs.Mp3Encoder(Math.max(2, numChannels), sampleRate, bitrate);
        const mp3Data = [];

        const left = this.floatArray2Int16(buffers[0]);
        const right = this.floatArray2Int16(buffers[1]);

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
    },
    /**
     * Convert a Float32Array to an Int16Array
     * @param floatbuffer The buffer to convert
     * @returns Int16Array buffer
     */
    floatArray2Int16(floatbuffer: Float32Array) {
        const int16Buffer = new Int16Array(floatbuffer.length);

        for (let i = 0, len = floatbuffer.length; i < len; i++) {
            let floatValue = floatbuffer[i];

            if (floatValue > 1.0) floatValue = 1.0;
            if (floatValue < -1.0) floatValue = -1.0;

            int16Buffer[i] = Math.floor(floatValue * 32767);
        }

        return int16Buffer;
    }
};

export default utilFunctions;
