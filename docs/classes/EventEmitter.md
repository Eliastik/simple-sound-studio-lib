[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / EventEmitter

# Class: EventEmitter

Defined in: [utils/EventEmitter.ts:7](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/utils/EventEmitter.ts#L7)

## Implements

- `default`

## Constructors

### new EventEmitter()

> **new EventEmitter**(): [`EventEmitter`](EventEmitter.md)

Defined in: [utils/EventEmitter.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/utils/EventEmitter.ts#L10)

#### Returns

[`EventEmitter`](EventEmitter.md)

## Properties

### listeners

> **listeners**: `AudioEditorEvents` = `{}`

Defined in: [utils/EventEmitter.ts:8](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/utils/EventEmitter.ts#L8)

#### Implementation of

`EventEmitterInterface.listeners`

## Methods

### emit()

> **emit**(`event`, `data`?): `void`

Defined in: [utils/EventEmitter.ts:21](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/utils/EventEmitter.ts#L21)

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

Defined in: [utils/EventEmitter.ts:29](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/utils/EventEmitter.ts#L29)

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

Defined in: [utils/EventEmitter.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/utils/EventEmitter.ts#L14)

#### Parameters

##### event

`string`

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

#### Returns

`void`

#### Implementation of

`EventEmitterInterface.on`
