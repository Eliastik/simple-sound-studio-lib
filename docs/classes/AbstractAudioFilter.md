[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / AbstractAudioFilter

# Class: `abstract` AbstractAudioFilter

Defined in: [filters/interfaces/AbstractAudioFilter.ts:5](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L5)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Extended by

- [`AbstractAudioFilterWorklet`](AbstractAudioFilterWorklet.md)

## Constructors

### new AbstractAudioFilter()

> **new AbstractAudioFilter**(): [`AbstractAudioFilter`](AbstractAudioFilter.md)

#### Returns

[`AbstractAudioFilter`](AbstractAudioFilter.md)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Properties

### \_totalSamples

> `protected` **\_totalSamples**: `number` = `0`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:11](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L11)

Total sample of the input audio buffer

***

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

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioElement.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L33)

Returns the id of this filter/renderer

##### Returns

`string`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioElement.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L30)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

***

### totalSamples

#### Set Signature

> **set** **totalSamples**(`value`): `void`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L61)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### bufferFetcherReseted()

> **bufferFetcherReseted**(): `Promise`\<`boolean`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:57](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L57)

Called when the buffer fetcher was reseted

#### Returns

`Promise`\<`boolean`\>

boolean

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

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L61)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`enable`](AbstractAudioElement.md#enable)

***

### getAddingTime()

> **getAddingTime**(): `number`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L23)

Get the amount of time this filter add to the audio

#### Returns

`number`

***

### getDefaultSettings()

> **getDefaultSettings**(): `null` \| [`FilterSettings`](../interfaces/FilterSettings.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L33)

Returns the default settings of this filter

#### Returns

`null` \| [`FilterSettings`](../interfaces/FilterSettings.md)

***

### getNode()

> `abstract` **getNode**(`context`): [`AudioFilterNodes`](../interfaces/AudioFilterNodes.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L14)

Return a input and output AudioNode of the filter

#### Parameters

##### context

`BaseAudioContext`

#### Returns

[`AudioFilterNodes`](../interfaces/AudioFilterNodes.md)

***

### getSettings()

> `abstract` **getSettings**(): [`FilterSettings`](../interfaces/FilterSettings.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:17](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L17)

Return an object with current settings of this filter

#### Returns

[`FilterSettings`](../interfaces/FilterSettings.md)

***

### initializeDefaultSettings()

> **initializeDefaultSettings**(): `void`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:28](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L28)

Store the default settings

#### Returns

`void`

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

### isWorklet()

> **isWorklet**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:49](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L49)

Return if the current filter use an audio worklet

#### Returns

`boolean`

***

### resetSettings()

> **resetSettings**(): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L38)

Reset the default settings of this filter

#### Returns

`Promise`\<`void`\>

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

### setSetting()

> `abstract` **setSetting**(`settingId`, `value`): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:20](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioFilter.ts#L20)

Set a filter setting

#### Parameters

##### settingId

`string`

##### value

[`FilterSettingValue`](../type-aliases/FilterSettingValue.md)

#### Returns

`Promise`\<`void`\>

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:71](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L71)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`toggle`](AbstractAudioElement.md#toggle)
