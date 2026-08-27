import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("visual_phase05/assets/maps");
fs.mkdirSync(OUT, { recursive: true });

const C = {
  ink: "#172436",
  indigo: "#243b61",
  wine: "#7c3343",
  green: "#49665a",
  blue: "#426981",
  ochre: "#a56f2d",
  violet: "#62517d",
  parchment: "#f5eedf",
  paper: "#fffaf0",
  gold: "#bf8b35",
  muted: "#667080"
};

const positions = {
  nw: [215, 250], n: [640, 185], ne: [1065, 250],
  sw: [215, 625], s: [640, 720], se: [1065, 625],
  w: [90, 435], e: [1190, 435]
};

const maps = [
  {
    file: "mappa-01-mondo-precedente",
    kicker: "01 · IL MONDO PRECEDENTE",
    title: "La novità nasce da una tradizione plurale",
    center: ["STIL NOVO", "trasforma ciò che riceve"],
    nodes: [
      ["nw", C.blue, ["Trovatori", "fin’amor e servizio"], "offrono lessico e relazione", "in"],
      ["n", C.indigo, ["Scuola siciliana", "lingua e forme"], "media e trasmette", "in"],
      ["ne", C.green, ["Comuni toscani", "reti e corrispondenze"], "moltiplicano gli scambi", "in"],
      ["sw", C.violet, ["Guittone", "autorità duecentesca"], "rende reale il conflitto", "in"],
      ["s", C.wine, ["Bonagiunta", "critica la sottigliansa"], "contesta la complessità", "in"],
      ["se", C.ochre, ["Interiorità", "nuovo problema"], "diventa analisi del soggetto", "out"]
    ],
    footer: "Continuità + trasformazione: il nuovo non coincide con la creazione dal nulla."
  },
  {
    file: "mappa-02-fratture",
    kicker: "02 · LE FRATTURE",
    title: "Le fratture cambiano il luogo dell’amore",
    center: ["TRASFORMAZIONE", "storica e concettuale"],
    nodes: [
      ["nw", C.blue, ["Corte", "→ rete urbana"], "cambia la circolazione", "in"],
      ["ne", C.green, ["Sangue", "→ virtù interiore"], "ridefinisce la gentilezza", "in"],
      ["w", C.violet, ["Codice esterno", "→ processo interno"], "sposta lo sguardo", "in"],
      ["e", C.ochre, ["Retorica", "→ conoscenza"], "rende pensabile", "in"],
      ["s", C.wine, ["Opere", "→ nome retrospettivo"], "Dante ordina dopo", "out"]
    ],
    footer: "La frattura non è un evento unico: più spostamenti modificano insieme il problema poetico."
  },
  {
    file: "mappa-03-immagine-uomo",
    kicker: "03 · L’IMMAGINE DELL’ESSERE UMANO",
    title: "Amore mette alla prova il soggetto",
    center: ["AMORE", "processo e prova"],
    nodes: [
      ["nw", C.blue, ["Sguardo", "soglia della percezione"], "avvia il processo", "in"],
      ["n", C.indigo, ["Cuore · mente", "intelletto · spiriti"], "reagiscono", "out"],
      ["ne", C.green, ["Guinizzelli", "affinità con la gentilezza"], "verifica la virtù", "out"],
      ["sw", C.wine, ["Cavalcanti", "crisi della ragione"], "mostra il limite", "out"],
      ["s", C.violet, ["Dante", "dal saluto alla lode"], "reinterpreta", "out"],
      ["se", C.ochre, ["Donna", "funzioni differenti"], "produce effetti specifici", "in"]
    ],
    footer: "Sembianza angelica, epifania, saluto, lode e salvezza non sono sinonimi."
  },
  {
    file: "mappa-04-poetica",
    kicker: "04 · LA POETICA",
    title: "La forma significa l’interiorità",
    center: ["FORMA POETICA", "trasforma esperienza in senso"],
    nodes: [
      ["nw", C.blue, ["Dolce", "armonizza il dettato"], "rende coerente", "in"],
      ["n", C.indigo, ["Stile", "seleziona e combina"], "organizza", "in"],
      ["ne", C.green, ["Nuovo", "costruisce differenza"], "rilegge il passato", "in"],
      ["w", C.ochre, ["Canzone · sonetto", "ballata"], "danno struttura", "in"],
      ["e", C.wine, ["Immagini", "modelli cognitivi"], "rendono visibile", "out"],
      ["sw", C.violet, ["Destinatari", "comunità competente"], "creano il patto", "out"],
      ["se", C.blue, ["Manoscritti", "ordine e selezione"], "trasmettono il canone", "out"]
    ],
    footer: "“Noto” significa prendo nota; “significare” implica elaborazione, non copia spontanea."
  },
  {
    file: "mappa-05-opere",
    kicker: "05 · LE OPERE",
    title: "Le opere mettono alla prova la poetica",
    center: ["LETTURA RAVVICINATA", "dalla forma alla tesi"],
    nodes: [
      ["nw", C.wine, ["Disputa", "Bonagiunta ↔ Dante"], "costruisce il canone", "in"],
      ["n", C.green, ["Guinizzelli", "gentilezza e tensione"], "verifica la virtù", "in"],
      ["ne", C.violet, ["Cavalcanti", "conoscenza e crisi"], "espone il limite", "in"],
      ["sw", C.blue, ["Vita nuova", "saluto → lode"], "narra e reinterpreta", "in"],
      ["s", C.ochre, ["Cino", "rete e continuazione"], "allarga i confini", "in"],
      ["se", C.indigo, ["Metodo", "parafrasi → interpretazione"], "rende verificabile", "out"]
    ],
    footer: "I testi condividono problemi e lessico, ma producono risposte non sovrapponibili."
  },
  {
    file: "mappa-06-conclusione",
    kicker: "06 · CONCLUSIONE",
    title: "Stil novo: laboratorio e canone",
    center: ["COSTELLAZIONE", "affinità reali + costruzione"],
    nodes: [
      ["nw", C.blue, ["Testi e reti", "producono affinità"], "formano il laboratorio", "in"],
      ["n", C.green, ["Guinizzelli", "virtù"], "offre una risposta", "in"],
      ["ne", C.wine, ["Cavalcanti", "limite"], "offre una risposta", "in"],
      ["w", C.violet, ["Dante", "lode e genealogia"], "partecipa e ordina", "in"],
      ["e", C.ochre, ["Manoscritti", "selezionano"], "trasmettono", "in"],
      ["sw", C.indigo, ["Critica", "nomina e discute"], "stabilizza la categoria", "out"],
      ["se", C.blue, ["Presente", "sentimento e responsabilità"], "riapre la domanda", "out"]
    ],
    footer: "Conoscere una passione non significa necessariamente dominarla o esserne salvati."
  }
];

const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function mapSvg(m) {
  const center = {x: 550, y: 420, w: 500, h: 150};
  const nodes = m.nodes.map(([pos,color,lines,label,dir], i) => {
    const [x,y] = positions[pos];
    return {id:`n${i}`, x, y, w:320, h:126, color, lines, label, dir};
  });
  const edges = nodes.map(n => {
    const sx = n.x + n.w/2, sy = n.y + n.h/2;
    const cx = center.x + center.w/2, cy = center.y + center.h/2;
    const [x1,y1,x2,y2] = n.dir === "in" ? [sx,sy,cx,cy] : [cx,cy,sx,sy];
    const lx = x1 + (x2-x1)*0.48, ly = y1 + (y2-y1)*0.48;
    const labelW = Math.max(150, Math.min(270, n.label.length*9.2));
    return `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="edge" marker-end="url(#arrow)"/>
      <rect x="${lx-labelW/2}" y="${ly-19}" width="${labelW}" height="38" rx="19" class="edge-label-bg"/>
      <text x="${lx}" y="${ly+6}" class="edge-label">${esc(n.label)}</text>`;
  }).join("");
  const boxes = nodes.map(n => `
    <g class="node">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="24" fill="${n.color}"/>
      <rect x="${n.x+8}" y="${n.y+8}" width="${n.w-16}" height="${n.h-16}" rx="18" class="node-inner"/>
      <text x="${n.x+n.w/2}" y="${n.y+49}" class="node-main">${esc(n.lines[0])}</text>
      <text x="${n.x+n.w/2}" y="${n.y+84}" class="node-sub">${esc(n.lines[1])}</text>
    </g>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(m.title)}</title>
  <desc id="desc">${esc(m.footer)}</desc>
  <defs>
    <pattern id="paper" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="${C.parchment}"/><path d="M0 18 C20 12 42 26 80 15 M0 58 C28 50 48 66 80 55" fill="none" stroke="#d9caa9" stroke-width="1" opacity="0.22"/></pattern>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="${C.gold}"/></marker>
    <style>
      .kicker{font:700 22px Inter,Arial,sans-serif;letter-spacing:3px;fill:${C.wine}}
      .title{font:700 47px Georgia,serif;fill:${C.ink}}
      .subtitle{font:400 22px Inter,Arial,sans-serif;fill:${C.muted}}
      .edge{stroke:${C.gold};stroke-width:5;opacity:.92}
      .edge-label-bg{fill:${C.paper};stroke:${C.gold};stroke-width:2}
      .edge-label{font:700 16px Inter,Arial,sans-serif;fill:${C.ink};text-anchor:middle}
      .node{}
      .node-inner{fill:none;stroke:#fffaf0;stroke-width:2;opacity:.58}
      .node-main{font:700 27px Georgia,serif;fill:white;text-anchor:middle}
      .node-sub{font:500 19px Inter,Arial,sans-serif;fill:#fffaf0;text-anchor:middle}
      .center{}
      .center-main{font:800 35px Inter,Arial,sans-serif;letter-spacing:1px;fill:white;text-anchor:middle}
      .center-sub{font:500 24px Georgia,serif;font-style:italic;fill:#fff3ce;text-anchor:middle}
      .footer{font:500 21px Georgia,serif;fill:${C.ink};text-anchor:middle}
    </style>
  </defs>
  <rect width="1600" height="1000" fill="url(#paper)"/>
  <rect x="0" y="0" width="1600" height="18" fill="${C.indigo}"/>
  <text x="90" y="72" class="kicker">${esc(m.kicker)}</text>
  <text x="90" y="130" class="title">${esc(m.title)}</text>
  <text x="90" y="169" class="subtitle">Mappa concettuale · le relazioni sono espresse dai verbi sulle frecce</text>
  <g>${edges}</g>
  <g class="center">
    <rect x="${center.x}" y="${center.y}" width="${center.w}" height="${center.h}" rx="34" fill="${C.indigo}"/>
    <rect x="${center.x+9}" y="${center.y+9}" width="${center.w-18}" height="${center.h-18}" rx="27" fill="none" stroke="${C.gold}" stroke-width="4"/>
    <text x="800" y="480" class="center-main">${esc(m.center[0])}</text>
    <text x="800" y="523" class="center-sub">${esc(m.center[1])}</text>
  </g>
  ${boxes}
  <rect x="90" y="920" width="1420" height="2" fill="${C.gold}" opacity=".55"/>
  <text x="800" y="962" class="footer">${esc(m.footer)}</text>
</svg>`;
}

for (const m of maps) fs.writeFileSync(path.join(OUT, `${m.file}.svg`), mapSvg(m));

const icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="${C.indigo}"/>
  <rect x="24" y="24" width="464" height="464" rx="84" fill="none" stroke="${C.gold}" stroke-width="10"/>
  <path d="M88 312 Q170 274 256 318 Q342 274 424 312 L424 382 Q342 350 256 394 Q170 350 88 382 Z" fill="${C.paper}" stroke="${C.gold}" stroke-width="8"/>
  <path d="M256 318 L256 394" stroke="${C.gold}" stroke-width="8"/>
  <path d="M156 191 C156 130 232 116 256 170 C280 116 356 130 356 191 C356 250 291 278 256 304 C221 278 156 250 156 191 Z" fill="${C.wine}" stroke="${C.paper}" stroke-width="8"/>
  <path d="M104 182 Q150 126 212 182 Q150 238 104 182 Z" fill="${C.paper}" stroke="${C.gold}" stroke-width="7"/>
  <circle cx="158" cy="182" r="20" fill="${C.blue}"/>
  <path d="M177 188 Q214 204 231 225" fill="none" stroke="${C.gold}" stroke-width="8" stroke-linecap="round"/>
</svg>`;
fs.writeFileSync(path.resolve("visual_phase05/assets/icons/app-icon.svg"), icon);

console.log(`Generated ${maps.length} maps and app icon.`);
