import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "../assets/maps");
fs.mkdirSync(out, { recursive: true });

const maps = [
  ["01-mondo.svg", "Il codice cortese", [["Fin’amor","organizza","servizio e distanza"],["Donna-signora","richiede","fedeltà dell’amante"],["Scuola siciliana","trasforma","eredità occitanica"],["Volgare illustre","seleziona","lingua poetica"],["Contrasto","riprende","formule alte"],["Ambiguità","apre","la frattura"]]],
  ["02-frattura.svg", "Dalla corte al borgo", [["Codice cortese","collide con","desiderio urgente"],["Famiglia","rende pubblico","il rapporto"],["Legge e denaro","diventano","vanteria"],["Uomo","alterna","supplica e dominio"],["Donna","alterna","nobiltà e proverbio"],["Mescolanza","produce","negoziazione"]]],
  ["03-testo.svg", "Il testo davanti a noi", [["Vat. lat. 3793","trasmette","testo anonimo"],["Colocci","attribuisce a","Cielo"],["Augustali","fissano","termine 1231"],["Federico II","fissa","termine 1250"],["Dante","cita","siciliano non illustre"],["Indizi","sostengono","ipotesi scenica"]]],
  ["04-duello.svg", "Il duello", [["Lode","incontra","rifiuto"],["Parenti","oppongono","protezione imperiale"],["Vanterie","generano","condizioni"],["Rosa e frutto","rendono visibile","desiderio"],["Vangelo","aggira","rinvio"],["Resa","conserva","ambiguità"]]],
  ["05-poetica.svg", "La macchina poetica", [["Tre alessandrini","preparano","la battuta"],["Due endecasillabi","chiudono","il motto"],["AAABB","ordina","il ritmo"],["Riprese","collegano","le strofe"],["Registri misti","mettono in crisi","alto e basso"],["Gesti e oggetti","producono","teatro mentale"]]],
  ["06-conclusione.svg", "L’amore allo specchio", [["Codice cortese","nasconde","corpo e potere"],["Borgo","espone","condizioni sociali"],["Filologia","distingue","certo e ipotetico"],["Duello","trasforma","amore in negoziazione"],["Metro","rende precisa","la comicità"],["Finale","affida al lettore","responsabilità"]]]
];

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const map of maps) {
  const file = map[0];
  const title = map[1];
  const items = map[2];
  const rows = items.map((item, i) => {
    const y = 170 + i * 95;
    const accent = i % 2 ? "#9c3f43" : "#bf924f";
    return [
      '<rect x="70" y="' + y + '" width="290" height="62" rx="18" fill="#f6f0e5" stroke="' + accent + '" stroke-width="3"/>',
      '<text x="215" y="' + (y + 38) + '" text-anchor="middle" class="node">' + esc(item[0]) + '</text>',
      '<path d="M 365 ' + (y + 31) + ' C 440 ' + (y + 31) + ', 450 ' + (y + 31) + ', 520 ' + (y + 31) + '" class="arrow"/>',
      '<text x="442" y="' + (y + 17) + '" text-anchor="middle" class="verb">' + esc(item[1]) + '</text>',
      '<rect x="530" y="' + y + '" width="600" height="62" rx="18" fill="#172632" stroke="' + accent + '" stroke-width="3"/>',
      '<text x="830" y="' + (y + 38) + '" text-anchor="middle" class="node dark">' + esc(item[2]) + '</text>'
    ].join("\n");
  }).join("\n");
  const desc = items.map((x) => x.join(" ")).join("; ");
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">',
    '<title id="title">' + esc(title) + '</title>',
    '<desc id="desc">' + esc(desc) + '</desc>',
    '<defs><marker id="head" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#bf924f"/></marker>',
    '<style>.title{font:700 42px Georgia,serif;fill:#f6f0e5}.subtitle{font:600 16px system-ui,sans-serif;letter-spacing:3px;fill:#bf924f}.node{font:700 20px system-ui,sans-serif;fill:#172632}.node.dark{fill:#f6f0e5}.verb{font:600 15px system-ui,sans-serif;fill:#f6f0e5}.arrow{fill:none;stroke:#bf924f;stroke-width:3;marker-end:url(#head)}</style></defs>',
    '<rect width="1200" height="800" rx="30" fill="#0d1820"/>',
    '<text x="60" y="70" class="subtitle">MAPPA CONCETTUALE</text>',
    '<text x="60" y="125" class="title">' + esc(title) + '</text>',
    rows,
    '<text x="1140" y="760" text-anchor="end" class="subtitle">GBPROF · ROSA FRESCA AULENTISSIMA</text>',
    '</svg>'
  ].join("\n");
  fs.writeFileSync(path.join(out, file), svg);
}

console.log("Create " + maps.length + " mappe in " + out);

