const CACHE_NAME = 'amor-cortese-v1.1.0';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './visual-upgrade.css',
  './app.js',
  './visual-upgrade.js',
  './manifest.webmanifest',
  './assets/cover-amor-cortese.svg',
  './assets/cover-interactive.svg',
  './assets/icon.svg',
  './assets/maps/che-cos-e.svg',
  './assets/maps/famiglia-nobiliare.svg',
  './assets/maps/andrea-cappellano.svg',
  './assets/maps/trovatori-provenzali.svg',
  './assets/maps/bernart-ventadorn.svg',
  './assets/maps/trovatrici.svg',
  './assets/maps/beatritz-de-dia.svg'
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
