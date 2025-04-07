import { injectable } from "inversify";
import AudioEditorEvents from "../model/AudioEditorEvent";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import EventEmitterInterface from "./interfaces/EventEmitterInterface";

@injectable()
export default class EventEmitter implements EventEmitterInterface {
    listeners: AudioEditorEvents = {};

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: EventEmitterCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event: string, data?: string | number | AudioBuffer) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                callback(data);
            });
        }
    }

    off(event: string, callback: EventEmitterCallback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }
}
