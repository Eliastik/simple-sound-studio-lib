import { TYPES } from "@/inversify.types";
import AudioEditorInterface from "@/audioEditor/interfaces/AudioEditorInterface";
import { audioEditorContainer } from "@/inversify.config";
import { ConfigService } from "@/services/interfaces/ConfigService";
import VoiceRecorder from "@/VoiceRecorder";
import EventEmitterInterface from "./interfaces/EventEmitterInterface";
import BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";
import GenericConfigService from "@/services/GenericConfigService";

export default class SoundStudioFactory {

    private static voiceRecorder: VoiceRecorder;
    private static ready = false;

    static createAudioEditor(configService?: ConfigService, buffersToFetch?: string[]): AudioEditorInterface {
        if (!SoundStudioFactory.ready) {
            if (configService) {
                audioEditorContainer.bind<ConfigService>(TYPES.ConfigService).toDynamicValue(() => configService);
            } else {
                audioEditorContainer.bind<ConfigService>(TYPES.ConfigService).to(GenericConfigService);
                console.warn("No ConfigService provided. Using default generic implementation.");
            }
    
            audioEditorContainer.bind<string[]>(TYPES.AudioBuffersToFetch).toConstantValue(buffersToFetch || []);
            SoundStudioFactory.ready = true;
        }

        return audioEditorContainer.get<AudioEditorInterface>(TYPES.AudioEditor);
    }

    static createVoiceRecorder(): VoiceRecorder {
        SoundStudioFactory.voiceRecorder = new VoiceRecorder(null, audioEditorContainer.get<EventEmitterInterface>(TYPES.EventEmitter), audioEditorContainer.get<ConfigService>(TYPES.ConfigService));
        return SoundStudioFactory.voiceRecorder;
    }

    static getAudioEditorInstance(): AudioEditorInterface | null {
        return audioEditorContainer.get<AudioEditorInterface>(TYPES.AudioEditor);
    }

    static getAudioPlayerInstance(): BufferPlayerInterface | null {
        return audioEditorContainer.get<BufferPlayerInterface>(TYPES.BufferPlayer);
    }

    static getAudioRecorderInstance(): VoiceRecorder | null {
        return SoundStudioFactory.voiceRecorder;
    }

    static getEventEmitterInstance(): EventEmitterInterface | null {
        return audioEditorContainer.get<EventEmitterInterface>(TYPES.EventEmitter);
    }

    static getConfigServiceInstance(): ConfigService | undefined {
        return audioEditorContainer.get<ConfigService>(TYPES.ConfigService);
    }
}
