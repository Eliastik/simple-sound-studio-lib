[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioRenderer

# Class: `abstract` AbstractAudioRenderer

Defined in: [filters/interfaces/AbstractAudioRenderer.ts:4](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioRenderer.ts#L4)

## Extends

- [`AbstractAudioNode`](AbstractAudioNode.md)

## Constructors

### Constructor

> **new AbstractAudioRenderer**(): `AbstractAudioRenderer`

#### Returns

`AbstractAudioRenderer`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`constructor`](AbstractAudioNode.md#constructor)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioNode.ts:17](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L17)

Returns the id of this filter/renderer

##### Returns

`string`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`id`](AbstractAudioNode.md#id)

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioNode.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L14)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`order`](AbstractAudioNode.md#order)

## Methods

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:54](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L54)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`disable`](AbstractAudioNode.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:49](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L49)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`enable`](AbstractAudioNode.md#enable)

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/interfaces/AbstractAudioElement.ts#L27)

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

[`AbstractAudioNode`](AbstractAudioNode.md).[`injectDependencies`](AbstractAudioNode.md#injectdependencies)

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioNode.ts:25](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L25)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`isDefaultEnabled`](AbstractAudioNode.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioNode.ts:20](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L20)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`isEnabled`](AbstractAudioNode.md#isenabled)

***

### renderAudio()

> `abstract` **renderAudio**(`context`, `buffer`): `Promise`\<`AudioBuffer`\>

Defined in: [filters/interfaces/AbstractAudioRenderer.ts:7](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioRenderer.ts#L7)

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

Defined in: [filters/interfaces/AbstractAudioNode.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L30)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`setDefaultEnabled`](AbstractAudioNode.md#setdefaultenabled)

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L44)

Set the enabled/disabled state

#### Parameters

##### state

`boolean`

true to enable, false to disable

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`setEnabled`](AbstractAudioNode.md#setenabled)

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:59](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/filters/interfaces/AbstractAudioNode.ts#L59)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`toggle`](AbstractAudioNode.md#toggle)
