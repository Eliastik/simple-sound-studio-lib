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
});