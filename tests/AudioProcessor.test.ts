import "reflect-metadata";
import AudioProcessor from "../lib/audioEditor/AudioProcessor";
import { mockBufferManager, mockContextManager, mockFilterManager, mockRendererManager, mockBufferPlayer, mockFilterManagerWithoutEntrypoint } from "./AudioEditorObjectsMock";
import { MockAudioContext, createMockAudioContext } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";
import Constants from "../lib/model/Constants";

(OfflineAudioContext as any) = MockAudioContext;

describe("AudioProcessor", () => {
    let audioProcessor: AudioProcessor;

    beforeEach(() => {
        audioProcessor = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );
    });

    test("should be defined", () => {
        expect(audioProcessor).toBeDefined();
    });

    test("should prepare context", async () => {
        await audioProcessor.prepareContext(null);
        expect(mockContextManager.createNewContextIfNeeded).toHaveBeenCalledTimes(1);
    });

    test("renderAudio should throw error if required dependencies are not available", async () => {
        const audioProcessor2 = audioProcessor = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            undefined,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(new MockAudioBuffer(2, 0, 44100))).rejects.toThrowError("AudioContext is not yet available");
    });

    test("renderAudio should throw error if no principal buffer available", async () => {
        await expect(audioProcessor.renderAudio(null)).rejects.toThrow("No principal buffer available");
    });

    test("renderAudio should throw error if no filter manager available", async () => {
        const audioProcessor2 = audioProcessor = new AudioProcessor(
            undefined,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Filter manager is not available");
    });

    test("renderAudio should throw error if no renderer manager available", async () => {
        const audioProcessor2 = audioProcessor = new AudioProcessor(
            mockFilterManager,
            undefined,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Renderer manager is not available");
    });

    test("renderAudio should throw error if no entrypoint filter available", async () => {
        const audioProcessor2 = audioProcessor = new AudioProcessor(
            mockFilterManagerWithoutEntrypoint,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Entrypoint filter is not available");
    });

    test("setupOutput should return false if required dependencies are missing", async () => {
        const result = await audioProcessor.setupOutput(null, createMockAudioContext());
        expect(result).toBe(false);
    });

    test("should return order and id correctly", () => {
        expect(audioProcessor.order).toBe(-1);
        expect(audioProcessor.id).toBe(Constants.AUDIO_PROCESSOR);
    });
});
