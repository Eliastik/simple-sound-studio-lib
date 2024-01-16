import EventEmitter from "../utils/EventEmitter";
import { EventType } from "../model/EventTypeEnum";
import utilFunctions from "../utils/Functions";

export default class BufferDecoderService {

    private context: AudioContext;
    private eventEmitter: EventEmitter | null;

    constructor(context: AudioContext, eventEmitter?: EventEmitter) {
        this.context = context;
        this.eventEmitter = eventEmitter || new EventEmitter();
    }

    async decodeBufferFromFile(file: File): Promise<AudioBuffer> {
        if (this.eventEmitter) {
            this.eventEmitter.emit(EventType.DECODING_AUDIO_FILE);
        }

        const buffer = await utilFunctions.loadAudioBuffer(this.context, file);

        if (this.eventEmitter) {
            this.eventEmitter.emit(EventType.DECODED_AUDIO_FILE);
        }

        return buffer;
    }

    updateContext(context: AudioContext) {
        this.context = context;
    }
}
