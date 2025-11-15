// ========================================================
// LAB 4: THIRD-PARTY API (Advice Slip API - Keyless)
// Fetches and displays a random piece of advice on the homepage.
// ========================================================

function fetchAndDisplayQuote() {
    // 1. Select the placeholder element
    const quoteContainer = document.getElementById('quote-container');
    
    // Only run this function if the placeholder is present (i.e., we are on index.html)
    if (!quoteContainer) {
        return;
    }

    // 2. Use the Fetch API to get data from the external service
    fetch("https://api.adviceslip.com/advice")
        .then(response => {
            if (!response.ok) {
                // Handle network error
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // 3. Extract the advice text (data returns {slip: {id, advice}})
            const adviceText = data.slip.advice;

            // 4. DOM Manipulation: Insert the styled advice into the placeholder
            quoteContainer.innerHTML = `
                <blockquote style="margin-top: 20px; font-style: italic; border-left: 4px solid var(--primary-color); padding-left: 10px;">
                    "${adviceText}"
                    <footer style="margin-top: 5px; font-size: 0.9em; text-align: right;">— Daily Wisdom</footer>
                </blockquote>
            `;
        })
        .catch(error => {
            // Display a generic error message if the API fails
            console.error("Error fetching advice:", error);
            quoteContainer.innerHTML = '<p style="color: red; margin-top: 20px;">Could not load daily wisdom.</p>';
        });
}

// Initialization for Third-Party API
document.addEventListener('DOMContentLoaded', fetchAndDisplayQuote);
