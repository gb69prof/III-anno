const CACHE='gbprof-amor-sacro-v1';
const ASSETS=[
  "./",
  "index.html",
  "style.css",
  "app.js",
  "data.js",
  "content.json",
  "manifest.webmanifest",
  "assets/copertina.svg",
  "assets/icon.svg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/mappe/due-amori.svg",
  "assets/mappe/francesco-jacopone.svg",
  "assets/mappe/eredita-antica.svg",
  "assets/mappe/nascita-cortese.svg",
  "assets/mappe/caratteristiche.svg",
  "assets/mappe/siciliani.svg",
  "assets/mappe/jacopo.svg",
  "assets/mappe/ponte-stilnovo.svg",
  "assets/mappe/percorso.svg",
  "../../pwa-common/gbprof-accessibility.css?v=1",
  "../../pwa-common/gbprof-accessibility.js?v=1",
  "../../privacy.html",
  "../../accessibilita.html"
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gbprof-amor-sacro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.open(CACHE).then(async cache=>{const hit=await cache.match(event.request);if(hit)return hit;try{return await fetch(event.request)}catch(error){if(event.request.mode==='navigate'&&event.request.url.startsWith(self.registration.scope))return cache.match('index.html');throw error}}))});
