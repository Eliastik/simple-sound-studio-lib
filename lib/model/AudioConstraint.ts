export interface ConstraintULong {
    min?: number,
    max?: number,
    ideal?: number,
    exact?: number;
}

export interface AudioConstraint {
    [key: string]: ConstraintULong | string | number | boolean | undefined,
    noiseSuppression?: boolean,
    echoCancellation?: boolean,
    autoGainControl?: boolean,
    deviceId?: string,
    groupId?: string,
    sampleRate?: ConstraintULong
};
