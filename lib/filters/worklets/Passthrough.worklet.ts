import Constants from "../../model/Constants";

class PassthroughWorkletProcessor extends AudioWorkletProcessor {

    stopped = false;
    samplesCount = 0;

    constructor() {
        super();
        this.port.onmessage = (event) => {
            if (event.data == "stop") {
                this.stop();
            }
        };
    }

    static get parameterDescriptors() {
        return [];
    }

    get defaultParameterDescriptors() {
        return PassthroughWorkletProcessor.parameterDescriptors;
    }

    process(inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
        if (this.stopped) return false;

        const input = inputs[0];
        const output = outputs[0];

        if (input && input[0]) {
            this.samplesCount += input[0].length;
        }

        if (output) {
            for(let channel = 0; channel < output.length; channel++) {
                const inp = input[channel];
                const out = output[channel];

                if (inp) {
                    for (let sample = 0; sample < inp.length; sample++) {
                        out[sample] = inp[sample];
                    }
                }
            }

            this.port.postMessage({ command: "update", samplesCount: this.samplesCount });
        }

        return true;
    }

    stop() {
        this.stopped = true;
    }
}

registerProcessor(Constants.WORKLET_NAMES.PASSTHROUGH, PassthroughWorkletProcessor);
