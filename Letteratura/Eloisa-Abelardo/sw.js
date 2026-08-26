const CACHE = "eloisa-abelardo-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./content.js",
  "./documents.js",
  "./women.js",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/images/01-scuola-parigi.webp",
  "./assets/images/02-astrolabio-bretagna.webp",
  "./assets/images/03-matrimonio-segreto.webp",
  "./assets/images/04-due-chiostri.webp",
  "./assets/images/05-lettere-paracleto.webp",
  "./assets/images/06-eloisa-badessa.webp",
  "./assets/maps/01-mondo.svg",
  "./assets/maps/02-fratture.svg",
  "./assets/maps/03-visione.svg",
  "./assets/maps/04-poetica.svg",
  "./assets/maps/05-opere.svg",
  "./assets/maps/06-conclusione.svg",
  "./assets/maps/07-eloisa-donna.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok && new URL(event.request.url).origin === self.location.origin) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
