import { useState } from 'react';
import { timeline, timelineKinds, formats, photos } from '../data';
import { CountUp, Reveal } from '../lib.jsx';
import Photo from './Photo';

export function Timeline() {
  const [k, setK] = useState('all');
  const list = timeline.filter(t => k === 'all' || t.k === k);
  return <section className="journey" id="journey" aria-labelledby="journey-h"><div className="shell">
    <Reveal className="sec-head"><div><p className="eyebrow">04 / THE JOURNEY</p><h2 id="journey-h">NEVER JUST<br /><em>A GAME.</em></h2></div><p>From a Delhi academy to the biggest stages.<br />{timeline.length} moments that built the legend.</p></Reveal>
    <div className="toolbar"><div className="chips" role="group" aria-label="Filter timeline"><button aria-pressed={k === 'all'} className={k === 'all' ? 'on' : ''} onClick={() => setK('all')}>All</button>{Object.entries(timelineKinds).map(([id, l]) => <button key={id} aria-pressed={k === id} className={k === id ? 'on' : ''} onClick={() => setK(id)}>{l}</button>)}</div></div>
    <ol className="tl">{list.map((t, i) => <li key={t.y + t.t} className={`tl-${t.k} ${i % 2 ? 'r' : 'l'}`}><Reveal delay={40}><span className="tl-y">{t.y}</span><span className="tl-d">{t.d}</span><h3>{t.t}</h3><p>{t.b}</p><span className="tl-k">{timelineKinds[t.k].toUpperCase()}</span></Reveal></li>)}</ol>
    <p className="note">Dates and results follow ICC, IPL and BCCI coverage. Where a day is not shown, the month is.</p>
  </div></section>;
}

export function Why18() {
  return <section className="why18" aria-labelledby="why18-h"><div className="shell why-grid">
    <Reveal className="why-n" aria-hidden="true">18</Reveal>
    <Reveal delay={120} className="why-copy"><p className="eyebrow">THE NUMBER</p><h2 id="why18-h">WHY <em>EIGHTEEN?</em></h2>
      <p>On 18 December 2006, Virat Kohli’s father died while Delhi were playing a Ranji Trophy match. The next morning, the 18-year-old returned to the middle and made 90 for his team.</p>
      <p>He has worn 18 ever since, from the Under-19s to India. It is also the number of seasons he spent with Royal Challengers before the IPL title finally came, in 2025.</p>
      <p className="why-sub">Eighteen. A date. A shirt. A season.</p></Reveal>
  </div></section>;
}

function Ring({ value, max = 70, label }) {
  const r = 52, c = 2 * Math.PI * r;
  return <div className="ring" role="img" aria-label={`${label}: ${value}`}><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r={r} className="ring-bg" /><circle cx="60" cy="60" r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - value / max)} /></svg><b><CountUp to={value} format={n => n.toFixed(2)} /></b><span>{label}</span></div>;
}

export function Stats() {
  const [id, setId] = useState('test');
  const f = formats.find(x => x.id === id);
  return <section className="section shell stats" id="stats" aria-labelledby="stats-h">
    <Reveal className="sec-head"><div><p className="eyebrow">05 / THE NUMBERS</p><h2 id="stats-h">A CAREER<br /><em>IN FOUR FORMATS.</em></h2></div><p>Closed careers are final.<br />Open ones are dated.</p></Reveal>
    <div className="tabs" role="tablist" aria-label="Formats">{formats.map(x => <button key={x.id} role="tab" id={`st-${x.id}`} aria-selected={id === x.id} aria-controls="st-panel" tabIndex={id === x.id ? 0 : -1} className={id === x.id ? 'on' : ''} onClick={() => setId(x.id)} onKeyDown={e => { const i = formats.findIndex(y => y.id === id); const n = e.key === 'ArrowRight' ? (i + 1) % 4 : e.key === 'ArrowLeft' ? (i + 3) % 4 : null; if (n !== null) { e.preventDefault(); setId(formats[n].id); document.getElementById('st-' + formats[n].id)?.focus(); } }}>{x.label}</button>)}</div>
    <div id="st-panel" role="tabpanel" aria-labelledby={`st-${id}`} className="stat-panel" key={id}>
      <div className="stat-side"><span className="eyebrow">{f.status.toUpperCase()}</span>{f.avg ? <Ring value={f.avg} label="AVERAGE" /> : <div className="ring ring-none"><b>973</b><span>BEST SEASON</span></div>}<p>{f.note}</p></div>
      <div className="stat-cards">{f.rows.map(([l, v, shown]) => <div className="stat-card" key={l}><b>{shown ? shown : <CountUp to={v} />}</b><span>{l}</span></div>)}<div className="stat-card hs"><b>{f.hs}</b><span>HIGHEST SCORE</span></div></div>
    </div>
    <p className="note">ODI figures are those at the end of the 2025 Champions Trophy; the career is still being written. IPL hundreds are to the 2024 season.</p>
  </section>;
}

export function Gallery({ onOpen, keys }) {
  return <section className="gallery" id="gallery" aria-labelledby="gallery-h"><div className="shell">
    <Reveal className="sec-head"><div><p className="eyebrow">06 / THE GALLERY</p><h2 id="gallery-h">THE FRAMES<br /><em>THAT STAY.</em></h2></div><p>{keys.length} free-licensed photographs.<br />Tap any image to enlarge. Use ← → in the viewer.</p></Reveal>
    <div className="masonry">{keys.map((k, i) => <Reveal key={k} delay={(i % 3) * 70} className="m-item"><Photo photo={photos[k]} width={960} sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw" onClick={() => onOpen(i)} /></Reveal>)}</div>
    <p className="note">Photographs are served from Wikimedia Commons with the credits and licences shown on each image.</p>
  </div></section>;
}
