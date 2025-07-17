import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import RendererManager from "../lib/audioEditor/RendererManager";
import MockAudioRenderer from "./MockAudioRenderer";
import ReturnAudioRenderer from "../lib/filters/ReturnAudioRenderer";
import { MockAudioBuffer } from "./AudioBufferMock";
import { createMockAudioContext } from "./AudioContextMock";

describe("RendererManager tests", () => {
    test("Initialize renderer manager with 1 renderer", () => {
        const rendererManager = new RendererManager([new MockAudioRenderer(true), new ReturnAudioRenderer()]);
        expect(rendererManager.getRenderersState()).toStrictEqual({
            "mockRenderer": true,
            "returnAudio": false
        });
    });

    test("Add renderers should inject dependencies", async () => {
        const filterManager = new RendererManager([]);

        const mockAudioRenderer = new MockAudioRenderer(true);
        const returnAudioRenderer = new ReturnAudioRenderer();
        
        jest.spyOn(mockAudioRenderer, "injectDependencies");
        jest.spyOn(returnAudioRenderer, "injectDependencies");

        filterManager.addRenderers(mockAudioRenderer, returnAudioRenderer);

        expect(mockAudioRenderer.injectDependencies).toHaveBeenCalled();
        expect(mockAudioRenderer.injectDependencies).toHaveBeenCalled();
    });

    test("Disable one renderer", () => {
        const rendererManager = new RendererManager([new ReturnAudioRenderer(), new MockAudioRenderer(true)]);
        rendererManager.toggleRenderer("mockRenderer");

        expect(rendererManager.getRenderersState()).toStrictEqual({
            "returnAudio": false,
            "mockRenderer": false
        });
    });

    test("Disable fake renderer", () => {
        const rendererManager = new RendererManager([new ReturnAudioRenderer(), new MockAudioRenderer(true)]);
        rendererManager.toggleRenderer("fake");

        expect(rendererManager.getRenderersState()).toStrictEqual({
            "returnAudio": false,
            "mockRenderer": true
        });
    });

    test("Reset one renderer state", () => {
        const rendererManager = new RendererManager([new MockAudioRenderer(true), new ReturnAudioRenderer()]);
        rendererManager.toggleRenderer("mockRenderer");

        expect(rendererManager.getRenderersState()).toStrictEqual({
            "mockRenderer": false,
            "returnAudio": false
        });

        rendererManager.resetAllRenderersState();

        expect(rendererManager.getRenderersState()).toStrictEqual({
            "mockRenderer": true,
            "returnAudio": false
        });
    });

    test("Execute audio renderers", async () => {
        const mock1 = new MockAudioRenderer(true, "mock1");
        const mock2 = new MockAudioRenderer(false, "mock2");
        const mock3 = new MockAudioRenderer(true, "mock3");
    
        const spyMock1 = jest.spyOn(mock1, "renderAudio");
        const spyMock2 = jest.spyOn(mock2, "renderAudio");
        const spyMock3 = jest.spyOn(mock3, "renderAudio");

        const rendererManager = new RendererManager([mock1, mock2]);

        rendererManager.toggleRenderer("mock2"); // Enable mock2
        rendererManager.toggleRenderer("mock3"); // Disable mock3

        await rendererManager.executeAudioRenderers(new MockAudioBuffer(2, 100000, 44100), createMockAudioContext());

        expect(spyMock1).toHaveBeenCalled();
        expect(spyMock2).toHaveBeenCalled();
        expect(spyMock3).toHaveBeenCalledTimes(0);
    });
});
