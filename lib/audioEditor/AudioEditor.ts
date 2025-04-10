import AbstractAudioElement from "../interfaces/AbstractAudioElement";
import AbstractAudioFilter from "../filters/interfaces/AbstractAudioFilter";
import AbstractAudioRenderer from "../filters/interfaces/AbstractAudioRenderer";
import utils from "../utils/Functions";
import { EventType } from "../model/EventTypeEnum";
import { FilterSettings } from "../model/filtersSettings/FilterSettings";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import { FilterState } from "../model/FilterState";
import SaveBufferOptions from "../model/SaveBufferOptions";
import { TYPES } from "../inversify.types";
import { inject, injectable, postConstruct } from "inversify";
import AudioEditorInterface from "./interfaces/AudioEditorInterface";
import type FilterManagerInterface from "./interfaces/FilterManagerInterface";
import type RendererManagerInterface from "./interfaces/RendererManagerInterface";
import type AudioContextManagerInterface from "./interfaces/AudioContextManagerInterface";
import type SaveBufferManagerInterface from "./interfaces/SaveBufferManagerInteface";
import type AudioProcessorInterface from "./interfaces/AudioProcessorInterface";
import type BufferManagerInterface from "./interfaces/BufferManagerInterface";
import type BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";


/**
 * Principal class used to manage audio processing: load an audio file or buffer,
 * manage filters/renderers (enable/disable, settings), add new filters/renderers,
 * download rendered audio, get rendered audio buffer
 */
@injectable()
export default class AudioEditor extends AbstractAudioElement implements AudioEditorInterface {

    /** The filter manager */
    private filterManager: FilterManagerInterface | undefined;

    /** The renderer manager */
    private rendererManager: RendererManagerInterface | undefined;

    /** The save buffer manager */
    private saveBufferManager: SaveBufferManagerInterface | undefined;

    /** The save buffer manager */
    private audioProcessor: AudioProcessorInterface | undefined;

    /** The save buffer manager */
    private bufferManager: BufferManagerInterface | undefined;

    /** The audio player */
    private bufferPlayer: BufferPlayerInterface | undefined;

    /** The audio buffer to be processed */
    private principalBuffer: AudioBuffer | null = null;

    /** The list of file selected by user */
    private fileList: FileList | null = null;

    /** The current index of the loaded file from file list */
    private fileListCurrIndex = 0;

    private loadingAudio = false;

    private renderingAudio = false;

    constructor(
        @inject(TYPES.FilterManager) filterManager: FilterManagerInterface,
        @inject(TYPES.RendererManager) rendererManager: RendererManagerInterface,
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface,
        @inject(TYPES.SaveBufferManager) saveBufferManager: SaveBufferManagerInterface,
        @inject(TYPES.AudioProcessor) audioProcessor: AudioProcessorInterface,
        @inject(TYPES.BufferManager) bufferManager: BufferManagerInterface,
        @inject(TYPES.BufferPlayer) player: BufferPlayerInterface
    ) {
        super();

        this.filterManager = filterManager;
        this.rendererManager = rendererManager;
        this.contextManager = contextManager;
        this.saveBufferManager = saveBufferManager;
        this.audioProcessor = audioProcessor;
        this.bufferManager = bufferManager;
        this.bufferPlayer = player;
    }

    @postConstruct()
    protected setup() {
        if (this.bufferPlayer) {
            // Callback called just before starting playing audio, when compatibility mode is enabled
            this.bufferPlayer.onBeforePlaying(async () => {
                if (this.bufferPlayer && this.bufferPlayer.compatibilityMode
                    && this.contextManager && this.contextManager.currentContext && this.audioProcessor) {
                    await this.audioProcessor.setupOutput(this.principalBuffer, this.contextManager.currentContext);
                }
            });
        } else {
            console.error("Buffer Player is not available!");
        }

        if (this.eventEmitter) {
            // Callback called when playing is finished
            this.eventEmitter.on(EventType.PLAYING_FINISHED, () => {
                if (this.bufferPlayer && this.bufferPlayer.loop) {
                    this.bufferPlayer.start();
                }
            });

            // Callback called when playing is finished and looping all audio
            this.eventEmitter.on(EventType.PLAYING_FINISHED_LOOP_ALL, async () => {
                if (this.bufferPlayer && this.bufferPlayer.loopAll && !this.renderingAudio && !this.loadingAudio) {
                    await this.loadNextAudio(true);
                    this.bufferPlayer.start();
                }
            });
        } else {
            console.error("Event Emitter is not available!");
        }
    }

    addFilters(...filters: AbstractAudioFilter[]) {
        if (this.filterManager) {
            this.filterManager.addFilters(...filters);
        }
    }

    addRenderers(...renderers: AbstractAudioRenderer[]) {
        if (this.rendererManager) {
            this.rendererManager.addRenderers(...renderers);
        }
    }

    get currentSampleRate(): number {
        if (this.contextManager) {
            return this.contextManager.currentSampleRate;
        }

        return 0;
    }

    get defaultDeviceSampleRate(): number {
        const tempContext = new AudioContext();
        const { sampleRate } = tempContext;

        if (tempContext) {
            tempContext.close();
        }

        return sampleRate;
    }

    async loadBufferFromFile(file: File) {
        this.loadingAudio = true;

        if (this.audioProcessor) {
            await this.audioProcessor.prepareContext(this.principalBuffer);
        }

        if (this.contextManager && this.contextManager.currentContext && this.bufferDecoderService && this.audioProcessor) {
            this.clearPrincipalBuffer();

            this.principalBuffer = await this.bufferDecoderService.decodeBufferFromFile(file);

            this.audioProcessor.initialRenderingDone = false;

            if (this.principalBuffer) {
                this.audioProcessor.sumInputBuffer = utils.sumAudioBuffer(this.principalBuffer);
            } else {
                this.loadingAudio = false;
                throw new Error("Error decoding audio file");
            }

            this.audioProcessor.resetAudioRenderingProgress();

            // If switching between a list of audio to one audio, reset the loop audio playing
            if (this.bufferPlayer && this.bufferPlayer.loopAll && this.totalFileList <= 1) {
                this.bufferPlayer.toggleLoop();
            }

            this.loadingAudio = false;
        } else {
            this.loadingAudio = false;
            throw new Error("Audio Context is not ready!");
        }
    }

    async loadFileList(fileList: FileList) {
        this.fileList = fileList;

        await this.loadBufferFromFileListIndex(0);
    }

    async loadBufferFromFileListIndex(index: number) {
        if (this.fileList) {
            this.fileListCurrIndex = index;

            const file = this.fileList.item(this.fileListCurrIndex);

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.LOADED_AUDIO_FILE_FROM_LIST, index);
            }

            if (file) {
                await this.loadBufferFromFile(file);
            }
        }
    }

    async loadPreviousAudio(forceInitialRendering?: boolean) {
        const currentIndex = this.currentIndexFileList;
        const maxIndex = this.totalFileList;
        const newIndex = currentIndex - 1;

        if (newIndex != currentIndex) {
            if (newIndex < 0) {
                await this.loadBufferFromFileListIndex(maxIndex - 1);
            } else {
                await this.loadBufferFromFileListIndex(newIndex);
            }

            await this.renderAudio(forceInitialRendering);
        }
    }

    async loadNextAudio(forceInitialRendering?: boolean) {
        const currentIndex = this.currentIndexFileList;
        const maxIndex = this.totalFileList;
        const newIndex = currentIndex + 1;

        if (newIndex != currentIndex) {
            if (newIndex >= maxIndex) {
                await this.loadBufferFromFileListIndex(0);
            } else {
                await this.loadBufferFromFileListIndex(newIndex);
            }

            await this.renderAudio(forceInitialRendering);
        }
    }

    getCurrentFileList(): Map<string, boolean> {
        if (this.fileList) {
            const mapFiles = new Map();

            for (let i = 0; i < this.fileList.length; i++) {
                const file = this.fileList.item(i);

                if (file) {
                    mapFiles.set(file.name, this.currentIndexFileList === i);
                }
            }

            return mapFiles;
        }

        return new Map();
    }

    get currentIndexFileList() {
        return this.fileListCurrIndex;
    }

    get totalFileList() {
        if (this.fileList) {
            return this.fileList.length;
        }

        return 0;
    }

    loadBuffer(audioBuffer: AudioBuffer) {
        this.principalBuffer = audioBuffer;

        if (this.audioProcessor) {
            this.audioProcessor.sumInputBuffer = utils.sumAudioBuffer(this.principalBuffer);
            this.audioProcessor.initialRenderingDone = false;
        }
    }

    getOutputBuffer() {
        if (this.audioProcessor) {
            return this.audioProcessor.renderedBuffer;
        }

        return null;
    }

    async renderAudio(forceInitialRendering?: boolean): Promise<boolean> {
        if (this.audioProcessor) {
            try {
                this.renderingAudio = true;

                if (this.eventEmitter) {
                    this.eventEmitter.emit(EventType.STARTED_RENDERING_AUDIO);
                }

                const result = await this.audioProcessor.renderAudio(this.principalBuffer, forceInitialRendering);

                if (this.eventEmitter) {
                    this.eventEmitter.emit(EventType.AUDIO_RENDERING_FINISHED);
                }

                this.renderingAudio = false;

                return result;
            } catch (e) {
                if (this.eventEmitter) {
                    this.eventEmitter.emit(EventType.AUDIO_RENDERING_FINISHED);
                    this.eventEmitter.emit(EventType.AUDIO_RENDERING_EXCEPTION_THROWN, e as Error);
                }

                this.renderingAudio = false;
            }
        }

        return false;
    }

    isAudioWorkletAvailable(): boolean {
        if (this.contextManager && this.contextManager.currentContext) {
            return utils.isAudioWorkletCompatible(this.contextManager.currentContext);
        }

        return false;
    }

    // Filters settings

    getFiltersState(): FilterState {
        if (this.filterManager && this.rendererManager) {
            return {
                ...this.filterManager.getFiltersState(),
                ...this.rendererManager.getRenderersState()
            };
        }

        return {};
    }

    getFiltersSettings(): Map<string, FilterSettings> {
        if (this.filterManager) {
            return this.filterManager.getFiltersSettings();
        }

        return new Map();
    }

    async reconnectNodesIfNeeded() {
        if (this.contextManager && this.bufferPlayer && this.bufferPlayer.compatibilityMode &&
            this.contextManager.currentContext && this.principalBuffer &&
            this.filterManager && this.filterManager.entrypointFilter) {
            await this.filterManager.connectNodes(this.contextManager.currentContext, this.principalBuffer, true, this.bufferPlayer.compatibilityMode);

            if (this.audioProcessor) {
                const speedAudio = this.filterManager.entrypointFilter.getSpeed();
                const audioDuration = utils.calculateAudioDuration(this.principalBuffer, this.filterManager, speedAudio);

                this.audioProcessor.updateAudioSpeedAndDuration(audioDuration);
            }
        }
    }

    enableFilter(filterId: string) {
        if (this.rendererManager) {
            this.rendererManager.enableRenderer(filterId);
        }

        if (this.filterManager) {
            this.filterManager.enableFilter(filterId);
            this.reconnectNodesIfNeeded();
        }
    }

    disableFilter(filterId: string) {
        if (this.rendererManager) {
            this.rendererManager.disableRenderer(filterId);
        }

        if (this.filterManager) {
            this.filterManager.disableFilter(filterId);
            this.reconnectNodesIfNeeded();
        }
    }

    toggleFilter(filterId: string) {
        if (this.rendererManager) {
            this.rendererManager.toggleRenderer(filterId);
        }

        if (this.filterManager) {
            this.filterManager.toggleFilter(filterId);
            this.reconnectNodesIfNeeded();
        }
    }

    async changeFilterSettings(filterId: string, settings: FilterSettings) {
        if (this.filterManager) {
            await this.filterManager.changeFilterSettings(filterId, settings);
            await this.reconnectNodesIfNeeded();
        }
    }

    async resetFilterSettings(filterId: string) {
        if (this.filterManager) {
            await this.filterManager.resetFilterSettings(filterId);
            await this.reconnectNodesIfNeeded();
        }
    }

    resetAllFiltersState() {
        if (this.rendererManager) {
            this.rendererManager.resetAllRenderersState();
        }

        if (this.filterManager) {
            this.filterManager.resetAllFiltersState();
            this.reconnectNodesIfNeeded();
        }
    }

    // Events and exit

    exit() {
        if (this.bufferPlayer) {
            this.bufferPlayer.stop();
            this.bufferPlayer.reset();
        }

        this.cancelAudioRendering();
        this.clearBuffers();

        this.fileList = null;
        this.fileListCurrIndex = 0;
    }

    private clearBuffers() {
        this.clearPrincipalBuffer();
        this.clearRenderedBuffer();
    }

    private clearPrincipalBuffer() {
        utils.clearAudioBuffer(this.principalBuffer);
        this.principalBuffer = null;
    }

    private clearRenderedBuffer() {
        if (this.audioProcessor) {
            this.audioProcessor.clearRenderedBuffer();
        }
    }

    cancelAudioRendering() {
        if (this.audioProcessor) {
            this.audioProcessor.cancelAudioRendering();
        }
    }

    on(event: string, callback: EventEmitterCallback) {
        if (this.eventEmitter) {
            this.eventEmitter.on(event, callback);
        }
    }

    off(event: string, callback: EventEmitterCallback) {
        if (this.eventEmitter) {
            this.eventEmitter.off(event, callback);
        }
    }

    saveBuffer(options?: SaveBufferOptions): Promise<boolean> {
        if (this.saveBufferManager && this.audioProcessor) {
            return this.saveBufferManager?.saveBuffer(this.audioProcessor.renderedBuffer, options);
        }

        return Promise.resolve(false);
    }

    set downloadingInitialData(state: boolean) {
        if (this.bufferManager) {
            this.bufferManager.downloadingInitialData = state;
        }
    }

    get downloadingInitialData(): boolean {
        if (this.bufferManager) {
            return this.bufferManager.downloadingInitialData;
        }

        return false;
    }
}
