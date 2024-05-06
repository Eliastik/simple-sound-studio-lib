const TYPES = {
    AudioContextManager: Symbol.for("AudioContextManager"),
    AudioEditor: Symbol.for("AudioEditor"),
    AudioProcessor: Symbol.for("AudioProcessor"),
    BufferManager: Symbol.for("BufferManager"),
    FilterManager: Symbol.for("FilterManager"),
    RendererManager: Symbol.for("RendererManager"),
    SaveBufferManager: Symbol.for("SaveBufferManager"),
    ConfigService: Symbol.for("ConfigService"),
    EventEmitter: Symbol.for("EventEmitter"),
    BufferPlayer: Symbol.for("BufferPlayer"),
    BufferDecoderService: Symbol.for("BufferDecoderService"),
    BufferFetcherService: Symbol.for("BufferFetcherService"),
    AudioBuffersToFetch: Symbol.for("AudioBuffersToFetch"),
    Renderers: Symbol.for("Renderers"),
    Filters: Symbol.for("Filters"),
    EntryPointFilter: Symbol.for("EntryPointFilter")
};

export { TYPES };
