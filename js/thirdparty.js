// ========================================================
// LAB 4: THIRD-PARTY API (ZenQuotes API - Keyless)
// Fetches and displays a random quote on the homepage.
// ========================================================

function fetchAndDisplayQuote() {
    // 1. Select the placeholder element
    const quoteContainer = document.getElementById('quote-container');
    
    // Only run this function if the placeholder is present (i.e., we are on index.html)
    if (!quoteContainer) {
        return;
    }

    // 2. Use the Fetch API to get data from the external service
    fetch("https://zenquotes.io/api/random")
        .then(response => {
            if (!response.ok) {
                // Handle network error
                throw new Error('Could not fetch quote: Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // 3. Extract the quote text (q) and author (a)
            const quoteText = data[0].q;
            const author = data[0].a;

            // 4. DOM Manipulation: Insert the styled quote into the placeholder
            quoteContainer.innerHTML = `
                <blockquote style="margin-top: 20px; font-style: italic; border-left: 4px solid var(--primary-color); padding-left: 10px;">
                    "${quoteText}"
                    <footer style="margin-top: 5px; font-size: 0.9em; text-align: right;">— ${author}</footer>
                </blockquote>
            `;
        })
        .catch(error => {
            // Display an error message if the API fails
            console.error("Error fetching quote:", error);
            quoteContainer.innerHTML = '<p style="color: red; margin-top: 20px;">Could not load quote of the day.</p>';
        });
}

// Initialization for Third-Party API
// Ensures the fetch happens as soon as the DOM is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayQuote);
