[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AudioEditor

# Class: AudioEditor

Defined in: [audioEditor/AudioEditor.ts:29](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L29)

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

Defined in: [audioEditor/AudioEditor.ts:62](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L62)

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

Defined in: [audioEditor/AudioEditor.ts:250](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L250)

Get the index of the current loaded audio file from the file list

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentIndexFileList`

***

### currentSampleRate

#### Get Signature

> **get** **currentSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:124](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L124)

Get the current sample rate used

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentSampleRate`

***

### defaultDeviceSampleRate

#### Get Signature

> **get** **defaultDeviceSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:132](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L132)

Get the default device sample rate

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.defaultDeviceSampleRate`

***

### downloadingInitialData

#### Get Signature

> **get** **downloadingInitialData**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:475](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L475)

##### Returns

`boolean`

#### Set Signature

> **set** **downloadingInitialData**(`state`): `void`

Defined in: [audioEditor/AudioEditor.ts:469](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L469)

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

Defined in: [audioEditor/AudioEditor.ts:254](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L254)

Get the total number of audio files loaded

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.totalFileList`

## Methods

### addFilters()

> **addFilters**(...`filters`): `void`

Defined in: [audioEditor/AudioEditor.ts:112](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L112)

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

Defined in: [audioEditor/AudioEditor.ts:118](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L118)

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

Defined in: [audioEditor/AudioEditor.ts:443](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L443)

Cancel the audio rendering

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.cancelAudioRendering`

***

### changeFilterSettings()

> **changeFilterSettings**(`filterId`, `settings`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:387](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L387)

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

Defined in: [audioEditor/AudioEditor.ts:365](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L365)

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

Defined in: [audioEditor/AudioEditor.ts:354](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L354)

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

Defined in: [audioEditor/AudioEditor.ts:414](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L414)

Exit/reset the audio editor basic state

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.exit`

***

### getCurrentFileList()

> **getCurrentFileList**(): `Map`\<`string`, `boolean`\>

Defined in: [audioEditor/AudioEditor.ts:232](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L232)

#### Returns

`Map`\<`string`, `boolean`\>

Return a map with key = filename and value = true if the audio file is currently loaded, false otherwise

#### Implementation of

`AudioEditorInterface.getCurrentFileList`

***

### getFiltersSettings()

> **getFiltersSettings**(): `Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

Defined in: [audioEditor/AudioEditor.ts:331](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L331)

Get the settings of all filters/renderers

#### Returns

`Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

#### Implementation of

`AudioEditorInterface.getFiltersSettings`

***

### getFiltersState()

> **getFiltersState**(): [`FilterState`](../interfaces/FilterState.md)

Defined in: [audioEditor/AudioEditor.ts:320](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L320)

Get enabled/disabled state of all filters/renderers

#### Returns

[`FilterState`](../interfaces/FilterState.md)

The filters state (enabled/disabled)

#### Implementation of

`AudioEditorInterface.getFiltersState`

***

### getOutputBuffer()

> **getOutputBuffer**(): `null` \| `AudioBuffer`

Defined in: [audioEditor/AudioEditor.ts:271](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L271)

Get the rendered audio buffer

#### Returns

`null` \| `AudioBuffer`

The AudioBuffer

#### Implementation of

`AudioEditorInterface.getOutputBuffer`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/interfaces/AbstractAudioElement.ts#L27)

#### Parameters

##### bufferFetcherService

`null` | `BufferFetcherServiceInterface`

##### bufferDecoderService

`null` | `BufferDecoderServiceInterface`

##### configService

`null` | [`ConfigService`](../interfaces/ConfigService.md)

##### eventEmitter

`null` | `EventEmitterInterface`

##### contextManager

`null` | `AudioContextManagerInterface`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### isAudioWorkletAvailable()

> **isAudioWorkletAvailable**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:310](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L310)

Check if AudioWorklet are available

#### Returns

`boolean`

boolean

#### Implementation of

`AudioEditorInterface.isAudioWorkletAvailable`

***

### loadBuffer()

> **loadBuffer**(`audioBuffer`): `void`

Defined in: [audioEditor/AudioEditor.ts:262](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L262)

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

Defined in: [audioEditor/AudioEditor.ts:143](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L143)

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

Defined in: [audioEditor/AudioEditor.ts:184](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L184)

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

Defined in: [audioEditor/AudioEditor.ts:178](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L178)

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

> **loadNextAudio**(`forceInitialRendering?`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:216](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L216)

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

> **loadPreviousAudio**(`forceInitialRendering?`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:200](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L200)

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

### ~~off()~~

> **off**(`event`, `callback`): `void`

Defined in: [audioEditor/AudioEditor.ts:455](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L455)

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

#### Deprecated

Will be removed in a future release, use the EventEmitter.off method instead.

#### Implementation of

`AudioEditorInterface.off`

***

### ~~on()~~

> **on**(`event`, `callback`): `void`

Defined in: [audioEditor/AudioEditor.ts:449](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L449)

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

#### Deprecated

Will be removed in a future release, use the EventEmitter.on method instead.

#### Implementation of

`AudioEditorInterface.on`

***

### reconnectNodesIfNeeded()

> **reconnectNodesIfNeeded**(): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:339](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L339)

Reconnect the nodes if the compatibility/direct mode is enabled

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.reconnectNodesIfNeeded`

***

### renderAudio()

> **renderAudio**(`forceInitialRendering?`): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:279](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L279)

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

Defined in: [audioEditor/AudioEditor.ts:401](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L401)

Reset all filters/renderers state (enabled/disabled) based on their default states

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.resetAllFiltersState`

***

### resetFilterSettings()

> **resetFilterSettings**(`filterId`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:394](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L394)

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

> **saveBuffer**(`options?`): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:461](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L461)

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

### setup()

> **setup**(): `void`

Defined in: [audioEditor/AudioEditor.ts:83](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L83)

#### Returns

`void`

***

### toggleFilter()

> **toggleFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:376](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/audioEditor/AudioEditor.ts#L376)

Toggle enabled/disabled state for a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.toggleFilter`
