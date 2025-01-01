/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import AudioContextManager from "../lib/audioEditor/AudioContextManager";
import VoiceRecorder from "../lib/voiceRecorder/VoiceRecorder";
import GenericConfigService from "../lib/services/GenericConfigService";
import { MockAudioContext } from "./AudioContextMock";
import EventEmitter from "../lib/utils/EventEmitter";
import { EventType } from "../lib/model/EventTypeEnum";
import { mockRecorder } from "./AudioEditorObjectsMock";

(AudioContext as any) = MockAudioContext;

describe("VoiceRecorder", () => {
    let voiceRecorder;
    let configService;

    beforeEach(() => {
        configService = new GenericConfigService();
        voiceRecorder = new VoiceRecorder(new AudioContextManager(null, configService), configService);
    });

    describe("init()", () => {
        test("should initialize properly", async () => {
            // Mock navigator.mediaDevices.getUserMedia
            (navigator as any).mediaDevices = {
                getUserMedia: jest.fn(() => Promise.resolve({
                    getTracks: jest.fn()
                })),
                getSupportedConstraints: jest.fn(() => ({
                    sampleRate: 44100
                })),
                enumerateDevices: jest.fn(() => ([{
                    deviceId: "Test",
                    groupId: "Test",
                    kind: "audioinput",
                    label: "Test"
                }]))
            };

            await voiceRecorder.init();

            expect(voiceRecorder.alreadyInit).toBe(true);
            expect(voiceRecorder.timer).not.toBeNull();
            expect(voiceRecorder.recording).toBe(false);
            expect(voiceRecorder.stream).not.toBeNull();
            expect(voiceRecorder.input).not.toBeNull();
        });

        test("should handle errors when initializing", async () => {
            // Mock navigator.mediaDevices.getUserMedia to throw an error
            (navigator as any).mediaDevices = {
                getUserMedia: jest.fn(() => Promise.reject(new Error("getUserMedia error"))),
                getSupportedConstraints: jest.fn(() => ({
                    sampleRate: 44100
                })),
                enumerateDevices: jest.fn(() => ([{
                    deviceId: "Test",
                    groupId: "Test",
                    kind: "audioinput",
                    label: "Test"
                }]))
            };

            await voiceRecorder.init();

            expect(voiceRecorder.alreadyInit).toBe(false);
            // Add more expectations based on how you handle different error scenarios
        });
    });

    describe("record()", () => {
        test("should start recording when initialized", async () => {
            // Mock navigator.mediaDevices.getUserMedia
            (navigator as any).mediaDevices = {
                getUserMedia: jest.fn(() => Promise.resolve({
                    getTracks: jest.fn()
                })),
                getSupportedConstraints: jest.fn(() => ({
                    sampleRate: 44100
                })),
                enumerateDevices: jest.fn(() => ([{
                    deviceId: "Test",
                    groupId: "Test",
                    kind: "audioinput",
                    label: "Test"
                }]))
            };

            await voiceRecorder.init();

            voiceRecorder.recorder = {
                record: jest.fn()
            };

            await voiceRecorder.record();

            expect(voiceRecorder.recording).toBe(true);
            expect(voiceRecorder.recorder.record).toHaveBeenCalled();
        });

        test("should not start recording if not initialized", async () => {
            voiceRecorder.recorder = { record: jest.fn() }; // Mock the record method

            await voiceRecorder.record();

            expect(voiceRecorder.recording).toBe(false);
            expect(voiceRecorder.recorder.record).not.toHaveBeenCalled();
        });
    });

    describe("reset constraints", () => {
        test("set noise suppression", async () => {
            // Mock navigator.mediaDevices.getUserMedia
            (navigator as any).mediaDevices = {
                getUserMedia: jest.fn(() => Promise.resolve({
                    getTracks: jest.fn(() => [{
                        applyConstraints: jest.fn(),
                        getSettings: jest.fn(() => {
                            return { "noiseSuppression": false };
                        })
                    }])
                })),
                getSupportedConstraints: jest.fn(() => ({
                    sampleRate: 44100
                })),
                enumerateDevices: jest.fn(() => ([{
                    deviceId: "Test",
                    groupId: "Test",
                    kind: "audioinput",
                    label: "Test"
                }]))
            };

            jest.spyOn(voiceRecorder, "audioFeedback");
            jest.spyOn(voiceRecorder, "pause");
            jest.spyOn(voiceRecorder, "stopStream");
            jest.spyOn(voiceRecorder, "setup");

            await voiceRecorder.init();

            voiceRecorder.recorder = {
                record: jest.fn(),
                stop: jest.fn(),
                setup: jest.fn()
            };

            voiceRecorder.setNoiseSuppression(true);

            await voiceRecorder.record();

            expect(voiceRecorder.pause).toHaveBeenCalled();
            expect(voiceRecorder.stopStream).toHaveBeenCalled();
            expect(voiceRecorder.setup).toHaveBeenCalled();
        });

        test("set auto gain", async () => {
            // Mock navigator.mediaDevices.getUserMedia
            (navigator as any).mediaDevices = {
                getUserMedia: jest.fn(() => Promise.resolve({
                    getTracks: jest.fn(() => [{
                        applyConstraints: jest.fn(),
                        getSettings: jest.fn(() => {
                            return { "autoGainControl": false };
                        })
                    }])
                })),
                getSupportedConstraints: jest.fn(() => ({
                    sampleRate: 44100
                })),
                enumerateDevices: jest.fn(() => ([{
                    deviceId: "Test",
                    groupId: "Test",
                    kind: "audioinput",
                    label: "Test"
                }]))
            };

            jest.spyOn(voiceRecorder, "audioFeedback");
            jest.spyOn(voiceRecorder, "pause");
            jest.spyOn(voiceRecorder, "stopStream");
            jest.spyOn(voiceRecorder, "setup");

            await voiceRecorder.init();

            voiceRecorder.recorder = {
                record: jest.fn(),
                stop: jest.fn(),
                setup: jest.fn()
            };

            voiceRecorder.setAutoGain(true);

            await voiceRecorder.record();

            expect(voiceRecorder.pause).toHaveBeenCalled();
            expect(voiceRecorder.stopStream).toHaveBeenCalled();
            expect(voiceRecorder.setup).toHaveBeenCalled();
        });

        test("set echo cancellation", async () => {
            // Mock navigator.mediaDevices.getUserMedia
            (navigator as any).mediaDevices = {
                getUserMedia: jest.fn(() => Promise.resolve({
                    getTracks: jest.fn(() => [{
                        applyConstraints: jest.fn(),
                        getSettings: jest.fn(() => {
                            return { "echoCancellation": false };
                        })
                    }])
                })),
                getSupportedConstraints: jest.fn(() => ({
                    sampleRate: 44100
                })),
                enumerateDevices: jest.fn(() => ([{
                    deviceId: "Test",
                    groupId: "Test",
                    kind: "audioinput",
                    label: "Test"
                }]))
            };

            jest.spyOn(voiceRecorder, "audioFeedback");
            jest.spyOn(voiceRecorder, "pause");
            jest.spyOn(voiceRecorder, "stopStream");
            jest.spyOn(voiceRecorder, "setup");

            await voiceRecorder.init();

            voiceRecorder.recorder = {
                record: jest.fn(),
                stop: jest.fn(),
                setup: jest.fn()
            };

            voiceRecorder.setEchoCancellation(true);

            await voiceRecorder.record();

            expect(voiceRecorder.pause).toHaveBeenCalled();
            expect(voiceRecorder.stopStream).toHaveBeenCalled();
            expect(voiceRecorder.setup).toHaveBeenCalled();
        });
    });

    test("reset recorder", () => {
        const eventEmitter = new EventEmitter();

        jest.spyOn(voiceRecorder, "stopStream");
        jest.spyOn(voiceRecorder, "audioFeedback");
        jest.spyOn(eventEmitter, "emit");

        voiceRecorder.injectDependencies(null, null, null, eventEmitter);

        voiceRecorder.reset();

        expect(voiceRecorder.stopStream).toHaveBeenCalled();
        expect(voiceRecorder.audioFeedback).toHaveBeenCalledWith(false);
        expect(eventEmitter.emit).toHaveBeenCalledWith(EventType.RECORDER_RESETED);
    });

    test("stop recorder",  async () => {
        // Mock navigator.mediaDevices.getUserMedia
        (navigator as any).mediaDevices = {
            getUserMedia: jest.fn(() => Promise.resolve({
                getTracks: jest.fn(() => [{
                    applyConstraints: jest.fn(),
                    getSettings: jest.fn(() => {
                        return { "echoCancellation": false };
                    }),
                    stop: jest.fn()
                }])
            })),
            getSupportedConstraints: jest.fn(() => ({
                sampleRate: 44100
            })),
            enumerateDevices: jest.fn(() => ([{
                deviceId: "Test",
                groupId: "Test",
                kind: "audioinput",
                label: "Test"
            }]))
        };

        const eventEmitter = new EventEmitter();

        jest.spyOn(voiceRecorder, "stopStream");
        jest.spyOn(voiceRecorder, "audioFeedback");
        jest.spyOn(eventEmitter, "emit");

        voiceRecorder.injectDependencies(null, null, null, eventEmitter);

        await voiceRecorder.init();

        voiceRecorder.recorder = mockRecorder;

        await voiceRecorder.record(mockRecorder);

        voiceRecorder.stop();

        expect(voiceRecorder.recording).toBe(false);
    });
});
