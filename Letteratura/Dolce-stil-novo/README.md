# Il dolce stil novo · PWA didattica

Percorso in sei movimenti per una classe terza della scuola secondaria di secondo grado:

1. il mondo precedente;
2. le fratture;
3. l’immagine dell’essere umano;
4. la poetica;
5. le opere;
6. conclusione.

## Funzioni

- layout mobile-first, ottimizzato per Safari su iPad;
- installazione come PWA e funzionamento offline dopo il primo caricamento;
- indice, ricerca, avanzamento e ripresa dell’ultima lezione;
- sei mappe concettuali ingrandibili con descrizione estesa;
- note e citazioni salvate in locale, esportabili in `.txt`;
- 30 domande formative e verifica finale di 20 domande;
- opzioni e quesiti rimescolati;
- feedback, recupero mirato, domanda di rientro e retest dei soli errori;
- cronologia dei tentativi senza cancellazione del primo risultato;
- preferenze di lettura e contrasto aumentato.

## Avvio locale

Servire la cartella con un server HTTP, per esempio:

```bash
python3 -m http.server 8080
```

Aprire `http://localhost:8080/`. Il service worker non viene registrato con protocollo `file:`.

## Sorgenti editoriali

Il dossier didattico e quello visuale sono conservati in `docs/`. `tools/build_content.mjs` rigenera `content.js`; `tools/generate_maps.mjs` rigenera gli SVG delle mappe.

## Verifica minima

```bash
node tests/logic.test.cjs
node --check app.js
node --check content.js
node --check sw.js
```

