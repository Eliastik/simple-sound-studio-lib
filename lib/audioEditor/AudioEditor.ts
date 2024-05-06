import AbstractAudioElement from "../filters/interfaces/AbstractAudioElement";
import AbstractAudioFilter from "../filters/interfaces/AbstractAudioFilter";
import AbstractAudioRenderer from "../filters/interfaces/AbstractAudioRenderer";
import utils from "../utils/Functions";
import BufferPlayer from "../bufferPlayer/BufferPlayer";
import EventEmitter from "../utils/EventEmitter";
import { EventType } from "../model/EventTypeEnum";
import Constants from "../model/Constants";
import utilFunctions from "../utils/Functions";
import { FilterSettings } from "../model/filtersSettings/FilterSettings";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import { FilterState } from "../model/FilterState";
import GenericConfigService from "../services/GenericConfigService";
import SaveBufferOptions from "../model/SaveBufferOptions";
import { TYPES } from "../inversify.types";
import { inject, injectable } from "inversify";
import AudioEditorInterface from "./interfaces/AudioEditorInterface";
import FilterManagerInterface from "./interfaces/FilterManagerInterface";
import RendererManagerInterface from "./interfaces/RendererManagerInterface";
import AudioContextManagerInterface from "./interfaces/AudioContextManagerInterface";
import SaveBufferManagerInterface from "./interfaces/SaveBufferManagerInteface";
import AudioProcessorInterface from "./interfaces/AudioProcessorInterface";
import BufferManagerInterface from "./interfaces/BufferManagerInterface";
import type BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";
import type EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import * as ConfigService from "@/services/interfaces/ConfigService";

@injectable()
export default class AudioEditor extends AbstractAudioElement implements AudioEditorInterface {

    /** The filter manager */
    @inject(TYPES.FilterManager)
    private filterManager: FilterManagerInterface | undefined;

    /** The renderer manager */
    @inject(TYPES.RendererManager)
    private rendererManager: RendererManagerInterface | undefined;

    /** The context manager */
    @inject(TYPES.AudioContextManager)
    private contextManager: AudioContextManagerInterface | undefined;

    /** The save buffer manager */
    @inject(TYPES.SaveBufferManager)
    private saveBufferManager: SaveBufferManagerInterface | undefined;

    /** The save buffer manager */
    @inject(TYPES.AudioProcessor)
    private audioProcessor: AudioProcessorInterface | undefined;

    /** The save buffer manager */
    @inject(TYPES.BufferManager)
    private bufferManager: BufferManagerInterface | undefined;

    /** The audio player */
    @inject(TYPES.BufferPlayer)
    private bufferPlayer: BufferPlayerInterface | undefined;

    /** The audio buffer to be processed */
    private principalBuffer: AudioBuffer | null = null;

    constructor(
        @inject(TYPES.BufferPlayer) player?: BufferPlayerInterface,
        @inject(TYPES.EventEmitter) eventEmitter?: EventEmitterInterface,
        @inject(TYPES.ConfigService) configService?: ConfigService.ConfigService) {
        super();

        this.eventEmitter = eventEmitter || new EventEmitter();
        this.configService = configService || new GenericConfigService();
        this.bufferPlayer = player || new BufferPlayer(this.contextManager, this.eventEmitter);

        // Callback called just before starting audio player
        this.setup();
    }

    private setup() {
        if (this.bufferPlayer) {
            // Callback called just before starting playing audio, when compatibility mode is enabled
            this.bufferPlayer.onBeforePlaying(async () => {
                if (this.bufferPlayer && this.bufferPlayer.compatibilityMode
                    && this.contextManager && this.contextManager.currentContext && this.audioProcessor) {
                    await this.audioProcessor.setupOutput(this.principalBuffer, this.contextManager.currentContext);
                }
            });

            // Callback called when playing is finished
            this.bufferPlayer.on(EventType.PLAYING_FINISHED, () => {
                if (this.bufferPlayer && this.bufferPlayer.loop) {
                    this.bufferPlayer.start();
                }
            });
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
        let sampleRate = 0;

        if (tempContext) {
            sampleRate = tempContext.sampleRate;
            tempContext.close();
        }

        return sampleRate;
    }

    async loadBufferFromFile(file: File) {
        this.principalBuffer = null;

        if (this.audioProcessor) {
            await this.audioProcessor.prepareContext(this.principalBuffer);
        }

        if (this.contextManager && this.contextManager.currentContext && this.bufferDecoderService && this.audioProcessor) {
            this.principalBuffer = await this.bufferDecoderService.decodeBufferFromFile(file);
            this.audioProcessor.initialRenderingDone = false;

            if (this.principalBuffer) {
                this.audioProcessor.sumInputBuffer = utils.sumAudioBuffer(this.principalBuffer);
            } else {
                throw new Error("Error decoding audio file");
            }

            utilFunctions.resetAudioRenderingProgress(this.eventEmitter);
        } else {
            throw new Error("Audio Context is not ready!");
        }
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

    async renderAudio(): Promise<boolean> {
        if (this.audioProcessor) {
            return await this.audioProcessor.renderAudio(this.principalBuffer);
        }

        return false;
    }

    isAudioWorkletAvailable(): boolean {
        if (this.contextManager && this.contextManager.currentContext) {
            return utilFunctions.isAudioWorkletCompatible(this.contextManager.currentContext);
        }

        return false;
    }

    /** Filters settings */

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

            const speedAudio = this.filterManager.entrypointFilter.getSpeed();
            this.bufferPlayer.speedAudio = speedAudio;
            this.bufferPlayer.duration = utilFunctions.calculateAudioDuration(this.principalBuffer, this.filterManager, speedAudio) * speedAudio;
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

    /** Events and exit */

    exit() {
        if (this.bufferPlayer) {
            this.bufferPlayer.stop();
            this.bufferPlayer.reset();
        }

        this.cancelAudioRendering();
        this.principalBuffer = null;
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

    async saveBuffer(options?: SaveBufferOptions): Promise<boolean> {
        if (this.saveBufferManager && this.audioProcessor) {
            return await this.saveBufferManager?.saveBuffer(this.audioProcessor.renderedBuffer, options);
        }

        return false;
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

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.AUDIO_EDITOR;
    }
}
