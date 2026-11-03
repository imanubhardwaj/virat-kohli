import { useEffect, useRef } from 'react';
import { photos, sources, videos } from '../data';
import { thumb, srcSet } from '../lib.jsx';
import { VideoEmbed } from './Theater';

function useModal(onClose) {
  const dialog = useRef(null), close = useRef(null);
  useEffect(() => {
    const trigger = document.activeElement, el = dialog.current;
    el.showModal(); document.body.classList.add('body-locked'); close.current?.focus();
    return () => { el.close(); document.body.classList.remove('body-locked'); trigger?.focus?.(); };
  }, []);
  const backdrop = e => { if (e.target === dialog.current) onClose(); };
  return { dialog, close, backdrop };
}

function InningsStory({ i }) {
  return <>
    <h2 id="dialog-title">{i.title}</h2>
    <p className="dialog-lead">{i.opponent} · {i.location}<br />{i.date}</p>
    <div className="dialog-stat"><strong>{i.score}</strong><span>RUNS<br />{i.balls} BALLS</span></div>
    <p>{i.description}</p><p className="dialog-result">{i.result}</p>
    {i.video && <VideoEmbed id={i.video} title={`${i.score} · ${i.location}`} />}
    {i.source && <a className="button gold" href={i.source} target="_blank" rel="noreferrer">{i.linkLabel} ↗</a>}
    <p className="note">{i.source ? 'Opens the official publisher’s website.' : i.video ? 'Video from the official publisher’s YouTube channel.' : 'Photographs from this era are in the gallery.'}</p>
  </>;
}
export function WorldCupStory() {
  return <><h2 id="dialog-title">The last T20I.<br />The perfect ending.</h2><p className="dialog-lead">Barbados. 29 June 2024. India are world champions.</p>
    <div className="dialog-stat"><strong>76</strong><span>RUNS<br />59 BALLS</span><span>PLAYER OF<br />THE MATCH</span></div>
    <ol className="final-story"><li><h3>Build the foundation.</h3><p>Three early wickets put India under pressure. Kohli and Axar Patel rebuilt with a 72-run partnership; Shivam Dube then helped take the innings forward.</p></li><li><h3>Give the bowlers a chance.</h3><p>Kohli’s 76 helped India finish on 176/7. South Africa pushed the chase to the edge before India’s late bowling and fielding turned the final.</p></li><li><h3>Finish as a champion.</h3><p>India won by seven runs. Kohli received the Player of the Match award and announced that this was his last T20 international.</p></li></ol>
    <VideoEmbed id="3yiWqnKl7lQ" title="T20 World Cup 2024 final montage" />
    <a className="button gold" href={sources.final} target="_blank" rel="noreferrer">Read the ICC report ↗</a>
    <a className="dialog-source" href={sources.farewell} target="_blank" rel="noreferrer">Kohli’s farewell: the ICC report ↗</a></>;
}
function Credits() {
  const vids = [...new Set(videos.map(v => v.by))];
  return <><h2 id="dialog-title">Behind the tribute.</h2><p>An independent fan project celebrating selected career moments. Statistics describe the events and seasons shown, rather than live totals.</p>
    <h3>Free photographs</h3><p>Photographs are served by Wikimedia Commons and resized by its image service. No AI-generated likenesses are used.</p>
    <ul className="credits-list">{Object.values(photos).map(p => <li key={p.file}><a href={p.source} target="_blank" rel="noreferrer">{p.caption} ↗</a><p>{p.author} · <a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license}</a></p></li>)}</ul>
    <h3>Videos</h3><p>All films are official uploads, embedded from their publishers’ YouTube channels: {vids.join(', ')}. They are not hosted or copied here. Ownership remains with the publishers.</p>
    <h3>Cricket sources</h3><ul className="credits-list">{[['2008 and 2011 World Cup chapters', sources.beginnings], ['Melbourne 2022 report', sources.mcg], ['Bengaluru 2016 match report', sources.ipl], ['The 50th ODI century', sources.fifty], ['2023 World Cup records', sources.worldCup], ['IPL season record', sources.season], ['2024 final report', sources.final], ['T20I farewell', sources.farewell]].map(([l, u]) => <li key={u}><a href={u} target="_blank" rel="noreferrer">{l} ↗</a></li>)}</ul>
    <p className="note">Other milestones follow widely published ICC, IPL and BCCI records. If you spot an error, please let us know so it can be fixed. Fonts: Barlow Condensed, DM Sans and Instrument Serif via Google Fonts (SIL Open Font License).</p></>;
}

export default function DetailDialog({ detail, onClose }) {
  const { dialog, close, backdrop } = useModal(onClose);
  const label = detail.type === 'innings' ? detail.innings.competition : detail.type === 'world-cup' ? '2024 / T20 WORLD CUP FINAL' : 'THE SOURCES & THE PEOPLE';
  return <dialog ref={dialog} className="detail" aria-labelledby="dialog-title" onClick={backdrop} onCancel={e => { e.preventDefault(); onClose(); }}>
    <div className="dialog-top"><span className="eyebrow">{label}</span><button ref={close} className="icon-button" id="dialog-close" aria-label="Close dialog" onClick={onClose}>×</button></div>
    <div id="dialog-body">{detail.type === 'innings' ? <InningsStory i={detail.innings} /> : detail.type === 'world-cup' ? <WorldCupStory /> : <Credits />}</div>
  </dialog>;
}

export function Lightbox({ keys, index, setIndex, onClose }) {
  const { dialog, close, backdrop } = useModal(onClose);
  const n = keys.length, p = photos[keys[index]];
  const go = d => setIndex((index + d + n) % n);
  useEffect(() => { const k = e => { if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); });
  return <dialog ref={dialog} className="lightbox" aria-label="Photo viewer" onClick={backdrop} onCancel={e => { e.preventDefault(); onClose(); }}>
    <button ref={close} className="icon-button lb-close" aria-label="Close viewer" onClick={onClose}>×</button>
    <button className="lb-nav prev" aria-label="Previous photo" onClick={() => go(-1)}>←</button>
    <figure><img key={keys[index]} src={thumb(p.src, 1920, p.width)} srcSet={srcSet(p, [960, 1280, 1920, 2560])} sizes="100vw" alt={p.alt} /><figcaption><b>{p.caption}</b><span>{index + 1} / {n} · <a href={p.source} target="_blank" rel="noreferrer">{p.author} · {p.license} ↗</a></span></figcaption></figure>
    <button className="lb-nav next" aria-label="Next photo" onClick={() => go(1)}>→</button>
  </dialog>;
}
