const CACHE_NAME = 'amor-cortese-v3.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './visual-upgrade.css',
  './app.js',
  './visual-upgrade.js',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/cover-interactive.jpg',
  './assets/maps/che-cos-e.jpg',
  './assets/maps/famiglia-nobiliare.jpg',
  './assets/maps/andrea-cappellano.jpg',
  './assets/maps/trovatori-provenzali.jpg',
  './assets/maps/bernart-ventadorn.jpg',
  './assets/maps/trovatrici.jpg',
  './assets/maps/beatritz-de-dia.jpg',
  './assets/maps/sintesi.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
