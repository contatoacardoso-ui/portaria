const CACHE_NAME = 'portaria-pro-v5-3';

// Arquivos exatos que o navegador precisa baixar para o modo offline
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/html5-qrcode/html5-qrcode.min.js', // Link corrigido
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js'
];

// Instalação: Salva tudo no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Arquivos salvos para uso offline!');
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting(); // Força a atualização imediata
});

// Ativação: Limpa caches antigos de versões anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Limpando cache antigo...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Busca: Serve os arquivos do cache se estiver sem internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
