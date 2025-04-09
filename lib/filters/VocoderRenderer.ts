import AbstractAudioRenderer from "./interfaces/AbstractAudioRenderer";
import Constants from "../model/Constants";
import Functions from "../utils/Functions";
import Vocoder from "../utils/Vocoder";

export default class VocoderRenderer extends AbstractAudioRenderer {

    renderAudio(context: BaseAudioContext, buffer: AudioBuffer): Promise<AudioBuffer> {
        return new Promise((resolve, reject) => {
            const durationAudio = Functions.calcAudioDuration(buffer, 1);

            if (this.contextManager) {
                const offlineContext = this.contextManager.createOfflineAudioContext(2, context.sampleRate * durationAudio, context.sampleRate);

                offlineContext.oncomplete = e => {
                    resolve(e.renderedBuffer);
                };

                if (this.bufferFetcherService) {
                    const modulatorBuffer = this.bufferFetcherService.getAudioBuffer(Constants.VOCODER_MODULATOR);

                    if (modulatorBuffer) {
                        const vocoder = new Vocoder(offlineContext, modulatorBuffer!, buffer);
                        vocoder.init();
                    }
                }

                offlineContext.startRendering();
            } else {
                reject("AudioContextManager is not available!");
            }
        });
    }

    get order(): number {
        return 1;
    }

    get id(): string {
        return Constants.FILTERS_NAMES.VOCODER;
    }
}
