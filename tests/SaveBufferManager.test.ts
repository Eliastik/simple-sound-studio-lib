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
import { MockAudioContext, createMockAudioContext } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";
import RecorderWorkerMessage from "../lib/model/RecorderWorkerMessage";
import GenericConfigService from "../lib/services/GenericConfigService";
import { MockEntrypointFilter } from "./MockAudioFilter";
import EventEmitter from "../lib/utils/EventEmitter";
import { EventType } from "../lib/model/EventTypeEnum";
import { mockRecorder } from "./AudioEditorObjectsMock";

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

const mockAudioFilter = new MockEntrypointFilter(1, "filter1", true, 10);
const mockFilterManagerInstance = new FilterManager([mockAudioFilter], mockAudioFilter);
const mockAudioContextManagerInstance = new AudioContextManager(null, null);
const mockBufferPlayerInstance = new BufferPlayer(mockAudioContextManagerInstance);
const mockConfigService = new GenericConfigService();

describe("SaveBufferManager tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.URL.createObjectURL = jest.fn(() => "mockURL");
        global.URL.revokeObjectURL = jest.fn();
    });

    test("Initialize SaveBufferManager with dependencies", () => {
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstance);

        expect(saveBufferManager.savingBuffer).toBe(false);
    });

    test("Save buffer direct - success", async () => {
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstance);
        mockBufferPlayerInstance.compatibilityMode = false;

        const savingResult = await saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions);

        expect(savingResult).toBe(true);
    });

    test("Save buffer direct - failure (no rendered buffer)", async () => {
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstance);
        mockBufferPlayerInstance.compatibilityMode = false;

        await expect(saveBufferManager.saveBuffer(null, saveBufferOptions)).rejects.toEqual("No rendered buffer or AudioContext not initialized");
    });

    test("Save buffer compatibility mode - failure (no buffer player)", async () => {
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };
        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, null);
        mockBufferPlayerInstance.compatibilityMode = true;

        await expect(saveBufferManager.saveBuffer(null, saveBufferOptions)).rejects.toThrow("No buffer player was found");
    });

    test("Save buffer direct - compatibility mode - success (WAV)", async () => {
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const eventEmitter = new EventEmitter();
        const saveBufferOptions: SaveBufferOptions = {
            format: "wav",
            bitrate: 128
        };

        mockFilterManagerInstance.connectNodes(createMockAudioContext(), new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 }), false, true);
        mockBufferPlayerInstance.compatibilityMode = true;

        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstance);
        (saveBufferManager as any).injectDependencies(null, null, mockConfigService, eventEmitter, mockAudioContextManagerInstance);

        jest.spyOn(mockRecorder, "stop");
        jest.spyOn(mockRecorder, "record");

        jest.spyOn(eventEmitter, "off");
        jest.spyOn(eventEmitter, "on");

        const savePromise = saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions, mockRecorder as any);

        setTimeout(() => {
            eventEmitter.emit(EventType.PLAYING_FINISHED);
        }, 500);

        expect(await savePromise).toBe(true);
        expect(mockRecorder.record).toHaveBeenCalled();
        expect(mockRecorder.stop).toHaveBeenCalled();
        expect(mockRecorder.exportWAV).toHaveBeenCalled();
        expect(mockRecorder.exportMP3).not.toHaveBeenCalled();
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_FINISHED, expect.any(Function));
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_STOPPED, expect.any(Function));
    });

    test("Save buffer direct - compatibility mode - success (MP3)", async () => {
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const eventEmitter = new EventEmitter();
        const saveBufferOptions: SaveBufferOptions = {
            format: "mp3",
            bitrate: 128
        };

        jest.spyOn(eventEmitter, "off");
        jest.spyOn(eventEmitter, "on");

        mockFilterManagerInstance.connectNodes(createMockAudioContext(), new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 }), false, true);
        mockBufferPlayerInstance.compatibilityMode = true;

        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstance);
        (saveBufferManager as any).injectDependencies(null, null, mockConfigService, eventEmitter, mockAudioContextManagerInstance);

        const savePromise = saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions, mockRecorder as any);

        setTimeout(() => {
            eventEmitter.emit(EventType.PLAYING_FINISHED);
        }, 500);

        expect(await savePromise).toBe(true);
        expect(mockRecorder.exportMP3).toHaveBeenCalled();
        expect(mockRecorder.exportWAV).not.toHaveBeenCalled();
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_FINISHED, expect.any(Function));
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_STOPPED, expect.any(Function));
    });

    test("Save buffer direct - compatibility mode - cancel", async () => {
        const mockBufferPlayerInstanceOther = new BufferPlayer(mockAudioContextManagerInstance);
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const eventEmitter = new EventEmitter();
        const saveBufferOptions: SaveBufferOptions = {
            format: "mp3",
            bitrate: 128
        };

        jest.spyOn(eventEmitter, "off");
        jest.spyOn(eventEmitter, "on");

        mockFilterManagerInstance.connectNodes(createMockAudioContext(), new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 }), false, true);

        mockBufferPlayerInstanceOther.compatibilityMode = true;
        mockBufferPlayerInstanceOther.injectDependencies(null, null, null, eventEmitter, mockAudioContextManagerInstance);

        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstanceOther);
        (saveBufferManager as any).injectDependencies(null, null, mockConfigService, eventEmitter, mockAudioContextManagerInstance);

        const savePromise = saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions, mockRecorder as any);

        setTimeout(() => {
            mockBufferPlayerInstanceOther.stop();
        }, 500);

        expect(await savePromise).toBe(true);
        expect(mockRecorder.kill).toHaveBeenCalled();
        expect(mockRecorder.record).toHaveBeenCalled();
        expect(mockRecorder.exportMP3).not.toHaveBeenCalled();
        expect(mockRecorder.exportWAV).not.toHaveBeenCalled();
        expect(mockRecorder.stop).not.toHaveBeenCalled();
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_FINISHED, expect.any(Function));
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_STOPPED, expect.any(Function));
    });

    test("Save buffer direct - failure (cannot save if we are already saving)", async () => {
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const eventEmitter = new EventEmitter();
        const saveBufferOptions: SaveBufferOptions = {
            format: "mp3",
            bitrate: 128
        };

        mockFilterManagerInstance.connectNodes(createMockAudioContext(), new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 }), false, true);
        mockBufferPlayerInstance.compatibilityMode = true;

        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstance);
        (saveBufferManager as any).injectDependencies(null, null, mockConfigService, eventEmitter);

        saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions, mockRecorder as any);

        await expect(saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions)).rejects.toThrow("The buffer is currently saving");
    });

    test("Stopping player should disable event", async () => {
        const mockRenderedBuffer = new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 });
        const mockBufferPlayerInstanceOther = new BufferPlayer(mockAudioContextManagerInstance);
        const eventEmitter = new EventEmitter();
        const saveBufferOptions: SaveBufferOptions = {
            format: "mp3",
            bitrate: 128
        };

        mockFilterManagerInstance.connectNodes(createMockAudioContext(), new AudioBuffer({ length: 44100, numberOfChannels: 2, sampleRate: 44100 }), false, true);

        mockBufferPlayerInstanceOther.compatibilityMode = true;
        mockBufferPlayerInstanceOther.injectDependencies(null, null, null, eventEmitter, mockAudioContextManagerInstance);

        const saveBufferManager = new SaveBufferManager(mockFilterManagerInstance, mockBufferPlayerInstanceOther);
        (saveBufferManager as any).injectDependencies(null, null, mockConfigService, eventEmitter);

        const savePromise = saveBufferManager.saveBuffer(mockRenderedBuffer, saveBufferOptions, mockRecorder as any);

        jest.spyOn(eventEmitter, "off");

        setTimeout(() => {
            eventEmitter.emit(EventType.PLAYING_FINISHED);
        }, 500);

        expect(await savePromise).toBe(true);
        expect(eventEmitter.off).toHaveBeenCalledWith(EventType.PLAYING_FINISHED, expect.any(Function));
    });
});
