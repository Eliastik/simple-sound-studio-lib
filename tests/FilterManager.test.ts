import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import FilterManager from "../lib/audioEditor/FilterManager";
import LimiterFilter from "../lib/filters/LimiterFilter";
import SountouchWrapperFilter from "../lib/filters/SountouchWrapperFilter";
import { createMockAudioContext } from "./AudioContextMock";

describe("FilterManager tests", () => {
    test("Initialize filter manager with 1 filter", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true
        });
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

    test("Connect nodes without entry point filter", async () => {
        const filterManager = new FilterManager([], null);
        const context = createMockAudioContext();
        const buffer = context.createBuffer(1, 44100, 44100);
        await expect(filterManager.connectNodes(context, buffer, false, false)).resolves.toBeUndefined();
    });
});