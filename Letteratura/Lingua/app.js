'use strict';
const KEY='gbprof-lingua-v1';
let state;
try{state=JSON.parse(localStorage.getItem(KEY))||{}}catch{state={}}
state.read ||= [];
state.labRead ||= [];
state.notes ||= {};
state.quiz ||= [];
state.last ||= '';
const main=document.getElementById('main');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}};
const shuffle=a=>a.map(v=>({v,k:Math.random()})).sort((a,b)=>a.k-b.k).map(x=>x.v);

function mapHTML(items,title='Mappa concettuale'){
  return `<section class="concept-map" aria-label="${esc(title)}">${items.map((x,i)=>`
    <div class="map-row"><span class="node ${i===0?'primary':i===items.length-1?'accent':''}">${esc(x[0])}</span><span class="relation">${esc(x[1]||'')}</span></div>
    ${i<items.length-1?'<div class="map-arrow" aria-hidden="true">↓</div>':''}`).join('')}</section>`;
}
function schemaHTML(rows){
  const [head,...rest]=rows;
  return `<div class="schema"><table><thead><tr>${head.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rest.map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function progressBox(){
  return `<div class="progress-box"><strong>${state.read.length}/${LESSONS.length} tappe lette</strong><progress max="${LESSONS.length}" value="${state.read.length}" aria-label="Progresso lezione"></progress><small>Gli approfondimenti completati: ${state.labRead.length}/${LABS.length}</small></div>`;
}
function home(){
  main.innerHTML=`
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Letteratura · III anno · Storia della lingua</p>
      <h1>Alle origini<br>dell’italiano</h1>
      <div class="hero-rule"></div>
      <p class="lead">Dal latino parlato ai primi documenti in volgare, fino alla lingua poetica dei Siciliani. Una lingua non nasce in un giorno: cambia, si mescola, entra nella scrittura e conquista prestigio.</p>
      <p class="question">Come si può vedere una lingua mentre si trasforma?</p>
    </div>
    <div class="hero-art" aria-label="Composizione grafica con forme latine e il Placito di Capua"></div>
  </section>
  <section class="doors" aria-label="Scegli il percorso">
    <a class="door lesson" href="#lezione"><span class="door-no">01</span><p class="eyebrow">Percorso guidato</p><h2>La lezione</h2><p>Sette tappe per capire il processo storico: latino vivo, mutamento, Appendix Probi, parole, contatti, primi testi, Scuola siciliana.</p><span class="enter">Entra nella lezione →</span></a>
    <a class="door deep" href="#approfondisci"><span class="door-no">02</span><p class="eyebrow">Laboratorio</p><h2>Approfondisci</h2><p>Smonta la lingua: vocali, consonanti, articoli, verbi, copisti e uso moderno. Qui la storia diventa grammatica e filologia.</p><span class="enter">Entra nel laboratorio →</span></a>
  </section>
  <section class="home-panel">
    <h2>La domanda che tiene insieme tutto</h2>
    <p>Nei materiali originali la storia della lingua serviva anche a continuare lo studio della grammatica nel triennio: questa PWA conserva quell’idea, ma separa il percorso fondamentale dagli approfondimenti tecnici. Ogni tappa contiene uno schema e una mappa concettuale; i laboratori mostrano come le regole emergono dalla storia.</p>
    <div class="lesson-nav"><a class="action primary" href="#mappe">Apri le mappe</a><a class="action rust" href="#verifica">Vai alla verifica</a></div>
  </section>
  `;
}
function lessonIndex(){
  main.innerHTML=`
  <section class="route-head"><div><p class="eyebrow">Porta 01 · percorso guidato</p><h1>La lezione</h1><p class="lead">Segui le tappe in ordine: ogni passaggio prepara il successivo.</p></div>${progressBox()}</section>
  <section class="cards">${LESSONS.map((s,i)=>`
    <a class="card" href="#l-${s.id}"><span class="card-num">0${i+1}</span><h3>${esc(s.title)}</h3><p>${esc(s.subtitle)}</p><span class="check">${state.read.includes(s.id)?'✓ letta':'Apri →'}</span></a>
  `).join('')}</section>
  <section class="home-panel"><h2>Il filo del percorso</h2>
  ${mapHTML([
    ['Latino vivo','non una lingua immobile'],
    ['Mutamento condiviso','non semplice errore'],
    ['Volgari romanzi','differenziazione'],
    ['Scrittura del volgare','nuove funzioni'],
    ['Letteratura','prestigio e modelli'],
    ['Italiano','esito storico']
  ],'Filo della lezione')}</section>`;
}
function lessonPage(s){
  const i=LESSONS.indexOf(s);
  state.last='l-'+s.id; save();
  main.innerHTML=`
  <div class="lesson-layout">
    <article class="article">
      <p class="eyebrow">Lezione · tappa ${i+1} di ${LESSONS.length}</p>
      <h1>${esc(s.title)}</h1>
      <p class="lead">${esc(s.intro)}</p>
      <div class="tabs" role="tablist" aria-label="Strumenti della tappa">
        <button data-tab="lesson" aria-pressed="true">Lezione</button>
        <button data-tab="schema" aria-pressed="false">Schema</button>
        <button data-tab="map" aria-pressed="false">Mappa</button>
        <button data-tab="notes" aria-pressed="false">Appunti</button>
      </div>
      <div id="study"></div>
      <div class="lesson-nav">
        ${i?`<a class="action" href="#l-${LESSONS[i-1].id}">← Tappa precedente</a>`:'<a class="action" href="#lezione">← Indice</a>'}
        ${i<LESSONS.length-1?`<a class="action primary" href="#l-${LESSONS[i+1].id}">Tappa successiva →</a>`:'<a class="action primary" href="#approfondisci">Vai agli approfondimenti →</a>'}
      </div>
    </article>
    <aside class="aside">
      <section class="panel"><span class="tag">In una frase</span><p>${esc(s.takeaway)}</p></section>
      <section class="panel">${progressBox()}<button id="read" class="action ${state.read.includes(s.id)?'':'primary'}" type="button">${state.read.includes(s.id)?'✓ Segnata come letta':'Segna come letta'}</button></section>
      <section class="panel"><h3>Collegamento</h3><p>Se vuoi vedere i meccanismi tecnici dietro questa tappa, apri la seconda porta.</p><a class="action" href="#approfondisci">Approfondisci</a></section>
    </aside>
  </div>`;
  const study=document.getElementById('study');
  const renderTab=k=>{
    document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.tab===k));
    if(k==='lesson') study.innerHTML=s.lesson+`<p class="source-note">Questa tappa rielabora i materiali di gbprof e li aggiorna secondo le fonti linguistiche indicate nella sezione “Fonti”.</p>`;
    if(k==='schema') study.innerHTML=`<h2>Schema essenziale</h2>${schemaHTML(s.schema)}`;
    if(k==='map') study.innerHTML=`<h2>Mappa concettuale</h2>${mapHTML(s.map,s.title)}`;
    if(k==='notes'){
      study.innerHTML=`<h2>I tuoi appunti</h2><p>Annota dubbi, esempi o collegamenti da riprendere in classe.</p><textarea class="notes" id="notes" aria-label="Appunti personali"></textarea><p id="note-status" role="status">Salvataggio locale automatico.</p>`;
      const n=document.getElementById('notes'); n.value=state.notes[s.id]||'';
      n.addEventListener('input',()=>{state.notes[s.id]=n.value;save();document.getElementById('note-status').textContent='Appunti salvati.'});
    }
  };
  document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>renderTab(b.dataset.tab)));
  renderTab('lesson');
  document.getElementById('read').addEventListener('click',()=>{
    state.read=state.read.includes(s.id)?state.read.filter(x=>x!==s.id):[...state.read,s.id]; save(); lessonPage(s);
  });
}
function labIndex(){
  main.innerHTML=`
  <section class="route-head"><div><p class="eyebrow">Porta 02 · laboratorio</p><h1>Approfondisci</h1><p class="lead">Non è obbligatorio seguire un ordine. Scegli il meccanismo che vuoi smontare e osserva come storia, grammatica e letteratura si incrociano.</p></div>${progressBox()}</section>
  <section class="lab-grid">${LABS.map((s,i)=>`
    <a class="lab-card" href="#a-${s.id}"><span class="tag">${esc(s.kicker)}</span><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p><strong>${state.labRead.includes(s.id)?'✓ esplorato':'Apri il laboratorio →'}</strong></a>
  `).join('')}</section>
  <section class="home-panel"><h2>Perché questa seconda porta?</h2><p>Nella dispensa originale il passaggio dal latino al volgare diventava un modo per riprendere fonologia, morfologia, ortografia e analisi di un testo medievale. Qui quell’intuizione è conservata, ma organizzata in laboratori autonomi per evitare che la lezione principale diventi un manuale di grammatica storica.</p></section>`;
}
function labPage(s){
  state.last='a-'+s.id; save();
  main.innerHTML=`
  <div class="lesson-layout">
  <article class="article">
    <p class="eyebrow">Approfondimento · ${esc(s.kicker)}</p><h1>${esc(s.title)}</h1><p class="lead">${esc(s.summary)}</p>
    ${s.body}
    <section class="mini-experiment"><h2>Prova tu</h2><p><strong>${esc(s.experiment.q)}</strong></p><div class="choice-grid">${s.experiment.options.map((o,i)=>`<button type="button" data-choice="${i}">${esc(o)}</button>`).join('')}</div><p id="exp-feedback" role="status"></p></section>
    <h2>Appunti del laboratorio</h2><textarea class="notes" id="lab-notes" aria-label="Appunti approfondimento"></textarea>
    <div class="lesson-nav"><a class="action" href="#approfondisci">← Tutti i laboratori</a><a class="action primary" href="#mappe">Mappe →</a></div>
  </article>
  <aside class="aside"><section class="panel"><span class="tag">Seconda porta</span><p>Questo laboratorio è facoltativo rispetto alla lezione guidata, ma utile per capire <em>perché</em> le forme linguistiche sono diventate ciò che sono.</p></section><section class="panel"><button id="lab-read" class="action ${state.labRead.includes(s.id)?'':'primary'}">${state.labRead.includes(s.id)?'✓ Esplorato':'Segna come esplorato'}</button></section></aside>
  </div>`;
  document.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('[data-choice]').forEach(x=>x.classList.remove('correct','wrong'));
    const ok=Number(b.dataset.choice)===s.experiment.correct;
    b.classList.add(ok?'correct':'wrong');
    if(!ok) document.querySelector(`[data-choice="${s.experiment.correct}"]`).classList.add('correct');
    document.getElementById('exp-feedback').textContent=(ok?'Corretto. ':'Da rivedere. ')+s.experiment.why;
  }));
  const n=document.getElementById('lab-notes'); n.value=state.notes['lab-'+s.id]||'';
  n.addEventListener('input',()=>{state.notes['lab-'+s.id]=n.value;save()});
  document.getElementById('lab-read').addEventListener('click',()=>{
    state.labRead=state.labRead.includes(s.id)?state.labRead.filter(x=>x!==s.id):[...state.labRead,s.id];save();labPage(s);
  });
}
function mapsPage(){
  main.innerHTML=`<section class="route-head"><div><p class="eyebrow">Schemi di sintesi</p><h1>Mappe concettuali</h1><p class="lead">Tre mappe generali e le mappe delle sette tappe. Le frecce indicano relazioni, non una semplice successione di parole.</p></div></section>
  ${MASTER_MAPS.map(m=>`<section class="home-panel"><h2>${esc(m.title)}</h2><div class="map-vertical">${m.nodes.map((n,i)=>`<div class="node ${i===0?'primary':i===m.nodes.length-1?'accent':''}"><strong>${esc(n[0])}</strong><br><small>${esc(n[1])}</small></div>${i<m.nodes.length-1?'<div class="map-arrow">→</div>':''}`).join('')}</div></section>`).join('')}
  <section class="home-panel"><h2>Mappe delle singole tappe</h2><div class="cards">${LESSONS.map((s,i)=>`<a class="card" href="#l-${s.id}"><span class="card-num">0${i+1}</span><h3>${esc(s.title)}</h3>${mapHTML(s.map,s.title)}</a>`).join('')}</div></section>`;
}
function quizPage(){
  const chosen=shuffle(QUIZ.map((_,i)=>i)).slice(0,10);
  main.innerHTML=`<section class="route-head"><div><p class="eyebrow">Verifica finale</p><h1>Hai seguito la trasformazione?</h1><p class="lead">Dieci domande estratte dal percorso. Dopo la correzione trovi la spiegazione di ogni risposta.</p></div></section>
  <section class="article quiz"><form id="quiz-form">${chosen.map((id,n)=>{const q=QUIZ[id];return `<fieldset><legend>${n+1}. ${esc(q.q)}</legend>${q.o.map((o,i)=>`<label class="option"><input type="radio" name="q${id}" value="${i}" required> <span>${esc(o)}</span></label>`).join('')}</fieldset>`}).join('')}<button class="action primary" type="submit">Correggi la verifica</button></form><div id="quiz-result" aria-live="polite"></div></section>`;
  document.getElementById('quiz-form').addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(e.target); let correct=0;
    const details=chosen.map(id=>{const q=QUIZ[id],ans=Number(fd.get('q'+id)),ok=ans===q.c;if(ok)correct++;return {q,ans,ok}});
    const vote=Math.max(1,Math.round(correct/10*10));
    state.quiz.push({date:new Date().toISOString(),correct,vote}); save();
    const r=document.getElementById('quiz-result');
    r.innerHTML=`<div class="result ${correct<6?'bad':''}"><h2>${correct}/10 · voto ${vote}/10</h2><p>${correct>=8?'Quadro molto solido.':correct>=6?'Le idee fondamentali ci sono; ripassa gli errori.':'Conviene tornare alla porta “Lezione” e ricostruire i nessi principali.'}</p></div>${details.map(x=>`<div class="feedback"><strong>${x.ok?'✓':'✗'} ${esc(x.q.q)}</strong><br><span>${esc(x.q.e)}</span></div>`).join('')}<p><a class="action" href="#lezione">Ripassa la lezione</a> <a class="action" href="#approfondisci">Apri gli approfondimenti</a></p>`;
    e.target.hidden=true; r.scrollIntoView({behavior:'smooth',block:'start'});
  });
}
function sourcesPage(){
  main.innerHTML=`<section class="route-head"><div><p class="eyebrow">Metodo e verifiche</p><h1>Fonti</h1><p class="lead">Il percorso parte dai materiali di gbprof ma distingue ciò che viene conservato da ciò che è stato corretto o precisato.</p></div></section>
  <section class="article sources"><h2>Materiali e fonti</h2><ul>${SOURCES.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener"><strong>${esc(s.label)}</strong></a><br>${esc(s.note)}</li>`).join('')}</ul>
  <h2>Che cosa è stato aggiornato</h2>
  <ul><li>Il “latino volgare” non è presentato come lingua separata del popolo, ma come insieme di varietà del latino.</li>
  <li>L’Appendix Probi è usata come fonte metalinguistica e non come prova che “gli errori degli ignoranti crearono l’italiano”.</li>
  <li>Il Placito di Capua (marzo 960) è presentato come tappa documentaria fondamentale, non come nascita improvvisa dell’italiano.</li>
  <li>I testi siciliani sono descritti come <em>toscanizzati</em> nella tradizione manoscritta, non semplicemente “tradotti”.</li>
  <li><em>UNUS</em> è correttamente definito numerale cardinale.</li>
  <li>La storia degli articoli e dei verbi è semplificata per uso didattico senza trasformare ricostruzioni complesse in regole assolute.</li></ul>
  </section>`;
}
function route(){
  const h=location.hash.slice(1)||'home';
  if(h==='home') home();
  else if(h==='lezione') lessonIndex();
  else if(h==='approfondisci') labIndex();
  else if(h==='mappe') mapsPage();
  else if(h==='verifica') quizPage();
  else if(h==='fonti') sourcesPage();
  else if(h.startsWith('l-')){const s=LESSONS.find(x=>x.id===h.slice(2));s?lessonPage(s):home()}
  else if(h.startsWith('a-')){const s=LABS.find(x=>x.id===h.slice(2));s?labPage(s):home()}
  else home();
  main.focus({preventScroll:true}); window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
document.getElementById('print').addEventListener('click',()=>window.print());
document.getElementById('reset').addEventListener('click',()=>{
  if(confirm('Cancellare progresso, appunti e risultati di questa PWA su questo dispositivo?')){localStorage.removeItem(KEY);state={read:[],labRead:[],notes:{},quiz:[],last:''};route()}
});
route();
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js').then(()=>navigator.serviceWorker.ready).then(()=>{document.getElementById('offline').textContent='Disponibile anche offline dopo il primo caricamento.'}).catch(()=>{document.getElementById('offline').textContent='Offline non confermato.'});
}
