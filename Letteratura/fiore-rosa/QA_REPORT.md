# Rapporto QA

Collaudo concluso il 27 agosto 2026 sulla versione pubblicata in GitHub Pages.

## Esito

- **Sintassi:** `node --check` superato da `content.js`, `logic.js`, `app.js` e `sw.js`; manifest JSON valido con `jq`.
- **Risorse:** nessun riferimento locale mancante; le immagini di tutti i 10 capitoli risultano complete nel browser e con larghezza naturale valida.
- **Navigazione:** home, 10 capitoli, confronto, verifica, taccuino e fonti raggiungibili tramite hash.
- **Interazioni:** superati i test di ricerca (`hortus`), nota persistente, avanzamento, controllo rapido, apertura mappa e correzione della verifica finale.
- **PWA:** manifest, icone, service worker, lista di precache e pagina offline presenti; tutte le risorse elencate in cache esistono.
- **Layout:** controllo visuale nel browser a 1363 × 936 senza overflow orizzontale; breakpoint CSS verificati a 980 px e 680 px per iPad verticale e telefono.
- **Accessibilità di base:** skip link, focus del contenuto, etichette dei comandi, testi alternativi, descrizioni estese delle mappe e modalità ad alto contrasto presenti; nessuna immagine priva di attributo `alt`.
- **Console:** nessun errore proveniente dai file della PWA. Gli unici messaggi osservati appartenevano all'estensione di automazione del browser di collaudo.

## Controllo editoriale

- distinzione esplicita fra fonte iconografica e ricostruzione didattica;
- gradi di certezza `attestato`, `probabile`, `discusso`;
- `Il Fiore` indicato come opera attribuita a Dante, non certa;
- lessico della Vulgata distinto dagli sviluppi esegetici e mariani;
- nessuna equazione universale fra rosa e un solo significato.
