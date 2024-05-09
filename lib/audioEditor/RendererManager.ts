import { injectable, multiInject } from "inversify";
import { TYPES } from "@/inversify.types";
import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import AbstractAudioRenderer from "@/filters/interfaces/AbstractAudioRenderer";
import { FilterState } from "@/model/FilterState";
import Constants from "@/model/Constants";
import RendererManagerInterface from "./interfaces/RendererManagerInterface";

@injectable()
export default class RendererManager extends AbstractAudioElement implements RendererManagerInterface {

    /** A list of renderers */
    private renderers: AbstractAudioRenderer[] = [];

    constructor(
        @multiInject(TYPES.Renderers) renderers: AbstractAudioRenderer[] = []) {
        super();

        this.renderers = renderers;
    }

    addRenderers(...renderers: AbstractAudioRenderer[]) {
        for (const renderer of renderers) {
            renderer.injectDependencies(this.bufferFetcherService, this.bufferDecoderService, this.configService, this.eventEmitter);
        }

        this.renderers.push(...renderers);
    }

    getRenderersState(): FilterState {
        const state: FilterState = {};

        this.renderers.forEach(renderer => {
            state[renderer.id] = renderer.isEnabled();
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
