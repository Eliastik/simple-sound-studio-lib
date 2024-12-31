[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioElement

# Class: `abstract` AbstractAudioElement

Defined in: [filters/interfaces/AbstractAudioElement.ts:9](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L9)

## Extended by

- [`AudioEditor`](AudioEditor.md)
- [`BufferPlayer`](BufferPlayer.md)
- [`VoiceRecorder`](VoiceRecorder.md)
- [`AbstractAudioFilter`](AbstractAudioFilter.md)
- [`AbstractAudioRenderer`](AbstractAudioRenderer.md)

## Constructors

### new AbstractAudioElement()

> **new AbstractAudioElement**(): [`AbstractAudioElement`](AbstractAudioElement.md)

#### Returns

[`AbstractAudioElement`](AbstractAudioElement.md)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioElement.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L33)

Returns the id of this filter/renderer

##### Returns

`string`

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioElement.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L30)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

## Methods

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:70](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L70)

Disable this filter/renderer

#### Returns

`void`

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:65](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L65)

Enable this filter/renderer

#### Returns

`void`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:79](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L79)

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

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:41](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L41)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioElement.ts:36](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L36)

Is this filter/renderer enabled?

#### Returns

`boolean`

***

### setDefaultEnabled()

> **setDefaultEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:46](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L46)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:60](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L60)

Set the enabled/disabled state

#### Parameters

##### state

`boolean`

true to enable, false to disable

#### Returns

`void`

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioElement.ts:75](https://github.com/Eliastik/simple-sound-studio-lib/blob/7f79ee0a2f9fd7bdc8c4ad29a0780b48aa0c4137/lib/filters/interfaces/AbstractAudioElement.ts#L75)

Toggle to enabled/disabled this filter

#### Returns

`void`
