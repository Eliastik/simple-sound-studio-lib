[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / AbstractAudioRenderer

# Class: `abstract` AbstractAudioRenderer

Defined in: [filters/interfaces/AbstractAudioRenderer.ts:3](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioRenderer.ts#L3)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Constructors

### new AbstractAudioRenderer()

> **new AbstractAudioRenderer**(): [`AbstractAudioRenderer`](AbstractAudioRenderer.md)

#### Returns

[`AbstractAudioRenderer`](AbstractAudioRenderer.md)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Properties

### bufferDecoderService

> `protected` **bufferDecoderService**: `null` \| `BufferDecoderServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:21](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L21)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`bufferDecoderService`](AbstractAudioElement.md#bufferdecoderservice)

***

### bufferFetcherService

> `protected` **bufferFetcherService**: `null` \| `BufferFetcherServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:18](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L18)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`bufferFetcherService`](AbstractAudioElement.md#bufferfetcherservice)

***

### configService

> `protected` **configService**: `null` \| [`ConfigService`](../interfaces/ConfigService.md) = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L24)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`configService`](AbstractAudioElement.md#configservice)

***

### eventEmitter

> `protected` **eventEmitter**: `null` \| `EventEmitterInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L27)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`eventEmitter`](AbstractAudioElement.md#eventemitter)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioElement.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L33)

Returns the id of this filter/renderer

##### Returns

`string`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioElement.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L30)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

## Methods

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:66](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L66)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`disable`](AbstractAudioElement.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L61)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`enable`](AbstractAudioElement.md#enable)

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

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L41)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isDefaultEnabled`](AbstractAudioElement.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L36)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isEnabled`](AbstractAudioElement.md#isenabled)

***

### renderAudio()

> `abstract` **renderAudio**(`context`, `buffer`): `Promise`\<`AudioBuffer`\>

Defined in: [filters/interfaces/AbstractAudioRenderer.ts:6](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioRenderer.ts#L6)

Render an AudioBuffer based on another input AudioBuffer

#### Parameters

##### context

`BaseAudioContext`

##### buffer

`AudioBuffer`

#### Returns

`Promise`\<`AudioBuffer`\>

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

[`AbstractAudioElement`](AbstractAudioElement.md).[`setDefaultEnabled`](AbstractAudioElement.md#setdefaultenabled)

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:56](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L56)

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

Defined in: [filters/interfaces/AbstractAudioElement.ts:71](https://github.com/Eliastik/simple-sound-studio-lib/blob/8690802f01b749e56e5136b5a5dc05dee7f77984/lib/filters/interfaces/AbstractAudioElement.ts#L71)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`toggle`](AbstractAudioElement.md#toggle)
