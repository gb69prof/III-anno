const VERSION = 'rosa-fresca-v1.0.0';
const CORE = [
  './','./index.html','./offline.html','./styles.css','./scene.css','./app.js','./content.js','./poem.js','./logic.js','./manifest.webmanifest',
  './assets/icons/icon.svg',
  './assets/maps/01-mondo.svg','./assets/maps/02-frattura.svg','./assets/maps/03-testo.svg','./assets/maps/04-duello.svg','./assets/maps/05-poetica.svg','./assets/maps/06-conclusione.svg',
  './assets/scenes/01-borgo.svg','./assets/scenes/02-rosa-sguardo.svg','./assets/scenes/03-primo-rifiuto.svg','./assets/scenes/04-parenti-augustali.svg','./assets/scenes/05-duello-verbale.svg','./assets/scenes/06-frutto-giardino.svg','./assets/scenes/07-vangelo-inatteso.svg','./assets/scenes/08-conclusione-ambigua.svg'
];
self.addEventListener('install', event => event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => { const copy = response.clone(); caches.open(VERSION).then(cache => cache.put('./index.html', copy)); return response; }).catch(() => caches.match('./index.html').then(response => response || caches.match('./offline.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if (response.ok && new URL(event.request.url).origin === location.origin) { const copy = response.clone(); caches.open(VERSION).then(cache => cache.put(event.request, copy)); } return response; })));
});
