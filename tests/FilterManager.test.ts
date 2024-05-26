import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import FilterManager from "../lib/audioEditor/FilterManager";
import LimiterFilter from "../lib/filters/LimiterFilter";
import SountouchWrapperFilter from "../lib/filters/SountouchWrapperFilter";
import BassBoosterFilter from "../lib/filters/BassBoosterFilter";
import { createMockAudioContext } from "./AudioContextMock";

describe("FilterManager tests", () => {
    test("Initialize filter manager with 1 filter", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true
        });
    });

    test("Add filters should inject dependencies", async () => {
        const filterManager = new FilterManager([], null);

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

        filterManager.toggleFilter("limiter");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": false,
            "soundtouch": true
        });
    });

    test("Disable inexistent filter", () => {
        const filterManager = new FilterManager([new SountouchWrapperFilter(), new LimiterFilter()], null);

        filterManager.toggleFilter("fake");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true,
            "soundtouch": true
        });
    });

    test("Reset one filter state", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);

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

        expect(filterManager.getFiltersSettings().get("limiter")).toMatchObject({
            "attackTime": 0
        });

        filterManager.changeFilterSettings("limiter", {
            "attackTime": 5
        });

        await filterManager.resetFilterSettings("limiter");

        expect(filterManager.getFiltersSettings().get("limiter")).toMatchObject({
            "attackTime": 0
        });
    });

    test("Connect nodes without entry point filter", async () => {
        const filterManager = new FilterManager([], null);
        const context = createMockAudioContext();
        const buffer = context.createBuffer(1, 44100, 44100);
        await expect(filterManager.connectNodes(context, buffer, false, false)).resolves.toBeUndefined();
    });
});
