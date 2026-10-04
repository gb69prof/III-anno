const CACHE='gbprof-lingua-20261005-v1';
const FILES=[
  "../../privacy.html",
  "../../accessibilita.html",
  './','index.html','style.css','data.js','app.js','manifest.webmanifest','icon.svg',
  '../../pwa-common/gbprof-accessibility.css?v=1','../../pwa-common/gbprof-accessibility.js?v=1'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gbprof-lingua-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin) return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(r=>{
    if(r.ok && url.pathname.startsWith(new URL(self.registration.scope).pathname)){
      const copy=r.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy));
    }
    return r;
  })));
});