# Filters

## English

This documentation list all filters available in this library and their settings.

The filters code is located in [lib/filters/](lib/filters/) folder.

### BassBoosterFilter

This filter simply apply a bass boost filter to the audio.

#### Settings

```
{
    frequencyBooster: "200",
    frequencyReduce: "200",
    dbBooster: "15",
    dbReduce: "-2"
}
```

* `frequencyBooster`: In hz, frequencies below this will be bass-boosted
* `frequencyReduce`: In hz, frequencies above this will be reduced
* `dbBooster`: In db, set the bass-boosting gain
* `dbReduce`: In db, set the reduction gain

### BitCrusherFilter

This filter apply a 8-bit effect to the audio.

#### Settings

```
{
    bits: "16",
    normFreq: "0.9"
}
```

* `bits`: Set the resolution
* `normFreq`: Set the filter intensity (between 0 and 1)

### EchoFilter

This filter apply an echo effect to the audio. This is a different effect from a reverb.

#### Settings

```
{
    delay: "0.2",
    gain: "0.75"
}
```

* `delay`: Set the delay
* `gain`: Set the gain

### HighPassFilter

This filter apply a high pass effect.

#### Settings

```
{
    highFrequency: "3500"
}
```

* `highFrequency`: In hz, the frequencies below this value will be reduced

### LowPassFilter

This filter apply a low pass effect.

#### Settings

```
{
    lowFrequency: "3500"
}
```

* `lowFrequency`: In hz, the frequencies above this value will be reduced

### LimiterFilter

This filter is brickwall limiter used to reduce distorsion. It can also be set as a standard compressor with certain settings.

#### Settings

```
{
    preGain: "0",
    postGain: "0",
    attackTime: "0",
    releaseTime: "6",
    threshold: "0",
    lookAheadTime: "0.3"
}
```

* `preGain`: Gain applied (in db) before signal processing. It can increase the input level.
* `postGain`: Gain applied (in db) after signal processing, allowing you to adjust the output volume. Please note that an excessive value will reintroduce distorsion.
* `attackTime`: The time in seconds for the limiter to reach its maximum level after the signal exceeds the threshold (threshold).
* `releaseTime`: The time in seconds for the limiter to return to its normal level after the signal falls below the threshold.
* `threshold`: The level at which the limiter starts to act. Signals above this level are reduced.
* `lookAheadTime`: The time in seconds, indicating how much ahead the limiter looks at the signal to adjust compression.


### RenderingProgressCalculationFilter

This filter should not be used. It is used to monitor audio processing. It is automatically managed by the library.

#### Settings

This filter does not have any configurable settings.

### ReturnAudioRenderer

This renderer is used to return the audio.

It applies a mirror effect on the audio, reversing it so that the end becomes the beginning and vice versa.

#### Settings

This renderer does not have any configurable settings.

### ReverbFilter

This filter apply a reverb effect to the audio.

#### Settings

```
{
    reverbEnvironment: {
        name: "Reverb Environment Name",
        value: "Reverb Environment URL",
        additionalData: {
            size: "500",
            link: "Additional resource link",
            addDuration: "5"
        }
    },
    reverbCustomEnvironmentFile: null, // Should be a File object
    reverbCustomEnvironmentAddTime: "0" // Optionnal
}
```

* `reverbEnvironment`: The environment in which the reverb effect is simulated.
    * `name`: The name of the reverb environment.
    * `value`: A URL pointing to the reverb environment audio file.
    * `additionalData`: Additional data specific to the environment:
        * `size`: The size of the simulated environment in bytes.
        * `link`: A link (URL) to additional resources or details about the environment.
        * `addDuration`: Extra time to apply to the input audio, extending its duration, in seconds.
* `reverbCustomEnvironmentFile`: A custom reverb environment file, which should be a File object (e.g., a .wav or .ogg file) to apply a custom reverb effect.
* `reverbCustomEnvironmentAddTime`: Additional duration to apply to the input audio when using a custom environment. This parameter is optional.

### SoundtouchWrapperFilter

This filter applies speed and frequency modifications to the audio using the Soundtouch library.

#### Settings

```
{
    speedAudio: "1",
    frequencyAudio: "1"
}
```

* `speedAudio`: This parameter sets the speed of the audio. For example, if set to "2", the audio will play at 2x its normal speed.
* `frequencyAudio`: This parameter adjusts the frequency of the audio. For example, if set to "2", the audio will sound sharper (higher frequency) and pitched up by 2x.

### TelephonizerFilter

This filter applies a phone call effect to the audio, simulating the characteristic sound quality of a telephone call.

#### Settings

This filter does not have any configurable settings.

### VocoderFilter/VocoderRenderer

This filter applies a vocoder effect to the audio, creating a robotic voice sound.

It is preferable to use the VocoderFilter rather than the renderer VocoderRenderer for better control and flexibility.

#### Settings

```
{
    modulatorGainValue: "1",
    carrierSampleGainValue: "0",
    oscillatorGainValue: "1",
    noiseGainValue: "0.2",
    oscillatorDetuneValue: "0"
}
```

* `modulatorGainValue`: Controls the gain of the modulator signal. Increasing this will intensify the effect.
* `carrierSampleGainValue`: Controls the gain of the carrier signal. Affects the strength of the audio output.
* `oscillatorGainValue`: Adjusts the gain of the oscillator signal, influencing the tonal quality.
* `noiseGainValue`: Controls the gain of the noise signal, adding texture to the vocoder effect.
* `oscillatorDetuneValue`: Controls the detuning of the oscillator, affecting the pitch and harmonic content.

## Français

Cette documentation liste tous les filtres disponibles dans cette bibliothèque ainsi que leurs paramètres.

Le code des filtres se trouve dans le dossier [lib/filters/](lib/filters/).

### BassBoosterFilter

Ce filtre applique simplement un filtre de renforcement des basses à l'audio.

#### Paramètres

```
{
    frequencyBooster: "200",
    frequencyReduce: "200",
    dbBooster: "15",
    dbReduce: "-2"
}
```

* `frequencyBooster` : En hz, les fréquences inférieures à cette valeur seront renforcées dans les basses.
* `frequencyReduce` : En hz, les fréquences supérieures à cette valeur seront réduites.
* `dbBooster` : En db, définit le gain de renforcement des basses.
* `dbReduce` : En db, définit le gain de réduction.

### BitCrusherFilter

Ce filtre applique un effet 8 bits à l'audio.

#### Paramètres

```
{
    bits: "16",
    normFreq: "0.9"
}
```

* `bits` : Définir la résolution.
* `normFreq` : Définir l'intensité du filtre (entre 0 et 1).

### EchoFilter

Ce filtre applique un effet d'écho à l'audio. C'est un effet différent de la réverbération.

#### Paramètres

```
{
    delay: "0.2",
    gain: "0.75"
}
```

* `delay` : Définir le délai.
* `gain` : Définir le gain.

### HighPassFilter

Ce filtre applique un effet de passe-haut.

#### Paramètres

```
{
    highFrequency: "3500"
}
```

* `highFrequency` : En hz, les fréquences inférieures à cette valeur seront réduites.

### LowPassFilter

Ce filtre applique un effet de passe-bas.

#### Paramètres

```
{
    lowFrequency: "3500"
}
```

* `lowFrequency` : En hz, les fréquences supérieures à cette valeur seront réduites.

### LimiterFilter

Ce filtre est un limiteur de type brickwall utilisé pour réduire la distorsion. Il peut également être configuré comme un compresseur standard avec certains paramètres.

#### Paramètres

```
{
    preGain: "0",
    postGain: "0",
    attackTime: "0",
    releaseTime: "6",
    threshold: "0",
    lookAheadTime: "0.3"
}
```

* `preGain` : Gain appliqué (en db) avant le traitement du signal. Il peut augmenter le niveau d'entrée.
* `postGain` : Gain appliqué (en db) après le traitement du signal, permettant d'ajuster le volume de sortie. Notez qu'une valeur excessive réintroduira de la distorsion.
* `attackTime` : Le temps (en secondes) que le limiteur met pour atteindre son niveau maximal après que le signal dépasse le seuil.
* `releaseTime` : Le temps (en secondes) que le limiteur met pour revenir à son niveau normal après que le signal soit tombé sous le seuil.
* `threshold` : Le niveau auquel le limiteur commence à agir. Les signaux au-dessus de ce niveau sont réduits.
* `lookAheadTime` : Le temps (en secondes) qui indique combien d'avance le limiteur analyse le signal pour ajuster la compression.

### RenderingProgressCalculationFilter

Ce filtre ne doit pas être utilisé. Il sert à surveiller le traitement audio. Il est géré automatiquement par la bibliothèque.

#### Paramètres

Ce filtre n'a pas de paramètres configurables.

### ReturnAudioRenderer

Ce rendu est utilisé pour retourner l'audio.

Il applique un effet miroir à l'audio, inversant ainsi le début et la fin.

#### Paramètres

Ce rendu n'a pas de paramètres configurables.

### ReverbFilter

Ce filtre applique un effet de réverbération à l'audio.

#### Paramètres

```
{
    reverbEnvironment: {
        name: "Reverb Environment Name",
        value: "Reverb Environment URL",
        additionalData: {
            size: "500",
            link: "Additional resource link",
            addDuration: "5"
        }
    },
    reverbCustomEnvironmentFile: null, // Should be a File object
    reverbCustomEnvironmentAddTime: "0" // Optionnal
}
```

* `reverbEnvironment` : L'environnement dans lequel l'effet de réverbération est simulé.
    * `name` : Le nom de l'environnement de réverbération.
    * `value` : Une URL pointant vers le fichier audio de l'environnement de réverbération.
    * `additionalData` : Données supplémentaires spécifiques à l'environnement :
        * `size` : La taille de l'environnement simulé en octets.
        * `link` : Un lien (URL) vers des ressources supplémentaires ou des détails sur l'environnement.
        * `addDuration` : Durée supplémentaire à appliquer à l'audio d'entrée, prolongeant sa durée, en secondes.
* `reverbCustomEnvironmentFile` : Un fichier d'environnement de réverbération personnalisé, qui doit être un objet File (par exemple, un fichier .wav ou .ogg) pour appliquer un effet de réverbération personnalisé.
* `reverbCustomEnvironmentAddTime` : Durée supplémentaire à appliquer à l'audio d'entrée lors de l'utilisation d'un environnement personnalisé. Ce paramètre est optionnel.

### SoundtouchWrapperFilter

Ce filtre applique des modifications de vitesse et de fréquence à l'audio en utilisant la bibliothèque Soundtouch.

#### Paramètres

```
{
    speedAudio: "1",
    frequencyAudio: "1"
}
```

* `speedAudio` : Ce paramètre définit la vitesse de l'audio. Par exemple, si la valeur est "2", l'audio sera joué à 2x sa vitesse normale.
* `frequencyAudio` : Ce paramètre ajuste la fréquence de l'audio. Par exemple, si la valeur est "2", l'audio sera plus aigu (fréquence plus élevée) et la tonalité sera doublée.

### TelephonizerFilter

Ce filtre applique un effet de type appel téléphonique à l'audio, simulant la qualité sonore caractéristique d'un appel téléphonique.

#### Paramètres

Ce filtre n'a pas de paramètres configurables.

### VocoderFilter/VocoderRenderer

Ce filtre applique un effet vocoder à l'audio, créant un son de voix robotisée.

Il est préférable d'utiliser le VocoderFilter plutôt que le rendu VocoderRenderer pour un meilleur contrôle et une plus grande flexibilité.

#### Paramètres

```
{
    modulatorGainValue: "1",
    carrierSampleGainValue: "0",
    oscillatorGainValue: "1",
    noiseGainValue: "0.2",
    oscillatorDetuneValue: "0"
}
```

* `modulatorGainValue` : Contrôle le gain du signal modulateur. L'augmentation de cette valeur intensifiera l'effet.
* `carrierSampleGainValue` : Contrôle le gain du signal porteur. Il affecte la force du signal de sortie.
* `oscillatorGainValue` : Ajuste le gain du signal de l'oscillateur, influençant la qualité tonale.
* `noiseGainValue` : Contrôle le gain du signal de bruit, ajoutant de la texture à l'effet vocoder.
* `oscillatorDetuneValue` : Contrôle le détuning de l'oscillateur, affectant la hauteur et le contenu harmonique.
