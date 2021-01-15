const cacheName = "v1";

self.addEventListener("install", (e) => {
    console.log("Service Worker: Installed");
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
        fetch(e.request)
            .then((res) => {
                const resClone = res.clone();
                caches.open().then((cache) => cache.put(e.request, resClone));
                return res;
            })
            .catch((err) => caches.match(e.request).then((res) => res))
    );
});
