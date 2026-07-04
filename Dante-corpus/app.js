let DATA=null, SEARCH=[];
const $=sel=>document.querySelector(sel);
const $$=sel=>Array.from(document.querySelectorAll(sel));
const esc=s=>(s??'').toString().replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
async function loadData(){
  DATA=await fetch('data/dante-data.json').then(r=>r.json());
  SEARCH=await fetch('data/search-index.json').then(r=>r.json());
}
function themeById(id){return DATA.themes.find(t=>t.id===id)}
function workById(id){return DATA.works.find(w=>w.id===id)}
function renderWorkCards(){
 const mount=$('#workCards');
 const iconMap={'commedia':'🔥','vita-nuova':'♡','convivio':'▤','de-vulgari-eloquentia':'✒','monarchia':'♛','epistole':'✉','egloghe':'♬','quaestio':'☄','fiore':'❧','detto-amore':'◇'};
 mount.innerHTML=DATA.works.filter(w=>['commedia','vita-nuova','convivio','de-vulgari-eloquentia','monarchia','epistole'].includes(w.id)).map(w=>`<article class="workCard"><div class="icon">${iconMap[w.id]||'▣'}</div><h3>${esc(w.title)}</h3><p>${esc(w.intro)}</p><div class="metaPills">${w.themes.slice(0,3).map(t=>`<span class="pill">${esc(themeById(t)?.title||t)}</span>`).join('')}</div><div class="cardActions"><a class="smallBtn" href="#reader?work=${w.id}">Apri opera</a><a class="smallBtn" href="#temi" data-theme="${w.themes[0]}">Temi collegati</a></div></article>`).join('');
 renderCommediaNavigator('inferno');
}
function renderCommediaNavigator(cantica){
 const w=workById('commedia'); const mount=$('#commediaNavigator');
 const groups=w.cantiche;
 const active=groups.find(g=>g.id===cantica)||groups[0];
 mount.innerHTML=`<h3>Divina Commedia: cantiche e canti</h3><p>${esc(active.description)}</p><div class="canticaTabs">${groups.map(g=>`<button class="tab ${g.id===active.id?'active':''}" data-cantica="${g.id}">${g.title}</button>`).join('')}</div><div class="cantoGrid">${active.canti.map(c=>`<a class="cantoLink" href="${c.route}">${c.cantoRoman}<br><small>${c.themes.slice(0,1).map(t=>themeById(t)?.title||t)}</small></a>`).join('')}</div>`;
 $$('#commediaNavigator .tab').forEach(b=>b.onclick=()=>renderCommediaNavigator(b.dataset.cantica));
}
function renderThemes(selected){
 const chips=$('#themeChips');
 selected=selected||DATA.themes[0].id;
 chips.innerHTML=DATA.themes.map(t=>`<button class="chip ${t.id===selected?'active':''}" data-theme="${t.id}">${t.icon} ${t.title}</button>`).join('');
 $$('#themeChips .chip').forEach(c=>c.onclick=()=>renderThemes(c.dataset.theme));
 const t=themeById(selected);
 $('#themePanel').innerHTML=`<div class="themeTitle"><div class="themeIcon">${t.icon}</div><div><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p></div></div><div class="occGrid">${t.occurrences.map(o=>`<a class="occCard" href="${o.route}"><h4>${esc(o.label)}</h4><p>${esc(o.reason)}</p><span class="smallBtn">Apri il luogo preciso →</span></a>`).join('')||'<p>Nessun collegamento ancora registrato.</p>'}</div>`;
}
function renderLife(){
 $('#lifeTimeline').innerHTML=DATA.lifePhases.map(p=>`<article class="phase"><div class="years">${p.years}</div><div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div class="metaPills">${p.works.map(id=>`<span class="pill">${esc(workById(id)?.title||id)}</span>`).join('')}</div><div class="phaseLinks">${p.links.map(l=>`<a class="smallBtn" href="${l.route}">${esc(l.label)}</a>`).join('')}</div></div></article>`).join('');
}
function renderMap(selected){
 selected=selected||DATA.themes[0].id;
 const mount=$('#conceptMap');
 const nodes=DATA.conceptMap.nodes;
 const n=nodes.length; const cx=50, cy=50, rx=38, ry=38;
 const pos={}; nodes.forEach((node,i)=>{const a=-Math.PI/2+i*2*Math.PI/n; pos[node.id]={x:cx+rx*Math.cos(a),y:cy+ry*Math.sin(a)}});
 const svg=`<svg class="mapLines" viewBox="0 0 100 100" preserveAspectRatio="none">${DATA.conceptMap.edges.map(([a,b])=>`<line x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}" stroke="rgba(215,168,93,.24)" stroke-width=".25"/>`).join('')}</svg>`;
 mount.innerHTML=svg+nodes.map(node=>`<button class="mapNode ${node.id===selected?'active':''}" style="left:${pos[node.id].x}%;top:${pos[node.id].y}%" data-theme="${node.id}"><span>${node.icon}</span><small>${esc(node.title)}</small></button>`).join('');
 $$('#conceptMap .mapNode').forEach(n=>n.onclick=()=>renderMap(n.dataset.theme));
 const t=themeById(selected);
 $('#mapInfo').innerHTML=`<h3>${t.icon} ${esc(t.title)}</h3><p>${esc(t.desc)}</p><div class="phaseLinks">${t.occurrences.slice(0,8).map(o=>`<a class="smallBtn" href="${o.route}">${esc(o.label)}</a>`).join('')}</div>`;
}
function normalize(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function renderSearch(q){
 const mount=$('#searchResults'); q=(q||$('#searchInput').value||'').trim();
 if(!q){mount.innerHTML='<p class="emptyReader">Scrivi una parola o un tema.</p>';return}
 const nq=normalize(q); const terms=nq.split(/\s+/).filter(Boolean);
 const res=SEARCH.map(item=>{const txt=normalize(item.text); let score=0; terms.forEach(t=>{if(txt.includes(t)) score+=2; if(normalize(item.title).includes(t)) score+=5; (item.themes||[]).forEach(th=>{if(normalize(themeById(th)?.title||th).includes(t)) score+=3})}); return {...item,score}}).filter(r=>r.score>0).sort((a,b)=>b.score-a.score).slice(0,60);
 mount.innerHTML=res.length?res.map(r=>`<a class="resultCard" href="${r.route}"><h3>${esc(r.title)}</h3><p>${snippet(r.text,q)}</p><div class="metaPills">${(r.themes||[]).slice(0,4).map(t=>`<span class="pill">${esc(themeById(t)?.title||t)}</span>`).join('')}</div></a>`).join(''):'<p class="emptyReader">Nessun risultato.</p>';
}
function snippet(text,q){
 const nt=normalize(text), nq=normalize(q); let i=nt.indexOf(nq); if(i<0)i=0; const start=Math.max(0,i-90); let s=text.slice(start,start+260); return esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),m=>`<mark>${m}</mark>`)+'…';
}
async function fetchText(path){return await fetch(path).then(r=>r.text())}
function parseQuery(hash){
 const idx=hash.indexOf('?'); if(idx<0)return{}; return Object.fromEntries(new URLSearchParams(hash.slice(idx+1)).entries());
}
async function renderReader(){
 const q=parseQuery(location.hash); const workId=q.work||'commedia'; const work=workById(workId); if(!work)return;
 let unit=null, text='';
 if(workId==='commedia'){
   const cantica=q.cantica||'inferno'; const canto=Number(q.canto||1);
   unit=DATA.readingUnits.find(u=>u.cantica===cantica && u.canto===canto) || DATA.readingUnits[0];
   text=await fetchText(unit.file);
 } else {
   const sectionId=q.section||'';
   const section=(work.sections||[]).find(s=>s.id===sectionId);
   if(section && section.file){ text=await fetchText(section.file); } else { text=await fetchText(work.file); }
   if(section){ work._activeSection=section; } else { delete work._activeSection; }
 }
 const title=workId==='commedia'?`${unit.title} — Divina Commedia`:(work._activeSection?`${work.title} — ${work._activeSection.title}`:work.title);
 const themes=workId==='commedia'?unit.themes:work.themes;
 const intro=workId==='commedia'?unit.summary:(work._activeSection?work._activeSection.summary:work.intro);
 const guide=workId==='commedia'?unit.modernGuide:`Guida in italiano moderno: ${work._activeSection?work._activeSection.summary:work.intro} In questa opera il lettore deve seguire soprattutto questi nuclei: ${work.themes.map(t=>themeById(t)?.title||t).join(', ')}.`;
 const related=work.related||[];
 const controls=workId==='commedia'?commediaControls(unit):workControls(work,q.section);
 $('#readerMount').innerHTML=`<div class="readerHeader"><div><p class="eyebrow">Lettore</p><h2>${esc(title)}</h2><div class="metaPills">${themes.map(t=>`<a class="pill" href="#temi" data-theme="${t}">${esc(themeById(t)?.title||t)}</a>`).join('')}</div></div>${controls}</div><div class="readerGrid"><aside class="readerAside"><div class="infoBox"><h3>Introduzione / riassunto</h3><p>${esc(intro)}</p></div><div class="infoBox"><h3>Fase nella vita di Dante</h3><p>${esc(work.lifePhase)}</p></div><div class="infoBox"><h3>Italiano moderno</h3><p>${esc(guide)}</p></div><div class="infoBox"><h3>Argomenti simili in altre opere</h3><div class="phaseLinks">${related.map(r=>`<a class="smallBtn" href="${r.route}">${esc(r.title)}</a>`).join('')||'<span class="muted">Nessun collegamento.</span>'}</div></div>${workId==='commedia'?`<div class="infoBox"><h3>Rubrica antica</h3><p>${esc(unit.rubric||'—')}</p></div>`:''}</aside><div class="textPane"><h3>Opera originale</h3><pre>${esc(text)}</pre></div></div>`;
 $('#reader').scrollIntoView({behavior:'smooth'});
}
function commediaControls(unit){
 const all=DATA.readingUnits.filter(u=>u.cantica===unit.cantica); const prev=DATA.readingUnits.find(u=>u.cantica===unit.cantica&&u.canto===unit.canto-1); const next=DATA.readingUnits.find(u=>u.cantica===unit.cantica&&u.canto===unit.canto+1);
 const cantiche=['inferno','purgatorio','paradiso'];
 return `<div class="selectRow"><select id="selCantica">${cantiche.map(c=>`<option value="${c}" ${c===unit.cantica?'selected':''}>${c[0].toUpperCase()+c.slice(1)}</option>`).join('')}</select><select id="selCanto">${all.map(u=>`<option value="${u.canto}" ${u.canto===unit.canto?'selected':''}>Canto ${u.cantoRoman}</option>`).join('')}</select>${prev?`<a class="smallBtn" href="${prev.route}">← prec.</a>`:''}${next?`<a class="smallBtn" href="${next.route}">succ. →</a>`:''}</div>`;
}
function workControls(work,section){
 const opts=(work.sections||[]).slice(0,80).map(s=>`<option value="${s.id}" ${s.id===section?'selected':''}>${s.title}</option>`).join('');
 return `<div class="selectRow">${opts?`<select id="selSection"><option value="">Opera intera</option>${opts}</select>`:''}</div>`;
}
function route(){
 const h=location.hash||'#home';
 $$('.nav a').forEach(a=>a.classList.toggle('active',h.startsWith(a.getAttribute('href'))));
 if(h.startsWith('#reader')) renderReader();
}
function bind(){
 $('.menuBtn').onclick=()=>$('.nav').classList.toggle('open');
 $('#searchBtn').onclick=()=>renderSearch();
 $('#searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')renderSearch()});
 document.body.addEventListener('change',e=>{
   if(e.target.id==='selCantica'){location.hash=`#reader?work=commedia&cantica=${e.target.value}&canto=01`}
   if(e.target.id==='selCanto'){const c=$('#selCantica').value; location.hash=`#reader?work=commedia&cantica=${c}&canto=${String(e.target.value).padStart(2,'0')}`}
   if(e.target.id==='selSection'){const q=parseQuery(location.hash); location.hash=`#reader?work=${q.work}&section=${e.target.value}`}
 });
 window.addEventListener('hashchange',route);
}
async function init(){await loadData(); renderWorkCards(); renderThemes(); renderLife(); renderMap(); bind(); route(); if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js').catch(()=>{})}}
init();
