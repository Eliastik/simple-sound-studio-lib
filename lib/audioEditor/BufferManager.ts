import AbstractAudioElement from "@/interfaces/AbstractAudioElement";
import { EventType } from "@/model/EventTypeEnum";
import BufferManagerInterface from "./interfaces/BufferManagerInterface";
import { inject, injectable, injectFromBase, postConstruct } from "inversify";
import { TYPES } from "@/inversify.types";
import EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import type FilterManagerInterface from "./interfaces/FilterManagerInterface";
import type BufferFetcherServiceInterface from "@/services/interfaces/BufferFetcherServiceInterface";

@injectable()
@injectFromBase()
export default class BufferManager extends AbstractAudioElement implements BufferManagerInterface {

    /** The filter manager */
    private filterManager: FilterManagerInterface | undefined;

    /** True if we are downloading initial buffer data */
    downloadingInitialData = false;

    /** List of audio buffers to fetch */
    private audioBuffersToFetch: string[] = [];

    constructor(
        @inject(TYPES.FilterManager) filterManager: FilterManagerInterface,
        @inject(TYPES.BufferFetcherService) bufferFetcherService: BufferFetcherServiceInterface,
        @inject(TYPES.EventEmitter) eventEmitter: EventEmitterInterface | null,
        @inject(TYPES.AudioBuffersToFetch) audioBuffersToFetch: string[]) {
        super();

        this.bufferFetcherService = bufferFetcherService;
        this.eventEmitter = eventEmitter;
        this.filterManager = filterManager;
        this.filterManager = filterManager;
        this.audioBuffersToFetch = audioBuffersToFetch;
    }

    @postConstruct()
    setup() {
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
            console.error(e);

            if (this.eventEmitter && !refetch) {
                this.eventEmitter.emit(EventType.LOADING_BUFFERS_ERROR);
            }
        }
    }

    async resetBufferFetcher() {
        if (this.bufferFetcherService) {
            this.bufferFetcherService.reset();

            await this.fetchBuffers(true);

            if (this.filterManager) {
                await this.filterManager.resetFilterBuffers();
            }
        }
    }
}
