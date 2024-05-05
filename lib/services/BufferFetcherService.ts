import { EventType } from "../model/EventTypeEnum";
import type { ConfigService } from "./interfaces/ConfigService";
import utilFunctions from "../utils/Functions";
import EventEmitter from "../utils/EventEmitter";
import BufferFetcherServiceInterface from "./interfaces/BufferFetcherServiceInterface";
import { inject, injectable } from "inversify";
import type EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import type AudioContextManagerInterface from "@/audioEditor/interfaces/AudioContextManagerInterface";
import { TYPES } from "@/inversify.types";

@injectable()
export default class BufferFetcherService implements BufferFetcherServiceInterface {

    private contextManager: AudioContextManagerInterface;
    private buffers: Map<string, AudioBuffer> = new Map<string, AudioBuffer>();
    private bufferErrors: string[] = [];
    private eventEmitter: EventEmitterInterface | null;
    private configService: ConfigService | null = null;

    constructor(
        @inject(TYPES.AudioContextManager) contextManager: AudioContextManagerInterface,
        @inject(TYPES.ConfigService) configService: ConfigService,
        @inject(TYPES.EventEmitter) eventEmitter?: EventEmitterInterface) {
        this.contextManager = contextManager;
        this.eventEmitter = eventEmitter || new EventEmitter();
        this.configService = configService;
    }

    async fetchBuffer(bufferURI: string, force?: boolean) {
        const realBufferURI = (this.configService ? this.configService.getSoundBasePath() : "") + bufferURI;

        if(this.buffers.get(this.getKeyFromLocation(realBufferURI)) != null && !force) {
            return;
        }

        this.eventEmitter?.emit(EventType.FETCHING_BUFFERS, realBufferURI);

        try {
            const response = await fetch(realBufferURI);

            if(!response.ok) {
                this.bufferErrors.push(realBufferURI);
                this.eventEmitter?.emit(EventType.FETCHING_BUFFERS_ERROR, realBufferURI);
                throw EventType.FETCHING_BUFFERS_ERROR;
            } else {
                const arrayBuffer = await response.arrayBuffer();

                if (this.contextManager && this.contextManager.currentContext) {
                    const buffer = await this.contextManager.currentContext.decodeAudioData(arrayBuffer);
                    this.buffers.set(this.getKeyFromLocation(realBufferURI), utilFunctions.decodeBuffer(this.contextManager.currentContext, buffer));
                }
            }
    
            this.eventEmitter?.emit(EventType.FINISHED_FETCHING_BUFFERS, realBufferURI);
        } catch(e) {
            this.bufferErrors.push(realBufferURI);
            this.eventEmitter?.emit(EventType.FETCHING_BUFFERS_ERROR, realBufferURI);
            throw EventType.FETCHING_BUFFERS_ERROR;
        }
    }

    async fetchAllBuffers(bufferURIs: string[]) {
        for(const uri of bufferURIs) {
            await this.fetchBuffer(uri);
        }
    }

    getAudioBuffer(filename: string): AudioBuffer | undefined {
        return this.buffers.get(this.getKeyFromLocation(filename));
    }

    async getOrFetchAudioBuffer(filename: string): Promise<AudioBuffer | undefined> {
        if(this.getAudioBuffer(filename) == null) {
            await this.fetchBuffer(filename);
        }

        return this.getAudioBuffer(filename);
    }

    getDownloadedBuffersList(): string[] {
        return Array.from(this.buffers.keys());
    }

    private getKeyFromLocation(location: string) {
        return location.substring(location.lastIndexOf("/") + 1);
    }

    reset() {
        this.buffers.clear();
    }
}
