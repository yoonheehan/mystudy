// Checks that every source URL cited in the study content still opens.
// Needs network access, so it is not part of `npm test`. Run with: npm run check:links
// Exit code 1 means at least one link is broken (404/410, 5xx, DNS or connection failure).
// Sites that refuse automated requests (401/403/429) are reported as warnings, not failures.
import fs from 'node:fs';
import path from 'node:path';

const roots = ['src/lib', 'static/algorithm-deep.js', 'static/archive/credits.json'];
const files = roots.flatMap(function walk(p) {
  if (!fs.existsSync(p)) return [];
  if (fs.statSync(p).isDirectory()) return fs.readdirSync(p).flatMap(n => walk(path.join(p, n)));
  return /\.(ts|js|json|svelte)$/.test(p) ? [p] : [];
});

// URL -> first file that cites it.
// Cited sources are whole quoted strings; URLs mentioned inside lesson prose are examples, not sources.
const found = new Map();
const sample = /^https?:\/\/(localhost|127\.|10\.|192\.168\.|example\.(com|org)|[\w.-]*\.example\.com)/;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/['"`](https?:\/\/[^'"`\s]+)['"`]/g)) {
    const url = m[1];
    if (!sample.test(url) && !found.has(url)) found.set(url, file);
  }
}

// DOI landing pages (doi.org, dl.acm.org) refuse bots, so a DOI is checked against the Crossref registry instead.
function doiOf(url) {
  const m = url.match(/^https:\/\/(?:doi\.org|dl\.acm\.org\/doi)\/(10\.\d+\/.+)$/);
  return m && decodeURIComponent(m[1]);
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 cs-lab-link-check';
async function probe(url) {
  const doi = doiOf(url);
  const target = doi ? 'https://api.crossref.org/works/' + encodeURIComponent(doi) : url;
  for (const method of doi ? ['GET'] : ['HEAD', 'GET']) {
    try {
      const res = await fetch(target, { method, redirect: 'follow', headers: { 'user-agent': UA, accept: 'text/html,application/json,*/*' }, signal: AbortSignal.timeout(20000) });
      res.body?.cancel?.();
      // Some servers reject HEAD (405/403/404) but serve GET; only trust HEAD when it succeeds.
      if (method === 'HEAD' && !res.ok) continue;
      return { status: res.status };
    } catch (err) {
      if (method === 'GET') return { status: 0, error: err.cause?.code || err.name || String(err) };
    }
  }
}

const urls = [...found.keys()];
const results = [];
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    let r = await probe(url);
    if (r.status === 0 || r.status >= 500) r = await probe(url); // one retry for flaky hosts
    for (let wait = 2000; r.status === 429 && wait <= 8000; wait *= 2) {
      await new Promise(done => setTimeout(done, wait)); // rate limited (Crossref, archive.org): back off and retry
      r = await probe(url);
    }
    results.push({ url, ...r });
  }
}
await Promise.all(Array.from({ length: 8 }, worker));

const broken = results.filter(r => r.status === 0 || r.status === 404 || r.status === 410 || r.status >= 500);
const blocked = results.filter(r => [401, 403, 429].includes(r.status));
const odd = results.filter(r => !broken.includes(r) && !blocked.includes(r) && r.status >= 400);
const line = r => `  ${r.status || r.error}  ${r.url}  (${found.get(r.url)})`;
if (blocked.length) console.log(`Refused automated check (open these by hand):\n${blocked.map(line).join('\n')}\n`);
if (odd.length) console.log(`Unexpected status:\n${odd.map(line).join('\n')}\n`);
if (broken.length) console.log(`Broken:\n${broken.map(line).join('\n')}\n`);
console.log(`${results.length} links checked: ${results.length - broken.length - blocked.length - odd.length} ok, ${blocked.length} refused, ${odd.length} unexpected, ${broken.length} broken.`);
process.exit(broken.length ? 1 : 0);
