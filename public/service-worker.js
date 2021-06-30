console.log("service worker is working");

const CACHE_NAME = "static-cache";
const DATA_CACHE_NAME = "data-cache";

// I attempt to add these files the first two are the issue. The index.html works alone but not with the
// other files I don't know why but I guess I am part way there. I will go to office hours 
// for this one
const FILES_TO_CACHE = [
    // '/',
    // '/index.html',
    // '/style.css',
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
});

// listen to the active stage of the app  I think removes old
// caches if the names don't match.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !==DATA_CACHE_NAME) {
                        console.log("Removeing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});


