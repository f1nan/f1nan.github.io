const cacheName = "v1.0.4";

const cacheAssets = [
    "/",
    "/css/style.css",
    "/images/icons/icon-48x48.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-168x168.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-256x256.png",
    "/images/icons/icon-512x512.png",
    "/js/app.js",
    "/js/create-todo.js",
    "/js/elements.js",
    "/js/todo-list-repository.js",
    "/js/todo-list.js",
    "/js/todo-storage.js",
    "/js/view.js",
    "/manifest.json",
];

self.addEventListener("install", (e) => {
    console.log("Service Worker: Installed");

    e.waitUntil(async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(cacheAssets);
        return self.skipWaiting();
    });
});

self.addEventListener("activate", (e) => {
    console.log("Service Worker: Activated");

    e.waitUntil(async () => {
        const keys = await caches.keys();
        return Promise.all(
            keys
                .filter((key) => key !== cacheName)
                .map((key) => caches.delete(key))
        );
    });
});

self.addEventListener("fetch", (e) => {
    console.log("Service Worker: Fetching");

    e.respondWith(async () => {
        let res = await caches.match(e.request);
        if (res) {
            return res;
        }

        res = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, res.clone());
        return res;
    });
});
