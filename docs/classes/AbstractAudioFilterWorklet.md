[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / AbstractAudioFilterWorklet

# Class: `abstract` AbstractAudioFilterWorklet\<T\>

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:8](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L8)

## Extends

- [`AbstractAudioFilter`](AbstractAudioFilter.md)

## Type Parameters

• **T**

## Constructors

### new AbstractAudioFilterWorklet()

> **new AbstractAudioFilterWorklet**\<`T`\>(): [`AbstractAudioFilterWorklet`](AbstractAudioFilterWorklet.md)\<`T`\>

#### Returns

[`AbstractAudioFilterWorklet`](AbstractAudioFilterWorklet.md)\<`T`\>

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`constructor`](AbstractAudioFilter.md#constructors)

## Properties

### \_totalSamples

> `protected` **\_totalSamples**: `number` = `0`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:11](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L11)

Total sample of the input audio buffer

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`_totalSamples`](AbstractAudioFilter.md#_totalsamples)

***

### bufferDecoderService

> `protected` **bufferDecoderService**: `null` \| `BufferDecoderServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:21](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L21)

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`bufferDecoderService`](AbstractAudioFilter.md#bufferdecoderservice)

***

### bufferFetcherService

> `protected` **bufferFetcherService**: `null` \| `BufferFetcherServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:18](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L18)

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`bufferFetcherService`](AbstractAudioFilter.md#bufferfetcherservice)

***

### configService

> `protected` **configService**: `null` \| [`ConfigService`](../interfaces/ConfigService.md) = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L24)

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`configService`](AbstractAudioFilter.md#configservice)

***

### currentWorkletNode

> `protected` **currentWorkletNode**: `null` \| `WorkletScriptProcessorNodeAdapter` \| `AudioWorkletNode` = `null`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L10)

***

### eventEmitter

> `protected` **eventEmitter**: `null` \| `EventEmitterInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L27)

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`eventEmitter`](AbstractAudioFilter.md#eventemitter)

***

### fallbackToScriptProcessor

> `protected` **fallbackToScriptProcessor**: `boolean` = `false`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:12](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L12)

***

### keepCurrentNodeIfPossible

> `protected` **keepCurrentNodeIfPossible**: `boolean` = `false`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L14)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioElement.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L33)

Returns the id of this filter/renderer

##### Returns

`string`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`id`](AbstractAudioFilter.md#id)

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioElement.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L30)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`order`](AbstractAudioFilter.md#order)

***

### totalSamples

#### Set Signature

> **set** **totalSamples**(`value`): `void`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L61)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`totalSamples`](AbstractAudioFilter.md#totalsamples)

***

### workletName

#### Get Signature

> **get** `abstract` **workletName**(): `string`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:19](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L19)

Return the worklet name (as registered with method registerProcessor)

##### Returns

`string`

***

### workletPath

#### Get Signature

> **get** `abstract` **workletPath**(): `string`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L24)

Return the path to worklet file

##### Returns

`string`

## Methods

### applyCurrentSettingsToWorklet()

> `protected` **applyCurrentSettingsToWorklet**(): `void`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:94](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L94)

Apply current settings to the audio worklet node.
Uses the getSettings method to extract the settings.

#### Returns

`void`

***

### bufferFetcherReseted()

> **bufferFetcherReseted**(): `Promise`\<`boolean`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:57](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L57)

Called when the buffer fetcher was reseted

#### Returns

`Promise`\<`boolean`\>

boolean

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`bufferFetcherReseted`](AbstractAudioFilter.md#bufferfetcherreseted)

***

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:66](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L66)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`disable`](AbstractAudioFilter.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L61)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`enable`](AbstractAudioFilter.md#enable)

***

### getAddingTime()

> **getAddingTime**(): `number`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L23)

Get the amount of time this filter add to the audio

#### Returns

`number`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`getAddingTime`](AbstractAudioFilter.md#getaddingtime)

***

### getDefaultSettings()

> **getDefaultSettings**(): `null` \| [`FilterSettings`](../interfaces/FilterSettings.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L33)

Returns the default settings of this filter

#### Returns

`null` \| [`FilterSettings`](../interfaces/FilterSettings.md)

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`getDefaultSettings`](AbstractAudioFilter.md#getdefaultsettings)

***

### getNode()

> **getNode**(`context`): \{ `input`: `ScriptProcessorNode`; `output`: `ScriptProcessorNode`; \} \| \{ `input`: `AudioWorkletNode`; `output`: `AudioWorkletNode`; \}

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:110](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L110)

Default implementation for GetNode - AbstractAudioFilterWorklet

#### Parameters

##### context

`BaseAudioContext`

#### Returns

\{ `input`: `ScriptProcessorNode`; `output`: `ScriptProcessorNode`; \} \| \{ `input`: `AudioWorkletNode`; `output`: `AudioWorkletNode`; \}

#### Overrides

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`getNode`](AbstractAudioFilter.md#getnode)

***

### getSettings()

> `abstract` **getSettings**(): [`FilterSettings`](../interfaces/FilterSettings.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:17](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L17)

Return an object with current settings of this filter

#### Returns

[`FilterSettings`](../interfaces/FilterSettings.md)

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`getSettings`](AbstractAudioFilter.md#getsettings)

***

### initializeDefaultSettings()

> **initializeDefaultSettings**(): `void`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:28](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L28)

Store the default settings

#### Returns

`void`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`initializeDefaultSettings`](AbstractAudioFilter.md#initializedefaultsettings)

***

### initializeWorklet()

> **initializeWorklet**(`audioContext`): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:35](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L35)

Initialize the audio worklet by loading the module

#### Parameters

##### audioContext

`BaseAudioContext`

The audio context

#### Returns

`Promise`\<`void`\>

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:75](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L75)

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

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`injectDependencies`](AbstractAudioFilter.md#injectdependencies)

***

### isAudioWorkletEnabled()

> `protected` **isAudioWorkletEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:57](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L57)

This method checks if audio worklet are enabled

#### Returns

`boolean`

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L41)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`isDefaultEnabled`](AbstractAudioFilter.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L36)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`isEnabled`](AbstractAudioFilter.md#isenabled)

***

### isWorklet()

> **isWorklet**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:162](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L162)

Return if the current filter use an audio worklet

#### Returns

`boolean`

#### Overrides

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`isWorklet`](AbstractAudioFilter.md#isworklet)

***

### receiveEvent()

> `abstract` **receiveEvent**(`message`): `void`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:29](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L29)

Receive event from the worklet

#### Parameters

##### message

`MessageEvent`\<`T`\>

#### Returns

`void`

***

### resetSettings()

> **resetSettings**(): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L38)

Reset the default settings of this filter

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`resetSettings`](AbstractAudioFilter.md#resetsettings)

***

### setDefaultEnabled()

> **setDefaultEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L46)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`setDefaultEnabled`](AbstractAudioFilter.md#setdefaultenabled)

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:154](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L154)

Pass the current disabled/enabled state to the worklet.
The worklet need to respond to "enable"/"disable" events.

#### Parameters

##### state

`boolean`

The current disabled/enabled state

#### Returns

`void`

#### Overrides

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`setEnabled`](AbstractAudioFilter.md#setenabled)

***

### setSetting()

> `abstract` **setSetting**(`settingId`, `value`): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:20](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilter.ts#L20)

Set a filter setting

#### Parameters

##### settingId

`string`

##### value

[`FilterSettingValue`](../type-aliases/FilterSettingValue.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`setSetting`](AbstractAudioFilter.md#setsetting)

***

### stop()

> **stop**(): `void`

Defined in: [filters/interfaces/AbstractAudioFilterWorklet.ts:140](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioFilterWorklet.ts#L140)

Stop the current worklet node. The worklet need to respond to "stop" events.

#### Returns

`void`

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:71](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L71)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioFilter`](AbstractAudioFilter.md).[`toggle`](AbstractAudioFilter.md#toggle)
