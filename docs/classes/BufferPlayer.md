[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / BufferPlayer

# Class: BufferPlayer

Defined in: [bufferPlayer/BufferPlayer.ts:31](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L31)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new BufferPlayer()

> **new BufferPlayer**(`contextManager`): [`BufferPlayer`](BufferPlayer.md)

Defined in: [bufferPlayer/BufferPlayer.ts:50](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L50)

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

Defined in: [bufferPlayer/BufferPlayer.ts:47](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L47)

Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)

#### Implementation of

`BufferPlayerInterface.compatibilityMode`

***

### currentNode

> **currentNode**: `null` \| `AudioNode` = `null`

Defined in: [bufferPlayer/BufferPlayer.ts:48](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L48)

***

### currentTime

> **currentTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:37](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L37)

***

### displayTime

> **displayTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L38)

***

### duration

> **duration**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:39](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L39)

Set the audio duration

#### Implementation of

`BufferPlayerInterface.duration`

***

### loop

> **loop**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:42](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L42)

Set to true to play audio in loop

#### Implementation of

`BufferPlayerInterface.loop`

***

### loopAll

> **loopAll**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:43](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L43)

Is playing all audio list in loop?

#### Implementation of

`BufferPlayerInterface.loopAll`

***

### playing

> **playing**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L41)

***

### speedAudio

> **speedAudio**: `number` = `1`

Defined in: [bufferPlayer/BufferPlayer.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L44)

Set the audio speed

#### Implementation of

`BufferPlayerInterface.speedAudio`

## Accessors

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:264](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L264)

Get the time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.currentTimeDisplay`

***

### maxTimeDisplay

#### Get Signature

> **get** **maxTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:268](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L268)

Get the audio duration in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.maxTimeDisplay`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:272](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L272)

Get the percent played

##### Returns

`number`

#### Implementation of

`BufferPlayerInterface.percent`

***

### remainingTimeDisplay

#### Get Signature

> **get** **remainingTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:276](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L276)

Get the remaining time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.remainingTimeDisplay`

## Methods

### init()

> **init**(`direct`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:57](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L57)

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

### loadBuffer()

> **loadBuffer**(`buffer`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:75](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L75)

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

Defined in: [bufferPlayer/BufferPlayer.ts:258](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L258)

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

Defined in: [bufferPlayer/BufferPlayer.ts:244](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L244)

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

Defined in: [bufferPlayer/BufferPlayer.ts:207](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L207)

Pause the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.pause`

***

### playDirect()

> **playDirect**(): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:198](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L198)

Play audio directly, without stopping previous audio play

#### Returns

`Promise`\<`void`\>

#### Implementation of

`BufferPlayerInterface.playDirect`

***

### reset()

> **reset**(`direct`?): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:95](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L95)

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

Defined in: [bufferPlayer/BufferPlayer.ts:82](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L82)

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

Defined in: [bufferPlayer/BufferPlayer.ts:230](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L230)

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

Defined in: [bufferPlayer/BufferPlayer.ts:216](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L216)

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

Defined in: [bufferPlayer/BufferPlayer.ts:138](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L138)

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

Defined in: [bufferPlayer/BufferPlayer.ts:106](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L106)

Stop playing the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.stop`

***

### toggleLoop()

> **toggleLoop**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:248](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L248)

Enable/disable loop playing

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoop`

***

### toggleLoopAll()

> **toggleLoopAll**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:253](https://github.com/Eliastik/simple-sound-studio-lib/blob/663925a270924e57c5730bbb254aa7f5b3523775/lib/bufferPlayer/BufferPlayer.ts#L253)

Enable/disable looping all audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoopAll`
