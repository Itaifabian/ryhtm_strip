/* Rhythm Strip service worker.
 *
 * Purpose: once the app has loaded successfully at least once, keep it fully
 * usable with zero network connection (airplane mode, no signal, etc.) — the
 * home-screen icon should never show a "can't connect" error again.
 *
 * Requires a secure context: HTTPS, or the special-cased "localhost" for local
 * development. Browsers (Safari included) refuse to register a service worker
 * over plain HTTP on a LAN IP or any other non-secure origin — registration
 * will silently fail there, which is fine, the app still works online.
 *
 * Strategy:
 *  - Navigation (the app page itself): network-first, so an online visit
 *    always picks up the latest build; falls back to the last cached copy
 *    when there's no connection.
 *  - Everything else (mainly the Google Fonts requests): cache-first with a
 *    background refresh, so fonts keep working offline after the first load
 *    too, without blocking on a network round-trip every time.
 *  - Non-GET requests (AI Studio's /api/generate, /api/extract-text POSTs)
 *    are left untouched — they only make sense online anyway.
 */
const CACHE_NAME = 'rhythm-strip-21ba545d55f9';

self.addEventListener('install', function (event) {
  self.skipWaiting();
  // A page is never "controlled" by the service worker that's in the middle of
  // registering for it — control only starts on the *next* navigation. Without
  // this, the fetch handler below would never fire during the very first visit,
  // so offline mode wouldn't be ready until a second online visit. Precache the
  // page directly here instead, covering both a bookmark that points at the
  // scope root ("/") and one that points at "index.html" explicitly, so one
  // visit is enough regardless of which URL ends up on the home screen.
  const scope = self.registration.scope;
  const urls = [scope, new URL('index.html', scope).href];
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(urls.map(function (url) {
        return fetch(url).then(function (res) {
          if (res && res.ok) return cache.put(url, res);
        }).catch(function () {});
      }));
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.put(req, copy); }));
        return res;
      }).catch(function () {
        return caches.match(req);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (cached) {
      const fetchPromise = fetch(req).then(function (res) {
        if (res && res.ok) {
          const copy = res.clone();
          event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.put(req, copy); }));
        }
        return res;
      }).catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});
