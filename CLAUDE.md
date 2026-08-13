# CLAUDE.md

Leitfaden für Claude Code (und andere KI-Assistenten) in diesem Repository.
Der `README.md` beschreibt das Produkt; diese Datei beschreibt die **Arbeit
am Code**: was generiert wird, was den Build bricht, welche Konventionen
gelten.

**Sprache: Deutsch.** Code-Bezeichner, Kommentare, Commit-Nachrichten,
Dateinamen und Inhalte sind durchgängig deutsch (`bauen.mjs`, `REIHENFOLGE`,
`leisteAufbauen`, `data-schritt`). Neuer Code hält sich daran — englische
Bezeichner fallen hier aus dem Rahmen.

## Was das ist

„Hefter" — ein digitaler Ordner für Schritt-für-Schritt-Anleitungen als
installierbare PWA. **Kein Framework, keine Abhängigkeiten, kein Backend,
kein Bundler.** Jede Seite ist eine eigenständige HTML-Datei; geteilt werden
`style.css`, `hefter.js` und ein Seitenrahmen, den das Build-Skript erzeugt.
Node wird ausschließlich für `bauen.mjs` gebraucht (nur Stdlib), nicht zur
Laufzeit. Es gibt keine `package.json`, keine Tests, keinen Linter und
(noch) keine CI.

## Die eine Regel

```
node bauen.mjs
```

**Vor jedem Commit.** Das Skript schreibt in Dateien, die im Repo liegen
(`hefter.js`, `sw.js`, den Rahmen jeder Seite). Wer es vergisst, committet
einen Stand, in dem Register, Precache-Liste und Service-Worker-Version nicht
zum Inhalt passen — im Browser fällt das nicht auf, es wird nur nichts
aktualisiert. Der Lauf ist idempotent: bei unverändertem Inhalt schreibt er
nichts und `git status` bleibt sauber.

Erwartete Ausgabe:

```
Seitenrahmen: 0 von 14 Seiten neu geschrieben
Register: 10 Anleitungen, 2 Übersichten übernommen
Service Worker: 51 Dateien im Precache · hefter-xxxxxxxxxx
```

Ablauf immer: **ändern → `node bauen.mjs` → committen → pushen.**

## Generiert — niemals von Hand bearbeiten

| Stelle | erzeugt von | Quelle |
|---|---|---|
| `sw.js` (komplett) | `bauen.mjs` | Verzeichnis-Scan + SHA-256 über alle Inhalte |
| `hefter.js` zwischen `/* REGISTER-START */` … `/* REGISTER-ENDE */` | `bauen.mjs` | Metadaten aller Seiten |
| jede Seite zwischen `<!-- KOPF-START … -->` … `<!-- KOPF-ENDE -->` | `bauen.mjs` | `kopf()` in `bauen.mjs` |
| jede Seite ab `<!-- FUSS-START … -->` bis Dateiende | `bauen.mjs` | `fuss()` in `bauen.mjs` |

Eine Änderung an App-Bar, Seitenleiste, Kopf-Script oder Fuß gehört deshalb
in `bauen.mjs` (Funktionen `kopf` / `fuss` / `FUSSTEXT`) — **nicht** in die
14 HTML-Dateien. Ein Edit dort ist beim nächsten Build weg.

Von Hand gepflegt wird an einer Seite nur, was **oberhalb** von `KOPF-START`
steht (`<meta charset>` als erste Zeile im `<head>`, `description`, die
`hefter-*`-Metas, `<title>`) und der Inhalt **zwischen** `KOPF-ENDE` und
`FUSS-START`.

## Struktur

```
/
├── index.html                  Startseite ("wo stehe ich") — Inhalt kommt aus hefter.js (#buehne)
├── einstellungen.html          Design-Wahl + App-Icon-Galerie
├── anleitungen/*.html          Seitensorte "Anleitung"      (10 Seiten)
├── nachschlagen/*.html         Seitensorte "Übersicht"      (2 Seiten)
├── style.css                   Tokens, Themes, alle Bausteine (~1090 Zeilen)
├── hefter.js                   gesamte App-Logik (~1310 Zeilen, REGISTER generiert)
├── bauen.mjs                   Build-Skript (~445 Zeilen)
├── sw.js                       GENERIERT
├── manifest*.webmanifest       je App-Icon ein statisches Manifest
├── schriften/                  DM Sans + JetBrains Mono (woff2, selbst gehostet)
└── icons/                      6 SVG-Entwürfe + PNGs (192/512/maskable)
```

Die **Sorte** einer Seite ergibt sich allein aus ihrem **Ordner** — es gibt
kein Meta-Tag dafür. `anleitungen/` → `art: "anleitung"` (durchlaufen,
Schritt-Rail, Fortschritt), `nachschlagen/` → `art: "uebersicht"`
(nachschlagen, Sprungmarken, kein Fortschritt).

## Neue Seite anlegen

1. Bestehende Seite **derselben Sorte** kopieren (z. B.
   `anleitungen/hetzner-deploy.html` oder `nachschlagen/schluesselverwaltung.html`).
   Der Zielordner entscheidet über die Sorte.
2. Anpassen: `<title>`, `<meta name="description">`, `<h1>` (wird
   Register-Titel), `<span class="chip">` (wird Fach/Kategorie),
   `hefter-untertitel`, `hefter-stichworte`, `hefter-kuerzel` (2–3 Zeichen,
   repo-weit eindeutig).
3. Alle `data-schritt`- und `data-check`-IDs neu und **stabil** vergeben
   (siehe unten).
4. Die Seiten-ID (Dateiname ohne `.html`) in `REIHENFOLGE` in `bauen.mjs` an
   ihren Platz stellen. Fehlt sie dort, bricht der Build — die Einordnung
   lässt sich nicht vergessen.
5. `node bauen.mjs`, dann committen.

`data-seite` und `data-basis` am `<body>` setzt der Build aus Dateiname und
Ordner; sie stehen im generierten Rahmen und werden nicht angefasst.

## Stabile IDs — die wichtigste inhaltliche Regel

Fortschritt und Fotos hängen an IDs, nicht an Positionen:

- `data-schritt="…"` am `<section class="step">` — erledigte Schritte **und**
  Zuordnung der Fotos in IndexedDB.
- `data-check="…"` an jedem `.check` — Checklisten-Haken.
- `id="…"` an `<section class="thema">` — Ziel von Sprungmarken **und** von
  `a.infolink` aus Anleitungen.

Diese IDs sind frei wählbar, aber **dauerhaft**. Eine ID umbenennen heißt:
gespeicherter Haken weg. Eine ID wiederverwenden heißt: die Fotos des alten
Schritts erscheinen am neuen. Schritte umsortieren ist harmlos, IDs
recyceln nicht.

## Was der Build abbricht

`bauen.mjs` prüft genau das, was im Browser stumm bliebe. Jeder Fehler nennt
Datei und Ursache im Klartext:

| Prüfung | was sonst passiert |
|---|---|
| `data-check` / `data-schritt` doppelt in einer Seite | zwei Haken bzw. Fotozonen liegen still zusammen |
| `<section class="step">` ohne `data-schritt` | Schritt nicht abhakbar, Fotos finden ihre Zone nicht |
| unbekanntes `data-typ` an einer `.codebox` (erlaubt ist nur `datei`) | Box verhält sich klaglos wie eine Befehlsbox |
| `chkStand` oder `data-fs-zahl` nennt eine andere Zahl als gezählt | falscher Stand bis zum ersten Klick |
| Weiche mit < 2 Wegen, ≠ 1 `aktiv`, oder Knopf ohne passenden Weg | ohne JavaScript leer oder doppelt |
| unbekannte Callout-Art (nur `info · sicher · achtung · ergebnis · gefahr`) | Box nimmt still den Akzent und hört auf die falsche Anzeige-Einstellung |
| `.reparatur` ohne `.pr-kopf` | eingeklappt fehlt der Griff, mit dem der Zweig aufgeht |
| `data-haken-balken` fehlt bei durchweg `einmalig`en Schritten — oder steht da, obwohl nicht | die Seite wechselt mit einem neuen Schritt stumm ihren Charakter, der Balken bleibt falsch |
| Verweis auf Datei oder `#anker`, die es nicht gibt | der Sprung passiert einfach nicht |
| `hefter-kuerzel` fehlt oder ist doppelt | zwei gleiche Plaketten in der Leiste |
| gleiche Seiten-id in beiden Ordnern | zwei Register-Einträge teilen sich die Speicherung |
| Seite fehlt in `REIHENFOLGE` / `REIHENFOLGE` nennt eine Seite, die es nicht gibt | Seite rutscht stumm an den Anfang |
| Marker `KOPF-START`/`KOPF-ENDE`/`FUSS-START` fehlt | Rahmen kann nicht erzeugt werden |
| `<h1>`, `.chip` oder eines der `hefter-*`-Metas fehlt | Registereintrag unvollständig |

**Die Zähler im Kopf sind Handarbeit**: `<span class="fs-zahl" data-fs-zahl>0 / 4</span>`
und `<b id="chkStand">0 / 7</b>` müssen zur tatsächlichen Zahl von `.step`
bzw. `.check` passen. Wer einen Schritt hinzufügt, zieht die Zahl nach — der
Build erinnert daran.

Neue Prüfungen gehören in dasselbe Muster: eine kleine Funktion, die wirft,
plus ein Kommentar darüber, **was im Browser stumm bliebe**, wenn es sie
nicht gäbe.

## Bausteine (Markup-Konventionen)

### Anleitungsseite

Kopf: `header.guide-head` mit `.chip`, `<h1>`, `.meta`, `.lead`,
`.schrittstand`, optional `.stufenfilter` + `.stufen-hinweis`.

Schritt:

```html
<section class="step wiederkehrend" data-schritt="stabile-id">
  <div class="rail"><button class="step-num" type="button" aria-pressed="false" aria-label="Schritt 3">3</button></div>
  <div class="step-body">
    <span class="stufe">…SVG… Pro Repo</span>
    <h2>Überschrift<a class="infolink" href="../nachschlagen/werkzeugkasten.html#wz-git" …>…</a></h2>
    …
    <div class="fotozone"><div class="fotos"></div><button class="addfoto">…</button></div>
  </div>
</section>
```

Drei Stufen als zweite Klasse am `.step`: `einmalig` (Aufbau),
`wiederkehrend` (der wiederholte Weg — der Filter zeigt nur diese),
`optional`. `stufenwechsel` am letzten Schritt eines Blocks unterdrückt die
Verbindungslinie. **Die Schrittnummer ist der Haken** — `.step-num` ist ein
Button, kein Dekor. Gezählt werden immer alle Schritte, auch ausgeblendete.

Weitere Bausteine: `div.abschnitt` (Zwischenüberschrift, trägt die Stufe
ihrer Schritte), `.weiche` mit `data-weiche` (gleicher Name = schaltet
gemeinsam; genau ein Weg `aktiv` in der Datei), `.pruefblock` mit
`.pruefung` + `.reparatur`, `a.infolink` in der `<h2>`,
Callouts `info` / `sicher` / `achtung` / `ergebnis` / `gefahr`,
Abschluss-Checkliste mit `.check` und `#chkStand` (die Ergebnisse der ganzen
Seite zum Abhaken — **kein** Vorgang, siehe unten).

**Zwei Balken, zwei Marken.** Der Kopfbalken einer Anleitung gehört den
Schritten (`data-fs-balken`, dazu `data-fs-zahl` und `data-fs-reset`); der
Haken-Balken gehört den `.check` (`data-haken-balken`, dazu `data-haken-reset`).
Getrennte Marken, weil eine gemeinsame sich auf Seiten mit beidem gegenseitig
überschriebe. Wo sie stehen:

| Seite | `data-fs-balken` | `data-haken-balken` |
|---|---|---|
| Anleitung, Schritte gemischt | im Kopf | — |
| Anleitung, Schritte durchweg `einmalig` | im Kopf | im `<header>` der Checkliste |
| `werkzeugkasten.html` | — | im Kopf (führt die 25 Karten) |

Die mittlere Zeile ist die Regel, die der Build erzwingt: läuft man eine
Anleitung genau einmal durch, ist die Liste am Ende das Maß der Dinge und
verdient einen Balken; sonst wäre er für eine Handvoll Haken bloß Zierde.

**Regel für Prüf-Bausteine:** Jeder Verifikations-Befehl bringt seinen
Reparaturzweig mit („fehlt oder stimmt nicht"), inklusive Weg zur Datei und
Anlegen samt Verzeichnis. Ein Prüfbefehl allein lässt einen genau dann
stehen, wenn das Ergebnis schlecht ausfällt. `arbeitsplatz-einrichten.html`
(21 Stellen) und `server-ersteinrichtung.html` (10) machen es vor; die
übrigen acht Anleitungen sind noch nicht nachgezogen.

### Nachschlage-Übersicht

`<span class="sorte">Nachschlagen</span>` neben dem Chip,
`<nav class="sprungmarken">`, dann `<section class="thema" id="…">` je
Thema. Kein Fortschritt, keine Rail. Die `wz`-Karte (`article.wz` mit
`.check.wz-haken` + `<details class="wz-klapp">`) ist die Form für „was
steht schon, was fehlt noch"; aufgeklappt wird über `<details>`, also ohne
JavaScript und ohne eigenen Zustandsspeicher.

### Vorgang abschließen

Ein Vorgang ist das, was man an einem Stück erledigt. Der Knopf steht am Ende
seines Inhalts — dort, wo man fertig wird, statt dort, wo man anfängt. **Beide
Knöpfe werden erzeugt** und stehen in keiner HTML-Datei, wie die Kopier-Knöpfe
der Codeboxen auch. Je Seitensorte ist der Vorgang etwas anderes, und die
beiden Fälle teilen nur das Aussehen, nicht die Mechanik:

| Sorte | Vorgang | erzeugt in | setzt |
|---|---|---|---|
| Anleitung | `.step` | `schritteAktivieren()` | die `.step-num` |
| Übersicht | `.wz` | `vorgaengeAktivieren()` | die `.check` des Containers |

Gesetzt wird in beiden Fällen über `.click()` auf den vorhandenen Haken,
nie über einen zweiten Pfad — Speichern, Zähler und der Balken in der Leiste
bleiben damit in `schritteAktivieren` bzw. `checklisteAktivieren`.

Welche Container als Vorgang zählen, steht als Konstante in `hefter.js` und
wird nicht aus dem Markup geraten:

```js
const VORGANG = ".wz";
```

Der Knopf der Karte sitzt in `.wz-inhalt`, also im `<details>`-Rumpf und damit
nur aufgeklappt sichtbar, und unter dem Prüfblock, weil der zum Vorgang
gehört. Der Knopf des Schritts sitzt am Ende von `.step-body`, hinter der
Fotozone.

**Die Abschluss-Checkliste ist kein Vorgang.** Sie stand einmal in `VORGANG`,
und das war ein Denkfehler: sie ist der einzige Container ihrer Seite, das
Sinken lief also ins Leere, `data-folge` ebenso, und übrig blieb ein Knopf, der
3 bis 14 Haken auf einmal setzte. Wer sie wieder aufnimmt, nimmt das zurück.

Abgeschlossene Container sinken ans Ende ihrer Gruppe (das Elternelement,
also die `<section class="thema">`), untereinander in der Ursprungsordnung
aus `dataset.ordnung`. **Schritte sinken nicht** — ihre Reihenfolge ist die
Anleitung; genau deshalb liegt ihr Knopf in `schritteAktivieren` und nicht in
`vorgaengeAktivieren`. Ein Fach, in dem eines auf dem anderen aufbaut,
bekommt `data-folge` an der Section: dann ist nur der erste noch offene
Vorgang an der Reihe, die übrigen Knöpfe sind ausgegraut (`.gesperrt` +
`aria-disabled`, **nicht** `disabled` — ein `disabled`-Knopf feuert keinen
Klick, und die Meldung „Vorherigen Schritt abschließen" bliebe aus). Die
Sperre gilt auch für die Haken-Box daneben. Fertige sind nie gesperrt.
Ausgezeichnet ist derzeit kein Fach.

### Codeboxen

Standard sind **Befehle**: `hefter.js` zerlegt das `<pre>` in Zeilen und
hängt an jede Befehlszeile einen eigenen Kopier-Knopf (Kommentar- und
Leerzeilen bekommen keinen). Ein Knopf für den ganzen Block wäre eine Falle
— eingefügt liefe alles auf einmal durch, auch dort, wo erst ein Ergebnis zu
lesen ist.

- **Dateiinhalt** statt Befehlen: `data-typ="datei"` an der `.codebox` →
  ein Knopf für den ganzen Block.
- **Befehl über mehrere Zeilen** (Heredoc, `for`-Schleife,
  Backslash-Fortsetzung): in `<span class="befehl">…</span>` klammern, damit
  er als ein Befehl kopiert wird.
- Syntax-Färbung von Hand über `.tok-c` (Kommentar), `.tok-k`
  (Schlüsselwort/Option), `.tok-s` (String). Kein Highlighter zur Laufzeit.
- `<` `>` `&` im `<pre>` als Entity schreiben. Der Build löst Entities für
  das Register auf, `hefter.js` escaped beim Rendern wieder.

## hefter.js

Eine Datei, keine Module, läuft auf jeder Seite. Aufbau von oben nach unten:
generiertes `REGISTER`, `ICONS`, `BASIS`/`KEY`, Speicher-Helfer
(`gelesen`/`merken`/`neueId`), dann je ein Block pro Thema — Theme, Icons,
Ansicht, Anzeige je Baustein, Reparaturzweig, Bühne (Startseite), Leiste,
Kopieren, Checkliste, Vorgang abschließen, Sprungziel, Schritte, Fotos,
Stufenfilter, Weichen, Einstellungen, Start, Update-Fluss.

**Die Ansicht wird nicht hier bestimmt.** `ansichtBestimmen(wahl)` steht im
Inline-Script des Kopfes (`kopf()` in `bauen.mjs`), weil die Regel vor dem
ersten Anstrich laufen muss; `hefter.js` ruft dieselbe Funktion über
`window.ansichtBestimmen`, wenn sich das Fenster ändert. Eine Regel, eine
Stelle — wer sie anfasst, fasst sie dort an. Ein Wechsel meldet sich als
`hefter:ansicht` am `document`; daran hängen die Leiste (Schmal-Zustand,
Auszug) und `anzeigeAnwenden()`.

Jede Funktion prüft selbst, ob es auf dieser Seite etwas für sie zu tun gibt
(`if (!ziel) return;`) — deshalb kann die Startsequenz am Dateiende alle
Aktivierungen unbedingt aufrufen. Die Reihenfolge dort ist an vier Stellen
bedeutsam: `iconAnwenden` läuft **nach** `einstellungenAufbauen`, weil erst
dann die Icon-Karten existieren; `vorgaengeAktivieren` **nach**
`checklisteAktivieren` (erst dann stehen die gespeicherten Haken) und
**vor** `sprungzielAufklappen` (das Umsortieren verschiebt die Karten, ein
vorher angesprungenes Ziel läge danach falsch); `ansichtAufbauen` **nach**
`leisteAufbauen`, weil die Leiste sich dort an `hefter:ansicht` hängt und ein
Wechsel aus den Einstellungen sie sonst nicht erreichte; und `anzeigeAnwenden`
ganz am Ende, **nach** `reparaturAktivieren` und `anzeigeAufbauen` — es setzt
die Griffe am Reparaturzweig und zeichnet die Schalter, beides muss dafür
stehen. Ganz zum Schluss nimmt ein
`requestAnimationFrame` die Klasse `laedt` vom `<html>` — bis dahin sind
Übergänge aus, damit die gemerkte Leistenbreite nicht sichtbar einfährt.

Alles, was zu spät käme, steht im Inline-Script des generierten Kopfes: Theme,
**Ansicht**, Leisten-Zustand und die **ausgeblendeten Bausteine** aus
`localStorage`, sonst blitzen beim Laden das falsche Design, die falsche
Ansicht oder 96 Fotozonen auf. Wer eine weitere Einstellung ergänzt, die das
Layout vor dem ersten Anstrich betrifft, ergänzt sie **dort** (in `kopf()` in
`bauen.mjs`).

`localStorage` kann werfen (privater Modus, volles Kontingent) — Zugriffe
laufen deshalb über `gelesen`/`merken` mit `try`/`catch`, nie direkt.

Die Blöcke reden nur an einer Stelle miteinander: `checklisteAktivieren`
feuert nach jeder Änderung `hefter:haken` am `document`, daran hängen
Sortierung und Knopfzustände der Vorgänge. Ein Ereignis deckt alle Wege zum
Haken ab — Klick auf die Box, Abschluss-Knopf, „zurücksetzen". Wer einen
weiteren Weg ergänzt, ruft `aktualisieren()` und ist damit fertig.

## Speicherung

Alles lokal, kein Server, keine Konten. Schlüssel stehen gesammelt in `KEY`
(`hefter.js`):

| Was | Wo |
|---|---|
| Fotos | IndexedDB `hefter` → Store `fotos` (Blobs, Index `seite`, Zuordnung über `data-schritt`) |
| Checklisten-Haken | `hefter:checks:<seite>` |
| Erledigte Schritte | `hefter:schritte:<seite>` |
| Stufenfilter je Seite | `hefter:stufe:<seite>` |
| Weichen-Wahl | `hefter:weg:<seite>:<weiche>` |
| Design | `hefter:theme` |
| Ansicht (`auto`/`computer`/`ipad`/`iphone`) | `hefter:ansicht` (roher String wie `theme`, nicht über `merken`) |
| Ausgeblendete Bausteine | `hefter:anzeige` — je Ansicht die Liste der **abgeschalteten**; ein neuer Baustein ist damit überall an, ohne Migrationspfad |
| App-Icon | `hefter:icon` |
| Zustand der Leiste | `hefter:leiste` |
| Zuletzt geöffnete Seite | `hefter:zuletzt` |

Ein neues Schlüssel-Format braucht einen Migrationspfad (alte Werte beim
ersten Start einlesen, zusammenführen, danach nur noch neu schreiben) — wie
seinerzeit bei den Checklisten-Indizes und den Fotos aus `localStorage`.

## style.css

Ein Stylesheet, nach Bausteinen geordnet, mit Abschnitts-Kommentaren in
derselben Bannerform wie `hefter.js`. Oben stehen die selbst gehosteten
Schriften, dann die **Design-Tokens** (`--bg`, `--surface`, `--accent`,
`--text`, `--success`, `--warning`, `--danger`, …). Themes überschreiben
ausschließlich diese Werte: ein neues Theme ist ein weiterer
`[data-theme="…"]`-Block plus ein Knopf in `einstellungen.html`. Keine
Farbwerte direkt in Regeln schreiben.

Codeboxen bleiben in **jedem** Theme dunkel — das ist Absicht, keine
Nachlässigkeit.

Über das Layout entscheidet keine Media Query mehr, sondern
`data-ansicht="computer|ipad|iphone"` am `<html>`; die Media Queries in
`ansichtBestimmen()` liefern nur noch den Startwert. Neue Layout-Regeln hängen
sich deshalb an `:root[data-ansicht="…"]`, nicht an eine Breite. Zwei Media
Queries bleiben mit Absicht: `420px` für den Text im `.iconbtn` — die
beantwortet, ob er in die App-Bar passt, nicht welche Ansicht gilt — und
`prefers-reduced-motion`.

Ebenfalls am `<html>`: `ohne-fotos`, `ohne-info`, `ohne-begruendung` und
`ohne-reparatur` für die Anzeige je Baustein. Nur ausblenden, nie eine zweite
Darstellung — einzige Ausnahme ist der Reparaturzweig, dessen `.pr-kopf` als
Griff stehenbleibt.

## Service Worker & Updates

`sw.js` wird komplett generiert: Precache-Liste aus einem Verzeichnis-Scan
(`.html .css .js .webmanifest .svg .png .woff2`, ohne `sw.js` und
`bauen.mjs`), `VERSION` als SHA-256 über alle Inhalte. Jede Inhaltsänderung
ergibt automatisch eine neue Version — vorausgesetzt, der Build lief.

Strategie: Stale-while-revalidate. **Kein `skipWaiting` beim Install** — die
neue Version wartet, bis der Nutzer im Hinweis „Neue Version verfügbar"
zustimmt; erst dann `skipWaiting` und Reload. So treffen nie alte und neue
Dateien aufeinander. Beim Erstbesuch wird der erste `controllerchange`
bewusst ignoriert, sonst lüde jede Erstansicht doppelt.

## Lokal testen

```
python3 -m http.server        # → http://localhost:8000
```

Der Service Worker braucht `http`, `file://` genügt nicht. Beim Testen von
Änderungen: Hard-Reload oder in den DevTools den alten SW abmelden, sonst
sieht man den Cache-Stand. `python3 -m http.server` schickt kein `charset`
mit — deshalb muss `<meta charset="UTF-8">` die erste Zeile im `<head>`
bleiben, vor allen Umlauten in `description` und Metas.

Deployment: statisches Hosting (Netlify o. ä.), kein Build-Schritt auf dem
Server.

## Konventionen

- **Kommentare erklären das Warum**, nicht das Was — und besonders gern die
  Falle, die zur Lösung geführt hat („ohne diese Sperre lüde jede
  Erstansicht doppelt"). Der Bestand ist durchgehend so geschrieben; neue
  Kommentare halten diesen Ton und diese Dichte.
- Abschnitte in `hefter.js`, `bauen.mjs` und `style.css` mit
  `/* ===… TITEL ===… */`-Bannern trennen.
- Keine Abhängigkeiten hinzufügen — weder npm-Pakete noch CDN-Verweise.
  Schriften, Icons und alles Weitere liegen selbst gehostet im Repo, damit
  die App offline vollständig ist.
- Kein Framework, kein Bundler, kein Transpiler. Modernes ES (optional
  chaining, `?.`, `catch {}`) ist in Ordnung.
- Progressive Enhancement: Ohne JavaScript soll eine Seite lesbar bleiben —
  deshalb steht in einer Weiche genau ein Weg als `aktiv` in der Datei und
  klappen die `wz`-Karten über `<details>` auf.
- Barrierefreiheit mitschreiben: `aria-label` an Icon-Knöpfen,
  `aria-pressed` an Schritt-Haken, `aria-expanded` am Brenner-Knopf.
- **Commit-Nachrichten deutsch**, Betreff in der Form
  `Thema: was sich ändert` (z. B. „Startseite: wo du stehst statt zweites
  Register"). Der Rumpf erklärt die Begründung und nennt Fallen, die beim
  Umsetzen aufgefallen sind — in Prosa, Listen nur wo sie tragen.

## Fallen, die schon mehrfach zugeschlagen haben

- `node bauen.mjs` vergessen → Register/Precache/Version passen nicht zum
  Inhalt, und niemand bekommt ein Update.
- Im generierten Rahmen editiert → beim nächsten Build weg.
- `data-schritt`/`data-check`-ID beim Kopieren einer Vorlage stehengelassen
  → fremde Haken und Fotos wandern mit.
- Zähler im Kopf nicht nachgezogen → der Build meldet es, aber erst beim
  Lauf.
- Neue Seite nicht in `REIHENFOLGE` → Build bricht ab (Absicht).
- Farbe direkt statt über ein Token gesetzt → im hellen Theme falsch.
- Verweis auf einen `#anker`, der später umbenannt wurde → der Build fängt
  es, im Browser wäre es stumm.
- Eine neue Layout-Regel an eine Breite gehängt statt an `[data-ansicht]` →
  sie ignoriert die Wahl in den Einstellungen.
- Neuer Baustein in `BAUSTEINE` ergänzt, aber keine `ohne-…`-Regel in
  `style.css` → der Schalter steht da und tut nichts.

## Offene Punkte

Der `README.md` führt unter **„Geplant"** die verbliebenen größeren Vorhaben
(Speicherung bündeln als Voraussetzung für Backup/Export, Inhalte
zusammenführen statt kopieren) sowie kleinere Punkte: `.pruefblock` im Bestand
nachziehen, Übersicht „Firewall & Ports", weitere Anleitungen, Kategorien neu
schneiden, eine CI-Action, die `node bauen.mjs` erzwingt. **Nichts davon ist
umgesetzt** — dort nachsehen, bevor etwas Größeres angefangen wird.

Erledigt und deshalb aus „Geplant" heraus: die drei Ansichten samt
Einstellbarkeit und die Anzeige je Baustein (dort je Ansicht getrennt, nicht
geräteweit wie ursprünglich notiert).
