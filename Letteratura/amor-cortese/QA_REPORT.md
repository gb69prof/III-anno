# Rapporto di revisione — apparato visuale

## Controlli superati

- 9 lezioni presenti, ognuna con 723–768 parole di lezione estesa.
- Sintesi, saperi irrinunciabili, vocabolario, laboratorio, collegamenti e mappa presenti in ogni lezione.
- 45 quesiti formativi e 12 quesiti finali; tre opzioni, una risposta corretta, feedback e recupero per ogni domanda.
- Calcolo di punteggio, percentuale, voto ed errori verificato con test puri per: tutte corrette, tutte errate e retest selettivo.
- 12 SVG concettuali locali presenti con titolo e descrizione accessibile.
- 9 ricostruzioni visuali originali presenti, 1536 × 1024 pixel, ottimizzate in WebP per un totale di circa 1,3 MB.
- Ogni ricostruzione possiede testo alternativo, etichetta «non fonte primaria» e pannello distinto in `Base documentaria`, `Scelta ricostruttiva` e `Riferimenti visivi`.
- Manifest valido con icone 192, 512 e maskable; tutti i percorsi esistono.
- Service worker aggiornato alla cache `amor-cortese-v1.1.0`, comprendente `visuals.js` e le nove scene.
- Nessun percorso assoluto o dipendenza di rete necessaria al funzionamento didattico.
- Sintassi JavaScript verificata per `content.js`, `visuals.js`, `logic.js`, `app.js` e `sw.js`.
- 10 gruppi di quiz e 57 domande verificati con risposte tutte corrette, tutte errate e recupero selettivo.
- Tutti i 37 file della cartella sono stati serviti via HTTP locale con risposta 200.
- Le nove immagini sono state controllate insieme in una tavola di confronto per coerenza, varietà e assenza di testo o marchi invasivi.

## Controlli superati sull'URL pubblico

- Versione pubblica verificata su GitHub Pages il 26 agosto 2026 dopo la propagazione del commit visuale.
- Navigazione verificata sulle nove rotte `#lezione-1`–`#lezione-9`: ogni lezione mostra la ricostruzione prevista e il relativo testo alternativo.
- Le nove immagini sono state caricate dal browser, anche con caricamento differito, alla dimensione naturale di 1536 × 1024 pixel.
- Il pannello epistemico è stato aperto e controllato: `Base documentaria`, `Scelta ricostruttiva` e `Riferimenti visivi` risultano distinti e leggibili.
- L'etichetta `RICOSTRUZIONE VISUALE · NON FONTE PRIMARIA` è visibile prima del titolo della scena.
- La resa desktop è stata ispezionata visivamente: immagine, didascalia e apparato storico-critico mantengono gerarchia e leggibilità.
- Il documento collega correttamente `manifest.webmanifest` e tutti gli asset visuali risultano raggiungibili dalla versione pubblica.
- Nei log non risultano errori o avvisi originati dalla PWA; le sole segnalazioni osservate appartengono all'estensione tecnica del browser di verifica.

## Controlli finali non bloccanti su dispositivo

- Rendering su un iPad fisico, sia verticale sia orizzontale, e su un telefono reale.
- Installazione da Safari e verifica offline dopo un primo caricamento completo.

## Limiti dichiarati

- Le scene sono ricostruzioni storicamente qualificate, non fonti primarie e non ritratti autentici.
- Alcune fonti iconografiche utilizzate per il confronto sono posteriori di alcuni decenni rispetto ai contesti più antichi rappresentati; questa distanza è dichiarata nell'apparato delle attribuzioni.
- Il controllo dell'anteprima pubblica è stato eseguito con un browser cloud alla viewport desktop 1363 × 936. Questo ambiente non espone l'emulazione di altre viewport né l'ispezione diretta del service worker; la verifica finale di installazione, cache offline e comportamento Safari resta quindi affidata a un iPad reale.

## Verdetto del Revisore

`APPROVATO CON MIGLIORIE NON BLOCCANTI`

L'apparato visuale è coerente con il percorso didattico, rende esplicito il proprio statuto ricostruttivo e non introduce problemi tecnici bloccanti. La prova su iPad reale potrà suggerire rifiniture responsive o di installazione, ma non impedisce l'uso e la valutazione della versione pubblicata.
