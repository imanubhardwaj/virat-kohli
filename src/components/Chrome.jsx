import { track } from '../analytics.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import { records, innings, videos } from '../data';
import { reduced, useScrollY } from '../lib.jsx';

export const NAV = [['innings','Innings'],['theater','Watch'],['records','Records'],['journey','Journey'],['stats','Numbers'],['gallery','Gallery'],['fan','Fan zone'],['support','Support']];

export function Preloader() {
  const [state, setState] = useState(() => { if (typeof window === 'undefined' || /bot|crawl|spider|slurp|lighthouse|pagespeed|headless/i.test(navigator.userAgent) || navigator.webdriver) return 'gone'; try { return sessionStorage.getItem('vk-intro') || reduced() ? 'gone' : 'on'; } catch { return 'on'; } });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (state === 'gone') return;
    document.body.classList.add('body-locked');
    let raf, t0;
    const step = t => { t0 ??= t; const p = Math.min(1, (t - t0) / 1500); setN(Math.round(18 * p)); if (p < 1) raf = requestAnimationFrame(step); else { setState('out'); setTimeout(() => { setState('gone'); try { sessionStorage.setItem('vk-intro', '1'); } catch {} }, 700); } };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => { if (state === 'gone') document.body.classList.remove('body-locked'); }, [state]);
  if (state === 'gone') return null;
  return <div className={`preloader ${state === 'out' ? 'out' : ''}`} aria-hidden="true"><div className="pre-inner"><span className="pre-n">{String(n).padStart(2, '0')}</span><span className="pre-l">VIRAT KOHLI · THE WORLD OF EIGHTEEN</span><span className="pre-bar"><i style={{ transform: `scaleX(${n / 18})` }} /></span></div></div>;
}

export function Header({ onPalette }) {
  const [open, setOpen] = useState(false), [active, setActive] = useState('');
  const y = useScrollY();
  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  const h = typeof document !== 'undefined' ? document.documentElement.scrollHeight - innerHeight : 1;
  return <header className={`site-header ${y > 40 ? 'solid' : ''}`}>
    <span className="progress" style={{ transform: `scaleX(${h > 0 ? Math.min(1, y / h) : 0})` }} aria-hidden="true" />
    <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="Virat Kohli World home"><span className="brand-mark">VK<span>18</span></span><span className="brand-name">VIRAT KOHLI<small>THE WORLD OF EIGHTEEN</small></span></a>
    <nav id="main-nav" aria-label="Main navigation" className={open ? 'open' : ''}>{NAV.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <button className="kbar" onClick={onPalette} aria-label="Search the site (Command K)"><span>Search</span><kbd>⌘K</kbd></button>
    <button className="menu-toggle" aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? 'Close' : 'Menu'}</button>
  </header>;
}

export function Ticker() {
  const items = ['50 ODI HUNDREDS · THE FIRST EVER', '973 RUNS IN ONE IPL SEASON', '765 AT A SINGLE WORLD CUP', '254* HIGHEST TEST SCORE', '40 TEST WINS AS CAPTAIN', '3× T20 WORLD CUP PLAYER OF THE TOURNAMENT', '14,000 ODI RUNS · FASTEST EVER', 'WORLD CHAMPION 2011 · 2024', 'IPL CHAMPION 2025'];
  const row = items.map((t, i) => <span key={i}>{t}<i aria-hidden="true">◆</i></span>);
  return <div className="ticker" aria-label="Career highlights"><div className="ticker-track"><div>{row}</div><div aria-hidden="true">{row}</div></div></div>;
}

export function Palette({ open, onClose, onOpenInnings, onPlay }) {
  const [q, setQ] = useState(''), [i, setI] = useState(0), input = useRef(null), dlg = useRef(null);
  const all = useMemo(() => [
    ...NAV.map(([id, l]) => ({ k: 'Go to', t: l, go: () => { location.hash = id; } })),
    ...innings.map(x => ({ k: 'Innings', t: `${x.score} · ${x.opponent} · ${x.date}`, go: () => onOpenInnings(x) })),
    ...videos.map(v => ({ k: 'Video', t: `${v.title} · ${v.sub}`, go: () => onPlay(v.id) })),
    ...records.map(r => ({ k: 'Record', t: `${r.n} ${r.l}`, go: () => { location.hash = 'records'; } })),
  ], []);
  const hits = useMemo(() => { const s = q.trim().toLowerCase(); return (s ? all.filter(x => (x.k + ' ' + x.t).toLowerCase().includes(s)) : all.slice(0, 12)).slice(0, 12); }, [q, all]);
  useEffect(() => { const d = dlg.current; if (!d) return; if (open && !d.open) { track('search_open'); d.showModal(); setQ(''); setI(0); setTimeout(() => input.current?.focus(), 0); } if (!open && d.open) d.close(); }, [open]);
  const run = h => { track('search_select', { kind: h.k, title: h.t.slice(0, 80), query: q.trim().slice(0, 60) }); onClose(); setTimeout(h.go, 60); };
  const key = e => { if (e.key === 'ArrowDown') { e.preventDefault(); setI(v => Math.min(hits.length - 1, v + 1)); } else if (e.key === 'ArrowUp') { e.preventDefault(); setI(v => Math.max(0, v - 1)); } else if (e.key === 'Enter' && hits[i]) run(hits[i]); };
  return <dialog ref={dlg} className="palette" aria-label="Search" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === dlg.current) onClose(); }}>
    <input ref={input} value={q} onChange={e => { setQ(e.target.value); setI(0); }} onKeyDown={key} placeholder="Search innings, records, videos…" aria-label="Search" />
    <ul role="listbox">{open && hits.map((h, n) => <li key={n} role="option" aria-selected={n === i}><button className={n === i ? 'on' : ''} onMouseEnter={() => setI(n)} onClick={() => run(h)}><em>{h.k}</em>{h.t}</button></li>)}{open && !hits.length && <li className="none">Nothing found. Try “hundred”, “Melbourne” or “2016”.</li>}</ul>
    <p>↑↓ to move · Enter to open · Esc to close</p>
  </dialog>;
}

export function Footer({ onCredits }) {
  return <footer className="site-footer"><div className="shell foot-grid">
    <div><a className="brand" href="/"><span className="brand-mark">VK<span>18</span></span><span className="brand-name">VIRAT KOHLI WORLD<small>AN INDEPENDENT FAN TRIBUTE</small></span></a><p>Built by fans, for fans. Not affiliated with Virat Kohli, BCCI, ICC, IPL or RCB. All trademarks belong to their owners.</p></div>
    <div><h3>Explore</h3>{NAV.slice(0, 4).map(([id, l]) => <a key={id} href={`/#${id}`}>{l}</a>)}</div>
    <div><h3>More</h3>{NAV.slice(4).map(([id, l]) => <a key={id} href={`/#${id}`}>{l}</a>)}<a href="/#faq">FAQ</a>{onCredits && <button className="linklike" id="open-credits" onClick={onCredits}>Sources &amp; credits ↗</button>}</div>
    <a className="back-top" href="/#home" aria-label="Back to top">↑</a>
  </div><p className="shell foot-note">Figures are dated milestones, not live totals. Videos are official publisher uploads and may be region-restricted.</p></footer>;
}
