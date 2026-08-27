const CACHE = "dolce-stil-novo-v1.0.1";
const CORE = [
  "./", "./index.html", "./offline.html", "./styles.css?v=1.0.0", "./content.js", "./visuals.js", "./logic.js", "./app.js?v=1.0.1", "./manifest.webmanifest",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./assets/hero/dolce-stil-novo-hero-v2.jpg", "./assets/hero/dolce-stil-novo-hero-v2-1600.webp", "./assets/hero/dolce-stil-novo-hero-v2-960.webp",
  "./assets/maps/mappa-01-mondo-precedente.svg", "./assets/maps/mappa-02-fratture.svg",
  "./assets/maps/mappa-03-immagine-uomo.svg", "./assets/maps/mappa-04-poetica.svg",
  "./assets/maps/mappa-05-opere.svg", "./assets/maps/mappa-06-conclusione.svg",
  "./assets/maps/mappa-01-mondo-precedente.png", "./assets/maps/mappa-02-fratture.png",
  "./assets/maps/mappa-03-immagine-uomo.png", "./assets/maps/mappa-04-poetica.png",
  "./assets/maps/mappa-05-opere.png", "./assets/maps/mappa-06-conclusione.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone(); caches.open(CACHE).then(cache => cache.put("./index.html", copy)); return response;
    }).catch(async () => (await caches.match("./index.html")) || caches.match("./offline.html")));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) {
      const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  })));
});
