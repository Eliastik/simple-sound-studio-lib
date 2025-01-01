import { inject, injectable } from "inversify";
import type { ConfigService } from "../services/interfaces/ConfigService";
import { TYPES } from "@/inversify.types";
import type BufferFetcherServiceInterface from "@/services/interfaces/BufferFetcherServiceInterface";
import type BufferDecoderServiceInterface from "@/services/interfaces/BufferDecoderServiceInterface";
import type EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";

@injectable()
export default abstract class AbstractAudioElement {

    @inject(TYPES.BufferFetcherService)
    protected bufferFetcherService: BufferFetcherServiceInterface | null = null;

    @inject(TYPES.BufferDecoderService)
    protected bufferDecoderService: BufferDecoderServiceInterface | null = null;

    @inject(TYPES.ConfigService)
    protected configService: ConfigService | null = null;

    @inject(TYPES.EventEmitter)
    protected eventEmitter: EventEmitterInterface | null = null;

    injectDependencies(bufferFetcherService: BufferFetcherServiceInterface | null, bufferDecoderService: BufferDecoderServiceInterface | null, configService: ConfigService | null, eventEmitter: EventEmitterInterface | null) {
        if (bufferFetcherService) {
            this.bufferFetcherService = bufferFetcherService;
        }

        if (bufferDecoderService) {
            this.bufferDecoderService = bufferDecoderService;
        }

        if (configService) {
            this.configService = configService;
        }

        if (eventEmitter) {
            this.eventEmitter = eventEmitter;
        }
    }
}
