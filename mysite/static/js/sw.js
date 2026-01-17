// mysite/static/sw.js

const CACHE_NAME = 'journal-v4';

const ASSETS_TO_CACHE = [
    '/',                  // Homepage
    '/journal',           // Journal Page
    '/projects',          // Projects Page
    '/about',             // About Page
    '/timer',             // <--- NEW: Timer Page Route
    '/static/css/style.css',
    '/static/js/storage.js',
    '/static/js/script.js',
    '/static/js/browser.js',
    '/static/js/jsonhandler.js',
    '/static/js/thirdparty.js',
    '/static/js/timer.js', // <--- NEW: Timer Logic Script
    '/static/manifest.json',
    '/static/images/icon-192.png',
    '/static/images/icon-512.png'
];

// 1. Install Event: Cache static assets
self.addEventListener('install', (event) => {
    // ... (This part stays the same) ...
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching all assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                // This checks if the key matches the NEW cache name (journal-v2)
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// 3. Fetch Event: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
    // ... (This part stays the same) ...
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                return caches.match(event.request);
            })
    );
});
