/* ============================================================
   HEFTER · Build-Skript  ·  Aufruf:  node bauen.mjs
   Ohne Abhängigkeiten (nur Node-Stdlib). Erzeugt:

   0. Den Seitenrahmen jeder Seite zwischen den Markern
      KOPF-START/KOPF-ENDE und ab FUSS-START — Kopf, App-Bar
      und Fuß stehen überall gleich und werden nicht kopiert.
   1. REGISTER in hefter.js — aus den Seiten beider Sorten:
        <h1>                        → titel
        <span class="chip">         → kategorie
        meta hefter-untertitel      → untertitel
        meta hefter-stichworte      → stichworte
        Dateiname                   → id
        Ordner                      → art
   2. sw.js — Precache-Liste per Verzeichnis-Scan und VERSION
      als Hash über alle Inhalte. Jede Änderung ergibt damit
      automatisch eine neue Version; Vergessen unmöglich.
   ============================================================ */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { createHash } from "crypto";
import { join, relative, sep } from "path";
import { fileURLToPath } from "url";

/* fileURLToPath statt .pathname — sonst kommt unter Windows "/C:/…" heraus
   und Leerzeichen oder Umlaute im Pfad bleiben prozent-kodiert. */
const WURZEL = fileURLToPath(new URL(".", import.meta.url));

/* ---------- 1. Register aus beiden Seitensorten ----------
   Anleitungen sind zum Durchlaufen, Nachschlage-Übersichten zum
   Nachschlagen. Welche Sorte eine Seite ist, sagt ihr Ordner — kein
   Meta-Tag, das man beim Kopieren einer Vorlage zu ändern vergisst. */
const SORTEN = [
  { ordner: "anleitungen", art: "anleitung" },
  { ordner: "nachschlagen", art: "uebersicht" }
];
const RANG = { anleitung: 0, uebersicht: 1 };

const seitenDateien = ordner =>
  readdirSync(join(WURZEL, ordner)).filter(f => f.endsWith(".html")).sort();

/* ---------- 0. Seitenrahmen ----------
   Kopf, App-Bar und Fuß sind auf jeder Seite dieselben 28 Zeilen. Von Hand
   kopiert laufen sie beim ersten Nachziehen auseinander, und data-seite wie
   data-basis sind genau die Attribute, die man beim Kopieren einer Vorlage
   zu ändern vergisst. Also erzeugt das Skript sie zwischen Markern — dasselbe
   Verfahren wie beim REGISTER in hefter.js.

   Seitenspezifisch bleibt allein, was oberhalb von KOPF-START steht:
   description, die hefter-Metas und der <title>. <meta charset> muss dort die
   erste Zeile bleiben: davor darf kein Nicht-ASCII-Byte stehen, sonst rät der
   Browser die Kodierung, wenn der Server kein charset mitschickt (python3
   -m http.server tut das nicht). Der Fuß hat keinen Endmarker — er reicht
   bis zum Dateiende. */
const KOPF_START = "<!-- KOPF-START · erzeugt von bauen.mjs — nicht von Hand ändern -->";
const KOPF_ENDE = "<!-- KOPF-ENDE -->";
const FUSS_START = "<!-- FUSS-START · erzeugt von bauen.mjs — nicht von Hand ändern -->";

const kopf = (basis, seite) => `${KOPF_START}
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#060709">
<link rel="manifest" href="${basis}manifest.webmanifest">
<link rel="icon" href="${basis}icons/01-ringe.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${basis}icons/png/01-ringe-192.png">
<link rel="stylesheet" href="${basis}style.css">
<script>
try { document.documentElement.dataset.theme = localStorage.getItem("hefter:theme") || "dunkel"; } catch {}
</script>
</head>
<body data-seite="${seite}" data-basis="${basis}">

<div class="appbar">
  <a class="back" href="${basis}index.html">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M15 18l-6-6 6-6"/></svg>
    Register
  </a>
  <span class="spacer"></span>
  <button class="iconbtn" data-themebtn aria-label="Design wechseln — aktuell Dunkel">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
    <span class="lbl">Dunkel</span>
  </button>
</div>

<div class="wrap">
${KOPF_ENDE}`;

/* Anleitungen speichern Fotos und Haken, Übersichten nur den Fortschritt —
   der Satz im Fuß nennt deshalb je Sorte etwas anderes. */
const FUSSTEXT = {
  anleitung: "Fotos, Checkliste und Design werden lokal auf diesem Gerät gespeichert.",
  uebersicht: "Design und Fortschritt werden lokal auf diesem Gerät gespeichert."
};

const fuss = (basis, art) => `${FUSS_START}
  <p class="foot">${FUSSTEXT[art]}</p>
</div>

<script src="${basis}hefter.js"></script>
</body>
</html>
`;

/* Ersetzt wird mit einer Funktion statt mit einem String: $& und $1 im
   erzeugten Markup würden sonst als Rückverweise gelesen. */
function rahmenSetzen(html, datei, basis, seite, art) {
  const kopfRe = /<!-- KOPF-START[\s\S]*?<!-- KOPF-ENDE -->/;
  const fussRe = /<!-- FUSS-START[\s\S]*$/;
  if (!kopfRe.test(html))
    throw new Error(`${datei}: Marker KOPF-START … KOPF-ENDE fehlt — Rahmen kann nicht erzeugt werden`);
  if (!fussRe.test(html))
    throw new Error(`${datei}: Marker FUSS-START fehlt — Rahmen kann nicht erzeugt werden`);
  return html.replace(kopfRe, () => kopf(basis, seite)).replace(fussRe, () => fuss(basis, art));
}

let rahmenGeaendert = 0;
for (const { ordner, art } of SORTEN)
  for (const f of seitenDateien(ordner)) {
    const pfad = join(WURZEL, ordner, f);
    const alt = readFileSync(pfad, "utf8");
    const neu = rahmenSetzen(alt, f, "../", f.replace(/\.html$/, ""), art);
    if (neu !== alt) { writeFileSync(pfad, neu); rahmenGeaendert++; }
  }
console.log(`Seitenrahmen: ${rahmenGeaendert} von ${SORTEN.reduce((n, s) => n + seitenDateien(s.ordner).length, 0)} Seiten neu geschrieben`);

/* Checklisten-Fortschritt und Fotos werden über diese IDs zugeordnet.
   Ein Duplikat legt zwei Häkchen bzw. zwei Fotozonen still zusammen —
   im Browser praktisch nicht zu bemerken, deshalb hier hart abbrechen. */
function eindeutigPruefen(html, datei, attribut) {
  const werte = [...html.matchAll(new RegExp(`${attribut}="([^"]*)"`, "g"))].map(m => m[1]);
  const doppelt = [...new Set(werte.filter((w, i) => werte.indexOf(w) !== i))];
  if (doppelt.length)
    throw new Error(`${datei}: ${attribut} mehrfach vergeben — ${doppelt.join(", ")}`);
}

/* HTML-Entities aus den Quelldateien auflösen — ins Register gehört
   Klartext, sonst landet "&amp;" im Suchindex und die Suche nach "&"
   geht leer aus. Escaped wird erst wieder beim Rendern (hefter.js).
   &amp; zuletzt, damit doppelt kodierte Zeichen korrekt eine Stufe heben. */
const entitaetenAufloesen = s => s
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, "&");

/* Nur "datei" schaltet eine Codebox auf Block-Kopieren um. Ein Tippfehler
   fiele sonst nicht auf: die Box verhielte sich still wie eine Befehlsbox,
   und der Dateiinhalt wäre nur noch zeilenweise zu kopieren. */
function codeboxTypenPruefen(html, datei) {
  const falsch = [...html.matchAll(/<div class="codebox" data-typ="([^"]*)"/g)]
    .map(m => m[1]).filter(w => w !== "datei");
  if (falsch.length)
    throw new Error(`${datei}: unbekanntes data-typ an einer Codebox — ${[...new Set(falsch)].join(", ")}`);
}

const register = SORTEN.flatMap(({ ordner, art }) =>
  seitenDateien(ordner).map(f => {
    const h = readFileSync(join(WURZEL, ordner, f), "utf8");
    const greifen = (re, was) => {
      const m = h.match(re);
      if (!m) throw new Error(`${f}: ${was} nicht gefunden`);
      return entitaetenAufloesen(m[1].trim());
    };
    eindeutigPruefen(h, f, "data-check");
    eindeutigPruefen(h, f, "data-schritt");
    codeboxTypenPruefen(h, f);
    return {
      id: f.replace(/\.html$/, ""),
      art,
      titel: greifen(/<h1>([\s\S]*?)<\/h1>/, "<h1>"),
      untertitel: greifen(/<meta name="hefter-untertitel" content="([^"]*)"/, "meta hefter-untertitel"),
      kategorie: greifen(/<span class="chip">([\s\S]*?)<\/span>/, "Kategorie-Chip"),
      datei: ordner + "/" + f,
      stichworte: greifen(/<meta name="hefter-stichworte" content="([^"]*)"/, "meta hefter-stichworte")
    };
  })
).sort((a, b) => RANG[a.art] - RANG[b.art]
  || a.kategorie.localeCompare(b.kategorie, "de")
  || a.titel.localeCompare(b.titel, "de"));

/* Gleicher Dateiname in beiden Ordnern: im Register stünden dann zwei
   Einträge mit derselben id. Fällt im Browser nicht auf, deshalb hier. */
const ids = register.map(e => e.id);
const doppelteIds = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
if (doppelteIds.length)
  throw new Error(`Seiten-id mehrfach vergeben — ${doppelteIds.join(", ")}`);

const registerBlock =
  "/* REGISTER-START */\nconst REGISTER = " +
  JSON.stringify(register, null, 2) + ";\n/* REGISTER-ENDE */";

let js = readFileSync(join(WURZEL, "hefter.js"), "utf8");
js = js.replace(/\/\* REGISTER-START \*\/[\s\S]*?\/\* REGISTER-ENDE \*\//, registerBlock);
writeFileSync(join(WURZEL, "hefter.js"), js);
const jeArt = art => register.filter(e => e.art === art).length;
console.log(`Register: ${jeArt("anleitung")} Anleitungen, ${jeArt("uebersicht")} Übersichten übernommen`);

/* ---------- 2. Precache-Liste per Scan ---------- */
const ENDUNGEN = /\.(html|css|js|webmanifest|svg|png|woff2)$/;
const AUSSCHLUSS = new Set(["sw.js", "bauen.mjs"]);

function sammeln(ordner) {
  const liste = [];
  for (const eintrag of readdirSync(ordner)) {
    if (eintrag.startsWith(".") || eintrag === "node_modules") continue;
    const pfad = join(ordner, eintrag);
    if (statSync(pfad).isDirectory()) liste.push(...sammeln(pfad));
    else {
      /* Die Liste landet als URL im Service Worker — dort gilt immer "/".
         Unter Windows liefert relative() aber "\", und cache.addAll() bricht
         mit einem einzigen 404 komplett ab: der SW installiert sich dann gar
         nicht. Deshalb hier auf Schrägstriche normalisieren. */
      const rel = relative(WURZEL, pfad).split(sep).join("/");
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
      }).catch(() => cached || new Response("Offline — Seite nicht im Cache.", {
        status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
      }));
      return cached || netz;
    })
  );
});
`;
writeFileSync(join(WURZEL, "sw.js"), sw);
console.log(`Service Worker: ${shell.length} Dateien im Precache · ${version}`);
