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
/* Theme und Leisten-Zustand vor dem ersten Anstrich setzen — sonst blitzen
   helles Design und breite Leiste kurz auf. localStorage liest synchron,
   deshalb geht das hier oben. "laedt" schaltet Übergänge bis zum ersten
   Bild ab; hefter.js nimmt die Klasse wieder weg. */
try {
  var d = document.documentElement;
  d.dataset.theme = localStorage.getItem("hefter:theme") || "dunkel";
  d.classList.add("laedt");
  if (JSON.parse(localStorage.getItem("hefter:leiste") || "{}").schmal) d.classList.add("schmal");
} catch {}
</script>
</head>
<body${seite ? ` data-seite="${seite}"` : ""} data-basis="${basis}">

<div class="schleier" data-schleier></div>

<nav class="leiste" aria-label="Register">
  <div class="l-kopf">
    <a class="l-marke" href="${basis}index.html">
      <span class="logo"><img data-appicon src="${basis}icons/01-ringe.svg" alt=""></span>
      <span class="wortmarke"><b>Hefter</b><small>Register</small></span>
    </a>
    <button class="klapp" data-klapp aria-label="Leiste einklappen" title="Strg+B">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
  </div>

  <div class="l-suche">
    <input id="leisteSuche" type="search" placeholder="Seite suchen" autocomplete="off" aria-label="Seite suchen">
    <button class="lupe" data-lupe aria-label="Suchen">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    </button>
  </div>

  <div class="l-register" id="leisteRegister"></div>
  <p class="l-leer" id="leisteLeer">Keine Seite gefunden.</p>

  <div class="l-fuss">
    <a class="f-btn" href="${basis}einstellungen.html">
      <span class="kuerzel" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09c0 .68.4 1.3 1.03 1.56a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9c.26.63.88 1.03 1.56 1.03H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z"/></svg>
      </span>
      <span class="f-text">Einstellungen</span>
      <span class="blase">Einstellungen</span>
    </a>
  </div>
</nav>

<div class="inhalt">

<header class="i-kopf">
  <button class="brenner" data-brenner aria-label="Register öffnen" aria-expanded="false">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
  </button>
  <span class="krumen" data-krumen></span>
  <button class="iconbtn" data-themebtn aria-label="Design wechseln — aktuell Dunkel">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
    <span class="lbl">Dunkel</span>
  </button>
</header>

<div class="wrap">
${KOPF_ENDE}`;

/* Anleitungen speichern Fotos und Haken, Übersichten nur den Fortschritt —
   der Satz im Fuß nennt deshalb je Sorte etwas anderes. */
const FUSSTEXT = {
  anleitung: "Fotos, Schritte und Checkliste werden lokal auf diesem Gerät gespeichert.",
  uebersicht: "Haken und Design werden lokal auf diesem Gerät gespeichert.",
  register: "Alles bleibt auf diesem Gerät — kein Server, keine Konten, keine Übertragung.",
  einstellungen: "Gespeichert wird lokal auf diesem Gerät."
};

const fuss = (basis, art) => `${FUSS_START}
  <p class="foot">${FUSSTEXT[art]}</p>
</div><!-- .wrap -->
</div><!-- .inhalt -->

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

/* Register und Einstellungen stehen nicht im REGISTER, tragen aber denselben
   Rahmen — die Leiste gehört auf jede Seite. */
const RAHMENSEITEN = [
  { rel: "index.html", basis: "", seite: "", art: "register" },
  { rel: "einstellungen.html", basis: "", seite: "", art: "einstellungen" },
  ...SORTEN.flatMap(({ ordner, art }) => seitenDateien(ordner).map(f => ({
    rel: ordner + "/" + f, basis: "../", seite: f.replace(/\.html$/, ""), art
  })))
];

let rahmenGeaendert = 0;
for (const { rel, basis, seite, art } of RAHMENSEITEN) {
  const pfad = join(WURZEL, rel);
  const alt = readFileSync(pfad, "utf8");
  const neu = rahmenSetzen(alt, rel, basis, seite, art);
  if (neu !== alt) { writeFileSync(pfad, neu); rahmenGeaendert++; }
}
console.log(`Seitenrahmen: ${rahmenGeaendert} von ${RAHMENSEITEN.length} Seiten neu geschrieben`);

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

/* Die Zahl im Kopf der Abschluss-Checkliste ist Handarbeit und fällt nur auf,
   wenn man sie sucht: sie steht vor dem ersten Klick da und wird von hefter.js
   erst danach überschrieben. */
function checklistenZaehlerPruefen(html, datei) {
  const m = html.match(/id="chkStand">\s*0\s*\/\s*(\d+)\s*</);
  const punkte = (html.match(/class="check"/g) || []).length;
  if (!m) {
    if (punkte) throw new Error(`${datei}: ${punkte} Checklisten-Punkte, aber kein id="chkStand"`);
    return;
  }
  if (Number(m[1]) !== punkte)
    throw new Error(`${datei}: chkStand nennt ${m[1]} Punkte, gezählt sind ${punkte}`);
}

/* Eine Weiche ohne aktiven Weg ist ohne JavaScript ein leerer Schritt, eine
   mit zwei aktiven zeigt beide Wege gleichzeitig — im Browser mit JavaScript
   fällt beides nicht auf, weil hefter.js es beim Start geraderückt. */
function weichenPruefen(html, datei) {
  /* Zerlegt wird an den Weichen-Anfängen: .weg und button[data-weg] kommen
     nur innerhalb einer Weiche vor, deshalb genügt das zum Zählen — ein
     Klammer-Zähler über verschachtelte <div> wäre hier zu viel Apparat. */
  const weichen = [...html.matchAll(/<div class="weiche" data-weiche="([^"]*)"([\s\S]*?)(?=<div class="weiche" data-weiche=|$)/g)];
  for (const [, name, rumpf] of weichen) {
    const wege = [...rumpf.matchAll(/<div class="weg( aktiv)?" data-weg="([^"]*)"/g)];
    const knoepfe = [...rumpf.matchAll(/<button data-weg="([^"]*)"/g)].map(m => m[1]);
    if (wege.length < 2)
      throw new Error(`${datei}: Weiche "${name}" hat ${wege.length} Weg(e) — mindestens zwei nötig`);
    const aktiv = wege.filter(w => w[1]).length;
    if (aktiv !== 1)
      throw new Error(`${datei}: Weiche "${name}" hat ${aktiv} aktive Wege — genau einer muss es sein`);
    const wegNamen = wege.map(w => w[2]);
    const ohneWeg = knoepfe.filter(k => !wegNamen.includes(k));
    if (ohneWeg.length)
      throw new Error(`${datei}: Weiche "${name}" — Knopf ohne Weg: ${ohneWeg.join(", ")}`);
  }
}

/* Die Leseordnung. Alphabetisch sortiert stand die Server-Erst-Einrichtung
   als letzte der Server-Seiten, obwohl die anderen drei sie voraussetzen.
   Diese Liste bestimmt beides: die Ordnung innerhalb eines Fachs und — über
   das erste Auftreten einer Kategorie — die Ordnung der Fächer in der Leiste.
   Eine Seite, die hier fehlt, bricht den Build; so wird die Einordnung beim
   Anlegen erzwungen statt vergessen. */
const REIHENFOLGE = [
  /* Git — erst der eigene Rechner */
  "git-zugang-privat",
  "vscode-git-workflow",
  "git-ssd",
  /* Werkzeuge */
  "vscode-remote-ssh",
  /* Server — die Erst-Einrichtung ist die Voraussetzung der übrigen drei */
  "server-ersteinrichtung",
  "schluesselverwaltung",
  "docker-einrichtung",
  "domain-einrichtung",
  "coolify-einrichtung",
  /* Deployment */
  "hetzner-deploy"
];

const register = SORTEN.flatMap(({ ordner, art }) =>
  seitenDateien(ordner).map(f => {
    const h = readFileSync(join(WURZEL, ordner, f), "utf8");
    const greifen = (re, was) => {
      const m = h.match(re);
      if (!m) throw new Error(`${f}: ${was} nicht gefunden`);
      return entitaetenAufloesen(m[1].trim());
    };
    const zaehlen = re => (h.match(re) || []).length;
    eindeutigPruefen(h, f, "data-check");
    eindeutigPruefen(h, f, "data-schritt");
    codeboxTypenPruefen(h, f);
    checklistenZaehlerPruefen(h, f);
    weichenPruefen(h, f);
    return {
      id: f.replace(/\.html$/, ""),
      art,
      titel: greifen(/<h1>([\s\S]*?)<\/h1>/, "<h1>"),
      kuerzel: greifen(/<meta name="hefter-kuerzel" content="([^"]*)"/, "meta hefter-kuerzel"),
      untertitel: greifen(/<meta name="hefter-untertitel" content="([^"]*)"/, "meta hefter-untertitel"),
      kategorie: greifen(/<span class="chip">([\s\S]*?)<\/span>/, "Kategorie-Chip"),
      datei: ordner + "/" + f,
      stichworte: greifen(/<meta name="hefter-stichworte" content="([^"]*)"/, "meta hefter-stichworte"),
      /* Nenner der Fortschrittsbalken in der Leiste: Anleitungen zählen ihre
         Schritte, Übersichten ihre Haken. */
      schritte: zaehlen(/class="step[ "]/g),
      checks: zaehlen(/class="check"/g)
    };
  })
).sort((a, b) => REIHENFOLGE.indexOf(a.id) - REIHENFOLGE.indexOf(b.id));

/* Ohne diese Prüfung landete eine neue Seite still an Position -1, also ganz
   vorn — und die Fächer-Ordnung stünde kopf. */
const unbekannt = register.filter(e => !REIHENFOLGE.includes(e.id)).map(e => e.id);
if (unbekannt.length)
  throw new Error(`Seite fehlt in REIHENFOLGE (bauen.mjs) — ${unbekannt.join(", ")}`);
const verwaist = REIHENFOLGE.filter(id => !register.some(e => e.id === id));
if (verwaist.length)
  throw new Error(`REIHENFOLGE nennt Seiten, die es nicht gibt — ${verwaist.join(", ")}`);

const kuerzel = register.map(e => e.kuerzel);
const doppelteKuerzel = [...new Set(kuerzel.filter((k, i) => kuerzel.indexOf(k) !== i))];
if (doppelteKuerzel.length)
  throw new Error(`hefter-kuerzel mehrfach vergeben — ${doppelteKuerzel.join(", ")}`);

/* ---------- Verweise: Ziel-Datei und Anker müssen es geben ----------
   Ein Info-Symbol, das ins Leere zeigt, springt im Browser einfach nicht —
   ohne Meldung, ohne Spur. Bei einem Netz aus Verweisen zwischen Anleitungen
   und Nachschlage-Übersichten ist das die Prüfung, die sich am schnellsten
   auszahlt. */
const seitenTexte = new Map(
  RAHMENSEITEN.map(({ rel }) => [rel, readFileSync(join(WURZEL, rel), "utf8")])
);
const ankerJeSeite = new Map(
  [...seitenTexte].map(([rel, h]) => [rel, new Set([...h.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))])
);

const verweisFehler = [];
for (const [rel, html] of seitenTexte) {
  const ordner = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : ".";
  for (const [, ziel] of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(ziel)) continue;
    const [pfad, anker] = ziel.split("#");
    const zielSeite = pfad === ""
      ? rel
      : relative(WURZEL, join(WURZEL, ordner, pfad)).split(sep).join("/");
    if (!seitenTexte.has(zielSeite)) {
      verweisFehler.push(`${rel}: "${ziel}" — Datei ${zielSeite} gibt es nicht`);
      continue;
    }
    if (anker && !ankerJeSeite.get(zielSeite).has(anker))
      verweisFehler.push(`${rel}: "${ziel}" — Anker #${anker} steht nicht in ${zielSeite}`);
  }
}
if (verweisFehler.length)
  throw new Error("Verweise ins Leere:\n  " + verweisFehler.join("\n  "));

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
