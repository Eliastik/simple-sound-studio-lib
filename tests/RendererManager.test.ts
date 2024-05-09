import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import RendererManager from "../lib/audioEditor/RendererManager";
import AbstractAudioRenderer from "../lib/filters/interfaces/AbstractAudioRenderer";
import ReturnAudioRenderer from "../lib/filters/ReturnAudioRenderer";

class MockAudioRenderer extends AbstractAudioRenderer {

    constructor() {
        super();
        this.setDefaultEnabled(true);
    }

    get order(): number {
        return 1;
    }

    get id(): string {
        return "mockRenderer";
    }

    renderAudio(_context: AudioContext | OfflineAudioContext, buffer: AudioBuffer): Promise<AudioBuffer> {
        return Promise.resolve(buffer);
    }
}


describe("RendererManager tests", () => {
    test("Initialize renderer manager with 1 renderer", () => {
        const rendererManager = new RendererManager([new MockAudioRenderer(), new ReturnAudioRenderer()]);
        expect(rendererManager.getRenderersState()).toStrictEqual({
            "mockRenderer": true,
            "returnAudio": false
        });
    });

    test("Disable one renderer", () => {
        const rendererManager = new RendererManager([new ReturnAudioRenderer(), new MockAudioRenderer()]);
        rendererManager.toggleRenderer("mockRenderer");

        expect(rendererManager.getRenderersState()).toStrictEqual({
            "returnAudio": false,
            "mockRenderer": false
        });
    });

    test("Disable fake renderer", () => {
        const rendererManager = new RendererManager([new ReturnAudioRenderer(), new MockAudioRenderer()]);
        rendererManager.toggleRenderer("fake");

        expect(rendererManager.getRenderersState()).toStrictEqual({
            "returnAudio": false,
            "mockRenderer": true
        });
    });

    test("Reset one renderer state", () => {
        const rendererManager = new RendererManager([new MockAudioRenderer(), new ReturnAudioRenderer()]);
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
});