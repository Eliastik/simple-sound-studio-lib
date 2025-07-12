import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import AudioEncoderManagerInterface from "./encoder/interfaces/AudioEncoderManagerInterface";
import AbstractAudioEncoder from "./encoder/AbstractAudioEncoder";
import AudioEncoderManager from "./encoder/AudioEncoderManager";
import WAVAudioEncoder from "./encoder/WAVAudioEncoder";
import MP3AudioEncoder from "./encoder/MP3AudioEncoder";

function getAudioEncoderContainer() {
    const audioEncoderContainer = new Container({ defaultScope: "Singleton" });

    audioEncoderContainer.bind<AudioEncoderManagerInterface>(TYPES.AudioEncoderManager).to(AudioEncoderManager);

    audioEncoderContainer.bind<AbstractAudioEncoder>(TYPES.AudioEncoders).to(WAVAudioEncoder);
    audioEncoderContainer.bind<AbstractAudioEncoder>(TYPES.AudioEncoders).to(MP3AudioEncoder);

    return audioEncoderContainer;
}

export { getAudioEncoderContainer };
