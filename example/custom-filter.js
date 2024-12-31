import { SoundStudioFactory, AbstractAudioFilter, UtilFunctions } from "../dist/esm/SimpleSoundStudioLibrary.js";

// Example of using the library and creating a custom filter

// The custom filter
class CustomGainFilter extends AbstractAudioFilter {
    gainIncrease = 20; // db

    getNode(context) {
        const gainNodeFilter = context.createGain();
        gainNodeFilter.gain = this.gainIncrease;

        return {
            input: gainNodeFilter,
            output: gainNodeFilter
        };
    }
    
    get order() {
        // This is the order in which the filter will be executed (priority)
        return 1;
    }

    get id() {
        return "gainBoost";
    }

    getSettings() {
        return {
            gainIncrease: this.gainIncrease
        };
    }

    async setSetting(settingId, value) {
        if(!UtilFunctions.isSettingValueValid(value)) {
            return;
        }

        switch(settingId) {
        case "gainIncrease":
            this.gainIncrease = parseInt(value);
            break;
        }
    }
}

// Create the audio editor (the main component for audio processing and editing)
const audioEditor = SoundStudioFactory.createAudioEditor();

// Set base paths for worklet and worker files, as the default base path is incorrect (defaults to an empty string).
SoundStudioFactory.getConfigServiceInstance().setWorkletBasePath("/dist/worklets/");
SoundStudioFactory.getConfigServiceInstance().setWorkerBasePath("/dist/workers/");

// Add the custom filter and enable it
audioEditor.addFilters(new CustomGainFilter());
audioEditor.enableFilter("gainBoost");

// By default, the limiter filter is enabled
console.log("Filter states (enabled/disabled):", audioEditor.getFiltersState());

// Change the settings of the gain booster filter
await audioEditor.changeFilterSettings("gainBoost", {
    gainIncrease: "25",  // Set the amount of boost in decibels
});

console.log("Gain booster settings:", audioEditor.getFiltersSettings().get("gainBoost"));

// The audio editor is now ready for audio processing

// When the user selects an audio file and clicks "validate", process and download the rendered audio as a MP3 file
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

    // Save the rendered audio to a file
    await audioEditor.saveBuffer({ format: "mp3" });
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
