import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import { FilterManager, LimiterFilter } from "../dist/cjs/SimpleSoundStudioLibrary";

describe("FilterManager tests", () => {
    test("Initialize filter manager with 1 filter", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": true
        });
    });

    test("Disable one filter", () => {
        const filterManager = new FilterManager([new LimiterFilter()], null);

        filterManager.toggleFilter("limiter");

        expect(filterManager.getFiltersState()).toStrictEqual({
            "limiter": false
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
});