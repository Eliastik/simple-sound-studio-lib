[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / BufferPlayer

# Class: BufferPlayer

Defined in: [bufferPlayer/BufferPlayer.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L30)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### Constructor

> **new BufferPlayer**(): `BufferPlayer`

#### Returns

`BufferPlayer`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructor)

## Properties

### compatibilityMode

> **compatibilityMode**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L46)

Enable or disable compatibility mode (AudioContext vs OfflineAudioContext)

#### Implementation of

`BufferPlayerInterface.compatibilityMode`

***

### currentNode

> **currentNode**: `AudioNode` \| `null` = `null`

Defined in: [bufferPlayer/BufferPlayer.ts:47](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L47)

***

### currentTime

> **currentTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:39](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L39)

***

### displayTime

> **displayTime**: `number` = `0`

Defined in: [bufferPlayer/BufferPlayer.ts:40](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L40)

***

### loop

> **loop**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:42](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L42)

Set to true to play audio in loop

#### Implementation of

`BufferPlayerInterface.loop`

***

### loopAll

> **loopAll**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:43](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L43)

Is playing all audio list in loop?

#### Implementation of

`BufferPlayerInterface.loopAll`

***

### playing

> **playing**: `boolean` = `false`

Defined in: [bufferPlayer/BufferPlayer.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L41)

***

### speedAudio

> **speedAudio**: `number` = `1`

Defined in: [bufferPlayer/BufferPlayer.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L44)

Set the audio speed

#### Implementation of

`BufferPlayerInterface.speedAudio`

## Accessors

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:336](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L336)

Get the time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.currentTimeDisplay`

***

### duration

#### Get Signature

> **get** **duration**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:306](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L306)

Set the audio duration

##### Returns

`number`

#### Set Signature

> **set** **duration**(`duration`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:310](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L310)

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

Defined in: [bufferPlayer/BufferPlayer.ts:340](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L340)

Get the audio duration in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.maxTimeDisplay`

***

### percent

#### Get Signature

> **get** **percent**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:344](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L344)

Get the percent played

##### Returns

`number`

#### Implementation of

`BufferPlayerInterface.percent`

***

### remainingTimeDisplay

#### Get Signature

> **get** **remainingTimeDisplay**(): `string`

Defined in: [bufferPlayer/BufferPlayer.ts:348](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L348)

Get the remaining time in text format

##### Returns

`string`

#### Implementation of

`BufferPlayerInterface.remainingTimeDisplay`

***

### volume

#### Get Signature

> **get** **volume**(): `number`

Defined in: [bufferPlayer/BufferPlayer.ts:302](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L302)

Set the volume of the audio

##### Returns

`number`

#### Set Signature

> **set** **volume**(`volume`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:291](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L291)

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

Defined in: [bufferPlayer/BufferPlayer.ts:68](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L68)

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

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/interfaces/AbstractAudioElement.ts#L27)

#### Parameters

##### bufferFetcherService

`BufferFetcherServiceInterface` | `null`

##### bufferDecoderService

`BufferDecoderServiceInterface` | `null`

##### configService

[`ConfigService`](../interfaces/ConfigService.md) | `null`

##### eventEmitter

`EventEmitterInterface` | `null`

##### contextManager

`AudioContextManagerInterface` | `null`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### loadBuffer()

> **loadBuffer**(`buffer`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:115](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L115)

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

### ~~on()~~

> **on**(`event`, `callback`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:330](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L330)

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

#### Deprecated

Will be removed in a future release, use the EventEmitter.on method instead.

#### Implementation of

`BufferPlayerInterface.on`

***

### ~~onBeforePlaying()~~

> **onBeforePlaying**(`callback`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:314](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L314)

Callback called just before starting playing the audio

#### Parameters

##### callback

() => `Promise`\<`void`\>

The callback

#### Returns

`void`

#### Deprecated

Will be removed in a future release, use the EventEmitter.on(EventType.PLAYING_STARTED) method instead.

#### Implementation of

`BufferPlayerInterface.onBeforePlaying`

***

### pause()

> **pause**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:254](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L254)

Pause the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.pause`

***

### playDirect()

> **playDirect**(): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:245](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L245)

Play audio directly, without stopping previous audio play

#### Returns

`Promise`\<`void`\>

#### Implementation of

`BufferPlayerInterface.playDirect`

***

### reset()

> **reset**(`direct?`): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:135](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L135)

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

Defined in: [bufferPlayer/BufferPlayer.ts:122](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L122)

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

Defined in: [bufferPlayer/BufferPlayer.ts:277](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L277)

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

Defined in: [bufferPlayer/BufferPlayer.ts:263](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L263)

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

### setup()

> **setup**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:50](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L50)

#### Returns

`void`

***

### start()

> **start**(`direct?`): `Promise`\<`void`\>

Defined in: [bufferPlayer/BufferPlayer.ts:178](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L178)

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

Defined in: [bufferPlayer/BufferPlayer.ts:146](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L146)

Stop playing the audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.stop`

***

### toggleLoop()

> **toggleLoop**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:320](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L320)

Enable/disable loop playing

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoop`

***

### toggleLoopAll()

> **toggleLoopAll**(): `void`

Defined in: [bufferPlayer/BufferPlayer.ts:325](https://github.com/Eliastik/simple-sound-studio-lib/blob/53fa45aac5142882bc90fc2bf7cad8c5abfb3158/lib/bufferPlayer/BufferPlayer.ts#L325)

Enable/disable looping all audio

#### Returns

`void`

#### Implementation of

`BufferPlayerInterface.toggleLoopAll`
