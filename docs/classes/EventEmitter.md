[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / EventEmitter

# Class: EventEmitter

Defined in: [utils/EventEmitter.ts:7](https://github.com/Eliastik/simple-sound-studio-lib/blob/ac774fbcc31e7b2bb36869a329e7b93025fe1f8e/lib/utils/EventEmitter.ts#L7)

## Implements

- `default`

## Constructors

### Constructor

> **new EventEmitter**(): `EventEmitter`

Defined in: [utils/EventEmitter.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/ac774fbcc31e7b2bb36869a329e7b93025fe1f8e/lib/utils/EventEmitter.ts#L10)

#### Returns

`EventEmitter`

## Properties

### listeners

> **listeners**: `AudioEditorEvents` = `{}`

Defined in: [utils/EventEmitter.ts:8](https://github.com/Eliastik/simple-sound-studio-lib/blob/ac774fbcc31e7b2bb36869a329e7b93025fe1f8e/lib/utils/EventEmitter.ts#L8)

#### Implementation of

`EventEmitterInterface.listeners`

## Methods

### emit()

> **emit**(`event`, `data?`): `void`

Defined in: [utils/EventEmitter.ts:22](https://github.com/Eliastik/simple-sound-studio-lib/blob/ac774fbcc31e7b2bb36869a329e7b93025fe1f8e/lib/utils/EventEmitter.ts#L22)

#### Parameters

##### event

`string`

##### data?

`string` | `number` | `AudioBuffer`

#### Returns

`void`

#### Implementation of

`EventEmitterInterface.emit`

***

### off()

> **off**(`event`, `callback`): `void`

Defined in: [utils/EventEmitter.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/ac774fbcc31e7b2bb36869a329e7b93025fe1f8e/lib/utils/EventEmitter.ts#L30)

#### Parameters

##### event

`string`

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

#### Returns

`void`

#### Implementation of

`EventEmitterInterface.off`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [utils/EventEmitter.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/ac774fbcc31e7b2bb36869a329e7b93025fe1f8e/lib/utils/EventEmitter.ts#L14)

#### Parameters

##### event

`string`

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

#### Returns

`void`

#### Implementation of

`EventEmitterInterface.on`
