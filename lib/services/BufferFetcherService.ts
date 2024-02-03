import EventEmitter from "../utils/EventEmitter";
import { EventType } from "../model/EventTypeEnum";
import utilFunctions from "../utils/Functions";
import { ConfigService } from "./ConfigService";

export default class BufferFetcherService {

    private context: AudioContext;
    private buffers: Map<string, AudioBuffer> = new Map<string, AudioBuffer>();
    private bufferErrors: string[] = [];
    private eventEmitter: EventEmitter | null;
    private configService: ConfigService | null = null;

    constructor(context: AudioContext, configService: ConfigService, eventEmitter?: EventEmitter) {
        this.context = context;
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
                const buffer = await this.context.decodeAudioData(arrayBuffer);
                this.buffers.set(this.getKeyFromLocation(realBufferURI), await utilFunctions.decodeBuffer(this.context, buffer));
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

    updateContext(context: AudioContext) {
        this.context = context;
    }

    reset() {
        this.buffers.clear();
    }
}
