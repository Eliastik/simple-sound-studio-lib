
/*
 * Copyright (C) 2019-2023 Eliastik (eliastiksofts.com)
 *
 * This file is part of "Simple Voice Changer".
 *
 * "Simple Voice Changer" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "Simple Voice Changer" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "Simple Voice Changer".  If not, see <http://www.gnu.org/licenses/>.
 */
// The Voice Recorder class
// Used to record a sound (voice, etc.) with the user microphone
// Offer control with play/pause and audio feedback
import { inject, injectable } from "inversify";
import TimerSaveTime from "../utils/TimerSaveTime";
import { EventType } from "../model/EventTypeEnum";
import AudioConstraintWrapper from "../model/AudioConstraintWrapper";
import { RecorderSettings } from "../model/RecorderSettings";
import type { ConfigService } from "../services/interfaces/ConfigService";
import AbstractAudioElement from "../filters/interfaces/AbstractAudioElement";
import Constants from "../model/Constants";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import { AudioConstraint } from "../model/AudioConstraint";
import Recorder from "../recorder/Recorder";
import VoiceRecorderInterface from "./interfaces/VoiceRecorderInterface";
import { TYPES } from "@/inversify.types";
import AudioContextManagerInterface from "@/audioEditor/interfaces/AudioContextManagerInterface";

@injectable()
export default class VoiceRecorder extends AbstractAudioElement implements VoiceRecorderInterface {

    private contextManager: AudioContextManagerInterface | null | undefined;

    private input: MediaStreamAudioSourceNode | null = null;

    private stream: MediaStream | null = null;

    private recorder: Recorder | null = null;

    private alreadyInit = false;

    private timer: TimerSaveTime | null = null;

    private enableAudioFeedback = false;

    private recording = false;

    private deviceList: MediaDeviceInfo[] = [];

    private constraints: AudioConstraintWrapper = {
        audio: {
            noiseSuppression: true,
            echoCancellation: true,
            autoGainControl: true,
            sampleRate: { ideal: 44100 }
        }
    };

    private sampleRateConfigNotSupported = false;

    constructor(
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface | null,
        @inject(TYPES.ConfigService) configService: ConfigService) {
        super();

        this.contextManager = contextManager;
        this.configService = configService;
    }

    async init() {
        if (!this.isRecordingAvailable()) {
            return;
        }

        // Specific case: Firefox doesn't support changing sample-rate for MediaDevice API
        // In this case we disable sample-rate config feature for this VoiceRecorder
        this.sampleRateConfigNotSupported = !navigator.mediaDevices.getSupportedConstraints().sampleRate;

        if (this.contextManager) {
            if (this.sampleRateConfigNotSupported) {
                this.contextManager.createNewContext(0);
            } else {
                this.contextManager.createNewContextIfNeeded();
            }
        }

        this.eventEmitter?.emit(EventType.RECORDER_INIT);

        try {
            const stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            if (this.contextManager && this.contextManager.currentContext) {
                this.contextManager.currentContext.resume();
            }

            await this.setup(stream, false, false);

            this.alreadyInit = true;
            this.timer = new TimerSaveTime(0, 1);

            this.timer.onCount(() => {
                this.eventEmitter?.emit(EventType.RECORDER_COUNT_UPDATE);
            });

            this.successCallback();
        } catch (e) {
            console.error(e);

            const exception = e as DOMException;

            if (exception) {
                switch (exception.name) {
                case "SecurityError":
                case "NotAllowedError":
                    this.errorCallback();
                    break;
                case "NotFoundError":
                    this.notFoundErrorCallback();
                    break;
                    // Disable sample rate configuration
                case "NotSupportedError":
                    if (!this.sampleRateConfigNotSupported) {
                        this.sampleRateConfigNotSupported = true;
                        this.init();
                    }
                    break;
                default:
                    this.unknownErrorCallback();
                    break;
                }
            }
        }

        navigator.mediaDevices.ondevicechange = () => this.updateInputList();
    }

    private successCallback() {
        this.eventEmitter?.emit(EventType.RECORDER_SUCCESS);
    }

    private errorCallback() {
        this.eventEmitter?.emit(EventType.RECORDER_ERROR);
    }

    private notFoundErrorCallback() {
        this.eventEmitter?.emit(EventType.RECORDER_NOT_FOUND_ERROR);
    }

    private unknownErrorCallback() {
        this.eventEmitter?.emit(EventType.RECORDER_UNKNOWN_ERROR);
    }

    audioFeedback(enable: boolean) {
        if (this.contextManager && this.contextManager.currentContext) {
            if (enable) {
                this.input && this.input.connect(this.contextManager.currentContext.destination);
                this.enableAudioFeedback = true;
            } else {
                this.input && this.input.connect(this.contextManager.currentContext.destination) && this.input.disconnect(this.contextManager.currentContext.destination);
                this.enableAudioFeedback = false;
            }

            this.eventEmitter?.emit(EventType.RECORDER_UPDATE_CONSTRAINTS);
        }
    }

    /**
     * Get current constraints/settings
     * @returns MediaTrackSettings
     */
    private getConstraints() {
        if (this.stream) {
            const tracks = this.stream.getTracks();

            if (tracks && tracks.length > 0) {
                return tracks[0].getSettings();
            }
        }

        return null;
    }

    /**
     * Update the current constraints
     */
    private updateConstraints() {
        const constraints = this.getConstraints();

        if (constraints) {
            this.constraints.audio = Object.assign(this.constraints.audio, constraints);
            this.eventEmitter?.emit(EventType.RECORDER_UPDATE_CONSTRAINTS);
        }
    }

    /**
     * Reset the current constraints
     * @param newConstraint AudioConstraintWrapper
     */
    private async resetConstraints(newConstraint?: AudioConstraintWrapper) {
        if (this.stream) {
            const precAudioFeedback = this.enableAudioFeedback;
            const precRecording = this.recording;
            const tracks = this.stream.getTracks();

            if (newConstraint) {
                this.updateConstraints();
                this.constraints.audio = Object.assign(this.constraints.audio, newConstraint.audio);
            }

            if (tracks && tracks.length > 0) {
                try {
                    await tracks[0].applyConstraints(this.constraints.audio);

                    const newConstraints = this.getConstraints();
                    const newConstraintName = newConstraint ? Object.keys(newConstraint.audio)[0] : "";

                    this.audioFeedback(false);
                    this.pause();

                    if (!newConstraint ||
                        (newConstraints && (newConstraints as AudioConstraint)[newConstraintName] != newConstraint.audio[newConstraintName])) {
                        this.stopStream();

                        const stream = await navigator.mediaDevices.getUserMedia(this.constraints);

                        await this.setup(stream, precRecording, precAudioFeedback);
                    } else {
                        await this.setup(null, precRecording, precAudioFeedback);
                    }
                } catch (e) {
                    this.errorCallback();
                }
            }
        }
    }

    /**
     * Setup this voice recorder
     * @param stream MediaStream
     * @param precRecording Was recording?
     * @param precAudioFeedback Has audio feedback?
     */
    private async setup(stream: MediaStream | null, precRecording: boolean, precAudioFeedback: boolean) {
        if (stream && this.contextManager && this.contextManager.currentContext) {
            this.input = this.contextManager.currentContext.createMediaStreamSource(stream);
            this.stream = stream;
        }

        if (this.recorder && this.input) {
            await this.recorder.setup(this.input);

            if (precRecording) {
                await this.record();
            }
        }

        this.audioFeedback(precAudioFeedback);
        this.updateConstraints();
        await this.updateInputList();
    }

    setNoiseSuppression(enable: boolean) {
        this.resetConstraints({
            audio: {
                noiseSuppression: enable
            }
        });
    }

    setAutoGain(enable: boolean) {
        this.resetConstraints({
            audio: {
                autoGainControl: enable
            }
        });
    }

    setEchoCancellation(enable: boolean) {
        this.resetConstraints({
            audio: {
                echoCancellation: enable
            }
        });
    }

    /**
     * Update current audio input list
     */
    private async updateInputList() {
        if (this.deviceList) {
            const devices = await navigator.mediaDevices.enumerateDevices();
            this.deviceList = [];

            devices.forEach(device => {
                if (device.kind == "audioinput") {
                    this.deviceList.push(device);
                }
            });
        }
    }

    changeInput(deviceId: string, groupId: string | undefined) {
        if (groupId) {
            this.constraints.audio.deviceId = deviceId;
            this.constraints.audio.groupId = groupId;
            this.resetConstraints();
        }
    }

    async record() {
        if (this.alreadyInit && this.configService && this.input) {
            if (!this.recorder) {
                this.recorder = new Recorder({
                    bufferLen: this.configService.getBufferSize(),
                    sampleRate: this.configService.getSampleRate(),
                    numChannels: 2,
                    workletBasePath: this.configService.getWorkletBasePath(),
                    workerBasePath: this.configService.getWorkerBasePath(),
                    mimeType: "audio/wav"
                });

                await this.recorder.setup(this.input);
            }

            if (this.recorder) {
                this.recorder.record();
            }

            this.timer && this.timer.start();
            this.recording = true;

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.RECORDER_RECORDING);
            }
        }
    }

    async stop() {
        if (this.alreadyInit && this.recorder) {
            this.recorder.stop();
            this.timer && this.timer.stop();
            this.recording = false;

            this.recorder.getBuffer((buffer: Float32Array[]) => {
                if (this.contextManager && this.contextManager.currentContext) {
                    this.contextManager.currentContext.resume();

                    const newBuffer = this.contextManager.currentContext.createBuffer(2, buffer[0].length, this.contextManager.currentContext.sampleRate);
                    newBuffer.getChannelData(0).set(buffer[0]);
                    newBuffer.getChannelData(1).set(buffer[1]);

                    this.eventEmitter?.emit(EventType.RECORDER_STOPPED, newBuffer);
                    this.reset();
                }
            });
        }
    }

    pause() {
        if (this.alreadyInit) {
            this.recorder && this.recorder.stop();
            this.timer && this.timer.stop();
            this.recording = false;
            this.eventEmitter?.emit(EventType.RECORDER_PAUSED);
        }
    }

    /**
     * Stop stream
     */
    private stopStream() {
        if (this.stream) {
            const tracks = this.stream.getTracks();

            for (let i = 0, l = tracks.length; i < l; i++) {
                tracks[i].stop();
            }
        }
    }

    reset() {
        this.recorder && this.recorder.kill();
        this.timer && this.timer.stop();
        this.audioFeedback(false);

        this.stopStream();

        this.input = null;
        this.recorder = null;
        this.stream = null;
        this.alreadyInit = false;
        this.timer = null;

        this.eventEmitter?.emit(EventType.RECORDER_RESETED);
    }

    get currentTimeDisplay() {
        return this.timer?.seconds ? ("0" + Math.trunc(this.timer?.seconds / 60)).slice(-2) + ":" + ("0" + Math.trunc(this.timer?.seconds % 60)).slice(-2) : "00:00";
    }

    get currentTime() {
        return this.timer ? this.timer.seconds : 0;
    }

    getSettings(): RecorderSettings {
        return {
            deviceList: this.deviceList,
            audioFeedback: this.enableAudioFeedback,
            constraints: this.constraints.audio
        };
    }

    on(event: string, callback: EventEmitterCallback) {
        this.eventEmitter?.on(event, callback);
    }

    isRecordingAvailable() {
        return typeof (navigator.mediaDevices) !== "undefined" && typeof (navigator.mediaDevices.getUserMedia) !== "undefined";
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        throw Constants.VOICE_RECORDER;
    }
}
