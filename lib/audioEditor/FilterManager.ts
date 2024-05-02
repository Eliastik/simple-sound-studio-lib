import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import BassBoosterFilter from "../filters/BassBoosterFilter";
import BitCrusherFilter from "../filters/BitCrusherFilter";
import EchoFilter from "../filters/EchoFilter";
import HighPassFilter from "../filters/HighPassFilter";
import LimiterFilter from "../filters/LimiterFilter";
import LowPassFilter from "../filters/LowPassFilter";
import ReturnAudioRenderer from "../filters/ReturnAudioRenderer";
import ReverbFilter from "../filters/ReverbFilter";
import SoundtouchWrapperFilter from "../filters/SountouchWrapperFilter";
import TelephonizerFilter from "../filters/TelephonizerFilter";
import VocoderFilter from "../filters/VocoderFilter";
import PassThroughFilter from "../filters/PassThroughFilter";
import AbstractAudioFilter from "@/filters/interfaces/AbstractAudioFilter";
import AudioFilterEntrypointInterface from "@/filters/interfaces/AudioFilterEntrypointInterface";
import AbstractAudioRenderer from "@/filters/interfaces/AbstractAudioRenderer";
import { AudioFilterNodes } from "@/model/AudioNodes";
import AbstractAudioFilterWorklet from "@/filters/interfaces/AbstractAudioFilterWorklet";
import EventEmitter from "@/utils/EventEmitter";
import BufferPlayer from "@/BufferPlayer";
import { FilterState } from "@/model/FilterState";
import { FilterSettings } from "@/model/filtersSettings/FilterSettings";
import Constants from "@/model/Constants";
import BufferFetcherService from "@/services/BufferFetcherService";
import BufferDecoderService from "@/services/BufferDecoderService";
import { ConfigService } from "@/services/ConfigService";
import GenericConfigService from "@/utils/GenericConfigService";

export default class FilterManager extends AbstractAudioElement {

    /** A list of filters */
    private filters: AbstractAudioFilter[] = [];
    /** A list of renderers */
    private renderers: AbstractAudioRenderer[] = [];
    /** The entrypoint filter */
    private _entryPointFilter: (AbstractAudioFilter & AudioFilterEntrypointInterface) | null = null;
    /** The current connected nodes */
    private _currentNodes: AudioFilterNodes | null = null;
    /** The current event emitter */
    private eventEmitter: EventEmitter | undefined;

    constructor(eventEmitter: EventEmitter | null, bufferFetcherService: BufferFetcherService, bufferDecoderService: BufferDecoderService, configService: ConfigService) {
        super();
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.configService = configService || new GenericConfigService();
        this.bufferFetcherService = bufferFetcherService;
        this.bufferDecoderService = bufferDecoderService;

        this.setupDefaultFilters();
        this.setupDefaultRenderers();
    }

    /**
     * Add a new custom filter for this audio editor
     * @param filters One or more AbstractAudioFilter
     */
    addFilters(...filters: AbstractAudioFilter[]) {
        for (const filter of filters) {
            filter.initializeDefaultSettings();
            filter.bufferFetcherService = this.bufferFetcherService;
            filter.bufferDecoderService = this.bufferDecoderService;
            filter.configService = this.configService;
            filter.eventEmitter = this.eventEmitter;
        }

        this.filters.push(...filters);
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

    /** Setup all audio filters */
    private setupDefaultFilters() {
        const bassBooster = new BassBoosterFilter(200, 15, 200, -2);
        const bitCrusher = new BitCrusherFilter(16, 0.9);
        const echo = new EchoFilter(0.2, 0.75);
        const highPass = new HighPassFilter(3500);
        const lowPass = new LowPassFilter(3500);
        const reverb = new ReverbFilter();
        const soundtouchWrapper = new SoundtouchWrapperFilter();
        const limiterFilter = new LimiterFilter(0, 0, 0, 3, -0.05, 0.1);
        const telephonizerFilter = new TelephonizerFilter();
        const vocoder = new VocoderFilter();
        const passthrough = new PassThroughFilter();

        this._entryPointFilter = soundtouchWrapper;
        this.addFilters(bassBooster, bitCrusher, echo, highPass, lowPass, reverb, limiterFilter, telephonizerFilter, soundtouchWrapper, vocoder, passthrough);
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
    getFiltersState(): FilterState {
        const state: FilterState = {};

        [...this.filters, ...this.renderers].forEach(filter => {
            state[filter.id] = filter.isEnabled();
        });

        return state;
    }

    /**
     * Get the settings of all filters/renderers
     * @returns 
     */
    getFiltersSettings(): Map<string, FilterSettings> {
        const settings = new Map<string, FilterSettings>();

        for (const filter of this.filters) {
            settings.set(filter.id, filter.getSettings());
        }

        return settings;
    }

    /**
     * Toggle enabled/disabled state for a filter/renderer
     * @param filterId The filter/renderer ID
     */
    toggleFilter(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);
        const renderer = this.renderers.find(f => f.id === filterId);

        if (filter) {
            filter.toggle();
        }

        if (renderer) {
            renderer.toggle();
        }
    }

    /**
     * Change a filter/renderer setting
     * @param filterId Filter ID
     * @param settings Filter setting (key/value)
     */
    async changeFilterSettings(filterId: string, settings: FilterSettings) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            for (const key of Object.keys(settings)) {
                await filter.setSetting(key, settings[key]);
            }
        }
    }

    /**
     * Reset the settings of a filter/renderer
     * @param filterId Id of the filter/renderer
     */
    async resetFilterSettings(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            await filter.resetSettings();
        }
    }

    /**
     * Reset all filters/renderers state (enabled/disabled) based on their default states
     */
    resetAllFiltersState() {
        [...this.filters, ...this.renderers].forEach(element => {
            if (element.isDefaultEnabled()) {
                element.enable();
            } else {
                element.disable();
            }
        });
    }

    /**
     * Connect the Audio API nodes of the enabled filters
     * @param context The Audio Context
     * @param buffer  The Audio Buffer
     * @param keepCurrentInputOutput Keep current first input/output nodes?
     */
    async connectNodes(context: BaseAudioContext, buffer: AudioBuffer, keepCurrentInputOutput: boolean, isCompatibilityMode: boolean) {
        if (!this._entryPointFilter) {
            return;
        }

        let entrypointNode: AudioNode | null = null;

        if (keepCurrentInputOutput && this._currentNodes) {
            entrypointNode = this._currentNodes.input;
        } else {
            const entrypointNodes = await this._entryPointFilter.getEntrypointNode(context, buffer, !isCompatibilityMode);
            entrypointNode = entrypointNodes.input;
        }

        const intermediateNodes: AudioFilterNodes[] = [];
        let previousNode: AudioNode | undefined = entrypointNode;

        this.disconnectOldNodes(keepCurrentInputOutput);

        // Sort by filter order, then remove the disabled filter (but always keep the last/output filter)
        const filters = this.filters
            .sort((a, b) => a.order - b.order)
            .filter((filter, index) => filter !== this._entryPointFilter && (filter.isEnabled() || index >= this.filters.length - 1));

        for (const filter of filters) {
            const node = filter.getNode(context);

            if (previousNode) {
                previousNode.connect(node.input);
            }

            previousNode = node.output;
            intermediateNodes.push(node);
        }

        if (this._entryPointFilter) {
            this._entryPointFilter.updateState();
        }

        this._currentNodes = {
            input: entrypointNode!,
            output: previousNode!,
            intermediateNodes: intermediateNodes
                .filter(n => n.input != previousNode && n.output != previousNode &&
                    n.input != entrypointNode && n.output != entrypointNode)
        };
    }

    /**
     * Disconnect old audio nodes
     * @param keepCurrentOutput Keeps current output nodes?
     */
    disconnectOldNodes(keepCurrentOutput: boolean) {
        if (this._currentNodes) {
            this._currentNodes.input.disconnect();

            if (!keepCurrentOutput) {
                this._currentNodes.output.disconnect();
            }

            if (this._currentNodes.intermediateNodes) {
                for (const intermediate of this._currentNodes.intermediateNodes) {
                    intermediate.input.disconnect();
                    intermediate.output.disconnect();
                }
            }
        }
    }

    /** Initialize worklets filters */
    async initializeWorklets(context: BaseAudioContext) {
        for (const filter of this.filters) {
            if (filter.isWorklet()) {
                await (filter as AbstractAudioFilterWorklet<object>).initializeWorklet(context);
            }
        }
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

    setupPlayerSpeed(bufferPlayer: BufferPlayer) {
        if (this._entryPointFilter) {
            const speedAudio = this._entryPointFilter.getSpeed();
            bufferPlayer.speedAudio = speedAudio;
        }
    }

    getAddingTime() {
        let duration = 0;
        
        for (const filter of this.filters) {
            if (filter.isEnabled()) {
                duration += filter.getAddingTime();
            }
        }

        return duration;
    }

    /**
     * Setup the passthrough filter to count audio rendering progress
     * @param durationAudio Audio duration - number
     */
    setupPasstroughFilter(durationAudio: number, currentContext: AudioContext | null) {
        const passthroughFilter = this.filters.find(f => f.id === Constants.FILTERS_NAMES.PASSTHROUGH);

        if (passthroughFilter && currentContext) {
            (passthroughFilter as PassThroughFilter).totalSamples = durationAudio * currentContext.sampleRate;
        }
    }

    get entrypointFilter() {
        return this._entryPointFilter;
    }

    get currentNodes() {
        return this._currentNodes;
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return "FilterManager";
    }
}