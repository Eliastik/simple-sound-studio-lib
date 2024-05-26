export default class MockAudioNode implements AudioNode {
    channelCount: number = 2;
    channelCountMode: ChannelCountMode = 'max';
    channelInterpretation: ChannelInterpretation = 'speakers';
    readonly context: BaseAudioContext = {} as BaseAudioContext;
    readonly numberOfInputs: number = 1;
    readonly numberOfOutputs: number = 1;

    connect(destination: AudioNode | AudioParam, output?: number, input?: number): AudioNode {
        return {} as AudioNode;
    }

    disconnect(): void {
        
    }

    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: unknown, callback: unknown, options?: unknown): void {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event: Event): boolean;
    dispatchEvent(event: Event): boolean;
    dispatchEvent(event: unknown): boolean {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: unknown, callback: unknown, options?: unknown): void {
        throw new Error("Method not implemented.");
    }
}
