/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import SaveBufferManager from "../lib/audioEditor/SaveBufferManager";
import FilterManager from "../lib/audioEditor/FilterManager";
import AudioContextManager from "../lib/audioEditor/AudioContextManager";
import BufferPlayer from "../lib/bufferPlayer/BufferPlayer";
import SaveBufferOptions from "../lib/model/SaveBufferOptions";
import { MockAudioContext } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";
import RecorderWorkerMessage from "../lib/model/RecorderWorkerMessage";
import GenericConfigService from "../lib/services/GenericConfigService";

(AudioContext as any) = MockAudioContext;
(AudioBuffer as any) = MockAudioBuffer;
(Worker as any) = class WorkerMock {
    private onMessageCallback: ((e: RecorderWorkerMessage) => void) | null = null;

    set onmessage(callback: (e: RecorderWorkerMessage) => void) {
        this.onMessageCallback = callback;
    }

    postMessage(message: any): void {
        if (this.onMessageCallback) {
            const mockEvent: RecorderWorkerMessage = {
                data: message
            };
            this.onMessageCallback(mockEvent);
        }
    }

    terminate() {
        // Do nothing
    }
}

const mockFilterManagerInstance = new FilterManager([], null);
const mockAudioContextManagerInstance = new AudioContextManager(null, null);
const mockBufferPlayerInstance = new BufferPlayer(mockAudioContextManagerInstance);

describe("SaveBufferManager tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Initialize SaveBufferManager with dependencies", () => {
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockAudioContextManagerInstance, mockBufferPlayerInstance);

        expect(saveBufferManager.savingBuffer).toBe(false);
    });

    test("Save buffer direct - success", async () => {
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockAudioContextManagerInstance, mockBufferPlayerInstance);
        mockBufferPlayerInstance.compatibilityMode = false;

        const savingResult = await saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions);

        expect(savingResult).toBe(true);
    });

    test("Save buffer direct - failure (no rendered buffer)", async () => {
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockAudioContextManagerInstance, mockBufferPlayerInstance);
        mockBufferPlayerInstance.compatibilityMode = false;

        await expect(saveBufferManager.saveBuffer(null, saveBufferOptions)).rejects.toEqual("No rendered buffer or AudioContext not initialized");
    });

    test("Save buffer compatibility mode - failure (no buffer player)", async () => {
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockAudioContextManagerInstance, null);
        mockBufferPlayerInstance.compatibilityMode = true;

        await expect(saveBufferManager.saveBuffer(null, saveBufferOptions)).rejects.toThrowError("No buffer player was found");
    });
});
