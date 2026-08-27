import fs from 'node:fs';
import path from 'node:path';
const dir = path.resolve('assets/scenes');
for (const name of fs.readdirSync(dir).filter(name => name.endsWith('.webp'))) {
  const base = name.slice(0, -5);
  const data = fs.readFileSync(path.join(dir, name)).toString('base64');
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid slice"><image width="1536" height="1024" href="data:image/webp;base64,' + data + '"/></svg>\n';
  fs.writeFileSync(path.join(dir, base + '.svg'), svg);
}
