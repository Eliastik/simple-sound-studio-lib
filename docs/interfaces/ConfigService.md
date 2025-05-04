[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / ConfigService

# Interface: ConfigService

Defined in: [services/interfaces/ConfigService.ts:1](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L1)

## Methods

### disableCompatibilityMode()

> **disableCompatibilityMode**(): `void`

Defined in: [services/interfaces/ConfigService.ts:58](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L58)

Disable the compatibility/direct audio rendering mode

#### Returns

`void`

***

### enableCompatibilityMode()

> **enableCompatibilityMode**(): `void`

Defined in: [services/interfaces/ConfigService.ts:53](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L53)

Enable the compatibility/direct audio rendering mode

#### Returns

`void`

***

### getBitrateMP3()

> **getBitrateMP3**(): `number`

Defined in: [services/interfaces/ConfigService.ts:48](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L48)

Get MP3 bitrate

#### Returns

`number`

***

### getBufferSize()

> **getBufferSize**(): `number`

Defined in: [services/interfaces/ConfigService.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L38)

Get buffer size setting

#### Returns

`number`

***

### getConfig()

> **getConfig**(`key`): `undefined` \| `null` \| `string`

Defined in: [services/interfaces/ConfigService.ts:6](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L6)

Get config with a key

#### Parameters

##### key

`string`

The key

#### Returns

`undefined` \| `null` \| `string`

***

### getSampleRate()

> **getSampleRate**(): `number`

Defined in: [services/interfaces/ConfigService.ts:43](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L43)

Get sample rate, or 0 for auto

#### Returns

`number`

***

### getSoundBasePath()

> **getSoundBasePath**(): `string`

Defined in: [services/interfaces/ConfigService.ts:73](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L73)

Return the base path for audio files (reverb environments for example)

#### Returns

`string`

***

### getWorkerBasePath()

> **getWorkerBasePath**(): `string`

Defined in: [services/interfaces/ConfigService.ts:68](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L68)

Return the base path for worker files

#### Returns

`string`

***

### getWorkletBasePath()

> **getWorkletBasePath**(): `string`

Defined in: [services/interfaces/ConfigService.ts:63](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L63)

Return the base path for worklet files

#### Returns

`string`

***

### isAudioWorkletEnabled()

> **isAudioWorkletEnabled**(): `boolean`

Defined in: [services/interfaces/ConfigService.ts:28](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L28)

Check if AudioWorklet is enabled for the filters

#### Returns

`boolean`

***

### isCompatibilityModeChecked()

> **isCompatibilityModeChecked**(): `boolean`

Defined in: [services/interfaces/ConfigService.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L23)

Was compatibility/direct audio rendering mode already checked for auto enabling? (if an error occurs rendering in offline context)

#### Returns

`boolean`

***

### isCompatibilityModeEnabled()

> **isCompatibilityModeEnabled**(): `boolean`

Defined in: [services/interfaces/ConfigService.ts:18](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L18)

Check if the compatibility/direct audio rendering mode is enabled

#### Returns

`boolean`

***

### isInitialRenderingDisabled()

> **isInitialRenderingDisabled**(): `boolean`

Defined in: [services/interfaces/ConfigService.ts:99](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L99)

Check if initial audio rendering (when opening a file or buffer) is disabled

#### Returns

`boolean`

***

### isSoundtouchAudioWorkletEnabled()

> **isSoundtouchAudioWorkletEnabled**(): `boolean`

Defined in: [services/interfaces/ConfigService.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L33)

Check if AudioWorklet mode is enabled for Soundtouch

#### Returns

`boolean`

***

### setConfig()

> **setConfig**(`key`, `value`): `void`

Defined in: [services/interfaces/ConfigService.ts:13](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L13)

Set config

#### Parameters

##### key

`string`

The key

##### value

`string`

The config value

#### Returns

`void`

***

### setSoundBasePath()

> **setSoundBasePath**(`soundBasePath`): `void`

Defined in: [services/interfaces/ConfigService.ts:94](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L94)

Set the base path for audio files (reverb environments for example)

#### Parameters

##### soundBasePath

`string`

The base path

#### Returns

`void`

***

### setWorkerBasePath()

> **setWorkerBasePath**(`workerBasePath`): `void`

Defined in: [services/interfaces/ConfigService.ts:87](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L87)

Set the base path for worker files

#### Parameters

##### workerBasePath

`string`

The base path

#### Returns

`void`

***

### setWorkletBasePath()

> **setWorkletBasePath**(`workletBasePath`): `void`

Defined in: [services/interfaces/ConfigService.ts:80](https://github.com/Eliastik/simple-sound-studio-lib/blob/ed5af082cb367d081813596dd50d04cea5746b12/lib/services/interfaces/ConfigService.ts#L80)

Set the base path for worklet files

#### Parameters

##### workletBasePath

`string`

The base path

#### Returns

`void`
