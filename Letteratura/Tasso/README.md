# Torquato Tasso — dal Rinascimento al Barocco

PWA didattica standalone per il terzo anno, a cura di gbprof e Libera. Riprende dalla PWA di Foscolo la sequenza in sei movimenti, la palette blu/oro/pergamena, la copertina illustrata, le mappe ingrandibili e lo spazio di studio. I controlli della homepage sono elementi HTML accessibili, con testo selezionabile e disposizione adattabile allo schermo.

## Percorso

1. Il mondo precedente
2. Le fratture della vita dell’autore
3. L’immagine del mondo
4. La poetica
5. Le opere più significative: trama, personaggi e lettura del duello
6. Conclusione: confronto con Bernini e passaggio al Barocco

Ogni tappa offre lezione estesa, sintesi, saperi irrinunciabili, vocabolario, mappa e cinque domande con tre opzioni. Ordine di domande e opzioni variabile. Voto: `max(1, round(percentuale × 10))`. La correzione spiega le risposte; il recupero elenca gli errori, chiarisce il concetto, presenta un esempio e una domanda aperta per riformularlo. Il nuovo test può riguardare solo gli errori e aggiorna il risultato cumulativo; il tentativo precedente resta nello storico. Appunti e progressi sono salvati localmente e possono essere cancellati esplicitamente.

## Fonti → affermazioni → sezioni

| Fonte di gbprof | Nucleo utilizzato | Sezioni |
|---|---|---|
| [GerusalemmeLiberata](https://docs.google.com/document/d/1cO6uvgJ9JoWLvcNN43MVjA0LknCq1My2NPzgVfZUVy0/edit) | Trama, personaggi, missione crociata, riscrittura | Immagine, opere |
| [LaGrandezzaNelleContraddizioni](https://docs.google.com/document/d/1iRh0XV8W-uvwcYGBSobqxl3432xcgRoEsMl8OyvgQow/edit) | Ordine religioso e passioni; grandezza della tensione | Mondo, immagine, poetica |
| [DuelloTancrediClorinda](https://docs.google.com/document/d/1rx1wB3SoXU7qVhWoJ5Wvv8LXc6tsAMU6omofw1hqXfk/edit) | Corpo, ferita, perdono e battesimo; XII 57, 64, 66 | Opere, poetica |
| [Eros e salvezza](https://docs.google.com/document/d/1jzPDbc1rIbTwKSTkeIFgh1M4yZez_q2dc6mL89wesyA/edit) | Confronto Tasso–Bernini e mediazione corporea del sacro | Conclusione |

Riscontri: [testo del canto XII, edizione 1930](https://it.wikisource.org/wiki/Gerusalemme_liberata_(1930)/Canto_dodicesimo); [Treccani, Tasso](https://www.treccani.it/enciclopedia/torquato-tasso/); [Museo Omero, Bernini e la Cappella Cornaro](https://museoomero.it/opere/volto-di-santa-teresa/). Teresa d’Avila: *Libro della vita*, XXIX, §13, parafrasi del passo sulla transverberazione.

## Precisazioni editoriali

- La guerra è rappresentata nel poema come missione religiosa e provvidenziale: questa rappresentazione non costituisce una giustificazione storica o normativa della guerra.
- Il combattimento presenta ambiguità erotica, proposta come interpretazione argomentata; non si attribuiscono al poeta intenzioni psicologiche dimostrate.
- L’amore di Tancredi per Clorinda non autorizza a presentare come certo un amore ricambiato.
- Arsete racconta a Clorinda le sue origini cristiane prima del combattimento. Il battesimo finale completa il percorso narrativo, senza automatismo biologico della fede.
- Nel finale la grazia e il battesimo salvano: la violenza non è causa della salvezza. La spada colpisce di punta, non con un fendente.
- La *Conquistata* implica scelte letterarie ed epiche oltre alle ragioni religiose.
- Bernini impiega il coinvolgimento sensoriale nel linguaggio religioso del Barocco. Il confronto non identifica una ferita mortale con una transverberazione mistica.
- Le citazioni non verificabili delle dispense sono sostituite da parafrasi e analisi dei nuclei attestati.

## Immagini

Sei mappe SVG originali, con relazioni nominate e testi alternativi estesi. Copertina originale generata con il sistema integrato ImageGen: ritratto interpretativo di Tasso, Ferrara, manoscritti e scena crociata, pittura a olio, chiaroscuro, blu/oro/pergamena, senza testo. Non è un ritratto storico né una riproduzione documentaria. Icone locali originali.

## Avvio e installazione

Servire la cartella via HTTP per le prove; HTTPS per l’uso pubblico. Nessuna build o dipendenza esterna. Su iPad: Safari → Condividi → Aggiungi alla schermata Home. Attendere il messaggio «Contenuti pronti anche offline» al primo accesso. I link alle fonti restano risorse esterne. Cache limitata a questa PWA; la sua attivazione non elimina le cache delle altre lezioni.

## Aggiornamento

`content.json` è la sorgente didattica; `data.js` contiene gli stessi dati e i testi alternativi delle mappe, pronti per il browser. Se cambia un asset della PWA, cambiare la versione cache nel service worker e il nome usato dall’indicatore offline in `app.js`.
