(() => {
  "use strict";

  const data = window.PALATIUM_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const state = {
    chapter: Number(localStorage.getItem("palatium.chapter") || 0),
    read: new Set(JSON.parse(localStorage.getItem("palatium.read") || "[]")),
    evidenceFilter: "all",
    evidenceQuery: "",
    installPrompt: null
  };

  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[char]));

  const primaryLevel = level => String(level).charAt(0).toLowerCase();
  const certaintyBadge = level => {
    const base = data.certainty.find(item => item.level === String(level).charAt(0));
    return `<span class="certainty certainty-${primaryLevel(level)}"><b>${escapeHTML(level)}</b>${base ? escapeHTML(base.label) : "attendibilità mista"}</span>`;
  };

  function renderScale() {
    $("#certaintyScale").innerHTML = data.certainty.map(item => `
      <article class="scale-item">
        <span class="scale-letter" aria-hidden="true">${item.level}</span>
        <strong class="scale-name">${escapeHTML(item.label)}</strong>
        <p><span aria-hidden="true">${item.sign}</span> ${escapeHTML(item.text)}</p>
      </article>
    `).join("");
  }

  function renderChapterNav() {
    $("#chapterNav").innerHTML = data.chapters.map((chapter, index) => `
      <li>
        <button class="chapter-nav-button ${index === state.chapter ? "is-active" : ""} ${state.read.has(chapter.id) ? "is-read" : ""}" data-chapter="${index}" ${index === state.chapter ? 'aria-current="step"' : ""}>
          <span class="nav-number">${chapter.number}</span>
          <span class="nav-title">${escapeHTML(chapter.title)}</span>
        </button>
      </li>
    `).join("");
    $$("[data-chapter]").forEach(button => button.addEventListener("click", () => {
      renderChapter(Number(button.dataset.chapter), true);
    }));
    updateProgress();
  }

  function renderFeature(feature) {
    const label = `<p class="feature-label">Visualizzazione critica · non ricostruzione</p>`;
    if (feature === "paradox") {
      return `<section class="feature">${label}<div class="paradox-visual">
        <div class="paradox-side"><strong>GIUGNO<br>1223</strong><p>Una data documentata con precisione.</p></div>
        <div class="paradox-divider" aria-hidden="true">≠</div>
        <div class="paradox-side"><strong>PIANTA<br>IGNOTA</strong><p>Nessun disegno archeologicamente verificato.</p></div>
      </div></section>`;
    }
    if (feature === "territory") {
      return `<section class="feature">${label}<div class="territory-visual" role="img" aria-label="Schema concettuale della posizione di Foggia fra Tavoliere, asse adriatico e vie interne">
        <span class="territory-word">Tavoliere</span><span class="territory-word">Adriatico</span><span class="territory-word">Vie interne</span>
        <div class="territory-core"><b>FOGGIA</b><small>nodo, non destino</small></div>
      </div></section>`;
    }
    if (feature === "inscription") return renderInscription();
    if (feature === "worksite") {
      return `<section class="feature">${label}<div class="worksite-visual">
        <article class="worksite-card"><span>Classe A</span><strong>Federico II</strong><p>Committenza e ordine di costruire documentati dall'epigrafe.</p></article>
        <article class="worksite-card"><span>Classe B/C</span><strong>Bartolomeo</strong><p>Associazione forte alla costruzione; titolo e responsabilità da precisare.</p></article>
        <article class="worksite-card"><span>Classe C/D</span><strong>Officine e maestranze</strong><p>Ricostruibili solo per confronti controllati, non per somiglianza isolata.</p></article>
      </div></section>`;
    }
    if (feature === "politics") {
      return `<section class="feature">${label}<div class="politics-visual">
        <p>L'ingresso come dichiarazione</p>
        <blockquote>UT URBS SIT FOGIA REGALIS SEDES INCLITA IMPERIALIS</blockquote>
        <small>Affinché la città di Foggia sia sede regale, inclita sede imperiale.</small>
      </div></section>`;
    }
    if (feature === "map") return renderMap();
    if (feature === "limits") {
      return `<section class="feature">${label}<div class="limits-grid">
        <article class="limits-column"><h3>Possiamo mostrare</h3><ul><li>archivolto</li><li>apparato epigrafico</li><li>parole e date documentate</li><li>area moderna dei resti</li></ul></article>
        <article class="limits-column possible"><h3>Possiamo ipotizzare</h3><ul><li>confronti tipologici</li><li>fasi del cantiere</li><li>ruoli delle maestranze</li><li>area storicamente plausibile</li></ul></article>
        <article class="limits-column unknown"><h3>Non possiamo ricostruire con certezza</h3><ul><li>pianta e dimensioni</li><li>torri e alzati</li><li>sale e cortili</li><li>giardini e sistemi idraulici</li></ul></article>
      </div><div class="plan-unavailable"><strong>Pianta del palazzo</strong><span>Non disponibile: le fonti non consentono un disegno verificato.</span></div>
      <div class="topography-panel" role="img" aria-label="Schema non georeferenziato dell'area di Palazzo Arpi e Piazza Nigri; non rappresenta il perimetro del palatium">
        <div class="topography-map">
          <span class="street street-arpi">VIA ARPI</span><span class="street street-nigri">PIAZZA NIGRI</span>
          <span class="plausible-area">area di riferimento<br><small>non è un perimetro</small></span>
          <span class="arpi-block">PALAZZO ARPI</span><span class="certain-rest">■<b>RESTO CERTO</b><small>archivolto + epigrafe</small></span>
        </div>
        <div class="topography-legend"><p><b>■ Resto certo</b> - collocazione moderna del nucleo reimpiegato.</p><p><b>◌ Area storicamente plausibile</b> - orientamento topografico, non impronta dell'edificio.</p><p><b>Pianta medievale</b> - non disponibile.</p></div>
      </div></section>`;
    }
    if (feature === "timeline") {
      return `<section class="feature">${label}<div class="timeline">${data.timeline.map(item => `
        <article class="timeline-item"><span class="timeline-date">${escapeHTML(item.date)} · ${escapeHTML(item.level)}</span><div class="timeline-copy"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p></div></article>
      `).join("")}</div></section>`;
    }
    return "";
  }

  function renderInscription() {
    let diplomatic = escapeHTML(data.inscription.diplomatic);
    data.inscription.terms.forEach((term, index) => {
      diplomatic = diplomatic.replace(escapeHTML(term.token), `<button class="inscription-token" data-term="${index}">${escapeHTML(term.token)}</button>`);
    });
    return `<section class="feature"> <p class="feature-label">Fonte interattiva · epigrafe di fondazione</p>
      <div class="inscription-box">
        <div class="inscription-toolbar" role="tablist" aria-label="Modalità di lettura dell'epigrafe">
          <button class="inscription-mode is-active" data-inscription-mode="diplomatic" role="tab" aria-selected="true">Trascrizione</button>
          <button class="inscription-mode" data-inscription-mode="translation" role="tab" aria-selected="false">Traduzione</button>
          <button class="inscription-mode" data-inscription-mode="interpretation" role="tab" aria-selected="false">Interpretazione</button>
        </div>
        <div class="inscription-content" id="inscriptionContent">
          <p class="inscription-text">${diplomatic}</p>
        </div>
        <p class="inscription-note" id="inscriptionNote">Tocca i termini sottolineati. La trascrizione segue l'edizione discussa da Gangemi (2014).</p>
        <div class="inscription-conclusion">
          <div class="known"><span>Inizio</span><strong>CERTO · GIUGNO 1223</strong></div>
          <div class="unknown"><span>Completamento</span><strong>NON DOCUMENTATO</strong></div>
        </div>
      </div>
    </section>`;
  }

  function renderMap() {
    const lines = data.places.filter(place => place.id !== "foggia").map(place => {
      const dx = place.x - 50;
      const dy = place.y - 50;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      return `<span class="map-line" aria-hidden="true" style="width:${length}%;transform:rotate(${angle}deg)"></span>`;
    }).join("");
    const nodes = data.places.map((place, index) => `<button class="place-node ${place.id === "foggia" ? "core is-active" : ""}" data-place="${index}" style="left:${place.x}%;top:${place.y}%">${escapeHTML(place.name)}</button>`).join("");
    return `<section class="feature"><p class="feature-label">Mappa schematica · le linee non sono strade medievali</p>
      <div class="map-wrap"><div class="map-canvas">${lines}${nodes}</div>
      <aside class="map-info" id="mapInfo"><span class="place-type">palatium / sede · A/B</span><h3>Foggia</h3><p>Baricentro documentario della rete e sede del palatium.</p><p class="map-disclaimer">Le posizioni sono schematiche. Ogni nodo conserva una funzione propria: palatium, domus e castrum non sono intercambiabili.</p></aside></div>
    </section>`;
  }

  function linkedEvidence(ids) {
    return ids.map(id => data.evidence.find(item => item.id === id)).filter(Boolean).map(item => `
      <button class="evidence-link-card" data-evidence-id="${item.id}">
        ${certaintyBadge(item.level)}
        <span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.claim)}</small></span>
        <span aria-hidden="true">→</span>
      </button>
    `).join("");
  }

  function renderChapter(index, scroll = false) {
    const safeIndex = Math.min(Math.max(index, 0), data.chapters.length - 1);
    state.chapter = safeIndex;
    const chapter = data.chapters[safeIndex];
    state.read.add(chapter.id);
    localStorage.setItem("palatium.chapter", String(safeIndex));
    localStorage.setItem("palatium.read", JSON.stringify([...state.read]));
    $("#chapterStage").innerHTML = `
      <header class="chapter-header">
        <span class="chapter-number">${chapter.number}</span>
        <div class="chapter-title-wrap"><h2>${escapeHTML(chapter.title)}</h2><p class="chapter-subtitle">${escapeHTML(chapter.subtitle)}</p></div>
      </header>
      <p class="chapter-lead">${escapeHTML(chapter.lead)}</p>
      ${renderFeature(chapter.feature)}
      <div class="chapter-tabs" role="tablist" aria-label="Livelli di lettura">
        <button class="chapter-tab is-active" data-tab="story" role="tab" aria-selected="true">Racconto</button>
        <button class="chapter-tab" data-tab="deep" role="tab" aria-selected="false">Approfondisci</button>
        <button class="chapter-tab" data-tab="source" role="tab" aria-selected="false">Vai alla fonte</button>
      </div>
      <section class="tab-panel chapter-copy" data-tab-panel="story">${chapter.story.map(p => `<p>${escapeHTML(p)}</p>`).join("")}<p class="chapter-summary"><span>In sintesi</span>${escapeHTML(chapter.summary)}</p></section>
      <section class="tab-panel deep-panel" data-tab-panel="deep" hidden><h3>${escapeHTML(chapter.deepenTitle)}</h3><p>${escapeHTML(chapter.deepen)}</p></section>
      <section class="tab-panel linked-evidence" data-tab-panel="source" hidden>${linkedEvidence(chapter.sourceIds)}</section>
      <nav class="chapter-controls" aria-label="Capitoli precedente e successivo">
        <button class="chapter-control" data-prev ${safeIndex === 0 ? "disabled" : ""}>← Capitolo precedente</button>
        <button class="chapter-control" data-next ${safeIndex === data.chapters.length - 1 ? "disabled" : ""}>Capitolo successivo →</button>
      </nav>
    `;
    bindChapterInteractions();
    renderChapterNav();
    if (scroll) {
      const offset = $(".story-layout").getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: offset, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }

  function bindChapterInteractions() {
    $$(".chapter-tab", $("#chapterStage")).forEach(tab => tab.addEventListener("click", () => {
      $$(".chapter-tab", $("#chapterStage")).forEach(button => {
        const active = button === tab;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });
      $$("[data-tab-panel]", $("#chapterStage")).forEach(panel => { panel.hidden = panel.dataset.tabPanel !== tab.dataset.tab; });
    }));
    const prev = $("[data-prev]");
    const next = $("[data-next]");
    if (prev) prev.addEventListener("click", () => renderChapter(state.chapter - 1, true));
    if (next) next.addEventListener("click", () => renderChapter(state.chapter + 1, true));
    $$("[data-evidence-id]", $("#chapterStage")).forEach(button => button.addEventListener("click", () => openEvidence(button.dataset.evidenceId)));
    bindInscription();
    bindMap();
  }

  function bindInscription() {
    const content = $("#inscriptionContent");
    if (!content) return;
    const baseDiplomatic = content.innerHTML;
    $$("[data-inscription-mode]").forEach(button => button.addEventListener("click", () => {
      $$("[data-inscription-mode]").forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      const mode = button.dataset.inscriptionMode;
      if (mode === "diplomatic") content.innerHTML = baseDiplomatic;
      if (mode === "translation") content.innerHTML = `<p class="inscription-translation">${escapeHTML(data.inscription.translation)}</p>`;
      if (mode === "interpretation") content.innerHTML = `<div class="deep-panel"><h3>Che cosa possiamo concludere?</h3><p>L'iscrizione attesta direttamente l'inizio dell'opera nel giugno 1223 per ordine di Federico II. Non fornisce la data di completamento e non descrive l'edificio.</p></div>`;
      bindInscriptionTerms();
    }));
    bindInscriptionTerms();
  }

  function bindInscriptionTerms() {
    $$("[data-term]").forEach(button => button.addEventListener("click", () => {
      const term = data.inscription.terms[Number(button.dataset.term)];
      $("#inscriptionNote").innerHTML = `<strong>${escapeHTML(term.token)} - ${escapeHTML(term.label)}.</strong> ${escapeHTML(term.note)}`;
    }));
  }

  function bindMap() {
    const info = $("#mapInfo");
    if (!info) return;
    $$("[data-place]").forEach(button => button.addEventListener("click", () => {
      const place = data.places[Number(button.dataset.place)];
      $$("[data-place]").forEach(item => item.classList.toggle("is-active", item === button));
      info.innerHTML = `<span class="place-type">${escapeHTML(place.type)} · ${escapeHTML(place.level)}</span><h3>${escapeHTML(place.name)}</h3><p>${escapeHTML(place.note)}</p><p class="map-disclaimer">Le posizioni sono schematiche. Ogni nodo conserva una funzione propria: palatium, domus e castrum non sono intercambiabili.</p>`;
    }));
  }

  function updateProgress() {
    const count = state.read.size;
    $("#progressCount").textContent = count;
    $("#progressBar").style.width = `${count / data.chapters.length * 100}%`;
  }

  function renderEvidenceFilters() {
    const options = [{ level: "all", label: "Tutte" }, ...data.certainty.map(item => ({ level: item.level, label: item.level }))];
    $("#evidenceFilters").innerHTML = options.map(item => `<button class="filter-button ${item.level === state.evidenceFilter ? "is-active" : ""}" data-filter="${item.level}">${escapeHTML(item.label)}</button>`).join("");
    $$("[data-filter]").forEach(button => button.addEventListener("click", () => {
      state.evidenceFilter = button.dataset.filter;
      renderEvidenceFilters();
      renderEvidence();
    }));
  }

  function renderEvidence() {
    const query = state.evidenceQuery.trim().toLocaleLowerCase("it");
    const matches = data.evidence.filter(item => {
      const levelMatch = state.evidenceFilter === "all" || item.level.includes(state.evidenceFilter);
      const haystack = `${item.title} ${item.claim} ${item.category} ${item.source} ${item.attests} ${item.infers} ${item.not}`.toLocaleLowerCase("it");
      return levelMatch && (!query || haystack.includes(query));
    });
    $("#evidenceGrid").innerHTML = matches.map(item => `
      <article class="evidence-card">
        <div class="evidence-meta">${certaintyBadge(item.level)}<span class="evidence-category">${escapeHTML(item.category)}</span></div>
        <h2>${escapeHTML(item.title)}</h2><p>${escapeHTML(item.claim)}</p>
        <button class="open-evidence" data-open-evidence="${item.id}">Apri la prova →</button>
      </article>
    `).join("");
    $("#evidenceEmpty").hidden = matches.length > 0;
    $$("[data-open-evidence]").forEach(button => button.addEventListener("click", () => openEvidence(button.dataset.openEvidence)));
  }

  function openEvidence(id) {
    const item = data.evidence.find(entry => entry.id === id);
    if (!item) return;
    $("#dialogContent").innerHTML = `<article class="dialog-inner">
      ${certaintyBadge(item.level)}<h2 id="dialogTitle">${escapeHTML(item.title)}</h2><p class="dialog-claim">${escapeHTML(item.claim)}</p>
      <dl class="proof-anatomy">
        <div class="proof-row"><dt>Fonte</dt><dd>${escapeHTML(item.source)}</dd></div>
        <div class="proof-row"><dt>Cosa attesta</dt><dd>${escapeHTML(item.attests)}</dd></div>
        <div class="proof-row"><dt>Cosa permette di inferire</dt><dd>${escapeHTML(item.infers)}</dd></div>
        <div class="proof-row not"><dt>Cosa NON attesta</dt><dd>${escapeHTML(item.not)}</dd></div>
      </dl>
    </article>`;
    const dialog = $("#evidenceDialog");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function renderLabs() {
    $("#labList").innerHTML = data.labs.map(lab => {
      const saved = localStorage.getItem(`palatium.${lab.id}`) || "";
      return `<article class="lab-case" id="${lab.id}">
        <aside class="lab-aside"><span>${escapeHTML(lab.number)}</span><h2>${escapeHTML(lab.title)}</h2></aside>
        <div class="lab-main"><h3 class="lab-question">${escapeHTML(lab.question)}</h3>
          <div class="fact-list">${lab.facts.map(fact => `<span class="fact">${escapeHTML(fact)}</span>`).join("")}</div>
          <p class="lab-prompt">${escapeHTML(lab.prompt)}</p>
          <label><span class="sr-only">La tua conclusione per ${escapeHTML(lab.title)}</span><textarea data-lab-text="${lab.id}" placeholder="Scrivi qui la tua conclusione argomentata…">${escapeHTML(saved)}</textarea></label>
          <div class="lab-actions"><button class="lab-save" data-lab-save="${lab.id}">Salva la conclusione</button><button class="lab-reveal" data-lab-reveal="${lab.id}">Confronta con il verdetto</button><span class="save-state" data-save-state="${lab.id}">${saved ? "Bozza salvata sul dispositivo" : ""}</span></div>
          <div class="lab-verdict" data-verdict="${lab.id}" hidden><h3>${certaintyBadge(lab.verdictLevel)} Verdetto scientifico</h3><p>${escapeHTML(lab.verdict)}</p><div class="lab-evidence-links">${lab.evidenceIds.map(id => `<button data-evidence-id="${id}">Apri la prova: ${escapeHTML(data.evidence.find(item => item.id === id)?.title || id)}</button>`).join("")}</div></div>
        </div>
      </article>`;
    }).join("");
    $$("[data-lab-save]").forEach(button => button.addEventListener("click", () => {
      const id = button.dataset.labSave;
      const value = $(`[data-lab-text="${id}"]`).value.trim();
      localStorage.setItem(`palatium.${id}`, value);
      $(`[data-save-state="${id}"]`).textContent = value ? "Conclusione salvata sul dispositivo" : "Bozza rimossa";
    }));
    $$("[data-lab-reveal]").forEach(button => button.addEventListener("click", () => {
      const verdict = $(`[data-verdict="${button.dataset.labReveal}"]`);
      verdict.hidden = !verdict.hidden;
      button.textContent = verdict.hidden ? "Confronta con il verdetto" : "Nascondi il verdetto";
    }));
    $$("[data-evidence-id]", $("#labList")).forEach(button => button.addEventListener("click", () => openEvidence(button.dataset.evidenceId)));
  }

  function renderSources() {
    $("#sourcesIndex").innerHTML = data.bibliography.map(group => `<a href="#${group.id}">${escapeHTML(group.title)}</a>`).join("");
    $("#sourcesList").innerHTML = data.bibliography.map(group => `<section class="source-group" id="${group.id}"><h2>${escapeHTML(group.title)}</h2><ol>${group.items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ol></section>`).join("");
  }

  function switchView(name, scroll = true) {
    $$('[data-view-panel]').forEach(panel => {
      const active = panel.dataset.viewPanel === name;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    $$("[data-view]").forEach(button => {
      const active = button.dataset.view === name;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const hash = { story: "racconto", evidence: "prove", lab: "laboratorio", sources: "fonti" }[name];
    history.replaceState(null, "", `#${hash}`);
    if (scroll) window.scrollTo({ top: 0, behavior: "auto" });
    closeDrawer();
  }

  function openDrawer() {
    $("#drawerBackdrop").hidden = false;
    $("#mobileDrawer").classList.add("is-open");
    $("#mobileDrawer").setAttribute("aria-hidden", "false");
    $("#menuToggle").setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    $("#mobileDrawer").classList.remove("is-open");
    $("#mobileDrawer").setAttribute("aria-hidden", "true");
    $("#menuToggle").setAttribute("aria-expanded", "false");
    $("#drawerBackdrop").hidden = true;
    document.body.style.overflow = "";
  }

  function setupTheme() {
    const saved = localStorage.getItem("palatium.theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    updateThemeLabel();
    $("#themeToggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("palatium.theme", next);
      updateThemeLabel();
    });
  }
  function updateThemeLabel() {
    const dark = document.documentElement.dataset.theme === "dark";
    $("#themeToggle").setAttribute("aria-label", dark ? "Attiva tema chiaro" : "Attiva tema scuro");
  }

  function notify(message) {
    const status = $("#offlineStatus");
    status.textContent = message;
    status.classList.add("show");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => status.classList.remove("show"), 3000);
  }

  function closeEvidenceDialog() {
    const dialog = $("#evidenceDialog");
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
  }

  function setupPWA() {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (isIOS && !isStandalone) $("#installButton").hidden = false;
    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      state.installPrompt = event;
      $("#installButton").hidden = false;
    });
    $("#installButton").addEventListener("click", async () => {
      if (!state.installPrompt) {
        notify("Su iPad o iPhone: Condividi → Aggiungi alla schermata Home.");
        return;
      }
      state.installPrompt.prompt();
      await state.installPrompt.userChoice;
      state.installPrompt = null;
      $("#installButton").hidden = true;
    });
    window.addEventListener("offline", () => notify("Sei offline: il percorso resta disponibile."));
    window.addEventListener("online", () => notify("Connessione ripristinata."));
  }

  function init() {
    renderScale();
    renderEvidenceFilters();
    renderEvidence();
    renderLabs();
    renderSources();
    renderChapter(state.chapter);
    setupTheme();
    setupPWA();

    $$("[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
    $$("[data-switch]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.switch)));
    $("#evidenceSearch").addEventListener("input", event => { state.evidenceQuery = event.target.value; renderEvidence(); });
    $("#dialogClose").addEventListener("click", closeEvidenceDialog);
    $("#evidenceDialog").addEventListener("click", event => {
      if (event.target === $("#evidenceDialog")) closeEvidenceDialog();
    });
    $("#menuToggle").addEventListener("click", openDrawer);
    $("#drawerClose").addEventListener("click", closeDrawer);
    $("#drawerBackdrop").addEventListener("click", closeDrawer);
    $$('[data-drawer-view]').forEach(button => button.addEventListener("click", () => switchView(button.dataset.drawerView)));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeDrawer(); });

    const initialView = { "#prove": "evidence", "#laboratorio": "lab", "#fonti": "sources" }[location.hash] || "story";
    switchView(initialView, false);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
