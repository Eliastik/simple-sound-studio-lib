[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / AudioFilterEntrypointInterface

# Interface: AudioFilterEntrypointInterface

Defined in: [filters/interfaces/AudioFilterEntrypointInterface.ts:3](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AudioFilterEntrypointInterface.ts#L3)

## Methods

### getEntrypointNode()

> **getEntrypointNode**(`context`, `buffer`, `offline`): `Promise`\<[`AudioFilterNodes`](AudioFilterNodes.md)\>

Defined in: [filters/interfaces/AudioFilterEntrypointInterface.ts:6](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AudioFilterEntrypointInterface.ts#L6)

Return the entrypoint node, with an audio context and an input AudioBuffer

#### Parameters

##### context

`BaseAudioContext`

##### buffer

`AudioBuffer`

##### offline

`boolean`

#### Returns

`Promise`\<[`AudioFilterNodes`](AudioFilterNodes.md)\>

***

### getSpeed()

> **getSpeed**(): `number`

Defined in: [filters/interfaces/AudioFilterEntrypointInterface.ts:9](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AudioFilterEntrypointInterface.ts#L9)

Get the speed of the audio

#### Returns

`number`

***

### updateState()

> **updateState**(): `void`

Defined in: [filters/interfaces/AudioFilterEntrypointInterface.ts:12](https://github.com/Eliastik/simple-sound-studio-lib/blob/b65a8fd23e374795fe23a2588430ae96578f8619/lib/filters/interfaces/AudioFilterEntrypointInterface.ts#L12)

Update the state of the filter

#### Returns

`void`
