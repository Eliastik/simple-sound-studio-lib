[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / VoiceRecorder

# Class: VoiceRecorder

Defined in: [voiceRecorder/VoiceRecorder.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L38)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new VoiceRecorder()

> **new VoiceRecorder**(`contextManager`, `configService`): [`VoiceRecorder`](VoiceRecorder.md)

Defined in: [voiceRecorder/VoiceRecorder.ts:69](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L69)

#### Parameters

##### contextManager

`null` | `AudioContextManagerInterface`

##### configService

[`ConfigService`](../interfaces/ConfigService.md)

#### Returns

[`VoiceRecorder`](VoiceRecorder.md)

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Accessors

### currentTime

#### Get Signature

> **get** **currentTime**(): `number`

Defined in: [voiceRecorder/VoiceRecorder.ts:436](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L436)

Get current recording time in seconds

##### Returns

`number`

#### Implementation of

`VoiceRecorderInterface.currentTime`

***

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:432](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L432)

Get current recording time in text format

##### Returns

`string`

#### Implementation of

`VoiceRecorderInterface.currentTimeDisplay`

## Methods

### audioFeedback()

> **audioFeedback**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:161](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L161)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:318](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L318)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:440](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L440)

Get the current settings for this voice recorder

#### Returns

[`RecorderSettings`](../interfaces/RecorderSettings.md)

RecorderSettings

#### Implementation of

`VoiceRecorderInterface.getSettings`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:78](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L78)

Initialize this voice recorder

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.init`

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

### isRecordingAvailable()

> **isRecordingAvailable**(): `boolean`

Defined in: [voiceRecorder/VoiceRecorder.ts:452](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L452)

Check if browser is compatible with audio recording

#### Returns

`boolean`

boolean

#### Implementation of

`VoiceRecorderInterface.isRecordingAvailable`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:448](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L448)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:382](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L382)

Pause audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.pause`

***

### record()

> **record**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:326](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L326)

Start audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.record`

***

### reset()

> **reset**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:410](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L410)

Reset this voice recorder

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.reset`

***

### setAutoGain()

> **setAutoGain**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:286](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L286)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:294](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L294)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:278](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L278)

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

> **stop**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:357](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/voiceRecorder/VoiceRecorder.ts#L357)

Stop audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.stop`
