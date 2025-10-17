[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioElement

# Abstract Class: AbstractAudioElement

Defined in: [interfaces/AbstractAudioElement.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/60b9836d136e9d592a3776074f50f23331ab09fc/lib/interfaces/AbstractAudioElement.ts#L10)

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

Defined in: [interfaces/AbstractAudioElement.ts:27](https://github.com/Eliastik/simple-sound-studio-lib/blob/60b9836d136e9d592a3776074f50f23331ab09fc/lib/interfaces/AbstractAudioElement.ts#L27)

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
