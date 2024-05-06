/*
 * Copyright (C) 2019-2024 Eliastik (eliastiksofts.com)
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
// The audio buffer player
// Used to play the audio buffer, with time controls, pause/play, stop and loop
import { EventType } from "../model/EventTypeEnum";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import EventEmitter from "../utils/EventEmitter";
import AbstractAudioElement from "../filters/interfaces/AbstractAudioElement";
import Constants from "../model/Constants";
import { TYPES } from "../inversify.types";
import { inject, injectable } from "inversify";
import BufferPlayerInterface from "./interfaces/BufferPlayerInterface";
import AudioContextManagerInterface from "@/audioEditor/interfaces/AudioContextManagerInterface";
import type EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";

// Also used in compatibility mode (which doesn't use audio buffer) with less functions (no time control)
@injectable()
export default class BufferPlayer extends AbstractAudioElement implements BufferPlayerInterface {

    private _contextManager: AudioContextManagerInterface | undefined | null;
    private buffer: AudioBuffer | null = null;
    private source: AudioBufferSourceNode | null = null;
    currentTime = 0;
    displayTime = 0;
    duration = 0;
    private intervals: number[] = [];
    playing = false;
    loop = false;
    speedAudio = 1;
    private onBeforePlayingCallback: () => void = async () => {};

    compatibilityMode = false;
    currentNode: AudioNode | null = null;

    constructor(
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface | undefined | null,
        @inject(TYPES.EventEmitter) eventEmitter?: EventEmitterInterface) {
        super();
        this._contextManager = contextManager;
        this.eventEmitter = eventEmitter || new EventEmitter();
    }

    init(direct?: boolean) {
        this.playing = false;

        if (this._contextManager && this._contextManager.currentContext) {
            this._contextManager.currentContext.resume();

            if (!this.compatibilityMode && this.buffer) {
                if (this.source != null && !direct) this.source.disconnect();
                this.source = this._contextManager.currentContext.createBufferSource();
                this.source.buffer = this.buffer;
                this.duration = this.buffer.duration * this.speedAudio;
                this.source.connect(this._contextManager.currentContext.destination);
            }
        }

        this.updateInfos();
    }

    loadBuffer(buffer: AudioBuffer) {
        this.compatibilityMode = false;
        this.reset();
        this.buffer = buffer;
        this.init();
    }

    setCompatibilityMode(currentNode: AudioNode, duration?: number) {
        this.compatibilityMode = true;
        this.reset();
        this.init();

        if (duration != null) {
            this.duration = duration * this.speedAudio;
        }

        this.currentNode = currentNode;
        this.updateInfos();
    }

    reset(direct?: boolean) {
        this.clearIntervals();

        this.currentTime = 0;
        this.displayTime = 0;

        if (!direct) {
            this.stop();
        }
    }

    stop() {
        this.clearIntervals();

        if (this.source != undefined && this.source != null && this.playing) {
            this.source.stop(0);
            this.playing = false;
        }

        if (this.currentNode) {
            this.currentNode.disconnect();

            if(this.compatibilityMode) {
                this.currentTime = 0;
                this.displayTime = 0;
            }
        }

        this.eventEmitter?.emit(EventType.PLAYING_STOPPED);
        this.updateInfos();
    }

    /**
     * Clear old intervals
     */
    private clearIntervals() {
        for (const interval of this.intervals) {
            clearInterval(interval);
        }

        this.intervals = [];
    }

    async start(direct?: boolean) {
        if (this.source || this.compatibilityMode) {
            if (!direct) {
                this.stop();
            }

            this.init(direct);

            await this.onBeforePlayingCallback();

            this.eventEmitter?.emit(EventType.PLAYING_STARTED);

            if (!this.compatibilityMode) {
                if (this.source) {
                    this.source.start(0, direct ? 0 : this.currentTime / this.speedAudio);
                    this.playing = true;
                } else {
                    return;
                }
            } else {
                if (this.currentNode && this._contextManager && this._contextManager.currentContext) {
                    this.currentNode.connect(this._contextManager.currentContext.destination);
                } else {
                    return;
                }
            }

            let startTime = performance.now();

            this.intervals.push(window.setInterval(() => {
                const timeNow = performance.now();
                const nextTime = timeNow - startTime;
                startTime = timeNow;

                this.currentTime += (nextTime / 1000) * this.speedAudio;
                this.displayTime = this.currentTime;

                if (this.currentTime > this.duration) {
                    if (this.loop) {
                        if (!this.compatibilityMode) {
                            this.reset(direct);
                            this.start();
                        } else {
                            this.eventEmitter?.emit(EventType.PLAYING_FINISHED);
                        }
                    } else {
                        this.eventEmitter?.emit(EventType.PLAYING_FINISHED);
                        this.reset(direct);
                    }
                } else {
                    this.updateInfos();
                }
            }, 100));
        }
    }

    async playDirect() {
        if (!this.compatibilityMode) {
            this.start(true);
        } else {
            // Play direct is not possible when compatibility mode is enabled
            this.start(false);
        }
    }

    pause() {
        this.stop();
    }

    /** Send an event to update the informations of this player */
    private updateInfos() {
        this.eventEmitter?.emit(EventType.PLAYING_UPDATE);
    }

    setTimePercent(percent: number) {
        if(!this.compatibilityMode) {
            this.currentTime = Math.round(this.duration * (percent / 100));
            this.displayTime = this.currentTime;
    
            if (this.playing) {
                this.pause();
                this.start();
            } else {
                this.updateInfos();
            }
        }
    }

    setTime(time: number) {
        if (!this.compatibilityMode) {
            this.currentTime = time;
            this.displayTime = this.currentTime;

            if (this.playing) {
                this.pause();
                this.start();
            } else {
                this.updateInfos();
            }
        }
    }

    onBeforePlaying(callback: () => void) {
        this.onBeforePlayingCallback = callback;
    }

    toggleLoop() {
        this.loop = !this.loop;
    }

    on(event: string, callback: EventEmitterCallback) {
        if (this.eventEmitter) {
            this.eventEmitter.on(event, callback);
        }
    }

    get currentTimeDisplay() {
        return ("0" + Math.trunc(this.displayTime / 60)).slice(-2) + ":" + ("0" + Math.trunc(this.displayTime % 60)).slice(-2);
    }

    get maxTimeDisplay() {
        return ("0" + Math.trunc(this.duration / 60)).slice(-2) + ":" + ("0" + Math.trunc(this.duration % 60)).slice(-2);
    }

    get percent() {
        return (100 - Math.round((this.duration - this.displayTime) / this.duration * 100));
    }

    get remainingTimeDisplay() {
        return ("0" + Math.trunc((this.duration - this.displayTime) / 60)).slice(-2) + ":" + ("0" + Math.trunc((this.duration - this.displayTime) % 60)).slice(-2);
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.BUFFER_PLAYER;
    }
}
