import AudioEditorEvents from "@/model/AudioEditorEvent";
import { EventEmitterCallback } from "@/model/EventEmitterCallback";

export default interface EventEmitterInterface {
    
    on(event: string, callback: EventEmitterCallback): void;

    emit(event: string, data?: string | number | AudioBuffer | Error): void;

    off(event: string, callback: EventEmitterCallback): void;

    get listeners(): AudioEditorEvents;

    set listeners(listeners: AudioEditorEvents);
}
