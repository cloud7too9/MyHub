/* GENERIERT von bauen.mjs — nicht von Hand bearbeiten.
   Die Gliederung jeder Seite für den Zoom (zoom.html): Abschnitte und
   Schritte der Anleitungen, Themen und Werkzeug-Karten der Übersichten.
   Geladen wird sie nur dort — siehe fuss() in bauen.mjs. */
const GLIEDERUNG = {
  "arbeitsplatz-einrichten": {"meta":["⏱ ca. 90 Min","Aktualisiert 13.08.2026","Windows PowerShell 7"],"lead":"Von Null bis arbeitsfähig. Die ersten 14 Schritte gelten einmal pro Rechner und bauen aufeinander auf — die Reihenfolge ist keine Empfehlung. Die letzten 7 fallen bei jedem neuen Projekt erneut an.","teile":[
    {"art":"abschnitt","id":"grundgeruest","titel":"Grundgerüst","stufe":"einmalig","teile":[
      {"art":"schritt","id":"s01","nr":1,"titel":"Paketverwaltung bereitstellen","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s02","nr":2,"titel":"Terminal und PowerShell 7","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s03","nr":3,"titel":"Profil-Datei anlegen","stufe":"einmalig","label":"Einmalig pro Rechner"}
    ]},
    {"art":"abschnitt","id":"identitaet-und-zugang","titel":"Identität und Zugang","stufe":"einmalig","teile":[
      {"art":"schritt","id":"s04","nr":4,"titel":"Git installieren und einrichten","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s05","nr":5,"titel":"SSH-Schlüssel bereitstellen","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s06","nr":6,"titel":"GitHub verbinden","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s07","nr":7,"titel":"Server-Kurznamen anlegen","stufe":"einmalig","label":"Einmalig pro Rechner"}
    ]},
    {"art":"abschnitt","id":"laufzeiten","titel":"Laufzeiten","stufe":"einmalig","teile":[
      {"art":"schritt","id":"s08","nr":8,"titel":"Node über fnm","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s09","nr":9,"titel":"pnpm aktivieren","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s10","nr":10,"titel":"Python über uv","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s11","nr":11,"titel":"Docker bereitstellen","stufe":"einmalig","label":"Einmalig pro Rechner"}
    ]},
    {"art":"abschnitt","id":"werkzeuge-und-editor","titel":"Werkzeuge und Editor","stufe":"einmalig","teile":[
      {"art":"schritt","id":"s12","nr":12,"titel":"VS Code einrichten","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s13","nr":13,"titel":"Kommandozeilen-Helfer installieren","stufe":"einmalig","label":"Einmalig pro Rechner"},
      {"art":"schritt","id":"s14","nr":14,"titel":"Profil-Datei abschließen","stufe":"einmalig","label":"Einmalig pro Rechner"}
    ]},
    {"art":"abschnitt","id":"je-projekt","titel":"Je Projekt","stufe":"wiederkehrend","teile":[
      {"art":"schritt","id":"p01","nr":15,"titel":"Projekt anlegen oder klonen","stufe":"wiederkehrend","label":"Pro Projekt"},
      {"art":"schritt","id":"p02","nr":16,"titel":".editorconfig ins Wurzelverzeichnis","stufe":"wiederkehrend","label":"Pro Projekt"},
      {"art":"schritt","id":"p03","nr":17,"titel":"Node-Version festschreiben","stufe":"wiederkehrend","label":"Pro Projekt"},
      {"art":"schritt","id":"p04","nr":18,"titel":"Prettier und ESLint aufnehmen","stufe":"wiederkehrend","label":"Pro Projekt"},
      {"art":"schritt","id":"p05","nr":19,"titel":"justfile anlegen","stufe":"wiederkehrend","label":"Pro Projekt"},
      {"art":"schritt","id":"p06","nr":20,"titel":"CI-Workflow einrichten","stufe":"wiederkehrend","label":"Pro Projekt"},
      {"art":"schritt","id":"p07","nr":21,"titel":"Ersten Stand sichern","stufe":"wiederkehrend","label":"Pro Projekt"}
    ]}
  ]},
  "werkzeugkasten": {"meta":["25 Werkzeuge","Aktualisiert 13.08.2026","Windows PowerShell"],"lead":"Die Werkzeuge, zu denen man immer wieder zurückkommt — jedes mit Zweck, Begründung, Einrichtung und einem Befehl, der zeigt, ob es steht. Zum Nachschlagen, nicht zum Durchlaufen: was du nicht brauchst, lässt du zu.","teile":[
    {"art":"thema","id":"fundament","titel":"Fundament","kurz":"Ohne diese acht geht nichts weiter — sie stehen unter allem, was danach kommt.","teile":[
      {"art":"karte","id":"wz-git","check":"wz-git","titel":"Git","tag":"Pflicht","kurz":"Versionsverwaltung — das Rückgrat von allem anderen."},
      {"art":"karte","id":"wz-gh","check":"wz-gh","titel":"GitHub CLI","tag":"sehr nützlich","kurz":"GitHub vom Terminal aus: Repos, Pull Requests, Actions-Läufe."},
      {"art":"karte","id":"wz-code","check":"wz-code","titel":"VS Code","tag":"Pflicht","kurz":"Editor mit integriertem Terminal, Git-Ansicht und Debugger."},
      {"art":"karte","id":"wz-terminal","check":"wz-terminal","titel":"Windows Terminal + PowerShell 7","tag":"Pflicht","kurz":"Anständige Shell mit Tabs, Profilen und lesbarer Schrift."},
      {"art":"karte","id":"wz-winget","check":"wz-winget","titel":"winget & Scoop","tag":"Basis","kurz":"Paketverwaltung für Windows — installieren und aktualisieren per Befehl."},
      {"art":"karte","id":"wz-fnm","check":"wz-fnm","titel":"Node.js über fnm","tag":"je Projekt","kurz":"Node-Laufzeit mit umschaltbaren Versionen pro Projekt."},
      {"art":"karte","id":"wz-pnpm","check":"wz-pnpm","titel":"pnpm","tag":"empfohlen","kurz":"Paketmanager für Node — schneller und plattensparender als npm."},
      {"art":"karte","id":"wz-uv","check":"wz-uv","titel":"uv (Python)","tag":"empfohlen","kurz":"Python-Versionen, virtuelle Umgebungen und Pakete in einem Werkzeug."}
    ]},
    {"art":"thema","id":"ausliefern","titel":"Ausliefern","kurz":"Vom eigenen Rechner auf einen Server oder ins Netz.","teile":[
      {"art":"karte","id":"wz-ssh","check":"wz-ssh","titel":"OpenSSH & Schlüssel","tag":"Pflicht","kurz":"Zugang zu Servern und Git-Fernzugriff ohne Passworteingabe."},
      {"art":"karte","id":"wz-docker","check":"wz-docker","titel":"Docker","tag":"Standard","kurz":"Anwendungen samt Umgebung in Containern — lokal wie auf dem Server gleich."},
      {"art":"karte","id":"wz-actions","check":"wz-actions","titel":"GitHub Actions","tag":"kein Install","kurz":"Automatischer Build, Test und Deploy bei jedem Push."},
      {"art":"karte","id":"wz-netlify","check":"wz-netlify","titel":"Netlify CLI","tag":"für Frontends","kurz":"Statische Seiten und PWAs vom Terminal aus veröffentlichen."},
      {"art":"karte","id":"wz-caddy","check":"wz-caddy","titel":"Caddy","tag":"auf dem Server","kurz":"Reverse Proxy mit automatischem HTTPS-Zertifikat."},
      {"art":"karte","id":"wz-systemd","check":"wz-systemd","titel":"systemd-Dienst","tag":"auf dem Server","kurz":"Eigene Anwendung als Dienst, der Neustarts und Abstürze übersteht."}
    ]},
    {"art":"thema","id":"pruefen","titel":"Prüfen","kurz":"Nachsehen, ob es wirklich tut, was es soll — bevor es jemand anderes merkt.","teile":[
      {"art":"karte","id":"wz-devtools","check":"wz-devtools","titel":"Browser-DevTools","tag":"kein Install","kurz":"Netzwerk, Speicher, Layout und Leistung im laufenden Betrieb ansehen."},
      {"art":"karte","id":"wz-curl","check":"wz-curl","titel":"curl","tag":"vorhanden","kurz":"HTTP-Anfragen aus dem Terminal — schnell und skriptfähig."},
      {"art":"karte","id":"wz-bruno","check":"wz-bruno","titel":"Bruno","tag":"Alternative: Postman","kurz":"API-Client, der Anfragen als Dateien im Projektordner speichert."},
      {"art":"karte","id":"wz-jq","check":"wz-jq","titel":"jq","tag":"klein & stark","kurz":"JSON filtern, umbauen und lesbar ausgeben."},
      {"art":"karte","id":"wz-regex101","check":"wz-regex101","titel":"regex101","tag":"Webseite","kurz":"Reguläre Ausdrücke bauen, testen und erklärt bekommen."}
    ]},
    {"art":"thema","id":"beschleuniger","titel":"Beschleuniger","kurz":"Nichts davon ist nötig. Alles davon spart täglich Zeit.","teile":[
      {"art":"karte","id":"wz-rg","check":"wz-rg","titel":"ripgrep","tag":"Liebling","kurz":"Volltextsuche über ganze Projekte, sehr schnell."},
      {"art":"karte","id":"wz-fzf","check":"wz-fzf","titel":"fzf","tag":"Tastatur","kurz":"Unscharfe Suche für Dateien, Verläufe und beliebige Listen."},
      {"art":"karte","id":"wz-just","check":"wz-just","titel":"just","tag":"Aufräumer","kurz":"Benannte Befehle je Projekt in einer Datei — statt Skript-Wildwuchs."},
      {"art":"karte","id":"wz-bat","check":"wz-bat","titel":"bat & eza","tag":"Komfort","kurz":"Dateien mit Syntaxfarben anzeigen, Verzeichnisse übersichtlich auflisten."},
      {"art":"karte","id":"wz-prettier","check":"wz-prettier","titel":"Prettier & ESLint","tag":"je Projekt","kurz":"Einheitliche Formatierung und Fehlerfindung vor dem Ausführen."},
      {"art":"karte","id":"wz-editorconfig","check":"wz-editorconfig","titel":"EditorConfig","tag":"2 Minuten","kurz":"Einrückung und Zeilenenden für alle Editoren im Projekt festlegen."}
    ]}
  ]},
  "git-zugang-privat": {"meta":["⏱ ca. 15 Min","Aktualisiert 04.08.2026","GitHub · VS Code"],"lead":"Drei Wege, sich gegenüber GitHub auszuweisen — einmal pro Rechner eingerichtet, danach läuft Klonen und Pushen ohne Nachfragen.","teile":[
    {"art":"schritt","id":"weg-wahl","nr":1,"titel":"Weg wählen — nur einer ist nötig","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"weg-a-login","nr":2,"titel":"Weg A: Browser-Login in VS Code","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"weg-b-token","nr":3,"titel":"Weg B: Personal Access Token","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"weg-c-ssh","nr":4,"titel":"Weg C: SSH-Schlüssel","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"zugang-test","nr":5,"titel":"Zugang testen","stufe":"einmalig","label":"Einmalig pro Rechner"}
  ]},
  "vscode-git-workflow": {"meta":["⏱ ca. 10 Min","Aktualisiert 04.08.2026","VS Code · GitHub"],"lead":"Der Alltagsablauf: Repo holen, bearbeiten, sauber committen, synchronisieren — jeweils per Oberfläche und als Terminal-Äquivalent.","teile":[
    {"art":"schritt","id":"klonen","nr":1,"titel":"Repository klonen","stufe":"einmalig","label":"Einmalig pro Repo"},
    {"art":"schritt","id":"pull","nr":2,"titel":"Vor der Arbeit: aktuellen Stand holen","stufe":"wiederkehrend","label":"Bei jeder Sitzung"},
    {"art":"schritt","id":"stagen","nr":3,"titel":"Änderungen prüfen und stagen","stufe":"wiederkehrend","label":"Bei jeder Sitzung"},
    {"art":"schritt","id":"commit","nr":4,"titel":"Committen","stufe":"wiederkehrend","label":"Bei jeder Sitzung"},
    {"art":"schritt","id":"sync","nr":5,"titel":"Synchronisieren (hochladen)","stufe":"wiederkehrend","label":"Bei jeder Sitzung"}
  ]},
  "git-ssd": {"meta":["⏱ ca. 20 Min","Aktualisiert 04.08.2026","SSD · fremde Rechner"],"lead":"Zugangsdaten aus Browser-Login und Token hängen am jeweiligen Rechner — nicht an der SSD. Die Lösung: ein eigener SSH-Schlüssel samt Konfiguration reist auf der SSD mit, und Git wird am fremden Rechner nur kurz darauf gezeigt.","teile":[
    {"art":"schritt","id":"ssd-schluessel","nr":1,"titel":"Eigenen Schlüssel für die SSD erzeugen","stufe":"einmalig","label":"Einmalig auf der SSD"},
    {"art":"schritt","id":"pubkey-github","nr":2,"titel":"Öffentlichen Schlüssel bei GitHub hinterlegen","stufe":"einmalig","label":"Einmalig auf der SSD"},
    {"art":"schritt","id":"ssd-config","nr":3,"titel":"SSH-Konfiguration auf die SSD legen","stufe":"einmalig","label":"Einmalig auf der SSD"},
    {"art":"schritt","id":"git-zeigen","nr":4,"titel":"Git auf die SSD zeigen lassen","stufe":"wiederkehrend","label":"An jedem fremden Rechner"},
    {"art":"schritt","id":"arbeiten","nr":5,"titel":"Testen und arbeiten wie gewohnt","stufe":"wiederkehrend","label":"An jedem fremden Rechner"},
    {"art":"schritt","id":"aufraeumen","nr":6,"titel":"Keine Spuren hinterlassen","stufe":"wiederkehrend","label":"An jedem fremden Rechner"}
  ]},
  "vscode-remote-ssh": {"meta":["⏱ ca. 25 Min","Aktualisiert 02.08.2026","Windows · VS Code Remote-SSH → Ubuntu 24.04"],"lead":"Einmal einrichten, danach arbeitest du im gewohnten Editor direkt auf dem Server: Dateien, Terminal, Git und Container laufen dort, die Oberfläche bleibt lokal.","teile":[
    {"art":"schritt","id":"voraussetzungen","nr":1,"titel":"Voraussetzungen auf dem Windows-Rechner prüfen","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"extension-remote-ssh","nr":2,"titel":"Extension „Remote - SSH\" installieren","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"ssh-config","nr":3,"titel":"Server als Alias in der .ssh\\config hinterlegen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"key-rechte-windows","nr":4,"titel":"Rechte am privaten Schlüssel geraderücken","stufe":"einmalig","label":"Einmalig pro Rechner"},
    {"art":"schritt","id":"erste-verbindung","nr":5,"titel":"Erste Verbindung aus VS Code herstellen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"ordner-oeffnen","nr":6,"titel":"Projektordner auf dem Server öffnen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"extensions-remote","nr":7,"titel":"Extensions am richtigen Ort installieren","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"git-remote","nr":8,"titel":"Git und GitHub aus der Remote-Sitzung nutzen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"ports","nr":9,"titel":"Ports weiterleiten und im lokalen Browser öffnen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"dev-containers","nr":10,"titel":"In Containern arbeiten: andocken oder darin entwickeln","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"fehlersuche","nr":11,"titel":"Fehlersuche: die fünf üblichen Verdächtigen","stufe":"wiederkehrend","label":"Bei Bedarf"}
  ]},
  "server-ersteinrichtung": {"meta":["⏱ ca. 45 Min","Aktualisiert 05.08.2026","Ubuntu 24.04 LTS · Hetzner Cloud"],"lead":"Vom frisch erstellten Server zur abgesicherten Basis: eigenes Schlüsselpaar je Gerät, drei Rollen statt eines Alleskönners, SSH nur noch per Schlüssel, root gesperrt, Firewall und Brute-Force-Schutz aktiv.","teile":[
    {"art":"schritt","id":"schluesselpaar-lokal","nr":1,"titel":"Lokales Schlüsselpaar prüfen — sonst anlegen","stufe":"wiederkehrend","label":"Pro Gerät"},
    {"art":"schritt","id":"system-update","nr":2,"titel":"Als root einloggen und System aktualisieren","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"hostname-zeit","nr":3,"titel":"Hostname und Zeitzone ansehen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"benutzer","nr":4,"titel":"Identität und Rechte","stufe":"wiederkehrend","label":"Pro Nutzer"},
    {"art":"schritt","id":"ssh-schluessel","nr":5,"titel":"Schlüssel hinterlegen","stufe":"wiederkehrend","label":"Pro Nutzer und Gerät"},
    {"art":"schritt","id":"zugang-test","nr":6,"titel":"Alle Rollen testen — auch das, was nicht gehen darf","stufe":"wiederkehrend","label":"Pro Nutzer und Gerät"},
    {"art":"schritt","id":"ssh-haertung","nr":7,"titel":"SSH härten: root-Login und Passwörter sperren","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"ufw","nr":8,"titel":"Firewall einrichten (UFW)","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"fail2ban","nr":9,"titel":"Brute-Force-Schutz mit fail2ban","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"auto-updates","nr":10,"titel":"Automatische Sicherheitsupdates","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"ssh-port","nr":11,"titel":"SSH-Port verlegen","stufe":"optional","label":"Optional"}
  ]},
  "schluesselverwaltung": {"meta":["Aktualisiert 05.08.2026","OpenSSH · Linux, macOS, Windows"],"lead":"Keine Schritt-für-Schritt-Anleitung, sondern die Seite zum Nachschlagen: Wie Schlüssel funktionieren, wo sie liegen, warum jedes Gerät sein eigenes Paar bekommt und wie man ein einzelnes wieder aussperrt.","teile":[
    {"art":"thema","id":"paar","titel":"Privater und öffentlicher Schlüssel"},
    {"art":"thema","id":"ablage","titel":"Ablage pro Nutzer statt global"},
    {"art":"thema","id":"rollen","titel":"Rollen und Rechte"},
    {"art":"thema","id":"geraete","titel":"Ein Nutzer, mehrere Geräte"},
    {"art":"thema","id":"widerruf","titel":"Ein Gerät wieder aussperren"},
    {"art":"thema","id":"optionen","titel":"Was ein Schlüssel dürfen darf"},
    {"art":"thema","id":"fehler","titel":"Wenn der Login nicht geht"}
  ]},
  "docker-einrichtung": {"meta":["⏱ ca. 40 Min","Aktualisiert 02.08.2026","Ubuntu 24.04 LTS · Docker Engine"],"lead":"Einmalig Docker auf dem Server aufsetzen — danach jedes Projekt nach demselben Muster containerisieren und über die bestehende GitHub-Action ausrollen.","teile":[
    {"art":"schritt","id":"docker-repo","nr":1,"titel":"Alte Pakete entfernen und Docker-Repository einrichten","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"engine-install","nr":2,"titel":"Docker Engine und Compose installieren","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"docker-gruppe","nr":3,"titel":"Benutzer in die docker-Gruppe aufnehmen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"ufw-falle","nr":4,"titel":"Die UFW-Falle verstehen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"repo-dateien","nr":5,"titel":"Dateien im Repository anlegen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"dockerfile","nr":6,"titel":"Dockerfile schreiben","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"dockerignore","nr":7,"titel":".dockerignore anlegen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"compose","nr":8,"titel":"compose.yaml schreiben","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"lokal-test","nr":9,"titel":"Lokal bauen und testen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"erstes-deploy","nr":10,"titel":"Erstmalig auf dem Server ausrollen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"action-docker","nr":11,"titel":"GitHub-Action auf Docker umstellen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"betrieb","nr":12,"titel":"Betrieb und Wartung","stufe":"wiederkehrend","label":"Pro Projekt"}
  ]},
  "domain-einrichtung": {"meta":["⏱ ca. 30 Min","Aktualisiert 04.08.2026","Hetzner DNS · anbieterneutral"],"lead":"Von der gekauften Domain bis zum grünen Schloss: Zone anlegen, Nameserver umstellen, Records setzen — und das Zertifikat entweder von Coolify oder von Certbot holen lassen.","teile":[
    {"art":"schritt","id":"server-ip","nr":1,"titel":"IP-Adressen des Servers ermitteln","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"zone-anlegen","nr":2,"titel":"DNS-Zone beim gewünschten Betreiber anlegen","stufe":"einmalig","label":"Einmalig pro Domain"},
    {"art":"schritt","id":"nameserver","nr":3,"titel":"Nameserver beim Registrar eintragen","stufe":"einmalig","label":"Einmalig pro Domain"},
    {"art":"schritt","id":"root-records","nr":4,"titel":"Records für Root-Domain und www setzen","stufe":"wiederkehrend","label":"Pro Domain"},
    {"art":"schritt","id":"subdomain","nr":5,"titel":"Subdomain für das Projekt anlegen","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"dns-pruefen","nr":6,"titel":"Auflösung prüfen, bevor ein Zertifikat angefordert wird","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"tls-coolify","nr":7,"titel":"Weg A — HTTPS über Coolify (Standard)","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"tls-certbot","nr":8,"titel":"Weg B — HTTPS über Nginx und Certbot","stufe":"wiederkehrend","label":"Pro Projekt"},
    {"art":"schritt","id":"caa-weiterleitung","nr":9,"titel":"Optional: CAA-Record und saubere Weiterleitungen","stufe":"wiederkehrend","label":"Pro Domain"}
  ]},
  "coolify-einrichtung": {"meta":["⏱ ca. 45 Min","Aktualisiert 04.08.2026","Ubuntu 24.04 LTS · Coolify v4"],"lead":"Einmalig Coolify auf dem Hetzner-Server aufsetzen und absichern — danach jedes Projekt aus GitHub anlegen, mit Domain versehen und bei jedem Push automatisch ausrollen lassen.","teile":[
    {"art":"schritt","id":"voraussetzungen","nr":1,"titel":"Voraussetzungen prüfen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"installer","nr":2,"titel":"Coolify installieren","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"ufw-tunnel","nr":3,"titel":"Firewall setzen — und das Dashboard nicht öffnen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"admin-konto","nr":4,"titel":"Admin-Konto anlegen und Registrierung schließen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"instance-domain","nr":5,"titel":"Dashboard hinter eine eigene Domain legen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"github-app","nr":6,"titel":"GitHub anbinden","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"projekt-anlegen","nr":7,"titel":"Projekt anlegen und Anwendung hinzufügen","stufe":"wiederkehrend","label":"Pro App"},
    {"art":"schritt","id":"buildpack","nr":8,"titel":"Build-Pack wählen und Port setzen","stufe":"wiederkehrend","label":"Pro App"},
    {"art":"schritt","id":"env-vars","nr":9,"titel":"Umgebungsvariablen und Secrets pflegen","stufe":"wiederkehrend","label":"Pro App"},
    {"art":"schritt","id":"erstes-deploy","nr":10,"titel":"Domain zuweisen und erstmals ausrollen","stufe":"wiederkehrend","label":"Pro App"},
    {"art":"schritt","id":"autodeploy","nr":11,"titel":"Auto-Deploy prüfen","stufe":"wiederkehrend","label":"Pro App"},
    {"art":"schritt","id":"betrieb","nr":12,"titel":"Betrieb: Logs, Rollback, Speicher, Updates","stufe":"wiederkehrend","label":"Pro App"}
  ]},
  "hetzner-deploy": {"meta":["⏱ ca. 20 Min","Aktualisiert 02.08.2026","Server Hetzner CX"],"lead":"Schritt-für-Schritt, wie ein Push auf main automatisch auf deinen Server ausrollt — sicher konfiguriert mit einem separaten Deploy-Key.","teile":[
    {"art":"schritt","id":"ssh-key","nr":1,"titel":"SSH-Schlüsselpaar generieren","stufe":"einmalig","label":"Einmalig"},
    {"art":"schritt","id":"pubkey-server","nr":2,"titel":"Öffentlichen Schlüssel auf dem Hetzner-Server hinterlegen","stufe":"einmalig","label":"Einmalig pro Server"},
    {"art":"schritt","id":"github-secrets","nr":3,"titel":"GitHub Secrets konfigurieren","stufe":"wiederkehrend","label":"Pro Repo"},
    {"art":"schritt","id":"workflow","nr":4,"titel":"GitHub-Actions-Workflow erstellen","stufe":"wiederkehrend","label":"Pro Repo"}
  ]}
};
