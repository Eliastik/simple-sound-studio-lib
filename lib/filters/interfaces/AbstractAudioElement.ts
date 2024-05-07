import { inject, injectable } from "inversify";
import type { ConfigService } from "../../services/interfaces/ConfigService";
import { TYPES } from "@/inversify.types";
import type BufferFetcherServiceInterface from "@/services/interfaces/BufferFetcherServiceInterface";
import type BufferDecoderServiceInterface from "@/services/interfaces/BufferDecoderServiceInterface";
import type EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";

@injectable()
export default abstract class AbstractAudioElement {

    /** Is this element enabled? */
    private enabled = false;

    /** Is this element enabled by default? */
    private defaultEnabled = false;

    @inject(TYPES.BufferFetcherService)
    protected bufferFetcherService: BufferFetcherServiceInterface | null = null;

    @inject(TYPES.BufferDecoderService)
    protected bufferDecoderService: BufferDecoderServiceInterface | null = null;

    @inject(TYPES.ConfigService)
    protected configService: ConfigService | null = null;

    @inject(TYPES.EventEmitter)
    protected eventEmitter: EventEmitterInterface | null = null;

    /** Returns the order in which the filter/renderer needs to be applied */
    abstract get order(): number;

    /** Returns the id of this filter/renderer */
    abstract get id(): string;

    /** Is this filter/renderer enabled? */
    isEnabled(): boolean {
        return this.enabled;
    }

    /** Is this filter/renderer enabled by default? */
    isDefaultEnabled(): boolean {
        return this.defaultEnabled;
    }

    /** Set to true if this filter/renderer needs to be enabled by default */
    setDefaultEnabled(state: boolean) {
        this.defaultEnabled = state;
    }

    setEnabled(state: boolean) {
        this.enabled = state;
    }

    /** Enable this filter/renderer */
    enable() {
        this.setEnabled(true);
    }

    /** Disable this filter/renderer */
    disable() {
        this.setEnabled(false);
    }

    /** Toggle to enabled/disabled this filter */
    toggle() {
        this.setEnabled(!this.isEnabled());
    }

    injectDependencies(bufferFetcherService: BufferFetcherServiceInterface | null, bufferDecoderService: BufferDecoderServiceInterface | null, configService: ConfigService | null, eventEmitter: EventEmitterInterface | null) {
        this.bufferFetcherService = bufferFetcherService;
        this.bufferDecoderService = bufferDecoderService;
        this.configService = configService;
        this.eventEmitter = eventEmitter;
    }
}
