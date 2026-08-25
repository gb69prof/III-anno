# Eloisa e Abelardo — Le lettere che non obbediscono

PWA didattica standalone per il terzo anno della scuola secondaria di secondo grado.

## Contenuti

- prologo biografico in sei scene originali;
- biblioteca interna con l’Historia calamitatum e le Lettere II–VIII in traduzione italiana antologica;
- percorso in sei movimenti: mondo precedente, fratture, immagine del mondo, poetica, opere, conclusione;
- indagine storica autonoma «Eloisa donna nel XII secolo»: norme insegnate, vite documentate, ceto, lettere, privilegi, quattro lenti medievali e interpretazione finale separata;
- lezioni estese, sintesi, saperi irrinunciabili, vocabolari e mappe concettuali;
- cinque quesiti per movimento con correzione, voto in decimi e recupero mirato;
- verifica storica aggiuntiva di sei quesiti con recupero;
- dossier di fonti primarie, accademiche e universitarie.

## Funzioni

Ricerca interna estesa ai documenti e all’indagine storica, progresso di lezioni e letture, taccuino, esportazione delle traduzioni, salvataggio di passaggi, persistenza locale, mappe ingrandibili, laboratorio a quattro lenti, installazione PWA, modalità offline, stampa, accessibilità da tastiera e supporto a prefers-reduced-motion.

## Avvio locale

Servire la cartella con un web server, per esempio python3 -m http.server 8080, quindi aprire http://localhost:8080. Service worker e installazione non funzionano correttamente aprendo il file direttamente dal filesystem.

## Verifica

- node tools/validate.js controlla struttura didattica, quiz, recuperi, asset, manifest e cache offline;
- node tools/http-smoke.js serve temporaneamente il progetto e verifica le risposte HTTP delle risorse principali.

## Metodo

La PWA distingue dati documentati, autorappresentazione dell’Historia calamitatum e delle lettere, interpretazioni storiografiche e inferenze controllate. L’indagine evita sia il presentismo sia l’idea di un unico «sguardo medievale»: canonico, abate, maestro e visitatore ecclesiastico sono trattati come prospettive differenti. Le considerazioni di Libera AI compaiono solo nell’ultima soglia e sono dichiarate come interpretazione, non come fonte. I documenti italiani sono traduzioni didattiche originali dal latino con tagli dichiarati; il criterio è illustrato in TEXTUAL-NOTE.md. Le immagini sono ricostruzioni artistiche originali, non ritratti documentari.
Il set di prompt è documentato in IMAGE-PROMPTS.md; fonti e attribuzioni sono raccolte nei file dedicati.
