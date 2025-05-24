[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / SoundStudioFactory

# Class: SoundStudioFactory

Defined in: [utils/SoundStudioFactory.ts:19](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L19)

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

> `static` **createAudioEditor**(`configService?`, `buffersToFetch?`): `AudioEditorInterface`

Defined in: [utils/SoundStudioFactory.ts:70](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L70)

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

> `static` **createNewInstance**(`options?`): [`SoundStudioFactoryInstance`](../interfaces/SoundStudioFactoryInstance.md)

Defined in: [utils/SoundStudioFactory.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L36)

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

Defined in: [utils/SoundStudioFactory.ts:96](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L96)

Create a singleton VoiceRecorder instance.

#### Returns

`VoiceRecorderInterface`

The singleton VoiceRecorder instance.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getAudioEditorInstance()~~

> `static` **getAudioEditorInstance**(): `null` \| `AudioEditorInterface`

Defined in: [utils/SoundStudioFactory.ts:110](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L110)

Get the singleton AudioEditor instance.

#### Returns

`null` \| `AudioEditorInterface`

The singleton AudioEditor instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getAudioPlayerInstance()~~

> `static` **getAudioPlayerInstance**(): `null` \| `BufferPlayerInterface`

Defined in: [utils/SoundStudioFactory.ts:124](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L124)

Get the singleton BufferPlayer instance.

#### Returns

`null` \| `BufferPlayerInterface`

The singleton BufferPlayer instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getAudioRecorderInstance()~~

> `static` **getAudioRecorderInstance**(): `null` \| `VoiceRecorderInterface`

Defined in: [utils/SoundStudioFactory.ts:138](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L138)

Get the singleton VoiceRecorder instance.

#### Returns

`null` \| `VoiceRecorderInterface`

The singleton VoiceRecorder instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getConfigServiceInstance()~~

> `static` **getConfigServiceInstance**(): `undefined` \| [`ConfigService`](../interfaces/ConfigService.md)

Defined in: [utils/SoundStudioFactory.ts:166](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L166)

Get the singleton ConfigService instance.

#### Returns

`undefined` \| [`ConfigService`](../interfaces/ConfigService.md)

The singleton ConfigService instance, or undefined if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.

***

### ~~getEventEmitterInstance()~~

> `static` **getEventEmitterInstance**(): `null` \| `EventEmitterInterface`

Defined in: [utils/SoundStudioFactory.ts:152](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/SoundStudioFactory.ts#L152)

Get the singleton EventEmitter instance.

#### Returns

`null` \| `EventEmitterInterface`

The singleton EventEmitter instance, or null if not initialized.

#### Deprecated

This method is deprecated. Use createNewInstance instead.
