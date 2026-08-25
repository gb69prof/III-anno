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

## Controlli da completare sull'URL pubblico

- Rendering reale alle viewport iPad verticale, iPad orizzontale e telefono.
- Apertura dei pannelli epistemici e controllo della leggibilità delle didascalie.
- Navigazione fra lezioni, caricamento differito delle immagini e assenza di errori visibili.
- Verifica offline in browser dopo il primo caricamento.

## Limiti dichiarati

- Le scene sono ricostruzioni storicamente qualificate, non fonti primarie e non ritratti autentici.
- Alcune fonti iconografiche utilizzate per il confronto sono posteriori di alcuni decenni rispetto ai contesti più antichi rappresentati; questa distanza è dichiarata nell'apparato delle attribuzioni.
- Il rendering automatico locale non è stato eseguito perché il pacchetto Playwright è presente ma non dispone del motore Chromium nell'ambiente corrente. Il controllo viene quindi ripetuto sull'anteprima pubblica.

## Stato provvisorio del Revisore

`APPROVATO CON VERIFICA LIVE PENDENTE`

L'apparato visuale può essere caricato nell'anteprima di lavoro. Il verdetto finale dipende dal controllo dell'URL pubblico.
