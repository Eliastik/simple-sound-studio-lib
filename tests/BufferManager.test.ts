import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import BufferManager from "../lib/audioEditor/BufferManager";
import EventEmitter from "../lib/utils/EventEmitter";
import { EventType } from "../lib/model/EventTypeEnum";
import FilterManager from "../lib/audioEditor/FilterManager";

// Mock des dépendances
const mockBufferFetcherService = {
    fetchAllBuffers: jest.fn(),
    reset: jest.fn()
};
const mockEventEmitter = new EventEmitter();
const mockAudioBuffersToFetch = ["buffer1", "buffer2"];

describe("BufferManager tests", () => {
    test("Initialize BufferManager with audio buffers to fetch", () => {
        const bufferManager = new BufferManager(new FilterManager([], null), mockBufferFetcherService, mockEventEmitter, mockAudioBuffersToFetch);

        expect(bufferManager.downloadingInitialData).toBe(true);
        expect((bufferManager as any).audioBuffersToFetch).toEqual(mockAudioBuffersToFetch);
    });

    test("Fetch buffers from network", async () => {
        const bufferManager = new BufferManager(new FilterManager([], null), mockBufferFetcherService, mockEventEmitter, mockAudioBuffersToFetch);
        
        await bufferManager.resetBufferFetcher();

        expect(mockBufferFetcherService.fetchAllBuffers).toHaveBeenCalledWith(mockAudioBuffersToFetch);
    });

    test("Emit loading buffers event", async () => {
        const mockEventEmitterEmit = jest.spyOn(mockEventEmitter, "emit");
        const bufferManager = new BufferManager(new FilterManager([], null), mockBufferFetcherService, mockEventEmitter, mockAudioBuffersToFetch);
        
        await bufferManager.resetBufferFetcher();

        expect(mockEventEmitterEmit).toHaveBeenCalledWith(EventType.LOADING_BUFFERS);
    });

    test("Emit loaded buffers event after successful fetch", async () => {
        const mockEventEmitterEmit = jest.spyOn(mockEventEmitter, "emit");
        const bufferManager = new BufferManager(new FilterManager([], null), mockBufferFetcherService, mockEventEmitter, mockAudioBuffersToFetch);
        
        await bufferManager.resetBufferFetcher();

        expect(mockEventEmitterEmit).toHaveBeenCalledWith(EventType.LOADED_BUFFERS);
    });

    test("Emit loading buffers error event on fetch failure", async () => {
        const mockBufferFetcherServiceError = {
            fetchAllBuffers: jest.fn(() => {
                throw new Error();
            }),
            reset: jest.fn()
        };
        const mockEventEmitterEmit = jest.spyOn(mockEventEmitter, "emit");
        const bufferManager = new BufferManager(new FilterManager([], null), mockBufferFetcherServiceError, mockEventEmitter, mockAudioBuffersToFetch);
        
        await bufferManager.resetBufferFetcher();

        expect(mockEventEmitterEmit).toHaveBeenCalledWith(EventType.LOADING_BUFFERS_ERROR);
    });
});
