(() => {
  const MAPS = {
    'che-cos-e':'assets/maps/che-cos-e.svg',
    'famiglia-nobiliare':'assets/maps/famiglia-nobiliare.svg',
    'andrea-cappellano':'assets/maps/andrea-cappellano.svg',
    'trovatori-provenzali':'assets/maps/trovatori-provenzali.svg',
    'bernart-ventadorn':'assets/maps/bernart-ventadorn.svg',
    'trovatrici':'assets/maps/trovatrici.svg',
    'beatritz-de-dia':'assets/maps/beatritz-de-dia.svg'
  };
  const COVER_LINKS = [
    ['entry','lezione/che-cos-e','Entra nel percorso'],
    ['panel-1','lezione/famiglia-nobiliare','Il mondo della corte'],
    ['panel-2','lezione/andrea-cappellano','Il codice del desiderio'],
    ['panel-3','lezione/trovatori-provenzali','La parola dei trovatori'],
    ['panel-4','lezione/trovatrici','La voce delle donne'],
    ['b1','lezione/che-cos-e','Che cos’è'],['b2','lezione/famiglia-nobiliare','Famiglia'],
    ['b3','lezione/andrea-cappellano','Andrea Cappellano'],['b4','lezione/trovatori-provenzali','Trovatori'],
    ['b5','lezione/bernart-ventadorn','Bernart de Ventadorn'],['b6','lezione/trovatrici','Trovatrici'],
    ['b7','lezione/beatritz-de-dia','Beatritz de Dia'],
    ['tools-left','sintesi','Sintesi e vocabolario'],['tools-right','test','Test finale']
  ];

  function coverButton([cls, route, label]) {
    return `<button type="button" class="cover-hit ${cls}" data-route="${route}" aria-label="${label}"><span>${label}</span></button>`;
  }

  function buildCover() {
    const frame = document.querySelector('.cover-page .ornate-frame');
    if (!frame || frame.dataset.visualCover === '1') return;
    frame.dataset.visualCover = '1';
    frame.innerHTML = `
      <section class="visual-cover" aria-label="Copertina interattiva dell’amor cortese">
        <div class="visual-cover-stage">
          <img src="assets/cover-interactive.svg" alt="Copertina illustrata dell’amor cortese: una corte medievale, un trovatore e una dama separati dalla distanza, quattro pannelli tematici e sette diramazioni del percorso.">
          ${COVER_LINKS.map(coverButton).join('')}
          <button class="cover-hotspot hs-lute" type="button" aria-expanded="false" data-note="Il canto trasforma il desiderio in una forma condivisa: prima ancora del codice esiste la parola poetica.">+</button>
          <button class="cover-hotspot hs-distance" type="button" aria-expanded="false" data-note="La distanza non è un difetto del sistema: è il meccanismo che mantiene vivo il desiderio.">+</button>
          <button class="cover-hotspot hs-lady" type="button" aria-expanded="false" data-note="La dama è il centro simbolico del sistema. Con le trovatrici, però, quel centro finalmente prende parola.">+</button>
          <aside class="cover-note" aria-live="polite"></aside>
        </div>
        <p class="cover-help">Tocca i riquadri o i medaglioni per entrare nelle lezioni. I simboli <b>+</b> aprono una breve chiave di lettura dell’immagine.</p>
      </section>`;
    const note = frame.querySelector('.cover-note');
    frame.querySelectorAll('.cover-hotspot').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      frame.querySelectorAll('.cover-hotspot').forEach(b => b.setAttribute('aria-expanded','false'));
      if (wasOpen) { note.classList.remove('show'); note.textContent=''; return; }
      btn.setAttribute('aria-expanded','true');
      note.textContent = btn.dataset.note || '';
      note.classList.add('show');
    }));
    frame.querySelector('.visual-cover-stage')?.addEventListener('click', e => {
      if (!e.target.closest('.cover-hotspot')) { note.classList.remove('show'); note.textContent=''; frame.querySelectorAll('.cover-hotspot').forEach(b => b.setAttribute('aria-expanded','false')); }
    });
  }

  function currentLessonSlug() {
    const raw=(location.hash || '').replace(/^#\/?/,'');
    const m=raw.match(/^lezione\/([^/?#]+)/);
    return m ? m[1] : null;
  }

  function buildMapImage() {
    const slug=currentLessonSlug();
    if (!slug || !MAPS[slug]) return;
    const section=document.querySelector('.map-section');
    if (!section || section.dataset.visualMap === slug) return;
    const old=section.querySelector('.concept-map');
    if (!old) return;
    section.dataset.visualMap=slug;
    old.outerHTML = `<figure class="map-image-frame">
      <button class="map-image-button" type="button" aria-label="Apri la mappa concettuale a tutto schermo">
        <img src="${MAPS[slug]}" alt="Mappa concettuale illustrata della lezione" loading="lazy">
        <span class="map-zoom-hint">Tocca per ingrandire</span>
      </button>
    </figure>`;
    section.querySelector('.map-image-button')?.addEventListener('click', () => openMap(MAPS[slug]));
  }

  function openMap(src) {
    let dialog=document.getElementById('visualMapDialog');
    if (!dialog) {
      dialog=document.createElement('dialog');
      dialog.id='visualMapDialog';
      dialog.className='map-dialog';
      dialog.innerHTML=`<button class="map-dialog-close" type="button" aria-label="Chiudi">×</button><div class="map-dialog-scroll"><img alt="Mappa concettuale ingrandita"></div>`;
      document.body.appendChild(dialog);
      dialog.querySelector('.map-dialog-close').addEventListener('click',()=>dialog.close());
      dialog.addEventListener('click',e=>{ if(e.target===dialog) dialog.close(); });
    }
    dialog.querySelector('img').src=src;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
  }

  let queued=false;
  function enhance() {
    if (queued) return; queued=true;
    requestAnimationFrame(()=>{ queued=false; buildCover(); buildMapImage(); });
  }
  new MutationObserver(enhance).observe(document.getElementById('app'),{childList:true,subtree:true});
  window.addEventListener('hashchange',enhance);
  enhance();
})();
