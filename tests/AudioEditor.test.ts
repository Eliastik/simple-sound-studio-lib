import "reflect-metadata";
import AudioEditor from "../lib/audioEditor/AudioEditor";
import Constants from "../lib/model/Constants";
import utilFunctions from "../lib/utils/Functions";
import LimiterFilter from "../lib/filters/LimiterFilter";
import SountouchWrapperFilter from "../lib/filters/SountouchWrapperFilter";
import VocoderRenderer from "../lib/filters/VocoderRenderer";
import { createMockAudioContext } from "./AudioContextMock";
import { MockAudioBuffer } from "./AudioBufferMock";
import { MockAudioContext } from "./AudioContextMock";
import EventEmitter from "../lib/utils/EventEmitter";

(AudioContext as any) = MockAudioContext;
(AudioBuffer as any) = MockAudioBuffer;

// Mocking dependencies
const mockFilterManager = {
    addFilters: jest.fn(),
    getFiltersState: jest.fn().mockReturnValue({}),
    getFiltersSettings: jest.fn().mockReturnValue(new Map()),
    toggleFilter: jest.fn(),
    changeFilterSettings: jest.fn(),
    resetFilterSettings: jest.fn(),
    resetAllFiltersState: jest.fn(),
    entrypointFilter: {
        getSpeed: jest.fn().mockReturnValue(1)
    },
    connectNodes: jest.fn(),
    disconnectOldNodes: jest.fn(),
    initializeWorklets: jest.fn(),
    getAddingTime: jest.fn(),
    setupTotalSamples: jest.fn(),
    resetFilterBuffers: jest.fn(),
    currentNodes: jest.fn()
};

const mockRendererManager = {
    addRenderers: jest.fn(),
    toggleRenderer: jest.fn(),
    resetAllRenderersState: jest.fn(),
    getRenderersState: jest.fn().mockReturnValue({}),
    executeAudioRenderers: jest.fn()
};

const mockContextManager = {
    currentContext: createMockAudioContext(),
    currentSampleRate: 44100,
    createNewContextIfNeeded: jest.fn(),
    createNewContext: jest.fn()
};

const mockSaveBufferManager = {
    saveBuffer: jest.fn(),
};

const mockAudioProcessor = {
    prepareContext: jest.fn(),
    setupOutput: jest.fn(),
    renderAudio: jest.fn(),
    cancelAudioRendering: jest.fn(),
    sumInputBuffer: 0,
    renderedBuffer: new MockAudioBuffer(2, 0, 44100),
    initialRenderingDone: false
};

const mockBufferManager = {
    downloadingInitialData: true,
    resetBufferFetcher: jest.fn()
};

const mockBufferPlayer = {
    onBeforePlaying: jest.fn(),
    on: jest.fn(),
    stop: jest.fn(),
    reset: jest.fn(),
    start: jest.fn(),
    compatibilityMode: false,
    loop: false,
};

describe("AudioEditor", () => {
    let audioEditor: AudioEditor;

    beforeEach(() => {
        audioEditor = new AudioEditor(
            mockFilterManager,
            mockRendererManager,
            mockContextManager,
            mockSaveBufferManager,
            mockAudioProcessor,
            mockBufferManager,
            mockBufferPlayer
        );
    });

    test("should initialize with provided managers", () => {
        expect(audioEditor).toBeDefined();
        expect(audioEditor["filterManager"]).toBe(mockFilterManager);
        expect(audioEditor["rendererManager"]).toBe(mockRendererManager);
        expect(audioEditor["contextManager"]).toBe(mockContextManager);
        expect(audioEditor["saveBufferManager"]).toBe(mockSaveBufferManager);
        expect(audioEditor["audioProcessor"]).toBe(mockAudioProcessor);
        expect(audioEditor["bufferManager"]).toBe(mockBufferManager);
        expect(audioEditor["bufferPlayer"]).toBe(mockBufferPlayer);
    });

    test("should add filters using filterManager", () => {
        const filters = [new SountouchWrapperFilter(), new LimiterFilter()];
        audioEditor.addFilters(...filters);
        expect(mockFilterManager.addFilters).toHaveBeenCalledWith(...filters);
    });

    test("should add renderers using rendererManager", () => {
        const renderers = [new VocoderRenderer()];
        audioEditor.addRenderers(...renderers);
        expect(mockRendererManager.addRenderers).toHaveBeenCalledWith(...renderers);
    });

    test("should return current sample rate from contextManager", () => {
        expect(audioEditor.currentSampleRate).toBe(44100);
    });

    test("should return default device sample rate", () => {
        const sampleRate = audioEditor.defaultDeviceSampleRate;
        expect(sampleRate).toBeGreaterThan(0);
    });

    test("should load buffer and prepare context", async () => {
        const file = new File([], "test.wav");
        audioEditor["bufferDecoderService"] = { decodeBufferFromFile: jest.fn().mockResolvedValue({}) };
        await audioEditor.loadBufferFromFile(file);
        expect(mockAudioProcessor.prepareContext).toHaveBeenCalled();
    });

    test("should load buffer directly", () => {
        const buffer = new AudioBuffer({ length: 44100, sampleRate: 44100 });
        audioEditor.loadBuffer(buffer);
        expect(audioEditor["principalBuffer"]).toBe(buffer);
        expect(mockAudioProcessor.sumInputBuffer).toBeDefined();
    });

    test("should return output buffer from audioProcessor", () => {
        mockAudioProcessor.renderedBuffer = new MockAudioBuffer(2, 0, 44100);
        expect(audioEditor.getOutputBuffer()).toBe(mockAudioProcessor.renderedBuffer);
    });

    test("should render audio using audioProcessor", async () => {
        mockAudioProcessor.renderAudio.mockResolvedValue(true);
        const result = await audioEditor.renderAudio();
        expect(result).toBe(true);
    });

    test("should check if audio worklet is available", () => {
        utilFunctions.isAudioWorkletCompatible = jest.fn().mockReturnValue(true);
        expect(audioEditor.isAudioWorkletAvailable()).toBe(true);
    });

    test("should get filters state", () => {
        expect(audioEditor.getFiltersState()).toEqual({});
    });

    test("should get filters settings", () => {
        expect(audioEditor.getFiltersSettings()).toEqual(new Map());
    });

    test("should toggle filter", () => {
        const filterId = "testFilter";
        audioEditor.toggleFilter(filterId);
        expect(mockRendererManager.toggleRenderer).toHaveBeenCalledWith(filterId);
        expect(mockFilterManager.toggleFilter).toHaveBeenCalledWith(filterId);
    });

    test("should reset all filters state", () => {
        audioEditor.resetAllFiltersState();
        expect(mockRendererManager.resetAllRenderersState).toHaveBeenCalled();
        expect(mockFilterManager.resetAllFiltersState).toHaveBeenCalled();
    });

    test("should handle exit properly", () => {
        audioEditor.exit();
        expect(mockBufferPlayer.stop).toHaveBeenCalled();
        expect(mockBufferPlayer.reset).toHaveBeenCalled();
        expect(audioEditor["principalBuffer"]).toBeNull();
    });

    test("should handle event subscriptions", () => {
        const callback = jest.fn();

        const mockEventEmitter = {
            on: jest.fn(),
            off: jest.fn()
        };

        audioEditor.injectDependencies(null, null, null, mockEventEmitter);
        audioEditor.on("testEvent", callback);
        expect(audioEditor["eventEmitter"].on).toHaveBeenCalledWith("testEvent", callback);

        audioEditor.injectDependencies(null, null, null, mockEventEmitter);
        audioEditor.off("testEvent", callback);
        expect(audioEditor["eventEmitter"].off).toHaveBeenCalledWith("testEvent", callback);
    });

    test("should save buffer using saveBufferManager", async () => {
        const options = {};
        mockSaveBufferManager.saveBuffer.mockResolvedValue(true);
        const result = await audioEditor.saveBuffer(options);
        expect(result).toBe(true);
    });

    test("should get and set downloadingInitialData", () => {
        audioEditor.downloadingInitialData = true;
        expect(mockBufferManager.downloadingInitialData).toBe(true);
        mockBufferManager.downloadingInitialData = false;
        expect(audioEditor.downloadingInitialData).toBe(false);
    });

    test("should return order and id correctly", () => {
        expect(audioEditor.order).toBe(-1);
        expect(audioEditor.id).toBe(Constants.AUDIO_EDITOR);
    });
});
