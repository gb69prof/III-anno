# Il fiore e la rosa nel Medioevo

PWA didattica installabile, progettata per il terzo anno della scuola secondaria di secondo grado e ottimizzata per iPad.

## Impostazione storica

Il percorso rifiuta l'equazione “rosa = significato fisso”. Parte dagli usi materiali e ricostruisce separatamente Bibbia ed esegesi, devozione mariana, cultura cortese, `Rosa fresca aulentissima`, `Roman de la Rose`, `Il Fiore` attribuito a Dante e la candida rosa del `Paradiso`. Ogni capitolo distingue dati attestati, ipotesi probabili e interpretazioni discusse.

## Funzioni

- 10 capitoli con attività e controllo rapido;
- tavola comparativa di 8 contesti;
- 2 mappe concettuali accessibili;
- verifica finale di 15 domande con feedback e recupero;
- ricerca interna, note, citazioni salvate ed esportazione `.txt`;
- preferenze tipografiche, contrasto, stampa;
- manifest, service worker e pagina offline;
- navigazione touch e layout responsive per iPad.

## Avvio locale

Servire la cartella con un server HTTP, per esempio:

```bash
python3 -m http.server 8765
```

Aprire poi `http://localhost:8765/Letteratura/fiore-rosa/`.

## File principali

- `content.js`: contenuti, quiz, confronto e bibliografia;
- `app.js`: navigazione, persistenza, ricerca e interazioni;
- `styles.css`: sistema visivo e layout responsive;
- `sw.js`: cache offline;
- `ATTRIBUTIONS.md`: provenienza e licenze delle immagini;
- `IMAGE_PROMPTS.md`: prompt e stato delle ricostruzioni visive;
- `QA_REPORT.md`: controlli effettuati.
