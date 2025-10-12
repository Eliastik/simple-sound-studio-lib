/* eslint-disable prefer-destructuring */
import AudioEncoderManagerInterface from "@/encoder/interfaces/AudioEncoderManagerInterface";
import UtilFunctions from "@/utils/Functions";
import { TYPES } from "@/inversify.types";
import RecorderConfig from "@/model/RecorderConfig";
import { getAudioEncoderContainer } from "@/inversify.encoder.config";
import { AudioEncoderFormat } from "@/model/encoder/AudioEncoderFormat";
import Constants from "@/model/Constants";

let recLength = 0,
    recBuffers: Float32Array[][] = [],
    sampleRate: number,
    numChannels: number,
    bitrate: number;

const audioEncoderContainer = getAudioEncoderContainer();
const audioEncoderManager = audioEncoderContainer.get<AudioEncoderManagerInterface>(TYPES.AudioEncoderManager);

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
        buffers.push(UtilFunctions.mergeBuffers(recBuffers[channel]));
    }

    return buffers;
};

const exportAudioToBlob = async (format: AudioEncoderFormat, responseCommand: string, type: string) => {
    const output = await audioEncoderManager.encodeAudio(mergeBuffers(), {
        audioLength: recLength,
        bitrate,
        format,
        numChannels,
        sampleRate
    });

    const audioBlob = new Blob([output], { type });
    self.postMessage({ command: responseCommand, data: audioBlob });
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
        exportAudioToBlob("wav", "exportWAV", Constants.AUDIO_WAV);
        break;
    case "exportMP3":
        exportAudioToBlob("mp3", "exportMP3", Constants.AUDIO_MP3);
        break;
    case "getBuffer":
        getBuffer();
        break;
    case "clear":
        clear();
        break;
    }
};
