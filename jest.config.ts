/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: undefined,
    coverageProvider: "v8",
    moduleDirectories: [
        "node_modules",
        "lib"
    ],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/lib/$1"
    },
    preset: "ts-jest"
};

export default config;
