// Copies _site to preview/ and rewrites links so the pages open by double-click (no server needed).
import fs from "node:fs";
import path from "node:path";
const src = "_site", out = "preview";
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const file of walk(out).filter((f) => f.endsWith(".html"))) {
  const depth = path.relative(out, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const up = depth ? "../".repeat(depth) : "./";
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, p) => {
    if (p === "" || p.endsWith("/")) p += "index.html";
    return `${attr}="${up}${p}"`;
  });
  fs.writeFileSync(file, html);
}
console.log("Preview written to preview/. Open preview/index.html.");
