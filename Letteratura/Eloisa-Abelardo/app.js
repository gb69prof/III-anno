(() => {
  "use strict";

  const data = window.ELA_DATA;
  const documents = window.ELA_DOCUMENTS || [];
  const women = window.ELA_WOMEN;
  const STORE_KEY = "gbprof-eloisa-abelardo-v1";
  const defaults = {active:"mondo", visited:[], openedDocuments:[], notes:"", highlights:[], attempts:{}};
  let state = loadState();
  let activeTab = "lesson";
  let deferredInstall = null;
  let pendingSelection = "";
  let currentDocumentId = "";

  const root = document.getElementById("lesson-root");
  const nav = document.getElementById("chapter-nav");
  const rail = document.querySelector(".chapter-rail");
  const toastNode = document.getElementById("toast");

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      return Object.assign({}, defaults, stored, {
        visited: Array.isArray(stored.visited) ? stored.visited : [],
        openedDocuments: Array.isArray(stored.openedDocuments) ? stored.openedDocuments : [],
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

  function renderDocuments(filter = "tutti") {
    const visible = filter === "tutti" ? documents : documents.filter(document => document.author === filter);
    document.getElementById("documents-grid").innerHTML = visible.map(document =>
      '<article class="document-card ' + (state.openedDocuments.includes(document.id) ? "read" : "") + '">' +
        '<p class="document-number">Documento ' + document.number + '</p><p class="document-author">' + document.author + '</p>' +
        '<h3>' + document.title + '</h3><p class="document-subtitle">' + document.subtitle + '</p>' +
        '<dl><div><dt>Data</dt><dd>' + document.date + '</dd></div><div><dt>Forma</dt><dd>' + document.kind + '</dd></div></dl>' +
        '<p class="document-scope">' + document.scope + '</p>' +
        '<button type="button" class="document-open" data-document-open="' + document.id + '">' + (state.openedDocuments.includes(document.id) ? "Riapri il documento" : "Leggi il documento") + ' <span aria-hidden="true">→</span></button>' +
      '</article>'
    ).join("");
    document.querySelectorAll("[data-document-open]").forEach(button => button.addEventListener("click", () => openDocument(button.dataset.documentOpen)));
    document.getElementById("document-progress").textContent = new Set(state.openedDocuments).size + " di " + documents.length + " documenti aperti";
    const note = window.ELA_DOCUMENTS_NOTE;
    document.getElementById("textual-note").innerHTML = '<p class="note-label">' + note.title + '</p><p>' + note.text + '</p><p><strong>Controllo:</strong> ' + note.controls + '</p>';
  }

  function openDocument(id) {
    const documentData = documents.find(document => document.id === id);
    if (!documentData) return;
    currentDocumentId = id;
    if (!state.openedDocuments.includes(id)) state.openedDocuments.push(id);
    saveState();
    renderDocuments(document.querySelector("[data-document-filter].active")?.dataset.documentFilter || "tutti");
    document.getElementById("document-reader").innerHTML =
      '<header class="document-reader-head"><p class="document-number">Documento ' + documentData.number + ' · ' + documentData.date + '</p><p class="document-author">' + documentData.author + '</p><h2>' + documentData.title + '</h2><p class="document-reader-subtitle">' + documentData.subtitle + '</p><p class="document-kind">' + documentData.kind + '</p></header>' +
      '<div class="document-editorial"><strong>Nota editoriale.</strong> ' + documentData.scope + '. ' + documentData.intro + '</div>' +
      '<div class="document-body" data-document-selectable>' + documentData.parts.map(part => '<section><h3>' + part.heading + '</h3>' + part.paragraphs.map(paragraph => '<p>' + paragraph + '</p>').join("") + '</section>').join("") + '</div>' +
      '<aside class="document-apparatus"><h3>Per leggere criticamente</h3><ul>' + documentData.apparatus.map(item => '<li>' + item + '</li>').join("") + '</ul></aside>' +
      '<aside class="document-questions"><h3>Domande al testo</h3><ol>' + documentData.questions.map(item => '<li>' + item + '</li>').join("") + '</ol></aside>' +
      '<p class="document-source"><a href="' + documentData.source.url + '" target="_blank" rel="noopener noreferrer">' + documentData.source.label + ' ↗</a></p>';
    const index = documents.findIndex(document => document.id === id);
    document.getElementById("document-previous").disabled = index === 0;
    document.getElementById("document-next").disabled = index === documents.length - 1;
    const dialog = document.getElementById("document-dialog");
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }

  function moveDocument(direction) {
    const index = documents.findIndex(document => document.id === currentDocumentId);
    const target = documents[index + direction];
    if (target) openDocument(target.id);
  }

  function saveDocumentSelection() {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : "";
    if (selectedText.length < 12) return toast("Seleziona prima un passaggio del documento.");
    state.highlights.push({section:"doc:" + currentDocumentId,text:selectedText.slice(0,800),when:new Date().toISOString()});
    state.highlights = state.highlights.slice(-30);
    saveState();
    renderHighlights();
    selection.removeAllRanges();
    toast("Passaggio documentario salvato nel taccuino.");
  }

  function downloadDocument() {
    const documentData = documents.find(document => document.id === currentDocumentId);
    if (!documentData) return;
    const lines = [documentData.author.toUpperCase(),documentData.title,documentData.subtitle,"",documentData.scope,"",documentData.intro,""].concat(documentData.parts.flatMap(part => [part.heading.toUpperCase(),...part.paragraphs,""]),["PER LEGGERE CRITICAMENTE",...documentData.apparatus.map(item => "- " + item),"","DOMANDE AL TESTO",...documentData.questions.map((item,index) => (index + 1) + ". " + item),"",documentData.source.label + ": " + documentData.source.url]);
    const url = URL.createObjectURL(new Blob([lines.join("\n\n")],{type:"text/plain;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = documentData.id + "-traduzione-italiana.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url),500);
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

  function citeLinks(refs) {
    return '<span class="evidence-refs" aria-label="Riferimenti">' + refs.map(id => '<a href="#fonte-' + id.toLowerCase() + '">' + id + '</a>').join(" · ") + '</span>';
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
      const title = item.section.startsWith("doc:") ? ((documents.find(document => document.id === item.section.slice(4)) || {}).title || item.section) : ((data.sections.find(s => s.id === item.section) || {}).title || item.section);
      return '<blockquote class="highlight-item">' + escapeHTML(item.text) + "<small>" + title + "</small></blockquote>";
    }).join("") : "<p>Nessun passaggio salvato.</p>";
  }

  function exportNotes() {
    const lines = ["ELOISA E ABELARDO — TACCUINO","",state.notes || "(nessun appunto)","","PASSAGGI SALVATI"].concat(state.highlights.map(item => {
      const title = item.section.startsWith("doc:") ? ((documents.find(document => document.id === item.section.slice(4)) || {}).title || item.section) : ((data.sections.find(s => s.id === item.section) || {}).title || item.section);
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
    const lessons = data.sections.map(section => ({type:"section",id:section.id,title:section.title,text:[section.subtitle].concat(section.lesson.flatMap(block => [block.h].concat(block.p)),[section.summary],section.essentials,section.vocab.flatMap(item => [item.t,item.d])).join(" ")}));
    const primarySources = documents.map(document => ({type:"document",id:document.id,title:document.title,text:[document.author,document.subtitle,document.intro].concat(document.parts.flatMap(part => [part.heading].concat(part.paragraphs)),document.apparatus,document.questions).join(" ")}));
    const womenDossier = {type:"women",id:"eloisa-donna",title:women.title,text:[women.subtitle,women.question,women.method.warning,women.method.milieu,women.composite,women.thesis.lead,women.thesis.formula].concat(women.norms.flatMap(item => [item.title,item.text,item.reality]),women.cases.flatMap(item => [item.name,item.role,item.proof,item.meaning]),Object.values(women.matrix).flatMap(items => items.flat()),women.documents.flatMap(item => [item.title,item.excerpt,item.reading]),women.observers.flatMap(item => [item.label,item.title,item.verdict,item.limits,item.grounds]),women.thesis.reasons.flat()).join(" ")};
    return lessons.concat(primarySources,[womenDossier]);
  }

  function search(query) {
    const out = document.getElementById("search-results");
    const value = query.trim().toLocaleLowerCase("it");
    if (value.length < 2) { out.innerHTML = "<p>Scrivi almeno due caratteri.</p>"; return; }
    const hits = buildSearchIndex().filter(item => item.text.toLocaleLowerCase("it").includes(value));
    out.innerHTML = hits.length ? hits.slice(0,12).map(hit => '<button class="search-hit" type="button" data-search-' + hit.type + '="' + hit.id + '"><strong>' + hit.title + '</strong><br><span>' + (hit.type === "document" ? "Apri il documento" : hit.type === "women" ? "Vai all’indagine storica" : "Apri il movimento") + ' che contiene “' + escapeHTML(query) + '”.</span></button>').join("") : "<p>Nessun risultato nei contenuti della PWA.</p>";
    out.querySelectorAll("[data-search-section]").forEach(button => button.addEventListener("click", () => {
      document.getElementById("search-dialog").close();
      activateSection(button.dataset.searchSection,true);
    }));
    out.querySelectorAll("[data-search-document]").forEach(button => button.addEventListener("click", () => {
      document.getElementById("search-dialog").close();
      openDocument(button.dataset.searchDocument);
    }));
    out.querySelectorAll("[data-search-women]").forEach(button => button.addEventListener("click", () => {
      document.getElementById("search-dialog").close();
      document.getElementById("eloisa-donna").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
    }));
  }

  function womenQuizHTML() {
    return '<form class="women-quiz quiz-shell" id="women-quiz"><p class="section-number">Verifica storica</p><h3>Hai distinto norma, vita e interpretazione?</h3>' +
      '<p class="quiz-intro">Sei domande. Gli errori aprono un recupero mirato: non basta ricordare un nome, occorre riconoscere il tipo di prova.</p>' +
      women.quiz.map((q,index) => '<fieldset class="quiz-question"><legend>' + (index + 1) + '. ' + q.q + '</legend>' + q.o.map((option,optionIndex) => '<label class="option"><input type="radio" name="w-' + q.id + '" value="' + optionIndex + '"><span>' + option + '</span></label>').join('') + '</fieldset>').join('') +
      '<button class="quiz-submit" type="submit">Correggi l’indagine</button><div class="quiz-result" id="women-quiz-result" aria-live="polite"></div></form>';
  }

  function renderObserver(id) {
    const observer = women.observers.find(item => item.id === id) || women.observers[0];
    document.querySelectorAll("[data-observer]").forEach(button => {
      const active = button.dataset.observer === observer.id;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    document.getElementById("observer-result").innerHTML = '<p class="observer-role">' + observer.label + '</p><h4>' + observer.title + '</h4><p>' + observer.verdict + '</p><aside><strong>Che cosa non vede bene.</strong> ' + observer.limits + '</aside><p class="observer-grounds"><strong>Categorie e prove:</strong> ' + observer.grounds + ' ' + citeLinks(observer.refs) + '</p>';
  }

  function renderWomen() {
    const root = document.getElementById("women-root");
    root.innerHTML =
      '<header class="women-hero"><img src="assets/images/06-eloisa-badessa.webp" alt="Ricostruzione artistica di Eloisa badessa mentre guida la comunità del Paracleto" width="1536" height="1024" loading="lazy"><div class="women-hero-shade"></div><div class="women-hero-copy"><p class="section-number">Indagine storica · norma e vita</p><h2 id="women-title">' + women.title + '</h2><p>' + women.subtitle + '</p><blockquote>' + women.question + '</blockquote></div></header>' +
      '<nav class="women-nav" aria-label="Indice dell’indagine"><a href="#women-method">Metodo</a><a href="#women-norms">Che cosa imparavano</a><a href="#women-cases">Come vivevano</a><a href="#women-heloise">Inquadrare Eloisa</a><a href="#women-lenses">Lenti medievali</a><a href="#women-libera">Libera AI</a></nav>' +
      '<section class="women-block method-lab" id="women-method"><div class="women-block-heading"><p class="section-number">0 · Prima regola</p><h3>Non portare il presente come un verdetto già scritto</h3></div><div class="method-columns"><article><h4>Non un solo Medioevo</h4><p>' + women.method.warning + '</p></article><article><h4>Il ceto che possiamo documentare</h4><p>' + women.method.milieu + ' ' + citeLinks(["S25"]) + '</p></article></div><div class="evidence-legend">' + women.method.labels.map(item => '<article><span>' + item.tag + '</span><p>' + item.text + '</p></article>').join('') + '</div></section>' +
      '<section class="women-block" id="women-norms"><div class="women-block-heading"><p class="section-number">1 · Cultura e morale</p><h3>Che cosa si insegnava a una donna</h3><p>Le categorie normative non descrivono automaticamente ogni vita. Dicono però quali parole rendevano una scelta onorevole, colpevole, santa o scandalosa.</p></div><div class="norm-grid">' + women.norms.map(item => '<article class="norm-card"><p class="card-code">' + item.code + ' · ' + item.label + '</p><h4>' + item.title + '</h4><p>' + item.text + '</p><aside><strong>Attrito con la realtà.</strong> ' + item.reality + '</aside>' + citeLinks(item.refs) + '</article>').join('') + '</div></section>' +
      '<section class="women-block reality-block" id="women-cases"><div class="women-block-heading"><p class="section-number">2 · La prova della vita</p><h3>Come vivevano davvero: sei casi</h3><p>Non “eccezioni che annullano la regola”, ma casi che mostrano quanta azione fosse possibile a seconda di ceto, età, parentela, ufficio e reti.</p></div><div class="case-grid">' + women.cases.map((item,index) => '<article class="case-card"><span class="case-number">0' + (index + 1) + '</span><p class="case-date">' + item.date + '</p><h4>' + item.name + '</h4><p class="case-role">' + item.role + '</p><p><strong>Prova.</strong> ' + item.proof + '</p><p><strong>Che cosa dimostra.</strong> ' + item.meaning + '</p>' + citeLinks(item.refs) + '</article>').join('') + '</div></section>' +
      '<section class="women-block heloise-block" id="women-heloise"><div class="women-block-heading"><p class="section-number">3 · Il confronto</p><h3>Eloisa: accetta, trasforma, rifiuta</h3><p>Il verbo va sempre precisato: non giudichiamo un programma politico moderno, ma il modo in cui una badessa del XII secolo usa o mette in crisi categorie condivise.</p></div><div class="matrix-grid"><article class="matrix-column accepts"><p class="matrix-label">Accetta</p>' + women.matrix.accepts.map(item => '<section><h4>' + item[0] + '</h4><p>' + item[1] + '</p></section>').join('') + '</article><article class="matrix-column transforms"><p class="matrix-label">Trasforma</p>' + women.matrix.transforms.map(item => '<section><h4>' + item[0] + '</h4><p>' + item[1] + '</p></section>').join('') + '</article><article class="matrix-column refuses"><p class="matrix-label">Rifiuta come adeguato</p>' + women.matrix.refuses.map(item => '<section><h4>' + item[0] + '</h4><p>' + item[1] + '</p></section>').join('') + '</article></div></section>' +
      '<section class="women-block evidence-block"><div class="women-block-heading"><p class="section-number">4 · I documenti decidono</p><h3>Sei prove, tre ritratti</h3><p>L’amante, la monaca interiormente divisa e la badessa legislatrice non sono tre Eloise incompatibili: sono ruoli che la scrittura tiene in tensione. Privilegi e testimonianze esterne controllano ciò che le lettere dicono di lei.</p></div><div class="dossier-documents">' + women.documents.map(item => '<article class="dossier-document"><p class="evidence-status">' + item.status + '</p><p class="case-date">' + item.date + '</p><h4>' + item.title + '</h4><blockquote>' + item.excerpt + '</blockquote><p>' + item.reading + '</p><div class="dossier-document-actions">' + (item.doc ? '<button type="button" class="document-open" data-women-document="' + item.doc + '">Apri la traduzione italiana →</button>' : '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer">Consulta il documento universitario ↗</a>') + citeLinks(item.refs) + '</div></article>').join('') + '</div></section>' +
      '<section class="women-block women-map"><div class="women-block-heading"><p class="section-number">5 · La struttura</p><h3>Infirmitas → discretio → intentio</h3><p>La mappa non mette Eloisa fuori dal suo tempo: mostra come una categoria ricevuta diventa verifica della norma e poi giudizio sulla verità interiore.</p></div><img src="assets/maps/07-eloisa-donna.svg" alt="Mappa: norma e vita documentata convergono in Eloisa; infirmitas, discretio e intentio conducono alla coscienza critica interna al Medioevo" width="1400" height="900" loading="lazy" data-women-map><button class="map-open" type="button" data-women-map-open>Ingrandisci la mappa</button></section>' +
      '<section class="women-block lenses-block" id="women-lenses"><div class="women-block-heading"><p class="section-number">6 · Laboratorio di giudizio</p><h3>Quattro uomini medievali, quattro priorità</h3><p>Scegli una lente. Ogni verdetto è un’inferenza controllata, non una citazione: usa soltanto categorie storicamente disponibili e dichiara anche il proprio punto cieco.</p></div><div class="observer-buttons">' + women.observers.map((item,index) => '<button type="button" data-observer="' + item.id + '" aria-pressed="' + (index === 0) + '"><span>0' + (index + 1) + '</span>' + item.label + '</button>').join('') + '</div><article class="observer-result" id="observer-result" aria-live="polite"></article><article class="composite-verdict"><p class="evidence-status">INFERENZA CONTROLLATA · VERDETTO COMPOSITO</p><h4>Che cosa potrebbe concludere il XII secolo?</h4><p>' + women.composite + '</p></article></section>' +
      womenQuizHTML() +
      '<section class="libera-wrap" id="women-libera"><details class="libera-ai"><summary><span>Ultima soglia</span><strong>Libera AI · interpretazione motivata</strong><small>Apri soltanto dopo norme, casi e documenti</small></summary><div class="libera-content"><p class="evidence-status">INTERPRETAZIONE · NON FONTE</p><h3>' + women.thesis.title + '</h3><p class="libera-lead">' + women.thesis.lead + '</p><div class="reason-grid">' + women.thesis.reasons.map(item => '<article><h4>' + item[0] + '</h4><p>' + item[1] + '</p></article>').join('') + '</div><blockquote>' + women.thesis.formula + '</blockquote></div></details></section>';

    root.querySelectorAll("[data-women-document]").forEach(button => button.addEventListener("click",() => openDocument(button.dataset.womenDocument)));
    root.querySelectorAll("[data-observer]").forEach(button => button.addEventListener("click",() => renderObserver(button.dataset.observer)));
    [root.querySelector("[data-women-map]"),root.querySelector("[data-women-map-open]")].forEach(control => control.addEventListener("click",() => openMap({title:women.title,map:{src:"assets/maps/07-eloisa-donna.svg",alt:"Mappa concettuale di Eloisa donna nel XII secolo"}})));
    document.getElementById("women-quiz").addEventListener("submit",gradeWomenQuiz);
    renderObserver(women.observers[0].id);
  }

  function gradeWomenQuiz(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const answers = women.quiz.map(q => form.querySelector('input[name="w-' + q.id + '"]:checked'));
    if (answers.some(answer => !answer)) return toast("Completa tutte le domande dell’indagine.");
    const errors = women.quiz.filter((q,index) => Number(answers[index].value) !== q.c);
    const score = women.quiz.length - errors.length;
    const percentage = Math.round((score / women.quiz.length) * 100);
    const grade = Math.max(1,Math.round((percentage / 100) * 10));
    state.attempts["eloisa-donna"] = (state.attempts["eloisa-donna"] || []).concat([{when:new Date().toISOString(),type:"test",score,total:women.quiz.length,percentage,grade,wrong:errors.map(q => q.id)}]);
    saveState();
    const result = document.getElementById("women-quiz-result");
    let html = '<div class="score-card"><strong>' + score + '/' + women.quiz.length + ' · ' + percentage + '% · voto ' + grade + '/10</strong><span>Il tentativo è salvato soltanto su questo dispositivo.</span></div>';
    if (errors.length) html += '<div class="error-list">' + errors.map(q => '<article class="error-card"><strong>' + q.q + '</strong><p>' + q.e + '</p></article>').join('') + '</div><div id="women-recovery"><h3>Recupero mirato</h3><div class="recovery-list">' + errors.map(q => '<article class="recovery-card"><h4>' + q.r.concept + '</h4><p><strong>Chiarimento.</strong> ' + q.r.clarification + '</p><p><strong>Esempio.</strong> ' + q.r.example + '</p><fieldset class="mini-question"><legend>' + q.r.q + '</legend>' + q.r.o.map((option,index) => '<label><input type="radio" name="wr-' + q.id + '" value="' + index + '"> ' + option + '</label>').join('') + '</fieldset></article>').join('') + '</div><button class="recovery-submit" id="women-recovery-submit" type="button">Correggi il recupero</button></div>';
    else html += '<p><strong>Nessun errore:</strong> hai distinto categorie, pratiche e livelli di prova.</p>';
    result.innerHTML = html;
    if (errors.length) document.getElementById("women-recovery-submit").addEventListener("click",() => gradeWomenRecovery(score,errors));
    result.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",block:"start"});
  }

  function gradeWomenRecovery(previousScore,errors) {
    const form = document.getElementById("women-recovery");
    const answers = errors.map(q => form.querySelector('input[name="wr-' + q.id + '"]:checked'));
    if (answers.some(answer => !answer)) return toast("Completa tutte le domande di recupero.");
    const stillWrong = errors.filter((q,index) => Number(answers[index].value) !== q.r.c);
    const score = previousScore + errors.length - stillWrong.length;
    const percentage = Math.round((score / women.quiz.length) * 100);
    const grade = Math.max(1,Math.round((percentage / 100) * 10));
    state.attempts["eloisa-donna"] = (state.attempts["eloisa-donna"] || []).concat([{when:new Date().toISOString(),type:"recupero",score,total:women.quiz.length,percentage,grade,wrong:stillWrong.map(q => q.id)}]);
    saveState();
    form.innerHTML = '<div class="score-card"><strong>Risultato aggiornato: ' + score + '/' + women.quiz.length + ' · ' + percentage + '% · voto ' + grade + '/10</strong><span>' + (stillWrong.length ? 'Restano ' + stillWrong.length + ' concetti da riprendere.' : 'Recupero completato.') + '</span></div>';
    toast("Recupero dell’indagine registrato.");
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
    document.querySelectorAll("[data-document-filter]").forEach(button => button.addEventListener("click", () => {
      document.querySelectorAll("[data-document-filter]").forEach(filter => {
        filter.classList.toggle("active", filter === button);
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      renderDocuments(button.dataset.documentFilter);
    }));
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
    document.getElementById("document-save-selection").addEventListener("click",saveDocumentSelection);
    document.getElementById("document-download").addEventListener("click",downloadDocument);
    document.getElementById("document-previous").addEventListener("click",() => moveDocument(-1));
    document.getElementById("document-next").addEventListener("click",() => moveDocument(1));
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
    renderDocuments();
    renderWomen();
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
