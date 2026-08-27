# Rapporto QA

## Criteri

- [x] Struttura didattica completa in 6 movimenti.
- [x] Testo integrale di 32 strofe con 160 versi e parafrasi.
- [x] 6 sintesi, 36 saperi irrinunciabili, 36 voci di lessico.
- [x] 30 item formativi e 15 item finali.
- [x] 6 mappe concettuali SVG con descrizione equivalente.
- [x] 8 scene visuali coerenti, con alt text e disclosure IA.
- [x] Manifest, icone, service worker e fallback offline.
- [x] Navigazione da tastiera, skip link, focus, dialog nativi e contrasto regolabile.
- [x] Layout responsive per tablet e telefono.
- [x] Dati personali assenti; note e progressi restano in localStorage.

## Verifiche automatiche

Eseguire dalla cartella del progetto:

```bash
node --check app.js
node --check content.js
node --check poem.js
node --check sw.js
node --test tests/logic.test.cjs
```

## Verifiche visuali

- home e immagine hero a 1366×768;
- navigazione e due colonne a 1024×768;
- layout mobile a 390×844;
- dialoghi ricerca, preferenze e mappa;
- testo originale, affiancato e parafrasi;
- modalità chiara, scura e alto contrasto;
- installazione e ricarica offline dopo il primo accesso.
