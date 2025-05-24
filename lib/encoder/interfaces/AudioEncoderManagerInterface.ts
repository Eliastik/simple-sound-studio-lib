import AudioEncoderMetadata from "@/model/encoder/AudioEncoderMetadata";
import AudioEncoderOptions from "@/model/encoder/AudioEncoderOptions";

export default interface AudioEncoderManagerInterface {

    getAudioEncodersMetadata(): Promise<AudioEncoderMetadata[]>

    encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer>;
}
