// the site moved to picoplayer.net. browsers that installed the old service worker here keep serving their cached copy,
// so this replaces it: it clears the caches, unregisters itself and sends any open pages to the same page on the new site
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (let name of await caches.keys()) await caches.delete(name)
  await self.registration.unregister()
  for (let client of await self.clients.matchAll({ type: "window" })) {
    let url = new URL(client.url)
    client.navigate("https://picoplayer.net" + url.pathname.replace(/^\/tinyfun/i, "") + url.search + url.hash)
  }
})()))
