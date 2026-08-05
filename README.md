# Hefter

Digitaler Hefter für Schritt-für-Schritt-Anleitungen — als installierbare PWA für Mobil und Desktop, mobile-first, komplett ohne Framework und ohne Backend.

Jede Seite ist eine eigenständige HTML-Datei. Das Register (`index.html`) ist der Einstieg mit Suche; ein Build-Skript hält Register und Service Worker automatisch aktuell.

## Zwei Seitensorten

| Sorte | Ordner | wofür |
|-------|--------|-------|
| **Anleitung** | `/anleitungen` | zum Durchlaufen: nummerierte Schritte, Stufenfilter, Abschluss-Checkliste. Wird mit Übung schlanker. |
| **Nachschlage-Übersicht** | `/nachschlagen` | zum Nachschlagen: Themen-Abschnitte mit Sprungmarken, kein Fortschritt. Darf ausführlich sein. |

Welche Sorte eine Seite ist, sagt allein ihr **Ordner** — es gibt kein
Meta-Tag, das man beim Kopieren einer Vorlage zu ändern vergessen könnte.
Im Register stehen die Übersichten in einem abgesetzten Block unter den
Anleitungen; die Suche läuft über beide.

## Struktur

```
hefter/
├── index.html                  Register mit Suche (Strg+K bzw. /)
├── einstellungen.html          Design-Wahl + App-Icon-Galerie
├── anleitungen/                Seitensorte "Anleitung"
│   ├── hetzner-deploy.html
│   ├── server-ersteinrichtung.html
│   ├── docker-einrichtung.html
│   ├── coolify-einrichtung.html
│   ├── domain-einrichtung.html
│   ├── vscode-remote-ssh.html
│   ├── git-zugang-privat.html
│   ├── git-ssd.html
│   └── vscode-git-workflow.html
├── nachschlagen/               Seitensorte "Nachschlage-Übersicht"
│   └── schluesselverwaltung.html
├── style.css                   Design-Tokens, Themes, alle Bausteine
├── hefter.js                   gesamte App-Logik (REGISTER wird generiert)
├── bauen.mjs                   Build-Skript — siehe unten
├── sw.js                       GENERIERT — nie von Hand bearbeiten
├── manifest.webmanifest        Standard-Manifest (Icon 01)
├── manifest-XX-….webmanifest   je Icon ein statisches Manifest
├── schriften/                  DM Sans + JetBrains Mono (woff2, selbst gehostet)
└── icons/                      6 SVG-Entwürfe + PNGs (192/512/maskable)
```

## Neue Seite anlegen

1. Bestehende Seite derselben Sorte kopieren — eine Anleitung aus
   `/anleitungen` (z. B. `hetzner-deploy.html`), eine Übersicht aus
   `/nachschlagen`. Der Zielordner entscheidet über die Sorte.
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
Seiten-Dateien beider Ordner erzeugt — nichts davon von Hand pflegen.

## Build-Skript

```
node bauen.mjs
```

- Liest Titel, Kategorie, Untertitel und Stichworte aus jeder Seite, ergänzt
  die Sorte aus dem Ordner (`art`) und schreibt das `REGISTER` zwischen die
  Marker in `hefter.js`.
- Bricht mit klarer Meldung ab, wenn `data-check` oder `data-schritt`
  innerhalb einer Seite doppelt vergeben sind, ein `data-typ` an einer
  Codebox unbekannt ist, oder zwei Seiten dieselbe id bekämen (gleicher
  Dateiname in beiden Ordnern). Im Browser fiele nichts davon auf.
- Scannt alle Projektdateien und erzeugt die Precache-Liste der `sw.js`.
- Setzt die Service-Worker-`VERSION` als SHA-256-Hash über alle Inhalte —
  jede Änderung ergibt automatisch eine neue Version.

**Die eine Regel: vor jedem Push einmal `node bauen.mjs` laufen lassen.**

## Bausteine einer Anleitungsseite

- Nummerierte Schritt-Rail mit **drei Stufen**:

  | Klasse | Aussehen | Bedeutung |
  |--------|----------|-----------|
  | `step einmalig` | gestrichelt, zurückgenommen | Aufbau, einmal erledigt |
  | `step wiederkehrend` | Cyan, durchgezogen | der Weg, den du wiederholst |
  | `step optional` | gepunktet, ohne Füllung | kann man machen, muss man nicht |

  Wofür die mittlere Stufe wiederholt wird, beschriftet jede Seite selbst
  (pro Repo, pro App, pro Nutzer bzw. Gerät …) — im Badge des Schritts, im
  Filter-Knopf und in der Hinweiszeile darunter. Der Filter zeigt nur die
  mittlere Stufe und blendet einmalige **und** optionale Schritte aus; die
  Wahl wird je Seite gemerkt. `stufenwechsel` am letzten Schritt eines
  Abschnitts unterdrückt die Verbindungslinie.
- **A/B-Weiche** für Schritte, die je nach Ausgangslage anders laufen:

  ```html
  <div class="weiche" data-weiche="zugang">
    <div class="weiche-wahl" role="group" aria-label="Ausgangslage wählen">
      <button data-weg="a" class="aktiv">Weg A · …</button>
      <button data-weg="b">Weg B · …</button>
    </div>
    <div class="weg aktiv" data-weg="a"> … </div>
    <div class="weg" data-weg="b"> … </div>
  </div>
  ```

  Alle Weichen einer Seite mit **gleichem `data-weiche`** schalten
  gemeinsam — wer oben Weg B wählt, bekommt ihn auch weiter unten. Die Wahl
  wird je Seite und Weiche gemerkt. Ohne JavaScript bleibt der in der Datei
  als `aktiv` markierte Weg stehen, die Seite ist also nie leer.
- **Prüfen plus Reparieren** (`.pruefblock` mit `.pruefung` und
  `.reparatur`): Feste Regel für alle Prüf-Bausteine — jeder
  Verifikations-Befehl bringt seinen Zweig für „fehlt oder stimmt nicht“
  gleich mit, inklusive Weg zur Datei und Anlegen samt Verzeichnis. Ein
  Prüfbefehl allein sagt einem nur, dass etwas kaputt ist, und lässt einen
  genau dann stehen, wenn es das ist. `.pr-soll` beschreibt darunter die
  Soll-Ausgabe.
- **Info-Symbol** (`a.infolink` in der `<h2>` eines Schritts): Verweis in
  den passenden Abschnitt einer Nachschlage-Übersicht. Hält die Anleitung
  schlank — der Tiefgang ist einen Tap entfernt.
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

## Bausteine einer Nachschlage-Übersicht

Kein Fortschritt, keine Rail — die Seite wird nicht durchlaufen, sondern
aufgeschlagen. Codeboxen und Callouts sind dieselben wie in Anleitungen.

- `<span class="sorte">Nachschlagen</span>` neben dem Kategorie-Chip im Kopf.
  Bewusst farblos: Der Akzent gehört den Anleitungen.
- `<nav class="sprungmarken">` — Links auf die Abschnitte der Seite.
- `<section class="thema" id="…">` je Thema. Die `id` ist das Ziel der
  Sprungmarken **und** der Info-Symbole aus den Anleitungen; sie gehört
  damit zu den stabilen IDs. `.tab` ist eine schmale Vergleichstabelle, die
  auf dem Telefon für sich scrollt.

## Speicherung (alles lokal auf dem Gerät)

| Was                          | Wo                                   |
|------------------------------|--------------------------------------|
| Fotos                        | IndexedDB `hefter` → Store `fotos` (Blobs, an `data-schritt`-IDs) |
| Checklisten-Haken            | `localStorage` `hefter:checks:<seite>` (Array von `data-check`-IDs) |
| Design (dunkel/hell)         | `localStorage` `hefter:theme`        |
| App-Icon-Wahl                | `localStorage` `hefter:icon`         |
| Stufenfilter je Seite        | `localStorage` `hefter:stufe:<seite>`|
| Weichen-Wahl (Weg A/B)       | `localStorage` `hefter:weg:<seite>:<weiche>` |

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
