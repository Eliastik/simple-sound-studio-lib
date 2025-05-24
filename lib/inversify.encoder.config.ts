import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import AudioEncoderInterface from "./encoder/interfaces/AudioEncoderInterface";
import AbstractAudioEncoder from "./encoder/AbstractAudioEncoder";
import BaseAudioEncoder from "./encoder/BaseAudioEncoder";
import WAVAudioEncoder from "./encoder/WAVAudioEncoder";
import MP3AudioEncoder from "./encoder/MP3AudioEncoder";

function getAudioEncoderContainer() {
    const audioEncoderContainer = new Container({ defaultScope: "Singleton" });

    audioEncoderContainer.bind<AudioEncoderInterface>(TYPES.BaseAudioEncoder).to(BaseAudioEncoder);

    audioEncoderContainer.bind<AbstractAudioEncoder>(TYPES.AudioEncoders).to(WAVAudioEncoder);
    audioEncoderContainer.bind<AbstractAudioEncoder>(TYPES.AudioEncoders).to(MP3AudioEncoder);

    return audioEncoderContainer;
}

export { getAudioEncoderContainer };
