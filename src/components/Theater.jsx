import { track } from '../analytics.js';
import { useEffect, useRef, useState } from 'react';
import { videos, videoCats, videoById } from '../data';
import { Reveal } from '../lib.jsx';

const poster = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export function VideoEmbed({ id, autoPlay = false, title }) {
  const [on, setOn] = useState(autoPlay);
  useEffect(() => setOn(autoPlay), [id, autoPlay]);
  const v = videoById[id];
  return <div className="embed">{on
    ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`} title={title || v?.title || 'Video'} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    : <button className="embed-play" onClick={() => { track('video_play', { video_id: id, source: 'embed' }); setOn(true); }} aria-label={`Play video: ${title || v?.title}`}><img src={poster(id)} alt="" loading="lazy" /><span className="play-btn" aria-hidden="true">▶</span></button>}</div>;
}

export default function Theater({ request }) {
  const [cat, setCat] = useState(() => { try { const c = sessionStorage.getItem('vk-cat'); sessionStorage.removeItem('vk-cat'); return c || 'all'; } catch { return 'all'; } });
  const [cur, setCur] = useState(videos.find(v => v.featured).id), [auto, setAuto] = useState(false), stage = useRef(null);
  const list = videos.filter(v => cat === 'all' || v.cat === cat);
  const v = videoById[cur];
  useEffect(() => { if (request) { track('video_play', { video_id: request.id, source: 'search' }); setCur(request.id); setCat('all'); setAuto(true); stage.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }, [request]);
  const idx = videos.findIndex(x => x.id === cur);
  const go = d => { const nid = videos[(idx + d + videos.length) % videos.length].id; track('video_play', { video_id: nid, source: 'prev_next' }); setCur(nid); setAuto(true); };
  return <section className="theater" id="theater" aria-labelledby="theater-h"><div className="shell">
    <Reveal className="sec-head"><div><p className="eyebrow">02 / THE THEATRE</p><h2 id="theater-h">PRESS PLAY.<br /><em>LOSE AN HOUR.</em></h2></div><p>{videos.length} official films from ICC, Star Sports, RCB, ECB and cricket.com.au.<br />Every one of them worth watching twice.</p></Reveal>
    <div className="stage" ref={stage}>
      <div className="stage-screen"><VideoEmbed id={cur} autoPlay={auto} /></div>
      <div className="stage-info"><span className="eyebrow">NOW SHOWING · {videoCats.find(c => c[0] === v.cat)[1].toUpperCase()}</span><h3>{v.title}</h3><p>{v.sub}</p><span className="by">{v.by} · {v.len}</span>
        <div className="stage-ctl"><button onClick={() => go(-1)} aria-label="Previous video">← Prev</button><button onClick={() => go(1)} aria-label="Next video">Next →</button><a href={`https://www.youtube.com/watch?v=${cur}`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
      </div>
    </div>
    <div className="toolbar"><div className="chips" role="group" aria-label="Filter videos">{videoCats.map(([id, l]) => <button key={id} aria-pressed={cat === id} className={cat === id ? 'on' : ''} onClick={() => { track('filter_change', { section: 'theater', filter: id }); setCat(id); }}>{l}</button>)}</div><span className="count" aria-live="polite">{list.length} FILMS</span></div>
    <ul className="reel">{list.map(x => <li key={x.id}><button className={x.id === cur ? 'on' : ''} onClick={() => { track('video_play', { video_id: x.id, source: 'reel' }); setCur(x.id); setAuto(true); stage.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} aria-label={`Play ${x.title}`}><span className="thumb"><img src={poster(x.id)} alt="" loading="lazy" /><i>{x.len}</i><b aria-hidden="true">▶</b></span><strong>{x.title}</strong><small>{x.sub}</small><em>{x.by}</em></button></li>)}</ul>
    <p className="note">Videos play from the publishers’ own YouTube channels using YouTube’s privacy-enhanced player. Availability may vary by region.</p>
  </div></section>;
}
