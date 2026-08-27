const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "content.js"), "utf8"), context);
const data = context.window.PWA_DATA;

assert.equal(data.lessons.length, 6, "Il percorso deve avere sei lezioni");
assert.equal(data.finalQuiz.length, 20, "La verifica finale deve avere venti quesiti");

const sectionQuestions = data.lessons.flatMap(lesson => {
  assert.equal(lesson.quiz.length, 5, `La lezione ${lesson.number} deve avere cinque quesiti`);
  assert.ok(lesson.content.length >= 4, `La lezione ${lesson.number} deve avere contenuto esteso`);
  assert.ok(lesson.summary.length >= 450, `La sintesi della lezione ${lesson.number} è troppo breve`);
  assert.ok(lesson.essentials.length >= 6, `Mancano saperi irrinunciabili nella lezione ${lesson.number}`);
  assert.ok(lesson.sourceRefs.length >= 2, `Mancano fonti nella lezione ${lesson.number}`);
  return lesson.quiz;
});

assert.equal(sectionQuestions.length, 30, "Servono trenta quesiti formativi");

function validateQuestion(question, label) {
  assert.equal(question.options.length, 3, `${label}: servono tre opzioni`);
  assert.ok(["A", "B", "C"].includes(question.correct), `${label}: risposta corretta non valida`);
  assert.ok(question.feedback, `${label}: manca il feedback`);
  assert.ok(question.recovery, `${label}: manca il recupero`);
  assert.ok(question.reentry?.q, `${label}: manca la domanda di rientro`);
  assert.equal(question.reentry.options.length, 3, `${label}: la domanda di rientro deve avere tre opzioni`);
  assert.ok(["A", "B", "C"].includes(question.reentry.correct), `${label}: risposta di rientro non valida`);
}

sectionQuestions.forEach((question, index) => validateQuestion(question, `Formativa ${index + 1}`));
data.finalQuiz.forEach((question, index) => validateQuestion(question, `Finale ${index + 1}`));

function distribution(questions) {
  return questions.reduce((acc, question) => ({ ...acc, [question.correct]: (acc[question.correct] || 0) + 1 }), {});
}

assert.deepEqual(distribution(sectionQuestions), { A: 10, B: 10, C: 10 });
assert.deepEqual(distribution(data.finalQuiz), { A: 7, B: 7, C: 6 });

for (const lesson of data.lessons) {
  for (const sourceRef of lesson.sourceRefs) assert.ok(data.sources[sourceRef], `Fonte non definita: ${sourceRef}`);
  for (const extension of ["svg", "png"]) {
    const names = [
      "mappa-01-mondo-precedente", "mappa-02-fratture", "mappa-03-immagine-uomo",
      "mappa-04-poetica", "mappa-05-opere", "mappa-06-conclusione"
    ];
    assert.ok(fs.existsSync(path.join(root, "assets", "maps", `${names[lesson.number - 1]}.${extension}`)));
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
assert.equal(manifest.display, "standalone");
for (const icon of manifest.icons) assert.ok(fs.existsSync(path.join(root, icon.src)), `Icona mancante: ${icon.src}`);

const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const coreMatch = sw.match(/const CORE = \[([\s\S]*?)\];/);
assert.ok(coreMatch, "Elenco CORE non trovato nel service worker");
const core = vm.runInNewContext(`[${coreMatch[1]}]`);
for (const relative of core) {
  if (relative === "./") continue;
  const clean = relative.replace(/^\.\//, "").split("?")[0];
  assert.ok(fs.existsSync(path.join(root, clean)), `Risorsa offline mancante: ${clean}`);
}

console.log(`content.test.cjs: ok (${data.lessons.length} lezioni, ${sectionQuestions.length + data.finalQuiz.length} quesiti)`);
