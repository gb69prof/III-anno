const CACHE = "scuola-siciliana-v1.0.0";
const CORE = [
  "../../pwa-common/gbprof-accessibility.css?v=1",
  "../../pwa-common/gbprof-accessibility.js?v=1",
  "../../privacy.html",
  "../../accessibilita.html",
  "./", "./index.html", "./offline.html", "./styles.css?v=1.0.0", "./content.js", "./visuals.js", "./logic.js", "./app.js?v=1.0.0", "./manifest.webmanifest",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./assets/icons/icon-maskable-512.png",
  "./assets/maps/hero_corte_lingua_sonetto.svg", "./assets/maps/timeline_1180_1330.svg",
  "./assets/maps/mappa_01_mondo_precedente.svg", "./assets/maps/mappa_02_frattura_corte.svg",
  "./assets/maps/mappa_03_immagine_mondo.svg", "./assets/maps/mappa_04_poetica.svg",
  "./assets/maps/mappa_05_opere.svg", "./assets/maps/mappa_06_eredita.svg",
  "./assets/maps/sintesi_sei_movimenti.svg"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE && key.startsWith(String(CACHE).includes("-v") ? String(CACHE).replace(/-v.*$/i, "-") : String(CACHE))).map(key => caches.delete(key)))).then(() => self.clients.claim()));
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
