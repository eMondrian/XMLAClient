const CACHE_NAME = 'APP-cache';
const EXTERNAL_CACHE = 'External-cache';

const filesToCache = [
  '/',
  'src/assets/branding/daanse_final.svg',
  'src/assets/branding/logo.svg',
];

const cacheStorage = new Map();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedRequests = await cache.keys();
      const cachedUrls = cachedRequests.map((req) => req.url);

      const deletions = cachedUrls
        .filter((url) => !filesToCache.includes(url))
        .map((url) => {
          console.log(`Deleting outdated file from cache: ${url}`);
          return cache.delete(url);
      });

      await Promise.all(deletions);
      await cache.addAll(filesToCache);

      console.log('Files cached during install');
      filesToCache.forEach((file) => cacheStorage.set(file, true));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== EXTERNAL_CACHE) {
            console.log(`Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      )
    ).then(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedRequests = await cache.keys();
      cacheStorage.clear();
      cachedRequests.forEach((req) => cacheStorage.set(new URL(req.url).pathname, true));

      const extCache = await caches.open(EXTERNAL_CACHE);
      const extRequests = await extCache.keys();
      await Promise.all(extRequests.map((req) => extCache.delete(req)));

      self.clients.claim();
    })
  );
});

async function handleFetchRequest(event, cacheName) {
  const requestUrl = new URL(event.request.url);
  try {
    const cache = await caches.open(cacheName);
    if (cacheStorage.has(requestUrl.href)) {
      console.log(`Cache hit (Map): ${requestUrl.href}`);
      return cache.match(event.request);
    }

    const response = await fetch(event.request);
    if (response && response.status === 200) {
      cache.put(event.request, response.clone());
      cacheStorage.set(requestUrl.href, true);
      console.log(`Cache stored (Map): ${requestUrl.href}`);
    }
    return response;
  } catch (error) {
    console.error(`Fetch failed: ${requestUrl.href}, error`);
    return new Response('Something went wrong', { status: 500 });
  }
}

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (filesToCache.includes(requestUrl.href)) {
    if (event.request.method !== 'GET') {
      event.respondWith(fetch(event.request));
      return;
    }
    event.respondWith(handleFetchRequest(event, CACHE_NAME));
    return;
  }

  if (!requestUrl.origin.includes(location.origin)) {
    if (event.request.method !== 'GET') {
      event.respondWith(fetch(event.request));
      return;
    }
    event.respondWith(handleFetchRequest(event, EXTERNAL_CACHE));
    return;
  }

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      return cachedResponse;
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    console.log('Skipping waiting and activating new Service Worker...');
    self.skipWaiting();
  }
});
