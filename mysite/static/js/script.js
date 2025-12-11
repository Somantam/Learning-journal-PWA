// ========================================================
// LAB 3: CORE JAVASCRIPT FUNCTIONS
// Handles Navigation and Live Date
// ========================================================

// NOTE: toggleTheme() is defined in storage.js and called here

// --- Navigation Insertion (Lab 3) ---
function loadNavigation() {
    const currentPath = window.location.pathname;

    const navHTML = `
        <nav>
            <ul>
                <li><a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a></li>
                <li><a href="/journal" class="${currentPath === '/journal' ? 'active' : ''}">Journal</a></li>
                <li><a href="/projects" class="${currentPath === '/projects' ? 'active' : ''}">Projects</a></li>
                <li><a href="/about" class="${currentPath === '/about' ? 'active' : ''}">About</a></li>
            </ul>
        </nav>
        <button id="theme-toggle">Toggle Dark Mode</button>
    `;

    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        // Insert navigation
        navPlaceholder.innerHTML = navHTML;

        // Listener for the theme toggle button
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }
    }
}

// --- Live Date (Lab 3) ---
function displayLiveDate() {
    const dateElement = document.getElementById('live-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);

        dateElement.textContent = `Today is: ${dateString}`;
        dateElement.style.marginTop = '15px';
        dateElement.style.fontWeight = '600';
        dateElement.style.color = 'var(--primary-color)';
    }
}

// ========================================================
// LAB 7: PWA FEATURES (Extra Feature: Offline Detection)
// ========================================================
function updateOnlineStatus() {
    const indicator = document.getElementById('offline-indicator');

    // Only run if the indicator exists in HTML
    if (indicator) {
        if (navigator.onLine) {
            indicator.style.display = 'none'; // Hide if online
        } else {
            indicator.style.display = 'block'; // Show red banner if offline
        }
    }
}

// ========================================================
// INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    displayLiveDate();

    // Check online status immediately on load
    updateOnlineStatus();
});

// Listen for network changes (Lab 7 Extra Feature)
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// --- PWA: Register Service Worker (Lab 7) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.log('Service Worker registration failed: ', err));
    });
}
