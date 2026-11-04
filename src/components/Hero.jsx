import { photos } from '../data';
import { CountUp, Reveal, srcSet, imgSrc, useScrollY, reduced } from '../lib.jsx';
import Photo from './Photo';

export function Hero() {
  const y = useScrollY(), p = photos.sydney, off = reduced() ? 0 : Math.min(y, 900);
  return <section className="hero" id="home" aria-labelledby="hero-h">
    <div className="hero-bg" style={{ transform: `translate3d(0,${off * 0.22}px,0) scale(1.06)` }}>
      <picture>
        <source type="image/avif" srcSet={srcSet(p, undefined, 'avif')} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet(p, undefined, 'webp')} sizes="100vw" />
        <img src={imgSrc(p, 1920)} srcSet={srcSet(p)} sizes="100vw" alt={p.alt} width={p.width} height={p.height} fetchPriority="high" decoding="async" />
      </picture>
    </div>
    <div className="hero-shade" aria-hidden="true" />
    <div className="shell hero-in" style={{ opacity: Math.max(0, 1 - off / 700) }}>
      <p className="eyebrow"><span className="live-dot" />INDIA’S NO. 18 · AN INDEPENDENT FAN TRIBUTE</p>
      <h1 id="hero-h"><span>VIRAT</span>{' '}<span className="outline">KOHLI</span></h1>
      <p className="hero-lede">Built for the chase. <em>Eighteen years of fire, focus and the impossible made routine.</em></p>
      <div className="hero-cta"><a className="button gold" href="#theater">Watch the greatest innings <span>▶</span></a><a className="button ghost" href="#innings">Relive the innings <span>↓</span></a></div>
    </div>
    <span className="hero-18" aria-hidden="true">18</span>
    <a className="scroll-cue" href="#numbers" aria-label="Scroll to discover"><i /></a>
    <a className="hero-credit" href={p.source} target="_blank" rel="noreferrer">{p.caption} · {p.author} · {p.license} ↗</a>
  </section>;
}

export function Numbers() {
  const n = [
    [50, '', 'ODI hundreds', 'The first batter ever to reach 50'],
    [973, '', 'IPL runs, one season', 'Still the most in any single season'],
    [765, '', 'World Cup runs', 'The most at any men’s World Cup'],
    [2, '×', 'World Cup winner', '2011 ODI and 2024 T20, after the 2008 Under-19 title'],
  ];
  return <section className="numbers" id="numbers" aria-label="Career highlights"><div className="shell numbers-in">
    {n.map(([v, s, l, d], i) => <Reveal key={l} delay={i * 90} className="num"><b><CountUp to={v} suffix={s} /></b><span>{l}</span><small>{d}</small></Reveal>)}
  </div></section>;
}

export function Feature({ onOpen }) {
  return <section className="feature" id="world-cup" aria-labelledby="cup-h"><div className="shell">
    <div className="feat-top"><p className="eyebrow">THE WORLD CHAMPION</p><span className="eyebrow">KENSINGTON OVAL · BARBADOS · 29 JUNE 2024</span></div>
    <div className="feat-grid">
      <Reveal className="feat-copy"><h2 id="cup-h">FOR THE SHIRT.<br />FOR A <em>BILLION.</em></h2><p>When the final needed a foundation, he stayed. A defining 76. A seven-run victory. A farewell to T20 internationals with the world in blue.</p><div className="feat-actions"><button className="button gold" id="open-world-cup" onClick={onOpen}>Relive the final <span>↗</span></button><a className="text-link" href="#theater" onClick={() => { try { sessionStorage.setItem('vk-cat', 'world'); } catch {} }}>Watch the highlights ↓</a></div></Reveal>
      <Reveal delay={120} className="feat-visual"><Photo photo={photos.champions} sizes="(max-width:900px) 100vw, 55vw" width={1280} /><div className="scoreboard"><span><small>INDIA</small><b>176/7</b></span><span className="vs">FINAL<br />20 OVERS</span><span><small>SOUTH AFRICA</small><b>169/8</b></span></div></Reveal>
    </div>
    <div className="feat-sign"><span>PLAYER OF THE MATCH</span><strong>VIRAT KOHLI</strong><span>76 RUNS · 59 BALLS</span></div>
  </div></section>;
}
