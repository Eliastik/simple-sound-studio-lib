import Constants from "../../model/Constants";

class RenderingProgressCalculationWorkletProcessor extends AudioWorkletProcessor {

    private stopped = false;
    private disabled = false;
    private samplesCount = 0;

    constructor() {
        super();

        this.port.onmessage = event => {
            switch (event.data) {
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
        return [];
    }

    get defaultParameterDescriptors() {
        return RenderingProgressCalculationWorkletProcessor.parameterDescriptors;
    }

    process(inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
        if (this.stopped || this.disabled) {
            return false;
        }

        const input = inputs[0];
        const output = outputs[0];

        if (input && input[0]) {
            this.samplesCount += input[0].length;
        }

        if (output) {
            for (let channel = 0; channel < output.length; channel++) {
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

registerProcessor(Constants.WORKLET_NAMES.RENDERING_PROGRESS_CALCULATION, RenderingProgressCalculationWorkletProcessor);
