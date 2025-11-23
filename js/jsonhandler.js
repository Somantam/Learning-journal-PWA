document.addEventListener('DOMContentLoaded', function() {
    const loadBtn = document.getElementById('load-json');
    const exportBtn = document.getElementById('export-json');
    const container = document.getElementById('json-reflections');
    
    if (loadBtn && container) {
        loadBtn.addEventListener('click', loadReflections);
        setTimeout(loadReflections, 1000);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportJSON);
    }
    
    function loadReflections() {
        fetch('./backend/reflections.json')
            .then(response => response.json())
            .then(reflections => {
                if (reflections.length === 0) {
                    container.innerHTML = '<p>No reflections yet.</p>';
                    return;
                }
                
                container.innerHTML = reflections.map(reflection => `
                    <div style="background: #f8f9fa; padding: 1rem; margin: 1rem 0; border-radius: 8px;">
                        <strong> ${new Date(reflection.date).toLocaleString()}</strong>
                        <p>${reflection.text}</p>
                    </div>
                `).join('');
            })
            .catch(error => {
                container.innerHTML = '<p>Error loading reflections.</p>';
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
                
                alert('Reflections exported!');
            })
            .catch(error => {
                alert('Export failed');
            });
    }
});