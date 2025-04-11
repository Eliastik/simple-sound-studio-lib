import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import FilterManager from "../lib/audioEditor/FilterManager";
import LimiterFilter from "../lib/filters/LimiterFilter";
import SountouchWrapperFilter from "../lib/filters/SountouchWrapperFilter";
import BassBoosterFilter from "../lib/filters/BassBoosterFilter";
import { MockAudioContext, createMockAudioContext } from "./AudioContextMock";
import { MockAudioFilter, MockEntrypointFilter, MockAudioFilterWorklet } from "./MockAudioFilter";
import { MockAudioBuffer } from "./AudioBufferMock";
import { AudioFilterNodes } from "../lib/model/AudioNodes";

describe("FilterManager tests", () => {
    test("Initialize filter manager with 1 filter", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);
        filterManager.setup();

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true
        });
    });

    test("Add filters should inject dependencies", async () => {
        const filterManager = new FilterManager([], null);
        filterManager.setup();

        const limiterFilter = new LimiterFilter();
        const soundtouch = new SountouchWrapperFilter();
        
        jest.spyOn(limiterFilter, "injectDependencies");
        jest.spyOn(soundtouch, "injectDependencies");

        filterManager.addFilters(limiterFilter, soundtouch);

        expect(limiterFilter.injectDependencies).toHaveBeenCalled();
        expect(soundtouch.injectDependencies).toHaveBeenCalled();
    });

    test("Disable one filter", () => {
        const filterManager = new FilterManager([new SountouchWrapperFilter(), new LimiterFilter()], null);
        filterManager.setup();

        filterManager.toggleFilter("limiter");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": false,
            "soundtouch": true
        });
    });

    test("Disable inexistent filter", () => {
        const filterManager = new FilterManager([new SountouchWrapperFilter(), new LimiterFilter()], null);
        filterManager.setup();

        filterManager.toggleFilter("fake");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true,
            "soundtouch": true
        });
    });

    test("Reset one filter state", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);
        filterManager.setup();

        filterManager.toggleFilter("limiter");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": false
        });

        filterManager.resetAllFiltersState();

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true
        });
    });

    test("Reset one filter state - not default enabled", () => {
        const filterManager = new FilterManager([new BassBoosterFilter()], null);
        filterManager.setup();

        filterManager.toggleFilter("bassboost");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "bassboost": true
        });

        filterManager.resetAllFiltersState();

        expect(filterManager.getFiltersState()).toStrictEqual({
            "bassboost": false
        });
    });

    test("Change one filter settings", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);
        filterManager.setup();

        expect(filterManager.getFiltersSettings().get("limiter")).toMatchObject({
            "attackTime": 0
        });

        filterManager.changeFilterSettings("limiter", {
            "attackTime": 5
        });

        expect(filterManager.getFiltersSettings().get("limiter")).toMatchObject({
            "attackTime": 5
        });
    });

    test("Reset one filter settings", async () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);
        filterManager.setup();

        expect(filterManager.getFiltersSettings().get("limiter")).toMatchObject({
            "attackTime": 0
        });

        await filterManager.changeFilterSettings("limiter", {
            "attackTime": 5
        });

        await filterManager.resetFilterSettings("limiter");

        expect(filterManager.getFiltersSettings().get("limiter")).toMatchObject({
            "attackTime": 0
        });
    });

    test("Connect nodes without entry point filter", async () => {
        const filterManager = new FilterManager([], null);
        filterManager.setup();
        const context = createMockAudioContext();
        const buffer = context.createBuffer(1, 44100, 44100);
        await expect(filterManager.connectNodes(context, buffer, false, false)).resolves.toBeUndefined();
    });

    test("Connect nodes should connect audio nodes of filters properly", async () => {
        const filter1 = new MockEntrypointFilter(1, "filter1", true);
        const filter2 = new MockAudioFilter(2, "filter2", true);
        const filter3 = new MockAudioFilter(3, "filter3", true);
    
        const filterManager = new FilterManager([filter1, filter2, filter3], filter1);
        filterManager.setup();
    
        jest.spyOn(filter1, "getEntrypointNode");
        jest.spyOn(filter1, "updateState");
        jest.spyOn(filter2, "getNode");
        jest.spyOn(filter3, "getNode");

        const mockAudioContext = createMockAudioContext();
        const mockAudioBuffer = new MockAudioBuffer(2, 10000, 44100);
    
        await filterManager.connectNodes(mockAudioContext, mockAudioBuffer, false, false);
    
        expect(filter1.getEntrypointNode).toHaveBeenCalledWith(mockAudioContext, mockAudioBuffer, true);
        expect(filter1.updateState).toHaveBeenCalled();
        expect(filter2.getNode).toHaveBeenCalledWith(mockAudioContext);
        expect(filter3.getNode).toHaveBeenCalledWith(mockAudioContext);
    
        const currentNodes = (filterManager as any).currentNodes as AudioFilterNodes;

        expect(currentNodes.input).toBe(filter1.node.input);
        expect(currentNodes.output).toBe(filter3.node.output);
        expect(currentNodes.intermediateNodes![0].input).toBe(filter2.node.input);
        expect(currentNodes.intermediateNodes![0].output).toBe(filter2.node.output);
    });

    test("Connect nodes should connect audio nodes of filters properly - 2", async () => {
        const filter1 = new MockEntrypointFilter(1, "filter1", true);
        const filter2 = new MockAudioFilter(5, "filter2", true); // Last
        const filter3 = new MockAudioFilter(3, "filter3", true);
    
        const filterManager = new FilterManager([filter1, filter2, filter3], filter1);
        filterManager.setup();
    
        jest.spyOn(filter1, "getEntrypointNode");
        jest.spyOn(filter2, "getNode");
        jest.spyOn(filter3, "getNode");

        const mockAudioContext = createMockAudioContext();
        const mockAudioBuffer = new MockAudioBuffer(2, 10000, 44100);
    
        await filterManager.connectNodes(mockAudioContext, mockAudioBuffer, false, false);
    
        const currentNodes = (filterManager as any).currentNodes as AudioFilterNodes;

        expect(currentNodes.input).toBe(filter1.node.input);
        expect(currentNodes.output).toBe(filter2.node.output);
        expect(currentNodes.intermediateNodes![0].input).toBe(filter3.node.input);
        expect(currentNodes.intermediateNodes![0].output).toBe(filter3.node.output);
    });

    test("Connect nodes should connect audio nodes of filters properly - With disabled filters", async () => {
        const filter1 = new MockEntrypointFilter(1, "filter1", true);
        const filter2 = new MockAudioFilter(5, "filter2", true); // Last
        const filter3 = new MockAudioFilter(3, "filter3", false);
    
        const filterManager = new FilterManager([filter1, filter2, filter3], filter1);
        filterManager.setup();
    
        jest.spyOn(filter1, "getEntrypointNode");
        jest.spyOn(filter2, "getNode");
        jest.spyOn(filter3, "getNode");

        const mockAudioContext = createMockAudioContext();
        const mockAudioBuffer = new MockAudioBuffer(2, 10000, 44100);
    
        await filterManager.connectNodes(mockAudioContext, mockAudioBuffer, false, false);
    
        const currentNodes = (filterManager as any).currentNodes as AudioFilterNodes;

        expect(currentNodes.input).toBe(filter1.node.input);
        expect(currentNodes.output).toBe(filter2.node.output);
        expect(currentNodes.intermediateNodes?.length).toBe(0);
    });

    test("Keep previous nodes", async () => {
        const filter1 = new MockEntrypointFilter(1, "filter1", true);
        const filter2 = new MockAudioFilter(5, "filter2", true); // Last
        const filter3 = new MockAudioFilter(3, "filter3", true);
    
        const filterManager = new FilterManager([filter1, filter2, filter3], filter1);
        filterManager.setup();
    
        jest.spyOn(filter1, "getEntrypointNode");
        jest.spyOn(filter2, "getNode");
        jest.spyOn(filter3, "getNode");
        jest.spyOn(filterManager, "disconnectOldNodes");

        const mockAudioContext = createMockAudioContext();
        const mockAudioBuffer = new MockAudioBuffer(2, 10000, 44100);
    
        await filterManager.connectNodes(mockAudioContext, mockAudioBuffer, false, false);

        const currentNodes1 = (filterManager as any).currentNodes as AudioFilterNodes;

        const oldInput = currentNodes1.input;

        await filterManager.connectNodes(mockAudioContext, mockAudioBuffer, true, false);

        expect(oldInput).toBe(filter1.node.input);
        expect(filterManager.disconnectOldNodes).toHaveBeenCalledWith(true);
    });

    test("Get adding time", async () => {
        // Création des filtres de test
        const filter1 = new MockEntrypointFilter(1, "filter1", true, 3);
        const filter2 = new MockAudioFilter(2, "filter2", true, 10);
        const filter3 = new MockAudioFilter(3, "filter3", true, 9);
    
        const filterManager = new FilterManager([filter1, filter2, filter3], filter1);
        filterManager.setup();
    
        expect(filterManager.getAddingTime()).toBe(3 + 10 + 9);
    });

    test("Get adding time - 2", async () => {
        // Création des filtres de test
        const filter1 = new MockEntrypointFilter(1, "filter1", true, 3);
        const filter2 = new MockAudioFilter(2, "filter2", false, 10);
        const filter3 = new MockAudioFilter(3, "filter3", true, 9);
    
        const filterManager = new FilterManager([filter1, filter2, filter3], filter1);
        filterManager.setup();
    
        expect(filterManager.getAddingTime()).toBe(3 + 9);
    });

    test("Initialize worklets", async () => {
        // Création des filtres de test
        const filter1 = new MockEntrypointFilter(1, "filter1", true, 3);
        const filter2 = new MockAudioFilter(2, "filter2", false, 10);
        const filter3 = new MockAudioFilter(3, "filter3", true, 9);
        const filter4 = new MockAudioFilterWorklet(3, "filter3", true, 9);

        jest.spyOn(filter4, "initializeWorklet");
    
        const filterManager = new FilterManager([filter1, filter2, filter3, filter4], filter1);
        filterManager.setup();

        const context = new MockAudioContext() as any;
    
        try {
            await filterManager.initializeWorklets(context);
        } catch(e) {}

        expect(filter4.initializeWorklet).toHaveBeenCalledWith(context);
    });
});
