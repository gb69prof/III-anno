const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp"
};

function safePath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://127.0.0.1").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error("Percorso non valido");
  }
  return resolved;
}

const server = http.createServer(async (request, response) => {
  try {
    const file = safePath(request.url);
    const body = await fs.readFile(file);
    response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(0, "127.0.0.1", async () => {
  const { port } = server.address();
  const imageNames = ["scuola-parigi", "astrolabio-bretagna", "matrimonio-segreto", "due-chiostri", "lettere-paracleto", "eloisa-badessa"];
  const mapNames = ["mondo", "fratture", "visione", "poetica", "opere", "conclusione"];
  const assets = [
    "/", "/styles.css", "/content.js", "/app.js", "/manifest.webmanifest", "/sw.js",
    "/assets/icons/icon-192.png", "/assets/icons/icon-512.png",
    ...imageNames.map((name, index) => `/assets/images/0${index + 1}-${name}.webp`),
    ...mapNames.map((name, index) => `/assets/maps/0${index + 1}-${name}.svg`)
  ];

  try {
    for (const asset of assets) {
      const response = await fetch(`http://127.0.0.1:${port}${asset}`);
      if (!response.ok || Number(response.headers.get("content-length") || 1) === 0) {
        throw new Error(`${asset}: HTTP ${response.status}`);
      }
    }
    console.log(`Smoke test HTTP completato: ${assets.length} risorse raggiungibili.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

