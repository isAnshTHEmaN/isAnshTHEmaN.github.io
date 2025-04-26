self.addEventListener("install", function(event) {
    event.waitUntil(preLoad());
});

var preLoad = function() {
    console.log("Installing web app");
    return caches.open("offline-v1").then(function(cache) {
        console.log("Caching index, CSS, JS, and other important routes");
        return cache.addAll([
            "/login.html",                                
            "/dashboard.html",                            
            "/styles.css",                                
            "/script.js",                                    
            "/dashboard.css",                             
            "/dashboard.js",                             
            "brlogo.jpg",                                 
            "bus-marker.png",                             
            "default-profile.jpg",  
            "routifysquarelogonew.jpg",                      
            "https://via.placeholder.com/40",             
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css",  
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js",  
            "https://unpkg.com/leaflet/dist/leaflet.css",  
            "https://unpkg.com/leaflet/dist/leaflet.js"   
        ]);
    });
};

self.addEventListener("fetch", function(event) {
    event.respondWith(
        checkResponse(event.request).catch(function() {
            return fromCache(event.request);
        })
    );
    event.waitUntil(addToCache(event.request));
});

var checkResponse = function(request) {
    return new Promise(function(fulfill, reject) {
        fetch(request).then(function(response) {
            if(response.status !== 404) {
                fulfill(response);
            } else {
                reject();
            }
        }, reject);
    });
};

var addToCache = function(request) {
    return caches.open("offline-v1").then(function(cache) {
        return fetch(request).then(function(response) {
            console.log(response.url + " was cached");
            return cache.put(request, response);
        });
    });
};

var fromCache = function(request) {
    return caches.open("offline-v1").then(function(cache) {
        return cache.match(request).then(function(matching) {
            if (!matching || matching.status === 404) {
                return cache.match("/offline.html");
            } else {
                return matching;
            }
        });
    });
};
