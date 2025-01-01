[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioNode

# Class: `abstract` AbstractAudioNode

Defined in: [filters/interfaces/AbstractAudioNode.ts:5](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L5)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Extended by

- [`AbstractAudioFilter`](AbstractAudioFilter.md)
- [`AbstractAudioRenderer`](AbstractAudioRenderer.md)

## Constructors

### new AbstractAudioNode()

> **new AbstractAudioNode**(): [`AbstractAudioNode`](AbstractAudioNode.md)

#### Returns

[`AbstractAudioNode`](AbstractAudioNode.md)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioNode.ts:17](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L17)

Returns the id of this filter/renderer

##### Returns

`string`

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioNode.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L14)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

## Methods

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:54](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L54)

Disable this filter/renderer

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:49](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L49)

Enable this filter/renderer

#### Returns

`void`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/interfaces/AbstractAudioElement.ts#L23)

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

Defined in: [filters/interfaces/AbstractAudioNode.ts:25](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L25)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioNode.ts:20](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L20)

Is this filter/renderer enabled?

#### Returns

`boolean`

***

### setDefaultEnabled()

> **setDefaultEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L30)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L44)

Set the enabled/disabled state

#### Parameters

##### state

`boolean`

true to enable, false to disable

#### Returns

`void`

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:59](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/filters/interfaces/AbstractAudioNode.ts#L59)

Toggle to enabled/disabled this filter

#### Returns

`void`