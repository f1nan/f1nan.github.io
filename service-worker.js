const cacheName = "v1.0.3";

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

    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => cache.addAll(cacheAssets))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (e) => {
    console.log("Service Worker: Activated");

    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames
                        .filter((cache) => cache !== cacheName)
                        .map((cache) => caches.delete(cache))
                )
            )
    );
});

self.addEventListener("fetch", (e) => {
    console.log("Service Worker: Fetching");

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request).then((res) => res))
    );
});
