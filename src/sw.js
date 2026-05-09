import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache build assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

// Navigation requests
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async ({ event }) => {
    const url = new URL(event.request.url);

    try {
      // Always try network first
      return await fetch(event.request);
    } catch (error) {
      // Offline fallback
      if (url.pathname === '/' || url.pathname === '/index.html') {
        // Allow homepage
        return caches.match('/index.html');
      }
      // Force redirect to offline.html for ALL other routes
      return caches.match('/offline.html');
    }
  }
);

// Catch handler (extra safety)
setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/offline.html');
  }
return new Response(null, { status: 204 });
});

// Lifecycle
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
