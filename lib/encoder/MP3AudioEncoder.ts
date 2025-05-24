import AudioEncoderOptions from "@/model/AudioEncoderOptions";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import UtilFunctions from "@/utils/Functions";
import { injectable, postConstruct } from "inversify";
import { AudioEncoderFormat } from "@/model/AudioEncoderFormat";

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

@injectable()
export default class MP3AudioEncoder extends AbstractAudioEncoder {

    getFormat(): AudioEncoderFormat {
        return "mp3";
    }

    @postConstruct()
    protected init() {
        const root = typeof (self) !== "undefined" ? self : window;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root as any).MPEGMode = MPEGMode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root as any).Lame = Lame;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root as any).BitStream = BitStream;
    }

    async encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer> {
        const audioEncoderMP3Supported = await this.isAudioEncoderAPISupportedForSettings(options);

        if (audioEncoderMP3Supported) {
            return this.encodeMP3AudioEncoder(input, options)
        }

        return this.encodeMP3LameJS(input, options);
    }

    /**
     * Encode a buffer to MP3 using LameJS
     * @param buffers Array of Float32Array (one for each channel)
     * @returns Int16Array buffer with MP3 data
     */
    private encodeMP3LameJS(buffers: Float32Array[], options: AudioEncoderOptions): ArrayBuffer {
        const mp3encoder = new lamejs.Mp3Encoder(Math.max(2, options.numChannels), options.sampleRate, options.bitrate);
        const mp3Data = [];

        const left = UtilFunctions.convertFloatArray2Int16(buffers[0]);
        const right = UtilFunctions.convertFloatArray2Int16(buffers[1]);

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
            mp3Data.push(new Uint8Array(mp3buf));
        }

        const totalLength = mp3Data.reduce((sum, arr) => sum + arr.length, 0);
        const output = new Uint8Array(totalLength);
        let offset = 0;

        for (const chunk of mp3Data) {
            output.set(chunk, offset);
            offset += chunk.length;
        }

        return output.buffer;
    }

    /**
     * Encode a buffer to MP3 using Audio Encoder API
     * @param buffers Array of Float32Array (one for each channel)
     * @returns ArrayBuffer buffer with MP3 data
     */
    private async encodeMP3AudioEncoder(buffers: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer> {
        const chunks: EncodedAudioChunk[] = [];

        const audioEncoder = new AudioEncoder({
            output: chunk => chunks.push(chunk),
            error: err => console.error(err)
        });

        audioEncoder.configure({
            codec: "mp3",
            sampleRate: options.sampleRate,
            numberOfChannels: options.numChannels,
            bitrate: options.bitrate
        });

        const numberOfFrames = buffers[0].length;
        let interleaved: Float32Array;

        if (options.numChannels === 2) {
            interleaved = UtilFunctions.interleaveBuffers(buffers[0], buffers[1]);
        } else {
            interleaved = buffers[0];
        }

        const audioData = new AudioData({
            format: "f32",
            sampleRate,
            numberOfFrames,
            numberOfChannels: 2,
            timestamp: 0,
            data: interleaved,
        });

        audioEncoder.encode(audioData);

        await audioEncoder.flush();

        audioEncoder.close();

        const outputBuffers: Uint8Array[] = [];

        for (const chunk of chunks) {
            const buffer = new Uint8Array(chunk.byteLength);
            chunk.copyTo(buffer);
            outputBuffers.push(buffer);
        }

        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
        const output = new Uint8Array(totalLength);
        let offset = 0;

        for (const chunk of chunks) {
            const buffer = new Uint8Array(chunk.byteLength);
            chunk.copyTo(buffer);
            output.set(buffer, offset);
            offset += buffer.length;
        }

        return output.buffer;
    }
}
