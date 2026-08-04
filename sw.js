/* GENERIERT von bauen.mjs — nicht von Hand bearbeiten.
   Nach jeder Inhaltsänderung:  node bauen.mjs  */
const VERSION = "hefter-a01a9d00bc";
const SHELL = [
  "anleitungen/coolify-einrichtung.html",
  "anleitungen/docker-einrichtung.html",
  "anleitungen/domain-einrichtung.html",
  "anleitungen/git-ssd.html",
  "anleitungen/git-zugang-privat.html",
  "anleitungen/hetzner-deploy.html",
  "anleitungen/server-ersteinrichtung.html",
  "anleitungen/vscode-git-workflow.html",
  "anleitungen/vscode-remote-ssh.html",
  "einstellungen.html",
  "hefter.js",
  "icons/01-ringe.svg",
  "icons/02-register.svg",
  "icons/03-rail.svg",
  "icons/04-haken.svg",
  "icons/05-lochung.svg",
  "icons/06-klammer.svg",
  "icons/png/01-ringe-192.png",
  "icons/png/01-ringe-512-maskable.png",
  "icons/png/01-ringe-512.png",
  "icons/png/02-register-192.png",
  "icons/png/02-register-512-maskable.png",
  "icons/png/02-register-512.png",
  "icons/png/03-rail-192.png",
  "icons/png/03-rail-512-maskable.png",
  "icons/png/03-rail-512.png",
  "icons/png/04-haken-192.png",
  "icons/png/04-haken-512-maskable.png",
  "icons/png/04-haken-512.png",
  "icons/png/05-lochung-192.png",
  "icons/png/05-lochung-512-maskable.png",
  "icons/png/05-lochung-512.png",
  "icons/png/06-klammer-192.png",
  "icons/png/06-klammer-512-maskable.png",
  "icons/png/06-klammer-512.png",
  "index.html",
  "manifest-01-ringe.webmanifest",
  "manifest-02-register.webmanifest",
  "manifest-03-rail.webmanifest",
  "manifest-04-haken.webmanifest",
  "manifest-05-lochung.webmanifest",
  "manifest-06-klammer.webmanifest",
  "manifest.webmanifest",
  "schriften/dm-sans-latin-ext.woff2",
  "schriften/dm-sans-latin.woff2",
  "schriften/jetbrains-mono-latin-ext.woff2",
  "schriften/jetbrains-mono-latin.woff2",
  "style.css"
];

self.addEventListener("install", e => {
  /* Kein skipWaiting: die neue Version wartet, bis der Nutzer
     im "Neue Version verfügbar"-Hinweis zustimmt. */
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)));
});

self.addEventListener("message", e => {
  if (e.data === "aktivieren") self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Stale-while-revalidate: sofort aus dem Cache, im Hintergrund aktualisieren */
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const netz = fetch(e.request).then(antwort => {
        if (antwort.ok) caches.open(VERSION).then(c => c.put(e.request, antwort.clone()));
        return antwort;
      }).catch(() => cached || new Response("Offline — Seite nicht im Cache.", {
        status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
      }));
      return cached || netz;
    })
  );
});
