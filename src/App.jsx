import { useState } from 'react';
import { Header, Hero, Numbers, WorldCup, Records, Closing, Footer } from './components/Sections.jsx';
import Innings from './components/Innings.jsx';
import Journey from './components/Journey.jsx';
import DetailDialog from './components/DetailDialog.jsx';
export default function App() {
  const [menuOpen,setMenuOpen]=useState(false),[detail,setDetail]=useState(null);
  return <><a className="skip-link" href="#main">Skip to content</a>
    <Header menuOpen={menuOpen} onMenuToggle={()=>setMenuOpen(v=>!v)} onNavigate={()=>setMenuOpen(false)}/>
    <main id="main"><Hero/><Numbers/><Innings onSelect={innings=>setDetail({type:'innings',innings})}/><WorldCup onOpen={()=>setDetail({type:'world-cup'})}/><Journey/><Records/><Closing/></main>
    <Footer onOpenCredits={()=>setDetail({type:'credits'})}/>
    {detail&&<DetailDialog key={detail.innings?.id||detail.type} detail={detail} onClose={()=>setDetail(null)}/>}
  </>;
}
