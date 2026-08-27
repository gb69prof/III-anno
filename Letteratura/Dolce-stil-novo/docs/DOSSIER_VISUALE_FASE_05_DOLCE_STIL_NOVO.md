# Il dolce stil novo — Dossier visuale della PWA

**Fase 05 · Visual**  
**Destinazione prevista:** `gb69prof/III-anno/Letteratura/Dolce-stil-novo`  
**Target principale:** iPad, orientamento verticale e orizzontale

## 1. Tesi visiva

L’identità non deve ridurre lo Stil novo a un Medioevo decorativo. Il tema visivo è **l’esperienza interiore che diventa forma**: dal manoscritto nasce un percorso che attraversa lo sguardo e il cuore, poi si divide in tre esiti — armonia e gentilezza, crisi e frattura, lode e trascendenza.

La copertina usa quindi un’immagine simbolica, non una falsa ricostruzione storica. Le mappe adottano invece una grafica deterministica e vettoriale: qui la precisione concettuale conta più dell’atmosfera. Le due famiglie di immagini restano unite da palette, materia cartacea, blu profondo e oro controllato.

## 2. Identità grafica

### Palette

| Funzione | Colore | Codice | Uso |
|---|---|---:|---|
| Inchiostro | Blu-nero | `#172436` | Testi principali, fondo scuro |
| Indaco | Blu profondo | `#243B61` | Testate, nodi centrali, icona |
| Borgogna | Rosso vino | `#7C3343` | Frattura, Cavalcanti, etichette di sezione |
| Verde ossidato | Verde minerale | `#49665A` | Continuità, Guinizzelli, nodi storici |
| Azzurro ardesia | Blu medio | `#426981` | Fonti, reti, passaggi percettivi |
| Ocra | Terra dorata | `#A56F2D` | Interiorità, mediazione, Cino |
| Viola spento | Viola | `#62517D` | Dante, interpretazione e ricezione |
| Pergamena | Avorio caldo | `#F5EEDF` | Fondo di lettura e mappe |
| Oro | Oro non brillante | `#BF8B35` | Relazioni, focus, bordi e progresso |

Il colore non deve portare da solo l’informazione. Ogni nodo contiene un titolo, un sottotitolo e un verbo-relazione; gli stati dei quiz richiederanno icona e testo oltre al verde/rosso.

### Tipografia

- **Titoli e citazioni:** `Georgia`, `Times New Roman`, serif. Produce un richiamo librario senza dipendenze esterne.
- **Interfaccia e testo corrente:** `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif.
- **Testo lezione:** dimensione base consigliata `1.08rem`, interlinea `1.72`, larghezza massima `72ch`.
- **Mappe:** titoli serif; nodi e relazioni con sans-serif ad alto contrasto.

Non vanno caricati font remoti: la PWA deve restare completa offline e stabile anche su versioni differenti di Safari.

### Motivo identificativo

L’icona unisce tre segni: **occhio → cuore → libro aperto**. La sequenza riassume percezione, processo interiore e forma poetica. L’icona non presenta lettere minute e conserva la propria leggibilità a 192 px.

## 3. Copertina originale

### File

- `assets/hero/dolce-stil-novo-hero-v2.png` — master definitivo 1672×941.
- `assets/hero/dolce-stil-novo-hero-v2-1600.webp` — versione principale ottimizzata 1600×900.
- `assets/hero/dolce-stil-novo-hero-v2-960.webp` — versione leggera 960×540.

La prima variante resta nella cartella come tracciamento del processo, ma non va integrata: presentava una cupola rinascimentale troppo riconoscibile. La versione `v2` sostituisce lo skyline con torri civiche, mura e una chiesa romanico-gotica priva di cupola monumentale.

### Composizione

Un codice aperto genera un filo di luce che attraversa un occhio e raggiunge un cuore. Dal cuore partono tre paesaggi simbolici: armonia dorata, frattura rossa e ascesa azzurra. Due città medievali richiamano Bologna e Firenze senza pretendere una ricostruzione topografica. L’ampio cielo blu lascia spazio al titolo HTML, che non deve essere incorporato nell’immagine.

### Testo alternativo

> Illustrazione simbolica: un codice medievale aperto emette una linea luminosa che attraversa un occhio e raggiunge un cuore. Dal cuore si diramano tre paesaggi: uno dorato e armonico, uno rosso e fratturato, uno azzurro e ascendente; sullo sfondo compaiono due città comunali che richiamano Bologna e Firenze.

### Prompt finale usato

Copertina panoramica per una PWA sul Dolce stil novo; paesaggio intellettuale italiano del tardo Duecento, simbolico e non ricostruzione letterale; codice su leggio, luce dal libro all’occhio e al cuore, poi tre percorsi visivi — oro armonico, rosso fratturato, azzurro ascendente — per suggerire Guinizzelli, Cavalcanti e Dante; grafica editoriale contemporanea ispirata a pigmenti a tempera, pergamena e foglia d’oro; palette lapislazzuli, borgogna, avorio, verde ossidato e oro; spazio negativo per titolo HTML; nessuna scritta, pseudo-lettera, oggetto moderno, cornice o filigrana.

**Metodo:** generazione bitmap originale, correzione mirata dell’anacronismo architettonico, poi ottimizzazione locale in WebP. Nessun asset esterno.

## 4. Le sei mappe concettuali

Ogni mappa esiste in due formati:

- SVG 1600×1000 per l’uso principale, nitido a ogni ingrandimento;
- PNG 2000×1250 come fallback e per esportazione.

Le mappe usano un nodo centrale, 5–7 nodi periferici e frecce con verbi. Il fondo riprende la pergamena ma mantiene contrasto elevato. Nessun elemento è affidato al solo colore.

### Mappa 1 — Il mondo precedente

**File:** `mappa-01-mondo-precedente.svg/.png`  
**Centro:** “Stil novo — trasforma ciò che riceve”.  
**Relazioni:** trovatori offrono lessico e relazione; Siciliani mediano e trasmettono; comuni toscani moltiplicano gli scambi; Guittone rende reale il conflitto; Bonagiunta contesta la complessità; l’interiorità diventa analisi del soggetto.  
**Alt esteso:** La tradizione trobadorica, la Scuola siciliana e i comuni toscani confluiscono nella trasformazione stilnovista. Guittone rappresenta un’autorità con cui misurarsi e Bonagiunta contesta la sottigliezza dei nuovi poeti. Da questa rete nasce l’interiorità come problema poetico.

### Mappa 2 — Le fratture

**File:** `mappa-02-fratture.svg/.png`  
**Centro:** “Trasformazione storica e concettuale”.  
**Relazioni:** corte diventa rete urbana; sangue viene sottoposto alla virtù interiore; codice esterno diventa processo interno; retorica produce conoscenza; Dante ordina retrospettivamente le opere.  
**Alt esteso:** Più spostamenti convergono: cambia la circolazione, la gentilezza viene ridefinita, lo sguardo si sposta verso l’interno e la retorica rende pensabile il processo amoroso. Soltanto dopo le opere Dante organizza la differenza con un nome.

### Mappa 3 — L’immagine dell’essere umano

**File:** `mappa-03-immagine-uomo.svg/.png`  
**Centro:** “Amore — processo e prova”.  
**Relazioni:** lo sguardo avvia; cuore, mente, intelletto e spiriti reagiscono; Guinizzelli verifica la virtù; Cavalcanti mostra il limite; Dante reinterpreta dal saluto alla lode; la donna produce effetti specifici.  
**Alt esteso:** L’esperienza entra attraverso lo sguardo e modifica le facoltà interne. In Guinizzelli verifica il cuore gentile; in Cavalcanti può spezzare l’equilibrio razionale; in Dante viene reinterpretata dalla ricerca del saluto alla lode. La donna non ha quindi una funzione identica nei tre autori.

### Mappa 4 — La poetica

**File:** `mappa-04-poetica.svg/.png`  
**Centro:** “Forma poetica — trasforma esperienza in senso”.  
**Relazioni:** dolce rende coerente; stile organizza; nuovo rilegge il passato; canzone, sonetto e ballata danno struttura; immagini rendono visibile; destinatari creano il patto; manoscritti trasmettono il canone.  
**Alt esteso:** La forma mette in rapporto esperienza e senso. Dolcezza, stile e novità definiscono una differenza; le forme metriche strutturano il discorso; le immagini rendono visibile l’interiorità; destinatari e manoscritti costruiscono comunità e trasmissione.

### Mappa 5 — Le opere

**File:** `mappa-05-opere.svg/.png`  
**Centro:** “Lettura ravvicinata — dalla forma alla tesi”.  
**Relazioni:** la disputa costruisce il canone; Guinizzelli verifica la virtù; Cavalcanti espone il limite; la *Vita nuova* narra e reinterpreta; Cino allarga i confini; il metodo rende verificabile l’interpretazione.  
**Alt esteso:** Le costellazioni di opere mettono alla prova la poetica. Bonagiunta e Dante costruiscono la disputa; Guinizzelli collega gentilezza e tensione; Cavalcanti lega conoscenza e crisi; la *Vita nuova* conduce dal saluto alla lode; Cino mostra continuità; il metodo passa dalla parafrasi alla tesi.

### Mappa 6 — Conclusione

**File:** `mappa-06-conclusione.svg/.png`  
**Centro:** “Costellazione — affinità reali più costruzione”.  
**Relazioni:** testi e reti formano il laboratorio; Guinizzelli, Cavalcanti e Dante offrono risposte differenti; Dante partecipa e ordina; manoscritti trasmettono; critica stabilizza la categoria; il presente riapre la domanda.  
**Alt esteso:** Lo Stil novo nasce da testi e reti, assume esiti diversi in Guinizzelli, Cavalcanti e Dante, viene ordinato dalla genealogia dantesca, trasmesso dai manoscritti e definito dalla critica. Il presente riapre il rapporto tra sentimento, conoscenza e responsabilità.

## 5. Regole di integrazione nella PWA

### Hero

Usare `<picture>` con WebP 960 e 1600, mantenendo il PNG come fallback. Il titolo “Il dolce stil novo” e la domanda generatrice devono essere testo HTML sovrapposto, non parte dell’immagine. In verticale l’illustrazione può essere ritagliata con `object-position: 52% center`; non deve scomparire il percorso libro–occhio–cuore.

### Mappe

1. Mostrare una miniatura dentro la lezione.
2. Il tocco apre un dialog a pieno schermo con zoom e scorrimento.
3. Usare l’SVG come sorgente principale; il PNG è fallback/esportazione.
4. Aggiungere sotto la mappa un `<details>` con descrizione estesa.
5. Non caricare tutte le mappe in alta definizione nella home: usare `loading="lazy"`, esclusa la prima immagine visibile.
6. Su schermi stretti la mappa mantiene le proporzioni e può scorrere orizzontalmente nel dialog, senza comprimere i testi.

### Icone e stati

- `app-icon.svg`, `icon-192.png`, `icon-512.png` sono pronti.
- Le icone del menu possono restare semplici segni vettoriali/Unicode accompagnati da etichette testuali.
- Corretta: segno di spunta + “Risposta corretta”.
- Errata: croce + “Da rivedere”.
- Recuperata: freccia circolare + “Concetto recuperato”.
- Il colore rafforza lo stato, non lo sostituisce.

## 6. Accessibilità e qualità

- Contrasto testo/fondo pensato per superare il rapporto ordinario 4,5:1.
- Nessun testo informativo è incorporato nella copertina raster.
- Le mappe hanno testo alternativo breve nel tag `img` e descrizione completa nel pannello accessibile.
- I verbi sulle frecce rendono le relazioni esplicite.
- I PNG misurano 2000×1250 e restano leggibili anche nelle esportazioni.
- Gli SVG sono stati renderizzati e controllati visivamente dopo la generazione.
- Il primo controllo ha rilevato un difetto del filtro ombra nell’esportazione; il filtro è stato rimosso e tutte le mappe sono state rigenerate.
- Nessuna immagine esterna o con licenza incerta è stata inserita.

## 7. Manifesto degli asset

| Asset | Formato | Dimensione/ruolo |
|---|---|---|
| Hero master definitivo | PNG | 1672×941, file `v2` |
| Hero responsive definitivo | WebP | 1600×900 e 960×540, file `v2` |
| Mappe 01–06 | SVG | 1600×1000, uso principale |
| Mappe 01–06 | PNG | 2000×1250, fallback |
| Icona | SVG | 512×512 vettoriale |
| Icone manifest | PNG | 192×192 e 512×512 |

## 8. Consegna al Builder

Il Builder deve copiare `assets/maps`, `assets/icons` e soltanto i tre file hero `v2` nella PWA, conservando i nomi. Il file `tools/generate_maps.mjs` resta nel progetto come sorgente riproducibile: consente di correggere testi o relazioni e rigenerare tutti gli SVG senza ricostruirli manualmente. Le versioni PNG non devono essere modificate direttamente; si rigenerano dai corrispondenti SVG.
