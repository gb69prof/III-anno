const CACHE_NAME = 'amor-cortese-v4.0.0';
const APP_SHELL = [
  "../../../pwa-common/gbprof-accessibility.css?v=1",
  "../../../pwa-common/gbprof-accessibility.js?v=1",
  "../../../privacy.html",
  "../../../accessibilita.html",
  './',
  './index.html',
  './styles.css',
  './visual-upgrade.css',
  './app.js',
  './visual-upgrade.js',
  './manifest.webmanifest',
  './assets/icon.svg',
  './assets/cover-interactive.png',
  './assets/maps/che-cos-e.png',
  './assets/maps/famiglia-nobiliare.png',
  './assets/maps/andrea-cappellano.png',
  './assets/maps/trovatori-provenzali.png',
  './assets/maps/bernart-ventadorn.png',
  './assets/maps/trovatrici.png',
  './assets/maps/beatritz-de-dia.png',
  './assets/maps/sintesi.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME && key.startsWith(String(CACHE_NAME).includes("-v") ? String(CACHE_NAME).replace(/-v.*$/i, "-") : String(CACHE_NAME))).map(key => caches.delete(key))))
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
