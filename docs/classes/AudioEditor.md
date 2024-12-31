[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / AudioEditor

# Class: AudioEditor

Defined in: [audioEditor/AudioEditor.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L24)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new AudioEditor()

> **new AudioEditor**(`filterManager`, `rendererManager`, `contextManager`, `saveBufferManager`, `audioProcessor`, `bufferManager`, `player`): [`AudioEditor`](AudioEditor.md)

Defined in: [audioEditor/AudioEditor.ts:60](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L60)

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

## Properties

### bufferDecoderService

> `protected` **bufferDecoderService**: `null` \| `BufferDecoderServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:21](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L21)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`bufferDecoderService`](AbstractAudioElement.md#bufferdecoderservice)

***

### bufferFetcherService

> `protected` **bufferFetcherService**: `null` \| `BufferFetcherServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:18](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L18)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`bufferFetcherService`](AbstractAudioElement.md#bufferfetcherservice)

***

### configService

> `protected` **configService**: `null` \| [`ConfigService`](../interfaces/ConfigService.md) = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L24)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`configService`](AbstractAudioElement.md#configservice)

***

### eventEmitter

> `protected` **eventEmitter**: `null` \| `EventEmitterInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L27)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`eventEmitter`](AbstractAudioElement.md#eventemitter)

## Accessors

### currentIndexFileList

#### Get Signature

> **get** **currentIndexFileList**(): `number`

Defined in: [audioEditor/AudioEditor.ts:246](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L246)

Get the index of the current loaded audio file from the file list

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentIndexFileList`

***

### currentSampleRate

#### Get Signature

> **get** **currentSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:121](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L121)

Get the current sample rate used

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.currentSampleRate`

***

### defaultDeviceSampleRate

#### Get Signature

> **get** **defaultDeviceSampleRate**(): `number`

Defined in: [audioEditor/AudioEditor.ts:129](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L129)

Get the default device sample rate

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.defaultDeviceSampleRate`

***

### downloadingInitialData

#### Get Signature

> **get** **downloadingInitialData**(): `boolean`

Defined in: [audioEditor/AudioEditor.ts:451](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L451)

##### Returns

`boolean`

#### Set Signature

> **set** **downloadingInitialData**(`state`): `void`

Defined in: [audioEditor/AudioEditor.ts:445](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L445)

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

Defined in: [audioEditor/AudioEditor.ts:463](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L463)

Returns the id of this filter/renderer

##### Returns

`string`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### order

#### Get Signature

> **get** **order**(): `number`

Defined in: [audioEditor/AudioEditor.ts:459](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L459)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

***

### totalFileList

#### Get Signature

> **get** **totalFileList**(): `number`

Defined in: [audioEditor/AudioEditor.ts:250](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L250)

Get the total number of audio files loaded

##### Returns

`number`

#### Implementation of

`AudioEditorInterface.totalFileList`

## Methods

### addFilters()

> **addFilters**(...`filters`): `void`

Defined in: [audioEditor/AudioEditor.ts:109](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L109)

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

Defined in: [audioEditor/AudioEditor.ts:115](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L115)

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

Defined in: [audioEditor/AudioEditor.ts:419](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L419)

Cancel the audio rendering

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.cancelAudioRendering`

***

### changeFilterSettings()

> **changeFilterSettings**(`filterId`, `settings`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:380](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L380)

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

Defined in: [filters/interfaces/AbstractAudioElement.ts:66](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L66)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`disable`](AbstractAudioElement.md#disable)

***

### disableFilter()

> **disableFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:358](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L358)

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

Defined in: [filters/interfaces/AbstractAudioElement.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L61)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`enable`](AbstractAudioElement.md#enable)

***

### enableFilter()

> **enableFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:347](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L347)

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

Defined in: [audioEditor/AudioEditor.ts:407](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L407)

Events and exit

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.exit`

***

### getCurrentFileList()

> **getCurrentFileList**(): `Map`\<`string`, `boolean`\>

Defined in: [audioEditor/AudioEditor.ts:228](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L228)

#### Returns

`Map`\<`string`, `boolean`\>

Return a map with key = filename and value = true if the audio file is currently loaded, false otherwise

#### Implementation of

`AudioEditorInterface.getCurrentFileList`

***

### getFiltersSettings()

> **getFiltersSettings**(): `Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

Defined in: [audioEditor/AudioEditor.ts:327](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L327)

Get the settings of all filters/renderers

#### Returns

`Map`\<`string`, [`FilterSettings`](../interfaces/FilterSettings.md)\>

#### Implementation of

`AudioEditorInterface.getFiltersSettings`

***

### getFiltersState()

> **getFiltersState**(): [`FilterState`](../interfaces/FilterState.md)

Defined in: [audioEditor/AudioEditor.ts:316](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L316)

Filters settings

#### Returns

[`FilterState`](../interfaces/FilterState.md)

#### Implementation of

`AudioEditorInterface.getFiltersState`

***

### getOutputBuffer()

> **getOutputBuffer**(): `null` \| `AudioBuffer`

Defined in: [audioEditor/AudioEditor.ts:267](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L267)

Get the rendered audio buffer

#### Returns

`null` \| `AudioBuffer`

The AudioBuffer

#### Implementation of

`AudioEditorInterface.getOutputBuffer`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:75](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L75)

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

Defined in: [audioEditor/AudioEditor.ts:306](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L306)

Check if AudioWorklet are available

#### Returns

`boolean`

boolean

#### Implementation of

`AudioEditorInterface.isAudioWorkletAvailable`

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L41)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isDefaultEnabled`](AbstractAudioElement.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L36)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isEnabled`](AbstractAudioElement.md#isenabled)

***

### loadBuffer()

> **loadBuffer**(`audioBuffer`): `void`

Defined in: [audioEditor/AudioEditor.ts:258](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L258)

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

Defined in: [audioEditor/AudioEditor.ts:141](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L141)

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

Defined in: [audioEditor/AudioEditor.ts:180](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L180)

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

Defined in: [audioEditor/AudioEditor.ts:174](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L174)

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

Defined in: [audioEditor/AudioEditor.ts:212](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L212)

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

Defined in: [audioEditor/AudioEditor.ts:196](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L196)

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

Defined in: [audioEditor/AudioEditor.ts:431](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L431)

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

Defined in: [audioEditor/AudioEditor.ts:425](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L425)

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

Defined in: [audioEditor/AudioEditor.ts:335](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L335)

Reconnect the nodes if the compatibility/direct mode is enabled

#### Returns

`Promise`\<`void`\>

#### Implementation of

`AudioEditorInterface.reconnectNodesIfNeeded`

***

### renderAudio()

> **renderAudio**(`forceInitialRendering`?): `Promise`\<`boolean`\>

Defined in: [audioEditor/AudioEditor.ts:275](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L275)

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

Defined in: [audioEditor/AudioEditor.ts:394](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L394)

Reset all filters/renderers state (enabled/disabled) based on their default states

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.resetAllFiltersState`

***

### resetFilterSettings()

> **resetFilterSettings**(`filterId`): `Promise`\<`void`\>

Defined in: [audioEditor/AudioEditor.ts:387](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L387)

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

Defined in: [audioEditor/AudioEditor.ts:437](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L437)

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

Defined in: [filters/interfaces/AbstractAudioElement.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L46)

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

Defined in: [filters/interfaces/AbstractAudioElement.ts:56](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L56)

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`setEnabled`](AbstractAudioElement.md#setenabled)

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:71](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L71)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`toggle`](AbstractAudioElement.md#toggle)

***

### toggleFilter()

> **toggleFilter**(`filterId`): `void`

Defined in: [audioEditor/AudioEditor.ts:369](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/audioEditor/AudioEditor.ts#L369)

Toggle enabled/disabled state for a filter/renderer

#### Parameters

##### filterId

`string`

The filter/renderer ID

#### Returns

`void`

#### Implementation of

`AudioEditorInterface.toggleFilter`
