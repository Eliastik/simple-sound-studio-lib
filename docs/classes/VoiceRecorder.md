[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / VoiceRecorder

# Class: VoiceRecorder

Defined in: [voiceRecorder/VoiceRecorder.ts:39](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L39)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### Constructor

> **new VoiceRecorder**(`contextManager`, `configService`): `VoiceRecorder`

Defined in: [voiceRecorder/VoiceRecorder.ts:68](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L68)

#### Parameters

##### contextManager

`AudioContextManagerInterface` | `null`

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

Defined in: [voiceRecorder/VoiceRecorder.ts:435](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L435)

Get current recording time in seconds

##### Returns

`number`

#### Implementation of

`VoiceRecorderInterface.currentTime`

***

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:431](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L431)

Get current recording time in text format

##### Returns

`string`

#### Implementation of

`VoiceRecorderInterface.currentTimeDisplay`

## Methods

### audioFeedback()

> **audioFeedback**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:160](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L160)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:317](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L317)

Change audio input

#### Parameters

##### deviceId

`string`

Device ID

##### groupId

Group ID (optional)

`string` | `undefined`

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.changeInput`

***

### getSettings()

> **getSettings**(): [`RecorderSettings`](../interfaces/RecorderSettings.md)

Defined in: [voiceRecorder/VoiceRecorder.ts:439](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L439)

Get the current settings for this voice recorder

#### Returns

[`RecorderSettings`](../interfaces/RecorderSettings.md)

RecorderSettings

#### Implementation of

`VoiceRecorderInterface.getSettings`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:77](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L77)

Initialize this voice recorder

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.init`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/interfaces/AbstractAudioElement.ts#L27)

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

### isRecordingAvailable()

> **isRecordingAvailable**(): `boolean`

Defined in: [voiceRecorder/VoiceRecorder.ts:451](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L451)

Check if browser is compatible with audio recording

#### Returns

`boolean`

boolean

#### Implementation of

`VoiceRecorderInterface.isRecordingAvailable`

***

### ~~on()~~

> **on**(`event`, `callback`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:447](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L447)

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

`VoiceRecorderInterface.on`

***

### pause()

> **pause**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:381](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L381)

Pause audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.pause`

***

### record()

> **record**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:325](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L325)

Start audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.record`

***

### reset()

> **reset**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:409](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L409)

Reset this voice recorder

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.reset`

***

### setAutoGain()

> **setAutoGain**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:285](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L285)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:293](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L293)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:277](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L277)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:356](https://github.com/Eliastik/simple-sound-studio-lib/blob/d93f3d8f2592cee22c37ae1cbd145c3a5e90a2f0/lib/voiceRecorder/VoiceRecorder.ts#L356)

Stop audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.stop`
