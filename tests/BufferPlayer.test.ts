/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import EventEmitter from "../lib/utils/EventEmitter";
import BufferPlayer from "../lib/bufferPlayer/BufferPlayer";

(window as any) = {};
(window as any).setInterval

describe("BufferPlayer tests", () => {
    let bufferPlayer: BufferPlayer;

    beforeEach(() => {
        // Mock AudioContextManagerInterface
        const mockAudioContextManager = {
            currentContext: {
                resume: jest.fn(),
                createBufferSource: jest.fn(() => ({
                    buffer: null,
                    connect: jest.fn(),
                    start: jest.fn(),
                    stop: jest.fn(),
                    disconnect: jest.fn()
                })),
                destination: {} // Mock destination
            }
        };
        const mockEventEmitter = new EventEmitter();

        bufferPlayer = new BufferPlayer(mockAudioContextManager);
        bufferPlayer.injectDependencies(null, null, null, mockEventEmitter);
    });

    test("Initialize BufferPlayer", () => {
        expect(bufferPlayer.currentTime).toBe(0);
        expect(bufferPlayer.displayTime).toBe(0);
        expect(bufferPlayer.duration).toBe(0);
        expect(bufferPlayer.playing).toBe(false);
        expect(bufferPlayer.loop).toBe(false);
        expect(bufferPlayer.speedAudio).toBe(1);
        expect(bufferPlayer.compatibilityMode).toBe(false);
        expect(bufferPlayer.currentNode).toBe(null);
    });

    test("Load buffer", () => {
        const mockAudioBuffer = {} as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        expect(bufferPlayer.compatibilityMode).toBe(false);
        expect(bufferPlayer.currentTime).toBe(0);
        expect(bufferPlayer.displayTime).toBe(0);
    });

    test("Set compatibility mode", () => {
        const mockAudioNode = {} as AudioNode;
        bufferPlayer.setCompatibilityMode(mockAudioNode, 10);
        expect(bufferPlayer.compatibilityMode).toBe(true);
        expect(bufferPlayer.currentNode).toBe(mockAudioNode);
        expect(bufferPlayer.currentTime).toBe(0);
        expect(bufferPlayer.displayTime).toBe(0);
    });

    test("Start playing", async () => {
        bufferPlayer.loadBuffer({} as AudioBuffer);
        await bufferPlayer.start();
        expect(bufferPlayer.playing).toBe(true);
        expect(bufferPlayer.currentTime).toBe(0);
        expect(bufferPlayer.displayTime).toBe(0);
    });
    
    test("Pause playing", async () => {
        bufferPlayer.loadBuffer({} as AudioBuffer);
        await bufferPlayer.start();
        bufferPlayer.pause();
        expect(bufferPlayer.playing).toBe(false);
    });
    
    test("Stop playing", async () => {
        bufferPlayer.loadBuffer({} as AudioBuffer);
        await bufferPlayer.start();
        bufferPlayer.stop();
        expect(bufferPlayer.playing).toBe(false);
        expect(bufferPlayer.currentTime).toBe(0);
        expect(bufferPlayer.displayTime).toBe(0);
    });
    
    test("Set time percent", () => {
        bufferPlayer.loadBuffer({} as AudioBuffer);
        bufferPlayer.duration = 60;
        bufferPlayer.setTimePercent(50);
        expect(bufferPlayer.currentTime).toBe(30);
        expect(bufferPlayer.displayTime).toBe(30);
    });
    
    test("Set time", () => {
        bufferPlayer.loadBuffer({} as AudioBuffer);
        bufferPlayer.duration = 60;
        bufferPlayer.setTime(30);
        expect(bufferPlayer.currentTime).toBe(30);
        expect(bufferPlayer.displayTime).toBe(30);
    });
    
    test("Toggle loop", () => {
        bufferPlayer.toggleLoop();
        expect(bufferPlayer.loop).toBe(true);
        bufferPlayer.toggleLoop();
        expect(bufferPlayer.loop).toBe(false);
    });
});
