import { SoundStudioFactory, FilterNames, EventType } from "../dist/esm/SimpleSoundStudioLibrary.js";

// Minimal example of using the library

// Create a new instance of SoundStudio components (audioEditor for audio processing and editing, configService, etc.)
const { audioEditor, audioPlayer, configService, eventEmitter } = SoundStudioFactory.createNewInstance();

// Set base paths for worklet and worker files, as the default base path is incorrect (defaults to an empty string).
configService.setWorkletBasePath("/dist/worklets/");
configService.setWorkerBasePath("/dist/workers/");

// Enable a built-in filter (Bass Boost filter in this case)
audioEditor.enableFilter(FilterNames.BASS_BOOST);

// By default, the limiter filter is enabled
console.log("Filter states (enabled/disabled):", audioEditor.getFiltersState());

// Change the settings of the bass-boost filter
// The settings object corresponds to the BassBoosterSettings interface in lib/model/filterSettings
await audioEditor.changeFilterSettings(FilterNames.BASS_BOOST, {
    dbBooster: "20",  // Set the amount of boost in decibels
    dbReduce: "0"     // Set the reduction in decibels
});

console.log("Bass booster settings:", audioEditor.getFiltersSettings().get(FilterNames.BASS_BOOST));

// Listen to events from event emitter to get audio rendering state (progress)
eventEmitter.on(EventType.STARTED_RENDERING_AUDIO, () => document.getElementById("processing-audio").style.display = "block");
eventEmitter.on(EventType.UPDATE_AUDIO_TREATMENT_PERCENT, percent => document.getElementById("processing-progress").value = percent);
eventEmitter.on(EventType.UPDATE_REMAINING_TIME_ESTIMATED, estimatedTime => displayRemainingTime(estimatedTime));
eventEmitter.on(EventType.AUDIO_RENDERING_FINISHED, () => document.getElementById("processing-audio").style.display = "none");

// The audio editor is now ready for audio processing

document.getElementById("volume").value = audioPlayer.volume;

// When the user selects an audio file and clicks "validate", process and download the rendered audio as a WAV file
async function processAudio(file) {
    // Load the selected audio file into the audio editor
    try {
        await audioEditor.loadBufferFromFile(file);
    } catch(e) {
        // If an error occurs during audio decoding
        console.error("Error when loading audio file:", e);
        return;
    }

    // Process and render the audio
    try {
        await audioEditor.renderAudio();
    } catch(e) {
        // If an error occurs during audio rendering
        console.error("Error when rendering audio:", e);
        return;
    }
}

document.getElementById("validate-button").addEventListener("click", async () => {
    document.getElementById("validate-button").setAttribute("disabled", "disabled");
    document.getElementById("validate-button").style.cursor = "wait";

    const fileInput = document.getElementById("file-input");

    if(fileInput && fileInput.files[0]) {
        await processAudio(fileInput.files[0]);
    }

    // Re-enable the button after processing is complete
    document.getElementById("validate-button").removeAttribute("disabled");
    document.getElementById("validate-button").style.cursor = "";
});

function displayRemainingTime(estimatedTime) {
    let estimatedText = "";

    if(estimatedTime === -1) {
        estimatedText = "Calculating processing time remaining...";
    } else if (estimatedTime < 5) {
        estimatedText = "A few seconds remaining";
    } else {
        const roundedTime = Math.round(estimatedTime / 5) * 5;
        const minutes = Math.floor(roundedTime / 60);
        const seconds = roundedTime % 60;

        if(minutes > 0 && seconds > 0) {
            estimatedText = `About ${minutes} minute${minutes > 1 ? "s" : ""} and ${seconds} second${seconds > 1 ? "s" : ""} remaining`;
        } else if(minutes > 0) {
            estimatedText = `About ${minutes} minute${minutes > 1 ? "s" : ""} remaining`;
        } else {
            estimatedText = `About ${seconds} second${seconds > 1 ? "s" : ""} remaining`;
        }
    }

    document.getElementById("processing-progress-remaining").innerText = estimatedText;
}

document.getElementById("play-button").addEventListener("click", async () => {
    audioPlayer.start();
});

document.getElementById("pause-button").addEventListener("click", async () => {
    audioPlayer.pause();
});

document.getElementById("stop-button").addEventListener("click", async () => {
    audioPlayer.reset();
    audioPlayer.stop();
});

document.getElementById("volume").addEventListener("input", async () => {
    audioPlayer.volume = parseFloat(document.getElementById("volume").value);
});

document.getElementById("cancel-button").addEventListener("click", async () => {
    audioEditor.cancelAudioRendering();
});
