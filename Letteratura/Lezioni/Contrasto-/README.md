# Rosa fresca aulentissima · PWA didattica

Lezione installabile, iPad-first, sul *Contrasto* attribuito a Cielo d’Alcamo. Conserva il nucleo della lezione gbprof e lo sviluppa in un percorso professionale: domanda generatrice, mondo precedente, frattura, testo e filologia, duello visuale, poetica, conclusione, verifiche e recupero.

## Avvio locale

```bash
python3 -m http.server 8765
```

Aprire `http://localhost:8765/Letteratura/Lezioni/Contrasto-/` quando il progetto è collocato nel repository, oppure eseguire il server direttamente in questa cartella e aprire `http://localhost:8765/`.

## Caratteristiche

- 6 movimenti didattici, ciascuno con lezione estesa, sintesi, 6 saperi irrinunciabili, lessico, mappa e test;
- testo integrale in 32 strofe con parafrasi affiancata e filtro per atto;
- 8 ricostruzioni visuali IA dichiarate e documentate;
- verifica finale di 15 item, recupero mirato e timer per l’orale;
- taccuino, segnalibri, ricerca, sintesi vocale, temi e dimensione testo;
- PWA installabile e funzionante offline dopo il primo caricamento;
- modalità docente e layout responsive per iPad, desktop e telefono.

## Test

```bash
node --test tests/logic.test.cjs
node --check app.js
```

Vedi `ATTRIBUTIONS.md` per fonti e immagini e `docs/QA_REPORT.md` per le verifiche effettuate.
