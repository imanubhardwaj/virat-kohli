import { faq } from '../data/faq.js';
import { Reveal } from '../lib.jsx';

export function About() {
  return <section className="about" id="about" aria-labelledby="about-h"><div className="shell about-grid">
    <Reveal><p className="eyebrow">AT A GLANCE</p><h2 id="about-h">Who is Virat Kohli?</h2></Reveal>
    <Reveal delay={100} className="about-copy">
      <p><strong>Virat Kohli</strong> (born 5 November 1988, Delhi) is an Indian cricketer who wears the number 18 for India. He captained India to the 2008 Under-19 World Cup, won the 2011 Cricket World Cup and the 2024 T20 World Cup, and led India’s Test side to 40 wins, the most by any Indian captain.</p>
      <p>He was the first men’s player to score 50 ODI hundreds, holds the record for the most runs in a single IPL season (973 in 2016) and the most in a single men’s World Cup (765 in 2023). He retired from T20 internationals in June 2024 and from Tests in May 2025, and has spent his entire IPL career with Royal Challengers, who won their first title in 2025.</p>
      <p>This fan tribute collects his <a href="#innings">greatest innings</a>, <a href="#theater">official highlight films</a>, <a href="#records">dated records</a> and <a href="#journey">career timeline</a> in one place.</p>
    </Reveal>
  </div></section>;
}

export function Faq() {
  return <section className="section shell faq" id="faq" aria-labelledby="faq-h">
    <Reveal className="sec-head"><div><p className="eyebrow">QUESTIONS FANS ASK</p><h2 id="faq-h">VIRAT KOHLI<br /><em>FAQ.</em></h2></div><p>Quick answers, every figure dated.<br />Sources are listed at the foot of the page.</p></Reveal>
    <div className="faq-list">{faq.map(f => <details key={f.q}><summary><h3>{f.q}</h3><i aria-hidden="true" /></summary><p>{f.a}</p></details>)}</div>
  </section>;
}
