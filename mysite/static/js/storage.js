// ========================================================
// LAB 4/6: STORAGE API (Local Storage)
// FIX: Theme functions are defined in the global scope for script.js access.
// ========================================================

const THEME_KEY = 'themePreference';
const JOURNAL_ENTRY_KEY = 'latestJournalEntry';

// --- Theme Management (MOVED TO GLOBAL SCOPE FOR RELIABILITY) ---
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// THIS FUNCTION IS CALLED BY script.js
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    const newTheme = isDark ? 'dark' : 'light';
    saveTheme(newTheme);
}

// --- Journal Entry Management (Remains in global scope) ---

function saveEntryFromInput() {
    const inputElement = document.getElementById('new-entry-text');
    let entryToSave = 'No content provided.';

    if (inputElement && inputElement.value.trim() !== '') {
        entryToSave = inputElement.value.trim() +
                      `\n\n[Saved: ${new Date().toLocaleString()}]`;
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
    // 1. Load the theme preference immediately
    loadTheme();

    // 2. If we are on the journal page, retrieve the last saved entry
    if (document.getElementById('journal-storage-feature')) {
        retrieveAndDisplayEntry();
    }
});
