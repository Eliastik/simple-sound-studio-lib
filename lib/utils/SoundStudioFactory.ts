import { TYPES } from "@/inversify.types";
import AudioEditorInterface from "@/audioEditor/interfaces/AudioEditorInterface";
import { getAudioEditorContainer } from "@/inversify.config";
import { ConfigService } from "@/services/interfaces/ConfigService";
import EventEmitterInterface from "./interfaces/EventEmitterInterface";
import BufferPlayerInterface from "@/bufferPlayer/interfaces/BufferPlayerInterface";
import GenericConfigService from "@/services/GenericConfigService";
import VoiceRecorderInterface from "@/voiceRecorder/interfaces/VoiceRecorderInterface";
import SoundStudioFactoryNewInstanceOptions from "@/model/SoundStudioFactoryNewInstanceOptions";
import SoundStudioFactoryInstance from "@/model/SoundStudioFactoryInstance";

/**
 * Factory class to create instances of sound studio components.
 *
 * This factory supports both singleton-based methods (deprecated) and a new
 * instance-based creation model. The singleton methods will be removed in a
 * future release.
 */
export default class SoundStudioFactory {

    private static ready = false;

    // Singletons (remove when removing deprecated methods)
    private static audioEditor: AudioEditorInterface | null = null;
    private static audioPlayer: BufferPlayerInterface | null = null;
    private static configService: ConfigService | null = null;
    private static eventEmitter: EventEmitterInterface | null = null;
    private static voiceRecorder: VoiceRecorderInterface | null = null;

    /**
     * Create a new instance of sound studio components.
     *
     * @param options Optional configuration for the new instance. See SoundStudioFactoryNewInstanceOptions
     * @returns A new instance of the sound studio components. See SoundStudioFactoryInstance
     */
    static createNewInstance(options?: SoundStudioFactoryNewInstanceOptions): SoundStudioFactoryInstance {
        const audioEditorContainer = getAudioEditorContainer();

        if (options && options.configService) {
            audioEditorContainer.bind<ConfigService>(TYPES.ConfigService).toDynamicValue(() => options.configService!);
        } else {
            audioEditorContainer.bind<ConfigService>(TYPES.ConfigService).to(GenericConfigService);
            console.warn("No ConfigService provided. Using default generic implementation.");
        }

        audioEditorContainer.bind<string[]>(TYPES.AudioBuffersToFetch).toConstantValue((options && options.buffersToFetch) || []);

        return {
            audioEditor: audioEditorContainer.get<AudioEditorInterface>(TYPES.AudioEditor),
            audioPlayer: audioEditorContainer.get<BufferPlayerInterface>(TYPES.BufferPlayer),
            configService: audioEditorContainer.get<ConfigService>(TYPES.ConfigService),
            eventEmitter: audioEditorContainer.get<EventEmitterInterface>(TYPES.EventEmitter),
            voiceRecorder: audioEditorContainer.get<VoiceRecorderInterface>(TYPES.VoiceRecorder)
        };
    }

    /**
     * Create a singleton AudioEditor instance.
     *
     * @param configService Optional configuration service.
     * @param buffersToFetch Optional list of audio buffers to pre-fetch.
     * @returns The singleton AudioEditor instance.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static createAudioEditor(configService?: ConfigService, buffersToFetch?: string[]): AudioEditorInterface {
        console.warn("[DEPRECATED] SoundStudioFactory.createAudioEditor is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        if (!SoundStudioFactory.ready) {
            const instance = SoundStudioFactory.createNewInstance({ configService, buffersToFetch });

            SoundStudioFactory.audioEditor = instance.audioEditor;
            SoundStudioFactory.audioPlayer = instance.audioPlayer;
            SoundStudioFactory.configService = instance.configService;
            SoundStudioFactory.eventEmitter = instance.eventEmitter;
            SoundStudioFactory.voiceRecorder = instance.voiceRecorder;

            SoundStudioFactory.ready = true;
        }

        return SoundStudioFactory.audioEditor!;
    }

    /**
     * Create a singleton VoiceRecorder instance.
     *
     * @returns The singleton VoiceRecorder instance.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static createVoiceRecorder(): VoiceRecorderInterface {
        console.warn("[DEPRECATED] SoundStudioFactory.createVoiceRecorder is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        return SoundStudioFactory.voiceRecorder!;
    }

    /**
     * Get the singleton AudioEditor instance.
     *
     * @returns The singleton AudioEditor instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getAudioEditorInstance(): AudioEditorInterface | null {
        console.warn("[DEPRECATED] SoundStudioFactory.getAudioEditorInstance is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        return SoundStudioFactory.audioEditor!;
    }

    /**
     * Get the singleton BufferPlayer instance.
     *
     * @returns The singleton BufferPlayer instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getAudioPlayerInstance(): BufferPlayerInterface | null {
        console.warn("[DEPRECATED] SoundStudioFactory.getAudioPlayerInstance is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        return SoundStudioFactory.audioPlayer!;
    }

    /**
     * Get the singleton VoiceRecorder instance.
     *
     * @returns The singleton VoiceRecorder instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getAudioRecorderInstance(): VoiceRecorderInterface | null {
        console.warn("[DEPRECATED] SoundStudioFactory.getAudioRecorderInstance is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        return SoundStudioFactory.voiceRecorder!;
    }

    /**
     * Get the singleton EventEmitter instance.
     *
     * @returns The singleton EventEmitter instance, or null if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getEventEmitterInstance(): EventEmitterInterface | null {
        console.warn("[DEPRECATED] SoundStudioFactory.getEventEmitterInstance is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        return SoundStudioFactory.eventEmitter!;
    }

    /**
     * Get the singleton ConfigService instance.
     *
     * @returns The singleton ConfigService instance, or undefined if not initialized.
     * @deprecated This method is deprecated. Use createNewInstance instead.
     */
    static getConfigServiceInstance(): ConfigService | undefined {
        console.warn("[DEPRECATED] SoundStudioFactory.getConfigServiceInstance is deprecated and "
            + "will be removed in a future release of simple-sound-studio-lib. " +
            "Please use SoundStudioFactory.createNewInstance instead, which doesn't work as a singleton.");

        return SoundStudioFactory.configService!;
    }
}
