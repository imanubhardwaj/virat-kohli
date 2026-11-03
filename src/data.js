import photos from './photos.json';
export { photos };
export const sources = {
  mcg: 'https://www.icc-cricket.com/news/the-king-lives-kohli-masterclass-helps-india-beat-pakistan-in-mcg-thriller',
  ipl: 'https://www.iplt20.com/news/article/match-report-m50-rcb-vs-kxip',
  fifty: 'https://www.icc-cricket.com/tournaments/cricketworldcup/news/virat-kohli-breaks-sachin-tendulkars-landmark-record-for-most-odi-centuries',
  final: 'https://www.icc-cricket.com/tournaments/t20cricketworldcup/news/live-india-and-south-africa-face-off-in-t20-world-cup-final',
  farewell: 'https://www.icc-cricket.com/tournaments/t20cricketworldcup/news/it-was-now-or-never-departing-kohli-celebrates-india-s-triumph?appview=true',
  worldCup: 'https://www.icc-cricket.com/news/a-tournament-of-wonders-all-the-records-that-broke-at-the-cricket-world-cup-2023',
  season: 'https://www.iplt20.com/news/article/quick-stats-final-csk-vs-srh',
  beginnings: 'https://www.icc-cricket.com/news/kohli-says-his-life-changed-after-lifting-the-icc-u19-cwc-trophy-in-2008-x7178',
};
export const innings = [
  { id:'melbourne',team:'india',score:'82*',balls:'53',opponent:'India v Pakistan',location:'Melbourne',date:'23 October 2022',competition:'T20 WORLD CUP · 2022',title:'When belief became a six.',subtitle:'The MCG. The chase. The shot.',description:'India were 31 for four. Kohli stayed, rebuilt with Hardik Pandya, and took the chase into its final overs. Two consecutive sixes off Haris Rauf transformed the equation. His unbeaten 82 carried India towards a last-ball, four-wicket win.',result:'India won by 4 wickets',source:sources.mcg,linkLabel:'Watch highlights on ICC' },
  { id:'bengaluru',team:'rcb',score:'113',balls:'50',opponent:'RCB v Kings XI Punjab',location:'Bengaluru',date:'18 May 2016',competition:'IPL · 2016',title:'A season without a ceiling.',subtitle:'Fifteen overs. One extraordinary hundred.',description:'Rain reduced the match to 15 overs a side. Kohli still found time for 113 from 50 balls, with 12 fours and eight sixes. His fourth century of the season powered Royal Challengers Bangalore to 211 for three and an 82-run victory under the DLS method.',result:'RCB won by 82 runs (DLS)',source:sources.ipl,linkLabel:'Read the IPL match report' },
  { id:'mumbai',team:'india',score:'117',balls:'113',opponent:'India v New Zealand',location:'Mumbai',date:'15 November 2023',competition:'CRICKET WORLD CUP · 2023',title:'Fifty. In a league of one.',subtitle:'A landmark at the Wankhede.',description:'On cricket’s biggest stage, Kohli became the first batter to reach 50 men’s ODI centuries. His 117 in the World Cup semi-final took him beyond Sachin Tendulkar’s tally of 49, with Tendulkar watching from the stands.',result:'First batter to 50 men’s ODI centuries',source:sources.fifty,linkLabel:'Explore the moment on ICC' },
  { id:'barbados',team:'india',score:'76',balls:'59',opponent:'India v South Africa',location:'Barbados',date:'29 June 2024',competition:'T20 WORLD CUP FINAL · 2024',title:'One last T20I. Everything left on it.',subtitle:'The innings that anchored a title.',description:'With India three wickets down early, Kohli gave the final its foundation. His 76 helped India reach 176 for seven. The bowlers and fielders finished the job, defending the total by seven runs. Kohli signed off from T20 internationals as Player of the Match and a world champion.',result:'India won by 7 runs',source:sources.final,linkLabel:'Watch highlights on ICC' },
];
export const eras = [
  {id:'delhi',period:'2008',label:'The beginning',place:'Delhi to the world.',body:'Before the packed stadiums and the number 18 shirts, there was a young batter from Delhi. Captaining India to the 2008 Under-19 World Cup title was the breakthrough that opened the next chapter.',note:'Under-19 World Cup winning captain',photo:'early',source:sources.beginnings},
  {id:'india',period:'2011',label:'The blue shirt',place:'A dream becomes a shirt.',body:'Three years after the Under-19 triumph, Kohli was part of India’s 2011 World Cup winning side. His 35 in the final helped steady the chase alongside Gautam Gambhir. The young prospect was now a world champion.',note:'Cricket World Cup winner',photo:'india',source:sources.beginnings},
  {id:'bengaluru',period:'2016',label:'The red chapter',place:'One city. Endless belief.',body:'Bengaluru witnessed a remarkable season: 973 runs and four centuries in the 2016 IPL. For the supporters at the Chinnaswamy, every innings became another reason to believe.',note:'973 runs in one IPL season',photo:'stadium',source:sources.season},
  {id:'legacy',period:'2023—24',label:'The legacy',place:'History, then home.',body:'A 50th ODI century. A 765-run World Cup. Then a defining 76 in the 2024 T20 World Cup final. These chapters belong to different formats, but share the same relentless appetite for the moment.',note:'T20 World Cup winner · 2024',photo:'champions',source:sources.final},
];
export const records = [
  {number:'50',label:'ODI centuries',text:'First batter to reach the milestone in men’s ODIs.',date:'15 NOVEMBER 2023',source:sources.fifty},
  {number:'765',label:'World Cup runs',text:'The most runs in a single men’s Cricket World Cup at the end of the 2023 edition.',date:'2023 TOURNAMENT',source:sources.worldCup},
  {number:'973',label:'One IPL season',text:'Four centuries. A remarkable run through the 2016 season.',date:'2016 IPL',source:sources.season},
];
