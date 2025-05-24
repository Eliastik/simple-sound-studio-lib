import { AudioEncoderFormat } from "@/model/AudioEncoderFormat";
import AudioEncoderOptions from "@/model/AudioEncoderOptions";
import AudioEncoderInterface from "./interfaces/AudioEncoderInterface";

export default abstract class AbstractAudioEncoder implements AudioEncoderInterface {

    abstract getFormat(): AudioEncoderFormat;

    abstract encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer>;

    protected async isAudioEncoderAPISupportedForSettings(options: AudioEncoderOptions): Promise<boolean> {
        if (!self.AudioEncoder || !AudioEncoder.isConfigSupported) {
            return false;
        }

        const support = await AudioEncoder.isConfigSupported({
            codec: options.format,
            sampleRate: options.sampleRate,
            numberOfChannels: options.numChannels,
            bitrate: options.audioLength
        });

        return Boolean(support.supported);
    }
}
