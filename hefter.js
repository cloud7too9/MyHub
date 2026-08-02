/* ============================================================
   HEFTER · gemeinsame App-Logik
   Neue Anleitung: Eintrag in REGISTER ergänzen + HTML-Datei
   in /anleitungen anlegen (vorlage kopieren).
   ============================================================ */

/* ---------- Register aller Anleitungen ---------- */
const REGISTER = [
  {
    id: "hetzner-deploy",
    titel: "Automatisches Deploy auf Hetzner per GitHub Actions",
    untertitel: "SSH-Deploy-Key, GitHub Secrets, deploy.yml",
    kategorie: "Deployment",
    datei: "anleitungen/hetzner-deploy.html",
    stichworte: "ssh github actions hetzner deploy key secrets workflow ci cd"
  }
];

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
  fotos: id => "hefter:fotos:" + id
};

/* ============================================================
   THEME
   ============================================================ */
function themeSetzen(t, speichern = true) {
  document.documentElement.dataset.theme = t;
  if (speichern) { try { localStorage.setItem(KEY.theme, t); } catch {} }
  const meta = document.querySelector("meta[name=theme-color]");
  if (meta) meta.content = t === "hell" ? "#f4f6fa" : "#060709";
  document.querySelectorAll("[data-themebtn]").forEach(btn => {
    const lbl = btn.querySelector(".lbl"), ico = btn.querySelector("svg");
    if (lbl) lbl.textContent = t === "hell" ? "Dunkel" : "Hell";
    if (ico) ico.innerHTML = t === "hell"
      ? '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'
      : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>';
  });
  document.querySelectorAll(".themewahl button").forEach(b =>
    b.classList.toggle("aktiv", b.dataset.t === t));
}
function themeLaden() {
  let t = "dunkel";
  try { t = localStorage.getItem(KEY.theme) || "dunkel"; } catch {}
  themeSetzen(t, false);
}
document.querySelectorAll("[data-themebtn]").forEach(btn =>
  btn.addEventListener("click", () =>
    themeSetzen(document.documentElement.dataset.theme === "hell" ? "dunkel" : "hell")));

/* ============================================================
   APP-ICON  (Favicon + dynamisches Manifest)
   Hinweis: Der Homescreen installierter PWAs übernimmt einen
   Wechsel nicht zuverlässig (iOS: nie ohne Neu-Installation).
   ============================================================ */
function iconAktiv() {
  try { return localStorage.getItem(KEY.icon) || ICON_STANDARD; } catch { return ICON_STANDARD; }
}
async function iconAnwenden(id, speichern = true) {
  if (speichern) { try { localStorage.setItem(KEY.icon, id); } catch {} }
  /* Favicon + Marke im Kopf */
  const fav = document.querySelector("link[rel=icon]");
  if (fav) fav.href = BASIS + "icons/" + id + ".svg";
  document.querySelectorAll("[data-appicon]").forEach(img => {
    img.src = BASIS + "icons/" + id + ".svg";
  });
  /* Manifest dynamisch mit dem gewählten Icon neu erzeugen */
  const link = document.querySelector("link[rel=manifest]");
  if (link) {
    try {
      const antwort = await fetch(BASIS + "manifest.webmanifest");
      const mf = await antwort.json();
      const abs = p => new URL(BASIS + p, location.href).href;
      mf.start_url = abs("index.html");
      mf.scope = abs("");
      mf.icons = [
        { src: abs("icons/png/" + id + "-192.png"), sizes: "192x192", type: "image/png" },
        { src: abs("icons/png/" + id + "-512.png"), sizes: "512x512", type: "image/png" },
        { src: abs("icons/png/" + id + "-512-maskable.png"), sizes: "512x512", type: "image/png", purpose: "maskable" }
      ];
      link.href = URL.createObjectURL(new Blob([JSON.stringify(mf)], { type: "application/json" }));
    } catch {}
  }
  document.querySelectorAll(".iconkarte").forEach(k =>
    k.classList.toggle("aktiv", k.dataset.icon === id));
}

/* ============================================================
   REGISTER-SEITE  (Liste + Suche)
   ============================================================ */
function registerAufbauen() {
  const ziel = document.getElementById("registerListe");
  if (!ziel) return;
  const kategorien = [...new Set(REGISTER.map(e => e.kategorie))];
  ziel.innerHTML = kategorien.map(kat => `
    <section class="kategorie" data-kat="${kat}">
      <h2>${kat}</h2>
      ${REGISTER.filter(e => e.kategorie === kat).map(e => `
        <a class="eintrag" href="${e.datei}" data-such="${(e.titel + " " + e.untertitel + " " + e.stichworte).toLowerCase()}">
          <span><span class="t">${e.titel}</span><br><span class="u">${e.untertitel}</span></span>
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
   CHECKLISTE  (Fortschritt je Seite in localStorage)
   ============================================================ */
function checklisteAktivieren() {
  const seite = document.body.dataset.seite;
  const checks = [...document.querySelectorAll(".check")];
  if (!checks.length) return;
  const stand = document.getElementById("chkStand");
  let gespeichert = [];
  if (seite) { try { gespeichert = JSON.parse(localStorage.getItem(KEY.checks(seite)) || "[]"); } catch {} }
  checks.forEach((c, i) => { if (gespeichert.includes(i)) c.classList.add("done"); });
  const aktualisieren = () => {
    if (stand) stand.textContent = checks.filter(c => c.classList.contains("done")).length + " / " + checks.length;
    if (seite) {
      const done = checks.map((c, i) => c.classList.contains("done") ? i : -1).filter(i => i >= 0);
      try { localStorage.setItem(KEY.checks(seite), JSON.stringify(done)); } catch {}
    }
  };
  checks.forEach(c => c.addEventListener("click", () => { c.classList.toggle("done"); aktualisieren(); }));
  aktualisieren();
}

/* ============================================================
   FOTO ANFÜGEN  (16:9-Editor, Bilder je Seite in localStorage)
   ============================================================ */
function fotosAktivieren() {
  const zonen = [...document.querySelectorAll(".fotozone")];
  if (!zonen.length) return;
  const seite = document.body.dataset.seite;

  /* Editor-Overlay einmalig einhängen */
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
  let zielZone = null, nat = { w: 0, h: 0 }, cover = 1, scale = 1, pos = { x: 0, y: 0 }, frame = { w: 0, h: 0 };

  const laden = () => { if (!seite) return {}; try { return JSON.parse(localStorage.getItem(KEY.fotos(seite)) || "{}"); } catch { return {}; } };
  const speichern = daten => { if (!seite) return true; try { localStorage.setItem(KEY.fotos(seite), JSON.stringify(daten)); return true; } catch { return false; } };

  function fotoEinhaengen(zone, zi, data) {
    const fig = document.createElement("div"); fig.className = "foto";
    const img = document.createElement("img"); img.src = data; img.alt = "Angehängtes Foto";
    const rm = document.createElement("button"); rm.className = "rm"; rm.setAttribute("aria-label", "Foto entfernen");
    rm.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    rm.addEventListener("click", () => {
      fig.remove();
      const alle = laden();
      alle[zi] = (alle[zi] || []).filter(d => d !== data);
      speichern(alle);
    });
    fig.append(img, rm);
    zone.querySelector(".fotos").appendChild(fig);
  }

  /* Gespeicherte Fotos wiederherstellen */
  const alle = laden();
  zonen.forEach((zone, zi) => {
    (alle[zi] || []).forEach(data => fotoEinhaengen(zone, zi, data));
    zone.querySelector(".addfoto").addEventListener("click", () => {
      zielZone = zi; datei.value = ""; datei.click();
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
    const data = cv.toDataURL("image/jpeg", 0.85);
    const alleAktuell = laden();
    (alleAktuell[zielZone] = alleAktuell[zielZone] || []).push(data);
    if (!speichern(alleAktuell)) {
      alert("Speicher voll — das Foto wird angezeigt, aber nicht dauerhaft gesichert.");
    }
    fotoEinhaengen(zonen[zielZone], zielZone, data);
    back.classList.remove("open");
  });
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
iconAnwenden(iconAktiv(), false);
registerAufbauen();
einstellungenAufbauen();
kopierenAktivieren();
checklisteAktivieren();
fotosAktivieren();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(BASIS + "sw.js").catch(() => {});
}
