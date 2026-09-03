const CACHE = "amor-cortese-v1.2.2";
const CORE = [
  "../../pwa-common/gbprof-accessibility.css?v=1",
  "../../pwa-common/gbprof-accessibility.js?v=1",
  "../../privacy.html",
  "../../accessibilita.html",
  "./", "./index.html", "./offline.html", "./styles.css?v=1.2.0", "./content.js", "./visuals.js", "./logic.js", "./app.js?v=1.2.1", "./manifest.webmanifest",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png", "./assets/icons/icon-maskable-512.png",
  "./assets/maps/hero_fili_desiderio_responsabilita.svg", "./assets/maps/timeline_reticolare_1070_1380.svg",
  "./assets/maps/mappa_01_desiderio_ordine.svg", "./assets/maps/mappa_02_costellazione.svg",
  "./assets/maps/mappa_03_rete_corte.svg", "./assets/maps/mappa_04_trobar_conflitto.svg",
  "./assets/maps/mappa_05_desiderio_processo.svg", "./assets/maps/mappa_06_trobairitz_autorita.svg",
  "./assets/maps/mappa_07_traduzioni_italia.svg", "./assets/maps/mappa_08_dante_responsabilita.svg",
  "./assets/maps/mappa_09_eredita.svg", "./assets/maps/sintesi_finale_sei_tensioni.svg",
  "./assets/scenes/lezione-01-desiderio-ordine.webp", "./assets/scenes/lezione-02-costellazione.webp",
  "./assets/scenes/lezione-03-corte-rete.webp", "./assets/scenes/lezione-04-trovatore-performance.webp",
  "./assets/scenes/lezione-05-testo-processo.webp", "./assets/scenes/lezione-06-trobairitz-voce.webp",
  "./assets/scenes/lezione-07-italia-traduzione.webp", "./assets/scenes/lezione-08-lettura-responsabilita.webp",
  "./assets/scenes/lezione-09-eredita-scrittura.webp"
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
