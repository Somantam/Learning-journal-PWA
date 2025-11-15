// ========================================================
// LAB 4: BROWSER API (Notifications API) - FIX
// Handles permission request and notification sending/fallback.
// ========================================================

// NOTE: saveEntryFromInput() and retrieveAndDisplayEntry() are defined in storage.js

// Function to send the notification if permission is granted
function sendNotification(title, body) {
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification.");
        alert("Success! Entry saved to Local Storage."); // FALLBACK 1
        return;
    }

    // NEW LOGIC: Check status before requesting permission
    if (Notification.permission === 'granted') {
        // PERMISSION ALREADY GRANTED: Send notification immediately
        new Notification(title, {
            body: body,
            icon: "images/icon512.png" 
        });
        
    } else if (Notification.permission !== 'denied') {
        // PERMISSION NOT YET GRANTED (or is 'default'): Request it now
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                // Success: Send the notification
                new Notification(title, {
                    body: body,
                    icon: "images/icon512.png" 
                });
            } else {
                // FALLBACK 2: If permission is denied this time
                alert("Success! Entry saved to Local Storage (Notification blocked by browser).");
            }
        });
    } else {
        // PERMISSION WAS DENIED: Use the alert fallback immediately
        console.warn("Notification permission was permanently denied.");
        alert("Success! Entry saved to Local Storage (Notification permanently blocked).");
    }
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
