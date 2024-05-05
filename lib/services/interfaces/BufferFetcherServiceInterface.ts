export default interface BufferFetcherServiceInterface {

    fetchBuffer(bufferURI: string, force?: boolean): void;

    fetchAllBuffers(bufferURIs: string[]): void;

    getAudioBuffer(filename: string): AudioBuffer | undefined;

    getOrFetchAudioBuffer(filename: string): Promise<AudioBuffer | undefined>;

    getDownloadedBuffersList(): string[];

    reset(): void;
}
