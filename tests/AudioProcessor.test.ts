import "reflect-metadata";
import AudioProcessor from "../lib/audioEditor/AudioProcessor";
import { mockBufferManager, mockContextManager, mockFilterManager, mockRendererManager, mockBufferPlayer, mockFilterManagerWithoutEntrypoint, mockRendererManagerWithFakeRendererBuffer } from "./AudioEditorObjectsMock";
import { MockAudioContext, createMockAudioContext } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";
import Constants from "../lib/model/Constants";
import GenericConfigService from "../lib/services/GenericConfigService";
import EventEmitter from "../lib/utils/EventEmitter";

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
        const audioProcessor2 = new AudioProcessor(
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
        const audioProcessor2 = new AudioProcessor(
            undefined,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Filter manager is not available");
    });

    test("renderAudio should throw error if no renderer manager available", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            undefined,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Renderer manager is not available");
    });

    test("renderAudio should throw error if no entrypoint filter available", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManagerWithoutEntrypoint,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Entrypoint filter is not available");
    });

    test("Render audio - initial rendering disabled", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter());

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "true");

        jest.spyOn(audioProcessor2, "setupOutput");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100))).toBe(true);
        expect(audioProcessor2.setupOutput).not.toHaveBeenCalled();
    });

    test("Render audio - switching between compatibility and normal mode", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter());

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        mockBufferPlayer.compatibilityMode = true;

        jest.spyOn(mockBufferPlayer, "stop");

        await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100));

        expect(mockBufferPlayer.stop).toHaveBeenCalled(); // Should stop the buffer player
    });

    test("Render audio - Setup output", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRendererBuffer,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter());

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100))).toBe(true);

        expect(audioProcessor2.setupOutput).toHaveBeenCalled();
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();
    });

    test("Render audio - Setup output - Compatibility mode", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRendererBuffer,
            mockContextManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter());

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "true");

        mockBufferPlayer.compatibilityMode = true;

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");
        jest.spyOn(mockBufferPlayer, "setCompatibilityMode");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100))).toBe(true);

        expect(audioProcessor2.setupOutput).toHaveBeenCalled();
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();
        expect(mockBufferPlayer.setCompatibilityMode).toHaveBeenCalled();
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
