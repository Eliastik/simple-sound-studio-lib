import AbstractAudioRenderer from "../lib/filters/interfaces/AbstractAudioRenderer";

export default class MockAudioRenderer extends AbstractAudioRenderer {

    private name = "mockRenderer";

    constructor(defaultEnabled: boolean, name?: string) {
        super();
        this.setDefaultEnabled(defaultEnabled);

        if (name) {
            this.name = name;
        }
    }

    get order(): number {
        return 1;
    }

    get id(): string {
        return this.name;
    }

    renderAudio(_context: AudioContext | OfflineAudioContext, buffer: AudioBuffer): Promise<AudioBuffer> {
        return Promise.resolve(buffer);
    }
}
