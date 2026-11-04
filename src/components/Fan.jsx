import { track } from '../analytics.js';
import { useState } from 'react';
import { quiz } from '../data';
import { Reveal, useLocal } from '../lib.jsx';

export function Quiz() {
  const [i, setI] = useState(0), [pick, setPick] = useState(null), [score, setScore] = useState(0), [best, setBest] = useLocal('vk-quiz-best', 0);
  const done = i >= quiz.length, q = quiz[i];
  const choose = n => { if (pick !== null) return; setPick(n); track('quiz_answer', { question: i + 1, correct: n === q.c }); if (n === q.c) setScore(s => s + 1); };
  const next = () => { const last = i + 1 >= quiz.length; if (last) { setBest(b => Math.max(b, score)); track('quiz_complete', { score, total: quiz.length }); } setI(i + 1); setPick(null); };
  const reset = () => { track('quiz_restart'); setI(0); setPick(null); setScore(0); };
  const rank = s => s === quiz.length ? 'Number 18 himself. A perfect score.' : s >= 8 ? 'Chase-master. You know your Kohli.' : s >= 5 ? 'Solid opener. A few more overs in the middle.' : 'Debutant. Head to the Record Vault and try again.';
  return <div className="quiz" aria-live="polite">
    {!done ? <>
      <div className="quiz-meta"><span>QUESTION {i + 1} / {quiz.length}</span><span>SCORE {score}</span><span className="qbar"><i style={{ width: `${(i / quiz.length) * 100}%` }} /></span></div>
      <h3>{q.q}</h3>
      <div className="q-opts">{q.a.map((a, n) => <button key={a} disabled={pick !== null} className={pick === null ? '' : n === q.c ? 'right' : n === pick ? 'wrong' : 'dim'} onClick={() => choose(n)}>{a}</button>)}</div>
      {pick !== null && <div className="q-exp"><p><b>{pick === q.c ? 'Out of the park. ' : 'Not quite. '}</b>{q.e}</p><button className="button gold" onClick={next}>{i + 1 >= quiz.length ? 'See my score' : 'Next question'} <span>→</span></button></div>}
    </> : <div className="q-done"><span className="eyebrow">FINAL SCORE</span><b>{score}<small>/{quiz.length}</small></b><p>{rank(score)}</p><p className="best">Your best on this device: {Math.max(best, score)}/{quiz.length}</p><button className="button gold" onClick={reset}>Play again <span>↺</span></button></div>}
  </div>;
}

export function CheerWall() {
  const [cheers, setCheers] = useLocal('vk-cheers', 0), [msgs, setMsgs] = useLocal('vk-msgs', []), [text, setText] = useState(''), [pop, setPop] = useState(0);
  const send = e => { e.preventDefault(); const t = text.trim().slice(0, 140); if (!t) return; setMsgs(m => [{ t, d: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...m].slice(0, 20)); setText(''); track('wall_message_add', { length: t.length }); };
  return <div className="cheer">
    <div className="cheer-btn"><button onClick={() => { track('cheer_click', { total: cheers + 1 }); setCheers(c => c + 1); setPop(p => p + 1); }} aria-label="Cheer for Virat"><span key={pop} className="pop" aria-hidden="true">18</span>CHEER</button><p><b>{cheers.toLocaleString('en-IN')}</b> cheers from you<br /><small>Saved on this device only</small></p></div>
    <form onSubmit={send}><label htmlFor="vk-msg">Your message to number 18</label><textarea id="vk-msg" value={text} maxLength={140} rows={3} onChange={e => setText(e.target.value)} placeholder="The innings I will never forget…" /><div className="cheer-row"><small>{140 - text.length} left</small><button className="button ghost" type="submit">Add to my wall <span>↗</span></button></div></form>
    <ul className="wall">{msgs.length ? msgs.map((m, i) => <li key={i}><p>“{m.t}”</p><small>{m.d} · stored only in this browser</small></li>) : <li className="wall-empty">Your wall is empty. Write the first line.</li>}</ul>
  </div>;
}

export function FanZone() {
  return <section className="fan" id="fan" aria-labelledby="fan-h"><div className="shell">
    <Reveal className="sec-head"><div><p className="eyebrow">07 / THE FAN ZONE</p><h2 id="fan-h">PROVE YOU<br /><em>BELIEVE.</em></h2></div><p>Ten questions. One wall. A cheer for every hundred.<br />Everything stays on your device.</p></Reveal>
    <div className="fan-grid"><Reveal><h3 className="fan-h3">The Kohli quiz</h3><Quiz /></Reveal><Reveal delay={120}><h3 className="fan-h3">The cheer wall</h3><CheerWall /></Reveal></div>
  </div></section>;
}

export function Closing() {
  return <section className="closing"><div className="shell"><span className="eyebrow">THE SCOREBOARD STOPS. THE STORIES STAY.</span><h2>ALWAYS<br /><span>BELIEVE.</span></h2><div className="hero-cta"><a className="button gold" href="#theater">One more innings <span>▶</span></a><a className="button ghost" href="#home">Back to the top <span>↑</span></a></div><span className="closing-n" aria-hidden="true">18</span></div></section>;
}
