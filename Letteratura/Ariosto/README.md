# Ludovico Ariosto — il labirinto del desiderio

PWA standalone per Letteratura del terzo anno, gbprof e Libera. Riprende l’interfaccia della PWA Tasso: copertina originale, palette blu/oro/pergamena, mappe ingrandibili, strumenti di studio e progressi locali.

## Percorso e approfondimenti

Sei movimenti: mondo precedente, fratture biografiche, immagine del mondo, poetica, opere e conclusione. Seguono tre approfondimenti autonomi: **Angelica**, **l’evoluzione del cavaliere**, **Ariosto scrittore di corte**. I collegamenti interni permettono di passare dalla lettura generale agli episodi e ai confronti.

Ogni lezione offre sintesi, 5–8 saperi irrinunciabili, glossario, mappa, appunti e cinque domande con tre opzioni: 45 quesiti complessivi. Domande e risposte cambiano ordine. Correzione motivata, voto `max(1, round(percentuale × 10))`, recupero per gli errori con chiarimento, esempio e domanda aperta. Il retest riguarda solo gli errori e aggiorna il risultato cumulativo, conservando lo storico. Dati salvati sul dispositivo, cancellabili dal pulsante esplicito.

## Fonti → nuclei → sezioni

Materiali letti dalla [cartella di gbprof](https://drive.google.com/drive/folders/1caHZGPXGqZrGvJGvYn0-et3LiLOjetRW): otto documenti e due immagini.

| Materiale | Nucleo riorganizzato | Destinazione |
|---|---|---|
| Angelica dal paradiso al sabbione | Idealizzazione, corpo, confronto lirico, caduta | Angelica; poetica |
| EvoluzioneAngelica | Autonomia e scelta, rapporto con Medoro | Angelica; immagine |
| LeDonneOrlando | Pluralità delle figure femminili | Angelica; opere |
| Angelica | Desiderio e immagine, apparire e conoscere | Angelica; immagine |
| L’evoluzione del cavaliere | Chanson, romanzo arturiano, Boiardo, Ariosto, Tasso, Cervantes | Cavaliere; mondo; conclusione |
| AriostoScrittoreDiCorte | Mecenatismo, servizio, rifiuto, encomio e critica | Corte; fratture; opere |
| OrlandoFurioso-breve | Tre fili narrativi, forma, personaggi | Percorso principale |
| SchedaPrompt | Richiesta di precisione nelle citazioni e nel contesto | Criterio editoriale |
| Dal cielo al sabbione; Dal cielo al sabbione2 | Schemi e relazione fra immagine e corporeità | Nuove mappe di Angelica |

Riscontri: [testo del poema, edizione 1928](https://it.wikisource.org/wiki/Orlando_furioso_(1928)), soprattutto XII 6, XIX 30/33/34/37, XXIX 64–65, XXXIV 77–79; [Treccani, Ariosto](https://www.treccani.it/enciclopedia/ludovico-ariosto/); [Internet Culturale, Satire](https://www.internetculturale.it/directories/ViaggiNelTesto/ariosto/print/b25.html); [Università di Bologna, documenti della Garfagnana](https://exhibits.ficlit.unibo.it/s/Il-segno-di-ariosto/page/il-Libro-di-conto-dei-balestrieri).

La SchedaPrompt menziona un PDF che non era presente nella cartella. Le citazioni inserite sono verificate sul testo pubblico sopra indicato, con canto e ottava; non sono dichiarate come tratte da quel PDF. Le altre ricostruzioni sono parafrasi.

## Precisazioni editoriali

- Angelica è ereditata da Boiardo e agisce già nel canto I. Il fantasma di XII 6 è un incantesimo di Atlante.
- Medoro è un soldato saraceno fedele a Dardin, distinto dal pastore che offre riparo. Angelica manifesta il proprio amore in XIX 30; nozze in XIX 33–34; progetto di ritorno nel Catai e incoronazione di Medoro in XIX 37.
- Caduta sul sabbione: XXIX 65, successiva alle nozze. Il narratore lascia incerta la causa; la lettura simbolica è dichiarata interpretazione. L’anello al dito contrasta gli incantesimi, in bocca rende invisibile.
- Il confronto con Dante distingue la voce di Francesca dalla posizione del poeta e il significato di “pare” nel sonetto da generalizzazioni sul Medioevo. Beatrice e Laura hanno funzioni differenti.
- I cavalieri medievali conoscono già conflitti; il confronto mostra trasformazioni delle forme e dei valori, senza una legge automatica del progresso.
- Mecenatismo con precedenti medievali; Ippolito dal 1503, rifiuto dell’Ungheria nel 1517, Alfonso dal 1518, Garfagnana 1522–1525. Encomio e critica convivono; genealogia estense poetica.
- Le letture sull’autonomia femminile e sulla modernità sono motivate senza attribuire all’autore programmi politici contemporanei.

## Immagini e avvio

Copertina originale generata per la lezione: ritratto interpretativo, Ferrara, sentieri, cavaliere, Angelica e Medoro, Luna. Non è un ritratto documentario. Nove mappe SVG originali, frecce nominate e descrizioni alternative estese; icone locali.

Nessuna build e nessuna dipendenza di rete per studiare. Servire via HTTP nelle prove, HTTPS in produzione. Safari su iPad → Condividi → Aggiungi alla schermata Home. Attendere «Contenuti pronti anche offline». I soli collegamenti alle fonti richiedono rete. Cache dedicata ad Ariosto, senza cancellare le altre PWA.

`content.json` e `approfondimenti.json` sono le sorgenti; `data.js` unisce i nove oggetti con i testi alternativi di `assets/mappe/maps.json`. A ogni modifica di risorse aggiornare insieme il nome cache in `service-worker.js` e `app.js`. Include gli standard comuni gbprof per accessibilità, privacy e uso offline.
