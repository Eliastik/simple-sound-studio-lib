[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / BufferPlayer

# Class: BufferPlayer

Defined in: [bufferPlayer/BufferPlayer.ts:32](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L32)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new BufferPlayer()

> **new BufferPlayer**(`contextManager`): [`BufferPlayer`](BufferPlayer.md)

Defined in: [bufferPlayer/BufferPlayer.ts:51](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L51)

#### Parameters

##### contextManager

`undefined` | `null` | `AudioContextManagerInterface`

#### Returns

[`BufferPlayer`](BufferPlayer.md)

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

### compatibilityMode

> **compatibilityMode**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:48](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L48)

Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)

#### Implementation of

`BufferPlayerInterface.compatibilityMode`

***

### configService

> `protected` **configService**: `null` \| [`ConfigService`](../interfaces/ConfigService.md) = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L24)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`configService`](AbstractAudioElement.md#configservice)

***

### currentNode

> **currentNode**: `null` \| `AudioNode` = `null`

Defined in: [bufferPlayer/BufferPlayer.ts:49](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L49)

***

### currentTime

> **currentTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L38)

***

### displayTime

> **displayTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:39](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L39)

***

### duration

> **duration**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:40](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L40)

Set the audio duration

#### Implementation of

`BufferPlayerInterface.duration`

***

### eventEmitter

> `protected` **eventEmitter**: `null` \| `EventEmitterInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/filters/interfaces/AbstractAudioElement.ts#L27)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`eventEmitter`](AbstractAudioElement.md#eventemitter)

***

### loop

> **loop**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:43](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L43)

Set to true to play audio in loop

#### Implementation of

`BufferPlayerInterface.loop`

***

### loopAll

> **loopAll**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L44)

Is playing all audio list in loop?

#### Implementation of

`BufferPlayerInterface.loopAll`

***

### playing

> **playing**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:42](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L42)

***

### speedAudio

> **speedAudio**: `number` = `1`

Defined in: [bufferPlayer/BufferPlayer.ts:45](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L45)

Set the audio speed

#### Implementation of

`BufferPlayerInterface.speedAudio`

## Accessors

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:265](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L265)

Get the time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.currentTimeDisplay`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:285](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L285)

Returns the id of this filter/renderer

##### Returns

`string`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### maxTimeDisplay

#### Get Signature

> **get** **maxTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:269](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L269)

Get the audio duration in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.maxTimeDisplay`

***

### order

#### Get Signature

> **get** **order**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:281](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L281)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:273](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L273)

Get the percent played

##### Returns

`number`

#### Implementation of

`BufferPlayerInterface.percent`

***

### remainingTimeDisplay

#### Get Signature

> **get** **remainingTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:277](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L277)

Get the remaining time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.remainingTimeDisplay`

## Methods

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

### init()

> **init**(`direct`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:58](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L58)

Init this buffer player

#### Parameters

##### direct?

`boolean`

Play audio buffer directly without stopping previous play?

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.init`

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

### loadBuffer()

> **loadBuffer**(`buffer`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:76](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L76)

Load an audio buffer

#### Parameters

##### buffer

`AudioBuffer`

The buffer

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.loadBuffer`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:259](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L259)

Observe an event

#### Parameters

##### event

`string`

The event name

##### callback

[`EventEmitterCallback`](../type-aliases/EventEmitterCallback.md)

Callback called when an event of this type occurs

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.on`

***

### onBeforePlaying()

> **onBeforePlaying**(`callback`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:245](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L245)

Callback called just before starting playing the audio

#### Parameters

##### callback

() => `void`

The callback

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.onBeforePlaying`

***

### pause()

> **pause**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:208](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L208)

Pause the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.pause`

***

### playDirect()

> **playDirect**(): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:199](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L199)

Play audio directly, without stopping previous audio play

#### Returns

`Promise`\<`void`\>

#### Implementation of

`BufferPlayerInterface.playDirect`

***

### reset()

> **reset**(`direct`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:96](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L96)

Reset this player

#### Parameters

##### direct?

`boolean`

Play audio buffer directly without stopping previous play?

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.reset`

***

### setCompatibilityMode()

> **setCompatibilityMode**(`currentNode`, `duration`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:83](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L83)

Enable compatibility mode

#### Parameters

##### currentNode

`AudioNode`

Current audio node to read

##### duration?

`number`

The audio duration

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.setCompatibilityMode`

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

### setTime()

> **setTime**(`time`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:231](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L231)

Set the current starting time of this player

#### Parameters

##### time

`number`

Where to start playing, in milliseconds

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.setTime`

***

### setTimePercent()

> **setTimePercent**(`percent`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:217](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L217)

Set the current starting time of this player

#### Parameters

##### percent

`number`

Where to start playing, in percent

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.setTimePercent`

***

### start()

> **start**(`direct`?): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:139](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L139)

Start playing the audio

#### Parameters

##### direct?

`boolean`

Play audio buffer directly without stopping previous play?

#### Returns

`Promise`\<`void`\>

#### Implementation of

`BufferPlayerInterface.start`

***

### stop()

> **stop**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:107](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L107)

Stop playing the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.stop`

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

### toggleLoop()

> **toggleLoop**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:249](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L249)

Enable/disable loop playing

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoop`

***

### toggleLoopAll()

> **toggleLoopAll**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:254](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/bufferPlayer/BufferPlayer.ts#L254)

Enable/disable looping all audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoopAll`
