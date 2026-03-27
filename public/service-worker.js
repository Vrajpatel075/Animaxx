// public/service-worker.js
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);


// Cache images (compressed previews)
workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,              // only keep 100 images
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      }),
    ],
  })
);

// Cache API JSON
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/api/posts'),
  new workbox.strategies.StaleWhileRevalidate({ cacheName: 'api-cache' })
);
