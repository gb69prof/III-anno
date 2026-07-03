const CACHE='dante-pwa-gbprof-v1';
const ASSETS=[
 './','./index.html','./styles.css','./app.js','./manifest.webmanifest',
 './assets/icon-192.png','./assets/icon-512.png','./assets/hero-dante.jpg','./assets/dante-index-mockup.png',
 './data/dante-data.json',
 './data/texts/commedia.txt','./data/texts/vita-nuova.txt','./data/texts/convivio.txt','./data/texts/de-vulgari-eloquentia.txt','./data/texts/monarchia.txt','./data/texts/epistole.txt','./data/texts/egloghe.txt','./data/texts/quaestio.txt','./data/texts/fiore.txt','./data/texts/detto-amore.txt'
];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{ const cp=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{}); return resp; }).catch(()=>caches.match('./index.html')))); });
