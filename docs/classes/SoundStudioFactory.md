[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / SoundStudioFactory

# Class: SoundStudioFactory

Defined in: [utils/SoundStudioFactory.ts:19](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L19)

Factory class to create instances of sound studio components.

This factory supports both singleton-based methods (deprecated) and a new
instance-based creation model. The singleton methods will be removed in a
future release.

## Constructors

### Constructor

> **new SoundStudioFactory**(): `SoundStudioFactory`

#### Returns

`SoundStudioFactory`

## Methods

### ~~createAudioEditor()~~

> `static` **createAudioEditor**(`configService`?, `buffersToFetch`?): `AudioEditorInterface`

Defined in: [utils/SoundStudioFactory.ts:65](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L65)

Create a singleton AudioEditor instance.

#### Parameters

##### configService?

[`ConfigService`](../interfaces/ConfigService.md)

Optional configuration service.

##### buffersToFetch?

`string`[]

Optional list of audio buffers to pre-fetch.

#### Returns

`AudioEditorInterface`

The singleton AudioEditor instance.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### createNewInstance()

> `static` **createNewInstance**(`options`?): [`SoundStudioFactoryInstance`](../interfaces/SoundStudioFactoryInstance.md)

Defined in: [utils/SoundStudioFactory.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L36)

Create a new instance of sound studio components.

#### Parameters

##### options?

[`SoundStudioFactoryNewInstanceOptions`](../interfaces/SoundStudioFactoryNewInstanceOptions.md)

Optional configuration for the new instance. See SoundStudioFactoryNewInstanceOptions

#### Returns

[`SoundStudioFactoryInstance`](../interfaces/SoundStudioFactoryInstance.md)

A new instance of the sound studio components. See SoundStudioFactoryInstance

***

### ~~createVoiceRecorder()~~

> `static` **createVoiceRecorder**(): `VoiceRecorderInterface`

Defined in: [utils/SoundStudioFactory.ts:91](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L91)

Create a singleton VoiceRecorder instance.

#### Returns

`VoiceRecorderInterface`

The singleton VoiceRecorder instance.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getAudioEditorInstance()~~

> `static` **getAudioEditorInstance**(): `null` \| `AudioEditorInterface`

Defined in: [utils/SoundStudioFactory.ts:105](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L105)

Get the singleton AudioEditor instance.

#### Returns

`null` \| `AudioEditorInterface`

The singleton AudioEditor instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getAudioPlayerInstance()~~

> `static` **getAudioPlayerInstance**(): `null` \| `BufferPlayerInterface`

Defined in: [utils/SoundStudioFactory.ts:119](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L119)

Get the singleton BufferPlayer instance.

#### Returns

`null` \| `BufferPlayerInterface`

The singleton BufferPlayer instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getAudioRecorderInstance()~~

> `static` **getAudioRecorderInstance**(): `null` \| `VoiceRecorderInterface`

Defined in: [utils/SoundStudioFactory.ts:133](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L133)

Get the singleton VoiceRecorder instance.

#### Returns

`null` \| `VoiceRecorderInterface`

The singleton VoiceRecorder instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getConfigServiceInstance()~~

> `static` **getConfigServiceInstance**(): `undefined` \| [`ConfigService`](../interfaces/ConfigService.md)

Defined in: [utils/SoundStudioFactory.ts:161](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L161)

Get the singleton ConfigService instance.

#### Returns

`undefined` \| [`ConfigService`](../interfaces/ConfigService.md)

The singleton ConfigService instance, or undefined if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getEventEmitterInstance()~~

> `static` **getEventEmitterInstance**(): `null` \| `EventEmitterInterface`

Defined in: [utils/SoundStudioFactory.ts:147](https://github.com/Eliastik/simple-sound-studio-lib/blob/6682e5e836e2002f5da4644dfa82f1eb5b9a13da/lib/utils/SoundStudioFactory.ts#L147)

Get the singleton EventEmitter instance.

#### Returns

`null` \| `EventEmitterInterface`

The singleton EventEmitter instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.
