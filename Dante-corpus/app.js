const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
let DATA = null;
let TEXT_CACHE = new Map();
let currentFilter = 'all';

const art = {
  'commedia':'🔥','vita-nuova':'♡','convivio':'▤','de-vulgari-eloquentia':'✒','monarchia':'♛','epistole':'✉','egloghe':'♬','quaestio':'◉','fiore':'✿','detto-amore':'◇'
};

async function init(){
  DATA = await fetch('data/dante-data.json').then(r=>r.json());
  renderWorks(); renderTopics(); renderMap(); renderFilters(); bindNav();
  $('#searchBtn').addEventListener('click', doSearch);
  $('#searchInput').addEventListener('keydown', e=>{ if(e.key==='Enter') doSearch(); });
  $('#closeDrawer').addEventListener('click', closeDrawer);
  $('#workDrawer').addEventListener('click', e=>{ if(e.target.id==='workDrawer') closeDrawer(); });
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('service-worker.js').catch(()=>{}); }
}

function bindNav(){
  $('#hamb').addEventListener('click',()=>$('.nav').classList.toggle('open'));
  const links=$$('.nav a');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ links.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+en.target.id)); }});
  },{rootMargin:'-40% 0px -55% 0px'});
  ['home','opere','temi','ricerca','mappe','vita','archivio'].forEach(id=>{ const el=$('#'+id); if(el) io.observe(el); });
}

function renderWorks(){
  const grid=$('#worksGrid'); grid.innerHTML='';
  DATA.works.forEach(w=>{
    const card=document.createElement('article'); card.className='work-card';
    card.innerHTML=`<div class="work-art">${art[w.slug]||'▤'}</div><div class="work-body">${w.caution?`<span class="badge">${esc(w.caution)}</span>`:''}<h3>${esc(w.title)}</h3><p>${esc(w.intro).slice(0,178)}…</p><p class="muted">${esc(w.type)} · ${esc(w.language)}</p><button data-open="${w.slug}">Scopri di più →</button></div>`;
    grid.appendChild(card);
  });
  grid.addEventListener('click', e=>{ const b=e.target.closest('[data-open]'); if(b) openWork(b.dataset.open); });
}

function renderTopics(){
  const c=$('#topicCloud'); c.innerHTML='';
  DATA.topics.forEach(t=>{
    const b=document.createElement('button'); b.className='topic-btn'; b.textContent=t.title; b.addEventListener('click',()=>openTopic(t.slug)); c.appendChild(b);
  });
}

function renderMap(){
  const map=$('#conceptMap'); map.innerHTML='';
  DATA.topics.forEach(t=>{
    const works=t.works.map(slug=>DATA.works.find(w=>w.slug===slug)?.title).filter(Boolean).join(' · ');
    const n=document.createElement('article'); n.className='map-node';
    n.innerHTML=`<h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><p class="muted">${esc(works)}</p>`;
    n.addEventListener('click',()=>openTopic(t.slug)); map.appendChild(n);
  });
}

function renderFilters(){
  const f=$('#searchFilters');
  const all=[{slug:'all',title:'Tutto il corpus'},...DATA.works.map(w=>({slug:w.slug,title:w.title}))];
  f.innerHTML=all.map(x=>`<button class="filter ${x.slug==='all'?'active':''}" data-filter="${x.slug}">${esc(x.title)}</button>`).join('');
  f.addEventListener('click',e=>{ const b=e.target.closest('[data-filter]'); if(!b) return; currentFilter=b.dataset.filter; $$('.filter').forEach(x=>x.classList.toggle('active',x===b)); });
}

async function loadText(w){
  if(TEXT_CACHE.has(w.slug)) return TEXT_CACHE.get(w.slug);
  const txt=await fetch(w.file).then(r=>r.text()); TEXT_CACHE.set(w.slug,txt); return txt;
}

async function doSearch(){
  const q=$('#searchInput').value.trim(); const res=$('#searchResults'); const status=$('#searchStatus'); res.innerHTML='';
  if(q.length<2){ status.textContent='Inserisci almeno due caratteri.'; return; }
  status.textContent='Ricerca in corso…';
  const words=currentFilter==='all'?DATA.works:DATA.works.filter(w=>w.slug===currentFilter);
  let hits=[]; const re=new RegExp(escapeReg(q),'gi');
  for(const w of words){
    const txt=await loadText(w); let m, count=0;
    while((m=re.exec(txt)) && count<8){
      const start=Math.max(0,m.index-150), end=Math.min(txt.length,m.index+q.length+170);
      let snip=txt.slice(start,end).replace(/\s+/g,' ').trim();
      snip=esc(snip).replace(new RegExp(escapeReg(q),'gi'), x=>`<mark>${esc(x)}</mark>`);
      hits.push({work:w.title,slug:w.slug,snippet:snip}); count++;
      if(hits.length>=80) break;
    }
  }
  status.textContent=hits.length?`${hits.length} risultati mostrati.`:'Nessun risultato trovato.';
  res.innerHTML=hits.map(h=>`<article class="result"><h4>${esc(h.work)}</h4><p>…${h.snippet}…</p><button class="topic-btn" data-open="${h.slug}">Apri opera</button></article>`).join('');
  res.onclick=e=>{ const b=e.target.closest('[data-open]'); if(b) openWork(b.dataset.open); };
}

function openTopic(slug){
  const t=DATA.topics.find(x=>x.slug===slug); if(!t) return;
  const html=`<div class="work-detail"><div class="work-hero"><p class="eyebrow">Percorso tematico</p><h2>${esc(t.title)}</h2><p>${esc(t.description)}</p></div><div class="cards-grid">${t.works.map(sl=>DATA.works.find(w=>w.slug===sl)).filter(Boolean).map(w=>`<article class="work-card"><div class="work-art">${art[w.slug]||'▤'}</div><div class="work-body"><h3>${esc(w.title)}</h3><p>${esc(w.intro).slice(0,160)}…</p><button data-open="${w.slug}">Apri opera →</button></div></article>`).join('')}</div></div>`;
  $('#workDetail').innerHTML=html; openDrawer(); $('#workDetail').onclick=e=>{ const b=e.target.closest('[data-open]'); if(b) openWork(b.dataset.open); };
}

async function openWork(slug){
  const w=DATA.works.find(x=>x.slug===slug); if(!w) return;
  const detail=$('#workDetail');
  detail.innerHTML=`<div class="work-detail"><div class="work-hero"><p class="eyebrow">${esc(w.type)}</p><h2>${esc(w.title)}</h2><p>${esc(w.intro)}</p>${w.caution?`<p class="mini-note"><strong>Avvertenza:</strong> ${esc(w.caution)}.</p>`:''}</div>${workTabs(w)}</div>`;
  openDrawer();
  bindTabs();
  $('#loadTextBtn')?.addEventListener('click', async()=>{
    const box=$('#fullTextBox'); box.textContent='Caricamento testo originale…'; const txt=await loadText(w); box.textContent=txt;
  });
  $('#sectionFilter')?.addEventListener('input', e=>filterSections(e.target.value));
}

function workTabs(w){
  return `<div class="tabs"><button class="tab active" data-tab="intro">Introduzione</button><button class="tab" data-tab="temi">Temi e vita</button><button class="tab" data-tab="sezioni">Riassunti</button><button class="tab" data-tab="moderno">Italiano moderno</button><button class="tab" data-tab="originale">Opera originale</button></div>
  <section class="tab-panel active" id="tab-intro"><div class="info-grid"><article class="info-card"><h3>Che cos’è</h3><p>${esc(w.type)} in ${esc(w.language)}.</p></article><article class="info-card"><h3>Fase della vita</h3><p>${esc(w.lifePhase)}</p></article><article class="info-card"><h3>Introduzione all’opera</h3><p>${esc(w.intro)}</p></article><article class="info-card"><h3>Uso nel percorso</h3><p>Questa sezione serve per collegare testo, temi, storia personale di Dante e sviluppo della sua visione del mondo.</p></article></div></section>
  <section class="tab-panel" id="tab-temi"><div class="info-grid"><article class="info-card"><h3>Tematiche</h3><p>${w.themes.map(x=>`<span class="topic-btn mini">${esc(x)}</span>`).join(' ')}</p></article><article class="info-card"><h3>Argomenti simili in altre opere</h3><p>${w.crossLinks.map(x=>`<span class="topic-btn mini">${esc(x)}</span>`).join(' ')}</p></article></div></section>
  <section class="tab-panel" id="tab-sezioni"><div class="text-toolbar"><input id="sectionFilter" placeholder="Filtra sezioni: es. Beatrice, Inferno, lingua, capitolo…"></div><div id="sectionsList">${sectionList(w)}</div></section>
  <section class="tab-panel" id="tab-moderno"><p class="mini-note"><strong>Nota di metodo.</strong> Qui trovi una traduzione/parafrasi didattica per sezioni: non sostituisce un’edizione critica o una traduzione integrale riga per riga; serve a rendere leggibile il passaggio prima del ritorno al testo originale.</p><div class="split-reader">${w.sections.slice(0,60).map(s=>`<article class="section-item"><h3>${esc(s.title)}</h3><p><strong>Originale, avvio:</strong> ${esc(s.incipit||'')}</p><p>${esc(s.modern||s.summary)}</p></article>`).join('')}</div></section>
  <section class="tab-panel" id="tab-originale"><div class="text-toolbar"><button id="loadTextBtn" class="btn gold small">Carica testo integrale</button><span class="muted">Il testo completo può essere lungo: viene caricato solo quando richiesto.</span></div><pre class="original-text" id="fullTextBox">Premi “Carica testo integrale”.</pre></section>`;
}

function sectionList(w){
  return w.sections.map(s=>`<article class="section-item" data-section-text="${esc((s.title+' '+s.summary+' '+s.incipit).toLowerCase())}"><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p>${s.incipit?`<p class="muted"><strong>Incipit:</strong> ${esc(s.incipit)}</p>`:''}</article>`).join('');
}
function filterSections(q){ q=q.toLowerCase().trim(); $$('#sectionsList .section-item').forEach(el=>{ el.style.display= !q || el.dataset.sectionText.includes(q) ? '' : 'none'; }); }
function bindTabs(){ $$('.tab').forEach(b=>b.addEventListener('click',()=>{ $$('.tab').forEach(x=>x.classList.remove('active')); $$('.tab-panel').forEach(x=>x.classList.remove('active')); b.classList.add('active'); $('#tab-'+b.dataset.tab).classList.add('active'); })); }
function openDrawer(){ const d=$('#workDrawer'); d.classList.add('open'); d.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeDrawer(){ const d=$('#workDrawer'); d.classList.remove('open'); d.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
function esc(s){ return String(s??'').replace(/[&<>"]/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

init();
