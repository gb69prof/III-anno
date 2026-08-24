(() => {
  "use strict";

  const data = window.ELA_DATA;
  const STORE_KEY = "gbprof-eloisa-abelardo-v1";
  const defaults = {active:"mondo", visited:[], notes:"", highlights:[], attempts:{}};
  let state = loadState();
  let activeTab = "lesson";
  let deferredInstall = null;
  let pendingSelection = "";

  const root = document.getElementById("lesson-root");
  const nav = document.getElementById("chapter-nav");
  const rail = document.querySelector(".chapter-rail");
  const toastNode = document.getElementById("toast");

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return Object.assign({}, defaults, stored, {
        visited: Array.isArray(stored.visited) ? stored.visited : [],
        highlights: Array.isArray(stored.highlights) ? stored.highlights : [],
        attempts: stored.attempts || {}
      });
    } catch (_) {
      return Object.assign({}, defaults);
    }
  }

  function saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    updateProgress();
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }

  function slug(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function toast(message) {
    toastNode.textContent = message;
    toastNode.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => toastNode.classList.remove("show"), 2600);
  }

  function renderStory() {
    document.getElementById("story-grid").innerHTML = data.story.map((item, index) =>
      '<article class="story-card">' +
        '<img src="' + item.image + '" alt="' + escapeHTML(item.alt) + '" loading="' + (index < 2 ? "eager" : "lazy") + '" width="1536" height="1024">' +
        '<div class="story-card-copy"><p class="story-date">' + item.date + '</p><h3>' + item.title + '</h3><p>' + item.text + '</p><span class="story-source">' + item.source + '</span></div>' +
      '</article>'
    ).join("");
  }

  function renderNav() {
    nav.innerHTML = data.sections.map(section =>
      '<button class="chapter-link ' + (section.id === state.active ? "active" : "") + '" type="button" data-section="' + section.id + '"' + (section.id === state.active ? ' aria-current="step"' : "") + '>' +
        '<span class="n">' + section.number + '</span><span class="label">' + section.title + '</span>' +
        '<span class="done" aria-label="' + (state.visited.includes(section.id) ? "Esplorato" : "Non ancora esplorato") + '">' + (state.visited.includes(section.id) ? "●" : "○") + '</span>' +
      '</button>'
    ).join("");
    nav.querySelectorAll("[data-section]").forEach(button => button.addEventListener("click", () => activateSection(button.dataset.section, true)));
  }

  function updateProgress() {
    const count = new Set(state.visited).size;
    document.getElementById("progress-label").textContent = count + " di " + data.sections.length + " movimenti esplorati";
    document.getElementById("progress-bar").style.width = ((count / data.sections.length) * 100) + "%";
  }

  function sourceLinks(section) {
    return section.refs.map(id => '<a href="#fonte-' + id.toLowerCase() + '">' + id + '</a>').join(" · ");
  }

  function lessonHTML(section) {
    return '<div class="lesson-text" data-selectable>' +
      section.lesson.map(block =>
        '<article class="lesson-block" id="' + section.id + "-" + slug(block.h) + '"><h3>' + block.h + '</h3>' +
        block.p.map(p => "<p>" + p + "</p>").join("") + "</article>"
      ).join("") +
      '<button class="highlight-button" id="highlight-button" type="button">Salva il passaggio selezionato</button></div>';
  }

  function summaryHTML(section) {
    return '<div class="summary-card"><h3>Sintesi</h3><p>' + section.summary + '</p><div class="study-grid">' +
      '<section class="knowledge-card"><h3>Saperi irrinunciabili</h3><ul>' + section.essentials.map(item => "<li>" + item + "</li>").join("") + '</ul></section>' +
      '<section class="vocab-card"><h3>Vocabolario</h3><dl class="vocab-list">' + section.vocab.map(item => "<div><dt>" + item.t + "</dt><dd>" + item.d + "</dd></div>").join("") + '</dl></section>' +
      "</div></div>";
  }

  function mapHTML(section) {
    return '<div class="map-card"><h3>Mappa concettuale</h3><p>Le frecce nominano il rapporto fra i concetti. Apri la mappa per leggerla a tutto schermo.</p>' +
      '<img src="' + section.map.src + '" alt="' + escapeHTML(section.map.alt) + '" loading="lazy" width="1400" height="900" data-map>' +
      '<button class="map-open" type="button" data-map-open>Ingrandisci la mappa</button></div>';
  }

  function quizHTML(section) {
    return '<form class="quiz-shell" id="quiz-form"><h3>Verifica del movimento</h3>' +
      '<p class="quiz-intro">Cinque domande, tre alternative, una sola corretta. Dopo la correzione vedrai soltanto gli errori e una mini-lezione mirata.</p>' +
      '<p><span class="formula">voto = max(1, arrotonda(percentuale × 10))</span></p>' +
      section.quiz.map((q, index) =>
        '<fieldset class="quiz-question"><legend>' + (index + 1) + ". " + q.q + "</legend>" +
        q.o.map((option, optionIndex) => '<label class="option"><input type="radio" name="q-' + q.id + '" value="' + optionIndex + '"><span>' + option + "</span></label>").join("") +
        "</fieldset>"
      ).join("") +
      '<button class="quiz-submit" type="submit">Correggi il test</button><div class="quiz-result" id="quiz-result" aria-live="polite"></div></form>';
  }

  function renderSection() {
    const section = data.sections.find(item => item.id === state.active) || data.sections[0];
    state.active = section.id;
    if (!state.visited.includes(section.id)) state.visited.push(section.id);
    saveState();
    renderNav();

    const tabs = [["lesson","Lezione"],["summary","Sintesi e studio"],["map","Mappa"],["quiz","Verifica"]];
    root.innerHTML =
      '<header class="chapter-hero"><img src="' + section.image + '" alt="' + escapeHTML(section.imageAlt) + '" width="1536" height="1024">' +
        '<div class="chapter-hero-copy"><p class="section-number">Movimento ' + section.number + "</p><h2>" + section.title + '</h2><p class="chapter-subtitle">' + section.subtitle + '</p><p class="chapter-sources">Riferimenti: ' + sourceLinks(section) + "</p></div></header>" +
      '<div class="tabs" role="tablist" aria-label="Contenuti del movimento">' +
        tabs.map(pair => '<button class="tab-button" type="button" role="tab" data-tab="' + pair[0] + '" aria-selected="' + (activeTab === pair[0]) + '">' + pair[1] + "</button>").join("") +
      "</div>" +
      '<section class="tab-panel" role="tabpanel" data-panel="lesson"' + (activeTab === "lesson" ? "" : " hidden") + ">" + lessonHTML(section) + "</section>" +
      '<section class="tab-panel" role="tabpanel" data-panel="summary"' + (activeTab === "summary" ? "" : " hidden") + ">" + summaryHTML(section) + "</section>" +
      '<section class="tab-panel" role="tabpanel" data-panel="map"' + (activeTab === "map" ? "" : " hidden") + ">" + mapHTML(section) + "</section>" +
      '<section class="tab-panel" role="tabpanel" data-panel="quiz"' + (activeTab === "quiz" ? "" : " hidden") + ">" + quizHTML(section) + "</section>" +
      '<nav class="chapter-controls" aria-label="Movimento precedente e successivo">' +
        '<button type="button" id="previous-section"' + (section.number === "01" ? " disabled" : "") + '>← Movimento precedente</button>' +
        '<button type="button" id="next-section"' + (section.number === "06" ? " disabled" : "") + '>Movimento successivo →</button></nav>';

    bindSectionEvents(section);
  }

  function bindSectionEvents(section) {
    root.querySelectorAll("[data-tab]").forEach(button => {
      button.addEventListener("click", () => {
        activeTab = button.dataset.tab;
        root.querySelectorAll("[data-tab]").forEach(tab => tab.setAttribute("aria-selected", String(tab === button)));
        root.querySelectorAll("[data-panel]").forEach(panel => panel.hidden = panel.dataset.panel !== activeTab);
      });
    });
    document.getElementById("previous-section").addEventListener("click", () => moveSection(-1));
    document.getElementById("next-section").addEventListener("click", () => moveSection(1));
    document.getElementById("quiz-form").addEventListener("submit", event => gradeQuiz(event, section));
    document.getElementById("highlight-button").addEventListener("click", saveCurrentSelection);
    const selectable = root.querySelector("[data-selectable]");
    selectable.addEventListener("mouseup", captureSelection);
    selectable.addEventListener("keyup", captureSelection);
    [root.querySelector("[data-map]"), root.querySelector("[data-map-open]")].forEach(control => control.addEventListener("click", () => openMap(section)));
  }

  function activateSection(id, scroll) {
    if (!data.sections.some(section => section.id === id)) return;
    state.active = id;
    activeTab = "lesson";
    saveState();
    renderSection();
    history.replaceState(null, "", "#" + id);
    rail.classList.remove("open");
    document.getElementById("rail-toggle").setAttribute("aria-expanded", "false");
    if (scroll) document.getElementById("lezione").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
  }

  function moveSection(direction) {
    const index = data.sections.findIndex(item => item.id === state.active);
    const target = data.sections[index + direction];
    if (target) activateSection(target.id, true);
  }

  function gradeQuiz(event, section) {
    event.preventDefault();
    const form = event.currentTarget;
    const answers = section.quiz.map(q => form.querySelector('input[name="q-' + q.id + '"]:checked'));
    if (answers.some(answer => !answer)) return toast("Rispondi a tutte le domande prima della correzione.");
    const errors = section.quiz.filter((q, index) => Number(answers[index].value) !== q.c);
    const score = section.quiz.length - errors.length;
    const percentage = Math.round((score / section.quiz.length) * 100);
    const grade = Math.max(1, Math.round((percentage / 100) * 10));
    const attempt = {when:new Date().toISOString(),type:"test",score:score,total:section.quiz.length,percentage:percentage,grade:grade,wrong:errors.map(q=>q.id)};
    state.attempts[section.id] = (state.attempts[section.id] || []).concat([attempt]);
    saveState();
    renderQuizResult(section, score, errors);
  }

  function renderQuizResult(section, score, errors) {
    const result = document.getElementById("quiz-result");
    const percentage = Math.round((score / section.quiz.length) * 100);
    const grade = Math.max(1, Math.round((percentage / 100) * 10));
    let html = '<div class="score-card"><strong>' + score + "/" + section.quiz.length + " · " + percentage + "% · voto " + grade + '/10</strong><span>Il tentativo è stato salvato su questo dispositivo.</span></div>';
    if (errors.length) {
      html += '<div class="error-list">' + errors.map(q => '<article class="error-card"><strong>' + q.q + "</strong><p>" + q.e + '</p><a href="#' + section.id + "-" + slug(q.a) + '">Rivedi: ' + q.a + "</a></article>").join("") + "</div>";
      html += '<div id="recovery-form"><h3>Recupero mirato</h3><p>Compaiono soltanto i concetti non ancora acquisiti.</p><div class="recovery-list">' +
        errors.map(q => '<article class="recovery-card"><h4>' + q.r.concept + '</h4><p><strong>Chiarimento.</strong> ' + q.r.clarification + '</p><p><strong>Esempio.</strong> ' + q.r.example + '</p><fieldset class="mini-question"><legend>' + q.r.q + "</legend>" +
          q.r.o.map((option,index) => '<label><input type="radio" name="r-' + q.id + '" value="' + index + '"> ' + option + "</label>").join("") +
          "</fieldset></article>").join("") +
        '</div><button class="recovery-submit" id="recovery-submit" type="button">Correggi soltanto il recupero</button></div>';
    } else {
      html += "<p><strong>Nessun errore:</strong> tutti i nessi del movimento risultano acquisiti.</p>";
    }
    result.innerHTML = html;
    if (errors.length) document.getElementById("recovery-submit").addEventListener("click", () => gradeRecovery(section, score, errors));
    result.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",block:"start"});
  }

  function gradeRecovery(section, previousScore, errors) {
    const form = document.getElementById("recovery-form");
    const answers = errors.map(q => form.querySelector('input[name="r-' + q.id + '"]:checked'));
    if (answers.some(answer => !answer)) return toast("Completa tutte le nuove domande di recupero.");
    const stillWrong = errors.filter((q,index) => Number(answers[index].value) !== q.r.c);
    const updatedScore = previousScore + errors.length - stillWrong.length;
    const percentage = Math.round((updatedScore / section.quiz.length) * 100);
    const grade = Math.max(1, Math.round((percentage / 100) * 10));
    const attempt = {when:new Date().toISOString(),type:"recupero",score:updatedScore,total:section.quiz.length,percentage:percentage,grade:grade,wrong:stillWrong.map(q=>q.id)};
    state.attempts[section.id] = (state.attempts[section.id] || []).concat([attempt]);
    saveState();
    form.innerHTML = '<div class="score-card"><strong>Risultato aggiornato: ' + updatedScore + "/" + section.quiz.length + " · " + percentage + "% · voto " + grade + '/10</strong><span>' + (stillWrong.length ? "Restano " + stillWrong.length + " concetti da riprendere." : "Recupero completato: gli errori sono stati riparati.") + "</span></div>";
    toast("Recupero registrato.");
  }

  function captureSelection() {
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : "";
    pendingSelection = text.length >= 12 ? text.slice(0,500) : "";
    document.getElementById("selection-tools").hidden = !pendingSelection;
  }

  function saveCurrentSelection() {
    if (!pendingSelection) captureSelection();
    if (!pendingSelection) return toast("Seleziona prima un passaggio della lezione.");
    state.highlights.push({section:state.active,text:pendingSelection,when:new Date().toISOString()});
    state.highlights = state.highlights.slice(-30);
    pendingSelection = "";
    document.getElementById("selection-tools").hidden = true;
    if (window.getSelection()) window.getSelection().removeAllRanges();
    saveState();
    renderHighlights();
    toast("Passaggio salvato nel taccuino.");
  }

  function renderHighlights() {
    const list = document.getElementById("highlights-list");
    list.innerHTML = state.highlights.length ? "<h3>Passaggi salvati</h3>" + state.highlights.map(item => {
      const title = (data.sections.find(s => s.id === item.section) || {}).title || item.section;
      return '<blockquote class="highlight-item">' + escapeHTML(item.text) + "<small>" + title + "</small></blockquote>";
    }).join("") : "<p>Nessun passaggio salvato.</p>";
  }

  function exportNotes() {
    const lines = ["ELOISA E ABELARDO — TACCUINO","",state.notes || "(nessun appunto)","","PASSAGGI SALVATI"].concat(state.highlights.map(item => {
      const title = (data.sections.find(s => s.id === item.section) || {}).title || item.section;
      return "\n[" + title + "]\n" + item.text;
    }));
    const url = URL.createObjectURL(new Blob([lines.join("\n")],{type:"text/plain;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = "taccuino-eloisa-abelardo.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url),500);
  }

  function buildSearchIndex() {
    return data.sections.map(section => ({id:section.id,title:section.title,text:[section.subtitle].concat(section.lesson.flatMap(block => [block.h].concat(block.p)),[section.summary],section.essentials,section.vocab.flatMap(item => [item.t,item.d])).join(" ")}));
  }

  function search(query) {
    const out = document.getElementById("search-results");
    const value = query.trim().toLocaleLowerCase("it");
    if (value.length < 2) { out.innerHTML = "<p>Scrivi almeno due caratteri.</p>"; return; }
    const hits = buildSearchIndex().filter(item => item.text.toLocaleLowerCase("it").includes(value));
    out.innerHTML = hits.length ? hits.map(hit => '<button class="search-hit" type="button" data-search-section="' + hit.id + '"><strong>' + hit.title + '</strong><br><span>Apri il movimento che contiene “' + escapeHTML(query) + '”.</span></button>').join("") : "<p>Nessun risultato nei contenuti della PWA.</p>";
    out.querySelectorAll("[data-search-section]").forEach(button => button.addEventListener("click", () => {
      document.getElementById("search-dialog").close();
      activateSection(button.dataset.searchSection,true);
    }));
  }

  function openMap(section) {
    const dialog = document.getElementById("map-dialog");
    document.getElementById("map-title").textContent = "Mappa · " + section.title;
    const image = document.getElementById("map-large");
    image.src = section.map.src;
    image.alt = section.map.alt;
    dialog.showModal();
  }

  function renderSources() {
    document.getElementById("sources-grid").innerHTML = data.sources.map(source =>
      '<article class="source-card" id="fonte-' + source.id.toLowerCase() + '"><p class="source-type">' + source.id + " · " + source.kind + "</p><h3>" + source.title + '</h3><p class="source-author">' + source.author + '</p><p class="source-role">' + source.role + '</p><a href="' + source.url + '" target="_blank" rel="noopener noreferrer">Consulta la fonte ↗</a></article>'
    ).join("");
  }

  function bindGlobalEvents() {
    document.getElementById("rail-toggle").addEventListener("click", event => {
      rail.classList.toggle("open");
      event.currentTarget.setAttribute("aria-expanded",String(rail.classList.contains("open")));
    });
    document.getElementById("notes-open").addEventListener("click", () => {
      document.getElementById("notes-area").value = state.notes;
      renderHighlights();
      document.getElementById("notes-dialog").showModal();
    });
    document.getElementById("save-notes").addEventListener("click", () => {
      state.notes = document.getElementById("notes-area").value;
      saveState();
      toast("Appunti salvati su questo dispositivo.");
    });
    document.getElementById("export-notes").addEventListener("click",exportNotes);
    document.getElementById("search-open").addEventListener("click", () => {
      document.getElementById("search-dialog").showModal();
      setTimeout(() => document.getElementById("search-input").focus(),50);
    });
    document.getElementById("search-input").addEventListener("input",event => search(event.target.value));
    document.getElementById("save-highlight").addEventListener("click",saveCurrentSelection);
    document.getElementById("reset-progress").addEventListener("click", () => {
      if (!confirm("Azzero progresso, appunti, passaggi salvati e risultati dei test su questo dispositivo?")) return;
      localStorage.removeItem(STORE_KEY);
      state = Object.assign({},defaults);
      activateSection("mondo",false);
      toast("Dati locali azzerati.");
    });
    window.addEventListener("beforeinstallprompt",event => {
      event.preventDefault();
      deferredInstall = event;
      document.getElementById("install-button").hidden = false;
    });
    document.getElementById("install-button").addEventListener("click",async () => {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      await deferredInstall.userChoice;
      deferredInstall = null;
      document.getElementById("install-button").hidden = true;
    });
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) window.addEventListener("load",() => navigator.serviceWorker.register("./sw.js").catch(() => toast("Modalità offline non disponibile in questo contesto.")));
  }

  function init() {
    renderStory();
    renderSources();
    const hash = location.hash.replace("#","");
    if (data.sections.some(section => section.id === hash)) state.active = hash;
    renderSection();
    bindGlobalEvents();
    updateProgress();
    registerServiceWorker();
  }

  init();
})();
