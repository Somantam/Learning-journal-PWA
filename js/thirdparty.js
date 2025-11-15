// ========================================================
// LAB 4: THIRD-PARTY API (Type.fit Quotes - Keyless)
// Fetches and displays a random quote on the homepage.
// ========================================================

function fetchAndDisplayQuote() {
    // 1. Select the placeholder element
    const quoteContainer = document.getElementById('quote-container');
    
    // Only run this function if the placeholder is present (i.e., we are on index.html)
    if (!quoteContainer) {
        return;
    }

    // 2. Use the Fetch API to get data from a reliable external service
    fetch("https://type.fit/api/quotes")
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch quote: Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Pick a random quote from the array
            const randomIndex = Math.floor(Math.random() * data.length);
            const quoteData = data[randomIndex];

            const quoteText = quoteData.text;
            const author = quoteData.author || 'Unknown'; // Default author if null

            // 3. DOM Manipulation: Insert the styled quote into the placeholder
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
document.addEventListener('DOMContentLoaded', fetchAndDisplayQuote);
