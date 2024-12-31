import { SoundStudioFactory, FilterNames } from "../dist/esm/SimpleSoundStudioLibrary.js";

// Minimal example of using the library

// Create the audio editor (the main component for audio processing and editing)
const audioEditor = SoundStudioFactory.createAudioEditor();

// Set base paths for worklet and worker files, as the default base path is incorrect (defaults to an empty string).
SoundStudioFactory.getConfigServiceInstance().setWorkletBasePath("/dist/worklets/");
SoundStudioFactory.getConfigServiceInstance().setWorkerBasePath("/dist/workers/");

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

// The audio editor is now ready for audio processing

// When the user selects an audio file and clicks "validate", process and download the rendered audio as a WAV file
async function processAudioThenDownload(file) {
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

    // Save the rendered audio to a file (default format is WAV, but can be changed to MP3)
    await audioEditor.saveBuffer();
    // await audioEditor.saveBuffer({ format: "mp3" }); // Uncomment to save as MP3 file
}

document.getElementById("validate-button").addEventListener("click", async () => {
    document.getElementById("validate-button").setAttribute("disabled", "disabled");
    document.getElementById("validate-button").style.cursor = "wait";

    const fileInput = document.getElementById("file-input");

    if(fileInput && fileInput.files[0]) {
        await processAudioThenDownload(fileInput.files[0]);
    }

    // Re-enable the button after processing is complete
    document.getElementById("validate-button").removeAttribute("disabled");
    document.getElementById("validate-button").style.cursor = "";
});
