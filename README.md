# Hefter

Digitaler Hefter für Schritt-für-Schritt-Anleitungen — als installierbare PWA für Mobil und Desktop, mobile-first, komplett ohne Framework und ohne Backend.

Jede Anleitung ist eine eigenständige HTML-Datei. Das Register (`index.html`) ist der Einstieg mit Suche; ein Build-Skript hält Register und Service Worker automatisch aktuell.

## Struktur

```
hefter/
├── index.html                  Register mit Suche (Strg+K bzw. /)
├── einstellungen.html          Design-Wahl + App-Icon-Galerie
├── anleitungen/
│   ├── hetzner-deploy.html
│   ├── server-ersteinrichtung.html
│   ├── docker-einrichtung.html
│   ├── coolify-einrichtung.html
│   ├── domain-einrichtung.html
│   ├── vscode-remote-ssh.html
│   ├── git-zugang-privat.html
│   ├── git-ssd.html
│   └── vscode-git-workflow.html
├── style.css                   Design-Tokens, Themes, alle Bausteine
├── hefter.js                   gesamte App-Logik (REGISTER wird generiert)
├── bauen.mjs                   Build-Skript — siehe unten
├── sw.js                       GENERIERT — nie von Hand bearbeiten
├── manifest.webmanifest        Standard-Manifest (Icon 01)
├── manifest-XX-….webmanifest   je Icon ein statisches Manifest
├── schriften/                  DM Sans + JetBrains Mono (woff2, selbst gehostet)
└── icons/                      6 SVG-Entwürfe + PNGs (192/512/maskable)
```

## Neue Anleitung anlegen

1. Bestehende Anleitung in `/anleitungen` kopieren (z. B. `hetzner-deploy.html`).
2. Inhalt schreiben; dabei anpassen:
   - `<title>` und `<h1>` — der `<h1>` wird zum Register-Titel
   - `<span class="chip">` — wird zur Register-Kategorie
   - `<meta name="hefter-untertitel">` und `<meta name="hefter-stichworte">`
   - `data-seite="…"` am `<body>` — eindeutige Seiten-ID für die Speicherung
   - `data-schritt="…"` an jeder `.fotozone`, `data-check="…"` an jedem
     Checklisten-Punkt — **stabile, beliebige IDs**; nie wiederverwenden,
     sonst wandern Fotos/Haken mit. Duplikate innerhalb einer Seite fängt
     das Build-Skript mit einer klaren Fehlermeldung ab.
   - Codeboxen: Befehle sind der Standard und brauchen nichts. Enthält eine
     Box stattdessen einen **Dateiinhalt**, bekommt sie `data-typ="datei"`.
     Ein **Befehl über mehrere Zeilen** (Heredoc, `for`-Schleife,
     Backslash-Fortsetzung) wird in `<span class="befehl">…</span>`
     geklammert, damit er als ein Befehl kopiert wird.
3. `node bauen.mjs` ausführen.
4. Committen und pushen.

Das Register in `hefter.js` und die `sw.js` werden dabei vollständig aus den
Anleitungs-Dateien erzeugt — nichts davon von Hand pflegen.

## Build-Skript

```
node bauen.mjs
```

- Liest Titel, Kategorie, Untertitel und Stichworte aus jeder Anleitung und
  schreibt das `REGISTER` zwischen die Marker in `hefter.js`.
- Scannt alle Projektdateien und erzeugt die Precache-Liste der `sw.js`.
- Setzt die Service-Worker-`VERSION` als SHA-256-Hash über alle Inhalte —
  jede Änderung ergibt automatisch eine neue Version.

**Die eine Regel: vor jedem Push einmal `node bauen.mjs` laufen lassen.**

## Bausteine einer Anleitungsseite

- Nummerierte Schritt-Rail mit zwei Stufen:
  `class="step einmalig"` (gestrichelt, z. B. Server-Setup) und
  `class="step wiederkehrend"` (Cyan, der Weg bei jedem Mal).
  Der Filter unter dem Kopf blendet einmalige Schritte aus; die Wahl wird
  je Seite gemerkt. `stufenwechsel` am letzten Schritt eines Abschnitts
  unterdrückt die Verbindungslinie.
- Codeboxen (bleiben in beiden Themes dunkel) in zwei Ausprägungen:
  **Befehle** (Standard) bekommen je Befehlszeile einen eigenen
  Kopier-Knopf — Kommentar- und Leerzeilen keinen. Ein Knopf über dem
  ganzen Block wäre eine Falle: eingefügt liefe alles auf einmal durch,
  auch dort, wo erst das Ergebnis zu lesen ist (`sshd -t`, `nginx -t`)
  oder ein Skript vor dem Ausführen angesehen werden soll.
  **Dateiinhalte** werden mit `data-typ="datei"` an der `.codebox`
  ausgezeichnet und behalten den Knopf für den ganzen Block.
- Callouts: `info`, `sicher`/`achtung` (Gelb), `ergebnis` (Grün), `gefahr` (Rot).
- Foto anfügen: Foto wählen → im 16:9-Feld schieben/zoomen → Übernehmen
  hängt den Ausschnitt unter den Schritt (1280×720 JPEG).
- Abschluss-Checkliste mit Fortschrittszähler.

## Speicherung (alles lokal auf dem Gerät)

| Was                          | Wo                                   |
|------------------------------|--------------------------------------|
| Fotos                        | IndexedDB `hefter` → Store `fotos` (Blobs, an `data-schritt`-IDs) |
| Checklisten-Haken            | `localStorage` `hefter:checks:<seite>` (Array von `data-check`-IDs) |
| Design (dunkel/hell)         | `localStorage` `hefter:theme`        |
| App-Icon-Wahl                | `localStorage` `hefter:icon`         |
| Stufenfilter je Seite        | `localStorage` `hefter:stufe:<seite>`|

Kein Server, keine Konten, keine Übertragung — Backup/Export auf ein zweites
Gerät gibt es (noch) nicht.

## App-Icon & Themes

- Sechs Icon-Entwürfe; Auswahl in den Einstellungen mit Hervorhebung der
  aktiven Wahl. Der Wechsel hängt das `link[rel=manifest]` auf die passende
  statische Manifest-Datei um und tauscht Favicon + Apple-Touch-Icon sofort.
  **Homescreen-Einschränkung:** bereits installierte Apps übernehmen den
  Wechsel nicht zuverlässig (iOS: erst nach Neu-Installation, Android:
  frühestens nach ~1 Tag).
- Themes laufen über CSS Custom Properties. Neues Theme = ein weiterer
  `[data-theme="…"]`-Block in `style.css` plus ein Knopf in den
  Einstellungen. Codeboxen bleiben bewusst in jedem Theme dunkel.

## Updates & Offline

Der Service Worker precached die komplette App (offline nutzbar) und liefert
per Stale-while-revalidate. Eine neue Version übernimmt **nicht** sofort:
Die App zeigt unten „Neue Version verfügbar" — erst der Klick auf
Aktualisieren aktiviert sie und lädt neu. So treffen nie alte und neue
Dateien aufeinander.

## Entwicklung & Deployment

Lokal testen (Service Worker braucht http, nicht `file://`):

```
python3 -m http.server
# → http://localhost:8000
```

Deployment: statisches Hosting genügt (z. B. Netlify, verbunden mit dem
GitHub-Repo). Kein Build-Schritt auf dem Server — `node bauen.mjs` läuft
lokal vor dem Commit. Ablauf: ändern → `node bauen.mjs` → committen → pushen.
