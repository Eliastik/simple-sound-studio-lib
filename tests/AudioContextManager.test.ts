import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import AudioContextManager from "../lib/audioEditor/AudioContextManager";
import EventEmitter from "../lib/utils/EventEmitter";
import { ConfigService } from "../lib/services/interfaces/ConfigService";
import { EventType } from "../lib/model/EventTypeEnum";
import { MockAudioContext } from "./AudioContextMock";

(AudioContext as any) = MockAudioContext;

describe("AudioContextManager tests", () => {
    test("Create context when init AudioContextManager", () => {
        const eventEmitter = new EventEmitter();
        const spy = jest.spyOn(eventEmitter, "emit");
        const configService = {
            isCompatibilityModeEnabled: jest.fn(() => true),
            getSampleRate: jest.fn(() => 192000),
        } as unknown as ConfigService;

        const spyContextManager = jest.spyOn(
            AudioContextManager.prototype,
            "createNewContext"
        );

        new AudioContextManager(eventEmitter, configService);

        expect(configService.getSampleRate).toHaveBeenCalled();
        expect(spyContextManager).toHaveBeenCalledWith(192000);
        expect(spy).toHaveBeenCalledWith(EventType.SAMPLE_RATE_CHANGED, 192000);
    });

    test("Create new context if needed - Compatibility mode enabled", () => {
        const eventEmitter = new EventEmitter();
        const configService = {
            isCompatibilityModeEnabled: jest.fn(() => true),
            getSampleRate: jest.fn(() => 44100),
        } as unknown as ConfigService;

        const audioContextManager = new AudioContextManager(
            eventEmitter,
            configService
        );
        const result = audioContextManager.createNewContextIfNeeded(null);

        expect(result).toBe(false); // Since compatibility mode is enabled, no new context should be created
        expect(configService.isCompatibilityModeEnabled).toHaveBeenCalled();
    });

    test("Create new context if needed - Sample rate changed", () => {
        const eventEmitter = new EventEmitter();
        const spy = jest.spyOn(eventEmitter, "emit");
        const functionSampleRate = jest.fn(() => 48000);
        const configService = {
            isCompatibilityModeEnabled: jest.fn(() => false),
            getSampleRate: functionSampleRate,
        } as unknown as ConfigService;

        const audioContextManager = new AudioContextManager(
            eventEmitter,
            configService
        );
        const result = audioContextManager.createNewContextIfNeeded(null);

        expect(result).toBe(false); // Sample rate has not changed

        configService.getSampleRate = jest.fn(() => 44100);

        const result2 = audioContextManager.createNewContextIfNeeded(null);

        expect(result2).toBe(true); // Sample rate has changed, so the function should return true
        expect(configService.isCompatibilityModeEnabled).toHaveBeenCalled();
        expect(configService.getSampleRate).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(EventType.SAMPLE_RATE_CHANGED, 48000);
    });

    test("Create new context", () => {
        const eventEmitter = new EventEmitter();
        const spy = jest.spyOn(eventEmitter, "emit");
        const configService = {
            isCompatibilityModeEnabled: jest.fn(() => false),
            getSampleRate: jest.fn(() => 44100),
        } as unknown as ConfigService;

        const audioContextManager = new AudioContextManager(
            eventEmitter,
            configService
        );
        audioContextManager.createNewContext(48000);

        expect(audioContextManager.currentSampleRate).toBe(48000);
        expect(spy).toHaveBeenCalledWith(EventType.SAMPLE_RATE_CHANGED, 48000);
    });

    test("Create new context - Should destroy old context", () => {
        const eventEmitter = new EventEmitter();
        const spy = jest.spyOn(eventEmitter, "emit");
        const configService = {
            isCompatibilityModeEnabled: jest.fn(() => false),
            getSampleRate: jest.fn(() => 44100),
        } as unknown as ConfigService;

        const audioContextManager = new AudioContextManager(
            eventEmitter,
            configService
        );

        const spyDestroy = jest.spyOn(MockAudioContext.prototype, "close");
        
        audioContextManager.createNewContext(48000);

        expect(audioContextManager.currentSampleRate).toBe(48000);
        expect(spyDestroy).toHaveBeenCalled();
    });
});
