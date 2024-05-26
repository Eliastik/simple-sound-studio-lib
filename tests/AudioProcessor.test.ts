import "reflect-metadata";
import AudioProcessor from "../lib/audioEditor/AudioProcessor";
import { mockBufferManager, mockContextManager, mockFilterManager, mockRendererManager, mockBufferPlayer } from "./AudioEditorObjectsMock";
import { MockAudioContext, createMockAudioContext } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";

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
        await expect(audioProcessor.renderAudio(null)).rejects.toThrowError("No principal buffer available");
      });
    
      test("setupOutput should return false if required dependencies are missing", async () => {
        const result = await audioProcessor.setupOutput(null, createMockAudioContext());
        expect(result).toBe(false);
      });
});
