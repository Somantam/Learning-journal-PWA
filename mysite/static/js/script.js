// LAB 3 & HOME PAGE ANIMATIONS

// NOTE: toggleTheme() is defined in storage.js and called here

// --- Navigation Insertion ---
function loadNavigation() {
    const currentPath = window.location.pathname;

    const navHTML = `
        <nav>
            <ul>
                <li><a href="/" class="${currentPath === '/' ? 'active' : ''}">Home</a></li>
                <li><a href="/journal" class="${currentPath === '/journal' ? 'active' : ''}">Journal</a></li>
                <li><a href="/projects" class="${currentPath === '/projects' ? 'active' : ''}">Projects</a></li>
                <li><a href="/timer" class="${currentPath === '/timer' ? 'active' : ''}">Timer</a></li>
                <li><a href="/about" class="${currentPath === '/about' ? 'active' : ''}">About</a></li>
            </ul>
        </nav>
        <button id="theme-toggle">Toggle Dark Mode</button>
    `;

    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = navHTML;
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }
    }
}

// --- Live Date ---
function displayLiveDate() {
    const dateElement = document.getElementById('live-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = `Today is: ${now.toLocaleDateString('en-US', options)}`;
    }
}

// --- Dynamic Greeting ---
function initDynamicGreeting() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    // Set text immediately - NO TYPING ANIMATION
    typingElement.textContent = `${greeting}, I'm Soman!`;

    // Force visibility
    typingElement.style.color = "#ffffff";
    typingElement.style.textShadow = "0 2px 8px rgba(0,0,0,0.8)";
}

// --- Lab 7: Offline Detection ---
function updateOnlineStatus() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
        if (navigator.onLine) {
            indicator.style.display = 'none';
        } else {
            indicator.style.display = 'block';
        }
    }
}


// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    displayLiveDate();
    updateOnlineStatus();
    initDynamicGreeting(); // Start the animation
});

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.log('Service Worker registration failed: ', err));
    });
}
