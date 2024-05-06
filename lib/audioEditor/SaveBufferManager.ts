import { inject, injectable } from "inversify";
import { TYPES } from "../inversify.types";
import { Recorder } from "../recorder/Recorder";
import { EventType } from "@/model/EventTypeEnum";
import AbstractAudioElement from "@/filters/interfaces/AbstractAudioElement";
import SaveBufferOptions from "@/model/SaveBufferOptions";
import EventEmitter from "@/utils/EventEmitter";
import Constants from "@/model/Constants";
import FilterManager from "./FilterManager";
import RecorderWorkerMessage from "../model/RecorderWorkerMessage";
import getRecorderWorker from "../recorder/getRecorderWorker";
import SaveBufferManagerInterface from "./interfaces/SaveBufferManagerInteface";
import { ConfigService } from "@/services/interfaces/ConfigService";
import type BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";
import AudioContextManagerInterface from "./interfaces/AudioContextManagerInterface";
import EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";

@injectable()
export default class SaveBufferManager extends AbstractAudioElement implements SaveBufferManagerInterface {

    /** The filter manager */
    private filterManager: FilterManager | undefined;

    /** The context manager */
    private contextManager: AudioContextManagerInterface | undefined;

    /** The audio player */
    private bufferPlayer: BufferPlayerInterface | undefined;

    /** If we are currently processing and downloading the buffer */
    private savingBuffer = false;
    /** Callback used when saving audio */
    private playingStoppedCallback: (() => void) | null = null;

    constructor(
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface | undefined,
        @inject(TYPES.ConfigService) configService: ConfigService | null,
        @inject(TYPES.EventEmitter) eventEmitter: EventEmitterInterface | null,
        @inject(TYPES.BufferPlayer) bufferPlayer: BufferPlayerInterface
    ) {
        super();

        this.contextManager = contextManager;
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.bufferPlayer = bufferPlayer;
        this.configService = configService;

        // Callback called just before starting audio player
        this.setup();
    }

    private setup() {
        if (this.bufferPlayer) {
            // Callback called when playing is finished
            this.bufferPlayer.on(EventType.PLAYING_FINISHED, () => {
                if (this.savingBuffer && this.playingStoppedCallback && this.eventEmitter) {
                    this.eventEmitter.off(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                }
            });
        }
    }

    async saveBuffer(renderedBuffer: AudioBuffer | null, options?: SaveBufferOptions): Promise<boolean> {
        if (this.savingBuffer) {
            throw new Error("The buffer is currently saving");
        }

        if (!this.bufferPlayer) {
            throw new Error("No buffer player was found");
        }

        this.savingBuffer = true;

        let savingResult = false;

        if (!this.bufferPlayer.compatibilityMode) {
            savingResult = await this.saveBufferDirect(renderedBuffer, options);
        } else {
            savingResult = await this.saveBufferCompatibilityMode(options);
        }

        this.savingBuffer = false;

        return savingResult;
    }

    /**
     * Save the rendered audio to a buffer, when compatibility mode is disabled
     * @param renderedBuffer The rendered buffer to save
     * @param options The save options
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    private saveBufferDirect(renderedBuffer: AudioBuffer | null, options?: SaveBufferOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!renderedBuffer || (this.contextManager && !this.contextManager.currentContext)) {
                return reject("No rendered buffer or AudioContext not initialized");
            }

            const worker = getRecorderWorker(this.configService?.getWorkerBasePath());

            if (worker) {
                const buffer: Float32Array[] = [];

                for (let i = 0; i < renderedBuffer.numberOfChannels; i++) {
                    buffer.push(renderedBuffer.getChannelData(i));
                }

                worker.onmessage = (e: RecorderWorkerMessage) => {
                    if (e.data.command == Constants.EXPORT_WAV_COMMAND || e.data.command == Constants.EXPORT_MP3_COMMAND) {
                        this.downloadAudioBlob(e.data.data, options);
                    }

                    worker.terminate();
                    this.savingBuffer = false;
                    resolve(true);
                };

                worker.postMessage({
                    command: Constants.INIT_COMMAND,
                    config: {
                        sampleRate: renderedBuffer.sampleRate,
                        numChannels: 2,
                        bitrate: options?.bitrate || Constants.DEFAULT_MP3_BITRATE
                    }
                });

                worker.postMessage({
                    command: Constants.RECORD_COMMAND,
                    buffer
                });

                worker.postMessage({
                    command: options?.format === "mp3" || Constants.DEFAULT_SAVE_FORMAT === "mp3" ? Constants.EXPORT_MP3_COMMAND : Constants.EXPORT_WAV_COMMAND,
                    type: Constants.AUDIO_WAV
                });
            }
        });
    }

    /**
     * Save the rendered audio to a buffer, when compatibility mode is enabled
     * @param options The save options - see SaveBufferOptions
     * @returns A promise resolved when the audio buffer is downloaded to the user
     */
    private saveBufferCompatibilityMode(options?: SaveBufferOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.bufferPlayer) {
                return reject("No buffer player found");
            }

            this.bufferPlayer.start().then(() => {
                if (!this.configService) {
                    return reject("No config service found");
                }

                if (!this.filterManager) {
                    return reject("No filter manager found");
                }

                const rec = new Recorder({
                    bufferLen: this.configService.getBufferSize(),
                    sampleRate: this.configService.getSampleRate(),
                    numChannels: 2,
                    workletBasePath: this.configService.getWorkletBasePath(),
                    workerBasePath: this.configService.getWorkerBasePath(),
                    mimeType: options?.format == "mp3" ? Constants.AUDIO_MP3 : Constants.AUDIO_WAV,
                    bitrate: options?.bitrate || Constants.DEFAULT_MP3_BITRATE
                });

                rec.setup(this.filterManager.currentNodes!.output).then(() => {
                    rec.record();

                    this.playingStoppedCallback = () => {
                        rec.kill();

                        this.savingBuffer = false;

                        if (this.eventEmitter) {
                            this.eventEmitter.off(EventType.PLAYING_FINISHED, finishedCallback);

                            if (this.playingStoppedCallback) {
                                this.eventEmitter.off(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                            }
                        }

                        resolve(true);
                    };

                    const finishedCallback = () => {
                        if (this.playingStoppedCallback && this.eventEmitter) {
                            this.eventEmitter.off(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                        }

                        rec.stop();

                        const downloadBlobCallback = (blob: Blob) => {
                            this.downloadAudioBlob(blob, options);

                            this.savingBuffer = false;

                            if (this.eventEmitter) {
                                this.eventEmitter.off(EventType.PLAYING_FINISHED, finishedCallback);
                            }

                            rec.kill();

                            resolve(true);
                        };

                        if (options?.format === "mp3" || Constants.DEFAULT_SAVE_FORMAT === "mp3") {
                            rec.exportMP3(downloadBlobCallback);
                        } else {
                            rec.exportWAV(downloadBlobCallback);
                        }
                    };

                    if (this.eventEmitter) {
                        this.eventEmitter.on(EventType.PLAYING_FINISHED, finishedCallback);
                        this.eventEmitter.on(EventType.PLAYING_STOPPED, this.playingStoppedCallback);
                    }
                });
            });
        });
    }

    /**
     * Download an audio Blob
     * @param blob The blob
     * @param options The save options - see SaveBufferOptions
     */
    private downloadAudioBlob(blob: Blob, options?: SaveBufferOptions) {
        Recorder.forceDownload(blob, "audio-" + new Date().toISOString() + "." + (options?.format || Constants.DEFAULT_SAVE_FORMAT));
    }

    get order(): number {
        return -1;
    }

    get id(): string {
        return Constants.SAVE_BUFFER_MANAGER;
    }
}
