const CACHE_NAME = "v1.0.4";

const CACHE_ASSETS = [
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
        caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS))
    );
});

self.addEventListener("activate", (e) => {
    console.log("Service Worker: Activated");

    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all((cacheNames) =>
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME)
                        .map((cacheName) => caches.delete(cacheName))
                )
            )
    );
});

self.addEventListener("fetch", (e) => {
    console.log("Service Worker: Fetching");

    function isInvalid(response) {
        return (
            !response || response.status !== 200 || response.type !== "basic"
        );
    }

    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res;
            }

            return fetch(e.request).then((res) => {
                if (isInvalid(res)) {
                    return res;
                }

                const resToCache = res.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, resToCache);
                });

                return res;
            });
        })
    );
});
