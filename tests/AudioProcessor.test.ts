import "reflect-metadata";
import AudioProcessor from "../lib/audioEditor/AudioProcessor";
import { mockBufferManager, mockContextManager, mockFilterManager, mockRendererManager, mockBufferPlayer, mockFilterManagerWithoutEntrypoint, mockRendererManagerWithFakeRenderedBuffer, mockContextManagerWithLongRunningRendering } from "./AudioEditorObjectsMock";
import { MockAudioContext, createMockAudioContext, MockOfflineAudioContext, MockOfflineAudioContextWithEmptyData, MockOfflineAudioContextWithLongRunningRendering } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";
import Constants from "../lib/model/Constants";
import GenericConfigService from "../lib/services/GenericConfigService";
import EventEmitter from "../lib/utils/EventEmitter";
import { EventType } from "../lib/model/EventTypeEnum";

describe("AudioProcessor", () => {
    let audioProcessor: AudioProcessor;

    beforeEach(() => {
        (AudioContext as any) = MockAudioContext;
        (OfflineAudioContext as any) = MockOfflineAudioContext;

        audioProcessor = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockBufferPlayer,
            mockBufferManager
        );

        (audioProcessor as any).injectDependencies(null, null, null, null, mockContextManager);
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
            mockBufferPlayer,
            mockBufferManager
        );

        (audioProcessor2 as any).injectDependencies(null, null, null, null, mockContextManager);

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Filter manager is not available");
    });

    test("renderAudio should throw error if no renderer manager available", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            undefined,
            mockBufferPlayer,
            mockBufferManager
        );

        (audioProcessor2 as any).injectDependencies(null, null, null, null, mockContextManager);

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Renderer manager is not available");
    });

    test("renderAudio should throw error if no entrypoint filter available", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManagerWithoutEntrypoint,
            mockRendererManager,
            mockBufferPlayer,
            mockBufferManager
        );

        (audioProcessor2 as any).injectDependencies(null, null, null, null, mockContextManager);

        await expect(audioProcessor2.renderAudio(null)).rejects.toThrow("Entrypoint filter is not available");
    });

    test("Render audio - initial rendering disabled", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter(), mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "true");

        jest.spyOn(audioProcessor2, "setupOutput");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100))).toBe(true);
        expect(audioProcessor2.setupOutput).not.toHaveBeenCalled();
    });

    test("Render audio - switching between compatibility and normal mode", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter(), mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        mockBufferPlayer.compatibilityMode = true;

        jest.spyOn(mockBufferPlayer, "stop");

        await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100));

        expect(mockBufferPlayer.stop).toHaveBeenCalled(); // Should stop the buffer player
    });

    test("Render audio - Setup output", async () => {
        const eventEmitter = new EventEmitter();
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");
        jest.spyOn(eventEmitter, "emit");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100))).toBe(true);

        expect(audioProcessor2.setupOutput).toHaveBeenCalled();
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();

        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.OFFLINE_AUDIO_RENDERING_FINISHED);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_RENDERING_FINISHED);
    });

    test("Render audio - Setup output - Compatibility mode", async () => {
        const eventEmitter = new EventEmitter();
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "true");

        mockBufferPlayer.compatibilityMode = true;

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");
        jest.spyOn(mockBufferPlayer, "setCompatibilityMode");
        jest.spyOn(eventEmitter, "emit");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100))).toBe(true);

        expect(audioProcessor2.setupOutput).toHaveBeenCalled();
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();
        expect(mockBufferPlayer.setCompatibilityMode).toHaveBeenCalled();

        expect(eventEmitter.emit).not.toHaveBeenCalledWith(EventType.OFFLINE_AUDIO_RENDERING_FINISHED);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_RENDERING_FINISHED);
    });

    test("Render audio - Setup output with empty result should enable compatibility mode", async () => {
        (OfflineAudioContext as any) = MockOfflineAudioContextWithEmptyData;

        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter(), mockContextManager);

        audioProcessor2.sumInputBuffer = 500;

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");
        jest.spyOn(genericConfigService, "enableCompatibilityMode");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100, false))).toBe(true);

        expect(audioProcessor2.setupOutput).toHaveBeenCalledTimes(2);
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();
        expect(genericConfigService.enableCompatibilityMode).toHaveBeenCalled();

        expect(genericConfigService.isCompatibilityModeEnabled()).toBe(true);
        expect(genericConfigService.isCompatibilityModeChecked()).toBe(true);
    });

    test("Render audio - Setup output with empty result, compatibility mode already checked", async () => {
        (OfflineAudioContext as any) = MockOfflineAudioContextWithEmptyData;

        const eventEmitter = new EventEmitter();
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        audioProcessor2.sumInputBuffer = 500;

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "true");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");
        jest.spyOn(genericConfigService, "enableCompatibilityMode");
        jest.spyOn(eventEmitter, "emit");

        expect(await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100, false))).toBe(true);

        expect(audioProcessor2.setupOutput).toHaveBeenCalledTimes(1);
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();
        expect(genericConfigService.enableCompatibilityMode).not.toHaveBeenCalled();
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.RENDERING_AUDIO_PROBLEM_DETECTED);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.OFFLINE_AUDIO_RENDERING_FINISHED);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_RENDERING_FINISHED);

        expect(genericConfigService.isCompatibilityModeEnabled()).toBe(false);
        expect(genericConfigService.isCompatibilityModeChecked()).toBe(true);
    });

    test("Render audio - Cancelling audio rendering", async () => {
        (OfflineAudioContext as any) = MockOfflineAudioContextWithLongRunningRendering;

        const eventEmitter = new EventEmitter();
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManagerWithLongRunningRendering);

        audioProcessor2.sumInputBuffer = 500;

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "true");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        jest.spyOn(audioProcessor2, "setupOutput");
        jest.spyOn(mockFilterManager, "initializeWorklets");
        jest.spyOn(mockFilterManager, "connectNodes");
        jest.spyOn(genericConfigService, "enableCompatibilityMode");
        jest.spyOn(eventEmitter, "emit");

        expect(audioProcessor2.initialRenderingDone).toBe(false);

        const rendererPromise = audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100, false));

        setTimeout(() => {
            audioProcessor2.cancelAudioRendering();
        }, 500);

        await rendererPromise;

        expect(audioProcessor2.setupOutput).toHaveBeenCalledTimes(1);
        expect(mockFilterManager.initializeWorklets).toHaveBeenCalled();
        expect(mockFilterManager.connectNodes).toHaveBeenCalled();
        expect(genericConfigService.enableCompatibilityMode).not.toHaveBeenCalled();
        expect(audioProcessor2.initialRenderingDone).toBe(true);

        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.CANCELLED_AND_LOADED_INITIAL_AUDIO);
    });

    test("setupOutput should return false if required dependencies are missing", async () => {
        const result = await audioProcessor.setupOutput(null, createMockAudioContext());
        expect(result).toBe(false);
    });

    test("Render audio - should reset audio speed", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        const eventEmitter = new EventEmitter();

        jest.spyOn(eventEmitter, "emit");

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100));

        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_SPEED_UPDATED, 1);
    });

    test("Render audio - should reset rendering progress", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManager,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();
        const eventEmitter = new EventEmitter();

        jest.spyOn(eventEmitter, "emit");
        jest.spyOn(mockFilterManager, "disableFilter");

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100));

        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, 0);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.UPDATE_REMAINING_TIME_ESTIMATED, -1);
        expect(mockFilterManager.disableFilter).toHaveBeenCalledWith(Constants.FILTERS_NAMES.RENDERING_PROGRESS_CALCULATION);
    });

    test("Render audio - should enable rendering calculation", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter(), mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "true");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        jest.spyOn(mockFilterManager, "enableFilter");

        await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100));

        expect(mockFilterManager.enableFilter).toHaveBeenCalledWith(Constants.FILTERS_NAMES.RENDERING_PROGRESS_CALCULATION);
    });

    test("Render audio - compatibility mode - shouldn't enable rendering calculation", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, new EventEmitter(), mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "true");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "true");

        jest.spyOn(mockFilterManager, "enableFilter");

        await audioProcessor2.renderAudio(new MockAudioBuffer(2, 10000, 44100));

        expect(mockFilterManager.enableFilter).not.toHaveBeenCalledWith(Constants.FILTERS_NAMES.RENDERING_PROGRESS_CALCULATION);
    });

    test("Render audio - should update audio speed when rendering is finished", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();
        const eventEmitter = new EventEmitter();

        jest.spyOn(eventEmitter, "emit");

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "true");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "false");

        const mockAudioBuffer = new MockAudioBuffer(2, 10000, 44100);

        await audioProcessor2.renderAudio(mockAudioBuffer);

        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_SPEED_UPDATED, 1);
    });

    test("Render audio - compatibility mode - should update audio speed and duration when rendering is finished", async () => {
        const audioProcessor2 = new AudioProcessor(
            mockFilterManager,
            mockRendererManagerWithFakeRenderedBuffer,
            mockBufferPlayer,
            mockBufferManager
        );
        const genericConfigService = new GenericConfigService();
        const eventEmitter = new EventEmitter();

        jest.spyOn(eventEmitter, "emit");

        (audioProcessor2 as any).injectDependencies(null, null, genericConfigService, eventEmitter, mockContextManager);

        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.DISABLE_INITIAL_RENDERING, "false");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_CHECKED, "true");
        genericConfigService.setConfig(Constants.PREFERENCES_KEYS.COMPATIBILITY_MODE_ENABLED, "true");

        const mockAudioBuffer = new MockAudioBuffer(2, 10000, 44100);
        mockAudioBuffer.duration = 500;

        await audioProcessor2.renderAudio(mockAudioBuffer);

        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_SPEED_UPDATED, 1);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.AUDIO_DURATION_UPDATED, 501);
    });
});
