export default interface BufferFetcherServiceInterface {

    fetchBuffer(bufferURI: string, force?: boolean): Promise<void>;

    fetchAllBuffers(bufferURIs: string[]): Promise<void>;

    getAudioBuffer(filename: string): AudioBuffer | undefined;

    getOrFetchAudioBuffer(filename: string): Promise<AudioBuffer | undefined>;

    getDownloadedBuffersList(): string[];

    reset(): void;
}
