[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / UtilFunctions

# Variable: UtilFunctions

> `const` **UtilFunctions**: `object`

Defined in: [utils/Functions.ts:6](https://github.com/Eliastik/simple-sound-studio-lib/blob/dab295def48d73ea9d369ba0bfae89dbd7e343e1/lib/utils/Functions.ts#L6)

## Type declaration

### calcAudioDuration()

> **calcAudioDuration**: (`audio`, `speed`) => `number`

#### Parameters

##### audio

`AudioBuffer`

##### speed

`number`

#### Returns

`number`

### convertAudioBufferToFloat32Array()

> **convertAudioBufferToFloat32Array**: (`buffer`) => `Float32Array`[]

#### Parameters

##### buffer

`AudioBuffer`

#### Returns

`Float32Array`[]

### convertAudioParamToFloat32Array()

> **convertAudioParamToFloat32Array**: (`param`, `length`) => `Float32Array`\<`ArrayBuffer`\>

#### Parameters

##### param

`AudioParam`

##### length

`number`

#### Returns

`Float32Array`\<`ArrayBuffer`\>

### decodeBuffer()

> **decodeBuffer**: (`context`, `buffer`) => `AudioBuffer`

#### Parameters

##### context

`AudioContext`

##### buffer

`AudioBuffer`

#### Returns

`AudioBuffer`

### loadAudioBuffer()

> **loadAudioBuffer**: (`context`, `file`) => `Promise`\<`AudioBuffer`\>

#### Parameters

##### context

`AudioContext`

##### file

`File`

#### Returns

`Promise`\<`AudioBuffer`\>

### readAsArrayBufferPromisified()

> **readAsArrayBufferPromisified**: (`file`) => `Promise`\<`ArrayBuffer`\>

#### Parameters

##### file

`File`

#### Returns

`Promise`\<`ArrayBuffer`\>

### calculateAudioDuration()

Calculate approximative audio duration according to enabled filters and their settings

#### Parameters

##### buffer

`AudioBuffer`

##### filterManager

`FilterManagerInterface`

##### speedAudio

`number`

Current audio speed

#### Returns

`number`

The audio duration

### forceDownload()

#### Parameters

##### blob

`Blob`

##### filename

`string`

#### Returns

`void`

### isAudioWorkletCompatible()

This method checks if the browser is compatible with audio worklets

#### Parameters

##### audioContext

`BaseAudioContext`

#### Returns

`boolean`

### isSettingValueValid()

Check that the setting value is correct

#### Parameters

##### value

[`FilterSettingValue`](../type-aliases/FilterSettingValue.md)

FilterSettingValue

#### Returns

`boolean`

### resetAudioRenderingProgress()

Reset audio rendering progress

#### Parameters

##### eventEmitter

`null` | `EventEmitterInterface`

#### Returns

`void`

### sumAudioBuffer()

#### Parameters

##### buffer

`AudioBuffer`

#### Returns

`number`

### sumAudioBufferChannel()

#### Parameters

##### buffer

`AudioBuffer`

##### channel

`number`

#### Returns

`number`
