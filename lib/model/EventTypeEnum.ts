export enum EventType {
    LOADING_BUFFERS = "loadingBuffers",
    LOADING_BUFFERS_ERROR = "loadingBuffersError",
    FETCHING_BUFFERS = "fetchingBuffers",
    FETCHING_BUFFERS_ERROR = "fetchingBuffersError",
    FINISHED_FETCHING_BUFFERS = "finishedFetchingBuffers",
    LOADED_BUFFERS = "loadedBuffers",
    COMPATIBILITY_MODE_AUTO_ENABLED = "compatibilityModeAutoEnabled",
    STARTED_RENDERING_AUDIO = "renderingAudio",
    RENDERING_AUDIO_PROBLEM_DETECTED = "renderingAudioProblemDetected",
    AUDIO_RENDERING_FINISHED = "audioRenderingFinished",
    AUDIO_RENDERING_EXCEPTION_THROWN = "audioRenderingExceptionThrown",
    OFFLINE_AUDIO_RENDERING_FINISHED = "offlineAudioRenderingFinished",
    PLAYING_STOPPED = "playingStopped",
    PLAYING_STARTED = "playingStarted",
    PLAYING_FINISHED = "playingFinished",
    PLAYING_UPDATE = "playingUpdate",
    RECORDER_INIT = "recorderInit",
    RECORDER_SUCCESS = "recorderSuccess",
    RECORDER_ERROR = "recorderError",
    RECORDER_UPDATE_CONSTRAINTS = "recorderUpdateConstraints",
    RECORDER_RECORDING = "recorderRecording",
    RECORDER_STOPPED = "recorderStopped",
    RECORDER_PAUSED = "recorderPaused",
    RECORDER_RESETED = "recorderReseted",
    RECORDER_COUNT_UPDATE = "recorderCountUpdate",
    SAMPLE_RATE_CHANGED = "sampleRateChanged",
    DECODING_AUDIO_FILE = "decodingAudioFile",
    DECODED_AUDIO_FILE = "decodedAudioFile",
    ERROR_DECODING_AUDIO_FILE = "errorDecodingAudioFile",
    RECORDER_NOT_FOUND_ERROR = "recorderNotFoundError",
    RECORDER_UNKNOWN_ERROR = "recorderUnknownError",
    UPDATE_AUDIO_TREATMENT_PERCENT = "updateAudioTreatmentPercent",
    UPDATE_REMAINING_TIME_ESTIMATED = "updateRemainingTimeEstimated",
    CANCELLED_AND_LOADED_INITIAL_AUDIO = "cancelledAndLoadedInitialAudio",
    CANCELLING_AUDIO_PROCESSING = "cancellingAudioProcessing",
    PLAYING_FINISHED_LOOP_ALL = "playingFinishedLoopAll",
    LOADED_AUDIO_FILE_FROM_LIST = "loadedAudioFileFromList",
    AUDIO_SPEED_UPDATED = "audioSpeedUpdated",
    AUDIO_DURATION_UPDATED = "audioDurationUpdated"
};
