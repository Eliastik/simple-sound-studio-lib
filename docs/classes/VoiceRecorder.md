[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / VoiceRecorder

# Class: VoiceRecorder

Defined in: [voiceRecorder/VoiceRecorder.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L38)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### Constructor

> **new VoiceRecorder**(`contextManager`, `configService`): `VoiceRecorder`

Defined in: [voiceRecorder/VoiceRecorder.ts:67](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L67)

#### Parameters

##### contextManager

`null` | `AudioContextManagerInterface`

##### configService

[`ConfigService`](../interfaces/ConfigService.md)

#### Returns

`VoiceRecorder`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructor)

## Accessors

### currentTime

#### Get Signature

> **get** **currentTime**(): `number`

Defined in: [voiceRecorder/VoiceRecorder.ts:434](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L434)

Get current recording time in seconds

##### Returns

`number`

#### Implementation of

`VoiceRecorderInterface.currentTime`

***

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:430](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L430)

Get current recording time in text format

##### Returns

`string`

#### Implementation of

`VoiceRecorderInterface.currentTimeDisplay`

## Methods

### audioFeedback()

> **audioFeedback**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:159](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L159)

Enable or disable audio feedback

#### Parameters

##### enable

`boolean`

boolean

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.audioFeedback`

***

### changeInput()

> **changeInput**(`deviceId`, `groupId`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:316](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L316)

Change audio input

#### Parameters

##### deviceId

`string`

Device ID

##### groupId

Group ID (optional)

`undefined` | `string`

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.changeInput`

***

### getSettings()

> **getSettings**(): [`RecorderSettings`](../interfaces/RecorderSettings.md)

Defined in: [voiceRecorder/VoiceRecorder.ts:438](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L438)

Get the current settings for this voice recorder

#### Returns

[`RecorderSettings`](../interfaces/RecorderSettings.md)

RecorderSettings

#### Implementation of

`VoiceRecorderInterface.getSettings`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:76](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L76)

Initialize this voice recorder

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.init`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`?): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/interfaces/AbstractAudioElement.ts#L27)

#### Parameters

##### bufferFetcherService

`null` | `BufferFetcherServiceInterface`

##### bufferDecoderService

`null` | `BufferDecoderServiceInterface`

##### configService

`null` | [`ConfigService`](../interfaces/ConfigService.md)

##### eventEmitter

`null` | `EventEmitterInterface`

##### contextManager?

`AudioContextManagerInterface`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`injectDependencies`](AbstractAudioElement.md#injectdependencies)

***

### isRecordingAvailable()

> **isRecordingAvailable**(): `boolean`

Defined in: [voiceRecorder/VoiceRecorder.ts:450](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L450)

Check if browser is compatible with audio recording

#### Returns

`boolean`

boolean

#### Implementation of

`VoiceRecorderInterface.isRecordingAvailable`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:446](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L446)

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

`VoiceRecorderInterface.on`

***

### pause()

> **pause**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:380](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L380)

Pause audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.pause`

***

### record()

> **record**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:324](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L324)

Start audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.record`

***

### reset()

> **reset**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:408](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L408)

Reset this voice recorder

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.reset`

***

### setAutoGain()

> **setAutoGain**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:284](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L284)

Enable/disable auto gain

#### Parameters

##### enable

`boolean`

boolean

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.setAutoGain`

***

### setEchoCancellation()

> **setEchoCancellation**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:292](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L292)

Enable/disable echo cancellation

#### Parameters

##### enable

`boolean`

boolean

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.setEchoCancellation`

***

### setNoiseSuppression()

> **setNoiseSuppression**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:276](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L276)

Enable/disable noise suppression

#### Parameters

##### enable

`boolean`

boolean

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.setNoiseSuppression`

***

### stop()

> **stop**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:355](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/voiceRecorder/VoiceRecorder.ts#L355)

Stop audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.stop`
