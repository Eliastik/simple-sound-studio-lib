[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / BufferPlayer

# Class: BufferPlayer

Defined in: [bufferPlayer/BufferPlayer.ts:31](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L31)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new BufferPlayer()

> **new BufferPlayer**(`contextManager`): [`BufferPlayer`](BufferPlayer.md)

Defined in: [bufferPlayer/BufferPlayer.ts:53](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L53)

#### Parameters

##### contextManager

`undefined` | `null` | `AudioContextManagerInterface`

#### Returns

[`BufferPlayer`](BufferPlayer.md)

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Properties

### compatibilityMode

> **compatibilityMode**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:50](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L50)

Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)

#### Implementation of

`BufferPlayerInterface.compatibilityMode`

***

### currentNode

> **currentNode**: `null` \| `AudioNode` = `null`

Defined in: [bufferPlayer/BufferPlayer.ts:51](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L51)

***

### currentTime

> **currentTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:42](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L42)

***

### displayTime

> **displayTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:43](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L43)

***

### duration

> **duration**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L44)

Set the audio duration

#### Implementation of

`BufferPlayerInterface.duration`

***

### loop

> **loop**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L46)

Set to true to play audio in loop

#### Implementation of

`BufferPlayerInterface.loop`

***

### loopAll

> **loopAll**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:47](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L47)

Is playing all audio list in loop?

#### Implementation of

`BufferPlayerInterface.loopAll`

***

### playing

> **playing**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:45](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L45)

***

### speedAudio

> **speedAudio**: `number` = `1`

Defined in: [bufferPlayer/BufferPlayer.ts:48](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L48)

Set the audio speed

#### Implementation of

`BufferPlayerInterface.speedAudio`

## Accessors

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:292](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L292)

Get the time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.currentTimeDisplay`

***

### maxTimeDisplay

#### Get Signature

> **get** **maxTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:296](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L296)

Get the audio duration in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.maxTimeDisplay`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:300](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L300)

Get the percent played

##### Returns

`number`

#### Implementation of

`BufferPlayerInterface.percent`

***

### remainingTimeDisplay

#### Get Signature

> **get** **remainingTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:304](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L304)

Get the remaining time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.remainingTimeDisplay`

***

### volume

#### Get Signature

> **get** **volume**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:268](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L268)

Set the volume of the audio

##### Returns

`number`

#### Set Signature

> **set** **volume**(`volume`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:257](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L257)

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

> **init**(`direct`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:60](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L60)

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

Defined in: [interfaces/AbstractAudioElement.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/interfaces/AbstractAudioElement.ts#L23)

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

### loadBuffer()

> **loadBuffer**(`buffer`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:88](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L88)

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

Defined in: [bufferPlayer/BufferPlayer.ts:286](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L286)

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

Defined in: [bufferPlayer/BufferPlayer.ts:272](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L272)

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

Defined in: [bufferPlayer/BufferPlayer.ts:220](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L220)

Pause the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.pause`

***

### playDirect()

> **playDirect**(): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:211](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L211)

Play audio directly, without stopping previous audio play

#### Returns

`Promise`\<`void`\>

#### Implementation of

`BufferPlayerInterface.playDirect`

***

### reset()

> **reset**(`direct`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:108](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L108)

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

Defined in: [bufferPlayer/BufferPlayer.ts:95](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L95)

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

Defined in: [bufferPlayer/BufferPlayer.ts:243](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L243)

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

Defined in: [bufferPlayer/BufferPlayer.ts:229](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L229)

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

Defined in: [bufferPlayer/BufferPlayer.ts:151](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L151)

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

Defined in: [bufferPlayer/BufferPlayer.ts:119](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L119)

Stop playing the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.stop`

***

### toggleLoop()

> **toggleLoop**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:276](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L276)

Enable/disable loop playing

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoop`

***

### toggleLoopAll()

> **toggleLoopAll**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:281](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/bufferPlayer/BufferPlayer.ts#L281)

Enable/disable looping all audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoopAll`
