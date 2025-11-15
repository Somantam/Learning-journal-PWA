// ========================================================
// LAB 4: BROWSER API (Notifications API) - UPDATED
// Handles permission request and notification sending/fallback.
// ========================================================

// NOTE: saveEntryFromInput() and retrieveAndDisplayEntry() are defined in storage.js

function sendNotification(title, body) {
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification.");
        alert("Success! Entry saved to Local Storage."); // FALLBACK 1: If browser doesn't support API
        return;
    }

    // Crucial: Request permission and handle the result in a promise
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            // Success: Send the notification
            new Notification(title, {
                body: body,
                icon: "images/icon512.png" 
            });
        } else {
            // FALLBACK 2: If permission is denied, alert the user
            console.warn("Notification permission was denied or ignored.");
            alert("Success! Entry saved to Local Storage (Notification blocked by browser).");
        }
    });
}

function handleSaveAndNotify(event) {
    event.preventDefault(); 
    
    // 1. Save entry (calling function from storage.js)
    const entry = saveEntryFromInput();

    // 2. Send Notification OR trigger fallback alert
    sendNotification("Journal Saved!", `Your entry has been saved to Local Storage.`);
    
    // 3. Update the display immediately
    retrieveAndDisplayEntry();
}

// Initialization for Browser API
document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entry-form'); // Target the FORM
    
    if (entryForm) {
        // Handle form submission event
        entryForm.addEventListener('submit', handleSaveAndNotify);
    }
});
