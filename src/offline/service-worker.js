/* eslint-env serviceworker */

/**
 * Compiles to dist/sw.js
 */

const CACHE_NAME = 'hnscroller-v1'

// caches essential assets
const CONTENT_TO_CACHE = [
  '/',
  '/index.html',
  '/main.js',
  '/main.css'
]

self.addEventListener('install', async (e) => {
  e.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(CONTENT_TO_CACHE)
  }())
})

self.addEventListener('fetch', (e) => {
  e.respondWith(async function () {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(e.request)
    if (cachedResponse) {
      return cachedResponse
    }

    try {
      const networkResponse = await fetch(e.request)
      return networkResponse
    } catch (e) {}
  }())
})
