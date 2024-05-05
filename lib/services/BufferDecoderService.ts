import type AudioContextManagerInterface from "@/audioEditor/interfaces/AudioContextManagerInterface";
import { EventType } from "../model/EventTypeEnum";
import EventEmitter from "../utils/EventEmitter";
import utilFunctions from "../utils/Functions";
import BufferDecoderServiceInterface from "./interfaces/BufferDecoderServiceInterface";
import { inject, injectable } from "inversify";
import type EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import { TYPES } from "@/inversify.types";

@injectable()
export default class BufferDecoderService implements BufferDecoderServiceInterface {

    private contextManager: AudioContextManagerInterface;
    private eventEmitter: EventEmitterInterface | null;

    constructor(
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface,
        @inject(TYPES.EventEmitter) eventEmitter?: EventEmitterInterface) {
        this.contextManager = contextManager;
        this.eventEmitter = eventEmitter || new EventEmitter();
    }

    async decodeBufferFromFile(file: File): Promise<AudioBuffer | null> {
        if (this.eventEmitter) {
            this.eventEmitter.emit(EventType.DECODING_AUDIO_FILE);
        }

        try {
            if (this.contextManager && this.contextManager.currentContext) {
                const buffer = await utilFunctions.loadAudioBuffer(this.contextManager.currentContext, file);
    
                if (this.eventEmitter) {
                    this.eventEmitter.emit(EventType.DECODED_AUDIO_FILE);
                }
    
                return buffer;
            }
        } catch (e) {
            console.error(e);

            if (this.eventEmitter) {
                this.eventEmitter.emit(EventType.DECODED_AUDIO_FILE);
                this.eventEmitter.emit(EventType.ERROR_DECODING_AUDIO_FILE);
            }
        }

        return null;
    }
}
