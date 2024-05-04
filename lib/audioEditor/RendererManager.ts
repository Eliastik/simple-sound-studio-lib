import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import ReturnAudioRenderer from "../filters/ReturnAudioRenderer";
import AbstractAudioRenderer from "@/filters/interfaces/AbstractAudioRenderer";
import EventEmitter from "@/utils/EventEmitter";
import { FilterState } from "@/model/FilterState";
import BufferFetcherService from "@/services/BufferFetcherService";
import BufferDecoderService from "@/services/BufferDecoderService";
import { ConfigService } from "@/services/ConfigService";
import GenericConfigService from "@/utils/GenericConfigService";
import Constants from "@/model/Constants";

export default class RendererManager extends AbstractAudioElement {

    /** A list of renderers */
    private renderers: AbstractAudioRenderer[] = [];
    /** The current event emitter */
    private eventEmitter: EventEmitter | undefined;

    constructor(eventEmitter: EventEmitter | null, bufferFetcherService: BufferFetcherService, bufferDecoderService: BufferDecoderService, configService: ConfigService) {
        super();
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.configService = configService || new GenericConfigService();
        this.bufferFetcherService = bufferFetcherService;
        this.bufferDecoderService = bufferDecoderService;

        this.setupDefaultRenderers();
    }

    /**
     * Add a new custom renderer for this audio editor
     * @param renderers One or more AbstractAudioRenderer
     */
    addRenderers(...renderers: AbstractAudioRenderer[]) {
        for (const renderer of renderers) {
            renderer.bufferFetcherService = this.bufferFetcherService;
            renderer.bufferDecoderService = this.bufferDecoderService;
            renderer.configService = this.configService;
        }

        this.renderers.push(...renderers);
    }

    /** Setup the renderers */
    private setupDefaultRenderers() {
        const returnAudio = new ReturnAudioRenderer();
        this.addRenderers(returnAudio);
    }

    /**
     * Get enabled/disabled state of all filters/renderers
     * @returns The filters state (enabled/disabled)
     */
    getRenderersState(): FilterState {
        const state: FilterState = {};

        this.renderers.forEach(filter => {
            state[filter.id] = filter.isEnabled();
        });

        return state;
    }

    /**
     * Toggle enabled/disabled state for a renderer
     * @param filterId The renderer ID
     */
    toggleRenderer(rendererId: string) {
        const renderer = this.renderers.find(f => f.id === rendererId);

        if (renderer) {
            renderer.toggle();
        }
    }

    /**
     * Reset all renderers state (enabled/disabled) based on their default states
     */
    resetAllRenderersState() {
        this.renderers.forEach(element => {
            if (element.isDefaultEnabled()) {
                element.enable();
            } else {
                element.disable();
            }
        });
    }
    
    /**
     * Execute audio renderers then returns audio buffer rendered
     * @param buffer The buffer to process
     * @param outputContext The output context
     * @returns Audio buffer rendered
     */
    async executeAudioRenderers(buffer: AudioBuffer, outputContext: AudioContext | OfflineAudioContext) {
        let currentBuffer = buffer;

        for (const renderer of this.renderers.sort((a, b) => a.order - b.order)) {
            if (renderer.isEnabled()) {
                currentBuffer = await renderer.renderAudio(outputContext, currentBuffer);
            }
        }

        return currentBuffer;
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.RENDERER_MANAGER;
    }
}
