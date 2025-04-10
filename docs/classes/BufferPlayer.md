[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / BufferPlayer

# Class: BufferPlayer

Defined in: [bufferPlayer/BufferPlayer.ts:31](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L31)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### Constructor

> **new BufferPlayer**(`contextManager`): `BufferPlayer`

Defined in: [bufferPlayer/BufferPlayer.ts:53](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L53)

#### Parameters

##### contextManager

`undefined` | `null` | `AudioContextManagerInterface`

#### Returns

`BufferPlayer`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructor)

## Properties

### compatibilityMode

> **compatibilityMode**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:50](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L50)

Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)

#### Implementation of

`BufferPlayerInterface.compatibilityMode`

***

### currentNode

> **currentNode**: `null` \| `AudioNode` = `null`

Defined in: [bufferPlayer/BufferPlayer.ts:51](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L51)

***

### currentTime

> **currentTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:43](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L43)

***

### displayTime

> **displayTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L44)

***

### loop

> **loop**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L46)

Set to true to play audio in loop

#### Implementation of

`BufferPlayerInterface.loop`

***

### loopAll

> **loopAll**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:47](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L47)

Is playing all audio list in loop?

#### Implementation of

`BufferPlayerInterface.loopAll`

***

### playing

> **playing**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:45](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L45)

***

### speedAudio

> **speedAudio**: `number` = `1`

Defined in: [bufferPlayer/BufferPlayer.ts:48](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L48)

Set the audio speed

#### Implementation of

`BufferPlayerInterface.speedAudio`

## Accessors

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:340](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L340)

Get the time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.currentTimeDisplay`

***

### duration

#### Get Signature

> **get** **duration**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:312](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L312)

Set the audio duration

##### Returns

`number`

#### Set Signature

> **set** **duration**(`duration`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:316](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L316)

Set the audio duration

##### Parameters

###### duration

`number`

##### Returns

`void`

#### Implementation of

`BufferPlayerInterface.duration`

***

### maxTimeDisplay

#### Get Signature

> **get** **maxTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:344](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L344)

Get the audio duration in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.maxTimeDisplay`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:348](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L348)

Get the percent played

##### Returns

`number`

#### Implementation of

`BufferPlayerInterface.percent`

***

### remainingTimeDisplay

#### Get Signature

> **get** **remainingTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:352](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L352)

Get the remaining time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.remainingTimeDisplay`

***

### volume

#### Get Signature

> **get** **volume**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:308](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L308)

Set the volume of the audio

##### Returns

`number`

#### Set Signature

> **set** **volume**(`volume`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:297](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L297)

Set the volume of the audio

##### Parameters

###### volume

`number`

##### Returns

`void`

#### Implementation of

`BufferPlayerInterface.volume`

## Methods

### init()

> **init**(`direct?`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:78](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L78)

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

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/interfaces/AbstractAudioElement.ts#L27)

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

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### loadBuffer()

> **loadBuffer**(`buffer`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:123](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L123)

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

Defined in: [bufferPlayer/BufferPlayer.ts:334](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L334)

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

Defined in: [bufferPlayer/BufferPlayer.ts:320](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L320)

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

Defined in: [bufferPlayer/BufferPlayer.ts:260](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L260)

Pause the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.pause`

***

### playDirect()

> **playDirect**(): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:251](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L251)

Play audio directly, without stopping previous audio play

#### Returns

`Promise`\<`void`\>

#### Implementation of

`BufferPlayerInterface.playDirect`

***

### reset()

> **reset**(`direct?`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:143](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L143)

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

> **setCompatibilityMode**(`currentNode`, `duration?`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:130](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L130)

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

### setTime()

> **setTime**(`time`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:283](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L283)

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

Defined in: [bufferPlayer/BufferPlayer.ts:269](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L269)

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

> **start**(`direct?`): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:186](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L186)

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

Defined in: [bufferPlayer/BufferPlayer.ts:154](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L154)

Stop playing the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.stop`

***

### toggleLoop()

> **toggleLoop**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:324](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L324)

Enable/disable loop playing

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoop`

***

### toggleLoopAll()

> **toggleLoopAll**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:329](https://github.com/Eliastik/simple-sound-studio-lib/blob/d94b8862bac18f1ada54e8a1e0a7ef4f520fbc86/lib/bufferPlayer/BufferPlayer.ts#L329)

Enable/disable looping all audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoopAll`
