import AudioEncoderOptions from "@/model/AudioEncoderOptions";

export default interface AudioEncoderInterface {
    encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer>;
}
