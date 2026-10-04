# Amor sacro e amor profano

Il conflitto tra Dio, donna e desiderio nella letteratura medievale.

Percorso per il terzo anno delle superiori, dalle lezioni originali di gbprof, rivedute e ampliate con Libera. Otto tappe tematiche conservano la progettazione concordata: due amori; Francesco e Jacopone; eredità antica; origini e caratteristiche dell’amor cortese; Scuola siciliana; sonetto di Jacopo; ponte plurale allo Stilnovo.

## Aprire e installare

Aprire `index.html` attraverso un server HTTP/HTTPS. Nessun build o pacchetto da installare. Su iPad: Safari → Condividi → Aggiungi alla schermata Home. Il comando “Installare / usare offline” spiega la procedura e comunica quando la cache è pronta. Dopo il primo caricamento riuscito, i contenuti didattici sono locali; le fonti esterne richiedono rete.

## Apparati

- Otto lezioni di circa 740–850 parole ciascuna, oltre ai testi antologici integrali.
- Sintesi, almeno cinque saperi essenziali e cinque termini per tappa.
- Nove mappe SVG originali: una per tappa e una panoramica.
- Quaranta quesiti con tre opzioni, correzione ragionata, recupero ed esempio.
- Nuova domanda breve per ciascun errore; retest limitato agli errori con storico conservato.
- Voto = max(1, round(percentuale × 10)), percentuale espressa fra 0 e 1.
- Appunti, lettura, dimensione del testo e tentativi in localStorage, chiave `gbprof-amor-sacro-v1`. Azzeramento esplicito limitato alla PWA.

## Fonti e criterio

Fonte vincolante: [dispensa di gbprof](https://drive.google.com/file/d/0B7elU8rbYBjgUGFuLUJfN1ZLX3c/view?resourcekey=0-DwpkscblmSVDmejFhnXjcw). Cantico, O Segnor per cortesia e Io m’aggio posto in core sono presenti integralmente; grafia dell’originale, con pulizia degli artefatti di impaginazione e interventi dichiarati.

Nell’app è disponibile la tabella fonte → affermazione → tappa. Le interpretazioni sociologiche e psicologiche sono ipotesi; la narrazione della conversione di Jacopone è una tradizione agiografica. Il sonetto è corretto a 14 endecasillabi. Perfetta letizia, rapporto corpo/salvezza e donna-angelo sono riformulati. Il titolo non assume il dipinto di Tiziano come chiave esegetica. L’ordine è tematico, con coordinate cronologiche distinte.

Fonti di controllo: Treccani (Poesia cortese; Trovatori; Iacopo Benedetti, DBI; Scuola poetica siciliana, Federiciana), Fioretti VIII e confronto del sonetto su Wikisource. Collegamenti e funzione delle fonti sono riportati nella PWA. Nessun testo critico moderno è riprodotto integralmente.

## Manutenzione

`content.json` conserva la struttura leggibile; `data.js` ne contiene la copia usata senza fetch remoto. Aggiornarli insieme. A un nuovo rilascio cambiare la versione `CACHE` nel service worker. Le cache estranee al prefisso di questa PWA non vengono cancellate.

Copertina, icone e mappe sono composizioni originali locali. Nessun font remoto, CDN o dipendenza di runtime. Gli asset comuni di accessibilità/privacy seguono lo standard del repository e sono precached.
