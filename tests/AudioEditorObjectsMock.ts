import EventEmitter from "../lib/utils/EventEmitter";
import AudioContextManagerInterface from "../lib/audioEditor/interfaces/AudioContextManagerInterface";
import AudioProcessorInterface from "../lib/audioEditor/interfaces/AudioProcessorInterface";
import BufferManagerInterface from "../lib/audioEditor/interfaces/BufferManagerInterface";
import FilterManagerInterface from "../lib/audioEditor/interfaces/FilterManagerInterface";
import RendererManagerInterface from "../lib/audioEditor/interfaces/RendererManagerInterface";
import SaveBufferManagerInterface from "../lib/audioEditor/interfaces/SaveBufferManagerInteface";
import BufferPlayerInterface from "../lib/bufferPlayer/interfaces/BufferPlayerInterface";
import EventEmitterInterface from "../lib/utils/interfaces/EventEmitterInterface";
import { MockAudioBuffer } from "./AudioBufferMock";
import { createMockAudioContext, createMockOfflineAudioContext, MockOfflineAudioContextWithLongRunningRendering } from "./AudioContextMock";
import MockAudioNode from "./MockAudioNode";

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
    clearWorklets: jest.fn(),
    getAddingTime: jest.fn(),
    setupTotalSamples: jest.fn(),
    resetFilterBuffers: jest.fn(),
    disconnectAllNodes: jest.fn(),
    disableFilter: jest.fn(),
    enableFilter: jest.fn(),
    currentNodes: {
        input: new MockAudioNode(),
        output: new MockAudioNode(),
        intermediateNodes: []
    }
} as unknown as FilterManagerInterface;

const mockFilterManagerWithoutEntrypoint = {
    addFilters: jest.fn(),
    getFiltersState: jest.fn().mockReturnValue({}),
    getFiltersSettings: jest.fn().mockReturnValue(new Map()),
    toggleFilter: jest.fn(),
    changeFilterSettings: jest.fn(),
    resetFilterSettings: jest.fn(),
    resetAllFiltersState: jest.fn(),
    entrypointFilter: undefined,
    connectNodes: jest.fn(),
    disconnectOldNodes: jest.fn(),
    initializeWorklets: jest.fn(),
    getAddingTime: jest.fn(),
    setupTotalSamples: jest.fn(),
    resetFilterBuffers: jest.fn(),
    currentNodes: jest.fn()
} as unknown as FilterManagerInterface;

const mockRendererManager = {
    addRenderers: jest.fn(),
    toggleRenderer: jest.fn(),
    resetAllRenderersState: jest.fn(),
    getRenderersState: jest.fn().mockReturnValue({}),
    executeAudioRenderers: jest.fn()
} as unknown as RendererManagerInterface;

const mockRendererManagerWithFakeRenderedBuffer = {
        addRenderers: jest.fn(),
        toggleRenderer: jest.fn(),
        resetAllRenderersState: jest.fn(),
        getRenderersState: jest.fn().mockReturnValue({}),
        executeAudioRenderers: jest.fn().mockReturnValue(new MockAudioBuffer(2, 1000, 44100))
} as unknown as RendererManagerInterface;

const mockContextManager = {
    currentContext: createMockAudioContext(),
    createOfflineAudioContext: jest.fn(() => createMockOfflineAudioContext()),
    currentSampleRate: 44100,
    createNewContextIfNeeded: jest.fn(),
    createNewContext: jest.fn()
} as unknown as AudioContextManagerInterface;

const mockContextManagerWithLongRunningRendering = {
    currentContext: createMockAudioContext(),
    createOfflineAudioContext: jest.fn(() => new MockOfflineAudioContextWithLongRunningRendering()),
    currentSampleRate: 44100,
    createNewContextIfNeeded: jest.fn(),
    createNewContext: jest.fn()
} as unknown as AudioContextManagerInterface;

const mockSaveBufferManager = {
    saveBuffer: jest.fn(),
} as unknown as SaveBufferManagerInterface;

const mockAudioProcessor = {
    prepareContext: jest.fn(),
    setupOutput: jest.fn(),
    renderAudio: jest.fn(),
    cancelAudioRendering: jest.fn(),
    clearRenderedBuffer: jest.fn(),
    sumInputBuffer: 0,
    renderedBuffer: new MockAudioBuffer(2, 0, 44100),
    initialRenderingDone: false,
    updateAudioSpeedAndDuration: jest.fn(),
    resetAudioRenderingProgress: jest.fn()
} as unknown as AudioProcessorInterface;

const mockBufferManager = {
    downloadingInitialData: true,
    resetBufferFetcher: jest.fn()
} as unknown as BufferManagerInterface;

const mockBufferPlayer = {
    eventEmitter: new EventEmitter(),
    onBeforePlaying: jest.fn((callback) => (mockBufferPlayer as any).eventEmitter.on("onBeforePlaying", callback)),
    on: jest.fn((event, callback) => (mockBufferPlayer as any).eventEmitter.on(event, callback)),
    stop: jest.fn(),
    reset: jest.fn(),
    start: jest.fn(),
    compatibilityMode: false,
    loop: false,
    loadBuffer: jest.fn(),
    setCompatibilityMode: jest.fn(() => (mockBufferPlayer as any).compatibilityMode = true),
} as unknown as BufferPlayerInterface;

const mockEventEmitter = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
} as unknown as EventEmitterInterface;

const mockRecorder = {
    setup: jest.fn().mockResolvedValue(true),
    record: jest.fn(),
    stop: jest.fn(),
    kill: jest.fn(),
    exportMP3: jest.fn((callback) => callback(new Blob())),
    exportWAV: jest.fn((callback) => callback(new Blob())),
    getBuffer: jest.fn((callback) => callback([[], []]))
};

export { mockAudioProcessor, mockBufferManager, mockContextManager, mockFilterManager, mockRendererManager, mockSaveBufferManager, mockBufferPlayer, mockEventEmitter, mockFilterManagerWithoutEntrypoint, mockRecorder, mockRendererManagerWithFakeRenderedBuffer as mockRendererManagerWithFakeRenderedBuffer, mockContextManagerWithLongRunningRendering };
