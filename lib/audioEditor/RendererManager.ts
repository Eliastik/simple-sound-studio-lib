import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import ReturnAudioRenderer from "../filters/ReturnAudioRenderer";
import AbstractAudioRenderer from "@/filters/interfaces/AbstractAudioRenderer";
import { FilterState } from "@/model/FilterState";
import Constants from "@/model/Constants";
import RendererManagerInterface from "./interfaces/RendererManagerInterface";
import { inject, injectable } from "inversify";
import { TYPES } from "@/inversify.types";
import GenericConfigService from "@/services/GenericConfigService";
import type { ConfigService } from "@/services/interfaces/ConfigService";
import type BufferFetcherServiceInterface from "@/services/interfaces/BufferFetcherServiceInterface";
import type BufferDecoderServiceInterface from "@/services/interfaces/BufferDecoderServiceInterface";

@injectable()
export default class RendererManager extends AbstractAudioElement implements RendererManagerInterface {

    /** A list of renderers */
    private renderers: AbstractAudioRenderer[] = [];
    /** The current event emitter */

    constructor(
        @inject(TYPES.BufferFetcherService) bufferFetcherService: BufferFetcherServiceInterface,
        @inject(TYPES.BufferDecoderService) bufferDecoderService: BufferDecoderServiceInterface,
        @inject(TYPES.ConfigService) configService: ConfigService) {
        super();
        this.configService = configService || new GenericConfigService();
        this.bufferFetcherService = bufferFetcherService;
        this.bufferDecoderService = bufferDecoderService;

        this.setupDefaultRenderers();
    }

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

    getRenderersState(): FilterState {
        const state: FilterState = {};

        this.renderers.forEach(filter => {
            state[filter.id] = filter.isEnabled();
        });

        return state;
    }

    toggleRenderer(rendererId: string) {
        const renderer = this.renderers.find(f => f.id === rendererId);

        if (renderer) {
            renderer.toggle();
        }
    }

    resetAllRenderersState() {
        this.renderers.forEach(element => {
            if (element.isDefaultEnabled()) {
                element.enable();
            } else {
                element.disable();
            }
        });
    }

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
