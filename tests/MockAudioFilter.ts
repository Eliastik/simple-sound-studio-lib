import AbstractAudioFilter from "../lib/filters/interfaces/AbstractAudioFilter";
import AbstractAudioFilterWorklet from "../lib/filters/interfaces/AbstractAudioFilterWorklet";
import AudioFilterEntrypointInterface from "../lib/filters/interfaces/AudioFilterEntrypointInterface";
import { AudioFilterNodes } from "../lib/model/AudioNodes";
import { FilterSettings, FilterSettingValue } from "../lib/model/filtersSettings/FilterSettings";
import MockAudioNode from "./MockAudioNode";

export class MockAudioFilter extends AbstractAudioFilter {

    private _order = 1;
    private _name = "mockAudioFilter";
    private _addingTime = 0;
    private _enabled = true;

    protected _node: AudioFilterNodes = {
        input: new MockAudioNode(),
        output: new MockAudioNode(),
        intermediateNodes: [],
    };

    constructor(order: number, name: string, enabled: boolean, addingTime?: number) {
        super();
        this._order = order;
        this._name = name;
        this._enabled = enabled;

        if (addingTime) {
            this._addingTime = addingTime;
        }
    }

    getNode(context: BaseAudioContext): AudioFilterNodes {
        return this._node;
    }

    isEnabled(): boolean {
        return this._enabled;
    }

    enable() {

    }

    disable() {

    }

    isWorklet(): boolean {
        return false;
    }

    getAddingTime(): number {
        return this._addingTime;
    }

    setupTotalSamples(durationAudio: number, currentContext: AudioContext | null) {

    }

    getSettings(): FilterSettings {
        return { };
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        return Promise.resolve();
    }

    get order(): number {
        return this._order;
    }

    get id(): string {
        return this._name;
    }

    get node() {
        return this._node;
    }
}

export class MockEntrypointFilter extends MockAudioFilter implements AudioFilterEntrypointInterface {

    getEntrypointNode(context: BaseAudioContext, buffer: AudioBuffer, offline: boolean): Promise<AudioFilterNodes> {
        return Promise.resolve(this._node);
    }

    getSpeed(): number {
        return 1;
    }

    updateState(): void {
        
    }
}

export class MockAudioFilterWorklet extends AbstractAudioFilterWorklet<void>  {

    private _order = 1;
    private _name = "mockAudioFilter";
    private _addingTime = 0;
    private _enabled = true;

    protected _node: AudioFilterNodes = {
        input: new MockAudioNode(),
        output: new MockAudioNode(),
        intermediateNodes: [],
    };

    constructor(order: number, name: string, enabled: boolean, addingTime?: number) {
        super();
        this._order = order;
        this._name = name;
        this._enabled = enabled;

        if (addingTime) {
            this._addingTime = addingTime;
        }
    }

    get workletName(): string {
        throw new Error("Method not implemented.");
    }

    get workletPath(): string {
        throw new Error("Method not implemented.");
    }
    
    receiveEvent(message: MessageEvent<void>): void {
        throw new Error("Method not implemented.");
    }

    isEnabled(): boolean {
        return this._enabled;
    }

    enable() {

    }

    disable() {

    }

    isWorklet(): boolean {
        return true;
    }

    getAddingTime(): number {
        return this._addingTime;
    }

    setupTotalSamples(durationAudio: number, currentContext: AudioContext | null) {

    }

    getSettings(): FilterSettings {
        return { };
    }

    setSetting(settingId: string, value: FilterSettingValue): Promise<void> {
        return Promise.resolve();
    }

    get order(): number {
        return this._order;
    }

    get id(): string {
        return this._name;
    }

    get node() {
        return this._node;
    }
}
