import AudioEncoderOptions from "@/model/encoder/AudioEncoderOptions";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import UtilFunctions from "@/utils/Functions";
import { injectable } from "inversify";
import AudioEncoderMetadata from "@/model/encoder/AudioEncoderMetadata";

@injectable()
export default class WAVAudioEncoder extends AbstractAudioEncoder {

    getMetadata(): Promise<AudioEncoderMetadata> {
        return Promise.resolve({
            format: "wav",
            implementationType: "custom",
            supported: true
        });
    }

    encodeAudio(input: Float32Array[], options: AudioEncoderOptions) {
        let samples: Float32Array;

        if (options.numChannels === 2) {
            samples = UtilFunctions.interleaveBuffers(input[0], input[1]);
        } else {
            samples = input[0];
        }

        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        /* RIFF identifier */
        UtilFunctions.writeStringToDataView(view, 0, "RIFF");
        /* RIFF chunk length */
        view.setUint32(4, 36 + samples.length * 2, true);
        /* RIFF type */
        UtilFunctions.writeStringToDataView(view, 8, "WAVE");
        /* format chunk identifier */
        UtilFunctions.writeStringToDataView(view, 12, "fmt ");
        /* format chunk length */
        view.setUint32(16, 16, true);
        /* sample format (raw) */
        view.setUint16(20, 1, true);
        /* channel count */
        view.setUint16(22, options.numChannels, true);
        /* sample rate */
        view.setUint32(24, options.sampleRate, true);
        /* byte rate (sample rate * block align) */
        view.setUint32(28, options.sampleRate * 4, true);
        /* block align (channel count * bytes per sample) */
        view.setUint16(32, options.numChannels * 2, true);
        /* bits per sample */
        view.setUint16(34, 16, true);
        /* data chunk identifier */
        UtilFunctions.writeStringToDataView(view, 36, "data");
        /* data chunk length */
        view.setUint32(40, samples.length * 2, true);

        UtilFunctions.floatTo16BitPCM(view, 44, samples);

        return Promise.resolve(view.buffer);
    }
}
