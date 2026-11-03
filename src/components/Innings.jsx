import { useState } from 'react';
import { innings, inningsFormats } from '../data';
import { Reveal } from '../lib.jsx';

export default function Innings({ onSelect }) {
  const [filter, setFilter] = useState('all');
  const list = innings.filter(i => filter === 'all' || i.fmt === filter);
  return <section className="section shell" id="innings" aria-labelledby="innings-h">
    <Reveal className="sec-head"><div><p className="eyebrow">01 / THE INNINGS</p><h2 id="innings-h">MOMENTS THAT<br /><em>STAY WITH YOU.</em></h2></div><p>Pressure on. Crowd roaring.<br />Number 18 at the crease.</p></Reveal>
    <div className="toolbar"><div className="chips" role="group" aria-label="Filter innings by format">{inningsFormats.map(([id, l]) => <button key={id} data-filter={id} aria-pressed={filter === id} className={filter === id ? 'on' : ''} onClick={() => setFilter(id)}>{l}</button>)}</div><span className="count" aria-live="polite">{String(list.length).padStart(2, '0')} UNFORGETTABLE INNINGS</span></div>
    <div className="innings-grid">{list.map((i, n) => <Reveal key={i.id} delay={(n % 3) * 80}><button className={`icard fmt-${i.fmt}`} data-innings={i.id} onClick={() => onSelect(i)} aria-label={`Explore ${i.score} against ${i.opponent.split(' v ').find(s => !/^India$/.test(s)) || i.opponent} in ${i.location}`}>
      <span className="icard-top"><span className="eyebrow">{i.competition}</span><span className="fmt-tag">{i.fmt.toUpperCase()}</span></span>
      <span className="icard-score">{i.score}<small>{i.balls} BALLS</small></span>
      <span className="icard-city">{i.location}</span>
      <span className="icard-cap"><span>{i.opponent}</span><h3>{i.subtitle}</h3><span className="date">{i.date}{i.video ? ' · ▶ VIDEO' : ''}</span></span>
      <span className="arrow" aria-hidden="true">↗</span>
    </button></Reveal>)}</div>
    <p className="note">Open an innings for its story and video. * indicates not out.</p>
  </section>;
}
