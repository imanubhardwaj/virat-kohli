import { innings, videoById } from '../data';
import { Footer } from '../components/Chrome.jsx';
import { opp, year, inningsPath } from '../seo.js';

// Pure static page (no client JS): crawlable, fast, shareable.
export default function InningsPage({ i }) {
  const v = i.video && videoById[i.video];
  const others = innings.filter(x => x.id !== i.id);
  return <>
    <header className="site-header solid"><a className="brand" href="/" aria-label="Virat Kohli World home"><span className="brand-mark">VK<span>18</span></span><span className="brand-name">VIRAT KOHLI<small>THE WORLD OF EIGHTEEN</small></span></a><nav className="static-nav" aria-label="Main navigation"><a href="/#innings">All innings</a><a href="/#theater">Watch</a><a href="/#records">Records</a><a href="/#journey">Journey</a></nav></header>
    <main className="ipage"><div className="shell">
      <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Virat Kohli World</a><span>/</span><a href="/#innings">Greatest innings</a><span>/</span><span aria-current="page">{i.score} v {opp(i)}</span></nav>
      <article>
        <p className="eyebrow">{i.competition} · {i.fmt.toUpperCase()}</p>
        <h1>{i.title}</h1>
        <p className="ipage-lead">Virat Kohli {i.score} off {i.balls} balls · {i.opponent} · {i.location} · {i.date}</p>
        <div className="ipage-stat"><strong>{i.score}</strong><span>RUNS<br />{i.balls} BALLS</span><span>{i.result.toUpperCase()}</span></div>
        <p className="ipage-body">{i.description}</p>
        <h2>Match facts</h2>
        <dl className="ipage-facts"><div><dt>Score</dt><dd>{i.score} ({i.balls} balls)</dd></div><div><dt>Match</dt><dd>{i.opponent}</dd></div><div><dt>Venue</dt><dd>{i.location}</dd></div><div><dt>Date</dt><dd>{i.date}</dd></div><div><dt>Competition</dt><dd>{i.competition.replace(' · ', ', ')}</dd></div><div><dt>Result</dt><dd>{i.result}</dd></div></dl>
        {v && <><h2>Watch</h2><div className="embed"><iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`} title={`${v.title}: ${v.sub}`} loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div><p className="note">{v.title}, {v.sub}. Official upload by {v.by}.</p></>}
        {i.source && <p><a className="button gold" href={i.source} target="_blank" rel="noopener noreferrer">{i.linkLabel} <span aria-hidden="true">↗</span></a></p>}
      </article>
      <section aria-labelledby="more-h"><h2 id="more-h">More of Kohli’s greatest innings</h2>
        <ul className="ipage-more">{others.map(x => <li key={x.id}><a href={inningsPath(x)}><b>{x.score}</b><span>v {opp(x)}, {x.location} {year(x)}</span></a></li>)}</ul>
        <p><a className="text-link" href="/">Back to Virat Kohli World ↑</a></p></section>
    </div>
    </main>
    <Footer />
  </>;
}
