self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;

            event.waitUntil(
                caches.open('restaurant_imgs_v1').then(cache => {
                    cache.add(event.request.url)
                })
            );
            return fetch(event.request);
        })
    )
});