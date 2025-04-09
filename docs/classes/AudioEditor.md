[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AudioEditor

# Class: AudioEditor

Defined in: [audioEditor/AudioEditor.ts:28](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L28)

Principal class used to manage audio processing: load an audio file or buffer,
manage filters/renderers (enable/disable, settings), add new filters/renderers,
download rendered audio, get rendered audio buffer

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### Constructor

> **new AudioEditor**(`filterManager`, `rendererManager`, `contextManager`, `saveBufferManager`, `audioProcessor`, `bufferManager`, `player`): `AudioEditor`

Defined in: [audioEditor/AudioEditor.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L61)

#### Parameters

##### filterManager

`FilterManagerInterface`

##### rendererManager

`RendererManagerInterface`

##### contextManager

`AudioContextManagerInterface`

##### saveBufferManager

`SaveBufferManagerInterface`

##### audioProcessor

`AudioProcessorInterface`

##### bufferManager

`BufferManagerInterface`

##### player

`BufferPlayerInterface`

#### Returns

`AudioEditor`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructor)

## Accessors

### currentIndexFileList

#### Get Signature

> **get** **currentIndexFileList**(): `number`

Defined in: [audioEditor/AudioEditor.ts:248](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L248)

Get the index of the current loaded audio file from the file list

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentIndexFileList`

***

### currentSampleRate

#### Get Signature

> **get** **currentSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:122](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L122)

Get the current sample rate used

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentSampleRate`

***

### defaultDeviceSampleRate

#### Get Signature

> **get** **defaultDeviceSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:130](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L130)

Get the default device sample rate

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.defaultDeviceSampleRate`

***

### downloadingInitialData

#### Get Signature

> **get** **downloadingInitialData**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:470](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L470)

##### Returns

`boolean`

#### Set Signature

> **set** **downloadingInitialData**(`state`): `void`

Defined in: [audioEditor/AudioEditor.ts:464](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L464)

##### Parameters

###### state

`boolean`

##### Returns

`void`

#### Implementation of

`AudioEditorInterface.downloadingInitialData`

***

### totalFileList

#### Get Signature

> **get** **totalFileList**(): `number`

Defined in: [audioEditor/AudioEditor.ts:252](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L252)

Get the total number of audio files loaded

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.totalFileList`

## Methods

### addFilters()

> **addFilters**(...`filters`): `void`

Defined in: [audioEditor/AudioEditor.ts:110](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L110)

Add a new custom filter for this audio editor

#### Parameters

##### filters

...[`AbstractAudioFilter`](AbstractAudioFilter.md)[]

One or more AbstractAudioFilter

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.addFilters`

***

### addRenderers()

> **addRenderers**(...`renderers`): `void`

Defined in: [audioEditor/AudioEditor.ts:116](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L116)

Add a new custom renderer for this audio editor

#### Parameters

##### renderers

...[`AbstractAudioRenderer`](AbstractAudioRenderer.md)[]

One or more AbstractAudioRenderer

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.addRenderers`

***

### cancelAudioRendering()

> **cancelAudioRendering**(): `void`

Defined in: [audioEditor/AudioEditor.ts:438](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L438)

Cancel the audio rendering

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.cancelAudioRendering`

***

### changeFilterSettings()

> **changeFilterSettings**(`filterId`, `settings`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:382](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L382)

Change a filter setting

#### Parameters

##### filterId

`string`

Filter ID

##### settings

[`FilterSettings`](../interfaces/FilterSettings.md)

Filter setting (key/value)

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.changeFilterSettings`

***

### disableFilter()

> **disableFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:360](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L360)

Disable a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.disableFilter`

***

### enableFilter()

> **enableFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:349](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L349)

Enable a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.enableFilter`

***

### exit()

> **exit**(): `void`

Defined in: [audioEditor/AudioEditor.ts:409](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L409)

Exit/reset the audio editor basic state

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.exit`

***

### getCurrentFileList()

> **getCurrentFileList**(): `Map`\<`string`, `boolean`\>

Defined in: [audioEditor/AudioEditor.ts:230](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L230)

#### Returns

`Map`\<`string`, `boolean`\>

Return a map with key = filename and value = true if the audio file is currently loaded, false otherwise

#### Implementation of

`AudioEditorInterface.getCurrentFileList`

***

### getFiltersSettings()

> **getFiltersSettings**(): `Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

Defined in: [audioEditor/AudioEditor.ts:329](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L329)

Get the settings of all filters/renderers

#### Returns

`Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

#### Implementation of

`AudioEditorInterface.getFiltersSettings`

***

### getFiltersState()

> **getFiltersState**(): [`FilterState`](../interfaces/FilterState.md)

Defined in: [audioEditor/AudioEditor.ts:318](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L318)

Get enabled/disabled state of all filters/renderers

#### Returns

[`FilterState`](../interfaces/FilterState.md)

The filters state (enabled/disabled)

#### Implementation of

`AudioEditorInterface.getFiltersState`

***

### getOutputBuffer()

> **getOutputBuffer**(): `null` \| `AudioBuffer`

Defined in: [audioEditor/AudioEditor.ts:269](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L269)

Get the rendered audio buffer

#### Returns

`null` \| `AudioBuffer`

The AudioBuffer

#### Implementation of

`AudioEditorInterface.getOutputBuffer`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`?): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/interfaces/AbstractAudioElement.ts#L27)

#### Parameters

##### bufferFetcherService

`null` | `BufferFetcherServiceInterface`

##### bufferDecoderService

`null` | `BufferDecoderServiceInterface`

##### configService

`null` | [`ConfigService`](../interfaces/ConfigService.md)

##### eventEmitter

`null` | `EventEmitterInterface`

##### contextManager?

`AudioContextManagerInterface`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### isAudioWorkletAvailable()

> **isAudioWorkletAvailable**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:308](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L308)

Check if AudioWorklet are available

#### Returns

`boolean`

boolean

#### Implementation of

`AudioEditorInterface.isAudioWorkletAvailable`

***

### loadBuffer()

> **loadBuffer**(`audioBuffer`): `void`

Defined in: [audioEditor/AudioEditor.ts:260](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L260)

Change the principal audio buffer of this editor

#### Parameters

##### audioBuffer

`AudioBuffer`

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.loadBuffer`

***

### loadBufferFromFile()

> **loadBufferFromFile**(`file`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:141](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L141)

Decode and load an audio buffer from an audio file

#### Parameters

##### file

`File`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.loadBufferFromFile`

***

### loadBufferFromFileListIndex()

> **loadBufferFromFileListIndex**(`index`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:182](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L182)

Load the audio buffer from the nth file from the file list loaded with the loadFileList method

#### Parameters

##### index

`number`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.loadBufferFromFileListIndex`

***

### loadFileList()

> **loadFileList**(`fileList`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:176](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L176)

Load a list of file and load the first file into an audio buffer

#### Parameters

##### fileList

`FileList`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.loadFileList`

***

### loadNextAudio()

> **loadNextAudio**(`forceInitialRendering`?): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:214](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L214)

Load the next audio from list

#### Parameters

##### forceInitialRendering?

`boolean`

true to force initial rendering of audio, ignoring user setting

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.loadNextAudio`

***

### loadPreviousAudio()

> **loadPreviousAudio**(`forceInitialRendering`?): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:198](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L198)

Load the previous audio from list

#### Parameters

##### forceInitialRendering?

`boolean`

true to force initial rendering of audio, ignoring user setting

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.loadPreviousAudio`

***

### off()

> **off**(`event`, `callback`): `void`

Defined in: [audioEditor/AudioEditor.ts:450](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L450)

Unsubscribe to an event

#### Parameters

##### event

`string`

The event ID

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

The callback function

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.off`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [audioEditor/AudioEditor.ts:444](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L444)

Subscribe to an event

#### Parameters

##### event

`string`

The event ID

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

The callback function

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.on`

***

### reconnectNodesIfNeeded()

> **reconnectNodesIfNeeded**(): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:337](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L337)

Reconnect the nodes if the compatibility/direct mode is enabled

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.reconnectNodesIfNeeded`

***

### renderAudio()

> **renderAudio**(`forceInitialRendering`?): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:277](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L277)

Render the audio to a buffer

#### Parameters

##### forceInitialRendering?

`boolean`

true to force initial rendering of audio, ignoring user setting

#### Returns

`Promise`\<`boolean`\>

A promise resolved when the audio processing is finished.
The promise return false if the audio processing was cancelled or if an error occurred.
The resulting audio buffer can then be obtained by using the "getOutputBuffer" method.

#### Implementation of

`AudioEditorInterface.renderAudio`

***

### resetAllFiltersState()

> **resetAllFiltersState**(): `void`

Defined in: [audioEditor/AudioEditor.ts:396](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L396)

Reset all filters/renderers state (enabled/disabled) based on their default states

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.resetAllFiltersState`

***

### resetFilterSettings()

> **resetFilterSettings**(`filterId`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:389](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L389)

Reset the settings of a filter

#### Parameters

##### filterId

`string`

Id of the filter

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.resetFilterSettings`

***

### saveBuffer()

> **saveBuffer**(`options`?): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:456](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L456)

Save the rendered audio to a buffer

#### Parameters

##### options?

[`SaveBufferOptions`](../interfaces/SaveBufferOptions.md)

The save options

#### Returns

`Promise`\<`boolean`\>

A promise resolved when the audio buffer is downloaded to the user

#### Implementation of

`AudioEditorInterface.saveBuffer`

***

### toggleFilter()

> **toggleFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:371](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/audioEditor/AudioEditor.ts#L371)

Toggle enabled/disabled state for a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.toggleFilter`
