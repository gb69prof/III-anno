# Verifiche delle PWA di Storia III anno

Data: 2 ottobre 2026. Controlli effettuati sulla versione pubblicata insieme a questo documento.

| Controllo | Esito |
|---|---|
| Percorsi | 23 lezioni e 9 approfondimenti separati |
| Integrità testuale | 80.982 parole confrontate; nessuna parola del testo di origine mancante nell’articolo della lezione |
| Duplicati Word/PDF | Tutte le parole degli 11 documenti Word presenti nei rispettivi PDF |
| Risorse e collegamenti locali | Nessun collegamento locale o riferimento di recupero mancante |
| Relazioni | Ogni approfondimento collegato alle sue lezioni e ogni lezione collegata ai propri approfondimenti |
| Quiz | 320 risposte corrette verificate nel browser; tre opzioni distinte per ogni domanda |
| Recupero | Report degli errori e ritorno alla sezione pertinente della lezione verificati |
| Offline | Tutti i 32 percorsi riaperti senza rete, con mappe e PDF disponibili dopo la prima visita online |
| Interfaccia | Controlli a 390, 768 e 1280 pixel; nessuna fuoriuscita orizzontale nelle viste controllate |
| Mappe | PNG e SVG presenti; controllo delle dimensioni del testo e verifica grafica |
| Strumenti | Ricerca dell’indice, ingrandimento della mappa, chiusura con Esc e dimensione del testo verificati |
| Mostra di Foggia | Contenuti precedenti conservati e collegati alla dispensa; apertura offline verificata |

Le prove funzionali sono state eseguite con Chromium tramite Playwright. Le larghezze indicate sono simulazioni nel browser, non prove su dispositivi fisici. Il controllo automatico dello standard gbprof non rileva errori nei nuovi percorsi. L’audit generale del repository segnala un problema già presente in `Foggia/XV-secolo/manifest.json`, estraneo a questa modifica.
