import AudioEncoderMetadata from "@/model/encoder/AudioEncoderMetadata";
import AudioEncoderOptions from "@/model/encoder/AudioEncoderOptions";
import UtilFunctions from "@/utils/Functions";

export default abstract class AbstractAudioEncoder {

    abstract getMetadata(): Promise<AudioEncoderMetadata>;

    abstract encodeAudio(input: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer>;

    protected async isWebAudioEncoderAPISupportedForSettings(options: AudioEncoderOptions): Promise<boolean> {
        if (!AudioEncoder || !AudioEncoder.isConfigSupported) {
            return false;
        }

        const support = await AudioEncoder.isConfigSupported({
            codec: options.format,
            sampleRate: options.sampleRate,
            numberOfChannels: options.numChannels,
            bitrate: (options.bitrate || 0) * 100
        });

        return Boolean(support.supported);
    }

    /**
     * Encode a buffer using Web Audio Encoder API
     * @param buffers Array of Float32Array (one for each channel)
     * @returns ArrayBuffer buffer with encoded data
     */
    protected async encodeWithWebAudioEncoderAPI(buffers: Float32Array[], options: AudioEncoderOptions): Promise<ArrayBuffer> {
        const metadata = await this.getMetadata();
        const codec = metadata.format;

        if (!codec) {
            throw new Error("encodeWebAudioEncoderAPI: No format provided");
        }

        const chunks: EncodedAudioChunk[] = [];

        const audioEncoder = new AudioEncoder({
            output: chunk => chunks.push(chunk),
            error: err => console.error(err)
        });

        audioEncoder.configure({
            codec,
            sampleRate: options.sampleRate,
            numberOfChannels: options.numChannels,
            bitrate: (options.bitrate || 0) * 100
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
            sampleRate: options.sampleRate,
            numberOfFrames,
            numberOfChannels: 2,
            timestamp: 0,
            data: interleaved,
        });

        audioEncoder.encode(audioData);

        await audioEncoder.flush();

        audioEncoder.close();

        console.log(chunks);

        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
        const output = new Float32Array(totalLength);
        let offset = 0;

        for (const chunk of chunks) {
            const buffer = new Float32Array(chunk.byteLength);
            chunk.copyTo(buffer);
            output.set(buffer, offset);
            offset += buffer.length;
        }

        return output.buffer;
    }
}
