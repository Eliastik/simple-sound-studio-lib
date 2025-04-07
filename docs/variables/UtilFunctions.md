[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / UtilFunctions

# Variable: UtilFunctions

> `const` **UtilFunctions**: `object`

Defined in: [utils/Functions.ts:6](https://github.com/Eliastik/simple-sound-studio-lib/blob/6f04613d35b939e1c2ba2c36d70bf3b1a970e83e/lib/utils/Functions.ts#L6)

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

> **convertAudioBufferToFloat32Array**: (`buffer`) => `Float32Array`\<`ArrayBufferLike`\>[]

#### Parameters

##### buffer

`AudioBuffer`

#### Returns

`Float32Array`\<`ArrayBufferLike`\>[]

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

> **calculateAudioDuration**(`buffer`, `filterManager`, `speedAudio`): `number`

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

### clearAudioBuffer()

> **clearAudioBuffer**(`buffer`): `void`

#### Parameters

##### buffer

`null` | `AudioBuffer`

#### Returns

`void`

### forceDownload()

> **forceDownload**(`blob`, `filename`): `void`

#### Parameters

##### blob

`Blob`

##### filename

`string`

#### Returns

`void`

### isAudioWorkletCompatible()

> **isAudioWorkletCompatible**(`audioContext`): `boolean`

This method checks if the browser is compatible with audio worklets

#### Parameters

##### audioContext

`BaseAudioContext`

#### Returns

`boolean`

### isSettingValueValid()

> **isSettingValueValid**(`value`): `boolean`

Check that the setting value is correct

#### Parameters

##### value

[`FilterSettingValue`](../type-aliases/FilterSettingValue.md)

FilterSettingValue

#### Returns

`boolean`

### resetAudioRenderingProgress()

> **resetAudioRenderingProgress**(`eventEmitter`): `void`

Reset audio rendering progress

#### Parameters

##### eventEmitter

`null` | `EventEmitterInterface`

#### Returns

`void`

### sumAudioBuffer()

> **sumAudioBuffer**(`buffer`): `number`

#### Parameters

##### buffer

`AudioBuffer`

#### Returns

`number`

### sumAudioBufferChannel()

> **sumAudioBufferChannel**(`buffer`, `channel`): `number`

#### Parameters

##### buffer

`AudioBuffer`

##### channel

`number`

#### Returns

`number`
