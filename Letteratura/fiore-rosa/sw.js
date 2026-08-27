const CACHE = "fiore-rosa-v1.0.0";
const ASSETS = ["./","./index.html","./styles.css","./content.js","./logic.js","./app.js","./manifest.webmanifest","./offline.html","./assets/maps/rete_significati.svg","./assets/maps/sintesi_contesti.svg","./assets/images/hero_rosa_molti_mondi.webp","./assets/images/rosa_materiale_laboratorio.webp","./assets/images/tacuinum_rose.jpg","./assets/images/lochner_madonna_roseto.jpg","./assets/images/corte_giardino_ricostruzione.webp","./assets/images/corte_performance_ricostruzione.webp","./assets/images/roman_rose_amore.webp","./assets/images/scriptorium_ricostruzione.webp","./assets/images/candida_rosa_visione.webp","./assets/icons/icon-192.png","./assets/icons/icon-512.png","./assets/icons/icon-maskable-512.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    if (response && response.ok && event.request.url.startsWith(self.location.origin)) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => event.request.mode === "navigate" ? caches.match("./offline.html") : undefined)));
});
