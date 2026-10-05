const CACHE='gbprof-rinascimento-20261005-v6';
const ASSETS=[
  './',
  'index.html',
  'style.css?v=6',
  'app.js?v=6',
  'cover-v5-1.js?v=6',
  'cover-v5-2.js?v=6',
  'cover-v5-3.js?v=6',
  'cover-v5-4.js?v=6',
  'cover-v5-5.js?v=6',
  'cover-v5-6.js?v=6',
  'cover-v5-7.js?v=6',
  'cover-v5-8.js?v=6',
  'cover-v5-9.js?v=6',
  'manifest.webmanifest',
  '../../pwa-common/gbprof-accessibility.css?v=1',
  '../../pwa-common/gbprof-accessibility.js?v=1',
  '../../privacy.html',
  '../../accessibilita.html'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith('gbprof-rinascimento-')&&k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put('index.html',copy));
          return resp;
        })
        .catch(()=>caches.match('index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const network=fetch(e.request,{cache:'no-store'}).then(resp=>{
        const copy=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
        return resp;
      });
      return cached || network;
    })
  );
});