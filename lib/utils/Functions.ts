import { TypedArray } from "@/model/TypedArray";
import { FilterSettingValue } from "../model/filtersSettings/FilterSettings";
import FilterManagerInterface from "@/audioEditor/interfaces/FilterManagerInterface";

const utilFunctions = {
    calcAudioDuration: (audio: AudioBuffer, speed?: number) => {
        if (audio) {
            let duration = audio.duration + 1;

            if (speed != undefined) {
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
    readAsArrayBufferPromisified: (file: File): Promise<ArrayBuffer> =>
        new Promise((resolve, reject) => {
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
        }),
    decodeBuffer: (context: AudioContext, buffer: AudioBuffer) => {
        if (buffer.numberOfChannels == 1) { // convert to stereo buffer
            context.resume();

            const { duration } = buffer;
            const { sampleRate } = context;

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
     * Calculate approximative audio duration according to enabled filters and their settings
     * @param speedAudio Current audio speed
     * @returns The audio duration
     */
    calculateAudioDuration(buffer: AudioBuffer, filterManager: FilterManagerInterface, speedAudio?: number): number {
        if (buffer && filterManager) {
            const duration = this.calcAudioDuration(buffer, speedAudio);
            const addingTime = filterManager.getAddingTime();

            if (addingTime) {
                return duration + addingTime;
            }

            return duration;
        }

        return 0;
    },
    forceDownload(blob: Blob, filename: string) {
        const link = window.document.createElement("a");
        const url = URL.createObjectURL(blob);
        window.document.body.appendChild(link);
        link.href = url;
        link.download = filename || "output.wav";
        link.click();
        URL.revokeObjectURL(url);
        window.document.body.removeChild(link);
    },
    clearAudioBuffer(buffer: AudioBuffer | null) {
        if (buffer) {
            for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
                const channelData = buffer.getChannelData(channel);

                for (let i = 0; i < channelData.length; i++) {
                    channelData[i] = 0;
                }
            }
        }
    },
    floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = this.clampFloatValue(input[i]);
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    },
    /**
     * Convert a Float32Array to an Int16Array
     * @param floatbuffer The buffer to convert
     * @returns Int16Array buffer
     */
    convertFloat32Array2Int16(floatbuffer: Float32Array) {
        const int16Buffer = new Int16Array(floatbuffer.length);

        for (let i = 0, len = floatbuffer.length; i < len; i++) {
            const floatValue = this.clampFloatValue(floatbuffer[i]);
            int16Buffer[i] = Math.round(floatValue * 32767);
        }

        return int16Buffer;
    },
    clampFloatValue(value: number) {
        return Math.max(-1.0, Math.min(1.0, value))
    },
    writeStringToDataView(view: DataView, offset: number, string: string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    },
    interleaveBuffers<T extends TypedArray>(inputL: T, inputR: T) {
        const length = inputL.length + inputR.length;

        if (length === 0) {
            throw new Error("interleaveBuffers: input buffers are empty or invalid");
        }

        const ArrayType = inputL.constructor as { new (bufferLength: number): T };
        const result = new ArrayType(length);

        let index = 0,
            inputIndex = 0;

        while (index < length) {
            result[index++] = inputL[inputIndex];
            result[index++] = inputR[inputIndex];
            inputIndex++;
        }

        return result;
    },
    getLengthFromBuffers<T extends TypedArray>(buffers: T[]) {
        if (!buffers) {
            return 0;
        }

        return buffers.reduce((sum, arr) => sum + arr.length, 0);
    },
    mergeBuffers<T extends TypedArray>(buffers: T[]): T {
        const length = this.getLengthFromBuffers(buffers);

        if (length === 0) {
            throw new Error("mergeTypedArrayBuffers: input buffers are empty or invalid");
        }

        const ArrayType = buffers[0].constructor as { new (bufferLength: number): T };
        const result = new ArrayType(length);

        let offset = 0;

        for (const buffer of buffers) {
            if (buffer) {
                result.set(buffer, offset);
                offset += buffer.length;
            } else {
                console.warn("mergeTypedArrayBuffers: undefined buffer has been detected");
            }
        }

        return result;
    }
};

export default utilFunctions;
