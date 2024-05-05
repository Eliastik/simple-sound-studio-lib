export default interface BufferDecoderServiceInterface {

    decodeBufferFromFile(file: File): Promise<AudioBuffer | null>;
}
