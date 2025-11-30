// ========================================================
// LAB 6: JSON HANDLER (Proper Fix for Initial Load)
// ========================================================

// --- 1. LOAD REFLECTIONS (GET Request to Flask) ---
// Made global for use by browser.js
window.loadReflections = function() {
    const container = document.getElementById('json-reflections');
    const countSpan = document.getElementById('reflection-count');

    if (!container) {
        console.log('No reflections container found');
        return;
    }

    console.log('Loading reflections from Flask...');

    // Fetch data from Flask API endpoint
    fetch('/api/reflections')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load reflections from Flask API');
            }
            return response.json();
        })
        .then(reflections => {
            console.log('Reflections loaded:', reflections);

            // Update counter
            if (countSpan) {
                countSpan.textContent = reflections.length;
            }

            if (reflections.length === 0) {
                container.innerHTML = '<p>No reflections yet. Be the first to share your thoughts!</p>';
                return;
            }

            // Display reflections in reverse order (newest first)
            container.innerHTML = reflections
                .slice() // Create a copy to avoid modifying original array
                .reverse() // Show newest first
                .map(reflection => `
                <div class="reflection-card">
                    <div class="reflection-header">
                        <strong>${reflection.name || 'Anonymous'}</strong>
                        <span class="reflection-date">${reflection.date}</span>
                    </div>
                    <div class="reflection-text">${reflection.reflection}</div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            container.innerHTML = '<p class="error-message">Error loading reflections. Is the Flask app running on PythonAnywhere?</p>';
            if (countSpan) {
                countSpan.textContent = '0';
            }
        });
}

// --- 2. EXPORT REFLECTIONS (GET Request to Flask) ---
function exportJSON() {
    fetch('/api/reflections')
        .then(response => response.json())
        .then(reflections => {
            const data = JSON.stringify(reflections, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my-reflections-from-flask.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert('Reflections exported successfully!');
        })
        .catch(error => {
            console.error('Export failed:', error);
            alert('Export failed: ' + error.message);
        });
}

// --- 3. DELETE FEATURE (DELETE Request to Flask) ---
function deleteLastReflection() {
    if (!confirm("Are you sure you want to delete the MOST RECENT reflection?")) {
        return;
    }

    fetch('/api/reflections/delete', {
        method: 'DELETE'
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete reflection.');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.loadReflections(); // Refresh the list
    })
    .catch(error => {
        console.error('Delete failed:', error);
        alert('Delete failed: ' + error.message);
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('export-json');
    const deleteBtn = document.getElementById('delete-last-json');

    console.log('JSON Handler initialized');

    // Load reflections when page loads
    if (document.getElementById('json-reflections')) {
        // Small delay to ensure everything is ready
        setTimeout(window.loadReflections, 100);
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', exportJSON);
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteLastReflection);
    }
});
