const CACHE_NAME = 'bjlab-v1';
const toCache = [
  '/',
  '/index.html',
  '/manifest.json'
];
self.addEventListener('install', evt => {
 evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(toCache)));
});
self.addEventListener('fetch', evt => {
 evt.respondWith(caches.match(evt.request).then(r => r || fetch(evt.request)));
});
