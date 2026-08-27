import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const sourcePath = path.join(root,"docs","PROGETTO_DIDATTICO_FASE_04_DOLCE_STIL_NOVO.md");
const outPath = path.join(root,"content.js");
const md = fs.readFileSync(sourcePath, "utf8").replaceAll("\r", "");

const clean = s => s.trim().replace(/\*([^*]+)\*/g, "$1").replace(/`([^`]+)`/g, "$1");
const between = (text, start, end) => {
  const a = text.indexOf(start);
  if (a < 0) return "";
  const b = text.indexOf(end, a + start.length);
  return text.slice(a + start.length, b < 0 ? text.length : b).trim();
};

const contentTitles = {
  1: ["1. Tre eredità vive", "2. Città, reti e interlocutori", "3. Autorità e conflitto", "4. Dall’esteriorità all’interiorità"],
  2: ["1. Dalla corte alla rete urbana", "2. Dal sangue alla virtù", "3. Saperi, analogie e sottigliezza", "4. Il nome viene dopo le opere"],
  3: ["1. Amore come processo psicofisico", "2. Guinizzelli: gentilezza e rischio", "3. Cavalcanti: conoscenza e crisi", "4. Dante: dal saluto alla lode"],
  4: ["1. Dolce, stile, nuovo", "2. Ispirazione ed elaborazione", "3. Forme, ritmo e immagini", "4. Pubblici, manoscritti e canone"],
  5: ["1. Disputa e genealogia", "2. La costellazione di Guinizzelli", "3. La costellazione di Cavalcanti", "4. Vita nuova, metodo e rete"],
  6: ["1. Ciò che unisce", "2. Ciò che divide", "3. Come si costruisce un canone", "4. Il lascito come domanda"]
};

const objectives = {
  1: ["Ricostruire le tradizioni ricevute dallo Stil novo.", "Distinguere continuità e trasformazione.", "Contestualizzare la polemica di Bonagiunta e il giudizio di Dante.", "Evitare una lettura teleologica della storia letteraria."],
  2: ["Riconoscere le fratture storiche e concettuali.", "Spiegare la gentilezza come disposizione interiore.", "Analizzare la funzione conoscitiva delle analogie.", "Comprendere il carattere retrospettivo dell’etichetta."],
  3: ["Ricostruire il processo psicofisico dell’amore.", "Distinguere le funzioni della donna nei diversi testi.", "Confrontare Guinizzelli, Cavalcanti e Dante.", "Argomentare con cautela sulle controversie filosofiche."],
  4: ["Definire dolcezza, stile e novità senza banalizzarli.", "Distinguere ispirazione ed elaborazione formale.", "Collegare metro, retorica ed effetti di senso.", "Comprendere il ruolo di destinatari e manoscritti."],
  5: ["Leggere le opere come costellazioni problematiche.", "Separare parafrasi, analisi e interpretazione.", "Usare prove lessicali, metriche e retoriche.", "Evitare biografismo e formule indifferenziate."],
  6: ["Definire lo Stil novo come laboratorio e canone.", "Tenere insieme affinità e divergenze.", "Ricostruire i livelli della ricezione.", "Elaborare una tesi con prove e controargomento."]
};

const timing = {
  1: [["0–10 min","Attivazione sulle parole nuovo e tradizione."],["10–28 min","Quadro di trovatori, Siciliani e Toscana."],["28–48 min","Lettura di Bonagiunta e confronto guidato."],["48–65 min","Laboratorio e verifica formativa."]],
  2: [["0–12 min","Carta delle reti urbane e problema della gentilezza."],["12–32 min","Lettura di analogie da Al cor gentil."],["32–50 min","Parafrasi e funzione argomentativa."],["50–65 min","Sintesi, quiz e recupero."]],
  3: [["0–12 min","Schema occhi-cuore-mente-spiriti."],["12–35 min","Confronto fra i tre modelli dell’amore."],["35–53 min","Matrice comparativa con prove testuali."],["53–70 min","Discussione argomentata e quiz."]],
  4: [["0–12 min","Analisi della formula dantesca."],["12–32 min","Forme metriche e funzione delle immagini."],["32–52 min","Officina metrica e retorica."],["52–68 min","Manoscritti, sintesi e verifica."]],
  5: [["0–15 min","Presentazione delle quattro costellazioni."],["15–38 min","Parafrasi e analisi comparata."],["38–58 min","Interpretazione argomentata."],["58–75 min","Condivisione, quiz e recupero."]],
  6: [["0–12 min","Ricomposizione dell’intero percorso."],["12–30 min","Affinità, differenze e costruzione del canone."],["30–52 min","Scrittura della tesi finale."],["52–70 min","Controargomento e verifica."]]
};

const connections = {
  1: ["Amor cortese: servizio, distanza e misura.", "Scuola siciliana: trasformazione dei modelli occitani."],
  2: ["Storia: comuni italiani, reti urbane e conflitti di parte.", "Filosofia naturale: analogia e conoscenza."],
  3: ["Filosofia: rapporto tra passione, intelletto e volontà.", "Scienze medievali: percezione e psicofisiologia."],
  4: ["Musica e metrica: ritmo, ripresa e tradizione della ballata.", "Filologia: manoscritti, varianti e attribuzioni."],
  5: ["Metodo di italiano: parafrasi, analisi e interpretazione.", "Dante: Vita nuova e Purgatorio come rilettura del passato."],
  6: ["Storiografia: come nasce una categoria letteraria.", "Educazione civica: sentimento, conoscenza e responsabilità."]
};

const sourceRefs = {
  1:["stilnovo","bonagiunta","guittone"], 2:["stilnovo","purg24","unibo"],
  3:["guinizzelli","cavalcanti","vitanuova"], 4:["purg24","purg26","ballata","chigiano"],
  5:["bonagiunta","guinizzelli","cavalcanti","vitanuova","cino"], 6:["stilnovo","purg24","purg26","chigiano"]
};

function splitContent(paragraphs, titles) {
  const groups = [];
  let cursor = 0;
  for (let i=0;i<titles.length;i++) {
    const remaining = paragraphs.length - cursor;
    const slots = titles.length - i;
    const take = Math.ceil(remaining / slots);
    groups.push([titles[i], paragraphs.slice(cursor, cursor + take)]);
    cursor += take;
  }
  return groups;
}

function parseList(text) {
  return text.split("\n").map(x=>x.match(/^\d+\.\s+(.+)$/)?.[1]).filter(Boolean).map(clean);
}

function parseGlossary(text) {
  return text.split("\n").map(line => {
    const m=line.match(/^- \*\*(.+?):\*\*\s*(.+)$/);
    return m ? [clean(m[1]),clean(m[2])] : null;
  }).filter(Boolean);
}

function parseBullets(text) {
  return Object.fromEntries(text.split("\n").map(line=>{
    const m=line.match(/^- \*\*(.+?):\*\*\s*(.+)$/); return m?[clean(m[1]),clean(m[2])]:null;
  }).filter(Boolean));
}

function parseQuestion(block) {
  const pick = label => clean(block.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([^\\n]+)`))?.[1] || "").replace(/\s+$/,"  ").trim();
  const q = pick("Domanda");
  const options = ["A","B","C"].map(letter => clean(block.match(new RegExp(`\\*\\*${letter}\\.\\*\\*\\s*([^\\n]+)`))?.[1] || ""));
  const correct = block.match(/\*\*Corretta:\*\*\s*([ABC])\./)?.[1] || "";
  const feedback = pick("Spiegazione") || pick("Feedback/recupero");
  const recoveryMatch = block.match(/\*\*(?:Recupero[^:]*|Feedback\/recupero):\*\*\s*([^\n]+)/);
  const recovery = clean(recoveryMatch?.[1] || feedback);
  const rawReentry = (block.match(/\*\*Rientro:\*\*\s*([^\n]+)/)?.[1] || "").trim();
  const rm = rawReentry.match(/^(.*?) A\) (.*?); B\) (.*?); C\) (.*?)\.? \*\*Corretta: ([ABC])\.\*\*$/);
  const reentry = rm ? {q:clean(rm[1]),options:[clean(rm[2]),clean(rm[3]),clean(rm[4])],correct:rm[5]} : {q:"Quale nesso corregge l’errore?",options:[options[0],options[1],options[2]],correct};
  return {q,options,correct,feedback,recovery,reentry};
}

function parseQuiz(prefix) {
  const rx = new RegExp(`^### (${prefix}-Q\\d+) · [^\\n]+\\n([\\s\\S]*?)(?=^### |^## |^---$|^# )`,"gm");
  return [...md.matchAll(rx)].map(m=>parseQuestion(m[2]));
}

const lessonRx = /^# ([1-6])\. ([^\n]+)\n([\s\S]*?)(?=^# [1-6]\. |^# Banca formativa)/gm;
const lessons = [...md.matchAll(lessonRx)].map(match => {
  const number = Number(match[1]);
  const block = match[3];
  const question = clean(between(block,"## Domanda della lezione","## Lezione"));
  const paragraphs = between(block,"## Lezione","## Sintesi").split(/\n\n+/).map(clean).filter(x=>x && !x.startsWith("#"));
  const summary = clean(between(block,"## Sintesi","## Saperi irrinunciabili"));
  const essentials = parseList(between(block,"## Saperi irrinunciabili","## Glossario"));
  const vocab = parseGlossary(between(block,"## Glossario","## Laboratorio"));
  const lab = parseBullets(between(block,"## Laboratorio", "## Mappa da illustrare"));
  const map = parseBullets(between(block,"## Mappa da illustrare","## Ponte"));
  const bridge = clean(between(block,"## Ponte", "---"));
  return {
    number,
    title: clean(match[2]),
    question,
    function: ["Il mondo precedente","Le fratture","L’immagine dell’essere umano","La poetica","Le opere","Conclusione"][number-1],
    objectives: objectives[number],
    timing: timing[number],
    content: splitContent(paragraphs,contentTitles[number]),
    bridge,
    summary,
    essentials,
    vocab,
    understanding: lab["Che cosa comprendere"] || "",
    activity: lab["Consegna"] || "",
    product: lab["Prodotto osservabile"] || "",
    success: lab["Criteri di correttezza"] || "",
    misconception: lab["Errore intercettato"] || "",
    connections: connections[number],
    mapCenter: map["Centro"] || "Mappa concettuale",
    mapAlt: map["Testo alternativo"] || "Mappa concettuale della lezione.",
    sourceRefs: sourceRefs[number],
    quiz: parseQuiz(`S${number}`)
  };
});

const finalQuiz = parseQuiz("F");

const data = {
  title:"Il dolce stil novo",
  subtitle:"Interiorità, forma e conoscenza nella nuova poesia",
  generativeQuestion:"Come può la poesia d’amore diventare una forma di conoscenza dell’interiorità, e perché, dentro uno stesso nuovo linguaggio, Guinizzelli, Cavalcanti e Dante danno risposte diverse sul rapporto fra amore, ragione, virtù e salvezza?",
  sources:{
    stilnovo:{label:"Enciclopedia Dantesca, «Stil nuovo», Treccani",url:"https://www.treccani.it/enciclopedia/stil-nuovo_(Enciclopedia-Dantesca)/",note:"Quadro storico e critico sulla categoria e sulla sua costruzione dantesca."},
    bonagiunta:{label:"Bonagiunta Orbicciani, profilo e testo, Treccani",url:"https://www.treccani.it/magazine/strumenti/una_poesia_al_giorno/08_19_Orbicciani_Bonagiunta.html",note:"Testo e contestualizzazione di Voi ch’avete mutata la mainera."},
    guittone:{label:"«Stil novo», Enciclopedia Treccani",url:"https://www.treccani.it/enciclopedia/stil-novo/",note:"Sintesi dei rapporti con Guittone, Guinizzelli e la tradizione toscana."},
    purg24:{label:"Dante, Purgatorio XXIV, Dante Online",url:"https://www.danteonline.it/italiano/opere2.asp?idcod=000&idlang=OR&idliv1=2&idliv2=24&idliv3=1&idope=1",note:"Fonte primaria per Bonagiunta e la formula del dolce stil novo."},
    purg26:{label:"Dante, Purgatorio XXVI, Princeton Dante Project",url:"https://dante.princeton.edu/cgi-bin/dante/campuscgi/mpb/GetCantoSection.pl?INP_LEN=15&INP_POEM=Purg&INP_SECT=26&INP_START=88&LANG=2",note:"Fonte primaria per la genealogia poetica di Guinizzelli."},
    guinizzelli:{label:"Guido Guinizzelli, Al cor gentil, Treccani",url:"https://www.treccani.it/magazine/strumenti/una_poesia_al_giorno/06_08_Guinizzelli_Guido.html",note:"Testo, forma metrica e commento della canzone."},
    cavalcanti:{label:"Guido Cavalcanti, Dizionario Biografico degli Italiani",url:"https://www.treccani.it/enciclopedia/guido-cavalcanti_(Dizionario-Biografico)/",note:"Profilo biografico e critico con cautele sulle interpretazioni filosofiche."},
    vitanuova:{label:"Dante, Vita nuova, Digital Dante",url:"https://digitaldante.columbia.edu/text/library/la-vita-nuova/",note:"Edizione digitale dell’opera prosimetrica dantesca."},
    ballata:{label:"«Ballata», Enciclopedia dell’Italiano, Treccani",url:"https://www.treccani.it/enciclopedia/ballata_(Enciclopedia-dell-Italiano)/",note:"Storia e struttura della forma metrica."},
    cino:{label:"Cino da Pistoia, Dizionario Biografico degli Italiani",url:"https://www.treccani.it/enciclopedia/cino-sinibuldi_(Dizionario-Biografico)/",note:"Profilo per rete, corrispondenze e continuità stilistica."},
    unibo:{label:"Dante e i saperi del suo tempo, Università di Bologna",url:"https://site.unibo.it/griseldaonline/it/letteratura-italiana/giuseppe-ledda-firenze-bologna-parigi-dante-saperi-tempo",note:"Approfondimento universitario sulle reti culturali e i saperi medievali."},
    chigiano:{label:"Biblioteca Apostolica Vaticana, Chigiano L VIII 305",url:"https://digi.vatlib.it/",note:"Riferimento istituzionale per la tradizione manoscritta; la ricerca interna consente di raggiungere il codice."}
  },
  lessons,
  finalQuiz
};

if (lessons.length !== 6) throw new Error(`Attese 6 lezioni, trovate ${lessons.length}`);
if (lessons.some(l=>l.quiz.length!==5)) throw new Error(`Quiz di sezione incompleti: ${lessons.map(l=>l.quiz.length)}`);
if (finalQuiz.length!==20) throw new Error(`Attese 20 domande finali, trovate ${finalQuiz.length}`);
if (lessons.some(l=>!l.vocab.length||!l.essentials.length||!l.content.length)) throw new Error("Apparati incompleti");

fs.writeFileSync(outPath, `window.PWA_DATA = ${JSON.stringify(data,null,2)};\n`);
console.log(JSON.stringify({lessons:lessons.length,sectionQuiz:lessons.reduce((n,l)=>n+l.quiz.length,0),finalQuiz:finalQuiz.length,words:lessons.map(l=>l.content.flatMap(x=>x[1]).join(" ").split(/\s+/).length),reentries:lessons.flatMap(l=>l.quiz).filter(q=>q.reentry.q!=="Quale nesso corregge l’errore?").length+finalQuiz.filter(q=>q.reentry.q!=="Quale nesso corregge l’errore?").length},null,2));
