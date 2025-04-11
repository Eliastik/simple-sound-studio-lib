export type EventEmitterCallback = (data: string | number | AudioBuffer | undefined) => Promise<void> | void;
