class MockAudioContext {
    sampleRate: number;
    currentTime: number;
    state: "suspended" | "running" | "closed";
    destination: AudioDestinationNode;

    constructor() {
        this.sampleRate = 44100;
        this.currentTime = 0;
        this.state = "suspended";
        this.destination = {} as AudioDestinationNode;
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
}

export function createMockAudioContext(): AudioContext {
    return new MockAudioContext() as AudioContext;
}