import AudioEncoderOptions from "@/model/encoder/AudioEncoderOptions";
import { injectable, multiInject } from "inversify";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import { TYPES } from "@/inversify.types";
import { AudioEncoderFormat } from "@/model/encoder/AudioEncoderFormat";
import AudioEncoderManagerInterface from "./interfaces/AudioEncoderManagerInterface";
import AudioEncoderMetadata from "@/model/encoder/AudioEncoderMetadata";

@injectable()
export default class AudioEncoderManager implements AudioEncoderManagerInterface {

    constructor(
        @multiInject(TYPES.AudioEncoders) private audioEncoders: AbstractAudioEncoder[],
    ) { }

    private async getAudioEncoderByFormat(format: AudioEncoderFormat) {
        for (const encoder of this.audioEncoders) {
            const metadata = await encoder.getMetadata();

            if (metadata.format === format) {
                return encoder;
            }
        }
    }

    async getAudioEncodersMetadata(): Promise<AudioEncoderMetadata[]> {
        const metadata = [];

        for (const encoder of this.audioEncoders) {
            metadata.push(await encoder.getMetadata());
        }

        return metadata;
    }

    async encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer> {
        const audioEncoder = await this.getAudioEncoderByFormat(options.format);

        if (audioEncoder) {
            return audioEncoder.encodeAudio(input, options);
        }

        throw new Error(`BaseAudioEncoder.encodeAudio: cannot find encoder for ${options.format} format`);
    }
}
