import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import Constants from "@/model/Constants";
import { EventType } from "@/model/EventTypeEnum";
import EventEmitter from "@/utils/EventEmitter";
import FilterManager from "./FilterManager";
import BufferFetcherService from "@/services/BufferFetcherService";

export default class BufferManager extends AbstractAudioElement {

    /** The filter manager */
    private filterManager: FilterManager | undefined;
    /** The current event emitter */
    private eventEmitter: EventEmitter | undefined;
    /** True if we are downloading initial buffer data */
    downloadingInitialData = false;
    /** List of audio buffers to fetch */
    private audioBuffersToFetch: string[] = [];

    constructor(bufferFetcherService: BufferFetcherService, filterManager: FilterManager, eventEmitter: EventEmitter | null, audioBuffersToFetch: string[]) {
        super();

        this.bufferFetcherService = bufferFetcherService;
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.filterManager = filterManager;
        this.filterManager = filterManager;
        this.audioBuffersToFetch = audioBuffersToFetch;

        this.setup();
    }

    private setup() {
        if (this.audioBuffersToFetch.length > 0) {
            this.fetchBuffers(false);
        }
    }

    /**
     * Fetch default buffers from network
     * @param refetch true if we need to refetch the buffers
     */
    private async fetchBuffers(refetch: boolean) {
        if (this.downloadingInitialData || !this.bufferFetcherService) {
            return;
        }

        this.downloadingInitialData = true;

        if (this.eventEmitter && !refetch) {
            this.eventEmitter.emit(EventType.LOADING_BUFFERS);
        }

        try {
            await this.bufferFetcherService.fetchAllBuffers(this.audioBuffersToFetch);
            this.downloadingInitialData = false;

            if (this.eventEmitter && !refetch) {
                this.eventEmitter.emit(EventType.LOADED_BUFFERS);
            }
        } catch (e) {
            if (this.eventEmitter && !refetch) {
                this.eventEmitter.emit(EventType.LOADING_BUFFERS_ERROR);
            }
        }
    }

    /**
     * Reset the buffer fetcher and redownload the buffers. Used when changing sample rate.
     */
    async resetBufferFetcher() {
        if (this.bufferFetcherService) {
            this.bufferFetcherService.reset();

            await this.fetchBuffers(true);

            if (this.filterManager) {
                await this.filterManager.resetFilterBuffers();
            }
        }
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.BUFFER_MANAGER;
    }
}
