import { useMemo, useState } from 'react';
import { records, recordFormats } from '../data';
import { Reveal } from '../lib.jsx';

export default function Vault() {
  const [f, setF] = useState('all'), [q, setQ] = useState('');
  const list = useMemo(() => { const s = q.trim().toLowerCase(); return records.filter(r => (f === 'all' || r.f === f) && (!s || (r.n + ' ' + r.l + ' ' + r.t + ' ' + r.d).toLowerCase().includes(s))); }, [f, q]);
  return <section className="section shell vault" id="records" aria-labelledby="records-h">
    <Reveal className="sec-head"><div><p className="eyebrow">03 / THE RECORD VAULT</p><h2 id="records-h">THE GAME<br /><em>REMEMBERS.</em></h2></div><p>{records.length} milestones, every one dated.<br />Search them, filter them, argue about them.</p></Reveal>
    <div className="toolbar"><div className="chips" role="group" aria-label="Filter records">{recordFormats.map(([id, l]) => <button key={id} aria-pressed={f === id} className={f === id ? 'on' : ''} onClick={() => setF(id)}>{l}</button>)}</div>
      <label className="search"><span className="sr">Search records</span><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search: Pakistan, 2016, double…" /></label></div>
    <span className="count" aria-live="polite">{list.length} RECORD{list.length === 1 ? '' : 'S'}</span>
    <div className="vault-grid">{list.map(r => <article className={`rec rec-${r.f}`} key={r.f + r.n + r.l}><span className="rec-d">{r.d}</span><strong>{r.n}</strong><h3>{r.l}</h3><p>{r.t}</p><span className="rec-f">{r.f === 't20' ? 'T20' : r.f === 'honour' ? 'HONOUR' : r.f.toUpperCase()}</span></article>)}
      {!list.length && <p className="empty">No record matches “{q}”. Try a year, an opponent or “hundred”.</p>}</div>
    <p className="note">Dated milestones, not live career totals. Tests (May 2025) and T20Is (June 2024) are closed careers; ODI and IPL figures are labelled with their dates.</p>
  </section>;
}
