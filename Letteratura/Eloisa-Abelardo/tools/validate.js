const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const fail = message => { throw new Error(message); };

const sandbox = {window:{}};
vm.runInNewContext(read("content.js"), sandbox);
vm.runInNewContext(read("documents.js"), sandbox);
const data = sandbox.window.ELA_DATA;
const documents = sandbox.window.ELA_DOCUMENTS;

if (!data || data.sections.length !== 6) fail("La PWA deve contenere sei movimenti.");
if (data.story.length !== 6) fail("Il prologo deve contenere sei scene.");
if (new Set(data.sections.map(s => s.id)).size !== 6) fail("ID dei movimenti duplicati.");
if (!documents || documents.length !== 8) fail("La biblioteca deve contenere Historia e Lettere II–VIII.");
if (new Set(documents.map(document => document.id)).size !== 8) fail("ID dei documenti duplicati.");
for (const document of documents) {
  const words = document.parts.flatMap(part => part.paragraphs).join(" ").trim().split(/\s+/).length;
  if (words < 350) fail(document.id + ": testo documentario troppo breve (" + words + " parole).");
  if (!document.source || !document.source.url.startsWith("https://")) fail(document.id + ": fonte documentaria mancante.");
  if (document.apparatus.length < 3 || document.questions.length < 3) fail(document.id + ": apparato didattico incompleto.");
}

const questionIds = [];
for (const section of data.sections) {
  const words = section.lesson.flatMap(block => block.p).join(" ").trim().split(/\s+/).length;
  const summaryWords = section.summary.trim().split(/\s+/).length;
  if (words < 700 || words > 1100) fail(section.id + ": lezione fuori misura (" + words + " parole).");
  if (summaryWords < 120 || summaryWords > 200) fail(section.id + ": sintesi fuori misura.");
  if (section.essentials.length < 5 || section.essentials.length > 8) fail(section.id + ": saperi irrinunciabili non conformi.");
  if (section.vocab.length < 5 || section.vocab.length > 10) fail(section.id + ": vocabolario non conforme.");
  if (section.quiz.length < 5) fail(section.id + ": test insufficiente.");
  if (!fs.existsSync(path.join(root, section.image))) fail("Immagine mancante: " + section.image);
  if (!fs.existsSync(path.join(root, section.map.src))) fail("Mappa mancante: " + section.map.src);
  for (const q of section.quiz) {
    questionIds.push(q.id);
    if (q.o.length !== 3 || q.r.o.length !== 3) fail(q.id + ": servono tre opzioni.");
    if (q.c < 0 || q.c > 2 || q.r.c < 0 || q.r.c > 2) fail(q.id + ": indice risposta non valido.");
    if (!q.e || !q.a || !q.r.concept || !q.r.clarification || !q.r.example || !q.r.q) fail(q.id + ": feedback o recupero incompleto.");
  }
}
if (new Set(questionIds).size !== questionIds.length) fail("ID delle domande duplicati.");

JSON.parse(read("manifest.webmanifest"));
for (const file of ["index.html","styles.css","app.js","content.js","documents.js","sw.js","README.md","SOURCES.md","TEXTUAL-NOTE.md","ATTRIBUTIONS.md"]) {
  if (!fs.existsSync(path.join(root, file))) fail("File mancante: " + file);
}

const sw = read("sw.js");
const cached = Array.from(sw.matchAll(/"(\.\/[^"]+)"/g)).map(match => match[1]).filter(item => item !== "./");
for (const item of cached) {
  if (!fs.existsSync(path.join(root, item.slice(2)))) fail("Risorsa offline mancante: " + item);
}

const html = read("index.html");
for (const id of ["story-grid","documents-grid","document-dialog","lesson-root","chapter-nav","notes-dialog","search-dialog","map-dialog","sources-grid"]) {
  if (!html.includes('id="' + id + '"')) fail("Contenitore HTML mancante: " + id);
}

const css = read("styles.css");
if (!css.includes("@media (max-width: 900px)") || !css.includes("prefers-reduced-motion") || !css.includes("@media print")) fail("Media query essenziali mancanti.");

console.log("Validazione completata.");
console.log("6 scene · 8 documenti · 6 movimenti · 30 domande · 30 recuperi · cache offline completa.");
