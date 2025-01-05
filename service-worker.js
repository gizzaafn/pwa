const CACHE_NAME = 'cat-store-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
  'https://storage.googleapis.com/a1aa/image/2SB1qqRwLe2ev0xCx5p4ykakSQfgsOLGrk4GRDYr4gtSASDoA.jpg',
  'https://storage.googleapis.com/a1aa/image/I4s9MUssgd6UNxKGq5F9myYTsPO1gzPV6VCHZnIr0sGDQaAF.jpg',
  'https://storage.googleapis.com/a1aa/image/KfJ98WTDYJzAJaZ7yfkm3PXeVBqcChe8J4Cfft7z8ln9CQaAF.jpg',
  'https://storage.googleapis.com/a1aa/image/GcYVpZIIk9a6B1fqzVwpFODsjXn9nXRPt54fehcagKfeAINgC.jpg',
  'https://storage.googleapis.com/a1aa/image/l4QizLZPLvZcLhVHU80g8pur89HODq5hI1iXBHa7i1R5QaAF.jpg',
  'https://i.pinimg.com/736x/d8/57/d5/d857d5fd2701cf843b15adc47fb76ed0.jpg',
  'https://storage.googleapis.com/a1aa/image/iVtZJoPJTaL3AtnIood5sQ8I6yfe7Arx9LqYu8f4PlEeNkGQB.jpg',
  'https://storage.googleapis.com/a1aa/image/jZL5Uk9DW551P5CSpGXGIVoGRg9jSy7NVHerG5sN3Cowh0AKA.jpg'
];

// Install the service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch and serve cached resources
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the cached response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
