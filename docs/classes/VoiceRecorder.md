[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / VoiceRecorder

# Class: VoiceRecorder

Defined in: [voiceRecorder/VoiceRecorder.ts:39](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L39)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new VoiceRecorder()

> **new VoiceRecorder**(`contextManager`, `configService`): [`VoiceRecorder`](VoiceRecorder.md)

Defined in: [voiceRecorder/VoiceRecorder.ts:70](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L70)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:437](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L437)

Get current recording time in seconds

##### Returns

`number`

#### Implementation of

`VoiceRecorderInterface.currentTime`

***

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:433](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L433)

Get current recording time in text format

##### Returns

`string`

#### Implementation of

`VoiceRecorderInterface.currentTimeDisplay`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:461](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L461)

##### Returns

`string`

***

### order

#### Get Signature

> **get** **order**(): `number`

Defined in: [voiceRecorder/VoiceRecorder.ts:457](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L457)

##### Returns

`number`

## Methods

### audioFeedback()

> **audioFeedback**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:162](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L162)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:319](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L319)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:441](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L441)

Get the current settings for this voice recorder

#### Returns

[`RecorderSettings`](../interfaces/RecorderSettings.md)

RecorderSettings

#### Implementation of

`VoiceRecorderInterface.getSettings`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:79](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L79)

Initialize this voice recorder

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.init`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/interfaces/AbstractAudioElement.ts#L23)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:453](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L453)

Check if browser is compatible with audio recording

#### Returns

`boolean`

boolean

#### Implementation of

`VoiceRecorderInterface.isRecordingAvailable`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:449](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L449)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:383](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L383)

Pause audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.pause`

***

### record()

> **record**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:327](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L327)

Start audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.record`

***

### reset()

> **reset**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:411](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L411)

Reset this voice recorder

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.reset`

***

### setAutoGain()

> **setAutoGain**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:287](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L287)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:295](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L295)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:279](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L279)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:358](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/voiceRecorder/VoiceRecorder.ts#L358)

Stop audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.stop`
