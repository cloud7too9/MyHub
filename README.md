# Hefter

Digitaler Hefter für Schritt-für-Schritt-Anleitungen — als installierbare PWA für Mobil und Desktop, mobile-first, komplett ohne Framework und ohne Backend.

Jede Seite ist eine eigenständige HTML-Datei. Das Register steht als
**Seitenleiste** auf jeder Seite; ein Build-Skript hält Leiste, Register und
Service Worker automatisch aktuell.

## Navigation

Die Leiste zeigt alle Seiten nach Fächern (den Kategorien), in der Reihenfolge,
die `bauen.mjs` festlegt — nicht alphabetisch, sondern in Leseordnung. Je
Eintrag stehen dort Kürzel, Titel, Sorte und ein Fortschrittsbalken.

| Bedienung | |
|---|---|
| `Strg+B` oder der Pfeil im Kopf | klappt die Leiste auf eine Kürzel-Spalte ein (Sprechblase beim Überfahren) |
| `Strg+K` oder `/` | springt ins Suchfeld der Leiste — von jeder Seite aus |
| `Esc` | leert die Suche, schließt auf dem Telefon den Auszug |
| unter 860 px | wird die Leiste zum Auszug über dem Inhalt, geöffnet über das Brenner-Symbol |

Eingeklappter Zustand und zugeklappte Fächer werden gemerkt und schon im
`<head>` gesetzt — die Leiste blitzt beim Laden nicht in der falschen Breite
auf.

Die **Startseite** (`index.html`) ist kein zweites Register mehr, sondern
beantwortet „wo stehe ich": zuletzt geöffnete Seite, angefangene Seiten, und
darunter alle Seiten nach Fächern mit ihrem Stand. Diese Liste bleibt
vollständig — unter 860 px ist die Leiste zugeklappt, und ohne sie liefe der
Einstieg sonst ins Leere.

## Zwei Seitensorten

| Sorte | Ordner | wofür |
|-------|--------|-------|
| **Anleitung** | `/anleitungen` | zum Durchlaufen: nummerierte Schritte, Stufenfilter, Abschluss-Checkliste. Wird mit Übung schlanker. |
| **Nachschlage-Übersicht** | `/nachschlagen` | zum Nachschlagen: Themen-Abschnitte mit Sprungmarken. Darf ausführlich sein. |

Welche Sorte eine Seite ist, sagt allein ihr **Ordner** — es gibt kein
Meta-Tag, das man beim Kopieren einer Vorlage zu ändern vergessen könnte.
In der Leiste stehen beide Sorten in ihrem Fach nebeneinander, unterschieden
durch die Zeile „Durchlaufen" bzw. „Nachschlagen" unter dem Titel; die Suche
läuft über beide.

## Struktur

```
hefter/
├── index.html                  Startseite: wo du stehst
├── einstellungen.html          Design-Wahl + App-Icon-Galerie
├── anleitungen/                Seitensorte "Anleitung"
│   ├── arbeitsplatz-einrichten.html
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
│   ├── werkzeugkasten.html
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
   - `<span class="chip">` — wird zur Register-Kategorie, also zum Fach
   - `<meta name="hefter-untertitel">` und `<meta name="hefter-stichworte">`
   - `<meta name="hefter-kuerzel">` — zwei bis drei Zeichen für die
     eingeklappte Leiste; doppelt vergeben bricht der Build ab
   - `data-schritt="…"` an jedem `<section class="step">`, `data-check="…"` an jedem
     Checklisten-Punkt — **stabile, beliebige IDs**; nie wiederverwenden,
     sonst wandern Fotos/Haken mit. Duplikate innerhalb einer Seite fängt
     das Build-Skript mit einer klaren Fehlermeldung ab.
   - Codeboxen: Befehle sind der Standard und brauchen nichts. Enthält eine
     Box stattdessen einen **Dateiinhalt**, bekommt sie `data-typ="datei"`.
     Ein **Befehl über mehrere Zeilen** (Heredoc, `for`-Schleife,
     Backslash-Fortsetzung) wird in `<span class="befehl">…</span>`
     geklammert, damit er als ein Befehl kopiert wird.
3. Die Seite in `REIHENFOLGE` (in `bauen.mjs`) an ihren Platz stellen — die
   Liste bestimmt die Reihenfolge in der Leiste. Fehlt sie dort, bricht der
   Build ab; die Einordnung lässt sich also nicht vergessen.
4. `node bauen.mjs` ausführen.
5. Committen und pushen.

Das Register in `hefter.js` und die `sw.js` werden dabei vollständig aus den
Seiten-Dateien beider Ordner erzeugt — nichts davon von Hand pflegen.

### Der Seitenrahmen wird erzeugt

Kopf, App-Bar und Fuß sind auf jeder Seite dieselben Zeilen. Sie stehen
deshalb nicht in der Datei, sondern werden von `bauen.mjs` zwischen die
Marker geschrieben:

```html
<head>
<meta charset="UTF-8">                     ← muss erste Zeile im head bleiben
<meta name="description" content="…">      ┐
<meta name="hefter-untertitel" …>          │ das Einzige, was die Seite
<meta name="hefter-stichworte" …>          │ selbst pflegt
<title>… · Hefter</title>                  ┘
<!-- KOPF-START · erzeugt von bauen.mjs — nicht von Hand ändern -->
…                                          ← Rahmen, inklusive <body> und App-Bar
<!-- KOPF-ENDE -->
   … hier steht der Seiteninhalt …
<!-- FUSS-START · erzeugt von bauen.mjs — nicht von Hand ändern -->
```

Der Fuß hat keinen Endmarker: er reicht bis zum Dateiende. `data-seite` und
`data-basis` kommen aus Dateiname und Ordner — zwei Attribute weniger, die man
beim Kopieren einer Vorlage zu ändern vergessen kann. Eine Änderung an der
App-Bar ist damit ein Eingriff an einer Stelle statt an zwölf. Fehlt einer der
Marker, bricht der Build mit einer klaren Meldung ab.

**`<meta charset>` bleibt oben:** Vor der Kodierungsangabe darf kein
Nicht-ASCII-Byte stehen, und Untertitel wie Beschreibung enthalten Umlaute.
Schickt der Server kein `charset` mit — `python3 -m http.server` tut das nicht
—, rät der Browser sonst.

## Build-Skript

```
node bauen.mjs
```

- Liest Titel, Kategorie, Untertitel und Stichworte aus jeder Seite, ergänzt
  die Sorte aus dem Ordner (`art`) und schreibt das `REGISTER` zwischen die
  Marker in `hefter.js`.
- Bricht mit klarer Meldung ab bei allem, was im Browser stumm bliebe:

  | Prüfung | was sonst passiert |
  |---|---|
  | `data-check` / `data-schritt` doppelt in einer Seite | zwei Häkchen bzw. Fotozonen liegen still zusammen |
  | unbekanntes `data-typ` an einer Codebox | die Box verhält sich klaglos wie eine Befehlsbox |
  | gleiche Seiten-id in beiden Ordnern | zwei Register-Einträge teilen sich die Speicherung |
  | `hefter-kuerzel` fehlt oder ist doppelt | zwei gleiche Plaketten in der Leiste |
  | Seite fehlt in `REIHENFOLGE` | sie rutscht stumm an den Anfang |
  | Verweis auf Datei oder `#anker`, die es nicht gibt | der Sprung passiert einfach nicht |
  | `chkStand` oder der Schritt-Zähler nennt eine andere Zahl als gezählt | falscher Stand bis zum ersten Klick |
  | `<section class="step">` ohne `data-schritt` | der Schritt lässt sich nicht abhaken, seine Fotos finden ihre Zone nicht |
  | Weiche mit weniger als zwei Wegen oder ohne genau einen `aktiv` | ohne JavaScript leer oder doppelt |
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

  Die **Schrittnummer ist zugleich der Haken**: ein Klick markiert den Schritt
  als erledigt, die Perle füllt sich und das Rail-Stück färbt sich ein. Kopf
  und Seitenleiste zeigen den Stand. Gezählt werden immer alle Schritte der
  Seite, auch die vom Filter ausgeblendeten — sonst spränge die Zahl beim
  Umschalten, ohne dass sich etwas getan hätte. Die `data-schritt`-ID sitzt
  dafür am `<section class="step">`; die Fotozone darin liest sie von dort.

  Wofür die mittlere Stufe wiederholt wird, beschriftet jede Seite selbst
  (pro Repo, pro App, pro Nutzer bzw. Gerät …) — im Badge des Schritts, im
  Filter-Knopf und in der Hinweiszeile darunter. Der Filter zeigt nur die
  mittlere Stufe und blendet einmalige **und** optionale Schritte aus; die
  Wahl wird je Seite gemerkt. `stufenwechsel` am letzten Schritt eines
  Abschnitts unterdrückt die Verbindungslinie.
- **Abschnitte** (`div.abschnitt`) für lange Anleitungen: ab etwa zwanzig
  Schritten sieht man an der Rail allein nicht mehr, wo ein Themenblock endet.
  Die Zwischenüberschrift läuft in derselben Spaltenteilung wie ein Schritt.
  Sie trägt die Stufe ihrer Schritte, damit der Filter ganze Abschnitte
  mit ausblendet statt eine Überschrift ohne Inhalt stehenzulassen.
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
- **Werkzeug-Karte** (`article.wz`) für Übersichten, bei denen die Frage
  „was steht schon, was fehlt noch" lautet — der Werkzeugkasten nutzt sie
  25-mal. Aufgeklappt wird über `<details>`: das geht ohne JavaScript und
  braucht keinen eigenen Zustandsspeicher. Der Haken je Karte ist ein
  gewöhnlicher `.check` und speist damit auch den Balken in der Leiste.
  Springt ein Info-Symbol auf eine Karte, klappt sie von selbst auf.
  Der Prüfblock einer Karte hat nur den `.pruefung`-Zweig: der
  Reparaturweg sind die Einrichtungs-Schritte, die direkt darüber stehen.

## Speicherung (alles lokal auf dem Gerät)

| Was                          | Wo                                   |
|------------------------------|--------------------------------------|
| Fotos                        | IndexedDB `hefter` → Store `fotos` (Blobs, an `data-schritt`-IDs) |
| Checklisten-Haken            | `localStorage` `hefter:checks:<seite>` (Array von `data-check`-IDs) |
| Erledigte Schritte           | `localStorage` `hefter:schritte:<seite>` (Array von `data-schritt`-IDs) |
| Design (dunkel/hell)         | `localStorage` `hefter:theme`        |
| App-Icon-Wahl                | `localStorage` `hefter:icon`         |
| Stufenfilter je Seite        | `localStorage` `hefter:stufe:<seite>`|
| Weichen-Wahl (Weg A/B)       | `localStorage` `hefter:weg:<seite>:<weiche>` |
| Zustand der Seitenleiste     | `localStorage` `hefter:leiste` (eingeklappt, zugeklappte Fächer) |
| Zuletzt geöffnete Seite      | `localStorage` `hefter:zuletzt` (speist „Weiterlesen" auf der Startseite) |

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
