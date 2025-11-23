document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('export-json');
    const container = document.getElementById('json-reflections');
    const countSpan = document.getElementById('reflection-count');
    
    console.log(' JSON Handler loaded');
    console.log('Container found:', container);
    console.log('Count span found:', countSpan);
    
    // Auto-load reflections on page load
    setTimeout(loadReflections, 500);
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportJSON);
    }
    
    function loadReflections() {
        console.log(' Loading reflections from JSON...');
        
        fetch('./backend/reflections.json')
            .then(response => {
                console.log(' Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Failed to load JSON file');
                }
                return response.json();
            })
            .then(reflections => {
                console.log(' Loaded reflections:', reflections);
                
                // Update counter
                if (countSpan) {
                    countSpan.textContent = reflections.length;
                    console.log(' Counter updated to:', reflections.length);
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
                
                console.log(' Reflections displayed successfully');
            })
            .catch(error => {
                console.error(' Error loading JSON:', error);
                container.innerHTML = '<p>Error loading reflections. Check console for details.</p>';
                if (countSpan) {
                    countSpan.textContent = '0';
                }
            });
    }
    
    function exportJSON() {
        console.log(' Export button clicked');
        
        fetch('./backend/reflections.json')
            .then(response => response.json())
            .then(reflections => {
                const data = JSON.stringify(reflections, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'my-reflections.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log(' Export completed');
                alert('Reflections exported successfully!');
            })
            .catch(error => {
                console.error(' Export failed:', error);
                alert('Export failed: ' + error.message);
            });
    }
});