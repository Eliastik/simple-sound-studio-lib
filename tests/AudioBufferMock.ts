export class MockAudioBuffer implements AudioBuffer {
    readonly length: number;
    readonly duration: number;
    readonly numberOfChannels: number;
    readonly sampleRate: number;
    private channelData: Float32Array[];

    constructor(numberOfChannels: number, length: number, sampleRate: number) {
        this.numberOfChannels = numberOfChannels;
        this.length = length;
        this.sampleRate = sampleRate;
        this.duration = length / sampleRate;
        this.channelData = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
    }

    getChannelData(channel: number): Float32Array {
        return this.channelData[channel];
    }

    copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel?: number): void {
        const source = this.channelData[channelNumber];
        const start = startInChannel || 0;
        destination.set(source.subarray(start, start + destination.length));
    }

    copyToChannel(source: Float32Array, channelNumber: number, startInChannel?: number): void {
        const destination = this.channelData[channelNumber];
        const start = startInChannel || 0;
        destination.set(source, start);
    }
}
