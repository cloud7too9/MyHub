/* ============================================================
   HEFTER · Build-Skript  ·  Aufruf:  node bauen.mjs
   Ohne Abhängigkeiten (nur Node-Stdlib). Erzeugt:

   1. REGISTER in hefter.js — aus den Anleitungs-HTMLs:
        <h1>                        → titel
        <span class="chip">         → kategorie
        meta hefter-untertitel      → untertitel
        meta hefter-stichworte      → stichworte
        Dateiname                   → id
   2. sw.js — Precache-Liste per Verzeichnis-Scan und VERSION
      als Hash über alle Inhalte. Jede Änderung ergibt damit
      automatisch eine neue Version; Vergessen unmöglich.
   ============================================================ */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { createHash } from "crypto";
import { join, relative } from "path";
import { fileURLToPath } from "url";

/* fileURLToPath statt .pathname — sonst kommt unter Windows "/C:/…" heraus
   und Leerzeichen oder Umlaute im Pfad bleiben prozent-kodiert. */
const WURZEL = fileURLToPath(new URL(".", import.meta.url));

/* ---------- 1. Register aus den Anleitungen ---------- */
const anleitungsDateien = readdirSync(join(WURZEL, "anleitungen"))
  .filter(f => f.endsWith(".html")).sort();

/* Checklisten-Fortschritt und Fotos werden über diese IDs zugeordnet.
   Ein Duplikat legt zwei Häkchen bzw. zwei Fotozonen still zusammen —
   im Browser praktisch nicht zu bemerken, deshalb hier hart abbrechen. */
function eindeutigPruefen(html, datei, attribut) {
  const werte = [...html.matchAll(new RegExp(`${attribut}="([^"]*)"`, "g"))].map(m => m[1]);
  const doppelt = [...new Set(werte.filter((w, i) => werte.indexOf(w) !== i))];
  if (doppelt.length)
    throw new Error(`${datei}: ${attribut} mehrfach vergeben — ${doppelt.join(", ")}`);
}

const register = anleitungsDateien.map(f => {
  const h = readFileSync(join(WURZEL, "anleitungen", f), "utf8");
  const greifen = (re, was) => {
    const m = h.match(re);
    if (!m) throw new Error(`${f}: ${was} nicht gefunden`);
    return m[1].trim();
  };
  eindeutigPruefen(h, f, "data-check");
  eindeutigPruefen(h, f, "data-schritt");
  return {
    id: f.replace(/\.html$/, ""),
    titel: greifen(/<h1>([\s\S]*?)<\/h1>/, "<h1>"),
    untertitel: greifen(/<meta name="hefter-untertitel" content="([^"]*)"/, "meta hefter-untertitel"),
    kategorie: greifen(/<span class="chip">([\s\S]*?)<\/span>/, "Kategorie-Chip"),
    datei: "anleitungen/" + f,
    stichworte: greifen(/<meta name="hefter-stichworte" content="([^"]*)"/, "meta hefter-stichworte")
  };
}).sort((a, b) =>
  a.kategorie.localeCompare(b.kategorie, "de") || a.titel.localeCompare(b.titel, "de"));

const registerBlock =
  "/* REGISTER-START */\nconst REGISTER = " +
  JSON.stringify(register, null, 2) + ";\n/* REGISTER-ENDE */";

let js = readFileSync(join(WURZEL, "hefter.js"), "utf8");
js = js.replace(/\/\* REGISTER-START \*\/[\s\S]*?\/\* REGISTER-ENDE \*\//, registerBlock);
writeFileSync(join(WURZEL, "hefter.js"), js);
console.log(`Register: ${register.length} Anleitungen aus /anleitungen übernommen`);

/* ---------- 2. Precache-Liste per Scan ---------- */
const ENDUNGEN = /\.(html|css|js|webmanifest|svg|png)$/;
const AUSSCHLUSS = new Set(["sw.js", "bauen.mjs"]);

function sammeln(ordner) {
  const liste = [];
  for (const eintrag of readdirSync(ordner)) {
    if (eintrag.startsWith(".") || eintrag === "node_modules") continue;
    const pfad = join(ordner, eintrag);
    if (statSync(pfad).isDirectory()) liste.push(...sammeln(pfad));
    else {
      const rel = relative(WURZEL, pfad);
      if (ENDUNGEN.test(rel) && !AUSSCHLUSS.has(rel)) liste.push(rel);
    }
  }
  return liste.sort();
}
const shell = sammeln(WURZEL);

/* ---------- 3. Version = Hash über alle Inhalte ---------- */
const hash = createHash("sha256");
for (const p of shell) hash.update(p).update(readFileSync(join(WURZEL, p)));
const version = "hefter-" + hash.digest("hex").slice(0, 10);

/* ---------- 4. sw.js schreiben ---------- */
const sw = `/* GENERIERT von bauen.mjs — nicht von Hand bearbeiten.
   Nach jeder Inhaltsänderung:  node bauen.mjs  */
const VERSION = ${JSON.stringify(version)};
const SHELL = ${JSON.stringify(shell, null, 2)};

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
      }).catch(() => cached);
      return cached || netz;
    })
  );
});
`;
writeFileSync(join(WURZEL, "sw.js"), sw);
console.log(`Service Worker: ${shell.length} Dateien im Precache · ${version}`);
