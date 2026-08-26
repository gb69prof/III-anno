(() => {
  const MAPS = {
    'che-cos-e':'assets/maps/che-cos-e.jpg',
    'famiglia-nobiliare':'assets/maps/famiglia-nobiliare.jpg',
    'andrea-cappellano':'assets/maps/andrea-cappellano.jpg',
    'trovatori-provenzali':'assets/maps/trovatori-provenzali.jpg',
    'bernart-ventadorn':'assets/maps/bernart-ventadorn.jpg',
    'trovatrici':'assets/maps/trovatrici.jpg',
    'beatritz-de-dia':'assets/maps/beatritz-de-dia.jpg'
  };

  const COVER_LINKS = [
    ['nav-enter','lezione/che-cos-e','Entra nel percorso'],
    ['nav-test','test','Test finale'],
    ['nav-maps','sintesi','Sintesi e mappe'],
    ['card-society','lezione/famiglia-nobiliare','La famiglia nobiliare'],
    ['card-love','lezione/che-cos-e','Che cos’è l’amor cortese'],
    ['card-poetry','lezione/trovatori-provenzali','I trovatori provenzali'],
    ['card-legacy','sintesi','Sintesi del percorso'],
    ['hero-bernart','lezione/bernart-ventadorn','Bernart de Ventadorn'],
    ['path-code','lezione/andrea-cappellano','Andrea Cappellano'],
    ['path-women','lezione/trovatrici','Le trovatrici'],
    ['path-beatritz','lezione/beatritz-de-dia','Beatritz de Dia'],
    ['bridge-left','lezione/andrea-cappellano','Dal codice alla tradizione italiana'],
    ['bridge-right','sintesi','Verso le trasformazioni successive']
  ];

  function coverButton([cls, route, label]) {
    return `<button type="button" class="cover-hit ${cls}" data-route="${route}" aria-label="${label}"><span>${label}</span></button>`;
  }

  function buildCover() {
    const frame = document.querySelector('.cover-page .ornate-frame');
    if (!frame || frame.dataset.visualCover === 'final') return;
    frame.dataset.visualCover = 'final';
    frame.innerHTML = `
      <section class="visual-cover" aria-label="Copertina interattiva dell’amor cortese">
        <div class="visual-cover-stage">
          <img src="assets/cover-interactive.jpg" alt="Copertina illustrata dell’amor cortese con trovatore, dama, quattro sezioni e diramazioni del percorso.">
          ${COVER_LINKS.map(coverButton).join('')}
          <aside class="cover-index-note" aria-live="polite">La copertina è anche l’indice: tocca una scena, un riquadro o una tappa.</aside>
        </div>
      </section>`;
  }

  function currentLessonSlug() {
    const raw = (location.hash || '').replace(/^#\/?/, '');
    const match = raw.match(/^lezione\/([^/?#]+)/);
    return match ? match[1] : null;
  }

  function currentRoute() {
    return (location.hash || '').replace(/^#\/?/, '') || 'home';
  }

  function imageFigure(src, alt, extraClass = '') {
    return `<figure class="map-image-frame ${extraClass}">
      <button class="map-image-button" type="button" aria-label="Apri l’immagine a tutto schermo">
        <img src="${src}" alt="${alt}" loading="lazy">
        <span class="map-zoom-hint">Tocca per ingrandire</span>
      </button>
    </figure>`;
  }

  function buildMapImage() {
    const slug = currentLessonSlug();
    if (!slug || !MAPS[slug]) return;
    const section = document.querySelector('.map-section');
    if (!section || section.dataset.visualMap === slug) return;
    const old = section.querySelector('.concept-map');
    if (!old) return;
    section.dataset.visualMap = slug;
    old.outerHTML = imageFigure(MAPS[slug], `Mappa illustrata: ${slug.replaceAll('-', ' ')}`);
    section.querySelector('.map-image-button')?.addEventListener('click', () => openMap(MAPS[slug]));
  }

  function buildSynthesisImage() {
    if (currentRoute() !== 'sintesi') return;
    if (document.querySelector('.synthesis-visual')) return;
    const lead = document.querySelector('.synthesis-lead');
    if (!lead) return;
    lead.insertAdjacentHTML('afterend', imageFigure('assets/maps/sintesi.jpg', 'Sintesi illustrata dell’intero percorso sull’amor cortese', 'synthesis-visual'));
    document.querySelector('.synthesis-visual .map-image-button')?.addEventListener('click', () => openMap('assets/maps/sintesi.jpg'));
  }

  function openMap(src) {
    let dialog = document.getElementById('visualMapDialog');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'visualMapDialog';
      dialog.className = 'map-dialog';
      dialog.innerHTML = `<button class="map-dialog-close" type="button" aria-label="Chiudi">×</button><div class="map-dialog-scroll"><img alt="Immagine illustrata ingrandita"></div>`;
      document.body.appendChild(dialog);
      dialog.querySelector('.map-dialog-close').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    }
    dialog.querySelector('img').src = src;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  let queued = false;
  function enhance() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      buildCover();
      buildMapImage();
      buildSynthesisImage();
    });
  }

  const app = document.getElementById('app');
  if (app) new MutationObserver(enhance).observe(app, {childList:true, subtree:true});
  window.addEventListener('hashchange', enhance);
  enhance();
})();
