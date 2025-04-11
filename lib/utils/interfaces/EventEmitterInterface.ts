import AudioEditorEvents from "@/model/AudioEditorEvent";
import { EventEmitterCallback } from "@/model/EventEmitterCallback";
import { EventType } from "@/model/EventTypeEnum";

export default interface EventEmitterInterface {

    /**
     * Adds a listener for a specific event.
     *
     * @param event The name of the event to listen for.
     * Can be a predefined {@link EventType} or a custom string.
     * @param callback The callback function to execute when the event is triggered.
     */
    on(event: EventType | string, callback: EventEmitterCallback): void;

    /**
     * Emits an event with optional data.
     *
     * @param event The name of the event to emit.
     * Can be a predefined {@link EventType} or a custom string.
     * @param data (Optional) The data associated with the event,
     * which can be a string, number, AudioBuffer, or Error.
     * @returns A promise that resolves once all listeners have been executed.
     */
    emit(event: EventType | string, data?: string | number | AudioBuffer | Error): Promise<void>;

    /**
     * Removes a listener for a specific event.
     *
     * @param event The name of the event.
     * Can be a predefined {@link EventType} or a custom string.
     * @param callback The callback function to remove from the event.
     */
    off(event: EventType | string, callback: EventEmitterCallback): void;

    /**
     * Gets the current list of events and their listeners.
     */
    get listeners(): AudioEditorEvents;

    /**
     * Sets the list of events and their listeners.
     *
     * @param listeners - The new list of events.
     */
    set listeners(listeners: AudioEditorEvents);
}
