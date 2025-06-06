import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./inversify.types";
import AudioContextManagerInterface from "./audioEditor/interfaces/AudioContextManagerInterface";
import AudioContextManager from "./audioEditor/AudioContextManager";
import AudioEditorInterface from "./audioEditor/interfaces/AudioEditorInterface";
import AudioProcessorInterface from "./audioEditor/interfaces/AudioProcessorInterface";
import BufferManagerInterface from "./audioEditor/interfaces/BufferManagerInterface";
import FilterManagerInterface from "./audioEditor/interfaces/FilterManagerInterface";
import RendererManagerInterface from "./audioEditor/interfaces/RendererManagerInterface";
import SaveBufferManagerInterface from "./audioEditor/interfaces/SaveBufferManagerInteface";
import AudioEditor from "./audioEditor/AudioEditor";
import AudioProcessor from "./audioEditor/AudioProcessor";
import BufferManager from "./audioEditor/BufferManager";
import FilterManager from "./audioEditor/FilterManager";
import RendererManager from "./audioEditor/RendererManager";
import SaveBufferManager from "./audioEditor/SaveBufferManager";
import EventEmitterInterface from "./utils/interfaces/EventEmitterInterface";
import EventEmitter from "./utils/EventEmitter";
import BufferPlayerInterface from "./bufferPlayer/interfaces/BufferPlayerInterface";
import BufferPlayer from "./bufferPlayer/BufferPlayer";
import BufferFetcherServiceInterface from "./services/interfaces/BufferFetcherServiceInterface";
import BufferDecoderServiceInterface from "./services/interfaces/BufferDecoderServiceInterface";
import BufferFetcherService from "./services/BufferFetcherService";
import BufferDecoderService from "./services/BufferDecoderService";
import AbstractAudioRenderer from "./filters/interfaces/AbstractAudioRenderer";
import ReturnAudioRenderer from "./filters/ReturnAudioRenderer";
import BassBoosterFilter from "./filters/BassBoosterFilter";
import BitCrusherFilter from "./filters/BitCrusherFilter";
import EchoFilter from "./filters/EchoFilter";
import HighPassFilter from "./filters/HighPassFilter";
import LimiterFilter from "./filters/LimiterFilter";
import LowPassFilter from "./filters/LowPassFilter";
import ReverbFilter from "./filters/ReverbFilter";
import SoundtouchWrapperFilter from "./filters/SountouchWrapperFilter";
import TelephonizerFilter from "./filters/TelephonizerFilter";
import VocoderFilter from "./filters/VocoderFilter";
import RenderingProgressCalculationFilter from "./filters/RenderingProgressCalculationFilter";
import AbstractAudioFilter from "./filters/interfaces/AbstractAudioFilter";
import AudioFilterEntrypointInterface from "./filters/interfaces/AudioFilterEntrypointInterface";
import VoiceRecorderInterface from "./voiceRecorder/interfaces/VoiceRecorderInterface";
import VoiceRecorder from "./voiceRecorder/VoiceRecorder";

function getAudioEditorContainer() {
    const audioEditorContainer = new Container({ defaultScope: "Singleton" });

    // Entrypoint filter
    audioEditorContainer.bind<AudioFilterEntrypointInterface>(TYPES.EntryPointFilter).to(SoundtouchWrapperFilter);

    // Renderers
    audioEditorContainer.bind<AbstractAudioRenderer>(TYPES.Renderers).to(ReturnAudioRenderer);

    // Filters
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).toDynamicValue(() => audioEditorContainer.get<AbstractAudioFilter>(TYPES.EntryPointFilter));
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(BassBoosterFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(BitCrusherFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(EchoFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(HighPassFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(LimiterFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(LowPassFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(ReverbFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(TelephonizerFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(VocoderFilter);
    audioEditorContainer.bind<AbstractAudioFilter>(TYPES.Filters).to(RenderingProgressCalculationFilter);

    // Services
    audioEditorContainer.bind<EventEmitterInterface>(TYPES.EventEmitter).to(EventEmitter);
    audioEditorContainer.bind<AudioContextManagerInterface>(TYPES.AudioContextManager).to(AudioContextManager);
    audioEditorContainer.bind<AudioEditorInterface>(TYPES.AudioEditor).to(AudioEditor);
    audioEditorContainer.bind<AudioProcessorInterface>(TYPES.AudioProcessor).to(AudioProcessor);
    audioEditorContainer.bind<BufferManagerInterface>(TYPES.BufferManager).to(BufferManager);
    audioEditorContainer.bind<FilterManagerInterface>(TYPES.FilterManager).to(FilterManager);
    audioEditorContainer.bind<RendererManagerInterface>(TYPES.RendererManager).to(RendererManager);
    audioEditorContainer.bind<SaveBufferManagerInterface>(TYPES.SaveBufferManager).to(SaveBufferManager);
    audioEditorContainer.bind<BufferPlayerInterface>(TYPES.BufferPlayer).to(BufferPlayer);
    audioEditorContainer.bind<BufferFetcherServiceInterface>(TYPES.BufferFetcherService).to(BufferFetcherService);
    audioEditorContainer.bind<BufferDecoderServiceInterface>(TYPES.BufferDecoderService).to(BufferDecoderService);
    audioEditorContainer.bind<VoiceRecorderInterface>(TYPES.VoiceRecorder).to(VoiceRecorder);

    return audioEditorContainer;
}

export { getAudioEditorContainer };
