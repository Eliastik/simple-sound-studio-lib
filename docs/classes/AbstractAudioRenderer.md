[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioRenderer

# Class: `abstract` AbstractAudioRenderer

Defined in: [filters/interfaces/AbstractAudioRenderer.ts:3](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioRenderer.ts#L3)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Constructors

### new AbstractAudioRenderer()

> **new AbstractAudioRenderer**(): [`AbstractAudioRenderer`](AbstractAudioRenderer.md)

#### Returns

[`AbstractAudioRenderer`](AbstractAudioRenderer.md)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioElement.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L33)

Returns the id of this filter/renderer

##### Returns

`string`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioElement.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L30)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

## Methods

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:70](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L70)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`disable`](AbstractAudioElement.md#disable)

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

### renderAudio()

> `abstract` **renderAudio**(`context`, `buffer`): `Promise`\<`AudioBuffer`\>

Defined in: [filters/interfaces/AbstractAudioRenderer.ts:6](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioRenderer.ts#L6)

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
