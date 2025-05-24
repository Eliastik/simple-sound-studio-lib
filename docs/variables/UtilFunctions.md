[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / UtilFunctions

# Variable: UtilFunctions

> `const` **UtilFunctions**: `object`

Defined in: [utils/Functions.ts:5](https://github.com/Eliastik/simple-sound-studio-lib/blob/da752c51f31a2272f1f3e80486e8056fec3d0b87/lib/utils/Functions.ts#L5)

## Type declaration

### calcAudioDuration()

> **calcAudioDuration**: (`audio`, `speed?`) => `number`

#### Parameters

##### audio

`AudioBuffer`

##### speed?

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

> **calculateAudioDuration**(`buffer`, `filterManager`, `speedAudio?`): `number`

Calculate approximative audio duration according to enabled filters and their settings

#### Parameters

##### buffer

`AudioBuffer`

##### filterManager

`FilterManagerInterface`

##### speedAudio?

`number`

Current audio speed

#### Returns

`number`

The audio duration

### clampFloatValue()

> **clampFloatValue**(`value`): `number`

#### Parameters

##### value

`number`

#### Returns

`number`

### clearAudioBuffer()

> **clearAudioBuffer**(`buffer`): `void`

#### Parameters

##### buffer

`null` | `AudioBuffer`

#### Returns

`void`

### convertFloat32Array2Int16()

> **convertFloat32Array2Int16**(`floatbuffer`): `Int16Array`\<`ArrayBuffer`\>

Convert a Float32Array to an Int16Array

#### Parameters

##### floatbuffer

`Float32Array`

The buffer to convert

#### Returns

`Int16Array`\<`ArrayBuffer`\>

Int16Array buffer

### floatTo16BitPCM()

> **floatTo16BitPCM**(`output`, `offset`, `input`): `void`

#### Parameters

##### output

`DataView`

##### offset

`number`

##### input

`Float32Array`

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

### getLengthFromBuffers()

> **getLengthFromBuffers**\<`T`\>(`buffers`): `number`

#### Type Parameters

##### T

`T` *extends* `TypedArray`

#### Parameters

##### buffers

`T`[]

#### Returns

`number`

### interleaveBuffers()

> **interleaveBuffers**\<`T`\>(`inputL`, `inputR`): `T`

#### Type Parameters

##### T

`T` *extends* `TypedArray`

#### Parameters

##### inputL

`T`

##### inputR

`T`

#### Returns

`T`

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

### mergeBuffers()

> **mergeBuffers**\<`T`\>(`buffers`): `T`

#### Type Parameters

##### T

`T` *extends* `TypedArray`

#### Parameters

##### buffers

`T`[]

#### Returns

`T`

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

### writeStringToDataView()

> **writeStringToDataView**(`view`, `offset`, `string`): `void`

#### Parameters

##### view

`DataView`

##### offset

`number`

##### string

`string`

#### Returns

`void`
