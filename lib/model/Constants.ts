import FilterNames from "./FilterNames";

const Constants = {
    AUDIO_EDITOR: "audioEditor",
    VOICE_RECORDER: "voiceRecorder",
    BUFFER_PLAYER: "bufferPlayer",
    AUDIO_CONTEXT_MANAGER: "audioContextManager",
    AUDIO_PROCESSOR: "audioProcessor",
    BUFFER_MANAGER: "bufferManager",
    FILTER_MANAGER: "filterManager",
    RENDERER_MANAGER: "rendererManager",
    SAVE_BUFFER_MANAGER: "saveBufferManager",
    EXPORT_WAV_COMMAND: "exportWAV",
    EXPORT_MP3_COMMAND: "exportMP3",
    AUDIO_WAV: "audio/wav",
    AUDIO_MP3: "audio/mp3",
    RECORD_COMMAND: "record",
    INIT_COMMAND: "init",
    FILTERS_NAMES: FilterNames,
    WORKLET_PATHS: {
        BITCRUSHER: "BitCrusher.worklet.js",
        LIMITER: "Limiter.worklet.js",
        SOUNDTOUCH: "Soundtouch.worklet.js",
        RECORDER_WORKLET: "RecorderWorklet.js",
        PASSTHROUGH: "Passthrough.worklet.js"
    },
    WORKLET_NAMES: {
        BITCRUSHER: "bitcrusher-processor",
        LIMITER: "limiter-processor",
        SOUNDTOUCH: "soundtouch-processor",
        RECORDER_WORKLET: "recorder-worklet",
        PASSTHROUGH: "passthrough"
    },
    PREFERENCES_KEYS: {
        COMPATIBILITY_MODE_ENABLED: "compatibility-mode-enabled",
        COMPATIBILITY_MODE_CHECKED: "compatibility-mode-checked",
        ENABLE_AUDIO_WORKLET: "enable-audio-worklet",
        ENABLE_SOUNDTOUCH_AUDIO_WORKLET: "enable-soundtouch-audio-worklet",
        BUFFER_SIZE: "buffer-size",
        SAMPLE_RATE: "sample-rate",
        DISABLE_INITIAL_RENDERING: "disable-initial-rendering",
        BITRATE_MP3: "bitrate-mp3"
    },
    // Enable or disable the use of Audio Worklet version of Soundtouch
    // If disabled, the ScriptProcessorNode version is used
    ENABLE_SOUNDTOUCH_AUDIO_WORKLET: true,
    ENABLE_AUDIO_WORKLET: true,
    ENABLE_RECORDER_AUDIO_WORKLET: true,
    SOUNDTOUCH_PITCH_SHIFTER_BUFFER_SIZE: 16384,
    DEFAULT_REVERB_ENVIRONMENT: {
        name: "Medium Damping Cave E002 M2S",
        url: "impulse_response.wav",
        size: 1350278,
        addDuration: 4,
        link: "http://www.cksde.com/p_6_250.htm"
    },
    VOCODER_MODULATOR: "modulator.mp3",
    DEFAULT_BUFFER_SIZE: 0,
    VALID_BUFFER_SIZE: [0, 256, 512, 1024, 2048, 4096, 8192, 16384],
    VALID_MP3_BITRATES: [32, 64, 96, 128, 160, 256, 320],
    DEFAULT_SAMPLE_RATE: 0, // 0 = AUTO
    VALID_SAMPLE_RATES: [0, 8000, 11025, 16000, 22050, 32000, 44100, 48000, 88200, 96000, 176400, 192000],
    // Interval used by the treatment percent counter. The event will be dispatched each ms defined here
    TREATMENT_TIME_COUNTING_THROTTLE_INTERVAL: 100,
    // Smoothing factor for the time couting estimation (between 0 and 1)
    TREATMENT_TIME_COUNTING_SMOOTHING_FACTOR: 0.9,
    // Disable initial rendering (when opening audio file or buffer)
    DISABLE_INITIAL_RENDERING: false,
    // Default save format
    DEFAULT_SAVE_FORMAT: "wav",
    // Default bitrate for the MP3 encoder
    DEFAULT_MP3_BITRATE: 320
};

export default Constants;
