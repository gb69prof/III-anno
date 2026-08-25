# Amor cortese — PWA didattica

Nove lezioni interattive su desiderio, parola e responsabilità dai trovatori a Dante.

## Avvio locale

La PWA non richiede compilazione. Da questa cartella avviare un server HTTP locale, quindi aprire `index.html` dal browser. Il service worker e l'installazione non funzionano dal protocollo `file://`.

Esempio:

```bash
python3 -m http.server 8080
```

Poi aprire `http://localhost:8080/`.

## Struttura

- `index.html`: shell accessibile dell'applicazione.
- `styles.css`: layout iPad-first e sistema visuale.
- `content.js`: nove lezioni e 57 quesiti, senza dipendenze di rete.
- `logic.js`: calcolo puro di punteggio, percentuale, voto ed errori da recuperare.
- `app.js`: navigazione, ricerca, note, citazioni, progresso, quiz, recupero e installazione.
- `manifest.webmanifest`: metadati PWA e icone.
- `sw.js`: cache offline delle risorse locali.
- `assets/maps/`: dodici SVG concettuali.
- `assets/icons/`: icone 192, 512 e maskable.

## Dati locali

Progresso, note, citazioni e tentativi dei quiz sono conservati in `localStorage`. Il comando **Azzera dati e progressi** li cancella. Il taccuino può essere esportato in `.txt`.

## Limiti dichiarati

- La destinazione GitHub non è ancora stata indicata: questa è una versione standalone non pubblicata.
- Non sono stati aggiunti font esterni; l'interfaccia usa famiglie di sistema e fallback offline.
- Eventuali miniature, registrazioni o edizioni testuali aggiuntive richiedono verifica di fonte e licenza nella fase competente.

## Controlli richiesti prima della pubblicazione

La Fase 07 deve riesaminare contenuti, fonti, didattica, accessibilità, responsive, installabilità e offline con ragionamento Molto alto.
