import { injectable } from "inversify";
import AudioEditorEvents from "../model/AudioEditorEvent";
import { EventEmitterCallback } from "../model/EventEmitterCallback";
import EventEmitterInterface from "./interfaces/EventEmitterInterface";
import { EventType } from "@/model/EventTypeEnum";

@injectable()
export default class EventEmitter implements EventEmitterInterface {

    private _listeners: AudioEditorEvents = {};

    constructor() {
        this._listeners = {};
    }

    on(event: EventType | string, callback: EventEmitterCallback) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    async emit(event: EventType | string, data?: string | number | AudioBuffer) {
        if (this._listeners[event]) {
            for (const callback of this._listeners[event]) {
                await callback(data);
            }
        }
    }

    off(event: EventType | string, callback: EventEmitterCallback) {
        if (this._listeners[event]) {
            this._listeners[event] = this._listeners[event].filter(cb => cb !== callback);
        }
    }

    get listeners() {
        return this._listeners;
    }

    set listeners(events: AudioEditorEvents) {
        this._listeners = events;
    }
}
