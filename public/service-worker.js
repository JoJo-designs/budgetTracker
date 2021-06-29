console.log("service worker is working");

const CACHE_NAME = "static-cache";
const DATA_CACHE_NAME = "data-cache";

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/index.js',
    '/manifest.webmanifest',
    '/icons/icon-1.png',
    '/icons/icon-2.png',
    '/icons/icon-192x192.png'
];

// install
self.addEventListener("install", function(evt) {
    console.log(evt);
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });
  
  