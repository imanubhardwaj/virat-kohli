import { track } from './analytics.js';
import { useEffect, useState } from 'react';
import { Preloader, Header, Ticker, Palette, Footer } from './components/Chrome.jsx';
import { Hero, Numbers, Feature } from './components/Hero.jsx';
import Innings from './components/Innings.jsx';
import Theater from './components/Theater.jsx';
import Vault from './components/Vault.jsx';
import { Timeline, Why18, Stats, Gallery } from './components/Story.jsx';
import { FanZone, Closing } from './components/Fan.jsx';
import Donate from './components/Donate.jsx';
import { About, Faq } from './components/Seo.jsx';
import DetailDialog, { Lightbox } from './components/Dialogs.jsx';

const GALLERY = ['sydney', 'captain', 'leaves', 'champions', 'perth', 'khelratna', 'batting', 'trent', 'ahmedabad', 'india', 'stadium', 'early', 'arjuna', 'perth2'];

export default function App() {
  const [detail, setDetail] = useState(null), [lb, setLb] = useState(null), [pal, setPal] = useState(false), [req, setReq] = useState(null);
  useEffect(() => {
    const k = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal(v => !v); } else if (e.key === '/' && !/input|textarea/i.test(document.activeElement?.tagName)) { e.preventDefault(); setPal(true); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, []);
  const openInnings = innings => { track('innings_open', { id: innings.id, score: innings.score }); setDetail({ type: 'innings', innings }); };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Preloader />
    <Header onPalette={() => setPal(true)} />
    <main id="main">
      <Hero /><Ticker /><Numbers /><About />
      <Innings onSelect={openInnings} />
      <Feature onOpen={() => setDetail({ type: 'world-cup' })} />
      <Theater request={req} />
      <Vault />
      <Timeline /><Why18 />
      <Stats />
      <Gallery keys={GALLERY} onOpen={i => { track('photo_open', { index: i }); setLb(i); }} />
      <Faq />
      <FanZone /><Donate /><Closing />
    </main>
    <Footer onCredits={() => setDetail({ type: 'credits' })} />
    <Palette open={pal} onClose={() => setPal(false)} onOpenInnings={openInnings} onPlay={id => setReq({ id, n: Date.now() })} />
    {detail && <DetailDialog key={detail.innings?.id || detail.type} detail={detail} onClose={() => setDetail(null)} />}
    {lb !== null && <Lightbox keys={GALLERY} index={lb} setIndex={setLb} onClose={() => setLb(null)} />}
  </>;
}
