import AudioEncoderOptions from "@/model/AudioEncoderOptions";
import { injectable, multiInject } from "inversify";
import AbstractAudioEncoder from "./AbstractAudioEncoder";
import { TYPES } from "@/inversify.types";
import AudioEncoderInterface from "./interfaces/AudioEncoderInterface";

@injectable()
export default class BaseAudioEncoder implements AudioEncoderInterface {

    constructor(
        @multiInject(TYPES.AudioEncoders) private audioEncoders: AbstractAudioEncoder[],
    ) { }

    encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer> {
        for (const audioEncoder of this.audioEncoders) {
            if (audioEncoder.getFormat() === options.format) {
                return audioEncoder.encodeAudio(input, options);
            }
        }

        throw new Error(`BaseAudioEncoder.encodeAudio: cannot find encoder for ${options.format} format`);
    }
}
