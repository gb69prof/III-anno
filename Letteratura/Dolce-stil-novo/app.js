(() => {
  "use strict";

  const DATA = window.PWA_DATA;
  const VISUALS = window.PWA_VISUALS || [];
  const STORAGE_KEY = "dolce-stil-novo-pwa-v1";
  const main = document.querySelector("#main");
  const sidebar = document.querySelector("#sidebar");
  const scrim = document.querySelector("#scrim");
  const toast = document.querySelector("#toast");
  const letters = ["A", "B", "C"];
  const mapFiles = [
    "mappa-01-mondo-precedente.svg", "mappa-02-fratture.svg", "mappa-03-immagine-uomo.svg",
    "mappa-04-poetica.svg", "mappa-05-opere.svg", "mappa-06-conclusione.svg"
  ];
  const deepDives = {
    1: {
      eyebrow: "Percorso collegato · l’eredità ricevuta",
      title: "Dall’amor cortese alla lirica italiana",
      text: "Lo Stil novo trasforma due eredità già studiate: la costellazione dell’amor cortese e il laboratorio formale della Scuola siciliana. Riprendi il passaggio italiano e torna qui senza perdere i progressi.",
      links: [
        { href: "../amor-cortese/?from=dolce-stil-novo-v1.0#lezione-7", cta: "Riprendi l’amor cortese" },
        { href: "../Scuola-siciliana/?from=dolce-stil-novo-v1.0#finale", cta: "Riprendi la Scuola siciliana" }
      ]
    }
  };

  const defaultState = {
    completed: [], lastRoute: "home", notes: {}, quotes: {}, quizHistory: {}, recoveryStatus: {}, fontScale: 1, contrast: false
  };
  let state = loadState();
  let installPrompt = null;
  let noteTimer = null;

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { ...defaultState, ...stored, completed: stored.completed || [], notes: stored.notes || {}, quotes: stored.quotes || {}, quizHistory: stored.quizHistory || {}, recoveryStatus: stored.recoveryStatus || {} };
    } catch { return { ...defaultState }; }
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); updateProgress(); }
  function esc(value = "") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c])); }
  function slugRoute() { return (location.hash.replace(/^#/, "") || "home").split("?")[0]; }
  function lessonByNumber(number) { return DATA.lessons.find(l => l.number === Number(number)); }
  function mapPath(number) { return `assets/maps/${mapFiles[number - 1]}`; }
  function visualByNumber(number) { return VISUALS.find(v => v.number === Number(number)); }
  function visualTemplate(number) {
    const visual = visualByNumber(number);
    if (!visual) return "";
    return `<figure class="world-scene">
      <div class="world-scene-image"><img src="${visual.file}" alt="${esc(visual.alt)}" loading="lazy" decoding="async"></div>
      <figcaption>
        <span class="eyebrow">Ricostruzione visuale · non fonte primaria</span>
        <h2>${esc(visual.title)}</h2>
        <p class="scene-status">Questa immagine è una ricostruzione originale e dichiaratamente ipotetica.</p>
        <details>
          <summary>Che cosa sappiamo e che cosa ricostruiamo</summary>
          <dl class="scene-evidence">
            <dt>Base documentaria</dt><dd>${esc(visual.documented)}</dd>
            <dt>Scelta ricostruttiva</dt><dd>${esc(visual.reconstructed)}</dd>
            <dt>Riferimenti visivi</dt><dd>${esc(visual.basis)}</dd>
          </dl>
        </details>
      </figcaption>
    </figure>`;
  }
  function deepDiveTemplate(number) {
    const deepDive = deepDives[Number(number)];
    if (!deepDive) return "";
    return `<aside class="deep-dive-card" aria-labelledby="deep-dive-${number}">
      <div>
        <span class="eyebrow">${esc(deepDive.eyebrow)}</span>
        <h2 id="deep-dive-${number}">${esc(deepDive.title)}</h2>
        <p>${esc(deepDive.text)}</p>
      </div>
      <div class="deep-dive-actions">${deepDive.links.map((link, index) => `<a class="${index ? "secondary-button" : "primary-button"} deep-dive-link" href="${link.href}">${esc(link.cta)} <span aria-hidden="true">→</span></a>`).join("")}</div>
    </aside>`;
  }
  function showToast(message) {
    toast.textContent = message; toast.hidden = false;
    clearTimeout(showToast.timer); showToast.timer = setTimeout(() => { toast.hidden = true; }, 2600);
  }
  function setTitle(value) { document.title = `${value} · Il dolce stil novo`; }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function sourcesTemplate(refs = []) {
    if (!refs.length || !DATA.sources) return "";
    const items = refs.map(id => DATA.sources[id]).filter(Boolean);
    if (!items.length) return "";
    return `<section class="sources-card"><span class="eyebrow">Fonti e studi</span><h2>Per verificare e approfondire</h2><ol>${items.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a><span>${esc(source.note)}</span></li>`).join("")}</ol></section>`;
  }
  function closeMenu() { sidebar.classList.remove("open"); scrim.hidden = true; document.querySelector("#menuButton").setAttribute("aria-expanded", "false"); }

  function buildNavigation() {
    document.querySelector("#lessonNav").innerHTML = DATA.lessons.map(l =>
      `<a class="nav-link" href="#lezione-${l.number}" data-route="lezione-${l.number}"><span>${String(l.number).padStart(2,"0")}</span>${esc(l.title)}</a>`
    ).join("");
    updateProgress();
  }

  function updateProgress() {
    const total = DATA.lessons.length;
    const count = state.completed.filter(n => DATA.lessons.some(l => l.number === n)).length;
    document.querySelector("#progressLabel").textContent = `${count} di ${total} lezioni`;
    document.querySelector("#progressBar").style.width = `${count / total * 100}%`;
    document.querySelectorAll(".nav-link[data-route^='lezione-']").forEach(link => {
      const n = Number(link.dataset.route.split("-")[1]);
      link.classList.toggle("complete", state.completed.includes(n));
    });
  }

  function homeTemplate() {
    const total = DATA.lessons.length;
    const count = state.completed.filter(n => DATA.lessons.some(l => l.number === n)).length;
    const next = DATA.lessons.find(l => !state.completed.includes(l.number)) || DATA.lessons[total - 1];
    setTitle("Inizio");
    return `<article class="page home-page">
      <section class="lesson-hero">
        <div class="hero-copy">
          <span class="eyebrow">Sei movimenti · letteratura italiana</span>
          <h1>Il dolce stil novo</h1>
          <p class="lede">Quando l’amore diventa conoscenza dell’interiorità, la poesia deve inventare una forma capace di seguirne armonia, crisi e trasformazione.</p>
          <p class="question">${esc(DATA.generativeQuestion)}</p>
          <div class="hero-actions">
            <a class="primary-button" href="#lezione-${next.number}">${count ? "Continua il percorso" : "Inizia dalla prima lezione"}</a>
            <a class="secondary-button" href="#taccuino">Apri il taccuino</a>
          </div>
        </div>
        <div class="hero-image"><picture><source media="(max-width: 720px)" srcset="assets/hero/dolce-stil-novo-hero-v2-960.webp" type="image/webp"><source srcset="assets/hero/dolce-stil-novo-hero-v2-1600.webp" type="image/webp"><img src="assets/hero/dolce-stil-novo-hero-v2.jpg" alt="Un codice medievale aperto emette una linea luminosa che attraversa un occhio e raggiunge un cuore; dal cuore si diramano un paesaggio dorato, uno rosso e fratturato e uno azzurro ascendente." decoding="async"></picture></div>
      </section>
      <section class="home-section thesis-strip" aria-labelledby="thesis-title">
        <div><span class="eyebrow">Tesi del percorso</span><h2 id="thesis-title">Un laboratorio poetico e un canone costruito</h2><p>Le affinità fra i testi sono reali; l’unità del movimento viene però organizzata retrospettivamente soprattutto da Dante. La PWA terrà insieme entrambe le verità.</p></div>
        <a class="secondary-button" href="#lezione-6">Vedi come nasce il canone</a>
      </section>
      <section class="home-section" aria-labelledby="lessons-title">
        <div class="home-section-head"><div><span class="eyebrow">Percorso</span><h2 id="lessons-title">Sei movimenti, una trasformazione da capire</h2></div><strong>${count}/${total}</strong></div>
        <div class="lesson-grid">${DATA.lessons.map(lessonCard).join("")}</div>
      </section>
      <section class="home-section lesson-hero">
        <div><span class="eyebrow">Conclusione</span><h2>Tre risposte a un problema comune</h2><p>Guinizzelli lega amore e gentilezza, Cavalcanti conosce la crisi del soggetto, Dante trasforma il desiderio in lode e costruisce una genealogia. L’unità non cancella il conflitto.</p><a class="primary-button" href="#finale">Apri la verifica finale</a></div>
        <img class="concept-map" src="assets/maps/mappa-06-conclusione.svg" alt="Lo Stil novo nasce da testi e reti, assume esiti diversi in Guinizzelli, Cavalcanti e Dante, viene ordinato dalla genealogia dantesca, trasmesso dai manoscritti e definito dalla critica.">
      </section>
    </article>`;
  }

  function lessonCard(l) {
    const done = state.completed.includes(l.number);
    return `<a class="lesson-card ${done ? "complete" : ""}" href="#lezione-${l.number}">
      <span class="eyebrow">Lezione ${String(l.number).padStart(2,"0")}</span>
      <h3>${esc(l.title)}</h3><p>${esc(l.question)}</p>
      <span class="card-foot"><span class="card-status">Apri</span><span aria-hidden="true">→</span></span>
    </a>`;
  }

  function lessonTemplate(lesson) {
    setTitle(`Lezione ${lesson.number}`);
    const note = state.notes[lesson.number] || "";
    const map = mapPath(lesson.number);
    const prev = lesson.number > 1 ? `#lezione-${lesson.number - 1}` : "#home";
    const next = lesson.number < DATA.lessons.length ? `#lezione-${lesson.number + 1}` : "#finale";
    return `<article class="page lesson-page" data-lesson="${lesson.number}">
      <header class="lesson-header">
        <span class="eyebrow">Lezione ${String(lesson.number).padStart(2,"0")} · ${esc(lesson.function)}</span>
        <h1>${esc(lesson.title)}</h1>
        <div class="question-banner"><span class="eyebrow">Domanda locale</span><p>${esc(lesson.question)}</p></div>
      </header>
      <section class="lesson-meta" aria-label="Obiettivi e scansione">
        <div class="meta-card"><h2>Obiettivi osservabili</h2><ul>${lesson.objectives.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="meta-card"><h2>Scansione del nucleo d'aula</h2><ul>${lesson.timing.map(x => `<li><strong>${esc(x[0])}</strong> · ${esc(x[1])}</li>`).join("")}</ul></div>
      </section>
      ${visualTemplate(lesson.number)}
      <section class="lesson-section section-anchor" id="lezione">
        <div class="tools-row"><button class="secondary-button save-quote" type="button">Salva nel taccuino il testo selezionato</button><button class="secondary-button" type="button" onclick="window.print()">Stampa</button></div>
        ${lesson.content.map(([heading, paragraphs]) => `<section><h2>${esc(heading)}</h2>${paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}</section>`).join("")}
        <aside class="bridge"><strong>Frase ponte</strong><p>${esc(lesson.bridge)}</p></aside>
      </section>
      <figure class="map-panel">
        <span class="eyebrow">Mappa concettuale</span><h2>${esc(lesson.mapCenter)}</h2>
        <img class="concept-map" src="${map}" alt="${esc(lesson.mapAlt)}">
        <figcaption>Le frecce nominano relazioni da verificare nei testi; non rappresentano un progresso inevitabile.</figcaption>
        <button class="secondary-button map-open" type="button" data-map="${map}" data-title="${esc(lesson.title)}" data-description="${esc(lesson.mapAlt)}">Apri e ingrandisci la mappa</button>
      </figure>
      <section class="study-grid" aria-label="Strumenti di studio">
        <article class="study-card"><h2>Sintesi studiabile</h2><p>${esc(lesson.summary)}</p><h3>Saperi irrinunciabili</h3><ul>${lesson.essentials.map(x => `<li>${esc(x)}</li>`).join("")}</ul></article>
        <article class="study-card"><h2>Vocabolario essenziale</h2><table class="vocab"><thead><tr><th>Termine</th><th>Definizione</th></tr></thead><tbody>${lesson.vocab.map(([a,b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table></article>
      </section>
      <section class="lab-card"><span class="eyebrow">Laboratorio</span><h2>Costruisci una prova</h2><dl class="label-detail"><dt>Che cosa devi comprendere</dt><dd>${esc(lesson.understanding)}</dd><dt>Consegna</dt><dd>${esc(lesson.activity)}</dd><dt>Prodotto osservabile</dt><dd>${esc(lesson.product)}</dd><dt>Criteri di correttezza</dt><dd>${esc(lesson.success)}</dd><dt>Errore concettuale intercettato</dt><dd>${esc(lesson.misconception)}</dd></dl></section>
      <section class="connections"><h2>Collegamenti e approfondimento</h2><ul>${lesson.connections.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
      ${sourcesTemplate(lesson.sourceRefs)}
      <section class="notes-card"><span class="eyebrow">Taccuino personale</span><h2>Le tue note</h2><label for="lessonNote" class="sr-only">Note sulla lezione ${lesson.number}</label><textarea id="lessonNote" data-note="${lesson.number}" placeholder="Scrivi qui: le note restano su questo dispositivo.">${esc(note)}</textarea><span class="save-state" id="noteSaveState" aria-live="polite"></span></section>
      ${quizTemplate(`lesson-${lesson.number}`, `Verifica formativa · Lezione ${lesson.number}`, lesson.quiz)}
      ${deepDiveTemplate(lesson.number)}
      <footer class="lesson-footer">
        <button class="primary-button complete-button ${state.completed.includes(lesson.number) ? "done" : ""}" type="button" data-complete="${lesson.number}">${state.completed.includes(lesson.number) ? "Lezione completata ✓" : "Segna come completata"}</button>
        <nav class="pager" aria-label="Lezioni precedente e successiva"><a class="secondary-button" href="${prev}">← Precedente</a><a class="primary-button" href="${next}">Successiva →</a></nav>
      </footer>
    </article>`;
  }

  function quizTemplate(id, title, questions, subset = null) {
    const indices = shuffle(subset || questions.map((_,i) => i));
    const history = state.quizHistory[id] || [];
    return `<section class="quiz" id="quiz-${id}" data-quiz-id="${id}">
      <span class="eyebrow">Autovalutazione</span><h2>${esc(title)}</h2>
      <p class="quiz-intro">Tre opzioni, una sola corretta. Dopo l'invio vedrai spiegazione, errori e recupero mirato. Il retest ripropone soltanto gli errori.</p>
      ${quizHistoryTemplate(history)}
      <form class="quiz-form" data-quiz-id="${id}" data-indices="${indices.join(",")}">
        ${indices.map((idx,pos) => questionTemplate(questions[idx], idx, pos)).join("")}
        <button class="primary-button" type="submit">Correggi le risposte</button>
      </form><div class="quiz-results" hidden aria-live="polite"></div>
    </section>`;
  }

  function quizHistoryTemplate(history) {
    if (!history.length) return "";
    return `<details class="quiz-history"><summary>Cronologia dei tentativi (${history.length})</summary><ol>${history.map(h => `<li>${new Date(h.at).toLocaleString("it-IT")} · ${h.correct}/${h.total} · ${h.percent}% · voto ${h.grade}/10</li>`).join("")}</ol></details>`;
  }

  function questionTemplate(q, originalIndex, position) {
    const randomized = shuffle(q.options.map((option,i) => ({option,key:letters[i]})));
    return `<fieldset class="quiz-question"><legend>${position + 1}. ${esc(q.q)}</legend>${randomized.map((item,i) =>
      `<label class="quiz-option"><input type="radio" name="q-${originalIndex}" value="${item.key}"><span><strong>${letters[i]}.</strong> ${esc(item.option)}</span></label>`
    ).join("")}</fieldset>`;
  }

  function finalTemplate() {
    setTitle("Verifica finale");
    return `<article class="page"><header class="lesson-header"><span class="eyebrow">Conclusione del percorso</span><h1>Sentimento, conoscenza e limite</h1><p class="lede">La verifica controlla se sai tenere insieme ciò che unisce lo Stil novo e ciò che divide Guinizzelli, Cavalcanti e Dante.</p></header>
      <figure class="map-panel"><img class="concept-map" src="assets/maps/mappa-06-conclusione.svg" alt="Lo Stil novo nasce da testi e reti, assume esiti diversi nei tre autori, viene ordinato da Dante, trasmesso dai manoscritti e definito dalla critica."><button class="secondary-button map-open" type="button" data-map="assets/maps/mappa-06-conclusione.svg" data-title="Stil novo: laboratorio e canone" data-description="Lo Stil novo nasce da testi e reti, assume esiti diversi in Guinizzelli, Cavalcanti e Dante, viene ordinato dalla genealogia dantesca, trasmesso dai manoscritti e definito dalla critica. Il presente riapre il rapporto tra sentimento, conoscenza e responsabilità.">Apri e ingrandisci la mappa</button></figure>
      <section class="lab-card"><span class="eyebrow">Prestazione finale</span><h2>Rispondi alla domanda generatrice</h2><p>Scrivi 350–450 parole confrontando almeno due autori. Formula una tesi, usa due prove testuali, riconosci un controargomento e non confondere sembianza angelica, lode e salvezza.</p></section>
      ${quizTemplate("final", "Verifica finale · 20 quesiti", DATA.finalQuiz)}
      ${sourcesTemplate(Object.keys(DATA.sources || {}))}
      <footer class="lesson-footer"><a class="secondary-button" href="#lezione-${DATA.lessons.length}">← Torna alla lezione ${DATA.lessons.length}</a><a class="primary-button" href="#taccuino">Apri il taccuino →</a></footer>
    </article>`;
  }

  function notebookTemplate() {
    setTitle("Taccuino");
    const entries = DATA.lessons.map(l => {
      const note = (state.notes[l.number] || "").trim();
      const quotes = state.quotes[l.number] || [];
      if (!note && !quotes.length) return "";
      return `<article class="notebook-entry"><span class="eyebrow">Lezione ${l.number}</span><h2><a href="#lezione-${l.number}">${esc(l.title)}</a></h2>${note ? `<pre>${esc(note)}</pre>` : ""}${quotes.map(q => `<blockquote class="quote-item">${esc(q)}</blockquote>`).join("")}</article>`;
    }).join("");
    return `<article class="page"><header><span class="eyebrow">Spazio personale</span><h1>Il tuo taccuino</h1><p class="lede">Note, passi selezionati e tracce del percorso restano salvati soltanto su questo dispositivo.</p></header>
      <div class="notebook-layout"><section>${entries || `<div class="empty-state"><h2>Il taccuino è vuoto</h2><p>Apri una lezione, scrivi una nota oppure seleziona un passaggio e salvalo.</p></div>`}</section>
      <aside class="notebook-tools"><h2>Esporta</h2><p>Scarica una copia testuale prima di cambiare dispositivo o azzerare i dati.</p><button class="secondary-button" id="exportNotes" type="button">Scarica .txt</button><button class="secondary-button" type="button" onclick="window.print()">Stampa</button></aside></div>
    </article>`;
  }

  function errorTemplate() {
    setTitle("Pagina non trovata");
    return `<article class="page reading-column"><span class="eyebrow">Percorso interrotto</span><h1>Questa pagina non esiste</h1><p>Il collegamento non corrisponde a una lezione del percorso.</p><a class="primary-button" href="#home">Torna all'inizio</a></article>`;
  }

  function render() {
    let route = slugRoute();
    if (route === "resume") route = state.lastRoute || "home";
    let html;
    if (route === "home") html = homeTemplate();
    else if (route.startsWith("lezione-")) {
      const lesson = lessonByNumber(route.split("-")[1]);
      html = lesson ? lessonTemplate(lesson) : errorTemplate();
    } else if (route === "finale") html = finalTemplate();
    else if (route === "taccuino") html = notebookTemplate();
    else html = errorTemplate();
    main.innerHTML = html;
    if (!["resume"].includes(route)) { state.lastRoute = route; saveState(); }
    updateActiveNav(route);
    bindPageEvents();
    closeMenu();
    window.scrollTo(0,0);
    main.focus({preventScroll:true});
  }

  function updateActiveNav(route) {
    document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.route === route));
  }

  function bindPageEvents() {
    document.querySelectorAll(".map-open").forEach(button => button.addEventListener("click", () => openMap(button)));
    const note = document.querySelector("[data-note]");
    if (note) note.addEventListener("input", () => {
      clearTimeout(noteTimer);
      const indicator = document.querySelector("#noteSaveState");
      indicator.textContent = "Salvataggio…";
      state.notes[note.dataset.note] = note.value; saveState();
      noteTimer = setTimeout(() => { indicator.textContent = "Salvato su questo dispositivo"; }, 450);
    });
    document.querySelector(".save-quote")?.addEventListener("click", saveSelectedQuote);
    document.querySelectorAll(".quiz-form").forEach(form => form.addEventListener("submit", submitQuiz));
    document.querySelector("[data-complete]")?.addEventListener("click", toggleComplete);
    document.querySelector("#exportNotes")?.addEventListener("click", exportNotes);
  }

  function getQuizQuestions(id) {
    if (id === "final") return DATA.finalQuiz;
    const number = Number(id.split("-")[1]);
    return lessonByNumber(number).quiz;
  }

  function submitQuiz(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const id = form.dataset.quizId;
    const indices = form.dataset.indices.split(",").filter(Boolean).map(Number);
    const questions = getQuizQuestions(id);
    const missing = indices.find(idx => !form.querySelector(`input[name="q-${idx}"]:checked`));
    if (missing !== undefined) {
      const fieldset = form.querySelector(`input[name="q-${missing}"]`).closest("fieldset");
      fieldset.scrollIntoView({behavior:"smooth",block:"center"}); fieldset.focus?.();
      showToast("Rispondi a tutte le domande prima della correzione."); return;
    }
    const answers = Object.fromEntries(indices.map(idx => [idx, form.querySelector(`input[name="q-${idx}"]:checked`).value]));
    const { results, correctCount, percent, grade, wrong } = window.PWA_LOGIC.evaluateQuiz(questions, indices, answers);
    state.quizHistory[id] ||= [];
    state.quizHistory[id].push({ at: new Date().toISOString(), indices, correct: correctCount, total: results.length, percent, grade, wrong });
    saveState();
    const historyMarkup = quizHistoryTemplate(state.quizHistory[id]);
    const currentHistory = form.parentElement.querySelector(".quiz-history");
    if (currentHistory) currentHistory.outerHTML = historyMarkup;
    else form.insertAdjacentHTML("beforebegin", historyMarkup);
    const box = form.parentElement.querySelector(".quiz-results");
    box.hidden = false;
    const visibleResults = id === "final" ? results.filter(result => !result.correct) : results;
    box.innerHTML = `<div class="score-line"><strong>${correctCount}/${results.length}</strong><span>${percent}%</span><span>Voto ${grade}/10</span></div>
      <p>Formula: percentuale = risposte corrette ÷ domande × 100; voto = massimo tra 1 e percentuale ÷ 10, espresso con una cifra decimale.</p>
      ${id === "final" && wrong.length ? `<p><strong>La prova finale mostra soltanto gli errori.</strong> Le risposte corrette restano registrate nel punteggio.</p>` : ""}
      ${visibleResults.map(result => answerFeedback(result,id)).join("")}
      ${wrong.length ? `<h3>Errori ancora da recuperare: ${wrong.length}</h3><button class="secondary-button retest-button" type="button" data-retest="${id}" data-wrong="${wrong.join(",")}">Rifai soltanto gli errori</button>` : `<p><strong>Nessun errore residuo.</strong> Il risultato è stato aggiunto alla cronologia senza cancellare i tentativi precedenti.</p>`}`;
    box.querySelector("[data-retest]")?.addEventListener("click", retestQuiz);
    box.querySelectorAll("[data-check-reentry]").forEach(button => button.addEventListener("click", checkReentry));
    box.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function answerFeedback(result,id) {
    const correctText = result.q.options[letters.indexOf(result.q.correct)];
    const selectedText = result.q.options[letters.indexOf(result.selected)];
    const concept = result.q.feedback.split(/[.;]/)[0];
    const recoveryKey = `${id}:${result.idx}`;
    const status = state.recoveryStatus[recoveryKey];
    const reentryOptions = shuffle(result.q.reentry.options.map((option,i)=>({option,key:letters[i]})));
    return `<article class="answer-feedback ${result.correct ? "" : "wrong"}"><h3>${result.correct ? "Corretta" : "Da recuperare"} · ${esc(result.q.q)}</h3><p><strong>Hai risposto:</strong> ${esc(selectedText)}</p><p><strong>Risposta corretta:</strong> ${esc(correctText)}</p><p>${esc(result.q.feedback)}</p>${result.correct ? "" : `<div class="recovery-box"><p><strong>Concetto da riparare.</strong> ${esc(concept)}.</p><p><strong>Chiarimento.</strong> ${esc(result.q.feedback)}</p><p><strong>Punto della lezione ed esempio.</strong> ${esc(result.q.recovery)}</p><fieldset class="reentry" data-reentry="${esc(recoveryKey)}"><legend><strong>Nuova domanda breve.</strong> ${esc(result.q.reentry.q)}</legend>${reentryOptions.map((item,i)=>`<label class="quiz-option"><input type="radio" name="re-${id}-${result.idx}" value="${item.key}"><span><strong>${letters[i]}.</strong> ${esc(item.option)}</span></label>`).join("")}<button class="secondary-button" type="button" data-check-reentry="${id}" data-index="${result.idx}">Verifica il recupero</button><p class="reentry-status ${status === "recuperato" ? "ok" : ""}" aria-live="polite">${status === "recuperato" ? "✓ Concetto recuperato" : status === "da_rivedere" ? "Da rivedere: prova di nuovo dopo il chiarimento." : ""}</p></fieldset></div>`}</article>`;
  }

  function checkReentry(event) {
    const button = event.currentTarget;
    const id = button.dataset.checkReentry;
    const idx = Number(button.dataset.index);
    const fieldset = button.closest("fieldset");
    const selected = fieldset.querySelector("input:checked");
    const status = fieldset.querySelector(".reentry-status");
    if (!selected) { status.textContent = "Scegli una risposta prima di verificare."; return; }
    const question = getQuizQuestions(id)[idx].reentry;
    const recovered = selected.value === question.correct;
    state.recoveryStatus[`${id}:${idx}`] = recovered ? "recuperato" : "da_rivedere";
    saveState();
    status.classList.toggle("ok",recovered);
    status.textContent = recovered ? "✓ Concetto recuperato. Il primo tentativo resta nella cronologia." : "Da rivedere: torna al chiarimento e prova ancora.";
  }

  function retestQuiz(event) {
    const button = event.currentTarget;
    const id = button.dataset.retest;
    const wrong = button.dataset.wrong.split(",").map(Number);
    const quiz = button.closest(".quiz");
    const title = quiz.querySelector("h2").textContent.replace(" · Recupero", "");
    quiz.outerHTML = quizTemplate(id, `${title} · Recupero`, getQuizQuestions(id), wrong);
    const newQuiz = document.querySelector(`#quiz-${CSS.escape(id)}`);
    newQuiz.querySelector(".quiz-form").addEventListener("submit", submitQuiz);
    newQuiz.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function toggleComplete(event) {
    const n = Number(event.currentTarget.dataset.complete);
    if (state.completed.includes(n)) state.completed = state.completed.filter(x => x !== n);
    else state.completed.push(n);
    state.completed.sort((a,b) => a-b); saveState(); render();
    showToast(state.completed.includes(n) ? "Lezione completata" : "Completamento rimosso");
  }

  function saveSelectedQuote() {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    const container = selection?.rangeCount ? selection.getRangeAt(0).commonAncestorContainer.parentElement?.closest(".lesson-section") : null;
    if (!text || !container) { showToast("Seleziona prima un passaggio della lezione."); return; }
    const lesson = Number(document.querySelector(".lesson-page").dataset.lesson);
    state.quotes[lesson] ||= [];
    const clean = text.replace(/\s+/g," ").slice(0,500);
    if (!state.quotes[lesson].includes(clean)) state.quotes[lesson].push(clean);
    saveState(); selection.removeAllRanges(); showToast("Passaggio salvato nel taccuino");
  }

  function exportNotes() {
    const lines = ["DOLCE STIL NOVO · TACCUINO", `Esportato: ${new Date().toLocaleString("it-IT")}`, ""];
    DATA.lessons.forEach(l => {
      const note = (state.notes[l.number] || "").trim(); const quotes = state.quotes[l.number] || [];
      if (!note && !quotes.length) return;
      lines.push(`LEZIONE ${l.number} · ${l.title}`, "-".repeat(48));
      if (note) lines.push(note, "");
      quotes.forEach(q => lines.push(`«${q}»`)); lines.push("");
    });
    const blob = new Blob([lines.join("\n")], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "taccuino-dolce-stil-novo.txt"; a.click(); URL.revokeObjectURL(url);
  }

  function openMap(button) {
    const dialog = document.querySelector("#mapDialog");
    document.querySelector("#mapDialogTitle").textContent = button.dataset.title;
    const image = document.querySelector("#mapDialogImage"); image.src = button.dataset.map; image.alt = button.dataset.description;
    document.querySelector("#mapDialogDescription").textContent = button.dataset.description;
    dialog.showModal();
  }

  function search(query) {
    const q = query.trim().toLocaleLowerCase("it");
    const target = document.querySelector("#searchResults");
    if (q.length < 2) { target.innerHTML = `<p>Scrivi almeno due caratteri.</p>`; return; }
    const results = DATA.lessons.filter(l => JSON.stringify(l).toLocaleLowerCase("it").includes(q));
    target.innerHTML = results.length ? results.map(l => {
      const text = [l.question,l.summary,...l.essentials].join(" ");
      const pos = text.toLocaleLowerCase("it").indexOf(q); const snippet = text.slice(Math.max(0,pos-60), pos+150);
      return `<a class="search-result" href="#lezione-${l.number}"><strong>Lezione ${l.number} · ${esc(l.title)}</strong><p>${esc(snippet || l.summary)}…</p></a>`;
    }).join("") : `<p>Nessun risultato. Prova un termine del vocabolario.</p>`;
    target.querySelectorAll("a").forEach(a => a.addEventListener("click", () => document.querySelector("#searchDialog").close()));
  }

  function applyPreferences() {
    document.documentElement.style.setProperty("--font-scale", state.fontScale || 1);
    document.body.classList.toggle("high-contrast", !!state.contrast);
    document.querySelector("#contrastToggle").checked = !!state.contrast;
    document.querySelectorAll("[data-scale]").forEach(b => b.classList.toggle("active", Number(b.dataset.scale) === Number(state.fontScale)));
  }

  function initGlobalEvents() {
    window.addEventListener("hashchange", render);
    document.querySelector("#menuButton").addEventListener("click", event => {
      const open = sidebar.classList.toggle("open"); scrim.hidden = !open; event.currentTarget.setAttribute("aria-expanded", String(open));
    });
    scrim.addEventListener("click", closeMenu);
    document.querySelector("#resumeButton").addEventListener("click", () => { location.hash = state.lastRoute === "home" ? `lezione-${DATA.lessons.find(l => !state.completed.includes(l.number))?.number || 1}` : state.lastRoute; });
    const searchDialog = document.querySelector("#searchDialog");
    document.querySelector("#searchButton").addEventListener("click", () => { searchDialog.showModal(); setTimeout(() => document.querySelector("#searchInput").focus(), 40); });
    document.querySelector("#searchInput").addEventListener("input", e => search(e.target.value));
    const settings = document.querySelector("#settingsDialog");
    document.querySelector("#settingsButton").addEventListener("click", () => settings.showModal());
    document.querySelectorAll("[data-scale]").forEach(button => button.addEventListener("click", () => { state.fontScale = Number(button.dataset.scale); saveState(); applyPreferences(); }));
    document.querySelector("#contrastToggle").addEventListener("change", e => { state.contrast = e.target.checked; saveState(); applyPreferences(); });
    document.querySelector("#resetButton").addEventListener("click", () => {
      if (!confirm("Vuoi cancellare note, risultati e progressi salvati su questo dispositivo?")) return;
      localStorage.removeItem(STORAGE_KEY); state = { ...defaultState }; applyPreferences(); settings.close(); render(); showToast("Dati locali azzerati");
    });
    const installButton = document.querySelector("#installButton");
    const isiPadOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (isiPadOS && !standalone) installButton.hidden = false;
    window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); installPrompt = event; installButton.hidden = false; });
    installButton.addEventListener("click", async () => {
      if (!installPrompt) { document.querySelector("#installDialog").showModal(); return; }
      installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; installButton.hidden = true;
    });
    window.addEventListener("appinstalled", () => showToast("PWA installata"));
    const status = document.querySelector("#networkStatus");
    const updateNetwork = () => { status.hidden = navigator.onLine; };
    window.addEventListener("online", updateNetwork); window.addEventListener("offline", updateNetwork); updateNetwork();
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    try { await navigator.serviceWorker.register("./sw.js"); }
    catch (error) { console.error("Service worker non registrato", error); }
  }

  buildNavigation(); initGlobalEvents(); applyPreferences(); render(); registerServiceWorker();
})();
