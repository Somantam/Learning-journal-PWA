document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('export-json');
    const container = document.getElementById('json-reflections');
    const countSpan = document.getElementById('reflection-count');
    
    // Auto-load reflections on page load
    loadReflections();
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportJSON);
    }
    
    function loadReflections() {
        fetch('./backend/reflections.json')
            .then(response => response.json())
            .then(reflections => {
                // Update counter
                if (countSpan) {
                    countSpan.textContent = reflections.length;
                }
                
                if (reflections.length === 0) {
                    container.innerHTML = '<p>No reflections yet.</p>';
                    return;
                }
                
                // Sort by date (newest first)
                reflections.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                container.innerHTML = reflections.map(reflection => `
                    <div class="reflection-card">
                        <div class="reflection-header">
                            <strong> ${new Date(reflection.date).toLocaleString()}</strong>
                        </div>
                        <div class="reflection-text">${reflection.text}</div>
                    </div>
                `).join('');
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
                container.innerHTML = '<p>Error loading reflections.</p>';
                if (countSpan) {
                    countSpan.textContent = '0';
                }
            });
    }
    
    function exportJSON() {
        fetch('./backend/reflections.json')
            .then(response => response.json())
            .then(reflections => {
                const data = JSON.stringify(reflections, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'my-reflections.json';
                a.click();
                URL.revokeObjectURL(url);
                
                alert('Reflections exported successfully!');
            })
            .catch(error => {
                alert('Export failed: ' + error.message);
            });
    }
});