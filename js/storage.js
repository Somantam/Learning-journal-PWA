// ========================================================
// LAB 4: STORAGE API (Local Storage)
// Manages theme persistence and journal entry saving/retrieval.
// ========================================================

const THEME_KEY = 'themePreference';
const JOURNAL_ENTRY_KEY = 'latestJournalEntry'; 

// --- Theme Management ---
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    const newTheme = isDark ? 'dark' : 'light';
    saveTheme(newTheme);
}

// --- Journal Entry Management (Called by browser.js) ---

function saveEntryFromInput() {
    const inputElement = document.getElementById('new-entry-text');
    let entryToSave = 'No content provided.'; 

    if (inputElement && inputElement.value.trim() !== '') {
        entryToSave = inputElement.value.trim() + 
                      `\n\n[Saved: ${new Date().toLocaleString()}]`;
        inputElement.value = '';
    } else if (localStorage.getItem(JOURNAL_ENTRY_KEY)) {
        return localStorage.getItem(JOURNAL_ENTRY_KEY);
    }
    
    localStorage.setItem(JOURNAL_ENTRY_KEY, entryToSave);
    return entryToSave;
}

function retrieveAndDisplayEntry() {
    const savedEntry = localStorage.getItem(JOURNAL_ENTRY_KEY);
    const displayElement = document.getElementById('saved-entry-display');

    if (displayElement) {
        if (savedEntry) {
            displayElement.innerHTML = `<h3>Retrieved Entry (Persisted):</h3><pre style="white-space: pre-wrap; font-family: inherit;">${savedEntry}</pre>`;
        } else {
            displayElement.innerHTML = `<p>No recent entry found in Local Storage. Write one above!</p>`;
        }
    }
}

// Initialization for Storage API
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load the theme preference immediately (Required to happen first!)
    loadTheme(); 
    
    // 2. If we are on the journal page, retrieve the last saved entry
    if (document.getElementById('journal-storage-feature')) {
        retrieveAndDisplayEntry();
    }
});
