const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];
const self = this;

/**
 * Install Service Worker
 *
 * @method  {Install SW}
 * @type  {}
 * @param  {}
 * @return  {cache.addAll()}
 */
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

/**
 * fetch Service Worker
 *
 * @method  {fetch}
 * @type  {}
 * @param  {}
 * @return  {caches.matches()}
 */
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(() => {
			return fetch(event.request).catch(() => caches.match('offline.html'));
		})
	);
});

/**
 * activate Service Worker
 *
 * @method  {activate}
 * @type  {}
 * @param  {}
 * @return  {caches.delete()}
 */
self.addEventListener('activate', (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
