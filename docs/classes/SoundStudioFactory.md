[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / SoundStudioFactory

# Class: SoundStudioFactory

Defined in: [utils/SoundStudioFactory.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L10)

## Constructors

### new SoundStudioFactory()

> **new SoundStudioFactory**(): [`SoundStudioFactory`](SoundStudioFactory.md)

#### Returns

[`SoundStudioFactory`](SoundStudioFactory.md)

## Methods

### createAudioEditor()

> `static` **createAudioEditor**(`configService`?, `buffersToFetch`?): `AudioEditorInterface`

Defined in: [utils/SoundStudioFactory.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L14)

#### Parameters

##### configService?

[`ConfigService`](../interfaces/ConfigService.md)

##### buffersToFetch?

`string`[]

#### Returns

`AudioEditorInterface`

***

### createVoiceRecorder()

> `static` **createVoiceRecorder**(): `VoiceRecorderInterface`

Defined in: [utils/SoundStudioFactory.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L30)

#### Returns

`VoiceRecorderInterface`

***

### getAudioEditorInstance()

> `static` **getAudioEditorInstance**(): `null` \| `AudioEditorInterface`

Defined in: [utils/SoundStudioFactory.ts:34](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L34)

#### Returns

`null` \| `AudioEditorInterface`

***

### getAudioPlayerInstance()

> `static` **getAudioPlayerInstance**(): `null` \| `BufferPlayerInterface`

Defined in: [utils/SoundStudioFactory.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L38)

#### Returns

`null` \| `BufferPlayerInterface`

***

### getAudioRecorderInstance()

> `static` **getAudioRecorderInstance**(): `null` \| `VoiceRecorderInterface`

Defined in: [utils/SoundStudioFactory.ts:42](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L42)

#### Returns

`null` \| `VoiceRecorderInterface`

***

### getConfigServiceInstance()

> `static` **getConfigServiceInstance**(): `undefined` \| [`ConfigService`](../interfaces/ConfigService.md)

Defined in: [utils/SoundStudioFactory.ts:50](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L50)

#### Returns

`undefined` \| [`ConfigService`](../interfaces/ConfigService.md)

***

### getEventEmitterInstance()

> `static` **getEventEmitterInstance**(): `null` \| `EventEmitterInterface`

Defined in: [utils/SoundStudioFactory.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/e2381543acd624d47bf0e56bee059ac07e0632f6/lib/utils/SoundStudioFactory.ts#L46)

#### Returns

`null` \| `EventEmitterInterface`
