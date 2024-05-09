/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from "ts-jest";
import { jsWithTs as tsjPreset } from "ts-jest/presets";

const config: JestConfigWithTsJest = {
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
    transform: {
        ...tsjPreset.transform
    },
    transformIgnorePatterns: [
        "node_modules/?!(soundtouchjs)"
    ],
    globals: {
        "ts-jest": {
            diagnostics: false
        }
    }
};

export default config;
