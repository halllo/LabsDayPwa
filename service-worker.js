var cacheName = 'meinTollesEvent-1';
var filesToCache = [
  '/',
  '/index.html',
  '/event-abs-circuit.html',
  '/event-restorative-yoga.html',
  '/event-rowing-workout.html',
  '/event-yoga-1.html',
  '/js/main.js',
  '/js/modernizr.js',
  '/js/jquery-3.0.0.min.js',
  '/css/reset.css',
  '/css/style.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
  	caches.match(e.request).then(function(response) {
  	  return response || fetch(e.request);
    })
  );
});