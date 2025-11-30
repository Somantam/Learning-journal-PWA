// ========================================================
// LAB 6: BROWSER API & FLASK POST INTEGRATION
// Handles form submission, saves locally, and POSTs to Flask backend.
// ========================================================

// NOTE: saveEntryFromInput() and retrieveAndDisplayEntry() are defined in storage.js
// NOTE: window.loadReflections() is defined and made global in jsonhandler.js

async function handleSaveAndNotify(event) {
    event.preventDefault();

    const inputElement = document.getElementById('new-entry-text');
    const reflectionText = inputElement.value.trim();

    // Simple validation
    if (reflectionText === '') {
        alert("Please enter a reflection before saving.");
        return;
    }

    // 1. --- Local Storage API (Client-side persistence) ---
    saveEntryFromInput(); // Saves to local storage
    retrieveAndDisplayEntry(); // Updates the local display

    // 2. --- Flask API (Server-side persistence via POST) ---
    try {
        const entryData = {
            name: "Soman Tamang",
            reflection: reflectionText
        };

        const response = await fetch("/api/reflections", { // POST to the Flask route
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entryData)
        });

        if (!response.ok) {
            // Throw error if Flask returns an error status (e.g., 400, 500)
            throw new Error(`Server responded with status: ${response.status}`);
        }

        // 3. Update the JSON list display (calls the function made global in jsonhandler.js)
        if (typeof window.loadReflections === 'function') {
             window.loadReflections();
        }

        // 4. Confirmation and Cleanup
        alert("Entry successfully saved to Local Storage AND posted to Flask Backend!");
        // Only clear the input AFTER successful POST to backend
        inputElement.value = '';

    } catch (error) {
        console.error("Error posting reflection to Flask:", error);
        alert("Entry saved locally, but FAILED to post to Flask Backend. Check the browser console.");
    }
}

// Initialization for Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entry-form');

    if (entryForm) {
        // Attach the combined handler to the form's submit event
        entryForm.addEventListener('submit', handleSaveAndNotify);
    }
});
