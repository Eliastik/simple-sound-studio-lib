import { inject, injectable } from "inversify";
import { ConfigService } from "../../services/interfaces/ConfigService";
import { TYPES } from "@/inversify.types";
import BufferFetcherServiceInterface from "@/services/interfaces/BufferFetcherServiceInterface";
import BufferDecoderServiceInterface from "@/services/interfaces/BufferDecoderServiceInterface";

@injectable()
export default abstract class AbstractAudioElement {

    private enabled = false;
    private defaultEnabled = false;

    @inject(TYPES.BufferFetcherService)
        bufferFetcherService: BufferFetcherServiceInterface | null = null;

    @inject(TYPES.BufferDecoderService)
        bufferDecoderService: BufferDecoderServiceInterface | null = null;
    
    @inject(TYPES.ConfigService)
        configService: ConfigService | null = null;

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
}
