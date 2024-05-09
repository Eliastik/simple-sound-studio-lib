/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: undefined,
    coverageProvider: "v8",
    roots: ["./tests"],
    moduleDirectories: [
        "node_modules",
        "lib"
    ],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/lib/$1"
    },
    transform: {
        "^.+\\.(tsx?|js)$": [
            "ts-jest",
            {
                diagnostics: false
            },
        ]
    },
    transformIgnorePatterns: [
        "node_modules/?!(soundtouchjs)"
    ]
};

export default config;