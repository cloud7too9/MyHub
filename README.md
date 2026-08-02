# Hefter

Ein digitaler Hefter für eigene Schritt-für-Schritt-Anleitungen — als PWA, die offline
funktioniert und sich auf dem Telefon installieren lässt.

Kein Framework, keine Abhängigkeiten, kein `npm install`. Statische Dateien plus ein
Build-Skript aus der Node-Standardbibliothek.

## Was drin ist

| Datei / Ordner | Rolle |
|---|---|
| `index.html` | Register: alle Anleitungen nach Kategorie, mit Volltextsuche (`Strg K` oder `/`) |
| `einstellungen.html` | Design (hell/dunkel) und Auswahl des App-Icons |
| `anleitungen/*.html` | Die Anleitungen selbst |
| `hefter.js` | Gemeinsame Logik aller Seiten. Enthält den **generierten** Register-Block |
| `style.css` | Design-Tokens und Komponenten. Ein neues Theme ist ein weiterer `[data-theme="…"]`-Block |
| `bauen.mjs` | Das Build-Skript |
| `sw.js` | Service Worker — **generiert** |
| `manifest*.webmanifest` | Ein Manifest je App-Icon; der Wechsel hängt nur das `href` um |
| `icons/` | SVG-Quellen und die daraus abgeleiteten PNGs (192, 512, 512-maskable) |

## Nach jeder Änderung: `node bauen.mjs`

Das ist der einzige Schritt, den man kennen muss.

```bash
node bauen.mjs
```

Das Skript

1. liest alle Dateien in `anleitungen/` und schreibt daraus das Suchregister in `hefter.js`
   (der Block zwischen `/* REGISTER-START */` und `/* REGISTER-ENDE */`),
2. scannt das Verzeichnis und schreibt `sw.js` mit der Precache-Liste,
3. setzt die Cache-Version auf einen SHA-256 über **alle** Inhalte.

Punkt 3 ist der Grund, warum der Aufruf nicht optional ist: ohne ihn bleibt die Version im
Service Worker stehen und bereits installierte Clients bekommen weiter die alten Dateien
ausgeliefert. `hefter.js` und `sw.js` gehören nach dem Lauf mit in den Commit.

Bearbeite `sw.js` und den Register-Block in `hefter.js` nicht von Hand — beide werden
beim nächsten Lauf überschrieben.

## Eine neue Anleitung anlegen

1. Eine bestehende Datei in `anleitungen/` kopieren, etwa `hetzner-deploy.html`.
   Der Dateiname wird zur ID und muss zum `data-seite` am `<body>` passen.
2. Im `<head>` anpassen:
   - `<title>`
   - `<meta name="hefter-untertitel" content="…">` — die zweite Zeile im Register
   - `<meta name="hefter-stichworte" content="…">` — Suchbegriffe, klein und
     leerzeichengetrennt. Umlaute zusätzlich in ASCII-Schreibweise aufnehmen
     (`haertung` neben `Härtung`), damit beide Eingaben treffen.
3. Im `<body>`: `data-seite="dateiname"` und `data-basis="../"` setzen.
4. Im Kopf der Seite `<span class="chip">Kategorie</span>` und `<h1>` füllen — daraus
   entstehen Kategorie und Titel im Register.
5. `data-check`- und `data-schritt`-Werte vergeben. **Innerhalb einer Datei müssen sie
   eindeutig sein** — an ihnen hängen der Checklisten-Fortschritt und die angefügten Fotos.
   Der Build bricht bei einem Duplikat mit einer Meldung ab.
6. `node bauen.mjs` — Register und Service Worker aktualisieren sich selbst.

Weil die Zuordnung über diese IDs läuft und nicht über die Position, kann man Schritte
später umsortieren oder dazwischenschieben, ohne dass Häkchen oder Fotos verrutschen.

## Lokal ansehen

Ein Service Worker braucht `http://`, `file://` reicht nicht:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Beim Entwickeln in den DevTools unter *Application → Service Workers* „Update on reload"
aktivieren, sonst zeigt der Cache den alten Stand.

## Was lokal gespeichert wird

Alles bleibt auf dem Gerät, es gibt kein Backend.

- `localStorage` — Design, App-Icon, Checklisten-Fortschritt, Schritt-Filter je Seite
- `IndexedDB` (`hefter` → `fotos`) — angefügte Fotos als JPEG-Blob

## Updates

Eine neue Version übernimmt nicht sofort, sondern wartet: unten erscheint der Hinweis
„Neue Version verfügbar", und erst der Klick aktiviert sie und lädt neu. So entsteht kein
Mischzustand aus alten und neuen Dateien.
