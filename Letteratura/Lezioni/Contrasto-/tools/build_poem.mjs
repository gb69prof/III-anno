import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, "../../source-page.json");
const outputPath = path.resolve(here, "../poem.js");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const paras = source.paras;

if (paras.length !== 206) {
  throw new Error(`Attesi 206 paragrafi dalla lezione originale, trovati ${paras.length}`);
}

const poemLines = paras.slice(6, 166).map((line) =>
  line.replace("ha ’n [Bari.", "ha ’n Bari.").replace(/\u00a0/g, " ").trim()
);
const paraphrases = paras.slice(174, 206).map((line) => line.trim());

const sceneForStanza = (n) => {
  if (n <= 2) return "02-rosa-sguardo";
  if (n <= 4) return "03-primo-rifiuto";
  if (n <= 6) return "04-parenti-augustali";
  if (n <= 16) return "05-duello-verbale";
  if (n <= 23) return "06-frutto-giardino";
  if (n <= 31) return "07-vangelo-inatteso";
  return "08-conclusione-ambigua";
};

const actForStanza = (n) => {
  if (n <= 4) return 1;
  if (n <= 6) return 2;
  if (n <= 16) return 3;
  if (n <= 23) return 4;
  if (n <= 31) return 5;
  return 6;
};

const stanzas = Array.from({ length: 32 }, (_, index) => {
  const number = index + 1;
  return {
    number,
    speaker: number % 2 ? "Uomo" : "Donna",
    lines: poemLines.slice(index * 5, index * 5 + 5),
    paraphrase: paraphrases[index]
      .replace(/^Uomo:\s*/, "")
      .replace(/^Donna:\s*/, "")
      .replace(/^"|"$/g, ""),
    act: actForStanza(number),
    scene: sceneForStanza(number)
  };
});

const data = {
  sourceUrl: "https://sites.google.com/view/gbprof-lezioniperlaterza/home-page/italiano/amore-cortese/evoluzione/cielo-dalcamo",
  introOriginale: paras.slice(0, 6),
  commentoOriginale: paras.slice(166, 174),
  stanzas
};

fs.writeFileSync(outputPath, `window.POEM_DATA = ${JSON.stringify(data, null, 2)};\n`);
console.log(`Creato ${outputPath}: ${stanzas.length} strofe, ${poemLines.length} versi.`);

