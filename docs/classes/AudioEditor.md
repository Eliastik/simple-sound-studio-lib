[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AudioEditor

# Class: AudioEditor

Defined in: [audioEditor/AudioEditor.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L30)

Principal class used to manage audio processing: load an audio file or buffer,
manage filters/renderers (enable/disable, settings), add new filters/renderers,
download rendered audio, get rendered audio buffer

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new AudioEditor()

> **new AudioEditor**(`filterManager`, `rendererManager`, `contextManager`, `saveBufferManager`, `audioProcessor`, `bufferManager`, `player`): [`AudioEditor`](AudioEditor.md)

Defined in: [audioEditor/AudioEditor.ts:66](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L66)

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

[`AudioEditor`](AudioEditor.md)

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Accessors

### currentIndexFileList

#### Get Signature

> **get** **currentIndexFileList**(): `number`

Defined in: [audioEditor/AudioEditor.ts:252](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L252)

Get the index of the current loaded audio file from the file list

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentIndexFileList`

***

### currentSampleRate

#### Get Signature

> **get** **currentSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:127](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L127)

Get the current sample rate used

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentSampleRate`

***

### defaultDeviceSampleRate

#### Get Signature

> **get** **defaultDeviceSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:135](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L135)

Get the default device sample rate

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.defaultDeviceSampleRate`

***

### downloadingInitialData

#### Get Signature

> **get** **downloadingInitialData**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:457](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L457)

##### Returns

`boolean`

#### Set Signature

> **set** **downloadingInitialData**(`state`): `void`

Defined in: [audioEditor/AudioEditor.ts:451](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L451)

##### Parameters

###### state

`boolean`

##### Returns

`void`

#### Implementation of

`AudioEditorInterface.downloadingInitialData`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [audioEditor/AudioEditor.ts:469](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L469)

Returns the id of this filter/renderer

##### Returns

`string`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### order

#### Get Signature

> **get** **order**(): `number`

Defined in: [audioEditor/AudioEditor.ts:465](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L465)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

***

### totalFileList

#### Get Signature

> **get** **totalFileList**(): `number`

Defined in: [audioEditor/AudioEditor.ts:256](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L256)

Get the total number of audio files loaded

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.totalFileList`

## Methods

### addFilters()

> **addFilters**(...`filters`): `void`

Defined in: [audioEditor/AudioEditor.ts:115](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L115)

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

Defined in: [audioEditor/AudioEditor.ts:121](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L121)

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

Defined in: [audioEditor/AudioEditor.ts:425](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L425)

Cancel the audio rendering

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.cancelAudioRendering`

***

### changeFilterSettings()

> **changeFilterSettings**(`filterId`, `settings`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:386](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L386)

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

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:70](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L70)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`disable`](AbstractAudioElement.md#disable)

***

### disableFilter()

> **disableFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:364](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L364)

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

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:65](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L65)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`enable`](AbstractAudioElement.md#enable)

***

### enableFilter()

> **enableFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:353](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L353)

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

Defined in: [audioEditor/AudioEditor.ts:413](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L413)

Exit/reset the audio editor basic state

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.exit`

***

### getCurrentFileList()

> **getCurrentFileList**(): `Map`\<`string`, `boolean`\>

Defined in: [audioEditor/AudioEditor.ts:234](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L234)

#### Returns

`Map`\<`string`, `boolean`\>

Return a map with key = filename and value = true if the audio file is currently loaded, false otherwise

#### Implementation of

`AudioEditorInterface.getCurrentFileList`

***

### getFiltersSettings()

> **getFiltersSettings**(): `Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

Defined in: [audioEditor/AudioEditor.ts:333](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L333)

Get the settings of all filters/renderers

#### Returns

`Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

#### Implementation of

`AudioEditorInterface.getFiltersSettings`

***

### getFiltersState()

> **getFiltersState**(): [`FilterState`](../interfaces/FilterState.md)

Defined in: [audioEditor/AudioEditor.ts:322](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L322)

Get enabled/disabled state of all filters/renderers

#### Returns

[`FilterState`](../interfaces/FilterState.md)

The filters state (enabled/disabled)

#### Implementation of

`AudioEditorInterface.getFiltersState`

***

### getOutputBuffer()

> **getOutputBuffer**(): `null` \| `AudioBuffer`

Defined in: [audioEditor/AudioEditor.ts:273](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L273)

Get the rendered audio buffer

#### Returns

`null` \| `AudioBuffer`

The AudioBuffer

#### Implementation of

`AudioEditorInterface.getOutputBuffer`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:79](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L79)

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

Defined in: [audioEditor/AudioEditor.ts:312](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L312)

Check if AudioWorklet are available

#### Returns

`boolean`

boolean

#### Implementation of

`AudioEditorInterface.isAudioWorkletAvailable`

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L41)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isDefaultEnabled`](AbstractAudioElement.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L36)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isEnabled`](AbstractAudioElement.md#isenabled)

***

### loadBuffer()

> **loadBuffer**(`audioBuffer`): `void`

Defined in: [audioEditor/AudioEditor.ts:264](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L264)

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

Defined in: [audioEditor/AudioEditor.ts:147](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L147)

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

Defined in: [audioEditor/AudioEditor.ts:186](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L186)

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

Defined in: [audioEditor/AudioEditor.ts:180](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L180)

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

Defined in: [audioEditor/AudioEditor.ts:218](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L218)

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

Defined in: [audioEditor/AudioEditor.ts:202](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L202)

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

Defined in: [audioEditor/AudioEditor.ts:437](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L437)

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

Defined in: [audioEditor/AudioEditor.ts:431](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L431)

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

Defined in: [audioEditor/AudioEditor.ts:341](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L341)

Reconnect the nodes if the compatibility/direct mode is enabled

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.reconnectNodesIfNeeded`

***

### renderAudio()

> **renderAudio**(`forceInitialRendering`?): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:281](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L281)

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

Defined in: [audioEditor/AudioEditor.ts:400](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L400)

Reset all filters/renderers state (enabled/disabled) based on their default states

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.resetAllFiltersState`

***

### resetFilterSettings()

> **resetFilterSettings**(`filterId`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:393](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L393)

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

Defined in: [audioEditor/AudioEditor.ts:443](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L443)

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

### setDefaultEnabled()

> **setDefaultEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L46)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`setDefaultEnabled`](AbstractAudioElement.md#setdefaultenabled)

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:60](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L60)

Set the enabled/disabled state

#### Parameters

##### state

`boolean`

true to enable, false to disable

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`setEnabled`](AbstractAudioElement.md#setenabled)

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:75](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L75)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`toggle`](AbstractAudioElement.md#toggle)

***

### toggleFilter()

> **toggleFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:375](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/audioEditor/AudioEditor.ts#L375)

Toggle enabled/disabled state for a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.toggleFilter`
