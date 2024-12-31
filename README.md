# Simple Sound Studio - Library

* Version: 2.2.1 (9/10/2024)
* License: GNU GPL 3

## English

A Web Audio API library used in my [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) (soon to be renamed to Simple Sound Studio) and [Memes Soundbox](https://github.com/Eliastik/memes-soundbox) projects.

This library is written in TypeScript.

### Using the library

You can directly use the bundled version of the library that is present here: [dist/esm/SimpleSoundStudioLibrary.js](dist/esm/SimpleSoundStudioLibrary.js).

Or you can install the npm package using this command:

`npm install @eliastik/simple-sound-studio-lib --save`

The TypeScript types are directly provided by the package.

### Documentation

The documentation of the methods and class can be found here: [docs/](docs/).

The most important part is the [AudioEditor class](docs/classes/AudioEditor.md).

You will also be interested by the [VoiceRecorder class](docs/classes/VoiceRecorder.md).

To construct the object needed to use the features (AudioEditor class/VoiceRecorder class) you will need to use the [SoundStudioFactory](docs/classes/SoundStudioFactory.md).

You also need to expose the worklet and worker files provided by the library at the root of your web application:

- [https://github.com/Eliastik/simple-sound-studio-lib/tree/master/dist/workers](Workers files here)
- [https://github.com/Eliastik/simple-sound-studio-lib/tree/master/dist/worklets](Worklets files here)

If you do not expose the files, the library will try to function as best as it can, but some features will fail:

- If worker files are not correctly exposed: the export-to-audio-file feature will not work
- If worklet files are not correctly exposed: the library will fallback to ScriptProcessorNode for certain filters. This implementation offers lower performance and quality but remains acceptable as a fallback

### Project Structure

The project has the following directory structure:

- `dist/`: Contains the compiled library files.
- `example/`: Contains the minimal example to use the library.
- `docs/`: Documentation for the library's classes and methods.
- `lib/`: Source code of the library written in TypeScript.
- `tests/`: Tests of the library using Jest

### Example

A minimal example using the library can be found here: [example/index.html](example/index.html) and [example/index.js](example/index.js).

To use the example, you can pull the project and launch a webserver at the root folder of this git repository.

Here are a few ways to do this:

#### Using http-server (Node.js):

```
npm install --global http-server
http-server .
```

#### Using Python's built-in server:


```
python -m http.server
```

#### Using PHP built-in server:

```
php -S localhost:3000
```

Once the server is running, open example/index.html in your browser to see the minimal example in action.

Please note that there are other more advanced examples:

- [example/custom-filters.js]: explain how to create a custom audio filter

### Compile the project

If you made a change to the library, you will need to compile it to use your change.

First, install the dependencies using:

`npm install`

Then use this to build the library to the dist folder:

`npm run build`

You can also launch the tests using:

`npm run test`

## Français

Une bibliothèque logicielle pour la Web Audio API utilisée par mes projets [Simple Voice Changer](https://github.com/Eliastik/simple-voice-changer) (qui sera bientôt renommé Simple Sound Studio) et [Memes Soundbox](https://github.com/Eliastik/memes-soundbox).

Cette bibliothèque est écrite en TypeScript.

### Utilisation de la bibliothèque

Vous pouvez directement utiliser la version empaquetée de la bibliothèque qui est présente ici : [dist/esm/SimpleSoundStudioLibrary.js](dist/esm/SimpleSoundStudioLibrary.js).

Ou vous pouvez installer le package npm en utilisant la commande suivante :

`npm install @eliastik/simple-sound-studio-lib --save`

Les types TypeScript sont fournis directement par le package.

### Documentation

La documentation des méthodes et des classes se trouve ici : [docs/](docs/).

La partie la plus importante est la classe [AudioEditor class](docs/classes/AudioEditor.md).

Vous serez également intéressé par la classe [VoiceRecorder class](docs/classes/VoiceRecorder.md).

Pour construire l'objet nécessaire à l'utilisation des fonctionnalités (classe AudioEditor/classe VoiceRecorder), vous devrez utiliser la [SoundStudioFactory](docs/classes/SoundStudioFactory.md).

### Structure du projet

Le projet a la structure de répertoires suivante :

- dist/ : Contient les fichiers de la bibliothèque compilés.
- example/ : Contient l'exemple minimal d'utilisation de la bibliothèque.
- docs/ : Documentation des classes et des méthodes de la bibliothèque.
- lib/ : Code source de la bibliothèque écrit en TypeScript.
- tests/ : Tests de la bibliothèque utilisant Jest.

### Exemple

Un exemple minimal utilisant la bibliothèque se trouve ici : [example/index.html](example/index.html) et [example/index.js](example/index.js).

Pour utiliser l'exemple, vous pouvez cloner le projet et lancer un serveur web à la racine de ce dépôt git.

Voici quelques façons de le faire :

#### Utilisation de http-server (Node.js) :

```
npm install --global http-server
http-server .
```

####  Utilisation du serveur intégré de Python :

```
python -m http.server
```

#### Utilisation du serveur intégré de PHP :

```
php -S localhost:3000
```

Une fois le serveur lancé, ouvrez example/index.html dans votre navigateur pour voir l'exemple minimal en action.

Il y a également d'autres  exemples avancés :

- [example/custom-filters.js]: montre comment créer un filtre audio personnalisé

#### Compiler le projet

Si vous avez apporté une modification à la bibliothèque, vous devrez la compiler pour utiliser votre changement.

Commencez par installer les dépendances avec :

`npm install`

Ensuite, utilisez cette commande pour construire la bibliothèque dans le dossier dist :

`npm run build`

Vous pouvez également lancer les tests avec :

`npm run test`
