[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / EventEmitter

# Class: EventEmitter

Defined in: [utils/EventEmitter.ts:8](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L8)

## Implements

- `default`

## Constructors

### Constructor

> **new EventEmitter**(): `EventEmitter`

Defined in: [utils/EventEmitter.ts:12](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L12)

#### Returns

`EventEmitter`

## Accessors

### listeners

#### Get Signature

> **get** **listeners**(): `AudioEditorEvents`

Defined in: [utils/EventEmitter.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L38)

Gets the current list of events and their listeners.

##### Returns

`AudioEditorEvents`

#### Set Signature

> **set** **listeners**(`events`): `void`

Defined in: [utils/EventEmitter.ts:42](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L42)

Gets the current list of events and their listeners.

##### Parameters

###### events

`AudioEditorEvents`

##### Returns

`void`

#### Implementation of

`EventEmitterInterface.listeners`

## Methods

### emit()

> **emit**(`event`, `data?`): `Promise`\<`void`\>

Defined in: [utils/EventEmitter.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L24)

Emits an event with optional data.

#### Parameters

##### event

`string`

The name of the event to emit.
Can be a predefined [EventType](../enumerations/EventType.md) or a custom string.

##### data?

(Optional) The data associated with the event,
which can be a string, number, AudioBuffer, or Error.

`string` | `number` | `AudioBuffer`

#### Returns

`Promise`\<`void`\>

A promise that resolves once all listeners have been executed.

#### Implementation of

`EventEmitterInterface.emit`

***

### off()

> **off**(`event`, `callback`): `void`

Defined in: [utils/EventEmitter.ts:32](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L32)

Removes a listener for a specific event.

#### Parameters

##### event

`string`

The name of the event.
Can be a predefined [EventType](../enumerations/EventType.md) or a custom string.

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

The callback function to remove from the event.

#### Returns

`void`

#### Implementation of

`EventEmitterInterface.off`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [utils/EventEmitter.ts:16](https://github.com/Eliastik/simple-sound-studio-lib/blob/644508463a58a8a0be6c83a6947a5b631bba11e9/lib/utils/EventEmitter.ts#L16)

Adds a listener for a specific event.

#### Parameters

##### event

`string`

The name of the event to listen for.
Can be a predefined [EventType](../enumerations/EventType.md) or a custom string.

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

The callback function to execute when the event is triggered.

#### Returns

`void`

#### Implementation of

`EventEmitterInterface.on`
