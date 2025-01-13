[**@eliastik/simple-sound-studio-lib**](../README.md)

***

[@eliastik/simple-sound-studio-lib](../README.md) / AbstractAudioFilter

# Class: `abstract` AbstractAudioFilter

Defined in: [filters/interfaces/AbstractAudioFilter.ts:5](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L5)

## Extends

- [`AbstractAudioNode`](AbstractAudioNode.md)

## Extended by

- [`AbstractAudioFilterWorklet`](AbstractAudioFilterWorklet.md)

## Constructors

### new AbstractAudioFilter()

> **new AbstractAudioFilter**(): [`AbstractAudioFilter`](AbstractAudioFilter.md)

#### Returns

[`AbstractAudioFilter`](AbstractAudioFilter.md)

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`constructor`](AbstractAudioNode.md#constructors)

## Accessors

### id

#### Get Signature

> **get** `abstract` **id**(): `string`

Defined in: [filters/interfaces/AbstractAudioNode.ts:17](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L17)

Returns the id of this filter/renderer

##### Returns

`string`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`id`](AbstractAudioNode.md#id)

***

### order

#### Get Signature

> **get** `abstract` **order**(): `number`

Defined in: [filters/interfaces/AbstractAudioNode.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L14)

Returns the order in which the filter/renderer needs to be applied

##### Returns

`number`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`order`](AbstractAudioNode.md#order)

***

### totalSamples

#### Set Signature

> **set** **totalSamples**(`value`): `void`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:61](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L61)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### bufferFetcherReseted()

> **bufferFetcherReseted**(): `Promise`\<`boolean`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:57](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L57)

Called when the buffer fetcher was reseted

#### Returns

`Promise`\<`boolean`\>

boolean

***

### disable()

> **disable**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:54](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L54)

Disable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`disable`](AbstractAudioNode.md#disable)

***

### enable()

> **enable**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:49](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L49)

Enable this filter/renderer

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`enable`](AbstractAudioNode.md#enable)

***

### getAddingTime()

> **getAddingTime**(): `number`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L23)

Get the amount of time this filter add to the audio

#### Returns

`number`

***

### getDefaultSettings()

> **getDefaultSettings**(): `null` \| [`FilterSettings`](../interfaces/FilterSettings.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:33](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L33)

Returns the default settings of this filter

#### Returns

`null` \| [`FilterSettings`](../interfaces/FilterSettings.md)

***

### getNode()

> `abstract` **getNode**(`context`): [`AudioFilterNodes`](../interfaces/AudioFilterNodes.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:14](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L14)

Return a input and output AudioNode of the filter

#### Parameters

##### context

`BaseAudioContext`

#### Returns

[`AudioFilterNodes`](../interfaces/AudioFilterNodes.md)

***

### getSettings()

> `abstract` **getSettings**(): [`FilterSettings`](../interfaces/FilterSettings.md)

Defined in: [filters/interfaces/AbstractAudioFilter.ts:17](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L17)

Return an object with current settings of this filter

#### Returns

[`FilterSettings`](../interfaces/FilterSettings.md)

***

### initializeDefaultSettings()

> **initializeDefaultSettings**(): `void`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:28](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L28)

Store the default settings

#### Returns

`void`

***

### injectDependencies()

> **injectDependencies**(`bufferFetcherService`, `bufferDecoderService`, `configService`, `eventEmitter`): `void`

Defined in: [interfaces/AbstractAudioElement.ts:23](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/interfaces/AbstractAudioElement.ts#L23)

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

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`injectDependencies`](AbstractAudioNode.md#injectdependencies)

***

### isDefaultEnabled()

> **isDefaultEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioNode.ts:25](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L25)

Is this filter/renderer enabled by default?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`isDefaultEnabled`](AbstractAudioNode.md#isdefaultenabled)

***

### isEnabled()

> **isEnabled**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioNode.ts:20](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L20)

Is this filter/renderer enabled?

#### Returns

`boolean`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`isEnabled`](AbstractAudioNode.md#isenabled)

***

### isWorklet()

> **isWorklet**(): `boolean`

Defined in: [filters/interfaces/AbstractAudioFilter.ts:49](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L49)

Return if the current filter use an audio worklet

#### Returns

`boolean`

***

### resetSettings()

> **resetSettings**(): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:38](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L38)

Reset the default settings of this filter

#### Returns

`Promise`\<`void`\>

***

### setDefaultEnabled()

> **setDefaultEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:30](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L30)

Set to true if this filter/renderer needs to be enabled by default

#### Parameters

##### state

`boolean`

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`setDefaultEnabled`](AbstractAudioNode.md#setdefaultenabled)

***

### setEnabled()

> **setEnabled**(`state`): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:44](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L44)

Set the enabled/disabled state

#### Parameters

##### state

`boolean`

true to enable, false to disable

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`setEnabled`](AbstractAudioNode.md#setenabled)

***

### setSetting()

> `abstract` **setSetting**(`settingId`, `value`): `Promise`\<`void`\>

Defined in: [filters/interfaces/AbstractAudioFilter.ts:20](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioFilter.ts#L20)

Set a filter setting

#### Parameters

##### settingId

`string`

##### value

[`FilterSettingValue`](../type-aliases/FilterSettingValue.md)

#### Returns

`Promise`\<`void`\>

***

### toggle()

> **toggle**(): `void`

Defined in: [filters/interfaces/AbstractAudioNode.ts:59](https://github.com/Eliastik/simple-sound-studio-lib/blob/0b10c3b81c1652144dad2a0ffc521944ea0abee2/lib/filters/interfaces/AbstractAudioNode.ts#L59)

Toggle to enabled/disabled this filter

#### Returns

`void`

#### Inherited from

[`AbstractAudioNode`](AbstractAudioNode.md).[`toggle`](AbstractAudioNode.md#toggle)
