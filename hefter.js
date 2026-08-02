/* ============================================================
   HEFTER · gemeinsame App-Logik
   Neue Anleitung: Eintrag in REGISTER ergänzen + HTML-Datei
   in /anleitungen anlegen (vorlage kopieren).
   ============================================================ */

/* ---------- Register aller Anleitungen ----------
   GENERIERT aus den Anleitungs-HTMLs — nicht von Hand pflegen.
   Quelle je Seite: <h1> (Titel), .chip (Kategorie),
   meta hefter-untertitel, meta hefter-stichworte.
   Nach Änderungen: node bauen.mjs ausführen. */
/* REGISTER-START */
const REGISTER = [
  {
    "id": "hetzner-deploy",
    "titel": "Automatisches Deploy auf Hetzner per GitHub Actions",
    "untertitel": "SSH-Deploy-Key, GitHub Secrets, deploy.yml",
    "kategorie": "Deployment",
    "datei": "anleitungen/hetzner-deploy.html",
    "stichworte": "ssh github actions hetzner deploy key secrets workflow ci cd"
  },
  {
    "id": "docker-einrichtung",
    "titel": "Docker einrichten & pro Repository integrieren",
    "untertitel": "Engine, Compose, Dockerfile, Deploy-Anbindung",
    "kategorie": "Server",
    "datei": "anleitungen/docker-einrichtung.html",
    "stichworte": "docker compose container dockerfile image volume repo repository deploy ufw ports registry engine buildx"
  },
  {
    "id": "server-ersteinrichtung",
    "titel": "Server-Erst-Einrichtung & Absicherung",
    "untertitel": "Ubuntu 24.04 · Benutzer, SSH-Härtung, UFW, fail2ban",
    "kategorie": "Server",
    "datei": "anleitungen/server-ersteinrichtung.html",
    "stichworte": "ubuntu hetzner server setup benutzer sudo ssh root passwort firewall ufw fail2ban brute force absichern haertung port"
  },
  {
    "id": "vscode-remote-ssh",
    "titel": "VS Code mit dem Hetzner-Server verbinden",
    "untertitel": "Windows · Remote-SSH, Ports, Dev Containers, Fehlersuche",
    "kategorie": "Werkzeuge",
    "datei": "anleitungen/vscode-remote-ssh.html",
    "stichworte": "vscode visual studio code remote ssh hetzner server verbinden editor extension config alias windows powershell icacls ssh-agent agent forwarding git github port weiterleitung forwarding dev container docker devcontainer vscode-server fehlersuche permission denied fail2ban"
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
  checks: id => "hefter:checks:" + id,
  fotos: id => "hefter:fotos:" + id   /* nur noch für die Übernahme von Altbeständen */
};

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
   REGISTER-SEITE  (Liste + Suche)
   ============================================================ */
function registerAufbauen() {
  const ziel = document.getElementById("registerListe");
  if (!ziel) return;
  /* Das REGISTER enthält Klartext (Build löst Entities auf) — beim
     Rendern per innerHTML muss deshalb hier escaped werden. */
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const kategorien = [...new Set(REGISTER.map(e => e.kategorie))];
  ziel.innerHTML = kategorien.map(kat => `
    <section class="kategorie" data-kat="${esc(kat)}">
      <h2>${esc(kat)}</h2>
      ${REGISTER.filter(e => e.kategorie === kat).map(e => `
        <a class="eintrag" href="${e.datei}" data-such="${esc((e.titel + " " + e.untertitel + " " + e.stichworte).toLowerCase())}">
          <span><span class="t">${esc(e.titel)}</span><br><span class="u">${esc(e.untertitel)}</span></span>
          <span class="pfeil"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></span>
        </a>`).join("")}
    </section>`).join("");

  const feld = document.getElementById("sucheFeld");
  if (!feld) return;
  feld.addEventListener("input", () => {
    const q = feld.value.trim().toLowerCase();
    let treffer = 0;
    ziel.querySelectorAll(".eintrag").forEach(a => {
      const zeigt = !q || a.dataset.such.includes(q);
      a.style.display = zeigt ? "" : "none";
      if (zeigt) treffer++;
    });
    ziel.querySelectorAll(".kategorie").forEach(k => {
      k.style.display = [...k.querySelectorAll(".eintrag")].some(a => a.style.display !== "none") ? "" : "none";
    });
    const leer = document.getElementById("keineTreffer");
    if (leer) leer.style.display = treffer ? "none" : "block";
  });
  /* Ctrl+K bzw. / fokussiert die Suche */
  addEventListener("keydown", e => {
    if ((e.ctrlKey && e.key.toLowerCase() === "k") || (e.key === "/" && document.activeElement !== feld)) {
      e.preventDefault(); feld.focus(); feld.select();
    }
  });
}

/* ============================================================
   KOPIEREN
   ============================================================ */
function kopierenAktivieren() {
  document.querySelectorAll(".copybtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.closest(".codebox").querySelector("pre").innerText;
      try { await navigator.clipboard.writeText(text); } catch {}
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

  const aktualisieren = () => {
    checks.forEach(c => c.setAttribute("aria-checked", c.classList.contains("done")));
    if (stand) stand.textContent = checks.filter(c => c.classList.contains("done")).length + " / " + checks.length;
    if (seite) {
      const done = checks.filter(c => c.classList.contains("done")).map(c => c.dataset.check).filter(Boolean);
      try { localStorage.setItem(KEY.checks(seite), JSON.stringify(done)); } catch {}
    }
  };
  /* Die Häkchen sind <div>s — Rolle, Fokus und Tastatur werden hier
     zentral nachgerüstet, damit die Anleitungs-HTMLs schlicht bleiben. */
  if (stand) stand.setAttribute("aria-live", "polite");
  checks.forEach(c => {
    c.setAttribute("role", "checkbox");
    c.tabIndex = 0;
    const umschalten = () => { c.classList.toggle("done"); aktualisieren(); };
    c.addEventListener("click", umschalten);
    c.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); umschalten(); }
    });
  });
  aktualisieren();
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
  const schluessel = "hefter:stufe:" + seite;

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
registerAufbauen();
einstellungenAufbauen();
/* Nach einstellungenAufbauen: erst dann existieren die Icon-Karten,
   die iconAnwenden als aktiv markiert. */
iconAnwenden(iconAktiv(), false);
kopierenAktivieren();
stufenfilterAktivieren();
checklisteAktivieren();
fotosAktivieren();

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
