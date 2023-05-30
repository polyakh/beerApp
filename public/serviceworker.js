// Define a name for our cache
const CACHE_NAME = "version-1";

// Define the URLs we want to cache
const urlsToCache = [
    'index.html', 
    'offline.html' 
];

// Installation of the service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  });

// Fetching strategy
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    );
  });

  // Activation of the service worker
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )).then(() => {
        console.log(CACHE_NAME + ' now ready to handle fetches!');
      })
    );
  });