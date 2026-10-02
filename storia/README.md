# Storia III anno · gbprof e Libera

23 lezioni e 9 approfondimenti, ciascuno con una PWA installabile separata. L’indice `index.html` organizza il percorso in ordine cronologico e offre una ricerca per titolo. Le lezioni e i rispettivi approfondimenti hanno collegamenti di andata e ritorno.

## Contenuti

La sezione **Lezione** riproduce integralmente il testo della dispensa fornita da gbprof, con fonti, tabelle, attività, immagini e collegamenti. Quando erano disponibili sia Word sia PDF, è stato utilizzato Word per la struttura e conservato il PDF originale da scaricare. La verifica delle coppie ha trovato tutte le parole dei documenti Word anche nei rispettivi PDF.

Le mappe, le timeline, i profili e i quiz sono strumenti di studio aggiuntivi: non sostituiscono il testo integrale. Ogni percorso contiene una mappa con cinque rami, scaricabile in PNG e SVG, e dieci domande con tre risposte, correzione e collegamenti ai punti da ripassare. Ordine delle domande e delle risposte cambia a ogni tentativo.

La mostra digitale preesistente sul palazzo di Federico II a Foggia è conservata in `Palazzo-Federico-II-Foggia/esplora.html` e collegata alla relativa dispensa.

## Uso e installazione

Aprire il percorso tramite HTTPS. Su iPad usare **Condividi → Aggiungi alla schermata Home**; sui browser compatibili usare **Installa**. Ogni PWA ha un’identità e un ambito separati. Dopo la prima apertura online, lezione, mappa, quiz, immagini e PDF sono disponibili offline. Per usare offline un approfondimento o un’altra lezione, aprirlo almeno una volta online. File statici HTML, CSS e JavaScript: non serve una build o un servizio esterno.

Per una verifica locale dalla radice del repository:

```sh
python -m http.server 8765
```

Aprire `http://localhost:8765/storia/`. Le risorse condivise sono in `_shared/` e `../pwa-common/`.

## Aggiornamenti

Per modificare un testo intervenire nell’articolo `#integral-text` di `index.html`. Le domande e i collegamenti di recupero sono in `data.js`; le mappe in `mappa.svg` e `mappa.png`. Quando cambiano gli asset, incrementare la versione della cache in `service-worker.js` e aggiornare l’elenco `ASSETS`. Non utilizzare nomi di cache globali o cancellare le cache delle altre PWA.

`FONTI.json` registra il file di origine e le impronte SHA-256 dei testi e dei PDF; `VERIFICHE.md` descrive i controlli effettuati. Le note riservate al docente restano escluse dall’area studenti e da questi file pubblici.
