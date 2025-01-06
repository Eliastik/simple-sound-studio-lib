[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioElement

# Class: `abstract` AbstractAudioElement

Defined in: [interfaces/AbstractAudioElement.ts:9](https://github.com/Eliastik/simple-sound-studio-lib/blob/9845dbc69e805d01349b7ad64337ff031854285d/lib/interfaces/AbstractAudioElement.ts#L9)

## Extended by

- [`AudioEditor`](AudioEditor.md)
- [`BufferPlayer`](BufferPlayer.md)
- [`VoiceRecorder`](VoiceRecorder.md)
- [`AbstractAudioNode`](AbstractAudioNode.md)

## Constructors

### new AbstractAudioElement()

> **new AbstractAudioElement**(): [`AbstractAudioElement`](AbstractAudioElement.md)

#### Returns

[`AbstractAudioElement`](AbstractAudioElement.md)

## Methods

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/9845dbc69e805d01349b7ad64337ff031854285d/lib/interfaces/AbstractAudioElement.ts#L23)

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
