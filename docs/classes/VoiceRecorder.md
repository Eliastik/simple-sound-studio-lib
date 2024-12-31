[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / VoiceRecorder

# Class: VoiceRecorder

Defined in: [voiceRecorder/VoiceRecorder.ts:39](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L39)

## Extends

- [`AbstractAudioElement`](AbstractAudioElement.md)

## Implements

- `default`

## Constructors

### new VoiceRecorder()

> **new VoiceRecorder**(`contextManager`, `configService`): [`VoiceRecorder`](VoiceRecorder.md)

Defined in: [voiceRecorder/VoiceRecorder.ts:70](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L70)

#### Parameters

##### contextManager

`null` | `AudioContextManagerInterface`

##### configService

[`ConfigService`](../interfaces/ConfigService.md)

#### Returns

[`VoiceRecorder`](VoiceRecorder.md)

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`constructor`](AbstractAudioElement.md#constructors)

## Properties

### bufferDecoderService

> `protected` **bufferDecoderService**: `null` \| `BufferDecoderServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:21](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L21)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`bufferDecoderService`](AbstractAudioElement.md#bufferdecoderservice)

***

### bufferFetcherService

> `protected` **bufferFetcherService**: `null` \| `BufferFetcherServiceInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:18](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L18)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`bufferFetcherService`](AbstractAudioElement.md#bufferfetcherservice)

***

### configService

> `protected` **configService**: `null` \| [`ConfigService`](../interfaces/ConfigService.md) = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:24](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L24)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`configService`](AbstractAudioElement.md#configservice)

***

### eventEmitter

> `protected` **eventEmitter**: `null` \| `EventEmitterInterface` = `null`

Defined in: [filters/interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L27)

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`eventEmitter`](AbstractAudioElement.md#eventemitter)

## Accessors

### currentTime

#### Get Signature

> **get** **currentTime**(): `number`

Defined in: [voiceRecorder/VoiceRecorder.ts:437](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L437)

Get current recording time in seconds

##### Returns

`number`

#### Implementation of

`VoiceRecorderInterface.currentTime`

***

### currentTimeDisplay

#### Get Signature

> **get** **currentTimeDisplay**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:433](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L433)

Get current recording time in text format

##### Returns

`string`

#### Implementation of

`VoiceRecorderInterface.currentTimeDisplay`

***

### id

#### Get Signature

> **get** **id**(): `string`

Defined in: [voiceRecorder/VoiceRecorder.ts:461](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L461)

Returns the id of this filter/renderer

##### Returns

`string`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`id`](AbstractAudioElement.md#id)

***

### order

#### Get Signature

> **get** **order**(): `number`

Defined in: [voiceRecorder/VoiceRecorder.ts:457](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L457)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Overrides

[`AbstractAudioElement`](AbstractAudioElement.md).[`order`](AbstractAudioElement.md#order)

## Methods

### audioFeedback()

> **audioFeedback**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:162](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L162)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:319](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L319)

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

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:66](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L66)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`disable`](AbstractAudioElement.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L61)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`enable`](AbstractAudioElement.md#enable)

***

### getSettings()

> **getSettings**(): [`RecorderSettings`](../interfaces/RecorderSettings.md)

Defined in: [voiceRecorder/VoiceRecorder.ts:441](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L441)

Get the current settings for this voice recorder

#### Returns

[`RecorderSettings`](../interfaces/RecorderSettings.md)

RecorderSettings

#### Implementation of

`VoiceRecorderInterface.getSettings`

***

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:79](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L79)

Initialize this voice recorder

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.init`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:75](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L75)

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

Defined in: [filters/interfaces/AbstractAudioElement.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L41)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isDefaultEnabled`](AbstractAudioElement.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L36)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`isEnabled`](AbstractAudioElement.md#isenabled)

***

### isRecordingAvailable()

> **isRecordingAvailable**(): `boolean`

Defined in: [voiceRecorder/VoiceRecorder.ts:453](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L453)

Check if browser is compatible with audio recording

#### Returns

`boolean`

boolean

#### Implementation of

`VoiceRecorderInterface.isRecordingAvailable`

***

### on()

> **on**(`event`, `callback`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:449](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L449)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:383](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L383)

Pause audio recording

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.pause`

***

### record()

> **record**(): `Promise`\<`void`\>

Defined in: [voiceRecorder/VoiceRecorder.ts:327](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L327)

Start audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.record`

***

### reset()

> **reset**(): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:411](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L411)

Reset this voice recorder

#### Returns

`void`

#### Implementation of

`VoiceRecorderInterface.reset`

***

### setAutoGain()

> **setAutoGain**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:287](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L287)

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

### setDefaultEnabled()

> **setDefaultEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L46)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`setDefaultEnabled`](AbstractAudioElement.md#setdefaultenabled)

***

### setEchoCancellation()

> **setEchoCancellation**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:295](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L295)

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

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:56](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L56)

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`setEnabled`](AbstractAudioElement.md#setenabled)

***

### setNoiseSuppression()

> **setNoiseSuppression**(`enable`): `void`

Defined in: [voiceRecorder/VoiceRecorder.ts:279](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L279)

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

Defined in: [voiceRecorder/VoiceRecorder.ts:358](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/voiceRecorder/VoiceRecorder.ts#L358)

Stop audio recording

#### Returns

`Promise`\<`void`\>

#### Implementation of

`VoiceRecorderInterface.stop`

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:71](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AbstractAudioElement.ts#L71)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioElement`](AbstractAudioElement.md).[`toggle`](AbstractAudioElement.md#toggle)
