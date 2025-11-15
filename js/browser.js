// ========================================================
// LAB 4: BROWSER API (SIMPLIFIED ALERT CONFIRMATION)
// Handles form submission and triggers an alert.
// ========================================================

// NOTE: saveEntryFromInput() and retrieveAndDisplayEntry() are defined in storage.js

function handleSaveAndNotify(event) {
    event.preventDefault(); 
    
    // 1. Save entry (calling function from storage.js)
    const entry = saveEntryFromInput();

    // 2. Update the display immediately
    retrieveAndDisplayEntry();
    
    // 3. CONFIRMATION: Trigger the simple JavaScript pop-up every time
    alert("Entry successfully saved to Local Storage!");
}

// Initialization for Browser API
document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entry-form'); // Target the FORM
    
    if (entryForm) {
        // Handle form submission event
        entryForm.addEventListener('submit', handleSaveAndNotify);
    }
});
