/* ============================================================
   HEFTER · gemeinsame App-Logik
   Neue Seite: HTML-Datei in /anleitungen (zum Durchlaufen) oder
   /nachschlagen (zum Nachschlagen) anlegen, dann node bauen.mjs.
   ============================================================ */

/* ---------- Register aller Seiten ----------
   GENERIERT aus den Seiten-HTMLs — nicht von Hand pflegen.
   Quelle je Seite: <h1> (Titel), .chip (Kategorie),
   meta hefter-untertitel, meta hefter-stichworte, Ordner (art).
   Nach Änderungen: node bauen.mjs ausführen. */
/* REGISTER-START */
const REGISTER = [
  {
    "id": "arbeitsplatz-einrichten",
    "art": "anleitung",
    "titel": "Arbeitsplatz einrichten",
    "kuerzel": "AP",
    "untertitel": "Windows · von Null bis arbeitsfähig, danach pro Projekt",
    "kategorie": "Arbeitsplatz",
    "datei": "anleitungen/arbeitsplatz-einrichten.html",
    "stichworte": "arbeitsplatz windows powershell winget scoop terminal profil git identitaet ssh schluessel github gh cli node fnm pnpm uv python docker wsl vscode ripgrep fzf just editorconfig prettier eslint nvmrc ci workflow neuer rechner onboarding",
    "schritte": 21,
    "checks": 6
  },
  {
    "id": "werkzeugkasten",
    "art": "uebersicht",
    "titel": "Werkzeugkasten",
    "kuerzel": "WK",
    "untertitel": "Fundament, Ausliefern, Prüfen, Beschleuniger — mit Einrichtung und Prüfschritt",
    "kategorie": "Arbeitsplatz",
    "datei": "nachschlagen/werkzeugkasten.html",
    "stichworte": "git gh vscode terminal powershell winget scoop node fnm pnpm uv python ssh docker actions netlify caddy systemd devtools curl bruno jq regex ripgrep fzf just bat eza prettier eslint editorconfig werkzeuge tooling",
    "schritte": 0,
    "checks": 25
  },
  {
    "id": "git-zugang-privat",
    "art": "anleitung",
    "titel": "Zugang zu privaten Repositories einrichten",
    "kuerzel": "GZ",
    "untertitel": "Browser-Login, Token oder SSH-Schlüssel",
    "kategorie": "Git",
    "datei": "anleitungen/git-zugang-privat.html",
    "stichworte": "github privat authentifizierung anmeldung token pat ssh schluessel login vscode zugriff credentials fine-grained",
    "schritte": 5,
    "checks": 3
  },
  {
    "id": "vscode-git-workflow",
    "art": "anleitung",
    "titel": "Repo in VS Code klonen & Änderungen hochladen",
    "kuerzel": "VG",
    "untertitel": "Klonen, committen, synchronisieren — UI und Terminal",
    "kategorie": "Git",
    "datei": "anleitungen/vscode-git-workflow.html",
    "stichworte": "vscode git clone commit push pull sync quellcodeverwaltung stagen repository workflow hochladen",
    "schritte": 5,
    "checks": 4
  },
  {
    "id": "git-ssd",
    "art": "anleitung",
    "titel": "Git von der portablen SSD nutzen",
    "kuerzel": "SD",
    "untertitel": "SSH-Schlüssel und Konfiguration unterwegs dabei",
    "kategorie": "Git",
    "datei": "anleitungen/git-ssd.html",
    "stichworte": "ssd portable ssh schluessel config git ssh command fremder rechner unterwegs stick mobil workflow",
    "schritte": 6,
    "checks": 5
  },
  {
    "id": "vscode-remote-ssh",
    "art": "anleitung",
    "titel": "VS Code mit dem Hetzner-Server verbinden",
    "kuerzel": "VR",
    "untertitel": "Windows · Remote-SSH, Ports, Dev Containers, Fehlersuche",
    "kategorie": "Werkzeuge",
    "datei": "anleitungen/vscode-remote-ssh.html",
    "stichworte": "vscode visual studio code remote ssh hetzner server verbinden editor extension config alias windows powershell icacls ssh-agent agent forwarding git github port weiterleitung forwarding dev container docker devcontainer vscode-server fehlersuche permission denied fail2ban",
    "schritte": 11,
    "checks": 8
  },
  {
    "id": "server-ersteinrichtung",
    "art": "anleitung",
    "titel": "Server-Erst-Einrichtung & Absicherung",
    "kuerzel": "SE",
    "untertitel": "Ubuntu 24.04 · Rollen, Schlüssel je Gerät, SSH-Härtung, UFW, fail2ban",
    "kategorie": "Server",
    "datei": "anleitungen/server-ersteinrichtung.html",
    "stichworte": "ubuntu hetzner server setup benutzer rollen admin dienstnutzer deploy sudo sudoers docker gruppe ssh schluessel ed25519 schluesselpaar authorized_keys mehrere geraete widerruf root passwort negativtest firewall ufw fail2ban ignoreip brute force absichern haertung port",
    "schritte": 11,
    "checks": 14
  },
  {
    "id": "schluesselverwaltung",
    "art": "uebersicht",
    "titel": "Schlüsselverwaltung",
    "kuerzel": "SK",
    "untertitel": "Schlüsselpaare, Ablage pro Nutzer, mehrere Geräte, Widerruf, Rechte",
    "kategorie": "Server",
    "datei": "nachschlagen/schluesselverwaltung.html",
    "stichworte": "ssh schluessel schluesselpaar ed25519 rsa passphrase ssh-agent authorized_keys fingerabdruck known_hosts rechte strictmodes rollen sudo sudoers docker gruppe geraete zweitgeraet widerruf aussperren sperren optionen command from restrict no-pty deploy permission denied publickey fehlersuche nachschlagen",
    "schritte": 0,
    "checks": 0
  },
  {
    "id": "docker-einrichtung",
    "art": "anleitung",
    "titel": "Docker einrichten & pro Repository integrieren",
    "kuerzel": "DO",
    "untertitel": "Engine, Compose, Dockerfile, Deploy-Anbindung",
    "kategorie": "Server",
    "datei": "anleitungen/docker-einrichtung.html",
    "stichworte": "docker compose container dockerfile image volume repo repository deploy ufw ports registry engine buildx",
    "schritte": 12,
    "checks": 8
  },
  {
    "id": "domain-einrichtung",
    "art": "anleitung",
    "titel": "Domain einrichten & per HTTPS ausliefern",
    "kuerzel": "DN",
    "untertitel": "Nameserver, A/AAAA-Records, Let's Encrypt",
    "kategorie": "Server",
    "datei": "anleitungen/domain-einrichtung.html",
    "stichworte": "domain dns nameserver a record aaaa cname ttl subdomain wildcard hetzner dns console registrar https tls ssl zertifikat lets encrypt certbot nginx traefik caa propagation dig weiterleitung",
    "schritte": 9,
    "checks": 7
  },
  {
    "id": "coolify-einrichtung",
    "art": "anleitung",
    "titel": "Coolify einrichten & Projekte ausrollen",
    "kuerzel": "CO",
    "untertitel": "Installation, GitHub-Anbindung, erste App",
    "kategorie": "Server",
    "datei": "anleitungen/coolify-einrichtung.html",
    "stichworte": "coolify paas self hosted docker traefik proxy deploy github app webhook auto deploy umgebungsvariablen env secrets domain buildpack nixpacks dockerfile compose dashboard port 8000 rollback persistent storage hetzner update",
    "schritte": 12,
    "checks": 10
  },
  {
    "id": "hetzner-deploy",
    "art": "anleitung",
    "titel": "Automatisches Deploy auf Hetzner per GitHub Actions",
    "kuerzel": "DP",
    "untertitel": "SSH-Deploy-Key, GitHub Secrets, deploy.yml",
    "kategorie": "Deployment",
    "datei": "anleitungen/hetzner-deploy.html",
    "stichworte": "ssh github actions hetzner deploy key secrets workflow ci cd",
    "schritte": 4,
    "checks": 5
  }
];
/* REGISTER-ENDE */

/* ---------- Icon-Katalog ---------- */
const ICONS = [
  { id: "01-ringe",   name: "Hefter-Ringe" },
  { id: "02-register",name: "Register-Reiter" },
  { id: "03-rail",    name: "Schritt-Rail" },
  { id: "04-haken",   name: "Blatt mit Haken" },
  { id: "05-lochung", name: "Lochung" },
  { id: "06-klammer", name: "Klammer & Rahmen" }
];
const ICON_STANDARD = "01-ringe";

/* Basis-Pfad relativ zur aktuellen Seite (Seiten in /anleitungen liegen eine Ebene tiefer) */
const BASIS = document.body.dataset.basis || "";

const KEY = {
  theme: "hefter:theme",
  icon: "hefter:icon",
  leiste: "hefter:leiste",
  zuletzt: "hefter:zuletzt",
  checks: id => "hefter:checks:" + id,
  schritte: id => "hefter:schritte:" + id,
  stufe: id => "hefter:stufe:" + id,
  ansicht: "hefter:ansicht",
  anzeige: "hefter:anzeige",
  weg: (seite, weiche) => "hefter:weg:" + seite + ":" + weiche,
  fotos: id => "hefter:fotos:" + id   /* nur noch für die Übernahme von Altbeständen */
};

/* localStorage kann werfen (privater Modus, volles Kontingent) und liefert
   beim ersten Besuch nichts — beides darf keine Seite lahmlegen. */
function gelesen(schluessel, ersatz) {
  try {
    const roh = localStorage.getItem(schluessel);
    return roh === null ? ersatz : JSON.parse(roh);
  } catch { return ersatz; }
}
/* Heißt bewusst nicht "gespeichert": so nennt checklisteAktivieren seine
   eigene Liste, und ein verdeckter Name ist beim Lesen eine Falle. */
function merken(schluessel, wert) {
  try { localStorage.setItem(schluessel, JSON.stringify(wert)); } catch {}
}

function neueId() {
  try { return crypto.randomUUID(); }
  catch { return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2); }
}

/* ============================================================
   THEME
   ============================================================ */
function themeSetzen(t, speichern = true) {
  document.documentElement.dataset.theme = t;
  if (speichern) { try { localStorage.setItem(KEY.theme, t); } catch {} }
  const meta = document.querySelector("meta[name=theme-color]");
  if (meta) meta.content = t === "hell" ? "#f4f6fa" : "#060709";
  /* Knopf benennt den aktiven Zustand, nicht das Ziel — deckt sich mit
     der aktiven Karte in den Einstellungen. Die Aktion steckt im
     aria-label, weil dieses den sichtbaren Text überschreibt. */
  document.querySelectorAll("[data-themebtn]").forEach(btn => {
    const lbl = btn.querySelector(".lbl"), ico = btn.querySelector("svg");
    if (lbl) lbl.textContent = t === "hell" ? "Hell" : "Dunkel";
    if (ico) ico.innerHTML = t === "hell"
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>'
      : '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>';
    btn.setAttribute("aria-label", t === "hell"
      ? "Design wechseln — aktuell Hell"
      : "Design wechseln — aktuell Dunkel");
  });
  document.querySelectorAll(".themewahl button").forEach(b => {
    b.classList.toggle("aktiv", b.dataset.t === t);
    b.setAttribute("aria-pressed", b.dataset.t === t);
  });
}
function themeLaden() {
  let t = "dunkel";
  try { t = localStorage.getItem(KEY.theme) || "dunkel"; } catch {}
  themeSetzen(t, false);
}
document.querySelectorAll("[data-themebtn]").forEach(btn =>
  btn.addEventListener("click", () =>
    themeSetzen(document.documentElement.dataset.theme === "hell" ? "dunkel" : "hell")));
document.querySelectorAll(".themewahl button").forEach(b =>
  b.addEventListener("click", () => themeSetzen(b.dataset.t)));

/* ============================================================
   APP-ICON
   Je Icon liegt eine statische Manifest-Datei bereit — der
   Wechsel hängt nur das href um. Hinweis: Der Homescreen
   installierter PWAs übernimmt einen Wechsel nicht zuverlässig
   (iOS: nie ohne Neu-Installation).
   ============================================================ */
function iconAktiv() {
  try { return localStorage.getItem(KEY.icon) || ICON_STANDARD; } catch { return ICON_STANDARD; }
}
function iconAnwenden(id, speichern = true) {
  if (speichern) { try { localStorage.setItem(KEY.icon, id); } catch {} }
  const fav = document.querySelector("link[rel=icon]");
  if (fav) fav.href = BASIS + "icons/" + id + ".svg";
  const apfel = document.querySelector("link[rel=apple-touch-icon]");
  if (apfel) apfel.href = BASIS + "icons/png/" + id + "-192.png";
  const manifest = document.querySelector("link[rel=manifest]");
  if (manifest) manifest.href = BASIS + "manifest-" + id + ".webmanifest";
  document.querySelectorAll("[data-appicon]").forEach(img => {
    img.src = BASIS + "icons/" + id + ".svg";
  });
  document.querySelectorAll(".iconkarte").forEach(k => {
    k.classList.toggle("aktiv", k.dataset.icon === id);
    k.setAttribute("aria-pressed", k.dataset.icon === id);
  });
}

/* ============================================================
   ANSICHT  (Computer · iPad · iPhone)
   Welche Ansicht gilt, entscheidet ansichtBestimmen() im Inline-
   Script des Kopfes — dort und nur dort, weil die Regel vor dem
   ersten Anstrich laufen muss (kopf() in bauen.mjs). Hier steht,
   was danach kommt: die Wahl speichern, das Fenster im Blick
   behalten, die Knöpfe der Einstellungsseite.
   Die Ansicht steht als data-ansicht am <html>; Media Queries
   liefern nur noch den Startwert, entscheiden aber nicht mehr
   über die Darstellung.
   ============================================================ */
const WURZEL_HTML = document.documentElement;

const ANSICHTEN = [
  { id: "auto", name: "Automatisch", ikone: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
  { id: "computer", name: "Computer", ikone: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
  { id: "ipad", name: "iPad", ikone: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>' },
  { id: "iphone", name: "iPhone", ikone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>' }
];

/* Fällt das Kopf-Script aus (Inline-Script verboten), bleibt "computer" —
   das ist die Darstellung des Stylesheets ohne jede Ansicht. */
const ansichtBestimmen = wahl => window.ansichtBestimmen?.(wahl) || "computer";
/* Roher String wie hefter:theme, nicht über merken() — das schriebe JSON,
   und das Kopf-Script liest hier ohne JSON.parse. */
const ansichtWahl = () => {
  try { return localStorage.getItem(KEY.ansicht) || "auto"; } catch { return "auto"; }
};
const ansichtAktiv = () => WURZEL_HTML.dataset.ansicht || "computer";

/* Rechnet die geltende Ansicht neu und meldet eine Änderung als
   hefter:ansicht am document — daran hängen Leiste und Anzeige. Ein
   Ereignis deckt alle Wege ab: Wahl in den Einstellungen, gedrehtes
   iPad, verkleinertes Fenster. */
function ansichtAnwenden() {
  const alt = WURZEL_HTML.dataset.ansicht;
  const neu = ansichtBestimmen(ansichtWahl());
  WURZEL_HTML.dataset.ansicht = neu;
  if (neu !== alt) {
    document.dispatchEvent(new CustomEvent("hefter:ansicht", { detail: neu }));
    /* Jede Ansicht hat ihren eigenen Satz ausgeblendeter Bausteine. */
    anzeigeAnwenden();
  }
  ansichtKnoepfe();
}

function ansichtWaehlen(wahl) {
  try { localStorage.setItem(KEY.ansicht, wahl); } catch {}
  ansichtAnwenden();
}

/* Beschriftet die Knöpfe: am "Automatisch"-Knopf steht, was gerade daraus
   wird. Und wenn der 640px-Boden eine Wahl überstimmt, steht das an der
   gewählten — sonst sähe es aus, als hätte der Knopf nicht gegriffen. */
function ansichtKnoepfe() {
  const wahl = ansichtWahl();
  const aktiv = ansichtAktiv();
  const name = id => ANSICHTEN.find(a => a.id === id)?.name || id;
  document.querySelectorAll("[data-ansichtwahl]").forEach(b => {
    const ich = b.dataset.ansichtwahl;
    b.classList.toggle("aktiv", ich === wahl);
    b.setAttribute("aria-pressed", String(ich === wahl));
    const dazu = b.querySelector(".dazu");
    if (!dazu) return;
    dazu.textContent =
      ich === "auto" ? "zurzeit " + name(ansichtBestimmen("auto"))
      : ich === wahl && ich !== aktiv ? "Fenster zu schmal — zurzeit " + name(aktiv)
      : "";
  });
}

function ansichtAufbauen() {
  const ziel = document.getElementById("ansichtWahl");
  if (!ziel) return;
  ziel.innerHTML = ANSICHTEN.map(a => `
    <button data-ansichtwahl="${a.id}">
      <span class="ikone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${a.ikone}</svg></span>
      <span class="name">${a.name}</span>
      <span class="dazu"></span>
    </button>`).join("");
  ziel.querySelectorAll("button").forEach(b =>
    b.addEventListener("click", () => ansichtWaehlen(b.dataset.ansichtwahl)));
  ansichtKnoepfe();
}

/* ============================================================
   ANZEIGE JE BAUSTEIN
   Wer eine Anleitung zum dritten Mal durchläuft, braucht die
   Begründungen nicht mehr — nur die Befehle. Je Baustein ein
   Schalter, und zwar je Ansicht getrennt: am Computer alles,
   auf dem Telefon nur das Nötige.
   Ausgeblendet wird über Klassen am <html> (ohne-…), wie der
   Stufenfilter über body.nur-wiederkehrend — keine zweite
   Darstellung, nur ausblenden. Gesetzt werden sie schon im
   Kopf-Script (kopf() in bauen.mjs), sonst blitzen 96 Fotozonen
   auf und verschwinden wieder.
   Was warnt, steht in keiner Liste: Gefahr, Achtung und Sicher
   lassen sich nicht abschalten. Sie warnen vor etwas, das sich
   nicht rückgängig machen lässt.
   ============================================================ */
const BAUSTEINE = [
  { id: "fotos", name: "Fotozonen",
    zweck: "Der Knopf „Foto anfügen“ unter jedem Schritt. Bereits angefügte Fotos bleiben gespeichert — sie werden nur nicht angezeigt." },
  { id: "info", name: "Info-Kästen",
    zweck: "Die blauen Kästen, die etwas erklären. Was warnt — Sicher, Achtung, Gefahr — bleibt immer stehen." },
  { id: "begruendung", name: "Begründungen und Soll-Ausgaben",
    zweck: "Wozu ein Werkzeug gut ist, und wie die Ausgabe eines Prüfbefehls aussehen soll." },
  { id: "reparatur", name: "Reparaturzweige",
    zweck: "Der Zweig „Stimmt nicht“ unter einer Prüfung. Seine Kopfzeile bleibt als Griff stehen und klappt ihn bei Bedarf wieder auf." }
];

const anzeigeAlle = () => gelesen(KEY.anzeige, {}) || {};
const anzeigeAus = ansicht => anzeigeAlle()[ansicht] || [];

/* Gespeichert wird, was aus ist — nicht, was an ist. Ein später ergänzter
   Baustein ist damit überall an, ohne dass ein Migrationspfad nötig wäre. */
function anzeigeSchalten(ansicht, id, an) {
  const alle = anzeigeAlle();
  const aus = new Set(alle[ansicht] || []);
  an ? aus.delete(id) : aus.add(id);
  alle[ansicht] = [...aus];
  merken(KEY.anzeige, alle);
  anzeigeAnwenden();
}

function anzeigeAnwenden() {
  const aus = anzeigeAus(ansichtAktiv());
  for (const b of BAUSTEINE) WURZEL_HTML.classList.toggle("ohne-" + b.id, aus.includes(b.id));
  reparaturGriffe();
  anzeigeZeichnen();
}

/* ---------- Einstellungsseite ---------- */
/* Für welche Ansicht die Schalter gerade gelten. Vorbelegt mit der aktiven,
   umschaltbar auf jede andere — so lässt sich das iPad vom Computer aus
   einrichten, wo man ohnehin gerade sitzt. */
let anzeigeReiter = null;

function anzeigeAufbauen() {
  const ziel = document.getElementById("anzeigeWahl");
  if (!ziel) return;
  anzeigeReiter = ansichtAktiv();
  const HAKEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>';
  ziel.innerHTML = `
    <div class="anzeige-reiter" role="group" aria-label="Ansicht wählen, für die die Schalter gelten">
      ${ANSICHTEN.filter(a => a.id !== "auto").map(a =>
        `<button data-anzeigereiter="${a.id}">${a.name}</button>`).join("")}
    </div>
    <p class="anzeige-hier"></p>
    ${BAUSTEINE.map(b => `
      <div class="schalter" data-baustein="${b.id}">
        <span class="box">${HAKEN}</span>
        <span class="lbl"><b>${b.name}</b><span class="zweck">${b.zweck}</span></span>
      </div>`).join("")}`;

  ziel.querySelectorAll("[data-anzeigereiter]").forEach(b =>
    b.addEventListener("click", () => { anzeigeReiter = b.dataset.anzeigereiter; anzeigeZeichnen(); }));

  /* Rolle, Fokus und Tastatur zentral nachgerüstet — wie bei den .check-Divs
     in checklisteAktivieren. Die Klasse heißt bewusst nicht .check: jene
     greift checklisteAktivieren ohne Einschränkung über die ganze Seite ab
     und machte aus den Einstellungen eine Checkliste. */
  ziel.querySelectorAll("[data-baustein]").forEach(s => {
    s.setAttribute("role", "checkbox");
    s.tabIndex = 0;
    const umschalten = () =>
      anzeigeSchalten(anzeigeReiter, s.dataset.baustein, !s.classList.contains("done"));
    s.addEventListener("click", umschalten);
    s.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); umschalten(); }
    });
  });
  anzeigeZeichnen();
}

function anzeigeZeichnen() {
  const ziel = document.getElementById("anzeigeWahl");
  if (!ziel || !anzeigeReiter) return;
  const aus = anzeigeAus(anzeigeReiter);
  const name = id => ANSICHTEN.find(a => a.id === id)?.name || id;

  ziel.querySelectorAll("[data-anzeigereiter]").forEach(b => {
    const ich = b.dataset.anzeigereiter === anzeigeReiter;
    b.classList.toggle("aktiv", ich);
    b.setAttribute("aria-pressed", String(ich));
  });
  ziel.querySelectorAll("[data-baustein]").forEach(s => {
    const an = !aus.includes(s.dataset.baustein);
    s.classList.toggle("done", an);
    s.setAttribute("aria-checked", String(an));
  });
  /* Ohne diesen Satz sähe es nach einem Fehler aus, wenn man die Schalter
     einer Ansicht umlegt und sich auf der Seite nichts rührt. */
  const hier = ziel.querySelector(".anzeige-hier");
  if (hier) hier.textContent = anzeigeReiter === ansichtAktiv()
    ? "Das ist die Ansicht, die du gerade siehst — Änderungen greifen sofort."
    : `Du siehst gerade die ${name(ansichtAktiv())}-Ansicht. Diese Schalter gelten für die ${name(anzeigeReiter)}-Ansicht.`;
}

/* ============================================================
   REPARATURZWEIG AUFKLAPPEN
   Der einzige Baustein, der nicht einfach verschwindet: ein
   weggeblendeter Reparaturweg ließe genau den stehen, der ihn
   braucht. Die Kopfzeile („Stimmt nicht") bleibt als Griff, der
   Rumpf klappt auf Klick auf. Der offene Zustand hängt am
   Element und wird nicht gespeichert — es ist ein Blick, kein
   Zustand, und beim nächsten Aufschlagen fängt man wieder
   sparsam an.
   ============================================================ */
function reparaturAktivieren() {
  for (const kopf of document.querySelectorAll(".reparatur > .pr-kopf")) {
    const umschalten = () => {
      /* Nur solange eingeklappt wird — sonst schaltete der Klick eine Klasse
         um, die niemand sieht, und aria-expanded löge über einen offenen Zweig. */
      if (!WURZEL_HTML.classList.contains("ohne-reparatur")) return;
      kopf.setAttribute("aria-expanded", String(kopf.parentElement.classList.toggle("offen")));
    };
    kopf.addEventListener("click", umschalten);
    kopf.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); umschalten(); }
    });
  }
}

/* Rolle und Tabstopp bekommt der Kopf nur, solange er wirklich ein Griff ist.
   Ständig gesetzt wären es auf arbeitsplatz-einrichten.html 21 zusätzliche
   Tabstopps, die nichts tun. */
function reparaturGriffe() {
  const griff = WURZEL_HTML.classList.contains("ohne-reparatur");
  for (const kopf of document.querySelectorAll(".reparatur > .pr-kopf")) {
    if (griff) {
      kopf.setAttribute("role", "button");
      kopf.tabIndex = 0;
      kopf.setAttribute("aria-expanded", String(kopf.parentElement.classList.contains("offen")));
    } else {
      kopf.removeAttribute("role");
      kopf.removeAttribute("tabindex");
      kopf.removeAttribute("aria-expanded");
    }
  }
}

/* ============================================================
   BÜHNE  (Startseite)
   Das Register selbst steht in der Leiste — die Startseite
   beantwortet stattdessen "wo stehe ich": zuletzt geöffnete
   Seite, angefangene Seiten, und darunter alle Seiten mit ihrem
   Stand. Diese Liste ist zugleich der vollständige Weg zu jeder
   Seite: in der iPhone-Ansicht ist die Leiste zugeklappt, und ohne sie
   liefe der Einstieg sonst ins Leere.
   ============================================================ */
function buehneAufbauen() {
  const ziel = document.getElementById("buehne");
  if (!ziel) return;
  /* Das REGISTER enthält Klartext (Build löst Entities auf) — beim
     Rendern per innerHTML muss deshalb hier escaped werden. */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const PFEIL = '<span class="pfeil"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>';

  const einheit = e => e.art === "uebersicht" ? "eingerichtet" : "Schritten";

  const stand = e => {
    const fs = fortschritt(e);
    if (!fs) return { text: e.untertitel, balken: "", angefangen: false, fertig: false };
    return {
      text: `${fs.erledigt} von ${fs.gesamt} ${einheit(e)}`,
      balken: `<span class="balken"><i style="width:${Math.round(fs.erledigt / fs.gesamt * 100)}%"></i></span>`,
      angefangen: fs.erledigt > 0 && fs.erledigt < fs.gesamt,
      fertig: fs.erledigt === fs.gesamt,
      offen: fs.gesamt - fs.erledigt
    };
  };

  const eintrag = e => {
    const s = stand(e);
    return `
      <a class="b-eintrag${s.fertig ? " fertig" : ""}" href="${e.datei}">
        <span class="kuerzel" aria-hidden="true">${esc(e.kuerzel)}</span>
        <span class="b-text">
          <span class="b-titel">${esc(e.titel)}</span>
          <span class="b-unter">${esc(e.untertitel)}</span>
          <span class="b-stand">${esc(s.text)}${s.balken}</span>
        </span>
        ${PFEIL}
      </a>`;
  };

  let html = "";

  /* ---- Weiterlesen ---- */
  const zuletzt = REGISTER.find(e => e.id === gelesen(KEY.zuletzt, null));
  if (zuletzt) {
    const s = stand(zuletzt);
    html += `
    <section class="b-teil">
      <h2>Weiterlesen</h2>
      <a class="b-weiter" href="${zuletzt.datei}">
        <span class="kuerzel" aria-hidden="true">${esc(zuletzt.kuerzel)}</span>
        <span class="b-text">
          <span class="b-titel">${esc(zuletzt.titel)}</span>
          <span class="b-unter">${esc(zuletzt.kategorie)} · ${esc(s.text)}</span>
          ${s.balken}
        </span>
        ${PFEIL}
      </a>
    </section>`;
  }

  /* ---- Angefangen ---- */
  const angefangen = REGISTER.filter(e => stand(e).angefangen && e.id !== zuletzt?.id);
  if (angefangen.length) {
    html += `
    <section class="b-teil">
      <h2>Angefangen</h2>
      <p class="b-sub">Hier bist du stehengeblieben.</p>
      ${angefangen.map(eintrag).join("")}
    </section>`;
  }

  /* ---- Alle Seiten, nach Fächern ---- */
  const faecher = [];
  for (const e of REGISTER) {
    let f = faecher.find(x => x.name === e.kategorie);
    if (!f) faecher.push(f = { name: e.kategorie, seiten: [] });
    f.seiten.push(e);
  }
  html += `
    <section class="b-teil">
      <h2>Alle Seiten</h2>
      ${faecher.map(f => `
      <div class="b-fach">
        <h3>${esc(f.name)}</h3>
        ${f.seiten.map(eintrag).join("")}
      </div>`).join("")}
    </section>`;

  ziel.innerHTML = html;
}

/* Jede Seite meldet sich als zuletzt geöffnete — das speist "Weiterlesen"
   auf der Startseite. Register und Einstellungen haben kein data-seite und
   überschreiben den Stand deshalb nicht. */
function zuletztMerken() {
  const seite = document.body.dataset.seite;
  if (seite) merken(KEY.zuletzt, seite);
}

/* ============================================================
   SEITENLEISTE  (Register auf jeder Seite)
   Fächer sind die Kategorien, in der Reihenfolge, die bauen.mjs
   festlegt. Der Zustand — eingeklappt, welche Fächer zu — liegt
   unter hefter:leiste und wird schon im <head> gelesen, damit die
   Leiste nicht in ihrer gemerkten Breite aufblitzt.
   ============================================================ */

/* Nenner des Fortschritts: eine Anleitung zählt ihre Schritte, eine
   Übersicht ihre Haken. Ein entfernter Punkt kann in der Speicherung
   zurückbleiben, deshalb wird der Anteil gedeckelt. */
function fortschritt(e) {
  const uebersicht = e.art === "uebersicht";
  const gesamt = uebersicht ? e.checks : e.schritte;
  if (!gesamt) return null;
  const erledigt = (gelesen(uebersicht ? KEY.checks(e.id) : KEY.schritte(e.id), []) || []).length;
  return { erledigt: Math.min(erledigt, gesamt), gesamt };
}

function leisteAufbauen() {
  const ziel = document.getElementById("leisteRegister");
  if (!ziel) return;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const hier = document.body.dataset.seite || "";
  const feld = document.getElementById("leisteSuche");
  const leer = document.getElementById("leisteLeer");
  const schleier = document.querySelector("[data-schleier]");
  const gespeichert = gelesen(KEY.leiste, {}) || {};
  const zustand = Object.assign({ zu: [] }, gespeichert);
  /* Ob der Nutzer die Breite je selbst gesetzt hat. Ohne diese Unterscheidung
     ließe sich die Vorgabe je Ansicht nicht von einer Wahl trennen: ein
     gespeichertes false sähe aus wie "nie angefasst". */
  let breiteGewaehlt = "schmal" in gespeichert;
  /* Vorgabe je Ansicht — auf dem iPad ist die Kürzelspalte der Normalzustand,
     am Computer die breite Leiste. Dieselbe Regel steht im Kopf-Script,
     damit die Leiste nicht in der falschen Breite aufblitzt. */
  if (!breiteGewaehlt) zustand.schmal = ansichtAktiv() === "ipad";
  /* Solange die Breite nicht selbst gesetzt wurde, wandert sie auch nicht in
     den Speicher — sonst schriebe schon das Zuklappen eines Fachs die
     Vorgabe fest, und der Wechsel auf das iPad fände eine "Wahl" vor. */
  const zustandMerken = () =>
    merken(KEY.leiste, breiteGewaehlt ? zustand : { zu: zustand.zu });
  let suchtext = "";

  /* Fächer in der Reihenfolge ihres ersten Auftretens im REGISTER —
     die Leseordnung steckt schon in der Sortierung von bauen.mjs. */
  const faecher = [];
  for (const e of REGISTER) {
    let f = faecher.find(x => x.name === e.kategorie);
    if (!f) faecher.push(f = { name: e.kategorie, seiten: [] });
    f.seiten.push(e);
  }

  const passt = e => !suchtext ||
    (e.titel + " " + e.untertitel + " " + e.kategorie + " " + e.stichworte).toLowerCase().includes(suchtext);

  const eintrag = e => {
    const aktiv = e.id === hier;
    const fs = fortschritt(e);
    return `
      <a class="l-eintrag${aktiv ? " aktiv" : ""}" href="${BASIS}${e.datei}"${aktiv ? ' aria-current="page"' : ""}>
        <span class="kuerzel" aria-hidden="true">${esc(e.kuerzel)}</span>
        <span class="e-text">
          <span class="e-titel">${esc(e.titel)}</span>
          <span class="e-unten">
            <span class="typ">${e.art === "uebersicht" ? "Nachschlagen" : "Durchlaufen"}</span>
            ${fs ? `<span class="mini" title="${fs.erledigt} von ${fs.gesamt}"><i style="width:${Math.round(fs.erledigt / fs.gesamt * 100)}%"></i></span>` : ""}
          </span>
        </span>
        <span class="blase">${esc(e.titel)}</span>
      </a>`;
  };

  function zeichnen() {
    let html = "";
    let treffer = 0;
    for (const f of faecher) {
      const seiten = f.seiten.filter(passt);
      if (!seiten.length) continue;
      treffer += seiten.length;
      /* Während gesucht wird, sind alle Fächer offen — sonst bliebe ein
         Treffer in einem zugeklappten Fach unsichtbar. */
      const zu = !suchtext && zustand.zu.includes(f.name);
      html += `
        <div class="fach${zu ? " zu" : ""}">
          <button class="fach-kopf" data-fach="${esc(f.name)}" aria-expanded="${!zu}">
            <svg class="pfeil" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            <span class="name">${esc(f.name)}</span>
            <span class="anz">${seiten.length}</span>
          </button>
          <div class="fach-inhalt">${seiten.map(eintrag).join("")}</div>
        </div>`;
    }
    ziel.innerHTML = html;
    if (leer) leer.style.display = treffer ? "none" : "block";
  }

  /* ---- Zustand ---- */
  const schmalSetzen = (an, speichern = true) => {
    zustand.schmal = an;
    /* In der iPhone-Ansicht gibt es den Schmal-Zustand nicht — dort ist die
       Leiste entweder ganz da oder ganz weg. Gemerkt wird die Wahl trotzdem:
       sie gilt wieder, sobald man am Computer sitzt. Weil die Klasse hier
       gar nicht erst gesetzt wird, braucht style.css kein !important dagegen. */
    WURZEL_HTML.classList.toggle("schmal", an && ansichtAktiv() !== "iphone");
    const knopf = document.querySelector("[data-klapp]");
    if (knopf) knopf.setAttribute("aria-label", an ? "Leiste ausklappen" : "Leiste einklappen");
    if (speichern) { breiteGewaehlt = true; zustandMerken(); }
  };
  const istSchmalerSchirm = () => ansichtAktiv() === "iphone";
  const auszugSetzen = an => {
    WURZEL_HTML.classList.toggle("auf", an);
    const brenner = document.querySelector("[data-brenner]");
    if (brenner) brenner.setAttribute("aria-expanded", String(an));
  };

  /* Auf dem Telefon klappt derselbe Knopf den Auszug auf statt die Breite
     umzustellen — dort gibt es den Schmal-Zustand nicht. */
  const umschalten = () => istSchmalerSchirm()
    ? auszugSetzen(!WURZEL_HTML.classList.contains("auf"))
    : schmalSetzen(!zustand.schmal);

  schmalSetzen(zustand.schmal, false);
  zeichnen();

  /* ---- Ereignisse ---- */
  document.querySelector("[data-klapp]")?.addEventListener("click", umschalten);
  document.querySelector("[data-brenner]")?.addEventListener("click", umschalten);
  schleier?.addEventListener("click", () => auszugSetzen(false));

  /* Die Lupe im Schmal-Zustand klappt erst auf und setzt dann den Fokus —
     ins ausgeblendete Feld zu springen brächte nichts. */
  document.querySelector("[data-lupe]")?.addEventListener("click", () => {
    schmalSetzen(false);
    feld?.focus();
  });

  ziel.addEventListener("click", e => {
    const kopf = e.target.closest("[data-fach]");
    if (!kopf) return;
    const name = kopf.dataset.fach;
    const i = zustand.zu.indexOf(name);
    i === -1 ? zustand.zu.push(name) : zustand.zu.splice(i, 1);
    zustandMerken();
    zeichnen();
  });

  feld?.addEventListener("input", () => { suchtext = feld.value.trim().toLowerCase(); zeichnen(); });

  /* Die Sprechblase steht fest im Bild (siehe .blase in style.css) — ihre
     Höhe muss deshalb beim Überfahren gesetzt werden. Nur im Schmal-Zustand
     nötig, sonst steht der Titel ohnehin daneben. */
  const blaseSetzen = ev => {
    if (!WURZEL_HTML.classList.contains("schmal")) return;
    const eintrag = ev.target.closest(".l-eintrag, .f-btn");
    const blase = eintrag?.querySelector(".blase");
    if (!blase) return;
    const kasten = eintrag.getBoundingClientRect();
    blase.style.top = Math.round(kasten.top + kasten.height / 2) + "px";
  };
  for (const bereich of [ziel, document.querySelector(".l-fuss")]) {
    bereich?.addEventListener("mouseover", blaseSetzen);
    bereich?.addEventListener("focusin", blaseSetzen);
  }

  addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") { e.preventDefault(); umschalten(); return; }
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") ||
        (e.key === "/" && document.activeElement !== feld && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName))) {
      e.preventDefault();
      if (istSchmalerSchirm()) auszugSetzen(true); else schmalSetzen(false);
      feld?.focus(); feld?.select();
      return;
    }
    if (e.key === "Escape") {
      if (WURZEL_HTML.classList.contains("auf")) auszugSetzen(false);
      else if (document.activeElement === feld && feld.value) { feld.value = ""; suchtext = ""; zeichnen(); }
    }
  });

  /* Gedrehtes iPad, verkleinertes Fenster: bei "Automatisch" kann sich damit
     die Ansicht ändern, und der 640px-Boden greift auch bei fester Wahl. */
  addEventListener("resize", ansichtAnwenden);

  /* Was am Ansichtswechsel hängt. Der Auszug hat außerhalb der iPhone-Ansicht
     keine Entsprechung und bliebe sonst als Schleier über der Seite liegen;
     der Schmal-Zustand gilt nur, wo es ihn gibt, und bekommt seine Vorgabe
     neu, solange die Breite nicht selbst gesetzt wurde. */
  document.addEventListener("hefter:ansicht", () => {
    if (!breiteGewaehlt) zustand.schmal = ansichtAktiv() === "ipad";
    schmalSetzen(zustand.schmal, false);
    if (!istSchmalerSchirm()) auszugSetzen(false);
  });

  /* Brotkrume im Inhalts-Kopf */
  const krumen = document.querySelector("[data-krumen]");
  if (krumen) {
    const e = REGISTER.find(x => x.id === hier);
    krumen.innerHTML = e
      ? esc(e.kategorie) + " <b>/</b> " + esc(e.titel)
      : esc(document.querySelector("h1")?.textContent.trim() || "Hefter");
  }
}

/* ============================================================
   KOPIEREN
   Zwei Arten von Codeboxen:

   Befehle (Standard)   je Befehlszeile ein eigener Knopf.
                        Ein Knopf über dem ganzen Block wäre eine
                        Falle: eingefügt läuft alles auf einmal
                        durch — auch dort, wo das Ergebnis eines
                        Befehls erst gelesen werden muss (sshd -t,
                        nginx -t) oder wo ein Skript vor dem
                        Ausführen angesehen werden soll.
   data-typ="datei"     Dateiinhalt, gehört als Ganzes kopiert —
                        behält den Knopf im Kopf der Box.
   ============================================================ */
const KOPIE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>';
const HAKEN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="15" height="15"><path d="M20 6L9 17l-5-5"/></svg>';

/* Zerlegt den <pre>-Inhalt in Zeilen — auf Knotenebene, damit die
   tok-Spans erhalten bleiben. Ein <span class="befehl"> gilt als
   eine einzige Zeile, auch wenn es mehrere umfasst: so bleiben
   Heredocs, for-Schleifen und Backslash-Fortsetzungen zusammen. */
function inZeilenZerlegen(pre) {
  const zeilen = [[]];
  for (const knoten of [...pre.childNodes]) {
    if (knoten.nodeType === 1 && knoten.classList.contains("befehl")) {
      /* Der Befehl belegt seine Zeilen allein. Danach wird bewusst keine
         neue Zeile begonnen — den Umbruch bringt der folgende Textknoten
         schon mit, sonst entstünde eine Leerzeile zu viel. */
      if (zeilen.at(-1).length) zeilen.push([]);
      zeilen[zeilen.length - 1] = [knoten];
      continue;
    }
    if (knoten.nodeType === 3) {
      const teile = knoten.data.split("\n");
      teile.forEach((t, i) => {
        if (i) zeilen.push([]);
        if (t) zeilen.at(-1).push(document.createTextNode(t));
      });
      continue;
    }
    zeilen.at(-1).push(knoten);
  }
  return zeilen;
}

/* Was kopiert wird: der Zeilentext ohne angehängten Kommentar —
   "docker compose ps   # Zustand" ergibt "docker compose ps". */
function befehlstext(zeile) {
  const klon = zeile.cloneNode(true);
  const letztes = klon.lastElementChild;
  if (letztes && letztes.classList.contains("tok-c")) letztes.remove();
  return klon.textContent.replace(/\s+$/, "");
}

function rueckmeldung(btn, inhalt) {
  btn.innerHTML = HAKEN_ICON;
  btn.classList.add("ok");
  setTimeout(() => { btn.innerHTML = inhalt; btn.classList.remove("ok"); }, 1400);
}

async function inZwischenablage(text) {
  try { await navigator.clipboard.writeText(text); } catch {}
}

function befehlsboxAufbauen(box) {
  const pre = box.querySelector("pre");
  if (!pre) return;

  const zeilen = inZeilenZerlegen(pre);
  pre.textContent = "";
  pre.classList.add("befehle");

  for (const knoten of zeilen) {
    const zeile = document.createElement("div");
    zeile.className = "zeile";
    const code = document.createElement("span");
    code.className = "zeile-code";
    knoten.forEach(k => code.appendChild(k));
    zeile.appendChild(code);

    const text = code.textContent;
    const istBefehl = knoten.some(k => k.nodeType === 1 && k.classList?.contains("befehl"))
      || (text.trim() !== "" && !/^\s*[#;]/.test(text));

    if (istBefehl) {
      const btn = document.createElement("button");
      btn.className = "befehlbtn";
      btn.innerHTML = KOPIE_ICON;
      btn.setAttribute("aria-label", "Befehl kopieren");
      btn.title = "Diesen Befehl kopieren";
      btn.addEventListener("click", async () => {
        await inZwischenablage(befehlstext(code));
        rueckmeldung(btn, KOPIE_ICON);
      });
      zeile.appendChild(btn);
    }
    pre.appendChild(zeile);
  }

  /* Der Block-Knopf würde genau das erlauben, was hier verhindert
     werden soll — er verschwindet, die Beschriftung bleibt. */
  box.querySelector(".codebox-head .copybtn")?.remove();
}

function kopierenAktivieren() {
  document.querySelectorAll(".codebox:not([data-typ='datei'])").forEach(befehlsboxAufbauen);

  /* Bleibt für Dateiinhalte: dort gehört der ganze Block in die
     Zwischenablage. */
  document.querySelectorAll(".copybtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      await inZwischenablage(btn.closest(".codebox").querySelector("pre").innerText);
      btn.textContent = "Kopiert"; btn.classList.add("ok");
      setTimeout(() => { btn.textContent = "Kopieren"; btn.classList.remove("ok"); }, 1400);
    });
  });
}

/* ============================================================
   CHECKLISTE
   Fortschritt hängt an data-check-IDs — Umsortieren oder
   Einfügen von Punkten verschiebt keine Haken mehr.
   ============================================================ */
function checklisteAktivieren() {
  const seite = document.body.dataset.seite;
  const checks = [...document.querySelectorAll(".check")];
  if (!checks.length) return;
  const stand = document.getElementById("chkStand");

  let gespeichert = [];
  if (seite) { try { gespeichert = JSON.parse(localStorage.getItem(KEY.checks(seite)) || "[]"); } catch {} }
  /* Altbestand: früher wurden Positions-Indizes gespeichert — einmalig auf IDs heben */
  if (gespeichert.some(x => typeof x === "number")) {
    gespeichert = gespeichert.map(i => checks[i]?.dataset.check).filter(Boolean);
  }
  checks.forEach(c => { if (gespeichert.includes(c.dataset.check)) c.classList.add("done"); });

  /* Anleitungen haben beides: Schritt-Haken und eine Abschluss-Checkliste.
     Der Balken im Kopf gehört dort den Schritten — deshalb hat jeder seine
     eigene Marke, sonst überschrieben sich die beiden gegenseitig. */
  const balken = document.querySelector("[data-haken-balken]");

  const aktualisieren = () => {
    checks.forEach(c => c.setAttribute("aria-checked", c.classList.contains("done")));
    const fertig = checks.filter(c => c.classList.contains("done"));
    if (stand) stand.textContent = fertig.length + " / " + checks.length;
    if (balken) balken.style.width = (fertig.length / checks.length * 100) + "%";
    if (seite) {
      const done = fertig.map(c => c.dataset.check).filter(Boolean);
      try { localStorage.setItem(KEY.checks(seite), JSON.stringify(done)); } catch {}
    }
    /* Sortierung und Knopfzustände der Vorgänge hängen sich hier an. Ein
       Ereignis deckt alle drei Wege zum Haken gemeinsam ab: Klick auf die
       Box, Abschluss-Knopf und "zurücksetzen". */
    document.dispatchEvent(new CustomEvent("hefter:haken"));
  };

  document.querySelector("[data-haken-reset]")?.addEventListener("click", () => {
    checks.forEach(c => c.classList.remove("done"));
    aktualisieren();
  });
  /* Die Häkchen sind <div>s — Rolle, Fokus und Tastatur werden hier
     zentral nachgerüstet, damit die Anleitungs-HTMLs schlicht bleiben. */
  if (stand) stand.setAttribute("aria-live", "polite");
  checks.forEach(c => {
    c.setAttribute("role", "checkbox");
    c.tabIndex = 0;
    /* In einem Folge-Fach lässt sich der Haken so wenig setzen wie der
       Abschluss-Knopf — sonst wäre die Reihenfolge mit einem Klick auf die
       Box daneben umgangen. */
    const umschalten = () => {
      if (vorgangSperrtKlick(c)) return;
      c.classList.toggle("done");
      aktualisieren();
    };
    c.addEventListener("click", umschalten);
    c.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); umschalten(); }
    });
  });
  aktualisieren();
}

/* ============================================================
   VORGANG ABSCHLIESSEN
   Ein Container mit eigenem Haken beschreibt einen Vorgang: die
   Werkzeug-Karte einen einzurichtenden Posten, die Abschluss-
   Checkliste den Rest einer Anleitung. Sein Haken saß bisher
   allein oben an der Karte — also genau dort nicht, wo man mit
   dem Vorgang fertig wird. Der Knopf steht deshalb unten rechts
   am Ende des Inhalts, und Abgeschlossenes sinkt ans Ende seines
   Fachs: oben steht, was noch offen ist.
   Erzeugt statt in den Seiten gepflegt — derselbe Weg wie bei den
   Kopier-Knöpfen der Codeboxen.
   ============================================================ */

/* Container mit eigenem Vorgang: die Werkzeug-Karte (ein Haken) und die
   Abschluss-Checkliste einer Anleitung (mehrere Haken, ein Vorgang). Eine
   Liste an einer Stelle statt "alles, was einen .check enthält" — sonst
   entschiede die Verschachtelung des Markups darüber mit. */
const VORGANG = ".wz, .checkliste";

const hakenVon = container => [...container.querySelectorAll(".check")];
const istFertig = container => {
  const haken = hakenVon(container);
  return haken.length > 0 && haken.every(h => h.classList.contains("done"));
};
const containerIn = gruppe => [...gruppe.children].filter(k => k.matches(VORGANG));

/* Sortiert wird nach der Ursprungsordnung, nicht nach der aktuellen: sonst
   wäre nach dem ersten Umsortieren nicht mehr zu ermitteln, wohin ein wieder
   geöffneter Vorgang zurückgehört. */
const nachOrdnung = (a, b) => a.dataset.ordnung - b.dataset.ordnung;
const sinken = (a, b) =>
  (istFertig(a) ? 1 : 0) - (istFertig(b) ? 1 : 0) || nachOrdnung(a, b);

/* In einem Fach mit data-folge ist nur der erste noch offene Vorgang an der
   Reihe — die übrigen warten. */
const aktuellerVorgang = gruppe =>
  containerIn(gruppe).sort(nachOrdnung).find(k => !istFertig(k)) || null;

function vorgangGesperrt(container) {
  const gruppe = container.parentElement;
  if (!gruppe?.hasAttribute("data-folge")) return false;
  /* Fertige sind nie gesperrt — sonst gäbe es keinen Weg zurück. */
  if (istFertig(container)) return false;
  return container !== aktuellerVorgang(gruppe);
}

/* Der Zeitgeber hängt am Feld statt an einer Variablen: zwei Container können
   ihre Meldung gleichzeitig stehen haben. */
const hinweisUhr = new WeakMap();
function hinweisZeigen(container, text) {
  const feld = container.querySelector(".abschluss-hinweis");
  if (!feld) return;
  feld.textContent = text;
  feld.classList.add("sichtbar");
  clearTimeout(hinweisUhr.get(feld));
  hinweisUhr.set(feld, setTimeout(() => {
    feld.classList.remove("sichtbar");
    feld.textContent = "";
  }, 2200));
}

/* Ein gesperrter Vorgang meldet sich, statt still nichts zu tun — ein Haken,
   der sich wortlos nicht setzen lässt, sieht kaputt aus. Beide Wege fragen
   hier: der Abschluss-Knopf und die Haken-Box in checklisteAktivieren. */
function vorgangSperrtKlick(el) {
  const container = el.closest(VORGANG);
  if (!container || !vorgangGesperrt(container)) return false;
  hinweisZeigen(container, "Vorherigen Schritt abschließen");
  return true;
}

function vorgaengeAktivieren() {
  const alle = [...document.querySelectorAll(VORGANG)].filter(c => hakenVon(c).length);
  if (!alle.length) return;

  const gruppen = [...new Set(alle.map(c => c.parentElement))];
  gruppen.forEach(g => containerIn(g).forEach((k, i) => { k.dataset.ordnung = i; }));

  const knopfAnlegen = container => {
    const platz = document.createElement("div");
    platz.className = "abschluss";
    platz.innerHTML =
      '<span class="abschluss-hinweis" role="status"></span>' +
      '<button class="iconbtn abschlussbtn" type="button" aria-pressed="false">' +
      `<span class="haken">${HAKEN_ICON}</span>Vorgang abgeschlossen</button>`;
    /* Bei der Karte in den aufklappbaren Rumpf — damit steht der Knopf ohne
       eigene Regel nur im aufgeklappten Zustand da. Ans Ende, nicht unter die
       Schrittliste: abgeschlossen ist der Vorgang erst, wenn auch der
       Prüfblock darunter stimmt. */
    (container.querySelector(".wz-inhalt") || container).appendChild(platz);

    const btn = platz.querySelector(".abschlussbtn");
    btn.addEventListener("click", () => {
      if (vorgangSperrtKlick(btn)) return;
      const ziel = !istFertig(container);
      /* Gesetzt wird über die Haken selbst: Speichern, Zähler und der Balken
         in der Leiste hängen an checklisteAktivieren. Ein zweiter Pfad dorthin
         liefe beim ersten Nachziehen auseinander. */
      hakenVon(container).forEach(h => {
        if (h.classList.contains("done") !== ziel) h.click();
      });
    });
  };

  /* Nur der Container, dessen Zustand gerade gewechselt hat, wird am neuen
     Platz kurz angedeutet. Alle mitverschobenen zu animieren brächte das
     ganze Fach in Bewegung — man sähe nicht mehr, worauf zu achten ist.
     Hier statt im Knopf, weil derselbe Wechsel auch über die Haken-Box
     kommt — sonst klappte die Karte nur auf dem einen der beiden Wege zu. */
  const zustandNachziehen = container => {
    const jetzt = istFertig(container) ? "ja" : "nein";
    if (container.dataset.fertig === jetzt) return;
    container.dataset.fertig = jetzt;
    container.classList.add("gesetzt");
    setTimeout(() => container.classList.remove("gesetzt"), 400);
    /* Abgeschlossen heißt zugeklappt: die Karte rutscht ans Ende ihres
       Fachs, und aufgeklappt wäre sie dort nur eine lange Fläche. */
    const klapp = container.querySelector("details");
    if (klapp && jetzt === "ja") klapp.open = false;
  };

  const knoepfeSetzen = () => {
    alle.forEach(container => {
      const btn = container.querySelector(".abschlussbtn");
      if (!btn) return;
      const fertig = istFertig(container);
      btn.setAttribute("aria-pressed", fertig);
      btn.classList.toggle("primary", fertig);
      /* Gesperrt wird über eine Klasse, nicht über disabled: ein disabled-
         Knopf feuert keinen Klick, und die Meldung bliebe aus. */
      const gesperrt = vorgangGesperrt(container);
      btn.classList.toggle("gesperrt", gesperrt);
      if (gesperrt) btn.setAttribute("aria-disabled", "true");
      else btn.removeAttribute("aria-disabled");
    });
  };

  const ordnen = () => {
    for (const gruppe of gruppen) {
      const karten = containerIn(gruppe);
      if (karten.length > 1) {
        /* Vor den Knoten nach der letzten Karte hängen statt ans Ende der
           Gruppe: sonst wanderte ein Absatz, der einmal unter den Karten
           steht, still über sie. */
        const nachbar = karten[karten.length - 1].nextSibling;
        [...karten].sort(sinken).forEach(k => gruppe.insertBefore(k, nachbar));
      }
      karten.forEach(zustandNachziehen);
    }
    knoepfeSetzen();
  };

  /* Erst den Zustand festhalten, dann die Knöpfe: sonst zappelten beim Laden
     alle schon erledigten Container einmal durch. */
  alle.forEach(container => {
    container.dataset.fertig = istFertig(container) ? "ja" : "nein";
    knopfAnlegen(container);
  });

  document.addEventListener("hefter:haken", ordnen);
  ordnen();
}

/* ============================================================
   KARTE AUFKLAPPEN, WENN MAN AUF SIE SPRINGT
   Ein Info-Symbol aus einer Anleitung zeigt auf #wz-git. Ohne das
   hier landete man auf einer zugeklappten Karte und müsste noch
   einmal tippen, um das zu sehen, weswegen man gekommen ist.
   ============================================================ */
function sprungzielAufklappen() {
  const oeffnen = () => {
    if (!location.hash) return;
    /* Ein Hash muss kein gültiger Selektor sein — querySelector wirft dann. */
    let ziel = null;
    try { ziel = document.querySelector(location.hash); } catch { return; }
    if (!ziel) return;
    const klapp = ziel.matches("details") ? ziel : ziel.querySelector("details");
    if (!klapp) return;
    klapp.open = true;
    /* Nach dem Aufklappen wächst die Karte — der Browser hat da schon
       gescrollt, also noch einmal nachziehen. */
    ziel.scrollIntoView({ block: "start" });
  };
  addEventListener("hashchange", oeffnen);
  oeffnen();
}

/* ============================================================
   SCHRITT-HAKEN
   Die Schrittnummer ist zugleich der Haken — man markiert dort,
   wo man gerade steht, statt am Seitenende in einer Liste. Die
   Abschluss-Checkliste bleibt daneben: sie hakt Ergebnisse ab,
   nicht Handgriffe.
   Gezählt werden immer alle Schritte der Seite, auch die vom
   Stufenfilter ausgeblendeten — sonst spränge die Zahl beim
   Umschalten des Filters, ohne dass sich etwas getan hätte.
   ============================================================ */
function schritteAktivieren() {
  const schritte = [...document.querySelectorAll(".step[data-schritt]")];
  if (!schritte.length) return;
  const seite = document.body.dataset.seite;
  const zahl = document.querySelector("[data-fs-zahl]");
  const balken = document.querySelector("[data-fs-balken]");

  const erledigt = new Set(gelesen(KEY.schritte(seite), []) || []);

  const anzeigen = () => {
    let fertig = 0;
    for (const s of schritte) {
      const an = erledigt.has(s.dataset.schritt);
      if (an) fertig++;
      s.classList.toggle("erledigt", an);
      s.querySelector(".step-num")?.setAttribute("aria-pressed", String(an));
    }
    if (zahl) zahl.textContent = fertig + " / " + schritte.length;
    if (balken) balken.style.width = (fertig / schritte.length * 100) + "%";
  };

  for (const s of schritte) {
    s.querySelector(".step-num")?.addEventListener("click", () => {
      const id = s.dataset.schritt;
      erledigt.has(id) ? erledigt.delete(id) : erledigt.add(id);
      if (seite) merken(KEY.schritte(seite), [...erledigt]);
      anzeigen();
    });
  }

  document.querySelector("[data-fs-reset]")?.addEventListener("click", () => {
    erledigt.clear();
    if (seite) merken(KEY.schritte(seite), []);
    anzeigen();
  });

  if (zahl) zahl.setAttribute("aria-live", "polite");
  anzeigen();
}

/* ============================================================
   FOTO ANFÜGEN
   16:9-Editor · Ablage in IndexedDB als Blob (kein 5-MB-Limit,
   kein base64-Aufschlag) · Zuordnung über data-schritt-IDs.
   Altbestände aus localStorage werden einmalig übernommen.
   ============================================================ */
function fotosAktivieren() {
  const zonen = [...document.querySelectorAll(".fotozone")];
  if (!zonen.length) return;
  const seite = document.body.dataset.seite;
  /* Die Schritt-ID steht am <section class="step">, nicht mehr an der
     Fotozone — dort ist sie zugleich die ID des Schritt-Hakens. Sie wird
     hier einmal an die Zone durchgereicht, damit alles Weitere wie bisher
     zone.dataset.schritt liest. Die Werte sind dieselben geblieben:
     angehängte Fotos bleiben, wo sie waren. */
  zonen.forEach(z => {
    const schritt = z.closest(".step[data-schritt]");
    if (schritt) z.dataset.schritt = schritt.dataset.schritt;
  });

  const zonenNachSchritt = {};
  zonen.forEach(z => { if (z.dataset.schritt) zonenNachSchritt[z.dataset.schritt] = z; });

  /* ---------- IndexedDB ---------- */
  const dbBereit = new Promise((res, rej) => {
    const r = indexedDB.open("hefter", 1);
    r.onupgradeneeded = () => {
      const store = r.result.createObjectStore("fotos", { keyPath: "id" });
      store.createIndex("seite", "seite");
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  const dbAblegen = rec => dbBereit.then(db => new Promise((res, rej) => {
    const t = db.transaction("fotos", "readwrite");
    t.objectStore("fotos").put(rec);
    t.oncomplete = res; t.onerror = () => rej(t.error);
  }));
  const dbLoeschen = id => dbBereit.then(db => new Promise((res, rej) => {
    const t = db.transaction("fotos", "readwrite");
    t.objectStore("fotos").delete(id);
    t.oncomplete = res; t.onerror = () => rej(t.error);
  }));
  const dbAlle = () => dbBereit.then(db => new Promise((res, rej) => {
    const anfrage = db.transaction("fotos").objectStore("fotos").index("seite").getAll(seite);
    anfrage.onsuccess = () => res(anfrage.result || []);
    anfrage.onerror = () => rej(anfrage.error);
  }));

  /* ---------- Editor-Overlay einmalig einhängen ---------- */
  document.body.insertAdjacentHTML("beforeend", `
    <div class="editor-back" id="editorBack">
      <div class="editor">
        <h3>Foto ins 16:9-Feld setzen</h3>
        <p class="hint">Ziehen zum Verschieben · Regler zum Zoomen. Der sichtbare Ausschnitt wird angehängt.</p>
        <div class="stage" id="stage"><img id="stageImg" alt=""></div>
        <div class="zoomrow">
          <label for="zoom">Zoom</label>
          <input type="range" id="zoom" min="1" max="3" step="0.01" value="1">
        </div>
        <div class="editor-actions">
          <button class="iconbtn" id="btnCancel">Verwerfen</button>
          <button class="iconbtn primary" id="btnApply">Übernehmen</button>
        </div>
      </div>
    </div>
    <input type="file" id="fotoDatei" accept="image/*" style="display:none">`);

  const back = document.getElementById("editorBack"), stage = document.getElementById("stage");
  const stageImg = document.getElementById("stageImg"), zoom = document.getElementById("zoom");
  const datei = document.getElementById("fotoDatei");
  let zielSchritt = null, nat = { w: 0, h: 0 }, cover = 1, scale = 1, pos = { x: 0, y: 0 }, frame = { w: 0, h: 0 };

  function fotoEinhaengen(zone, rec) {
    const fig = document.createElement("div"); fig.className = "foto";
    const img = document.createElement("img");
    img.src = URL.createObjectURL(rec.blob); img.alt = "Angehängtes Foto";
    img.onload = () => URL.revokeObjectURL(img.src);
    const rm = document.createElement("button"); rm.className = "rm"; rm.setAttribute("aria-label", "Foto entfernen");
    rm.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    rm.addEventListener("click", () => {
      dbLoeschen(rec.id).catch(() => {});
      fig.remove();
    });
    fig.append(img, rm);
    zone.querySelector(".fotos").appendChild(fig);
  }

  /* Altbestand aus localStorage (base64, Positions-Index) einmalig übernehmen */
  async function altbestandUebernehmen() {
    if (!seite) return;
    let alt = null;
    try { alt = JSON.parse(localStorage.getItem(KEY.fotos(seite)) || "null"); } catch {}
    if (!alt) return;
    for (const [index, liste] of Object.entries(alt)) {
      const schritt = zonen[+index]?.dataset.schritt;
      if (!schritt) continue;
      for (const dataURL of liste) {
        try {
          const blob = await (await fetch(dataURL)).blob();
          await dbAblegen({ id: neueId(), seite, schritt, zeit: Date.now(), blob });
        } catch {}
      }
    }
    try { localStorage.removeItem(KEY.fotos(seite)); } catch {}
  }

  /* Gespeicherte Fotos laden und einhängen */
  (async () => {
    await altbestandUebernehmen();
    const alle = await dbAlle();
    alle.sort((a, b) => a.zeit - b.zeit).forEach(rec => {
      const zone = zonenNachSchritt[rec.schritt];
      if (zone) fotoEinhaengen(zone, rec);
    });
  })().catch(() => {});

  zonen.forEach(zone => {
    zone.querySelector(".addfoto").addEventListener("click", () => {
      zielSchritt = zone.dataset.schritt;
      datei.value = ""; datei.click();
    });
  });

  datei.addEventListener("change", () => {
    const f = datei.files[0]; if (!f) return;
    const url = URL.createObjectURL(f);
    stageImg.onload = () => {
      nat = { w: stageImg.naturalWidth, h: stageImg.naturalHeight };
      back.classList.add("open");
      frame = { w: stage.clientWidth, h: stage.clientHeight };
      cover = Math.max(frame.w / nat.w, frame.h / nat.h);
      zoom.value = 1; scale = cover;
      pos = { x: (frame.w - nat.w * scale) / 2, y: (frame.h - nat.h * scale) / 2 };
      anwenden();
      URL.revokeObjectURL(url);
    };
    stageImg.src = url;
  });

  function anwenden() {
    const w = nat.w * scale, h = nat.h * scale;
    pos.x = Math.min(0, Math.max(frame.w - w, pos.x));
    pos.y = Math.min(0, Math.max(frame.h - h, pos.y));
    stageImg.style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale})`;
  }
  zoom.addEventListener("input", () => {
    const cx = frame.w / 2, cy = frame.h / 2, prev = scale;
    scale = cover * parseFloat(zoom.value);
    pos.x = cx - (cx - pos.x) * (scale / prev);
    pos.y = cy - (cy - pos.y) * (scale / prev);
    anwenden();
  });
  let drag = null;
  stage.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY }; stage.setPointerCapture(e.pointerId); stage.classList.add("dragging"); });
  stage.addEventListener("pointermove", e => { if (!drag) return; pos.x += e.clientX - drag.x; pos.y += e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY }; anwenden(); });
  stage.addEventListener("pointerup", () => { drag = null; stage.classList.remove("dragging"); });
  stage.addEventListener("pointercancel", () => { drag = null; stage.classList.remove("dragging"); });
  document.getElementById("btnCancel").addEventListener("click", () => back.classList.remove("open"));
  back.addEventListener("click", e => { if (e.target === back) back.classList.remove("open"); });

  document.getElementById("btnApply").addEventListener("click", () => {
    const OUT_W = 1280, ratio = OUT_W / frame.w;
    const cv = document.createElement("canvas"); cv.width = OUT_W; cv.height = 720;
    cv.getContext("2d").drawImage(stageImg, pos.x * ratio, pos.y * ratio, nat.w * scale * ratio, nat.h * scale * ratio);
    cv.toBlob(async blob => {
      const rec = { id: neueId(), seite, schritt: zielSchritt, zeit: Date.now(), blob };
      try { await dbAblegen(rec); }
      catch { alert("Foto konnte nicht dauerhaft gespeichert werden — es bleibt nur bis zum Neuladen sichtbar."); }
      const zone = zonenNachSchritt[zielSchritt];
      if (zone) fotoEinhaengen(zone, rec);
      back.classList.remove("open");
    }, "image/jpeg", 0.85);
  });
}

/* ============================================================
   SCHRITT-STUFEN  (einmalig ausblenden, Wahl je Seite merken)
   ============================================================ */
function stufenfilterAktivieren() {
  const filter = document.querySelector(".stufenfilter");
  if (!filter) return;
  const seite = document.body.dataset.seite;
  const schluessel = KEY.stufe(seite);

  const setzen = (modus, speichern = true) => {
    document.body.classList.toggle("nur-wiederkehrend", modus === "wiederkehrend");
    filter.querySelectorAll("button").forEach(b => {
      b.classList.toggle("aktiv", b.dataset.filter === modus);
      b.setAttribute("aria-pressed", b.dataset.filter === modus);
    });
    if (speichern && seite) { try { localStorage.setItem(schluessel, modus); } catch {} }
  };

  filter.querySelectorAll("button").forEach(b =>
    b.addEventListener("click", () => setzen(b.dataset.filter)));

  let start = "alle";
  if (seite) { try { start = localStorage.getItem(schluessel) || "alle"; } catch {} }
  setzen(start, false);
}

/* ============================================================
   A/B-WEICHE  (Varianten eines Schritts)
   Ein Schritt, zwei Ausgangslagen — sichtbar ist immer nur einer
   der Wege. Weichen mit gleichem data-weiche schalten gemeinsam:
   wer oben "Weg B" wählt, bekommt ihn auch weiter unten, ohne die
   Wahl zu wiederholen. Gemerkt wird sie je Seite und Weiche.
   ============================================================ */
function weichenAktivieren() {
  const weichen = [...document.querySelectorAll(".weiche")];
  if (!weichen.length) return;
  const seite = document.body.dataset.seite;
  /* Ohne data-weiche laufen alle Weichen einer Seite gemeinsam —
     besser als ein "undefined", das keinen Weg mehr findet. */
  const name = w => w.dataset.weiche || "standard";
  const knoepfe = w => w.querySelectorAll(":scope > .weiche-wahl button");

  const setzen = (weichenName, weg, speichern = true) => {
    if (!weg) return;
    weichen.filter(w => name(w) === weichenName).forEach(w => {
      knoepfe(w).forEach(b => {
        b.classList.toggle("aktiv", b.dataset.weg === weg);
        b.setAttribute("aria-pressed", b.dataset.weg === weg);
      });
      w.querySelectorAll(":scope > .weg").forEach(p =>
        p.classList.toggle("aktiv", p.dataset.weg === weg));
    });
    if (speichern && seite) {
      try { localStorage.setItem(KEY.weg(seite, weichenName), weg); } catch {}
    }
  };

  weichen.forEach(w => knoepfe(w).forEach(b =>
    b.addEventListener("click", () => setzen(name(w), b.dataset.weg))));

  for (const weichenName of new Set(weichen.map(name))) {
    let gewaehlt = null;
    if (seite) { try { gewaehlt = localStorage.getItem(KEY.weg(seite, weichenName)); } catch {} }
    /* Fällt die gemerkte Wahl weg (Weg umbenannt oder entfernt), greift
       der erste Weg der Weiche — nie ein leerer Schritt. */
    const wege = weichen.find(w => name(w) === weichenName).querySelectorAll(":scope > .weg");
    const bekannt = [...wege].some(p => p.dataset.weg === gewaehlt);
    setzen(weichenName, bekannt ? gewaehlt : wege[0]?.dataset.weg, false);
  }
}

/* ============================================================
   EINSTELLUNGEN  (Icon-Galerie)
   ============================================================ */
function einstellungenAufbauen() {
  const ziel = document.getElementById("iconWahl");
  if (!ziel) return;
  ziel.innerHTML = ICONS.map(ic => `
    <button class="iconkarte" data-icon="${ic.id}">
      <span class="marke"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span>
      <span class="gross"><img src="${BASIS}icons/${ic.id}.svg" alt=""></span>
      <span class="proben">
        <span class="p32"><img src="${BASIS}icons/${ic.id}.svg" alt=""></span>
        <span class="prund"><img src="${BASIS}icons/png/${ic.id}-512-maskable.png" alt=""></span>
      </span>
      <span class="name">${ic.name}</span>
    </button>`).join("");
  ziel.querySelectorAll(".iconkarte").forEach(k =>
    k.addEventListener("click", () => iconAnwenden(k.dataset.icon)));
}

/* ============================================================
   START
   ============================================================ */
themeLaden();
leisteAufbauen();
buehneAufbauen();
zuletztMerken();
/* Nach leisteAufbauen: die Leiste hängt sich dort an hefter:ansicht, und ein
   Wechsel aus den Einstellungen heraus muss sie erreichen. */
ansichtAufbauen();
anzeigeAufbauen();
einstellungenAufbauen();
/* Nach einstellungenAufbauen: erst dann existieren die Icon-Karten,
   die iconAnwenden als aktiv markiert. */
iconAnwenden(iconAktiv(), false);
kopierenAktivieren();
weichenAktivieren();
stufenfilterAktivieren();
checklisteAktivieren();
/* Nach checklisteAktivieren, weil erst dann die gespeicherten Haken stehen,
   und vor sprungzielAufklappen: das Umsortieren verschiebt die Karten, ein
   vorher angesprungenes Ziel läge danach an der falschen Stelle. */
vorgaengeAktivieren();
schritteAktivieren();
sprungzielAufklappen();
fotosAktivieren();
reparaturAktivieren();
/* Nach reparaturAktivieren und anzeigeAufbauen: das Anwenden setzt die Griffe
   am Reparaturzweig und zeichnet die Schalter — beides muss dafür stehen.
   Die Klassen selbst hat schon das Kopf-Script gesetzt; dieser Lauf holt den
   Fall nach, in dem es ausfiel, und hält Schalter und Seite beisammen. */
anzeigeAnwenden();

/* Erst wenn alles steht, werden Übergänge wieder zugelassen — bis hierher
   hält "laedt" sie an, damit die gemerkte Leistenbreite nicht sichtbar
   eingefahren kommt. Das <head>-Script setzt die Klasse. */
requestAnimationFrame(() => document.documentElement.classList.remove("laedt"));

/* ============================================================
   UPDATE-FLUSS
   Die neue Service-Worker-Version wartet, statt sofort zu
   übernehmen — kein Mischzustand aus alten und neuen Dateien.
   Ein Hinweis bietet die Aktualisierung an; erst der Klick
   aktiviert (skipWaiting) und lädt die Seite neu.
   ============================================================ */
function updateAnbieten(wartender) {
  if (document.getElementById("updateHinweis")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="update-hinweis" id="updateHinweis" role="status">
      <span>Neue Version verfügbar</span>
      <button class="iconbtn primary" id="updateJetzt">Aktualisieren</button>
    </div>`);
  document.getElementById("updateJetzt").addEventListener("click", () => {
    wartender.postMessage("aktivieren");
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(BASIS + "sw.js").then(reg => {
    if (reg.waiting) updateAnbieten(reg.waiting);
    reg.addEventListener("updatefound", () => {
      const neu = reg.installing;
      if (!neu) return;
      neu.addEventListener("statechange", () => {
        /* "installed" + bestehender Controller = Update (kein Erstbesuch) */
        if (neu.state === "installed" && navigator.serviceWorker.controller) updateAnbieten(neu);
      });
    });
  }).catch(() => {});

  /* Beim Erstbesuch setzt clients.claim() den ersten Controller —
     das ist kein Update; ohne diese Sperre lüde jede Erstansicht doppelt. */
  let kontrolliert = !!navigator.serviceWorker.controller;
  let laedtNeu = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!kontrolliert) { kontrolliert = true; return; }
    if (laedtNeu) return;
    laedtNeu = true;
    location.reload();
  });
}
