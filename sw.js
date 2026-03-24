const CACHE_NAME = 'encomendas-adm-v1';
// Arquivos que serão salvos para funcionar offline
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/html5-qrcode'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
