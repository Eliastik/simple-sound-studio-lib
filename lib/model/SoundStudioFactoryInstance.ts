import AudioEditorInterface from "@/audioEditor/interfaces/AudioEditorInterface";
import BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";
import { ConfigService } from "@/services/interfaces/ConfigService";
import EventEmitterInterface from "@/utils/interfaces/EventEmitterInterface";
import VoiceRecorderInterface from "@/voiceRecorder/interfaces/VoiceRecorderInterface";

export default interface SoundStudioFactoryInstance {
    audioEditor: AudioEditorInterface;
    voiceRecorder: VoiceRecorderInterface;
    audioPlayer: BufferPlayerInterface;
    eventEmitter: EventEmitterInterface;
    configService: ConfigService;
}
