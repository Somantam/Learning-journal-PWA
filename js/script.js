// ========================================================
// LAB 3: CORE JAVASCRIPT FUNCTIONS 
// Handles Navigation and Live Date
// ========================================================

// NOTE: toggleTheme() is defined in storage.js and called here

// --- Navigation Insertion (Lab 3) ---
function loadNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navHTML = `
        <nav>
            <ul>
                <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
                <li><a href="journal.html" class="${currentPage === 'journal.html' ? 'active' : ''}">Journal</a></li>
                <li><a href="projects.html" class="${currentPage === 'projects.html' ? 'active' : ''}">Projects</a></li>
                <li><a href="about.html" class="${currentPage === 'about.html' ? 'active' : ''}">About</a></li>
            </ul>
        </nav>
    `;

    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        // Insert navigation
        navPlaceholder.innerHTML = navHTML + navPlaceholder.innerHTML;

        // Listener for the theme toggle button (calls function from storage.js)
        const toggleButton = document.getElementById('theme-toggle');
        // We assume toggleTheme() is available globally via the linked storage.js
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
// INITIALIZATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    // NOTE: loadTheme() is initialized in storage.js
    loadNavigation(); 
    displayLiveDate(); 
});
