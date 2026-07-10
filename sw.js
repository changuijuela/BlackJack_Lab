// Temporary debug service worker: clear caches and unregister itself to avoid serving stale cached app
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      // Unregister this service worker so the page will load from network
      await self.registration.unregister();
    } catch (e) {
      // ignore
    }
  })());
});
self.addEventListener('fetch', event => {
  // Always try network first; fall back to cache if offline
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
