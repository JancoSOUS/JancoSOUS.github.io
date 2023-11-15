'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"apple-icon-144x144.png": "72eb8e6ef64a8a0bb8c6727639208b31",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"apple-icon-152x152.png": "37a94700f524e37ae96545ebd6747497",
"apple-icon-114x114.png": "cfb42b09425e652f062093102762c448",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"ms-icon-70x70.png": "e9fe090df3816a0d154c415290b20ff6",
"android-icon-144x144.png": "72eb8e6ef64a8a0bb8c6727639208b31",
"favicon-16x16.png": "12f80e36f906d051701d9150547dc34d",
"android-icon-192x192.png": "424c61a8807ae4ed83476f0bc8c24c5e",
"apple-icon-57x57.png": "87d89789f43d0b2c9e2ecc193073425c",
"android-icon-96x96.png": "a826095f613d4a085af3e4eb68fcb67c",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin": "63360217f710570dc607b2e7a5474bef",
"assets/assets/buurtwag.png": "b0dc625a273dcb08e64ead84a43c2ac6",
"assets/AssetManifest.json": "89f26963c480349fc8e9ae03387f729c",
"assets/fonts/MaterialIcons-Regular.otf": "b170d9f7288ce367bb5a066cf26e6ec4",
"assets/NOTICES": "5b90d2168dd4cc3e932c7b19555c8e32",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"android-icon-48x48.png": "6530040d28d39ba69b9df9964ee48a79",
"apple-icon-180x180.png": "84713dc4963736d7a2640afbd8bb80e9",
"favicon.ico": "071ce0d381a9c05c6a156267789072ca",
"favicon-96x96.png": "a826095f613d4a085af3e4eb68fcb67c",
"favicon-32x32.png": "704e43402594b6144aaca792c03d05d9",
"ms-icon-144x144.png": "72eb8e6ef64a8a0bb8c6727639208b31",
"android-icon-72x72.png": "c3b2048813d9ca5f79ff4741cc183deb",
"firebase-messaging-sw.js": "f5e014fb4bcb56f1ab899b4a24aa0860",
"index.html": "fdc7f2416907c99e90db7a882ec4ce90",
"/": "fdc7f2416907c99e90db7a882ec4ce90",
"apple-icon-60x60.png": "c13cc252c99fb1c7c6563d5adcb05dbf",
"ms-icon-150x150.png": "eb9d690433c01d04c97c5de82a3d3097",
"apple-icon.png": "83ea293607f6b1e10868f1e4a9372075",
"main.dart.js": "eafded42bd437f92cbfabe84b6f9b69c",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"manifest.json": "d1f94a667c24014d34dec1d88459d15c",
"version.json": "331f3976da28fb2953317e526d4b131c",
"apple-icon-120x120.png": "e68c45df6f9c8c4981caedaceabc6f5b",
"apple-icon-precomposed.png": "83ea293607f6b1e10868f1e4a9372075",
"android-icon-36x36.png": "50f62e7f294b60a8682463e21ddf7700",
"ms-icon-310x310.png": "fdea21350e769ab5bccfc6ac2e4d9d73",
"apple-icon-72x72.png": "c3b2048813d9ca5f79ff4741cc183deb",
"apple-icon-76x76.png": "b5af43eb53b40d6ba16b1eb6d9fd6fc5",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
