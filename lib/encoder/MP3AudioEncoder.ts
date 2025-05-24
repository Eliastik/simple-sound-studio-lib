import AudioEncoderOptions from "@/model/encoder/AudioEncoderOptions";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import UtilFunctions from "@/utils/Functions";
import { injectable, postConstruct } from "inversify";
import AudioEncoderMetadata from "@/model/encoder/AudioEncoderMetadata";

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

    async getMetadata(): Promise<AudioEncoderMetadata> {
        const audioEncoderAPISupported = await this.isWebAudioEncoderAPISupportedForSettings({
            audioLength: -1, format: "mp3", bitrate: 320000, numChannels: 2, sampleRate: 44100
        });

        return {
            format: "mp3",
            implementationType: audioEncoderAPISupported ? "audioEncoderAPI" : "custom",
            supported: true
        };
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
        const audioEncoderMP3Supported = await this.isWebAudioEncoderAPISupportedForSettings(options);

        if (audioEncoderMP3Supported) {
            return this.encodeWithWebAudioEncoderAPI(input, options)
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
        const mp3Data: Int8Array[] = [];

        const left = UtilFunctions.convertFloat32Array2Int16(buffers[0]);
        const right = UtilFunctions.convertFloat32Array2Int16(buffers[1]);

        const sampleBlockSize = 1152;

        for (let i = 0; i < left.length; i += sampleBlockSize) {
            const leftChunk = left.subarray(i, i + sampleBlockSize);
            const rightChunk = right.subarray(i, i + sampleBlockSize);

            const mp3buf: Int8Array = mp3encoder.encodeBuffer(leftChunk, rightChunk);

            if (mp3buf.length > 0) {
                mp3Data.push(mp3buf);
            }
        }

        const mp3buf: Int8Array = mp3encoder.flush();

        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }

        return UtilFunctions.mergeBuffers(mp3Data).buffer as ArrayBuffer;
    }
}
