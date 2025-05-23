export class MockAudioBuffer implements AudioBuffer {
    readonly length: number;
    duration: number = 500;
    readonly numberOfChannels: number;
    readonly sampleRate: number;
    private channelData: Float32Array[];

    constructor(numberOfChannels: number, length: number, sampleRate: number, emptyData?: boolean) {
        this.numberOfChannels = numberOfChannels;
        this.length = length;
        this.sampleRate = sampleRate;
        this.duration = length / sampleRate;

        if (emptyData) {
            this.channelData = Array.from({ length: numberOfChannels }, () => new Float32Array(0)); 
        } else {
            this.channelData = Array.from({ length: numberOfChannels }, () => new Float32Array(length));
        }
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
