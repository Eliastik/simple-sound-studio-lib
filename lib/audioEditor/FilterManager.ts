import AbstractAudioElement from "@/interfaces/AbstractAudioElement";
import AbstractAudioFilter from "@/filters/interfaces/AbstractAudioFilter";
import AudioFilterEntrypointInterface from "@/filters/interfaces/AudioFilterEntrypointInterface";
import { AudioFilterNodes } from "@/model/AudioNodes";
import AbstractAudioFilterWorklet from "@/filters/interfaces/AbstractAudioFilterWorklet";
import { FilterState } from "@/model/FilterState";
import { FilterSettings } from "@/model/filtersSettings/FilterSettings";
import FilterManagerInterface from "./interfaces/FilterManagerInterface";
import { inject, injectable, multiInject, postConstruct } from "inversify";
import { TYPES } from "@/inversify.types";

@injectable()
export default class FilterManager extends AbstractAudioElement implements FilterManagerInterface {

    /** A list of filters */
    private filters: AbstractAudioFilter[] = [];

    /** The entrypoint filter */
    private _entryPointFilter: (AbstractAudioFilter & AudioFilterEntrypointInterface) | null = null;

    /** The current connected nodes */
    private _currentNodes: AudioFilterNodes | null = null;

    constructor(
        @multiInject(TYPES.Filters) filters: AbstractAudioFilter[],
        @inject(TYPES.EntryPointFilter) entryPointFilter: (AbstractAudioFilter & AudioFilterEntrypointInterface) | null
    ) {
        super();

        this.filters = filters;
        this._entryPointFilter = entryPointFilter;
    }

    @postConstruct()
    setup() {
        for (const filter of this.filters) {
            filter.initializeDefaultSettings();
        }
    }

    addFilters(...filters: AbstractAudioFilter[]) {
        for (const filter of filters) {
            filter.initializeDefaultSettings();
            filter.injectDependencies(this.bufferFetcherService, this.bufferDecoderService, this.configService, this.eventEmitter, this.contextManager);
        }

        this.filters.push(...filters);
    }

    getFiltersState(): FilterState {
        const state: FilterState = {};

        this.filters.forEach(filter => {
            state[filter.id] = filter.isEnabled();
        });

        return state;
    }

    getFiltersSettings(): Map<string, FilterSettings> {
        const settings = new Map<string, FilterSettings>();

        for (const filter of this.filters) {
            settings.set(filter.id, filter.getSettings());
        }

        return settings;
    }

    enableFilter(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            filter.enable();
        }
    }

    disableFilter(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            filter.disable();
        }
    }

    toggleFilter(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            filter.toggle();
        }
    }

    async changeFilterSettings(filterId: string, settings: FilterSettings) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            for (const key of Object.keys(settings)) {
                await filter.setSetting(key, settings[key]);
            }
        }
    }

    async resetFilterSettings(filterId: string) {
        const filter = this.filters.find(f => f.id === filterId);

        if (filter) {
            await filter.resetSettings();
        }
    }

    resetAllFiltersState() {
        this.filters.forEach(element => {
            if (element.isDefaultEnabled()) {
                element.enable();
            } else {
                element.disable();
            }
        });
    }

    async connectNodes(context: BaseAudioContext, buffer: AudioBuffer, keepCurrentInputOutput: boolean, isCompatibilityMode: boolean): Promise<void> {
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

    disconnectOldNodes(keepCurrentOutput: boolean) {
        if (this._currentNodes) {
            this._currentNodes.input.disconnect();

            if (!keepCurrentOutput) {
                this._currentNodes.output.disconnect();
            }

            this.disconnecteIntermediateNodes();
        }
    }

    private disconnecteIntermediateNodes() {
        if (this._currentNodes && this._currentNodes.intermediateNodes) {
            for (const intermediate of this._currentNodes.intermediateNodes) {
                intermediate.input.disconnect();
                intermediate.output.disconnect();
            }

            this._currentNodes.intermediateNodes = undefined;
        }
    }

    async initializeWorklets(context: BaseAudioContext) {
        for (const filter of this.filters) {
            if (filter.isWorklet()) {
                this.clearWorklets();
                await (filter as AbstractAudioFilterWorklet<object>).initializeWorklet(context);
            }
        }
    }

    clearWorklets() {
        for (const filter of this.filters) {
            if (filter.isWorklet()) {
                (filter as AbstractAudioFilterWorklet<object>).stop();
            }
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

    setupTotalSamples(durationAudio: number, currentContext: AudioContext | null) {
        if (currentContext) {
            const totalSamples = durationAudio * currentContext.sampleRate;

            for (const filter of this.filters) {
                filter.totalSamples = totalSamples;
            }
        }
    }

    async resetFilterBuffers() {
        for (const filter of this.filters) {
            await filter.bufferFetcherReseted();
        }
    }

    get entrypointFilter() {
        return this._entryPointFilter;
    }

    get currentNodes() {
        return this._currentNodes;
    }
}
