(function () {
  'use strict';
  var D = window.LESSON_DATA;
  var P = window.POEM_DATA;
  var L = window.ContrastoLogic;
  var main = document.getElementById('main');
  var stateKey = 'rosa-fresca-pwa-v1';
  var state = loadState();
  var deferredInstall = null;

  function loadState() {
    var base = { completed: [], last: 'home', bookmarks: [], notes: {}, theme: 'light', scale: '1', teacher: false, poemView: 'originale', quiz: {} };
    try { return Object.assign(base, JSON.parse(localStorage.getItem(stateKey) || '{}')); } catch (e) { return base; }
  }
  function save() { localStorage.setItem(stateKey, JSON.stringify(state)); updateProgress(); }
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>\"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[c]; }); }
  function qs(s, root) { return (root || document).querySelector(s); }
  function qsa(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function toast(message) { var el = qs('#toast'); el.textContent = message; el.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(function () { el.hidden = true; }, 2600); }
  function sectionById(id) { return D.sections.find(function (s) { return s.id === id; }); }
  function picture(sceneId, eager) {
    var s = D.scenes[sceneId];
    return '<figure class="story-frame"><picture><img src="assets/scenes/' + s.file + '.svg" alt="' + esc(s.alt) + '" ' + (eager ? 'fetchpriority="high"' : 'loading="lazy"') + '></picture><figcaption><strong>' + esc(s.title) + '</strong><span>' + esc(s.caption) + '</span><small>' + esc(D.visualNotice) + '</small></figcaption></figure>';
  }
  function openSceneInfo(sceneId) {
    var s = D.scenes[sceneId];
    qs('#sceneDialogTitle').textContent = s.title;
    qs('#sceneDialogBase').textContent = s.base;
    qs('#sceneDialogChoice').textContent = s.choice;
    qs('#sceneDialogRefs').textContent = s.refs;
    qs('#sceneDialog').showModal();
  }
  function pageHead(kicker, title, lead) {
    return '<header class="page-head"><span class="eyebrow">' + esc(kicker) + '</span><h1>' + esc(title) + '</h1><p>' + esc(lead) + '</p></header>';
  }
  function routeLink(id, label, cls) { return '<a class="' + (cls || 'primary-button') + '" href="#' + id + '">' + label + '</a>'; }

  function renderHome() {
    main.innerHTML = '<article class="home-page">' +
      '<section class="hero"><div class="hero-copy"><span class="eyebrow">Letteratura italiana · XIII secolo</span><h1>Rosa fresca<br><em>aulentissima</em></h1><p class="hero-deck">L’amore cortese scende in strada. La parola diventa desiderio, duello e teatro sociale.</p><div class="hero-actions">' + routeLink('mondo-precedente', 'Inizia la lezione →') + '<button class="secondary-button" data-action="resume">Riprendi</button></div><dl class="hero-facts"><div><dt>1231–1250</dt><dd>datazione prudente</dd></div><div><dt>32</dt><dd>strofe dialogate</dd></div><div><dt>AAABB</dt><dd>schema metrico</dd></div></dl></div>' + picture('01-borgo', true) + '</section>' +
      '<section class="question-panel"><span class="eyebrow">La domanda generatrice</span><h2>' + esc(D.question) + '</h2><p>Non cercare subito una morale. Segui lo slittamento delle parole: dalla rosa al frutto, dalla supplica alla pressione, dal codice cortese al borgo.</p></section>' +
      '<section class="route-grid">' + D.sections.map(function (s) { return '<a href="#' + s.id + '"><span>' + s.number + '</span><strong>' + esc(s.title) + '</strong><small>' + esc(s.kicker) + '</small></a>'; }).join('') + '</section>' +
      '<section class="method-strip"><div><span class="eyebrow">Metodo</span><h2>Tre livelli, mai confusi</h2></div><ul><li><b>Documento</b> — ciò che il testo e le fonti attestano.</li><li><b>Ipotesi</b> — ciò che gli indizi rendono plausibile.</li><li><b>Interpretazione</b> — una lettura argomentata, non un fatto.</li></ul></section></article>';
    bindCommon();
  }

  function lessonParagraphs(s) {
    var sceneIds = Object.keys(D.scenes);
    return s.lesson.map(function (p, i) {
      var visual = '';
      if (i === 2 && s.id !== 'duello') visual = picture(sceneIds[Math.min(sceneIds.length - 1, Number(s.number))], false);
      return '<section class="lesson-step"><span class="step-number">' + String(i + 1).padStart(2, '0') + '</span><p>' + esc(p) + '</p>' + visual + '</section>';
    }).join('');
  }
  function renderSection(s) {
    var complete = state.completed.indexOf(s.id) !== -1;
    main.innerHTML = '<article class="lesson-page" data-section="' + s.id + '">' + pageHead(s.number + ' · ' + s.kicker, s.title, s.lead) +
      (s.id === 'duello' ? renderActs() : lessonParagraphs(s)) +
      '<section class="summary-card"><span class="eyebrow">Sintesi</span><h2>Fissa il movimento</h2><p>' + esc(s.summary) + '</p></section>' +
      '<section class="essentials"><div><span class="eyebrow">Saperi irrinunciabili</span><h2>Sei idee da portare via</h2></div><ol>' + s.essentials.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol></section>' +
      '<section class="tool-row"><button class="secondary-button" data-map="' + s.id + '">Apri la mappa</button><button class="secondary-button" data-action="bookmark" data-id="' + s.id + '">' + (state.bookmarks.indexOf(s.id) >= 0 ? 'Rimuovi segnalibro' : 'Salva segnalibro') + '</button><button class="secondary-button" data-action="listen">Ascolta la sintesi</button></section>' +
      '<details class="vocab"><summary>Lessico della lezione</summary><dl>' + s.vocab.map(function (v) { return '<div><dt>' + esc(v[0]) + '</dt><dd>' + esc(v[1]) + '</dd></div>'; }).join('') + '</dl></details>' +
      renderQuiz(s.quiz, 'section-' + s.id, 'Verifica del movimento') +
      '<section class="note-card"><label for="note-' + s.id + '"><span class="eyebrow">Taccuino</span><strong>La tua osservazione</strong></label><textarea id="note-' + s.id + '" data-note="' + s.id + '" placeholder="Un verso, una domanda, un dubbio…">' + esc(state.notes[s.id] || '') + '</textarea><small>Salvataggio automatico sul dispositivo.</small></section>' +
      '<nav class="lesson-footer"><button class="complete-button ' + (complete ? 'is-complete' : '') + '" data-complete="' + s.id + '">' + (complete ? '✓ Movimento completato' : 'Segna come completato') + '</button>' + nextLink(s.id) + '</nav></article>';
    bindCommon(); bindQuiz('section-' + s.id, s.quiz); bindNotes();
  }

  function renderActs() {
    return '<section class="acts" aria-label="Sei atti del contrasto">' + D.acts.map(function (a, index) {
      var scene = D.scenes[a.scene];
      return '<article class="act-card"><div class="act-image">' + picture(a.scene, false) + '<button class="source-chip" data-scene="' + a.scene + '">Come è stata costruita?</button></div><div class="act-copy"><span class="eyebrow">Atto ' + a.id + ' · ' + esc(a.range) + '</span><h2>' + esc(a.title) + '</h2><div class="registers"><p><small>Corte</small>' + esc(a.court) + '</p><span aria-hidden="true">↯</span><p><small>Borgo</small>' + esc(a.street) + '</p></div><blockquote>' + esc(a.question) + '</blockquote><a class="text-link" href="#testo?atto=' + a.id + '">Leggi le strofe dell’atto →</a></div></article>';
    }).join('') + '</section>';
  }
  function nextLink(id) {
    var idx = D.sections.findIndex(function (s) { return s.id === id; });
    var next = D.sections[idx + 1];
    return routeLink(next ? next.id : 'finale', next ? 'Continua: ' + esc(next.title) + ' →' : 'Vai alla verifica finale →');
  }

  function renderQuiz(questions, key, title) {
    return '<section class="quiz-card" data-quiz="' + key + '"><span class="eyebrow">Controllo formativo</span><h2>' + esc(title) + '</h2><p class="quiz-intro">Rispondi senza fretta: se sbagli, ricevi una spiegazione e puoi riprovare solo gli item da recuperare.</p><div class="quiz-questions">' + questions.map(function (q, i) {
      return '<fieldset data-q="' + i + '"><legend><span>' + (i + 1) + '</span>' + esc(q.q || q[0]) + '</legend>' + (q.o || q[1]).map(function (o, j) { return '<label><input type="radio" name="' + key + '-' + i + '" value="' + j + '"><span>' + esc(o) + '</span></label>'; }).join('') + '<div class="feedback" hidden></div></fieldset>';
    }).join('') + '</div><button class="primary-button" data-grade="' + key + '">Correggi</button><div class="quiz-result" aria-live="polite"></div></section>';
  }
  function bindQuiz(key, questions) {
    var root = qs('[data-quiz="' + key + '"]'); if (!root) return;
    qs('[data-grade]', root).addEventListener('click', function () {
      var answers = questions.map(function (_, i) { var c = qs('input[name="' + key + '-' + i + '"]:checked', root); return c ? Number(c.value) : -1; });
      var normalized = questions.map(function (q) { return Array.isArray(q) ? { q: q[0], o: q[1], a: q[2], f: '' } : q; });
      var result = L.evaluate(normalized, answers); state.quiz[key] = result; save();
      normalized.forEach(function (q, i) { var box = qs('[data-q="' + i + '"]', root); var fb = qs('.feedback', box); var ok = answers[i] === q.a; box.classList.toggle('correct', ok); box.classList.toggle('wrong', !ok); fb.hidden = false; fb.innerHTML = ok ? '✓ ' + esc(q.f || 'Risposta corretta.') : '<b>Da rivedere.</b> ' + esc(q.f || 'Rileggi il passaggio collegato.'); });
      var out = qs('.quiz-result', root); out.innerHTML = '<strong>' + result.correct + '/' + result.total + ' · ' + result.percentage + '% · voto indicativo ' + result.vote + '/10</strong>' + (result.wrong.length ? '<p>Recupera gli item evidenziati e correggi la tua scelta.</p>' : '<p>Ottimo: tutte le relazioni fondamentali sono chiare.</p>');
      out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function renderPoem() {
    var params = new URLSearchParams(location.hash.split('?')[1] || '');
    var actFilter = Number(params.get('atto') || 0);
    var stanzas = actFilter ? P.stanzas.filter(function (x) { return x.act === actFilter; }) : P.stanzas;
    main.innerHTML = '<article class="poem-page">' + pageHead('Il testo integrale', 'Trentadue mosse, due voci', 'Testo e parafrasi scorrono insieme. I colori indicano le voci, non un giudizio sui personaggi.') +
      '<div class="poem-toolbar"><div class="segmented"><button data-poem-view="originale">Originale</button><button data-poem-view="affiancato">Affiancato</button><button data-poem-view="parafrasi">Parafrasi</button></div><select id="actFilter" aria-label="Filtra per atto"><option value="0">Tutti gli atti</option>' + D.acts.map(function (a) { return '<option value="' + a.id + '"' + (a.id === actFilter ? ' selected' : '') + '>Atto ' + a.id + ' · ' + esc(a.title) + '</option>'; }).join('') + '</select></div>' +
      '<div class="poem-legend"><span class="man">Uomo</span><span class="woman">Donna</span><span>Le parentesi quadre segnalano integrazioni editoriali nella fonte adottata.</span></div>' +
      '<section class="stanza-list view-' + esc(state.poemView) + '">' + stanzas.map(function (s) { return '<article class="stanza ' + (s.speaker === 'Uomo' ? 'man' : 'woman') + '" id="strofa-' + s.number + '"><header><span>' + s.speaker + '</span><strong>' + String(s.number).padStart(2, '0') + '</strong></header><div class="original">' + s.lines.map(function (l, i) { return '<p><sup>' + ((s.number - 1) * 5 + i + 1) + '</sup>' + esc(l) + '</p>'; }).join('') + '</div><div class="paraphrase"><small>Parafrasi</small><p>' + esc(s.paraphrase) + '</p></div></article>'; }).join('') + '</section></article>';
    qsa('[data-poem-view]').forEach(function (b) { b.classList.toggle('active', b.dataset.poemView === state.poemView); b.addEventListener('click', function () { state.poemView = b.dataset.poemView; save(); renderPoem(); }); });
    qs('#actFilter').addEventListener('change', function (e) { location.hash = 'testo' + (Number(e.target.value) ? '?atto=' + e.target.value : ''); });
    bindCommon();
  }

  function finalQuestions() { return D.finalQuiz.map(function (q) { return { q: q[0], o: q[1], a: q[2], f: 'Confronta la risposta con i saperi irrinunciabili della lezione.' }; }); }
  function renderFinal() {
    var qsFinal = finalQuestions();
    main.innerHTML = '<article class="final-page">' + pageHead('Verifica finale', 'Quindici domande per ricomporre il percorso', 'La valutazione è trasparente; gli errori restano ripetibili e diventano una traccia di recupero.') + renderQuiz(qsFinal, 'final', 'Verifica sommativa') + '<section class="oral-card"><span class="eyebrow">Verso l’orale</span><h2>Argomenta in tre minuti</h2><p>Spiega perché il Contrasto non distrugge semplicemente l’amor cortese, ma lo usa come uno specchio capace di rivelarne desiderio, gerarchie e potere.</p><button class="secondary-button" data-action="timer">Avvia timer 3:00</button><output id="oralTimer">03:00</output></section></article>';
    bindQuiz('final', qsFinal); bindCommon();
  }

  function renderNotebook() {
    var saved = D.sections.filter(function (s) { return state.bookmarks.indexOf(s.id) >= 0; });
    main.innerHTML = '<article class="notebook-page">' + pageHead('Il tuo taccuino', 'Note e segnalibri', 'Tutto resta sul dispositivo: nessun dato viene inviato a un server.') + '<section class="notebook-grid"><div><h2>Segnalibri</h2>' + (saved.length ? saved.map(function (s) { return '<a class="saved-item" href="#' + s.id + '"><span>' + s.number + '</span><strong>' + esc(s.title) + '</strong></a>'; }).join('') : '<p class="empty">Non hai ancora salvato movimenti.</p>') + '</div><div><h2>Note</h2>' + D.sections.filter(function (s) { return state.notes[s.id]; }).map(function (s) { return '<article class="saved-note"><a href="#' + s.id + '">' + esc(s.title) + '</a><p>' + esc(state.notes[s.id]) + '</p></article>'; }).join('') + '</div></section><button class="secondary-button" data-action="export">Esporta appunti (.txt)</button></article>'; bindCommon();
  }

  function renderSources() {
    main.innerHTML = '<article class="sources-page">' + pageHead('Fonti e crediti', 'Da dove viene questa lezione', 'La pagina originale resta il punto di partenza; le integrazioni servono a renderne esplicito il grado di certezza.') +
      '<section class="source-list"><article><span>Fonte didattica</span><h2>Lezione originale gbprof</h2><p>Struttura, intuizione “dalla corte al borgo”, testo e parafrasi sono stati preservati e migliorati.</p><a href="' + esc(P.sourceUrl) + '" target="_blank" rel="noopener">Apri la lezione originale ↗</a></article><article><span>Fonte primaria</span><h2>Vaticano latino 3793</h2><p>Il codice digitalizzato è consultabile alla Biblioteca Apostolica Vaticana. Non è incorporato in questa PWA per rispettarne le condizioni di riuso.</p><a href="https://digi.vatlib.it/view/MSS_Vat.lat.3793" target="_blank" rel="noopener">Consulta il manoscritto ↗</a></article><article><span>Approfondimento autorevole</span><h2>Treccani</h2><p>Federiciana, Dizionario biografico ed Enciclopedia dantesca sostengono la ricostruzione filologica e storica.</p><a href="https://www.treccani.it/enciclopedia/cielo-d-alcamo_(Federiciana)/" target="_blank" rel="noopener">Apri la voce ↗</a></article></section>' +
      '<section class="credits"><h2>Immagini</h2><p>Le otto scene sono ricostruzioni visuali generate con IA sotto direzione editoriale. Non sono documenti medievali. Ogni scena dichiara base testuale, scelta visuale e riferimenti.</p><div class="scene-credit-grid">' + Object.keys(D.scenes).map(function (id) { var s = D.scenes[id]; return '<button data-scene="' + id + '"><img src="assets/scenes/' + s.file + '.svg" alt=""><span>' + esc(s.title) + '</span></button>'; }).join('') + '</div></section></article>'; bindCommon();
  }

  function renderSearchResults(query) {
    var root = qs('#searchResults'); var q = query.trim().toLowerCase();
    if (!q) { root.innerHTML = '<p class="empty">Scrivi almeno due caratteri.</p>'; return; }
    var results = [];
    D.sections.forEach(function (s) { var hay = [s.title, s.lead, s.summary].concat(s.lesson, s.essentials).join(' ').toLowerCase(); if (hay.indexOf(q) >= 0) results.push({ href: '#' + s.id, title: s.title, meta: s.kicker }); });
    P.stanzas.forEach(function (s) { var hay = s.lines.join(' ').toLowerCase() + ' ' + s.paraphrase.toLowerCase(); if (hay.indexOf(q) >= 0) results.push({ href: '#testo', title: 'Strofa ' + s.number + ' · ' + s.speaker, meta: s.lines[0] }); });
    root.innerHTML = results.length ? results.slice(0, 24).map(function (r) { return '<a href="' + r.href + '"><strong>' + esc(r.title) + '</strong><span>' + esc(r.meta) + '</span></a>'; }).join('') : '<p class="empty">Nessun risultato.</p>';
  }

  function bindNotes() { qsa('[data-note]').forEach(function (el) { el.addEventListener('input', function () { state.notes[el.dataset.note] = el.value; save(); }); }); }
  function bindCommon() {
    qsa('[data-map]').forEach(function (b) { b.addEventListener('click', function () { var s = sectionById(b.dataset.map); qs('#mapDialogTitle').textContent = s.title; qs('#mapDialogImage').src = s.map; qs('#mapDialogImage').alt = s.mapAlt; qs('#mapDialogDescription').textContent = s.mapAlt; qs('#mapDialog').showModal(); }); });
    qsa('[data-scene]').forEach(function (b) { b.addEventListener('click', function () { openSceneInfo(b.dataset.scene); }); });
    qsa('[data-complete]').forEach(function (b) { b.addEventListener('click', function () { var id = b.dataset.complete; var i = state.completed.indexOf(id); if (i >= 0) state.completed.splice(i, 1); else state.completed.push(id); save(); renderRoute(); }); });
    qsa('[data-action="bookmark"]').forEach(function (b) { b.addEventListener('click', function () { var id = b.dataset.id; var i = state.bookmarks.indexOf(id); if (i >= 0) state.bookmarks.splice(i, 1); else state.bookmarks.push(id); save(); renderRoute(); }); });
    qsa('[data-action="listen"]').forEach(function (b) { b.addEventListener('click', function () { var s = sectionById(currentRoute().id); if (!('speechSynthesis' in window)) return toast('Sintesi vocale non disponibile.'); speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(s.summary)); }); });
    qsa('[data-action="resume"]').forEach(function (b) { b.addEventListener('click', function () { location.hash = state.last || 'home'; }); });
    qsa('[data-action="export"]').forEach(function (b) { b.addEventListener('click', exportNotes); });
    qsa('[data-action="timer"]').forEach(function (b) { b.addEventListener('click', startTimer); });
  }
  function exportNotes() {
    var text = D.title + '\n\n' + D.sections.map(function (s) { return s.title + '\n' + (state.notes[s.id] || '—'); }).join('\n\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' })); a.download = 'taccuino-rosa-fresca.txt'; a.click(); URL.revokeObjectURL(a.href);
  }
  function startTimer() { var seconds = 180; var out = qs('#oralTimer'); var button = qs('[data-action="timer"]'); button.disabled = true; var tick = setInterval(function () { seconds -= 1; out.textContent = String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0'); if (seconds <= 0) { clearInterval(tick); button.disabled = false; toast('Tempo concluso.'); } }, 1000); }

  function currentRoute() { var raw = (location.hash || '#home').slice(1); return { id: raw.split('?')[0] || 'home' }; }
  function renderRoute() {
    var id = currentRoute().id; state.last = id; save();
    if (id === 'home') renderHome(); else if (id === 'testo') renderPoem(); else if (id === 'finale') renderFinal(); else if (id === 'taccuino') renderNotebook(); else if (id === 'fonti') renderSources(); else { var s = sectionById(id); if (s) renderSection(s); else renderHome(); }
    qsa('[data-route]').forEach(function (a) { a.classList.toggle('active', a.dataset.route === id); });
    closeMenu(); window.scrollTo(0, 0); main.focus({ preventScroll: true }); document.title = (id === 'home' ? D.title : ((sectionById(id) || {}).title || 'Rosa fresca')) + ' · Lezione gbprof';
  }
  function updateProgress() { var n = state.completed.length; qs('#progressLabel').textContent = n + ' di ' + D.sections.length + ' movimenti'; qs('#progressBar').style.width = Math.round(n / D.sections.length * 100) + '%'; }
  function applyPrefs() { document.documentElement.dataset.theme = state.theme; document.documentElement.style.setProperty('--font-scale', state.scale); qsa('[data-theme]').forEach(function (b) { b.classList.toggle('active', b.dataset.theme === state.theme); }); qsa('[data-scale]').forEach(function (b) { b.classList.toggle('active', b.dataset.scale === state.scale); }); qs('#teacherButton').classList.toggle('active', state.teacher); qs('#teacherButton').setAttribute('aria-pressed', String(state.teacher)); document.body.classList.toggle('teacher-mode', state.teacher); }
  function openMenu() { qs('#sidebar').classList.add('open'); qs('#scrim').hidden = false; qs('#menuButton').setAttribute('aria-expanded', 'true'); }
  function closeMenu() { qs('#sidebar').classList.remove('open'); qs('#scrim').hidden = true; qs('#menuButton').setAttribute('aria-expanded', 'false'); }
  function initShell() {
    qs('#sectionNav').innerHTML = D.sections.map(function (s) { return '<a href="#' + s.id + '" data-route="' + s.id + '"><span>' + s.number + '</span> ' + esc(s.title) + '</a>'; }).join('');
    qs('#menuButton').addEventListener('click', function () { qs('#sidebar').classList.contains('open') ? closeMenu() : openMenu(); }); qs('#scrim').addEventListener('click', closeMenu);
    qs('#searchButton').addEventListener('click', function () { qs('#searchDialog').showModal(); setTimeout(function () { qs('#searchInput').focus(); }, 50); }); qs('#searchInput').addEventListener('input', function (e) { renderSearchResults(e.target.value); }); qs('#searchResults').addEventListener('click', function () { qs('#searchDialog').close(); });
    qs('#settingsButton').addEventListener('click', function () { qs('#settingsDialog').showModal(); });
    qsa('[data-theme]').forEach(function (b) { b.addEventListener('click', function () { state.theme = b.dataset.theme; save(); applyPrefs(); }); }); qsa('[data-scale]').forEach(function (b) { b.addEventListener('click', function () { state.scale = b.dataset.scale; save(); applyPrefs(); }); });
    qs('#teacherButton').addEventListener('click', function () { state.teacher = !state.teacher; save(); applyPrefs(); toast(state.teacher ? 'Modalità docente attiva: soluzioni e note metodologiche visibili.' : 'Modalità docente disattivata.'); });
    qs('#resetButton').addEventListener('click', function () { if (confirm('Azzerare note, progressi e risultati?')) { localStorage.removeItem(stateKey); state = loadState(); applyPrefs(); renderRoute(); qs('#settingsDialog').close(); } });
    qs('#resumeButton').addEventListener('click', function () { location.hash = state.last || 'home'; });
    window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredInstall = e; qs('#installButton').hidden = false; });
    qs('#installButton').addEventListener('click', function () { if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return qs('#installDialog').showModal(); if (deferredInstall) deferredInstall.prompt(); else qs('#installDialog').showModal(); });
    window.addEventListener('online', updateNetwork); window.addEventListener('offline', updateNetwork); window.addEventListener('hashchange', renderRoute); window.addEventListener('scroll', function () { var max = document.documentElement.scrollHeight - innerHeight; qs('#readingProgress').style.width = (max > 0 ? scrollY / max * 100 : 0) + '%'; }, { passive: true });
  }
  function updateNetwork() { qs('#networkStatus').hidden = navigator.onLine; }
  initShell(); applyPrefs(); updateProgress(); updateNetwork(); renderRoute();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js'); });
})();
