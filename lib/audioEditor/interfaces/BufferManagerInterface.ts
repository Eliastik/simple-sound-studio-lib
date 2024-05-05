export default interface BufferManagerInterface {

    /**
     * Reset the buffer fetcher and redownload the buffers. Used when changing sample rate.
     */
    resetBufferFetcher(): Promise<void>;

    set downloadingInitialData(downloadingInitialData: boolean);

    get downloadingInitialData(): boolean;
}
