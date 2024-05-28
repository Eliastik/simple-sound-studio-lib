import { MockAudioBuffer } from "./AudioBufferMock";

export class MockAudioContext {
    sampleRate: number;
    currentTime: number;
    state: "suspended" | "running" | "closed";
    destination: AudioDestinationNode;
    emptyData = false;

    constructor(options?: AudioContextOptions, emptyData?: boolean) {
        this.sampleRate = options?.sampleRate || 44100;
        this.currentTime = 0;
        this.state = "suspended";
        this.destination = {} as AudioDestinationNode;
        this.emptyData = emptyData || false;
    }

    resume() {
        this.state = "running";
    }

    suspend() {
        this.state = "suspended";
    }

    close() {
        this.state = "closed";
    }

    createBuffer(_numberOfChannels: number, _length: number, sampleRate: number) {
        return {
            numberOfChannels: _numberOfChannels,
            length: _length,
            sampleRate: sampleRate,
            duration: _length * sampleRate,
            getChannelData() {
                return new Float32Array(_length);
            },
            copyFromChannel() {
                // Do nothing
            },
            copyToChannel(_source, _channelNumber, _bufferOffset) {
                // Do nothing
            },
        } as AudioBuffer;
    }

    createBufferSource() {
        // Crée un mock de AudioBufferSourceNode
        return {} as AudioBufferSourceNode;
    }

    createMediaStreamSource() {
        return {
            connect() {
                // Do nothing
            }
        } as unknown as MediaStreamAudioSourceNode;
    }

    startRendering() {
        return Promise.resolve(new MockAudioBuffer(2, 1000, 44100, this.emptyData));
    }
}


export class MockAudioContextWithEmptyData extends MockAudioContext {
    constructor(options?: AudioContextOptions) {
        super(options, true);
    }
}

export class MockAudioContextWithLongRunningRendering extends MockAudioContext {
    startRendering() {
        return new Promise<MockAudioBuffer>(resolve => {
            setTimeout(() => {
                resolve(new MockAudioBuffer(2, 1000, 44100, this.emptyData));
            }, 3000);
        });
    }
}

export function createMockAudioContext(options?: AudioContextOptions): AudioContext {
    return new MockAudioContext(options) as unknown as AudioContext;
}
