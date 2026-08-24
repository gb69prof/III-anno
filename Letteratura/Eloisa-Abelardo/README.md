# Eloisa e Abelardo — Le lettere che non obbediscono

PWA didattica standalone per il terzo anno della scuola secondaria di secondo grado.

## Contenuti

- prologo biografico in sei scene originali;
- percorso in sei movimenti: mondo precedente, fratture, immagine del mondo, poetica, opere, conclusione;
- lezioni estese, sintesi, saperi irrinunciabili, vocabolari e mappe concettuali;
- cinque quesiti per movimento con correzione, voto in decimi e recupero mirato;
- dossier di fonti accademiche e universitarie.

## Funzioni

Ricerca interna, progresso, taccuino, esportazione, salvataggio di passaggi, persistenza locale, mappe ingrandibili, installazione PWA, modalità offline, stampa, accessibilità da tastiera e supporto a prefers-reduced-motion.

## Avvio locale

Servire la cartella con un web server, per esempio python3 -m http.server 8080, quindi aprire http://localhost:8080. Service worker e installazione non funzionano correttamente aprendo il file direttamente dal filesystem.

## Verifica

- node tools/validate.js controlla struttura didattica, quiz, recuperi, asset, manifest e cache offline;
- node tools/http-smoke.js serve temporaneamente il progetto e verifica le risposte HTTP delle risorse principali.

## Metodo

La PWA distingue dati documentati, autorappresentazione dell’Historia calamitatum e interpretazioni storiografiche. Le immagini sono ricostruzioni artistiche originali, non ritratti documentari.
Il set di prompt è documentato in IMAGE-PROMPTS.md; fonti e attribuzioni sono raccolte nei file dedicati.
