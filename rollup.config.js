import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import glob from "glob";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";

const workletFiles = [
    ...glob.sync(path.join(__dirname, "lib/filters/worklets/*.worklet.ts")),
    "lib/recorder/worklet/RecorderWorklet.ts",
    "node_modules/@soundtouchjs/audio-worklet/dist/soundtouch-worklet.js"
];

const workerFiles = [
    "lib/recorder/worker/RecorderWorker.ts"
];

const bundleConfig = [
    {
        input: "./dist/dts/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [
            dts.default()
        ]
    },
    {
        input: "lib/index.ts",
        output: [
            {
                file: `dist/esm/SimpleSoundStudioLibrary.js`,
                format: "esm",
                sourcemap: true,
                exports: "named",
                name: "SimpleSoundStudioLibrary",
            },
            {
                file: `dist/cjs/SimpleSoundStudioLibrary.js`,
                format: "cjs",
                sourcemap: true,
                exports: "named",
                name: "SimpleSoundStudioLibrary",
            },
        ],
        plugins: [
            resolve({
                browser: true,
            }),
            commonjs({
                include: /node_modules/,
                requireReturnsDefault: "auto",
            }),
            typescript({
                sourceMap: true,
                inlineSources: true,
                inlineSourceMap: true,
                noEmit: true,
                experimentalDecorators: true,
                emitDecoratorMetadata: true
            }),
            terser({
                sourceMap: true
            }),
            cleanup()
        ],
    },
];

const workletConfig = workletFiles.map((input) => ({
    input,
    output: [
        {
            file: `dist/worklets/${path.basename(path.basename(input, ".ts"), ".js")}.js`,
            format: "esm",
            sourcemap: false,
            exports: "named",
        },
    ],
    plugins: [
        resolve({
            browser: true,
        }),
        typescript({
            noEmit: true
        }),
        terser(),
        cleanup()
    ],
}));

const workerConfig = workerFiles.map((input) => ({
    input,
    output: [
        {
            file: `dist/workers/${path.basename(input, ".ts")}.js`,
            format: "esm",
            sourcemap: false,
            exports: "named",
        },
    ],
    plugins: [
        resolve({
            browser: true
        }),
        commonjs({
            include: /node_modules/,
            requireReturnsDefault: "auto",
        }),
        typescript({
            noEmit: true
        }),
        terser(),
        cleanup()
    ],
}));

const config = [...bundleConfig, ...workletConfig, ...workerConfig];

export default config;
