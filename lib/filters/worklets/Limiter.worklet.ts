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
// Source: https://webaudiotech.com/2016/01/21/should-your-web-audio-app-have-a-limiter/ (https://web.archive.org/web/20220519100003/https://webaudiotech.com/2016/01/21/should-your-web-audio-app-have-a-limiter/)
// Original code: https://webaudiotech.com/sites/limiter_comparison/limiter.js
// Additions by Eliastik (eliastiksofts.com): Stereo and multi-channel support, code simplified in one object class (Limiter), converted into AudioWorklet
import Constants from "../../model/Constants";
import DelayBuffer from "../../utils/DelayBuffer";

class LimiterProcessor extends AudioWorkletProcessor {

    private delayBuffer: DelayBuffer[] = [];
    private envelopeSamples: number[] = [];
    private stopped = false;
    private disabled = false;

    constructor() {
        super();

        this.port.onmessage = event => {
            switch (event.data) {
            case "reset":
                this.reset();
                break;
            case "stop":
                this.stop();
                break;
            case "disable":
                this.disabled = true;
                break;
            case "enable":
                this.disabled = false;
                break;
            }
        };
    }

    static get parameterDescriptors() {
        return [
            { name: "preGain", defaultValue: 0 },
            { name: "postGain", defaultValue: 0 },
            { name: "attackTime", defaultValue: 0 },
            { name: "releaseTime", defaultValue: 3 },
            { name: "threshold", defaultValue: -0.05 },
            { name: "lookAheadTime", defaultValue: 0 }
        ];
    }

    get defaultParameterDescriptors() {
        return LimiterProcessor.parameterDescriptors;
    }

    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
        if (this.stopped) {
            return false;
        }

        const inputBuffer = inputs[0];
        const outputBuffer = outputs[0];

        const envelopeData = this.applyPreGainAndComputeEnvelope(inputBuffer, outputBuffer, parameters);

        this.applyLimiter(inputBuffer, outputBuffer, parameters, envelopeData);

        return true;
    }

    private getEnvelope(data: Float32Array, attackTime: number, releaseTime: number, sampleRate: number, channel: number) {
        const attackGain = Math.exp(-1 / (sampleRate * attackTime));
        const releaseGain = Math.exp(-1 / (sampleRate * releaseTime));

        const envelope = new Float32Array(data.length);

        if (this.envelopeSamples[channel] == null) {
            this.envelopeSamples[channel] = 0;
        }

        for (let i = 0; i < data.length; i++) {
            const envIn = Math.abs(data[i]);

            if (this.envelopeSamples[channel] < envIn) {
                this.envelopeSamples[channel] = envIn + attackGain * (this.envelopeSamples[channel] - envIn);
            } else {
                this.envelopeSamples[channel] = envIn + releaseGain * (this.envelopeSamples[channel] - envIn);
            }

            envelope[i] = this.envelopeSamples[channel];
        }

        return envelope;
    }

    private getMaxEnvelope(envelope: Float32Array[], channels: number, index: number) {
        let max = envelope[0][index];

        for (let channel = 0; channel < channels; channel++) {
            if (envelope[channel][index] > max) {
                max = envelope[channel][index];
            }
        }

        return max;
    }

    private ampToDB(value: number) {
        return 20 * Math.log10(value);
    }

    private dBToAmp(db: number) {
        return Math.pow(10, db / 20);
    }

    private applyPreGainAndComputeEnvelope(inputBuffer: Float32Array[], outputBuffer: Float32Array[], parameters: Record<string, Float32Array>) {
        const preGainAmp = this.dBToAmp(parameters.preGain[0]);

        const envelopeData = [];

        // apply pre gain to signal
        // compute the envelope for each channel
        for (let channel = 0; channel < outputBuffer.length; channel++) {
            const inp = inputBuffer[channel];
            const out = outputBuffer[channel];

            // create a delay buffer
            if (this.delayBuffer[channel] == null) {
                this.delayBuffer[channel] = new DelayBuffer(parameters.lookAheadTime[0] * sampleRate);
            }

            // apply pre gain to signal
            if (inp && out) {
                this.applyPreGain(inp, out, preGainAmp);
            }

            // compute the envelope
            if (!this.disabled && out) {
                envelopeData[channel] = this.getEnvelope(out, parameters.attackTime[0], parameters.releaseTime[0], sampleRate, channel);
            }
        }

        return envelopeData;
    }

    private applyPreGain(inp: Float32Array, out: Float32Array, preGainAmp: number) {
        for (let k = 0; k < inp.length; ++k) {
            if (!this.disabled) {
                out[k] = preGainAmp * inp[k];
            } else {
                out[k] = inp[k];
            }
        }
    }

    private applyLimiter(inputBuffer: Float32Array[], outputBuffer: Float32Array[], parameters: Record<string, Float32Array>, envelopeData: Float32Array[]) {
        const postGainAmp = this.dBToAmp(parameters.postGain[0]);

        for (let channel = 0; channel < outputBuffer.length; channel++) {
            const inp = inputBuffer[channel];
            const out = outputBuffer[channel];

            if (parameters.lookAheadTime[0] > 0 && out) {
                // write signal into buffer and read delayed signal
                this.applyLookAheadDelay(out, channel);
            }

            // If disabled we don't apply the limitation to the audio
            if (this.disabled) {
                continue;
            }

            // limiter mode: slope is 1
            const slope = 1;

            if (inp && out) {
                for (let i = 0; i < inp.length; i++) {
                    let gainDB = slope * (parameters.threshold[0] - this.ampToDB(this.getMaxEnvelope(envelopeData, outputBuffer.length, i))); // max gain

                    // is gain below zero?
                    gainDB = Math.min(0, gainDB);

                    const gainAmp = this.dBToAmp(gainDB);

                    out[i] *= (gainAmp * postGainAmp);
                }
            }
        }
    }

    private applyLookAheadDelay(out: Float32Array, channel: number) {
        for (let i = 0; i < out.length; i++) {
            this.delayBuffer[channel].push(out[i]);
            out[i] = this.delayBuffer[channel].read();
        }
    }

    private clearBuffers() {
        for (let i = 0; i < this.delayBuffer.length; i++) {
            if (this.delayBuffer[i] != null) {
                this.delayBuffer[i].clear();
            }
        }

        this.delayBuffer = [];
        this.envelopeSamples = [];
    }

    private reset() {
        this.clearBuffers();
    }

    private stop() {
        this.clearBuffers();
        this.stopped = true;
    }
}

registerProcessor(Constants.WORKLET_NAMES.LIMITER, LimiterProcessor);
