[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../globals.md) / GenericConfigService

# Class: GenericConfigService

Defined in: [services/GenericConfigService.ts:10](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L10)

Default implementation for a ConfigService, using a built-in map.
The configuration is not stored in localstorage in this case.

## Implements

- [`ConfigService`](../interfaces/ConfigService.md)

## Constructors

### new GenericConfigService()

> **new GenericConfigService**(): [`GenericConfigService`](GenericConfigService.md)

#### Returns

[`GenericConfigService`](GenericConfigService.md)

## Methods

### disableCompatibilityMode()

> **disableCompatibilityMode**(): `void`

Defined in: [services/GenericConfigService.ts:88](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L88)

Disable the compatibility/direct audio rendering mode

#### Returns

`void`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`disableCompatibilityMode`](../interfaces/ConfigService.md#disablecompatibilitymode)

***

### enableCompatibilityMode()

> **enableCompatibilityMode**(): `void`

Defined in: [services/GenericConfigService.ts:84](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L84)

Enable the compatibility/direct audio rendering mode

#### Returns

`void`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`enableCompatibilityMode`](../interfaces/ConfigService.md#enablecompatibilitymode)

***

### getBitrateMP3()

> **getBitrateMP3**(): `number`

Defined in: [services/GenericConfigService.ts:74](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L74)

Get MP3 bitrate

#### Returns

`number`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getBitrateMP3`](../interfaces/ConfigService.md#getbitratemp3)

***

### getBufferSize()

> **getBufferSize**(): `number`

Defined in: [services/GenericConfigService.ts:54](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L54)

Get buffer size setting

#### Returns

`number`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getBufferSize`](../interfaces/ConfigService.md#getbuffersize)

***

### getConfig()

> **getConfig**(`key`): `undefined` \| `null` \| `string`

Defined in: [services/GenericConfigService.ts:18](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L18)

Get config with a key

#### Parameters

##### key

`string`

The key

#### Returns

`undefined` \| `null` \| `string`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getConfig`](../interfaces/ConfigService.md#getconfig)

***

### getSampleRate()

> **getSampleRate**(): `number`

Defined in: [services/GenericConfigService.ts:64](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L64)

Get sample rate, or 0 for auto

#### Returns

`number`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getSampleRate`](../interfaces/ConfigService.md#getsamplerate)

***

### getSoundBasePath()

> **getSoundBasePath**(): `string`

Defined in: [services/GenericConfigService.ts:100](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L100)

Return the base path for audio files (reverb environments for example)

#### Returns

`string`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getSoundBasePath`](../interfaces/ConfigService.md#getsoundbasepath)

***

### getWorkerBasePath()

> **getWorkerBasePath**(): `string`

Defined in: [services/GenericConfigService.ts:96](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L96)

Return the base path for worker files

#### Returns

`string`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getWorkerBasePath`](../interfaces/ConfigService.md#getworkerbasepath)

***

### getWorkletBasePath()

> **getWorkletBasePath**(): `string`

Defined in: [services/GenericConfigService.ts:92](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L92)

Return the base path for worklet files

#### Returns

`string`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`getWorkletBasePath`](../interfaces/ConfigService.md#getworkletbasepath)

***

### isAudioWorkletEnabled()

> **isAudioWorkletEnabled**(): `boolean`

Defined in: [services/GenericConfigService.ts:34](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L34)

Check if AudioWorklet is enabled for the filters

#### Returns

`boolean`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`isAudioWorkletEnabled`](../interfaces/ConfigService.md#isaudioworkletenabled)

***

### isCompatibilityModeChecked()

> **isCompatibilityModeChecked**(): `boolean`

Defined in: [services/GenericConfigService.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L30)

Was compatibility/direct audio rendering mode already checked for auto enabling? (if an error occurs rendering in offline context)

#### Returns

`boolean`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`isCompatibilityModeChecked`](../interfaces/ConfigService.md#iscompatibilitymodechecked)

***

### isCompatibilityModeEnabled()

> **isCompatibilityModeEnabled**(): `boolean`

Defined in: [services/GenericConfigService.ts:26](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L26)

Check if the compatibility/direct audio rendering mode is enabled

#### Returns

`boolean`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`isCompatibilityModeEnabled`](../interfaces/ConfigService.md#iscompatibilitymodeenabled)

***

### isInitialRenderingDisabled()

> **isInitialRenderingDisabled**(): `boolean`

Defined in: [services/GenericConfigService.ts:116](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L116)

Check if initial audio rendering (when opening a file or buffer) is disabled

#### Returns

`boolean`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`isInitialRenderingDisabled`](../interfaces/ConfigService.md#isinitialrenderingdisabled)

***

### isSoundtouchAudioWorkletEnabled()

> **isSoundtouchAudioWorkletEnabled**(): `boolean`

Defined in: [services/GenericConfigService.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L44)

Check if AudioWorklet mode is enabled for Soundtouch

#### Returns

`boolean`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`isSoundtouchAudioWorkletEnabled`](../interfaces/ConfigService.md#issoundtouchaudioworkletenabled)

***

### setConfig()

> **setConfig**(`key`, `value`): `void`

Defined in: [services/GenericConfigService.ts:22](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L22)

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

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`setConfig`](../interfaces/ConfigService.md#setconfig)

***

### setSoundBasePath()

> **setSoundBasePath**(`soundBasePath`): `void`

Defined in: [services/GenericConfigService.ts:112](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L112)

Set the base path for audio files (reverb environments for example)

#### Parameters

##### soundBasePath

`string`

The base path

#### Returns

`void`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`setSoundBasePath`](../interfaces/ConfigService.md#setsoundbasepath)

***

### setWorkerBasePath()

> **setWorkerBasePath**(`workerBasePath`): `void`

Defined in: [services/GenericConfigService.ts:108](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L108)

Set the base path for worker files

#### Parameters

##### workerBasePath

`string`

The base path

#### Returns

`void`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`setWorkerBasePath`](../interfaces/ConfigService.md#setworkerbasepath)

***

### setWorkletBasePath()

> **setWorkletBasePath**(`workletBasePath`): `void`

Defined in: [services/GenericConfigService.ts:104](https://github.com/Eliastik/simple-sound-studio-lib/blob/4c259d6f225306533b6d6acc4801cf91fccfe063/lib/services/GenericConfigService.ts#L104)

Set the base path for worklet files

#### Parameters

##### workletBasePath

`string`

The base path

#### Returns

`void`

#### Implementation of

[`ConfigService`](../interfaces/ConfigService.md).[`setWorkletBasePath`](../interfaces/ConfigService.md#setworkletbasepath)
