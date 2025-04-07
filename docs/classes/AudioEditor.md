[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AudioEditor

# Class: AudioEditor

Defined in: [audioEditor/AudioEditor.ts:28](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L28)

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

Defined in: [audioEditor/AudioEditor.ts:64](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L64)

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

Defined in: [audioEditor/AudioEditor.ts:249](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L249)

Get the index of the current loaded audio file from the file list

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentIndexFileList`

***

### currentSampleRate

#### Get Signature

> **get** **currentSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:125](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L125)

Get the current sample rate used

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentSampleRate`

***

### defaultDeviceSampleRate

#### Get Signature

> **get** **defaultDeviceSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:133](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L133)

Get the default device sample rate

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.defaultDeviceSampleRate`

***

### downloadingInitialData

#### Get Signature

> **get** **downloadingInitialData**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:464](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L464)

##### Returns

`boolean`

#### Set Signature

> **set** **downloadingInitialData**(`state`): `void`

Defined in: [audioEditor/AudioEditor.ts:458](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L458)

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

Defined in: [audioEditor/AudioEditor.ts:253](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L253)

Get the total number of audio files loaded

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.totalFileList`

## Methods

### addFilters()

> **addFilters**(...`filters`): `void`

Defined in: [audioEditor/AudioEditor.ts:113](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L113)

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

Defined in: [audioEditor/AudioEditor.ts:119](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L119)

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

Defined in: [audioEditor/AudioEditor.ts:432](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L432)

Cancel the audio rendering

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.cancelAudioRendering`

***

### changeFilterSettings()

> **changeFilterSettings**(`filterId`, `settings`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:383](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L383)

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

Defined in: [audioEditor/AudioEditor.ts:361](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L361)

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

Defined in: [audioEditor/AudioEditor.ts:350](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L350)

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

Defined in: [audioEditor/AudioEditor.ts:410](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L410)

Exit/reset the audio editor basic state

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.exit`

***

### getCurrentFileList()

> **getCurrentFileList**(): `Map`\<`string`, `boolean`\>

Defined in: [audioEditor/AudioEditor.ts:231](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L231)

#### Returns

`Map`\<`string`, `boolean`\>

Return a map with key = filename and value = true if the audio file is currently loaded, false otherwise

#### Implementation of

`AudioEditorInterface.getCurrentFileList`

***

### getFiltersSettings()

> **getFiltersSettings**(): `Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

Defined in: [audioEditor/AudioEditor.ts:330](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L330)

Get the settings of all filters/renderers

#### Returns

`Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

#### Implementation of

`AudioEditorInterface.getFiltersSettings`

***

### getFiltersState()

> **getFiltersState**(): [`FilterState`](../interfaces/FilterState.md)

Defined in: [audioEditor/AudioEditor.ts:319](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L319)

Get enabled/disabled state of all filters/renderers

#### Returns

[`FilterState`](../interfaces/FilterState.md)

The filters state (enabled/disabled)

#### Implementation of

`AudioEditorInterface.getFiltersState`

***

### getOutputBuffer()

> **getOutputBuffer**(): `null` \| `AudioBuffer`

Defined in: [audioEditor/AudioEditor.ts:270](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L270)

Get the rendered audio buffer

#### Returns

`null` \| `AudioBuffer`

The AudioBuffer

#### Implementation of

`AudioEditorInterface.getOutputBuffer`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/interfaces/AbstractAudioElement.ts#L23)

#### Parameters

##### bufferFetcherService

`null` | `BufferFetcherServiceInterface`

##### bufferDecoderService

`null` | `BufferDecoderServiceInterface`

##### configService

`null` | [`ConfigService`](../interfaces/ConfigService.md)

##### eventEmitter

`null` | `EventEmitterInterface`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### isAudioWorkletAvailable()

> **isAudioWorkletAvailable**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:309](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L309)

Check if AudioWorklet are available

#### Returns

`boolean`

boolean

#### Implementation of

`AudioEditorInterface.isAudioWorkletAvailable`

***

### loadBuffer()

> **loadBuffer**(`audioBuffer`): `void`

Defined in: [audioEditor/AudioEditor.ts:261](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L261)

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

Defined in: [audioEditor/AudioEditor.ts:144](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L144)

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

Defined in: [audioEditor/AudioEditor.ts:183](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L183)

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

Defined in: [audioEditor/AudioEditor.ts:177](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L177)

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

Defined in: [audioEditor/AudioEditor.ts:215](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L215)

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

Defined in: [audioEditor/AudioEditor.ts:199](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L199)

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

Defined in: [audioEditor/AudioEditor.ts:444](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L444)

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

Defined in: [audioEditor/AudioEditor.ts:438](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L438)

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

Defined in: [audioEditor/AudioEditor.ts:338](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L338)

Reconnect the nodes if the compatibility/direct mode is enabled

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.reconnectNodesIfNeeded`

***

### renderAudio()

> **renderAudio**(`forceInitialRendering`?): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:278](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L278)

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

Defined in: [audioEditor/AudioEditor.ts:397](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L397)

Reset all filters/renderers state (enabled/disabled) based on their default states

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.resetAllFiltersState`

***

### resetFilterSettings()

> **resetFilterSettings**(`filterId`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:390](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L390)

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

Defined in: [audioEditor/AudioEditor.ts:450](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L450)

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

Defined in: [audioEditor/AudioEditor.ts:372](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/audioEditor/AudioEditor.ts#L372)

Toggle enabled/disabled state for a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.toggleFilter`
