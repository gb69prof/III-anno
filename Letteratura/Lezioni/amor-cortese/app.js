const app = document.getElementById('app');
const progressText = document.getElementById('progressText');
const installBtn = document.getElementById('installBtn');

const lessonOrder = [
  'che-cos-e',
  'famiglia-nobiliare',
  'andrea-cappellano',
  'trovatori-provenzali',
  'bernart-ventadorn',
  'trovatrici',
  'beatritz-de-dia'
];

const lessons = {
  'che-cos-e': {
    number: '2',
    title: 'Che cos’è l’amor cortese',
    subtitle: 'Definizione e caratteristiche fondamentali',
    card: 'Distanza, desiderio, idealizzazione: l’amore come sistema regolato.',
    formulaLabel: 'Formula di sezione',
    formula: 'L’amor cortese è desiderio disciplinato: vive solo se non si compie.',
    map: {
      icon: 'distance', center: 'Amor cortese', centerSub: 'Un sistema che vive nella tensione',
      nodes: [
        ['Distanza','Il pieno possesso è impedito: proprio il limite mantiene vivo l’amore.'],
        ['Desiderio','Nasce dalla distanza e si alimenta nell’attesa, non nel compimento.'],
        ['Idealizzazione','La dama è elevata a figura superiore, distante e quasi irraggiungibile.'],
        ['Codice','Segretezza, servizio, misura e linguaggio raffinato disciplinano il sentimento.']
      ]
    },
    content: `
      <div class="lead-block">
        <p>Se la sezione precedente ha mostrato la frattura da cui nasce, questa deve chiarire che cos’è realmente l’amor cortese. Non un semplice sentimento, ma un vero e proprio sistema: aristocratico, regolato, codificato. Un modo specifico di vivere e rappresentare l’amore, che non coincide né con l’esperienza spontanea dell’individuo né con le norme ufficiali della società.</p>
        <p>L’amor cortese si colloca in uno spazio intermedio: tra desiderio e proibizione. Ed è proprio questa tensione a definirlo.</p>
      </div>
      <section class="lesson-section">
        <h2>2.1 Definizione</h2>
        <p>L’amor cortese è un sistema amoroso aristocratico, nato all’interno della società feudale e destinato a una cerchia ristretta: la corte.</p>
        <p>Non si tratta di un amore libero, ma di un amore regolato. Possiede un proprio codice, implicito e talvolta esplicito, che stabilisce comportamenti, linguaggi, atteggiamenti.</p>
        <p>Alla base vi sono tre elementi fondamentali:</p>
        <ul>
          <li>la distanza, che impedisce il pieno possesso;</li>
          <li>il desiderio, che nasce proprio da questa distanza;</li>
          <li>l’idealizzazione, che trasforma la donna in figura superiore.</li>
        </ul>
        <p>L’amore, quindi, non è più un’esperienza immediata, ma una costruzione: vive nella tensione, non nella realizzazione.</p>
      </section>
      <section class="lesson-section">
        <h2>2.2 Caratteristiche principali</h2>
        <p>L’amor cortese si riconosce attraverso una serie di tratti ricorrenti, che definiscono la sua struttura interna.</p>
        <div class="trait-grid">
          <article class="trait-card"><strong>Amore adultero</strong><p>L’amore cortese si colloca spesso fuori dal matrimonio. Non nasce all’interno dell’istituzione, ma ai suoi margini.</p></article>
          <article class="trait-card"><strong>Non appagamento</strong><p>L’amore non si compie pienamente. O resta inappagato, oppure vive nella tensione continua verso ciò che non può essere raggiunto.</p></article>
          <article class="trait-card"><strong>Segretezza</strong><p>La relazione deve restare nascosta. Il segreto è parte costitutiva dell’amore stesso.</p></article>
          <article class="trait-card"><strong>Servizio alla donna (midons)</strong><p>L’amante si pone in posizione subordinata. La donna è figura superiore, quasi signore feudale a cui si deve fedeltà.</p></article>
          <article class="trait-card"><strong>Funzione nobilitante</strong><p>L’amore eleva chi lo prova. Non è solo passione, ma esperienza che raffina, che trasforma interiormente.</p></article>
          <article class="trait-card"><strong>Linguaggio raffinato e simbolico</strong><p>L’amore si esprime attraverso una lingua selezionata, codificata, ricca di immagini e allusioni.</p></article>
        </div>
        <p>In questo sistema, l’amore non è mai immediato: è sempre mediato da regole, gesti, parole.</p>
      </section>
      <section class="lesson-section">
        <h2>2.3 Una contraddizione interna</h2>
        <p>Dietro questa apparente coerenza si nasconde una tensione profonda.</p>
        <p>Da un lato, l’amor cortese conserva una componente sensuale, ereditata dal modello antico e presente soprattutto nei trovatori. Dall’altro, tende progressivamente a spiritualizzarsi, soprattutto nella tradizione italiana.</p>
        <p>Allo stesso tempo, esiste uno scarto tra realtà e rappresentazione. L’amore cortese nasce in un contesto sociale preciso, segnato da vincoli e interessi, ma nella poesia viene idealizzato, trasformato, quasi sottratto alla concretezza.</p>
        <p>Ne risulta un sistema che vive di equilibrio instabile: tra corpo e spirito, tra esperienza e costruzione letteraria.</p>
      </section>`
  },

  'famiglia-nobiliare': {
    number: '3',
    title: 'La famiglia nobiliare',
    subtitle: 'Il luogo in cui l’amore viene espulso dal matrimonio',
    card: 'Patrimonio, lignaggio, matrimonio e lo spazio simbolico del desiderio.',
    formulaLabel: 'Formula di sezione',
    formula: 'Quando il matrimonio esclude l’amore, l’amore si reinventa altrove.',
    map: {
      icon: 'house', center: 'Famiglia nobiliare', centerSub: 'Il matrimonio è istituzione, il desiderio cerca altrove',
      nodes: [
        ['Strategia','Il matrimonio consolida alleanze, ricchezze e continuità del lignaggio.'],
        ['Donna','È centrale nella politica familiare, ma non autonoma nella scelta affettiva.'],
        ['Cavaliere','Servizio, fedeltà e ricerca di riconoscimento ne modellano l’identità.'],
        ['Tensione','Il desiderio escluso dalle istituzioni si sposta: diventa nascosto e idealizzato.']
      ]
    },
    content: `
      <div class="lead-block">
        <p>Se l’amor cortese è un sistema che disciplina il desiderio, la famiglia nobiliare è il contesto che lo rende necessario. Non si tratta di un semplice sfondo sociale, ma di una struttura che incide direttamente sul modo in cui l’amore può — o non può — esistere.</p>
        <p>Nel mondo feudale, la famiglia non è un’unità affettiva nel senso moderno, ma un organismo economico e politico. Il suo scopo principale è la conservazione del patrimonio, la stabilità del potere e la continuità del lignaggio.</p>
      </div>
      <section class="lesson-section">
        <h2>3.1 Il matrimonio come strategia</h2>
        <p>Il matrimonio, in questo sistema, non nasce da una scelta individuale. È il risultato di accordi tra famiglie, finalizzati a consolidare alleanze, accrescere ricchezze e garantire equilibri sociali.</p>
        <p>L’amore, in quanto esperienza personale e imprevedibile, non è un criterio rilevante. Può esserci, ma non è necessario. E soprattutto, non è richiesto.</p>
        <p>Questa separazione tra matrimonio e amore è il primo elemento decisivo: l’istituzione che dovrebbe contenere l’unione tra uomo e donna non coincide con il luogo del desiderio.</p>
      </section>
      <section class="lesson-section">
        <h2>3.2 La posizione della donna</h2>
        <p>La donna nobile occupa una posizione ambigua. Da un lato è centrale nella logica familiare, perché attraverso di lei si costruiscono alleanze e si trasmette il patrimonio. Dall’altro è privata di autonomia nella scelta del proprio destino affettivo.</p>
        <p>All’interno del matrimonio, la donna è spesso isolata sul piano emotivo. La sua funzione è definita dal ruolo sociale, non dall’esperienza personale.</p>
        <p>È proprio questa condizione che contribuisce a rendere possibile l’immagine della dama cortese: figura elevata, distante, non accessibile nella realtà, ma centrale nell’immaginario.</p>
      </section>
      <section class="lesson-section">
        <h2>3.3 Il cavaliere</h2>
        <p>Anche la figura maschile presenta una tensione interna. Il cavaliere, soprattutto se non primogenito, può appartenere alla nobiltà senza possedere un pieno controllo economico e territoriale.</p>
        <p>La sua identità è legata al servizio, alla fedeltà, alla ricerca di riconoscimento. In questo contesto, l’amore cortese offre uno spazio simbolico in cui il cavaliere può affermarsi, dimostrando valore e dedizione.</p>
        <p>Il servizio alla donna riprende, in forma trasfigurata, il rapporto feudale tra vassallo e signore.</p>
      </section>
      <section class="lesson-section">
        <h2>3.4 La nascita di una tensione</h2>
        <p>Da questi elementi emerge una tensione strutturale.</p>
        <p>Il desiderio individuale non scompare, ma non trova spazio all’interno delle istituzioni. Il matrimonio lo esclude; la morale lo controlla; la società lo incanala.</p>
        <p>L’amore, allora, si sposta. Non potendo realizzarsi apertamente, si trasforma in esperienza nascosta, regolata, idealizzata.</p>
        <p>È in questo spostamento che nasce l’amor cortese: non come semplice invenzione poetica, ma come risposta a un sistema che ha separato l’unione sociale dall’esperienza del desiderio.</p>
      </section>
      <aside class="case-card">
        <span class="case-icon" aria-hidden="true">✦</span>
        <div><strong>Eloisa ed Abelardo, un caso concreto … ed eccezionale</strong><p>Un ponte verso una vicenda reale che permette di mettere alla prova categorie, norme e possibilità del mondo medievale.</p></div>
        <a href="../../Eloisa-Abelardo/index.html" aria-label="Apri Eloisa ed Abelardo">→</a>
      </aside>`
  },

  'andrea-cappellano': {
    number: '4',
    title: 'Andrea Cappellano',
    subtitle: 'Il manifesto dell’amor cortese',
    card: 'Il De Amore trasforma pratiche e linguaggi in una disciplina del sentimento.',
    formulaLabel: 'Formula di sezione',
    formula: 'Con Andrea Cappellano l’amore diventa codice: ma ogni codice, qui, nasce già incrinato.',
    map: {
      icon: 'book', center: 'Andrea Cappellano', centerSub: 'L’amore diventa codice',
      nodes: [
        ['De Amore','Dialoghi, esempi e norme costruiscono una vera teoria del comportamento amoroso.'],
        ['Desiderio','Nasce da bellezza e attrazione e coinvolge volontà e immaginazione.'],
        ['Segreto e distanza','Rischio, incertezza e difficoltà sono condizioni che mantengono vivo l’amore.'],
        ['Contraddizione','Forza nobilitante e trasgressione convivono: il sistema resta instabile.']
      ]
    },
    content: `
      <div class="lead-block">
        <p>Se la società feudale ha creato le condizioni dell’amor cortese, Andrea Cappellano è colui che ne fissa la forma. Con lui, ciò che prima era pratica diffusa e linguaggio poetico diventa sistema consapevole, quasi giuridico.</p>
        <p>Il suo trattato, il <em>De Amore</em>, non si limita a descrivere l’amore: lo organizza, lo definisce, ne stabilisce le regole. In questo senso, Andrea non è un semplice osservatore, ma un legislatore del sentimento.</p>
      </div>
      <section class="lesson-section">
        <h2>4.1 Il De Amore</h2>
        <p>Il <em>De Amore</em> è un’opera che si presenta come un manuale. Attraverso dialoghi, esempi e norme, Andrea costruisce una vera e propria teoria dell’amore.</p>
        <p>L’amore non è lasciato all’improvvisazione: deve seguire principi, comportamenti, codici precisi. Esiste un modo corretto di amare, e questo modo può essere insegnato.</p>
        <p>Questa impostazione segna un passaggio decisivo: l’amore non è più solo esperienza, ma disciplina.</p>
      </section>
      <section class="lesson-section">
        <h2>4.2 I principi fondamentali</h2>
        <p>Alla base della teoria di Andrea Cappellano vi sono alcuni principi che definiscono l’essenza dell’amor cortese.</p>
        <p>L’amore nasce dal desiderio, dalla visione della bellezza e dall’attrazione. Non è imposto né automatico: è un atto volontario che coinvolge la volontà e l’immaginazione.</p>
        <p>Vive nella tensione. Il timore di perdere l’amata, l’incertezza, la difficoltà non sono ostacoli, ma condizioni necessarie. Senza rischio e senza distanza, l’amore si spegne.</p>
        <p>È segreto. L’amore non può essere esibito pubblicamente, perché si colloca fuori dalle norme sociali e deve proteggersi da esse.</p>
        <p>Soprattutto, l’amore non coincide con il matrimonio. Secondo Andrea, tra coniugi non può esistere vero amore, perché il matrimonio elimina quella libertà e quella tensione che rendono possibile il desiderio.</p>
      </section>
      <section class="lesson-section">
        <h2>4.3 Una teoria instabile</h2>
        <p>Proprio nel momento in cui l’amor cortese viene definito con maggiore precisione, emergono le sue contraddizioni.</p>
        <p>Andrea costruisce un sistema coerente, ma questo sistema entra in tensione con la morale cristiana e con l’ordine sociale. L’amore viene esaltato come forza nobilitante, ma allo stesso tempo si fonda su adulterio, segretezza e trasgressione.</p>
        <p>Questa ambiguità non viene risolta. Il <em>De Amore</em> oscilla tra celebrazione e distanza critica, tra codificazione e ironia.</p>
        <p>È proprio questa instabilità a rendere l’opera centrale: Andrea non elimina la contraddizione dell’amor cortese, la rende visibile.</p>
      </section>`
  },

  'trovatori-provenzali': {
    number: '5',
    title: 'I trovatori provenzali',
    subtitle: 'La nascita poetica del linguaggio amoroso',
    card: 'Prima del codice: la lingua d’oc crea gesti, immagini e grammatica dell’amore.',
    formulaLabel: 'Formula di sezione',
    formula: 'Nei trovatori nasce il linguaggio dell’amore: prima ancora del codice, esiste la parola che lo rende possibile.',
    map: {
      icon: 'lute', center: 'I trovatori', centerSub: 'La parola rende possibile l’amore cortese',
      nodes: [
        ['Lingua d’oc','Una lingua raffinata e musicale costruisce sfumature, ripetizioni e variazioni.'],
        ['Servizio','Il poeta-cavaliere serve la dama con lessico di obbedienza, lealtà e merito.'],
        ['Desiderio e misura','La sensualità resta viva, ma la distanza le impedisce di consumarsi rapidamente.'],
        ['Prima della teoria','Formule e immagini condivise esistono già prima della codificazione di Andrea.']
      ]
    },
    content: `
      <div class="lead-block">
        <p>Prima che l’amor cortese diventi teoria e codice, è voce. Nasce nella poesia dei trovatori provenzali, tra XI e XII secolo, come pratica linguistica che dà forma a un’esperienza ancora in costruzione.</p>
        <p>I trovatori non spiegano l’amore: lo dicono. E nel dirlo, ne fissano i gesti, le immagini, le attese. Costruiscono un linguaggio capace di sostenere la distanza, di alimentare il desiderio e di trasformarlo in valore.</p>
      </div>
      <section class="lesson-section">
        <h2>5.1 La lingua e la forma</h2>
        <p>La poesia dei trovatori si esprime nella lingua d’oc, raffinata e musicale, adatta a una comunicazione colta ma non esclusivamente erudita. È una lingua che lavora sulla sfumatura, sulla ripetizione controllata, sulla variazione.</p>
        <p>Le forme poetiche sono regolate, ma non rigide: canzoni, sirventesi, tensoni. In esse, l’amore diventa tema centrale e occasione di esercizio stilistico.</p>
        <p>Il linguaggio non è neutro: seleziona, innalza, filtra. Dire l’amore significa già trasformarlo.</p>
      </section>
      <section class="lesson-section">
        <h2>5.2 L’amore come servizio</h2>
        <p>Il rapporto tra amante e donna è strutturato secondo il modello feudale: il poeta-cavaliere si pone al servizio della dama, riconosciuta come superiore.</p>
        <p>La donna è distante, spesso irraggiungibile. L’amante chiede, attende, serve. La sua identità si costruisce nella fedeltà e nella perseveranza.</p>
        <p>Il lessico dell’amore riprende quello della vassallità: obbedienza, lealtà, merito. L’amore diventa una prova, un esercizio di disciplina.</p>
      </section>
      <section class="lesson-section">
        <h2>5.3 Desiderio e misura</h2>
        <p>Nei trovatori il desiderio non è eliminato. Al contrario, è presente e vivo, talvolta anche concreto. Tuttavia, viene sottoposto a misura.</p>
        <p>La distanza non è solo ostacolo, ma condizione che impedisce al desiderio di consumarsi rapidamente. L’amore vive nella tensione, ma questa tensione non è ancora completamente spiritualizzata.</p>
        <p>Si mantiene un equilibrio instabile: tra sensualità e controllo, tra esperienza e costruzione.</p>
      </section>
      <section class="lesson-section">
        <h2>5.4 Un linguaggio che precede la teoria</h2>
        <p>Ciò che nei trovatori si afferma è, prima di tutto, un linguaggio.</p>
        <p>Prima di Andrea Cappellano e del suo codice, esiste già una grammatica dell’amore: formule, atteggiamenti, immagini condivise. La poesia crea uno spazio in cui l’amore può esistere senza coincidere con la realtà sociale.</p>
        <p>È questo spazio che renderà possibile la successiva codificazione.</p>
      </section>`
  },

  'bernart-ventadorn': {
    number: '5.1',
    title: 'Bernard de Ventadorn',
    subtitle: 'Un trovatore',
    card: 'L’allodola, la perdita di sé e la “merces” negata: il codice cortese si incrina.',
    formulaLabel: 'Formula di lettura',
    formula: 'Nel trovatore l’amore è desiderio che consuma: vive solo nella distanza e si spegne quando non trova risposta.',
    map: {
      icon: 'lark', center: 'Bernart de Ventadorn', centerSub: 'Il desiderio senza ricompensa',
      nodes: [
        ['Desidera · serve · soffre','La condizione tipica del trovatore concentra attesa, fedeltà e mancanza.'],
        ['Allodola e distanza','La gioia del volo mostra per contrasto ciò che al poeta è negato.'],
        ['Perdita di sé','Lo specchio e Narciso trasformano l’amore in dissoluzione dell’identità.'],
        ['Merces negata','Quando il servizio non trova riconoscimento, il meccanismo cortese si incrina.']
      ]
    },
    content: `
      <section class="bio-block">
        <h2>Breve biografia</h2>
        <p>Bernart de Ventadorn (1135-1195) è stato un celebre trovatore, poeta e compositore francese, riconosciuto come una delle figure più eminenti nella poesia trobadorica del periodo classico, scrivendo in lingua occitana.</p>
        <p>La sua biografia suggerisce che potrebbe non essere stato di umili origini come spesso si presume, ma piuttosto il figlio illegittimo di un nobile, forse Ebolo II di Ventadorn o addirittura Guglielmo IX d'Aquitania. Alcuni studi lo identificano con un Bernard della casata dei Ventadorn, che morì come abate di Saint-Martin de Tulle.</p>
        <p>Indipendentemente dalle sue origini, Bernart ebbe l'opportunità di formarsi artisticamente sotto la guida del visconte Ebolo II Lo Cantador, che lo introdusse all'arte della composizione lirica, o trobar.</p>
        <p>Le sue prime composizioni furono dedicate a Margherita di Turenna, circostanza che provocò la sua espulsione da Ventadorn.</p>
        <p>Bernart si spostò successivamente a Montluçon e Tolosa, e infine raggiunse la corte di Eleonora d'Aquitania in Inghilterra, dove divenne sposa del re Enrico II Plantageneto.</p>
        <p>Verso la fine della sua vita, si trasferì al servizio di Raimondo V di Tolosa e si ritirò nell'abbazia di Dalon, dove trascorse i suoi ultimi anni.</p>
        <p>È noto per il notevole numero di opere musicali sopravvissute con la notazione completa; delle sue quarantacinque poesie, diciotto includono la musica, una rarità per i trovatori del XII secolo.</p>
        <p>Le sue composizioni sono profondamente immerse nella tematica dell'amore cortese, esplorando la sofferenza e la speranza innescate dalla figura femminile idealizzata.</p>
        <p>Bernart paragona la fedeltà amorosa al servizio cavalleresco e talvolta anche a figure bibliche, come Giacobbe per Rachele. Tuttavia, lamenta che i meriti di tale servizio spesso non vengono riconosciuti, e si duole che i nuovi corteggiatori siano favoriti rispetto a chi ha dedicato tempo e dedizione.</p>
        <p>Come "maestro di canto", Bernart sviluppava le sue "cansons" in uno stile formalizzato che permetteva cambiamenti improvvisi, contribuendo a definire il genere e stabilire la forma classica della poesia dell'amor cortese.</p>
        <p>La sua abilità di evocare immagini divine della donna amata, solo per poi denunciarne la natura peccaminosa, illustra la complessità e la raffinatezza della sua opera, che rifletteva la dicotomia dell'amore e del peccato.</p>
        <p>Nel suo trobar leu, la chiarezza apparente delle composizioni celava livelli di interpretazione più profondi, spaziando dalla dottrina religiosa alla meditazione filosofica.</p>
        <p>Bernart de Ventadorn è considerato una delle figure più influenti nella tradizione troviera della Francia settentrionale, influenzando non solo i trovatori ma anche la letteratura latina.</p>
        <p>La sua eredità si perpetua attraverso la diffusione delle sue melodie e dei suoi temi poetici, che sono stati emulati dai compositori successivi, consolidando il suo posto come uno dei grandi maestri della poesia e musica medievale.</p>
      </section>
      <section class="poem-block">
        <header><h2>Quan vei la lauzeta mover</h2></header>
        <div class="poem-columns">
          <div class="poem-column">
            <h3>Testo originale</h3>
            <p class="stanza">Quan vei la lauzeta mover
De joi sas alas contra ‘l rai
Que s’oblid’e’s laissa chazer
Per la dosso c’al cor li vai,
ai tan grans enveya m’en ve
de cui qu’eu veya jauzion,
meravilhas ai, car desse
lo cor de dezirer no’m fon.</p>
            <p class="stanza">Ai las! Tan cuidava saber
d’amor e tan petit en sai!
Car eu d’amar no’m posc tener
Celeis don ja pro non aurai.
Tout m’a mo cor, e tout m’a me,
E se mezeis’e tot lo mon;
e can se’m tolc, no’m laisser re
mas desirer e cor volo.</p>
            <p class="stanza">Anc non agui de me poder
Ni no fui meus de l’or en sai
Que’m laisset en sos olhs vezer
En ub miralh que mout me plai.
Miralhs, pus me mirei en te,
m’an mort li sospir de preon,
c’aissim’ perdei com perdei se
lo bel Narcisus en la font.</p>
            <p class="stanza">De las domnas me desesper
Ja mais en lor no,m fiarai;
c’aissi com las solh chaptener,
enaissi las dechaptenrai.
Pois vei ch’una pro no me’n te
Vas leis que’m destrui e’m cofon,
totas las dopt’e las mescre,
car be sai’c’atretals se son.</p>
            <p class="stanza">D’aisso’s fa be femna parer
Ma domna par qu’elh a retrai,
car no vol so co’m deu voler,
e so c’om li deveda fai.
Chazutz sui en mala merce
Et ai be faih co’l fols en pon;
E no sai per que m’esdeve,
mas car trop puyei contra mon.</p>
            <p class="stanza">Merces es perduda, per ver
Et eo non o saubi anc mai
Car eilh qui plus en degr’aver,
No’n a ges; et on la querrai?
A! Can mal sembla, qui la ve,
qued aquesta chaitiu deliro
que ja ses leis non aura be,
laisse morir, que no l’aon.</p>
            <p class="stanza">Pus ab midons no.m pot valer
Precs ni merces ni.l dreihz qu'eu ai,
Ni a leis no ven a plazer
Qu'eu l'am, ja mais no.lh o dirai.
Aissi.m part de leis e.m recre;
Mort m'a, e per mort li respon,
E vau m'en, pus ilh no.m rete,
Chaitius, en issilh, no sai on.</p>
            <p class="stanza">Tristans,ges no,m’auretz de me
qu’eu m’en vau, chaitius no sai on.
De chanter me gice’m recre,
e de joi e d’amor m’escon.</p>
          </div>
          <div class="poem-column">
            <h3>Traduzione</h3>
            <p class="stanza">Se l’allodola lieta vedo
muovere l’ali incontro al sole
In dolce oblio, a invidia cedo
grande verso colui che suole
goder le gioie dell’amore.
Ed altro senso ancor mi piglia
In fondo all’anelante cuore,
quasi una viva meraviglia.</p>
            <p class="stanza">Ahimé! Io credevo sapere
d’amore e sì poco ne so!
ché d’’amar non mi so tenere
colei da cui nulla otterrò.
Ella ha il mio cuore e la mia testa
Se stessa e l’intero universo;
senza lei, null’altro mi resta
che desiderio e un cuore perso.</p>
            <p class="stanza">Io più non possiedo me stesso
da quando, e non più trovai pace,
ne’ tuoi occhi ebbi il permesso
di mirarmi, oh quanto mi piace!
Poi che mi son specchiato in te,
fondi sospiri m’hanno ucciso
mi persi come si perdé
dentro la fonte il bel Narciso.</p>
            <p class="stanza">Di donne non ho più illusione;
mai più di lor mi fiderò;
tanta n’ho fatta esaltazione
altrettanto le sprezzerò
poiché nessuna è a mio favore
contro lei che così m’ammazza,
di tutte diffido e ho timore
perché son tutte di una razza.</p>
            <p class="stanza">Mia dama ben femmina appare,
disprezza la mia volontà:
ciò che le chiedo non vuol fare,
ciò che le vieto, quello fa.
In mala grazia son caduto
E sono ancora frastornato.
Non so perché questo è accaduto
se non per troppo aver cercato.</p>
            <p class="stanza">La misericordia è perduta
Finora nulla io ne sapevo
Chi più dovrebbe averne avuta
Non ne da’. E dove cercar devo?
Assurdo pare a chi la vede
Che chi senza lei non ha bene
Lasci morir, ché invano chiede,
senza addolcire le sue pene.</p>
            <p class="stanza">Per la mia dama nulla vale:
Non le preghiere ne mercè,
I dritti miei tiene in non cale,
“t’amo”non vuol sentir da me.
Misero parto e non dirò che l’amo
Non mi trattiene; esule andrò
E da morte che n’ebbi sol la chiamo
Dove men vado io non lo so</p>
            <p class="stanza">Non m’udirete più, Tristano,
me ne vado, dove non so.
Smetto questo cantar mio vano
Gioia ed amore più non ho.</p>
          </div>
        </div>
      </section>
      <section class="reading-block">
        <h2>Lettura</h2>
        <p>Nel testo emerge con chiarezza uno dei nuclei fondamentali dell’amor cortese: il desiderio che non si compie.</p>
        <p>Il poeta osserva l’allodola che si abbandona alla gioia del volo e, proprio in quel momento, avverte una profonda invidia.</p>
        <p>Quella gioia, infatti, è qualcosa che a lui è negato.</p>
        <p>L’amore non è esperienza di possesso, ma tensione continua verso qualcosa che resta irraggiungibile.</p>
        <p>La donna amata non è mai realmente accessibile: è figura che attira e allo stesso tempo sottrae.</p>
        <p>Da qui nasce la condizione tipica del trovatore:</p>
        <ul><li>desidera</li><li>serve</li><li>soffre</li></ul>
        <p>Il poeta dichiara di non possedere più sé stesso: l’amore lo ha completamente assorbito.</p>
        <p>L’immagine dello specchio e il riferimento a Narciso mostrano un ulteriore elemento: l’amore è anche perdita di sé.</p>
        <p>Non si tratta solo di desiderare l’altro, ma di dissolversi in quella tensione.</p>
        <p>A questo si aggiunge una crisi più profonda.</p>
        <p>Il poeta passa dall’esaltazione alla disillusione: accusa la donna, accusa tutte le donne, accusa la mancanza di "merces".</p>
        <p>Qui il codice cortese mostra una crepa.</p>
        <p>Il sistema prevede servizio, fedeltà, attesa.</p>
        <p>Ma quando il riconoscimento non arriva, il meccanismo si incrina.</p>
        <p>L’amore resta, ma diventa sofferenza senza compensazione.</p>
        <p>Il finale è netto: il poeta abbandona il canto, abbandona l’amore, si ritira.</p>
        <p>Non c’è soluzione.</p>
      </section>`
  },

  'trovatrici': {
    number: '6',
    title: 'Le trovatrici',
    subtitle: 'La voce femminile dentro il sistema cortese',
    card: 'Quando la donna prende parola, l’asimmetria del modello non resta intatta.',
    formulaLabel: 'Formula di sezione',
    formula: 'Quando la donna prende parola, l’amor cortese smette di essere un sistema chiuso.',
    map: {
      icon: 'voice', center: 'Le trovatrici', centerSub: 'La donna diventa soggetto del discorso',
      nodes: [
        ['Stesso codice','Lingua, forme e ambiente culturale restano quelli della tradizione trobadorica.'],
        ['Voce femminile','La donna non è più soltanto oggetto dello sguardo: desidera, rifiuta, giudica.'],
        ['Reciprocità','L’amore può diventare relazione fra due soggetti, non solo servizio unilaterale.'],
        ['Crisi della subordinazione','La perfetta asimmetria si incrina quando la dama diventa interlocutrice reale.']
      ]
    },
    content: `
      <div class="lead-block">
        <p>Se fino a questo punto l’amor cortese si è costruito come sistema coerente — fondato sulla distanza, sul servizio e sull’idealizzazione — con le trovatrici qualcosa cambia. Non dall’esterno, ma dall’interno.</p>
        <p>La loro presenza è limitata nel numero, ma decisiva nel significato: introduce una voce che non si limita a essere oggetto del discorso amoroso, ma ne diventa soggetto.</p>
      </div>
      <section class="lesson-section">
        <h2>6.1 Una posizione interna e dissonante</h2>
        <p>Le trovatrici operano nello stesso ambiente culturale dei trovatori. Utilizzano la stessa lingua, le stesse forme poetiche, lo stesso codice.</p>
        <p>Ma lo abitano in modo diverso.</p>
        <p>Non parlano come chi serve, ma come chi può scegliere. Non chiedono, ma rispondono. Non idealizzano soltanto: giudicano.</p>
        <p>Questa differenza non rompe subito il sistema, ma lo rende instabile.</p>
      </section>
      <section class="lesson-section">
        <h2>6.2 La donna come soggetto del discorso amoroso</h2>
        <p>Nel modello cortese tradizionale, la donna è centrale ma muta: esiste nello sguardo dell’amante.</p>
        <p>Con le trovatrici, la donna prende parola.</p>
        <p>Esprime desiderio, attesa, rifiuto, ironia. L’amore non è più solo tensione maschile verso un ideale, ma relazione che può essere accettata, modificata, respinta.</p>
        <p>Qui compare un elemento nuovo: la reciprocità.</p>
        <p>E con essa, la fine della perfetta asimmetria.</p>
      </section>
      <section class="lesson-section">
        <h2>6.3 La crisi del modello della subordinazione</h2>
        <p>Se la donna può parlare, allora non è più soltanto figura superiore e distante. Diventa interlocutrice reale.</p>
        <p>Il modello della subordinazione dell’amante entra in tensione. Il servizio perde la sua assolutezza. L’amore smette di essere unilaterale.</p>
        <p>Non siamo ancora alla rottura del sistema, ma a una sua incrinatura profonda.</p>
      </section>
      <section class="lesson-section">
        <h2>6.4 Una crepa che non si richiude</h2>
        <p>Le trovatrici restano una minoranza. Il modello dominante resta maschile.</p>
        <p>Ma qualcosa è cambiato definitivamente.</p>
        <p>Per la prima volta, il centro del sistema — la donna — non è più solo costruito, ma si esprime. E nel momento in cui parla, l’idealizzazione si confronta con la realtà.</p>
        <p>Questa crepa non distrugge l’amor cortese, ma lo espone.</p>
      </section>`
  },

  'beatritz-de-dia': {
    number: '6.1',
    title: 'Beatritz de Dia',
    subtitle: 'Una trobairitz',
    card: 'Una donna desidera, ricorda e pone condizioni: il codice viene esposto alla realtà.',
    formulaLabel: 'Formula di lettura',
    formula: 'Nella trobairitz il desiderio cambia voce: quando la donna parla, l’amor cortese smette di essere equilibrio e diventa tensione.',
    map: {
      icon: 'choice', center: 'Beatritz de Dia', centerSub: 'Il desiderio cambia voce',
      nodes: [
        ['Esperienza vissuta','L’amore è ricordato e rivendicato in prima persona, non semplicemente contemplato.'],
        ['Desiderio concreto','Vicinanza fisica, contatto e possesso reciproco vengono espressi senza mediazioni.'],
        ['Soggetto attivo','La donna chiede, immagina, formula condizioni e decide come interlocutrice reale.'],
        ['Il codice esposto','Le forme cortesi restano, ma la concretezza femminile ne mette alla prova l’asimmetria.']
      ]
    },
    content: `
      <section class="bio-block">
        <h2>Breve biografia</h2>
        <p>Beatritz de Dia, nota anche come la Contessa di Dia, è stata la più celebre delle trobairitz, poetesse e musiciste originarie della Provenza, attiva nella seconda metà del XII secolo tra Provenza e Lombardia.</p>
        <p>Nonostante le informazioni sulla sua vita siano limitate, è comunemente accettato che nacque attorno al 1140. La sua "vida", una sorta di biografia poetica, non rivela il suo nome di battesimo, ma diverse fonti concordano nel chiamarla Beatrix.</p>
        <p>Beatritz potrebbe essere stata sposata con Guillem de Peitieus, forse un conte del Valentinois che regnò dal 1158 al 1189, oppure con Raimon d'Agout, un mecenate di trovatori attivo dal 1184 al 1214, da cui ebbe un figlio, Isnart d'Entrevenas, e figlia di Jaufre Reforzat de Trets.</p>
        <p>È documentato che Beatritz dedicò poesie d'amore a Rimbaud d'Orange (1146-1173).</p>
        <p>Le sue opere, spesso accompagnate da melodie di flauto, sono considerate gioielli di rara e delicata bellezza.</p>
        <p>Tuttavia, di tutte le sue composizioni, sono sopravvissute solo cinque canzoni: quattro cansos e una tenzone, "Amics, en greu consirier", la cui attribuzione rimane incerta a causa delle sue somiglianze con un'opera di Raimbaut d'Aurenga.</p>
        <p>La sua canzone "A chantar m'er de so qu'eu no volria", scritta in lingua occitana, è l'unica canso di una trobairitz a noi pervenuta con la notazione musicale completa.</p>
        <p>Quest'opera è conservata nel Le manuscript du roi, un canzoniere redatto intorno al 1270 per Carlo d'Angiò, fratello di Luigi IX.</p>
        <p>Questo brano non solo testimonia la maestria artistica di Beatritz ma è anche un raro esempio della capacità delle trobairitz di combinare poesia e musica in un'epoca dominata prevalentemente da figure maschili.</p>
      </section>
      <section class="poem-block">
        <header><h2>Estat ai en greu cossirier</h2></header>
        <div class="poem-columns">
          <div class="poem-column">
            <h3>Testo originale</h3>
            <p class="stanza">Estat ai en greu cossirier
per un cavallier q' ai agut,
e vuoill sia totz temps saubut
cum eu l' ai amat a sobrier;
ara vei q' ieu sui trahida
car eu non li donei m' amor,
don ai estat en gran error
en lieig e qand sui vestida.</p>
            <p class="stanza">Ben volria mon cavallier
tener un ser en mos bratz nut
q' el s' en tengra per ereubut
sol q' a lui fezes cosseillier
car plus m' en sui abellida
no fetz Floris de Blanchaflor
eu l' autrei mon cor e m' amor
mon sen, mos huoills e ma vida.</p>
            <p class="stanza">Bels Amics, avinens e bos,
cora ·us tenrai en mon poder,
eque iagues ab vos un ser,
e qe ·us des un bais amoros?
sapchatz, gran talan n' auria
qe ·us tengues en luoc del marit,
ab so que m' aguessetz plevit
de far tot so qu' eu volria.</p>
          </div>
          <div class="poem-column">
            <h3>Traduzione</h3>
            <p class="stanza">Sono stata in grave pena
per un cavaliere che ho avuto;
e voglio che si sappia in ogni tempo
come l'ho amato oltre misura.
Ora vedo che sono tradita
poiché non gli ho concesso il mio amore,
per questo sono stata in grande smarrimento
nel letto e quando sono vestita.</p>
            <p class="stanza">Vorrei tanto tenere il mio cavaliere
una sera nelle mie braccia, nudo,
e che egli si ritenesse felicissimo
se solo gli facessi da cuscino,
poiché me ne sono innamorata più
di quanto fece Floris con la sua Blanchaflor
io gli concedo il mio cuore, il mio amore,
la mia ragione, i miei occhi, la mia vita.</p>
            <p class="stanza">Bell'amico, gentile e cortese,
quando vi avrò in mio potere,
in modo da giacere vicino a voi per una sera,
e darvi un bacio amoroso?
Sappiate che avrei un grande desiderio
di avervi al posto del marito,
purché mi promettiate
di fare tutto ciò che io desideri.</p>
          </div>
        </div>
      </section>
      <section class="reading-block">
        <h2>Lettura</h2>
        <p>Nel testo emerge con forza una variazione interna al modello dell’amor cortese.</p>
        <p>La voce che parla non è quella del cavaliere, ma quella della donna.</p>
        <p>E non è una donna idealizzata e distante, ma una donna che desidera, che ricorda, che rivendica.</p>
        <p>Fin dall’inizio il tono è chiaro: l’amore è esperienza vissuta, non contemplata.</p>
        <p>La poetessa riconosce di aver amato profondamente e di essere stata tradita. Il centro del discorso non è più il servizio alla donna, ma la relazione concreta tra due individui.</p>
        <p>Il desiderio è espresso senza mediazioni:</p>
        <ul><li>la vicinanza fisica</li><li>il contatto</li><li>il possesso reciproco</li></ul>
        <p>Questi elementi, che nel codice cortese restano impliciti o sublimati, qui emergono in modo diretto.</p>
        <p>La donna non è più oggetto del desiderio, ma soggetto attivo.</p>
        <p>Chiede, immagina, formula condizioni.</p>
        <p>La richiesta finale è esplicita: sostituire il marito con l’amante, a patto che l’uomo accetti di rispondere ai suoi desideri.</p>
        <p>Qui il sistema cortese mostra chiaramente una tensione.</p>
        <p>Da un lato restano le forme del linguaggio amoroso; dall’altro entra una dimensione concreta che le mette alla prova.</p>
        <p>Il codice non è ancora distrutto, ma è esposto.</p>
      </section>`
  }
};

const glossary = [
  ['Amor cortese','Sistema amoroso aristocratico e codificato, costruito sulla distanza, sul desiderio e sull’idealizzazione della dama.'],
  ['Corte','Ambiente aristocratico in cui si sviluppano pratiche sociali e forme letterarie dell’amor cortese.'],
  ['Distanza','Separazione fra amante e dama che impedisce il pieno possesso e mantiene vivo il desiderio.'],
  ['Idealizzazione','Trasformazione della donna amata in figura superiore, quasi sottratta alla realtà concreta.'],
  ['Midons','Termine cortese con cui l’amante indica la dama come “mio signore”, sottolineando la propria subordinazione.'],
  ['Vassallità','Rapporto feudale di servizio e fedeltà che fornisce un modello simbolico al rapporto fra amante e dama.'],
  ['Lignaggio','Continuità della famiglia nobiliare e della sua discendenza, centrale nella trasmissione di patrimonio e potere.'],
  ['Primogenito','Primo figlio maschio, spesso privilegiato nella trasmissione di beni e prerogative familiari.'],
  ['Segretezza','Necessità di tenere nascosta la relazione amorosa, collocata ai margini delle norme sociali.'],
  ['Funzione nobilitante','Idea secondo cui l’amore raffina e trasforma interiormente chi lo vive.'],
  ['De Amore','Trattato attribuito ad Andrea Cappellano che organizza in forma teorica e normativa il sistema dell’amor cortese.'],
  ['Lingua d’oc','Lingua romanza dell’area occitanica nella quale si esprime la poesia dei trovatori provenzali.'],
  ['Trobar','Arte del comporre poetico e musicale dei trovatori.'],
  ['Trovatore','Poeta e compositore in lingua d’oc, protagonista della lirica cortese medievale.'],
  ['Trobairitz','Forma occitana per indicare una poetessa-compositrice della tradizione trobadorica.'],
  ['Canso','Componimento lirico, spesso amoroso, fra le forme principali della poesia trobadorica.'],
  ['Sirventese','Componimento trobadorico spesso legato a temi morali, politici o polemici.'],
  ['Tensone','Componimento dialogico o di disputa poetica tra due voci.'],
  ['Merces','Ricompensa, grazia o riconoscimento atteso dall’amante per il proprio servizio.'],
  ['Trobar leu','Stile poetico apparentemente chiaro e leggero, capace però di sostenere significati più complessi.'],
  ['Vida','Breve biografia medievale, spesso costruita intorno alla figura di un trovatore o di una trobairitz.'],
  ['Reciprocità','Relazione nella quale entrambi i soggetti possono desiderare, accettare, rifiutare e rispondere.'],
  ['Non appagamento','Condizione per cui l’amore non si compie pienamente e continua a vivere come tensione.'],
  ['Codificazione','Passaggio da pratiche e immagini diffuse a un insieme consapevole di regole e principi.']
];

const quizData = [
  {
    id:'q1',lessonId:'che-cos-e',q:'Quale triade definisce la base dell’amor cortese nella lezione?',
    answers:['Distanza, desiderio, idealizzazione','Fedeltà, matrimonio, discendenza','Bellezza, ricchezza, prestigio'],correct:0,
    recoveryTitle:'Il nucleo del sistema cortese',
    recovery:'L’amor cortese nasce dall’intreccio di tre elementi: la distanza impedisce il pieno possesso, il desiderio nasce proprio da quel limite e l’idealizzazione eleva la dama sopra l’amante.'
  },
  {
    id:'q2',lessonId:'che-cos-e',q:'Perché il non appagamento è strutturale nell’amor cortese?',
    answers:['Perché mantiene viva la tensione verso ciò che non si raggiunge','Perché rende inutile qualsiasi forma di fedeltà amorosa','Perché trasforma ogni relazione in un matrimonio segreto'],correct:0,
    recoveryTitle:'Desiderio e non compimento',
    recovery:'Il desiderio cortese non vive nonostante la distanza, ma grazie alla distanza: il pieno compimento rischierebbe di cancellare proprio la tensione che sostiene l’esperienza amorosa.'
  },
  {
    id:'q3',lessonId:'che-cos-e',q:'Che cosa significa la funzione nobilitante dell’amore?',
    answers:['Che l’amore raffina e trasforma interiormente chi lo prova','Che l’amore garantisce un titolo nobiliare all’amante','Che l’amore trasferisce il patrimonio dalla dama al cavaliere'],correct:0,
    recoveryTitle:'L’amore come trasformazione',
    recovery:'Nel codice cortese l’amore non è soltanto passione: è presentato come un’esperienza capace di elevare, disciplinare e raffinare il comportamento dell’amante.'
  },
  {
    id:'q4',lessonId:'famiglia-nobiliare',q:'Qual è la funzione principale del matrimonio nella famiglia nobiliare descritta nella lezione?',
    answers:['Consolidare alleanze, patrimonio e continuità familiare','Realizzare la scelta affettiva dei due coniugi','Separare completamente la famiglia dal potere politico'],correct:0,
    recoveryTitle:'Il matrimonio come strategia',
    recovery:'Nel quadro proposto, il matrimonio nobiliare è prima di tutto un dispositivo economico e politico: serve a consolidare alleanze, ricchezze e continuità del lignaggio.'
  },
  {
    id:'q5',lessonId:'famiglia-nobiliare',q:'Perché la posizione della donna nobile è definita “ambigua”?',
    answers:['È centrale nelle alleanze ma limitata nella scelta del proprio destino affettivo','È esclusa dalla trasmissione dei beni ma completamente libera nella scelta affettiva','È marginale nelle alleanze ma controlla in autonomia le decisioni economiche della famiglia'],correct:0,
    recoveryTitle:'Centralità e mancanza di autonomia',
    recovery:'La donna è decisiva per alleanze e trasmissione familiare, ma proprio questa centralità sociale può convivere con una forte limitazione dell’autonomia affettiva.'
  },
  {
    id:'q6',lessonId:'famiglia-nobiliare',q:'Quale rapporto sociale viene trasfigurato nel servizio del cavaliere alla dama?',
    answers:['Il rapporto feudale tra vassallo e signore','Il rapporto mercantile tra debitore e creditore','Il rapporto monastico tra abate e novizio'],correct:0,
    recoveryTitle:'Il modello feudale dell’amore',
    recovery:'Il lessico della fedeltà, dell’obbedienza e del servizio deriva dal mondo feudale: l’amante assume simbolicamente la posizione del vassallo e la dama quella del signore.'
  },
  {
    id:'q7',lessonId:'andrea-cappellano',q:'Che cosa cambia con il De Amore di Andrea Cappellano?',
    answers:['L’amore viene organizzato come disciplina dotata di principi e regole','La poesia amorosa viene abbandonata a favore della cronaca politica','Il matrimonio diventa l’unico luogo riconosciuto del desiderio'],correct:0,
    recoveryTitle:'Dalla pratica al codice',
    recovery:'Con Andrea Cappellano ciò che circolava come linguaggio e pratica viene reso esplicito: il sentimento viene descritto, ordinato e presentato quasi come una disciplina insegnabile.'
  },
  {
    id:'q8',lessonId:'andrea-cappellano',q:'Secondo la lezione, perché difficoltà e incertezza non sono semplici ostacoli?',
    answers:['Perché alimentano la tensione che rende vivo il desiderio','Perché obbligano gli amanti a celebrare subito il matrimonio','Perché eliminano ogni componente sensuale dall’esperienza amorosa'],correct:0,
    recoveryTitle:'La tensione come condizione',
    recovery:'Nel sistema di Andrea, rischio, timore e distanza fanno parte del meccanismo amoroso: senza difficoltà, la tensione che sostiene il desiderio si indebolisce.'
  },
  {
    id:'q9',lessonId:'andrea-cappellano',q:'Quale contraddizione rende instabile la teoria di Andrea Cappellano?',
    answers:['Esalta l’amore come nobilitante ma lo lega a segretezza, adulterio e trasgressione','Difende il matrimonio come unico luogo dell’amore ma nega ogni libertà ai coniugi','Rifiuta il desiderio come esperienza umana ma considera la sensualità un dovere religioso'],correct:0,
    recoveryTitle:'Un codice già incrinato',
    recovery:'La teoria celebra la forza trasformativa dell’amore, ma la colloca spesso fuori dalle norme sociali e morali. La sua coerenza interna entra così in conflitto con l’ordine cristiano e matrimoniale.'
  },
  {
    id:'q10',lessonId:'trovatori-provenzali',q:'In quale lingua si esprime la poesia dei trovatori provenzali?',
    answers:['Nella lingua d’oc','Nella lingua d’oïl','Nel latino notarile'],correct:0,
    recoveryTitle:'La lingua dei trovatori',
    recovery:'La lirica trobadorica nasce nell’area occitanica e usa la lingua d’oc, che diventa veicolo di una poesia raffinata, musicale e fortemente codificata.'
  },
  {
    id:'q11',lessonId:'trovatori-provenzali',q:'Come viene descritto il desiderio nella poesia dei trovatori?',
    answers:['Presente e vivo, ma regolato dalla misura','Cancellato del tutto dalla disciplina cortese','Ridotto a strumento delle alleanze familiari'],correct:0,
    recoveryTitle:'Sensualità e misura',
    recovery:'Nei trovatori il desiderio non viene eliminato. Resta concreto e sensibile, ma è disciplinato dalla distanza, dalla fedeltà e dalla necessità di mantenere la tensione.'
  },
  {
    id:'q12',lessonId:'trovatori-provenzali',q:'Perché la poesia dei trovatori “precede la teoria”?',
    answers:['Perché crea formule e immagini dell’amore prima della codificazione di Andrea','Perché elimina le regole del desiderio prima che si sviluppi la società di corte','Perché nasce dopo il De Amore e ne ripete in forma poetica quasi tutte le norme'],correct:0,
    recoveryTitle:'La grammatica prima del manuale',
    recovery:'Prima che Andrea Cappellano trasformi l’amore in teoria, la poesia trobadorica ha già costruito una grammatica condivisa: gesti, immagini, lessico e situazioni ricorrenti.'
  },
  {
    id:'q13',lessonId:'bernart-ventadorn',q:'Che cosa provoca nel poeta l’immagine dell’allodola gioiosa?',
    answers:['L’invidia per una gioia che sente negata a sé stesso','La decisione di celebrare pubblicamente il proprio amore','La certezza di aver finalmente raggiunto la dama'],correct:0,
    recoveryTitle:'L’allodola come contrasto',
    recovery:'Il volo gioioso dell’allodola diventa uno specchio rovesciato: rende visibile la felicità che il poeta non possiede e accresce la percezione della propria mancanza.'
  },
  {
    id:'q14',lessonId:'bernart-ventadorn',q:'Che cosa suggeriscono lo specchio e il richiamo a Narciso nella lettura proposta?',
    answers:['Che l’amore può trasformarsi in perdita di sé e della propria identità','Che la dama riconosce finalmente il merito e la fedeltà del poeta','Che il poeta rifiuta ogni forma di immaginazione e idealizzazione amorosa'],correct:0,
    recoveryTitle:'Narciso e la perdita di sé',
    recovery:'Lo specchio non porta a una maggiore conoscenza di sé: nel testo diventa il luogo in cui l’amante si perde. Il richiamo a Narciso accentua l’idea di un’identità assorbita dal desiderio.'
  },
  {
    id:'q15',lessonId:'bernart-ventadorn',q:'Quando il codice cortese si incrina nel testo di Bernart?',
    answers:['Quando il servizio non riceve la “merces” attesa','Quando la dama accetta immediatamente il matrimonio','Quando il poeta sceglie di rinunciare alla lingua d’oc'],correct:0,
    recoveryTitle:'La merces che non arriva',
    recovery:'Il sistema promette valore al servizio, alla fedeltà e all’attesa. Quando nessun riconoscimento arriva, il meccanismo perde la sua compensazione simbolica e il poeta passa alla disillusione.'
  },
  {
    id:'q16',lessonId:'trovatrici',q:'Qual è la novità decisiva introdotta dalle trovatrici?',
    answers:['La donna diventa soggetto del discorso amoroso','La donna scompare del tutto dal linguaggio poetico','La poesia viene separata da ogni esperienza del desiderio'],correct:0,
    recoveryTitle:'Dall’essere cantata al prendere parola',
    recovery:'Le trovatrici usano lo stesso sistema culturale, ma cambiano la posizione della voce: la donna non è soltanto costruita dallo sguardo maschile, bensì parla, desidera e giudica.'
  },
  {
    id:'q17',lessonId:'trovatrici',q:'Che cosa cambia con l’introduzione della reciprocità?',
    answers:['La perfetta asimmetria tra amante e dama viene messa in crisi','Il servizio feudale diventa obbligatorio anche nel matrimonio','La donna torna a essere esclusivamente una figura idealizzata'],correct:0,
    recoveryTitle:'La fine dell’asimmetria perfetta',
    recovery:'Se la donna può rispondere, accettare o rifiutare, il rapporto non è più completamente unilaterale. La presenza di due soggetti reali mette in tensione il vecchio schema del servizio assoluto.'
  },
  {
    id:'q18',lessonId:'beatritz-de-dia',q:'Come viene descritto il desiderio nella lettura di Beatritz de Dia?',
    answers:['Come esperienza concreta espressa senza mediazioni','Come sentimento esclusivamente contemplativo e senza corpo','Come obbligo imposto dalla strategia matrimoniale'],correct:0,
    recoveryTitle:'Il desiderio cambia voce',
    recovery:'Nella lettura proposta, Beatritz introduce un desiderio detto in prima persona, con riferimenti alla vicinanza fisica, al contatto e al possesso reciproco.'
  },
  {
    id:'q19',lessonId:'beatritz-de-dia',q:'Perché Beatritz mette alla prova il modello cortese?',
    answers:['Perché conserva il codice ma introduce una donna che desidera e decide','Perché abbandona il codice e sostituisce la lirica con un discorso soltanto giuridico','Perché rifiuta il desiderio e riconduce l’amore esclusivamente al matrimonio'],correct:0,
    recoveryTitle:'Il codice esposto alla realtà',
    recovery:'Le forme cortesi non scompaiono, ma la voce femminile concreta ne rivela i limiti: la donna non è soltanto dama ideale, è un soggetto che desidera, formula condizioni e valuta l’altro.'
  },
  {
    id:'q20',lessonId:'che-cos-e',q:'Quale percorso complessivo emerge dalle sette lezioni?',
    answers:['Dal contesto sociale e dal codice alla sua messa alla prova nelle voci poetiche','Dalla nascita del matrimonio d’amore alla scomparsa della poesia cortese','Dalla condanna dei trovatori alla sostituzione della lingua d’oc con il latino'],correct:0,
    recoveryTitle:'Il filo dell’intero percorso',
    recovery:'Il percorso parte dalle condizioni sociali, definisce il sistema, osserva la codificazione di Andrea, ascolta i trovatori e infine mostra le crepe del modello nelle esperienze di Bernart e delle trovatrici.'
  }
];

const synthesisSteps = [
  ['Che cos’è','L’amor cortese è un sistema costruito su distanza, desiderio, idealizzazione, segretezza e servizio. Vive in un equilibrio instabile fra corpo e spirito.'],
  ['La famiglia nobiliare','Il matrimonio risponde ad alleanze, patrimonio e lignaggio. Il desiderio individuale, non coincidente con l’istituzione, cerca un altro spazio.'],
  ['Andrea Cappellano','Il De Amore rende esplicito il codice. Proprio questa codificazione mostra il conflitto con morale cristiana, matrimonio e ordine sociale.'],
  ['I trovatori','La lingua d’oc aveva già costruito una grammatica di servizio, distanza, misura e attesa prima che esistesse un manuale teorico.'],
  ['Bernart de Ventadorn','L’allodola, lo specchio e la merces negata mostrano un desiderio che consuma e un servizio che può restare senza ricompensa.'],
  ['Le trovatrici','La donna diventa soggetto del discorso: con desiderio, rifiuto e reciprocità, la perfetta asimmetria del modello viene messa in crisi.'],
  ['Beatritz de Dia','Una voce femminile concreta e attiva conserva le forme cortesi ma ne espone i limiti, introducendo corpo, decisione e relazione reale.']
];

function safeStorageGet(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function safeStorageSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
let visited = new Set(safeStorageGet('amor-cortese-visited', []));

function updateProgress() {
  progressText.textContent = `${visited.size}/${lessonOrder.length}`;
  document.querySelectorAll('.lesson-card[data-lesson]').forEach(card => {
    card.classList.toggle('visited', visited.has(card.dataset.lesson));
  });
}

function markVisited(id) {
  if (!lessons[id]) return;
  visited.add(id);
  safeStorageSet('amor-cortese-visited', [...visited]);
  updateProgress();
}

function setRoute(route) {
  const hash = route === 'home' ? '#home' : route.startsWith('lezione/') ? `#${route}` : `#${route}`;
  if (location.hash === hash) renderRoute(); else location.hash = hash;
}

function currentRoute() {
  const raw = location.hash.replace(/^#/, '') || 'home';
  return raw;
}

function updateNavCurrent(route) {
  document.querySelectorAll('.main-nav [data-route]').forEach(btn => {
    const key = btn.dataset.route;
    const active = route === key || (route.startsWith('lezione/') && key === 'home');
    if (active) btn.setAttribute('aria-current','page'); else btn.removeAttribute('aria-current');
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}

function renderHome() {
  const cards = lessonOrder.map((id, i) => {
    const l = lessons[id];
    return `<button class="lesson-card ${visited.has(id) ? 'visited' : ''}" type="button" data-route="lezione/${id}" data-lesson="${id}">
      <span class="lesson-number">${l.number}</span>
      <h3>${l.title}</h3>
      <p>${l.card}</p>
      <span class="card-arrow" aria-hidden="true">→</span>
    </button>`;
  }).join('');

  app.innerHTML = `<div class="cover-page">
    <section class="ornate-frame" aria-labelledby="cover-title">
      <div class="cover-hero">
        <img src="assets/cover-amor-cortese.svg" alt="Corte medievale: un trovatore e una dama sono separati dalla distanza che alimenta il desiderio cortese.">
        <div class="cover-overlay">
          <div class="cover-kicker">Letteratura medievale · III anno</div>
          <h1 id="cover-title" class="cover-title">AMOR<br>CORTESE</h1>
          <h2 class="cover-subtitle">Il desiderio prende forma</h2>
          <p class="cover-deck">Dalla struttura della famiglia nobiliare alla voce dei trovatori e delle trovatrici: come una distanza sociale diventa codice, poesia e infine crepa.</p>
          <p class="cover-author">a cura di gbprof e Libera</p>
          <button class="cover-start" type="button" data-route="lezione/che-cos-e">Entra nel percorso →</button>
        </div>
        <button class="hotspot" type="button" data-hotspot="1" aria-label="Esplora: distanza">1</button>
        <button class="hotspot" type="button" data-hotspot="2" aria-label="Esplora: servizio">2</button>
        <button class="hotspot" type="button" data-hotspot="3" aria-label="Esplora: dama">3</button>
        <aside class="hotspot-note" data-note="1"><strong>Distanza</strong><p>L’amore cortese nasce dal limite: ciò che non può essere pienamente posseduto continua a essere desiderato.</p></aside>
        <aside class="hotspot-note" data-note="2"><strong>Servizio</strong><p>Il poeta-cavaliere trasforma il lessico feudale di fedeltà e obbedienza in una grammatica amorosa.</p></aside>
        <aside class="hotspot-note" data-note="3"><strong>La dama</strong><p>È centro del sistema e insieme figura distante. Con le trovatrici, però, quella figura smette di essere muta.</p></aside>
      </div>
      <div class="cover-intro">
        <h2>Sette passaggi, un unico problema</h2>
        <p>Non una collezione di definizioni, ma un movimento: la società separa, il desiderio si sposta, la poesia inventa una lingua, il codice si stabilizza e le voci reali cominciano a metterlo alla prova.</p>
        <div class="lesson-grid">${cards}</div>
        <div class="tool-strip">
          <button class="tool-card" type="button" data-route="sintesi"><strong>Sintesi del percorso</strong><span>Ricostruisci il filo logico dalle condizioni sociali alla crisi del modello.</span></button>
          <button class="tool-card" type="button" data-route="vocabolario"><strong>Vocabolario</strong><span>24 termini essenziali per orientarsi nella cultura e nella lirica cortese.</span></button>
          <button class="tool-card" type="button" data-route="test"><strong>Test finale · 20 domande</strong><span>Ordine sempre variabile, voto in decimi, giudizio e recupero mirato.</span></button>
        </div>
      </div>
    </section>
  </div>`;

  document.querySelectorAll('.hotspot').forEach(btn => btn.addEventListener('click', ev => {
    ev.stopPropagation();
    const id = btn.dataset.hotspot;
    document.querySelectorAll('.hotspot-note').forEach(note => note.classList.toggle('active', note.dataset.note === id && !note.classList.contains('active')));
  }));
  document.querySelector('.cover-hero')?.addEventListener('click', ev => {
    if (!ev.target.closest('.hotspot') && !ev.target.closest('.hotspot-note')) document.querySelectorAll('.hotspot-note').forEach(n => n.classList.remove('active'));
  });
  updateProgress();
}

function mapIcon(kind) {
  const common = `stroke="#e8bd68" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const icons = {
    distance:`<g ${common}><circle cx="0" cy="-10" r="35"/><path d="M-85 52h58M27 52h58"/><path d="M-23 52h46" stroke-dasharray="9 10"/><path d="M-72 28l18-21 18 21M72 28L54 7 36 28"/></g>`,
    house:`<g ${common}><path d="M-78 12L0-55l78 67v66H-78Z"/><path d="M-26 78V17h52v61"/><path d="M-46-2h92"/></g>`,
    book:`<g ${common}><path d="M-86-52q43-14 82 10v118q-40-21-82-8Z"/><path d="M86-52Q43-66 4-42v118q40-21 82-8Z"/><path d="M0-42V76"/><path d="M-62-17h37M25-17h37M-62 8h37M25 8h37"/></g>`,
    lute:`<g ${common}><ellipse cx="-28" cy="29" rx="48" ry="37" transform="rotate(-12)"/><circle cx="-26" cy="27" r="13"/><path d="M11 13l69-38M70-20l18-5-7 17"/><path d="M-66 20l54 20M-62 8l54 20"/></g>`,
    lark:`<g ${common}><path d="M-80 34Q-20-38 22 13 53-25 82-53 63 10 18 52-25 83-80 34Z"/><path d="M10 14Q-18-4-44 17"/><circle cx="44" cy="-17" r="4" fill="#e8bd68" stroke="none"/></g>`,
    voice:`<g ${common}><path d="M-62-22v46q0 52 62 52t62-52v-46"/><path d="M-28-16v37q0 27 28 27t28-27v-37q0-27-28-27t-28 27Z"/><path d="M0 76v37M-36 113h72"/></g>`,
    choice:`<g ${common}><path d="M-75 38Q-38-30 0 38 38-30 75 38"/><path d="M0 38v58"/><path d="M-75 38l-13-21M75 38l13-21"/><circle cx="0" cy="-22" r="23"/></g>`
  };
  return icons[kind] || icons.distance;
}

function renderConceptMap(map) {
  const [n1,n2,n3,n4] = map.nodes;
  const node = (x,y,w,h,data) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="#f7e8c5" stroke="#93704c" stroke-width="3"/><text x="${x+24}" y="${y+42}" class="map-node-title">${escapeHtml(data[0])}</text>${wrapSvgText(data[1], x+24, y+72, w-48)}</g>`;
  return `<div class="concept-map" role="img" aria-label="Mappa concettuale: ${escapeHtml(map.center)}">
    <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mapbg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5e6c3"/><stop offset="1" stop-color="#e4c58f"/></linearGradient>
        <linearGradient id="mapcenter" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#082e43"/><stop offset="1" stop-color="#0e465c"/></linearGradient>
        <marker id="mapArrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5 0 10Z" fill="#9f642e"/></marker>
      </defs>
      <rect width="1200" height="700" fill="url(#mapbg)"/>
      <path d="M365 174C430 174 438 238 471 270" fill="none" stroke="#9f642e" stroke-width="4" marker-end="url(#mapArrow)"/>
      <path d="M835 174C775 174 765 238 733 270" fill="none" stroke="#9f642e" stroke-width="4" marker-end="url(#mapArrow)"/>
      <path d="M365 526C430 526 438 472 471 438" fill="none" stroke="#9f642e" stroke-width="4" marker-end="url(#mapArrow)"/>
      <path d="M835 526C775 526 765 472 733 438" fill="none" stroke="#9f642e" stroke-width="4" marker-end="url(#mapArrow)"/>
      ${node(35,65,330,215,n1)}
      ${node(835,65,330,215,n2)}
      ${node(35,420,330,215,n3)}
      ${node(835,420,330,215,n4)}
      <g>
        <rect x="420" y="190" width="360" height="320" rx="30" fill="url(#mapcenter)" stroke="#be8538" stroke-width="4"/>
        <g transform="translate(600 322)">${mapIcon(map.icon)}</g>
        <text x="600" y="416" text-anchor="middle" class="map-center-title">${escapeHtml(map.center)}</text>
        ${wrapSvgText(map.centerSub,600,449,300,true)}
      </g>
      <rect x="16" y="16" width="1168" height="668" rx="25" fill="none" stroke="#a8793f" stroke-width="2" opacity=".75"/>
    </svg>
  </div>`;
}

function wrapSvgText(text, x, y, maxWidth, centered=false) {
  const words = String(text).split(/\s+/);
  const approxChars = Math.max(18, Math.floor(maxWidth / 8.2));
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line ? `${line} ${word}` : word;
    if (test.length > approxChars && line) { lines.push(line); line = word; } else line = test;
  });
  if (line) lines.push(line);
  const cls = centered ? 'map-center-copy' : 'map-node-copy';
  const anchor = centered ? 'middle' : 'start';
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${lines.slice(0,4).map((ln,i)=>`<tspan x="${x}" dy="${i===0?0:22}">${escapeHtml(ln)}</tspan>`).join('')}</text>`;
}

function renderLesson(id) {
  const lesson = lessons[id];
  if (!lesson) return renderNotFound();
  markVisited(id);
  const index = lessonOrder.indexOf(id);
  const prev = lessonOrder[index-1];
  const next = lessonOrder[index+1];
  app.innerHTML = `<div class="page-shell">
    <div class="breadcrumbs"><button type="button" data-route="home">Percorso</button> · Lezione ${lesson.number}</div>
    <header class="lesson-header">
      <div class="lesson-badge">${lesson.number}</div>
      <div><p class="eyebrow">Amor cortese · percorso</p><h1>${lesson.title}</h1><p class="lesson-subtitle">${lesson.subtitle}</p></div>
    </header>
    <article class="lesson-body">
      ${lesson.content}
      <div class="formula-card"><div class="formula-label">${lesson.formulaLabel}</div><blockquote>${lesson.formula}</blockquote></div>
      <section class="map-section">
        <h2>Mappa concettuale</h2>
        <p class="map-intro">Il nucleo essenziale della lezione: un’immagine centrale e quattro relazioni da ricordare.</p>
        ${renderConceptMap(lesson.map)}
      </section>
    </article>
    <nav class="lesson-nav" aria-label="Navigazione tra lezioni">
      <button type="button" data-route="${prev ? `lezione/${prev}` : 'home'}">← ${prev ? lessons[prev].title : 'Copertina'}</button>
      <button type="button" data-route="${next ? `lezione/${next}` : 'sintesi'}">${next ? lessons[next].title : 'Sintesi del percorso'} →</button>
    </nav>
  </div>`;
}

function renderSynthesis() {
  app.innerHTML = `<div class="page-shell">
    <div class="breadcrumbs"><button type="button" data-route="home">Percorso</button> · Sintesi</div>
    <header class="section-header"><div class="lesson-badge">≋</div><div><p class="eyebrow">Ricostruzione finale</p><h1>Sintesi del percorso</h1><p class="section-lead">Dal vincolo sociale al linguaggio poetico, dal codice alla sua incrinatura.</p></div></header>
    <p class="synthesis-lead">L’amor cortese non è un semplice repertorio di formule sentimentali. Nel percorso emerge come risposta culturale a una separazione: da una parte il matrimonio nobiliare, governato da strategie di patrimonio e lignaggio; dall’altra il desiderio individuale, che non scompare ma cerca uno spazio diverso. La poesia dei trovatori trasforma questa tensione in linguaggio; Andrea Cappellano la rende codice. Proprio quando il sistema sembra più compiuto, però, cominciano ad apparire le crepe: Bernart mostra il servizio senza ricompensa, le trovatrici danno voce alla donna e Beatritz de Dia introduce un desiderio femminile concreto che espone il limite dell’asimmetria cortese.</p>
    <div class="timeline">${synthesisSteps.map((step,i)=>`<article class="timeline-step" data-step="${i+1}"><h3>${step[0]}</h3><p>${step[1]}</p></article>`).join('')}</div>
    <section class="lesson-body">
      <p class="eyebrow">Il movimento complessivo</p>
      <h2 style="color:var(--ink);margin:.2rem 0 1rem">Cinque passaggi da ricordare</h2>
      <div class="movement-grid">
        ${['La società separa.','Il desiderio si sposta.','La poesia inventa una grammatica.','Il codice si esplicita.','Le voci reali lo mettono alla prova.'].map((t,i)=>`<div class="movement-step"><b>${i+1}</b><span>${t}</span></div>`).join('')}
      </div>
    </section>
    <nav class="lesson-nav"><button type="button" data-route="home">← Copertina</button><button type="button" data-route="vocabolario">Vocabolario →</button></nav>
  </div>`;
}

function renderGlossary(filter='') {
  const q = filter.trim().toLocaleLowerCase('it');
  const items = glossary.filter(([term,def]) => !q || `${term} ${def}`.toLocaleLowerCase('it').includes(q));
  const cards = items.length ? items.map(([term,def])=>`<article class="glossary-card"><h3>${term}</h3><p>${def}</p></article>`).join('') : `<p class="no-results">Nessun termine corrisponde alla ricerca.</p>`;
  app.innerHTML = `<div class="page-shell">
    <div class="breadcrumbs"><button type="button" data-route="home">Percorso</button> · Vocabolario</div>
    <header class="section-header"><div class="lesson-badge">A</div><div><p class="eyebrow">Parole per capire</p><h1>Vocabolario</h1><p class="section-lead">24 termini essenziali per leggere il mondo dell’amor cortese senza anacronismi inutili.</p></div></header>
    <div class="glossary-search"><label class="skip-link" for="glossaryInput">Cerca nel vocabolario</label><input id="glossaryInput" type="search" autocomplete="off" placeholder="Cerca: midons, merces, trobar, lignaggio…" value="${escapeHtml(filter)}"></div>
    <div id="glossaryGrid" class="glossary-grid">${cards}</div>
    <nav class="lesson-nav"><button type="button" data-route="sintesi">← Sintesi</button><button type="button" data-route="test">Test finale →</button></nav>
  </div>`;
  const input = document.getElementById('glossaryInput');
  input?.addEventListener('input', () => {
    const value = input.value.trim().toLocaleLowerCase('it');
    const subset = glossary.filter(([term,def]) => !value || `${term} ${def}`.toLocaleLowerCase('it').includes(value));
    document.getElementById('glossaryGrid').innerHTML = subset.length ? subset.map(([term,def])=>`<article class="glossary-card"><h3>${term}</h3><p>${def}</p></article>`).join('') : `<p class="no-results">Nessun termine corrisponde alla ricerca.</p>`;
  });
}

function randomInt(max) {
  if (globalThis.crypto?.getRandomValues) {
    const maxUint = 0xFFFFFFFF;
    const limit = maxUint - (maxUint % max);
    const arr = new Uint32Array(1);
    do { crypto.getRandomValues(arr); } while (arr[0] >= limit);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}
function shuffle(array) {
  for (let i=array.length-1;i>0;i--) {
    const j = randomInt(i+1);
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}
function createQuizSession() {
  return shuffle([...quizData]).map(item => ({
    ...item,
    options: shuffle(item.answers.map((text, originalIndex) => ({text, correct: originalIndex === item.correct})))
  }));
}
let quizSession = null;

function renderTest() {
  quizSession = createQuizSession();
  const questions = quizSession.map((item,i)=>`<fieldset class="question-card" data-qid="${item.id}">
    <div class="question-head"><span class="question-num">${i+1}</span><legend>${item.q}</legend></div>
    <div class="answers">${item.options.map((opt,j)=>`<label class="answer-option"><input type="radio" name="${item.id}" value="${j}"><span>${opt.text}</span></label>`).join('')}</div>
  </fieldset>`).join('');
  app.innerHTML = `<div class="page-shell">
    <div class="breadcrumbs"><button type="button" data-route="home">Percorso</button> · Test finale</div>
    <header class="section-header"><div class="lesson-badge">✓</div><div><p class="eyebrow">Verifica finale</p><h1>20 domande</h1><p class="section-lead">Tre risposte plausibili, una sola corretta. Domande e risposte cambiano ordine a ogni nuova apertura.</p></div></header>
    <div class="test-intro"><strong>Come funziona.</strong> Il voto è espresso in decimi. Ogni errore genera una microlezione di recupero collegata alla lezione da ripassare. Le risposte non date vengono conteggiate come errate.</div>
    <div class="quiz-toolbar"><p>Nuovo ordine a ogni caricamento del test.</p><button id="reshuffleBtn" class="secondary-btn" type="button">Mescola di nuovo</button></div>
    <form id="quizForm"><div class="quiz-list">${questions}</div><div class="submit-row"><button class="primary-btn" type="submit">Correggi e genera il report</button></div></form>
    <div id="quizReport" aria-live="polite"></div>
  </div>`;
  document.getElementById('reshuffleBtn')?.addEventListener('click', () => renderTest());
  document.getElementById('quizForm')?.addEventListener('submit', gradeQuiz);
}

function gradeQuiz(event) {
  event.preventDefault();
  const form = event.currentTarget;
  let correctCount = 0;
  const wrong = [];
  quizSession.forEach(item => {
    const selected = form.querySelector(`input[name="${item.id}"]:checked`);
    const selectedOpt = selected ? item.options[Number(selected.value)] : null;
    const correctOpt = item.options.find(o => o.correct);
    if (selectedOpt?.correct) correctCount++;
    else wrong.push({item, selectedOpt, correctOpt});
  });
  const grade = Math.round((correctCount / quizSession.length) * 100) / 10;
  const judgment = grade >= 9 ? 'Padronanza molto solida: ricostruisci con sicurezza concetti, rapporti e trasformazioni del percorso.'
    : grade >= 8 ? 'Conoscenza sicura: il quadro generale è ben compreso, con poche aree da rifinire.'
    : grade >= 7 ? 'Conoscenza buona: comprendi il percorso, ma alcuni passaggi richiedono maggiore precisione.'
    : grade >= 6 ? 'Conoscenza sufficiente: il filo essenziale è presente, ma va consolidato nei nodi meno sicuri.'
    : 'Recupero necessario: alcuni concetti fondamentali non sono ancora abbastanza stabili per sostenere l’intero percorso.';
  const reinforcement = grade >= 9 ? 'Rinforzo: prova a spiegare in un unico discorso come la struttura sociale produca il codice e come le voci poetiche ne rivelino le crepe.'
    : grade >= 8 ? 'Rinforzo: ripassa le formule finali delle sette lezioni e collegale ai testi di Bernart e Beatritz.'
    : grade >= 7 ? 'Rinforzo: usa la sintesi per ricostruire i passaggi società → codice → poesia → crisi del modello.'
    : grade >= 6 ? 'Rinforzo: riparti dalle mappe concettuali e dal vocabolario prima di ripetere il test.'
    : 'Rinforzo: affronta prima le microlezioni di recupero qui sotto, poi rileggi le lezioni collegate e ripeti il test con un nuovo ordine.';
  const gradeLabel = grade.toLocaleString('it-IT',{maximumFractionDigits:1});
  const recoveries = wrong.length ? wrong.map(({item,selectedOpt,correctOpt},i)=>`<article class="recovery-card">
    <h3>${i+1}. ${item.recoveryTitle}</h3>
    <p><strong>Domanda:</strong> ${item.q}</p>
    <p class="answer-line"><strong>La tua risposta:</strong> ${selectedOpt ? selectedOpt.text : 'Nessuna risposta'}</p>
    <p class="answer-line"><strong>Risposta corretta:</strong> ${correctOpt.text}</p>
    <p>${item.recovery}</p>
    <button type="button" data-route="lezione/${item.lessonId}">Ripassa: ${lessons[item.lessonId].title} →</button>
  </article>`).join('') : `<div class="perfect-card"><strong>Nessun recupero necessario.</strong> Hai risposto correttamente a tutte le domande. Il passo utile ora è trasformare le conoscenze in un discorso argomentato, non ripetere definizioni isolate.</div>`;
  document.getElementById('quizReport').innerHTML = `<section class="report-card">
    <div class="report-top">
      <div class="grade-disc"><div><strong>${gradeLabel}</strong><span>/ 10</span></div></div>
      <div><h2>Report finale</h2><p>${judgment}</p><p><strong>${reinforcement}</strong></p></div>
    </div>
    <div class="report-body">
      <div class="result-stats"><span class="stat">Corrette: ${correctCount}/20</span><span class="stat">Da recuperare: ${wrong.length}</span><span class="stat">Voto: ${gradeLabel}/10</span></div>
      <h2 style="color:var(--ink);font-size:1.35rem">Recupero mirato</h2>
      <div class="recovery-list">${recoveries}</div>
      <div class="submit-row"><button id="retryQuiz" class="secondary-btn" type="button">Ripeti il test con un nuovo ordine</button></div>
    </div>
  </section>`;
  document.getElementById('retryQuiz')?.addEventListener('click', () => { renderTest(); window.scrollTo({top:0,behavior:'smooth'}); });
  document.getElementById('quizReport')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function renderNotFound() {
  app.innerHTML = `<div class="page-shell"><section class="lesson-body"><h1 style="color:var(--ink)">Pagina non trovata</h1><p>Il percorso richiesto non esiste.</p><button class="primary-btn" type="button" data-route="home">Torna alla copertina</button></section></div>`;
}

function renderRoute() {
  const route = currentRoute();
  updateNavCurrent(route);
  if (route === 'home') renderHome();
  else if (route.startsWith('lezione/')) renderLesson(route.split('/')[1]);
  else if (route === 'sintesi') renderSynthesis();
  else if (route === 'vocabolario') renderGlossary();
  else if (route === 'test') renderTest();
  else renderNotFound();
  window.scrollTo({top:0,behavior:'auto'});
  setTimeout(() => app.focus({preventScroll:true}),0);
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-route]');
  if (!control) return;
  const route = control.dataset.route;
  if (!route) return;
  event.preventDefault();
  setRoute(route);
});

window.addEventListener('hashchange', renderRoute);

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installBtn.hidden = false;
});
installBtn?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installBtn.hidden = true;
});
window.addEventListener('appinstalled', () => { deferredInstallPrompt = null; installBtn.hidden = true; });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

renderRoute();
updateProgress();
