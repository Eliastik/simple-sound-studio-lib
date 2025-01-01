/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import EventEmitter from "../lib/utils/EventEmitter";
import BufferPlayer from "../lib/bufferPlayer/BufferPlayer";
import MockAudioNode from "./MockAudioNode";
import { EventType } from "../lib/model/EventTypeEnum";

(window as any) = {};

jest.spyOn(window, "setInterval");

describe("BufferPlayer tests", () => {
    let bufferPlayer: BufferPlayer;
    let mockEventEmitter: EventEmitter;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllTimers();

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
        mockEventEmitter = new EventEmitter();

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
        expect(bufferPlayer.playing).toBe(true);
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
    
    test("Get current time display", () => {
        const mockAudioBuffer = {
            duration: 60
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(30);
        expect(bufferPlayer.currentTimeDisplay).toBe("00:30");
    });
    
    test("Get current time display - 2", () => {
        const mockAudioBuffer = {
            duration: 350
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(320);
        expect(bufferPlayer.currentTimeDisplay).toBe("05:20");
    });
    
    test("Get max time display", () => {
        const mockAudioBuffer = {
            duration: 45
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        expect(bufferPlayer.maxTimeDisplay).toBe("00:45");
    });
    
    test("Get max time display - 2", () => {
        const mockAudioBuffer = {
            duration: 490
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        expect(bufferPlayer.maxTimeDisplay).toBe("08:10");
    });
    
    test("Get percent", () => {
        const mockAudioBuffer = {
            duration: 500
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(250);
        expect(bufferPlayer.percent).toBe(50);
    });
    
    test("Get percent - 2", () => {
        const mockAudioBuffer = {
            duration: 345
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(345);
        expect(bufferPlayer.percent).toBe(100);
    });
    
    test("Get percent - 3", () => {
        const mockAudioBuffer = {
            duration: 500
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(0);
        expect(bufferPlayer.percent).toBe(0);
    });
    
    test("Get remaining time display", () => {
        const mockAudioBuffer = {
            duration: 60
        } as AudioBuffer;
        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(35);
        expect(bufferPlayer.remainingTimeDisplay).toBe("00:25");
    });
    
    test("Set time while playing", async () => {
        const mockAudioBuffer = {
            duration: 60
        } as AudioBuffer;

        jest.spyOn(bufferPlayer, "pause");
        jest.spyOn(bufferPlayer, "start");

        bufferPlayer.loadBuffer(mockAudioBuffer);
        await bufferPlayer.start();
        bufferPlayer.setTime(20);

        expect(bufferPlayer.pause).toHaveBeenCalled();
        expect(bufferPlayer.start).toHaveBeenCalled();
        expect(bufferPlayer.remainingTimeDisplay).toBe("00:40");
        expect(bufferPlayer.percent).toBe(33);
        expect(bufferPlayer.currentTimeDisplay).toBe("00:20");
    });
    
    test("Set percent time while playing", async () => {
        const mockAudioBuffer = {
            duration: 60
        } as AudioBuffer;

        jest.spyOn(bufferPlayer, "pause");
        jest.spyOn(bufferPlayer, "start");

        bufferPlayer.loadBuffer(mockAudioBuffer);
        await bufferPlayer.start();
        bufferPlayer.setTimePercent(50);

        expect(bufferPlayer.pause).toHaveBeenCalled();
        expect(bufferPlayer.start).toHaveBeenCalled();
        expect(bufferPlayer.remainingTimeDisplay).toBe("00:30");
        expect(bufferPlayer.percent).toBe(50);
        expect(bufferPlayer.currentTimeDisplay).toBe("00:30");
    });
    
    test("Play direct - not compatibility mode", async () => {
        const mockAudioBuffer = {
            duration: 60
        } as AudioBuffer;

        jest.spyOn(bufferPlayer, "start");

        bufferPlayer.loadBuffer(mockAudioBuffer);
        await bufferPlayer.playDirect();

        expect(bufferPlayer.start).toHaveBeenCalledWith(true);
    });
    
    test("Play direct - compatibility mode", async () => {
        jest.spyOn(bufferPlayer, "start");

        bufferPlayer.setCompatibilityMode(new MockAudioNode(), 60);
        await bufferPlayer.playDirect();

        expect(bufferPlayer.start).toHaveBeenCalledWith(false);
    });
    
    test("Play - end playing", async () => {
        jest.spyOn(bufferPlayer, "reset");
        jest.spyOn(mockEventEmitter, "emit");

        bufferPlayer.setCompatibilityMode(new MockAudioNode(), 60);
        bufferPlayer.setTime(60);

        await bufferPlayer.start();

        jest.runAllTimers();

        expect(bufferPlayer.reset).toHaveBeenCalled();
        expect(mockEventEmitter.emit).toHaveBeenCalledWith(EventType.PLAYING_FINISHED);
    });
    
    test("Play - end playing - Loop (compatibility mode)", async () => {
        jest.spyOn(bufferPlayer, "start");
        jest.spyOn(mockEventEmitter, "emit");

        bufferPlayer.setCompatibilityMode(new MockAudioNode(), 30);
        bufferPlayer.setTime(0);
        bufferPlayer.loop = true;

        await bufferPlayer.start();

        jest.advanceTimersByTime(31000);

        expect(bufferPlayer.start).toHaveBeenCalledTimes(1);
        expect(mockEventEmitter.emit).toHaveBeenCalledWith(EventType.PLAYING_FINISHED);
    });
    
    test("Play - end playing - Loop (not compatibility mode)", async () => {
        const mockAudioBuffer = {
            duration: 120
        } as AudioBuffer;

        jest.spyOn(bufferPlayer, "start");
        jest.spyOn(bufferPlayer, "reset");
        jest.spyOn(mockEventEmitter, "emit");

        bufferPlayer.loadBuffer(mockAudioBuffer);
        bufferPlayer.setTime(0);
        bufferPlayer.loop = true;

        await bufferPlayer.start();

        jest.advanceTimersByTime(121000);

        expect(bufferPlayer.start).toHaveBeenCalledTimes(2);
        expect(bufferPlayer.reset).toHaveBeenCalledTimes(2);
        expect(mockEventEmitter.emit).not.toHaveBeenCalledWith(EventType.PLAYING_FINISHED);
    });
});
