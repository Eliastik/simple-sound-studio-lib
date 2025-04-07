import { injectable } from "inversify";
import Constants from "../model/Constants";
import { RecorderCallback, RecorderCallbacks } from "../model/RecorderCallback";
import type RecorderConfig from "../model/RecorderConfig";
import RecorderWorkerMessage from "../model/RecorderWorkerMessage";
import RecorderWorkletMessage from "../model/RecorderWorkletMessage";
import utilFunctions from "../utils/Functions";
import getRecorderWorker from "./getRecorderWorker";
import RecorderInterface from "./interfaces/RecorderInterface";

@injectable()
export class Recorder implements RecorderInterface {

    // Inline Worker
    private worker: Worker | null = null;
    private node: ScriptProcessorNode | AudioWorkletNode | null = null;
    private context: BaseAudioContext | null = null;

    private config: RecorderConfig = {
        bufferLen: 4096,
        sampleRate: 44100,
        numChannels: 2,
        mimeType: "audio/wav",
        workletBasePath: "worklets/",
        workerBasePath: "workers/",
        bitrate: Constants.DEFAULT_MP3_BITRATE,
        callback: () => { }
    };

    private callbacks: RecorderCallbacks = {
        getBuffer: [],
        exportWAV: [],
        exportMP3: []
    };

    recording = false;

    constructor(cfg: RecorderConfig) {
        Object.assign(this.config, cfg);
    }

    async setup(source: AudioNode) {
        if (this.node) { // Disconnect previous node
            if (this.node instanceof AudioWorkletNode) {
                this.node.port.postMessage("stop");
            }

            this.node.disconnect();
        }

        if (source) {
            this.context = source.context;

            await this.createRecorderNode();

            if (this.node && this.context) {
                source.connect(this.node);
                this.node.connect(this.context.destination);    //this should not be necessary
            }
        }

        if (this.context && !this.worker) {
            this.worker = getRecorderWorker(this.config.workerBasePath);

            if (this.worker) {
                this.worker.postMessage({
                    command: "init",
                    config: {
                        sampleRate: this.context.sampleRate,
                        numChannels: this.config.numChannels,
                        bitrate: this.config.bitrate
                    }
                });

                this.worker.onmessage = (e: RecorderWorkerMessage) => {
                    let callbacks = null;

                    switch (e.data.command) {
                    case "getBuffer":
                        callbacks = this.callbacks.getBuffer;
                        break;
                    case Constants.EXPORT_WAV_COMMAND:
                        callbacks = this.callbacks.exportWAV;
                        break;
                    case Constants.EXPORT_MP3_COMMAND:
                        callbacks = this.callbacks.exportMP3;
                        break;
                    }

                    if (callbacks) {
                        const cb = callbacks.pop();
                        if (typeof cb == "function") {
                            (cb as RecorderCallback<Blob | Float32Array[]>)(e.data.data);
                        }
                    }
                };
            }
        }
    }


    private async createRecorderNode() {
        if (this.context) {
            if (utilFunctions.isAudioWorkletCompatible(this.context) && Constants.ENABLE_RECORDER_AUDIO_WORKLET) {
                try {
                    await this.createRecorderWorklet();
                } catch (e) {
                    console.error(e);
                    this.createRecorderScriptProcessorNode();
                }
            } else {
                this.createRecorderScriptProcessorNode();
            }
        }
    }

    private async createRecorderWorklet() {
        if (this.context) {
            await this.context.audioWorklet.addModule(this.config.workletBasePath + Constants.WORKLET_PATHS.RECORDER_WORKLET);

            this.node = new AudioWorkletNode(this.context, Constants.WORKLET_NAMES.RECORDER_WORKLET);

            if (this.node && this.node.port) {
                const numChannelParameter = this.node.parameters.get("numChannels");

                if (numChannelParameter) {
                    numChannelParameter.value = this.config.numChannels;
                    numChannelParameter.setValueAtTime(this.config.numChannels, 0);
                }

                this.node.port.onmessage = (e: MessageEvent<RecorderWorkletMessage>) => {
                    if (this.worker && e.data.command == "record" && e.data.buffer.length > 0) {
                        this.worker.postMessage({
                            command: "record",
                            buffer: e.data.buffer
                        });
                    }
                };
            }
        }
    }

    private createRecorderScriptProcessorNode() {
        if (this.context) {
            this.node = (this.context.createScriptProcessor).call(this.context,
                this.config.bufferLen, this.config.numChannels, this.config.numChannels);

            this.node.onaudioprocess = e => {
                if (!this.recording) {
                    return;
                }

                const buffer = [];
                for (let channel = 0; channel < this.config.numChannels; channel++) {
                    buffer.push(e.inputBuffer.getChannelData(channel));
                }

                if (this.worker) {
                    this.worker.postMessage({
                        command: "record",
                        buffer
                    });
                }
            };
        }
    }

    record() {
        this.recording = true;

        if (this.node instanceof AudioWorkletNode) {
            this.node.port.postMessage("record");
        }
    }

    stop() {
        this.recording = false;

        if (this.node instanceof AudioWorkletNode) {
            this.node.port.postMessage("stop");
        }
    }

    clear() {
        if (this.worker) {
            this.worker.postMessage({ command: "clear" });
        }
    }

    kill() {
        this.clear();
        this.stop();

        if (this.worker) {
            this.worker.terminate();
        }
    }

    getBuffer(cb: RecorderCallback<Float32Array[]>) {
        cb = cb || this.config.callback;

        if (!cb) {
            throw new Error("Callback not set");
        }

        this.callbacks.getBuffer.push(cb);

        if (this.worker) {
            this.worker.postMessage({ command: "getBuffer" });
        }
    }

    exportWAV(cb: RecorderCallback<Blob>, mimeType?: string) {
        mimeType = mimeType || this.config.mimeType;
        cb = cb || this.config.callback;

        if (!cb) {
            throw new Error("Callback not set");
        }

        this.callbacks.exportWAV.push(cb);

        if (this.worker) {
            this.worker.postMessage({
                command: Constants.EXPORT_WAV_COMMAND,
                type: mimeType
            });
        }
    }

    exportMP3(cb: RecorderCallback<Blob>, mimeType?: string) {
        mimeType = mimeType || this.config.mimeType;
        cb = cb || this.config.callback;

        if (!cb) {
            throw new Error("Callback not set");
        }

        this.callbacks.exportMP3.push(cb);

        if (this.worker) {
            this.worker.postMessage({
                command: Constants.EXPORT_MP3_COMMAND,
                type: mimeType
            });
        }
    }
};

export default Recorder;
