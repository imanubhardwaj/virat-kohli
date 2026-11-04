import photos from './photos.json';
import { faq } from './data/faq.js';
import { innings } from './data/innings.js';

export const SITE_NAME = 'Virat Kohli World';
const heroImg = (site, w = 1280) => `${site}/assets/hero/hero-${w}.jpg`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
export const opp = i => i.opponent.split(' v ').filter(t => !/^(India|RCB)$/.test(t.trim())).join(' ').trim() || i.opponent;
export const year = i => (i.date.match(/\d{4}/) || [''])[0];
export const inningsPath = i => `/innings/${i.id}/`;

function tags({ url, title, description, image, imageAlt, type = 'website', noindex = false }) {
  const t = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`,
  ];
  return t.join('\n  ');
}
const ld = o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

export function homeHead(site) {
  const url = `${site}/`;
  const title = 'Virat Kohli: Greatest Innings, Records, Videos & Timeline';
  const description = 'Relive Virat Kohli’s greatest innings, official highlight videos, dated records and career timeline: 50 ODI hundreds, 973 IPL runs, 254* and more.';
  const person = { '@type': 'Person', '@id': `${site}/#virat-kohli`, name: 'Virat Kohli', alternateName: 'Virat Kohli (No. 18)', jobTitle: 'Cricketer', birthDate: '1988-11-05', birthPlace: { '@type': 'Place', name: 'Delhi, India' }, nationality: { '@type': 'Country', name: 'India' }, image: heroImg(site, 1280), sameAs: ['https://en.wikipedia.org/wiki/Virat_Kohli'] };
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site}/#website`, url, name: SITE_NAME, description: 'An independent fan tribute to Virat Kohli.', inLanguage: 'en', publisher: { '@id': `${site}/#org` } },
      { '@type': 'Organization', '@id': `${site}/#org`, name: SITE_NAME, url, description: 'An independent fan project. Not affiliated with Virat Kohli, BCCI, ICC, IPL or RCB.' },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${site}/#website` }, about: { '@id': `${site}/#virat-kohli` }, primaryImageOfPage: { '@type': 'ImageObject', url: heroImg(site, 1280), width: 1280, height: 848, caption: photos.sydney.alt }, inLanguage: 'en' },
      person,
      { '@type': 'ItemList', '@id': `${url}#innings`, name: 'Virat Kohli’s greatest innings', itemListElement: innings.map((i, n) => ({ '@type': 'ListItem', position: n + 1, url: `${site}${inningsPath(i)}`, name: `Virat Kohli ${i.score} v ${opp(i)}, ${i.location} ${year(i)}` })) },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return [tags({ url, title, description, image: heroImg(site, 1280), imageAlt: photos.sydney.alt }), ld(graph)].join('\n  ');
}

export function inningsHead(i, site) {
  const url = `${site}${inningsPath(i)}`;
  const base = `Virat Kohli ${i.score} v ${opp(i)}, ${i.location} ${year(i)}`;
  const title = base.length + 16 <= 60 ? `${base}: Innings & Video` : base;
  const description = clip(`${i.score} off ${i.balls} balls v ${opp(i)} at ${i.location}, ${i.date}. ${i.result}. ${i.description}`, 158);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: 'Greatest innings', item: `${site}/#innings` },
        { '@type': 'ListItem', position: 3, name: `${i.score} v ${opp(i)}`, item: url } ] },
      { '@type': 'Article', '@id': `${url}#article`, mainEntityOfPage: url, headline: clip(title, 110), description: i.description, image: [heroImg(site, 1280)], about: { '@id': `${site}/#virat-kohli` }, author: { '@type': 'Organization', name: SITE_NAME, url: `${site}/` }, publisher: { '@type': 'Organization', name: SITE_NAME, url: `${site}/` }, inLanguage: 'en' },
    ],
  };
  return [tags({ url, title, description, image: heroImg(site, 1280), imageAlt: photos.sydney.alt, type: 'article' }), ld(graph)].join('\n  ');
}

export function notFoundHead(site) {
  return tags({ url: `${site}/404.html`, title: 'Page not found | Virat Kohli World', description: 'This page could not be found.', image: heroImg(site, 1280), imageAlt: photos.sydney.alt, noindex: true });
}
export const heroPreload = `<link rel="preload" as="image" type="image/avif" fetchpriority="high" imagesrcset="${[640, 960, 1280, 1920, 2560].map(w => `/assets/hero/hero-${w}.avif ${w}w`).join(', ')}" imagesizes="100vw" />`;
