import AudioEncoderOptions from "@/model/AudioEncoderOptions";
import { injectable, multiInject } from "inversify";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import { TYPES } from "@/inversify.types";
import { AudioEncoderFormat } from "@/model/AudioEncoderFormat";

@injectable()
export default class BaseAudioEncoder extends AbstractAudioEncoder {

    constructor(
        @multiInject(TYPES.AudioEncoders) private audioEncoders: AbstractAudioEncoder[],
    ) {
        super();
    }

    getFormat(): AudioEncoderFormat | null {
        return null;
    }

    private getAudioEncoderByFormat(format: AudioEncoderFormat) {
        return this.audioEncoders.find(encoder => encoder.getFormat() === format);
    }

    encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer> {
        const audioEncoder = this.getAudioEncoderByFormat(options.format);

        if (audioEncoder) {
            return audioEncoder.encodeAudio(input, options);
        }

        throw new Error(`BaseAudioEncoder.encodeAudio: cannot find encoder for ${options.format} format`);
    }
}
