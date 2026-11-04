// Runs after `vite build` and `vite build --ssr`: writes real HTML for every page, plus sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const SITE = (process.env.SITE_URL || 'https://www.viratkohli.world').replace(/\/$/, '');
const dist = resolve('dist');
const template = readFileSync(`${dist}/index.html`, 'utf8');
const ssr = await import(pathToFileURL(resolve('.ssr/entry-server.js')).href);

const css = [...template.matchAll(/<link rel="stylesheet"[^>]*>/g)].map(m => m[0]).join('\n  ');
const font = template.match(/<link href="https:\/\/fonts\.googleapis[^>]*>/)?.[0] || '';
const build = (head, html, { script = true, preload = '' } = {}) => {
  let out = template.replace('<title>Virat Kohli World</title>\n  <!--app-head-->', `${head}${preload ? '\n  ' + preload : ''}`).replace('<!--app-html-->', html);
  if (!script) out = out.replace(/<script type="module"[^>]*><\/script>/g, '').replace(/<link rel="modulepreload"[^>]*>/g, '');
  return out;
};
const write = (path, html) => { const file = `${dist}/${path}`; mkdirSync(file.replace(/\/[^/]*$/, ''), { recursive: true }); writeFileSync(file, html); };

write('index.html', build(ssr.homeHead(SITE), ssr.renderHome(), { preload: ssr.heroPreload }));
for (const i of ssr.innings) write(`innings/${i.id}/index.html`, build(ssr.inningsHead(i, SITE), ssr.renderInnings(i), { script: false }));
write('404.html', build(ssr.notFoundHead(SITE), '<main class="ipage"><div class="shell"><h1>Page not found</h1><p class="ipage-body">That page is not in this innings. <a class="text-link" href="/">Back to Virat Kohli World</a></p></div></main>', { script: false }));

const today = new Date().toISOString().slice(0, 10);
const urls = [['/', '1.0', 'weekly'], ...ssr.innings.map(i => [ssr.inningsPath(i), '0.8', 'monthly'])];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([u, p, f]) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><changefreq>${f}</changefreq><priority>${p}</priority></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(`${dist}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`prerendered ${2 + ssr.innings.length} pages for ${SITE}`);
