export default class DelayBuffer {
    private _array: Float32Array = new Float32Array();
    private n: number = 0;
    private length: number = 0;
    private readPointer: number = 0;
    private writePointer: number = 0;

    constructor(n: number) {
        this.n = Math.floor(n);
        this.init();
    }

    init() {
        this._array = new Float32Array(2 * this.n);
        this.length = this._array.length;
        this.readPointer = 0;
        this.writePointer = this.n - 1;
        this._array.fill(0);
    }

    read() {
        const value = this._array[this.readPointer % this.length];
        this.readPointer = (this.readPointer + 1) % this.length;
        return value;
    }

    push(v: number) {
        this._array[this.writePointer % this.length] = v;
        this.writePointer = (this.writePointer + 1) % this.length;
    }

    reset() {
        this.init();
    }

    clear() {
        this._array = new Float32Array();
        this.length = 0;
        this.readPointer = 0;
        this.writePointer = 0;
    }

    sum() {
        return this._array.reduce((a, b) => a + b, 0);
    }
}
