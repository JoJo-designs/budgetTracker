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

self.addEventListener('install', (event) => {
    console.log(event);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
      );

    // event.waitUntil(
    //     caches.open('static-cache').then((cache) => {
    //         return cache.add([
    //             '/',
    //             '/index.html',
    //             '/style.css',
    //             '/index.js',
    //             '/manifest.webmanifest',
    //             '/icons/icon-1.png',
    //             '/icons/icon-2.png',
    //             '/icons/icon-192x192.png'
    //         ]);
    //     })
    // );
});