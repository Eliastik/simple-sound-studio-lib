/* eslint-disable prefer-destructuring */
import AudioEncoderInterface from "@/encoder/interfaces/AudioEncoderInterface";
import UtilFunctions from "@/utils/Functions";
import { getAudioEditorContainer } from "@/inversify.config";
import { TYPES } from "@/inversify.types";
import RecorderConfig from "@/model/RecorderConfig";

let recLength = 0,
    recBuffers: Float32Array[][] = [],
    sampleRate: number,
    numChannels: number,
    bitrate: number;

const audioEditorContainer = getAudioEditorContainer();
const baseAudioEncoder = audioEditorContainer.get<AudioEncoderInterface>(TYPES.BaseAudioEncoder);

const initBuffers = () => {
    for (let channel = 0; channel < numChannels; channel++) {
        recBuffers[channel] = [];
    }
};

const init = (config: RecorderConfig) => {
    sampleRate = config.sampleRate;
    numChannels = config.numChannels;
    bitrate = config.bitrate || 128;
    initBuffers();
};

const record = (inputBuffer: Float32Array[]) => {
    for (let channel = 0; channel < numChannels; channel++) {
        recBuffers[channel].push(inputBuffer[channel]);
    }
    recLength += inputBuffer[0].length;
};

const mergeBuffers = () => {
    const buffers = [];
    for (let channel = 0; channel < numChannels; channel++) {
        buffers.push(UtilFunctions.mergeBuffers(recBuffers[channel], recLength));
    }
    return buffers;
};

const exportWAV = async (type: string) => {
    const output = await baseAudioEncoder.encodeAudio(mergeBuffers(), {
        audioLength: recLength,
        format: "wav",
        numChannels,
        sampleRate
    });

    const audioBlob = new Blob([output], { type });
    self.postMessage({ command: "exportWAV", data: audioBlob });
};

const exportMP3 = async (type: string) => {
    const output = await baseAudioEncoder.encodeAudio(mergeBuffers(), {
        audioLength: recLength,
        bitrate,
        format: "wav",
        numChannels,
        sampleRate
    });

    const audioBlob = new Blob([output], { type });
    self.postMessage({ command: "exportMP3", data: audioBlob });
};

const getBuffer = () => {
    const buffers = mergeBuffers();
    self.postMessage({ command: "getBuffer", data: buffers });
};

const clear = () => {
    recLength = 0;
    recBuffers = [];
    initBuffers();
};

self.onmessage = function (e) {
    switch (e.data.command) {
    case "init":
        init(e.data.config);
        break;
    case "record":
        record(e.data.buffer);
        break;
    case "exportWAV":
        exportWAV(e.data.type);
        break;
    case "exportMP3":
        exportMP3(e.data.type);
        break;
    case "getBuffer":
        getBuffer();
        break;
    case "clear":
        clear();
        break;
    }
};
