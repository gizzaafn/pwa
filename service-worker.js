self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-cache").then((cache) =>
      cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/script.js",
        "/manifest.json",
        "/images/item1.jpg",
        "/images/item2.jpg",
        // Tambahkan semua gambar dan file lainnya
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
