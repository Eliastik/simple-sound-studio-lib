import AudioEncoderOptions from "@/model/encoder/AudioEncoderOptions";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import { injectable } from "inversify";
import AudioEncoderMetadata from "@/model/encoder/AudioEncoderMetadata";

@injectable()
export default class OpusAudioEncoder extends AbstractAudioEncoder {

    async getMetadata(): Promise<AudioEncoderMetadata> {
        const audioEncoderAPISupported = await this.isWebAudioEncoderAPISupportedForSettings({
            audioLength: -1, format: "opus", bitrate: 128000, numChannels: 2, sampleRate: 44100
        });

        return {
            format: "opus",
            implementationType: "audioEncoderAPI",
            supported: audioEncoderAPISupported
        };
    }

    encodeAudio(input: Float32Array[], options: AudioEncoderOptions) {
        return this.encodeWithWebAudioEncoderAPI(input, options);
    }
}
