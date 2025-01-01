import { injectable } from "inversify";
import AbstractAudioElement from "@/interfaces/AbstractAudioElement";

@injectable()
export default abstract class AbstractAudioNode extends AbstractAudioElement {

    /** Is this element enabled? */
    private enabled = false;

    /** Is this element enabled by default? */
    private defaultEnabled = false;

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

        if (state) {
            this.enable();
        } else {
            this.disable();
        }
    }

    /**
     * Set the enabled/disabled state
     * @param state true to enable, false to disable
     */
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
