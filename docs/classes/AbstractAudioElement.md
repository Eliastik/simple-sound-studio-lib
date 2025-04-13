[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioElement

# Class: `abstract` AbstractAudioElement

Defined in: [interfaces/AbstractAudioElement.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/interfaces/AbstractAudioElement.ts#L10)

## Extended by

- [`AudioEditor`](AudioEditor.md)
- [`BufferPlayer`](BufferPlayer.md)
- [`VoiceRecorder`](VoiceRecorder.md)
- [`AbstractAudioNode`](AbstractAudioNode.md)

## Constructors

### Constructor

> **new AbstractAudioElement**(): `AbstractAudioElement`

#### Returns

`AbstractAudioElement`

## Methods

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`, `contextManager`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/a46864ae7461e78d2626d76886652564d08a6ff1/lib/interfaces/AbstractAudioElement.ts#L27)

#### Parameters

##### bufferFetcherService

`null` | `BufferFetcherServiceInterface`

##### bufferDecoderService

`null` | `BufferDecoderServiceInterface`

##### configService

`null` | [`ConfigService`](../interfaces/ConfigService.md)

##### eventEmitter

`null` | `EventEmitterInterface`

##### contextManager

`null` | `AudioContextManagerInterface`

#### Returns

`void`
