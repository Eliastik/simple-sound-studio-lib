import AbstractAudioRenderer from "./interfaces/AbstractAudioRenderer";
import Constants from "../model/Constants";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import InlineWorker from "inline-worker";

export default class ReturnAudioRenderer extends AbstractAudioRenderer {
    renderAudio(context: BaseAudioContext, entryBuffer: AudioBuffer): Promise<AudioBuffer> {
        return new Promise(resolve => {
            const self = {};
            const worker = new InlineWorker(function (this: Worker) {
                this.onmessage = (e: MessageEvent) => {
                    if (e.data.type === "start") {
                        const buffer: Float32Array[] = e.data.buffer;

                        const numChannels = buffer.length;
                        const bufferReturned: Float32Array[] = [];

                        for (let channel = 0; channel < numChannels; channel++) {
                            const sourceChannelData = buffer[channel];
                            const totalFrames = sourceChannelData.length;
                            const nowBuffering = new Float32Array(totalFrames);

                            for (let i = 0; i < totalFrames; i++) {
                                if (i < sourceChannelData.length) {
                                    nowBuffering[i] = sourceChannelData[sourceChannelData.length - 1 - i];
                                } else {
                                    nowBuffering[i] = 0;
                                }
                            }

                            bufferReturned.push(nowBuffering);
                        }

                        this.postMessage({
                            type: "finish",
                            buffer: bufferReturned
                        });
                    }
                };
            }, self);

            const float32ArrayBuffer: Float32Array[] = [];

            for (let i = 0; i < entryBuffer.numberOfChannels; i++) {
                float32ArrayBuffer.push(entryBuffer.getChannelData(i));
            }

            worker.onmessage = (e: MessageEvent) => {
                if (e.data.type === "finish") {
                    const returnedFloat32ArrayBuffer: Float32Array[] = e.data.buffer;
                    const finalBuffer = context.createBuffer(returnedFloat32ArrayBuffer.length, returnedFloat32ArrayBuffer[0].length, context.sampleRate);

                    for (let channel = 0; channel < returnedFloat32ArrayBuffer.length; channel++) {
                        finalBuffer.copyToChannel(returnedFloat32ArrayBuffer[channel], channel);
                    }

                    resolve(finalBuffer);

                    worker.terminate();
                }
            };

            worker.postMessage({
                type: "start",
                buffer: float32ArrayBuffer
            });
        });
    }

    get order(): number {
        return 0;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.RETURN_AUDIO;
    }
}
