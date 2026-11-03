// All videos are official uploads from ICC, Star Sports, cricket.com.au, ECB, ACC and RCB, embedded with YouTube's privacy-enhanced player.
// Ids were checked against YouTube oEmbed on 4 Nov 2026. Availability is controlled by the publisher.
export const videoCats = [['all','All'],['chase','Chase master'],['test','Test greatness'],['world','World stage'],['craft','Craft'],['legacy','Legacy']];
export const videos = [
  { id:'-wkYPHmvQRc', cat:'chase', title:'The shot of the century', sub:'v Rauf · MCG · T20 World Cup 2022', by:'Star Sports', len:'8:51', featured:true },
  { id:'TUxHf0Fsg0A', cat:'chase', title:'82* in Mohali', sub:'India v Australia · T20 World Cup 2016', by:'ICC', len:'2:42' },
  { id:'ZRe4j-UUifM', cat:'chase', title:'Ice-cold in Hobart', sub:'133* off 86 · CB Series 2012', by:'cricket.com.au', len:'6:13' },
  { id:'6f4-0m0AgOA', cat:'chase', title:'Takes India to the final', sub:'Semi-final · T20 World Cup 2014', by:'ICC', len:'1:44' },
  { id:'L1NfeFLdwqY', cat:'chase', title:'122* v Pakistan', sub:'Asia Cup 2023', by:'Asian Cricket Council', len:'1:20' },
  { id:'bgisgR31z6M', cat:'chase', title:'The first T20I hundred', sub:'122* · Asia Cup 2022', by:'Star Sports', len:'0:20' },
  { id:'KrgaIInWB6Y', cat:'chase', title:'Reminiscing the 71st century', sub:'Asia Cup 2022', by:'Star Sports', len:'1:57' },

  { id:'yFlarM35vxA', cat:'test', title:'First Test hundred in England', sub:'Edgbaston · 2018', by:'England & Wales Cricket Board', len:'9:44' },
  { id:'GTPk7_OAhHw', cat:'test', title:'The first Adelaide hundred', sub:'Border-Gavaskar Trophy 2014', by:'cricket.com.au', len:'4:34' },
  { id:'n5oIeroQzpE', cat:'test', title:'Every boundary of 2014/15', sub:'692 runs, four hundreds', by:'cricket.com.au', len:'15:52' },
  { id:'yg767zCD_QU', cat:'test', title:'A lasting Test legacy', sub:'Retirement from Tests · May 2025', by:'Star Sports', len:'0:45' },
  { id:'5FzSwEdB1XI', cat:'test', title:'The journey to 100 Tests', sub:'Follow the Blues', by:'Star Sports', len:'0:45' },

  { id:'YphL3Whh5B0', cat:'world', title:'2011 World Cup final', sub:'India v Sri Lanka · match highlights', by:'ICC', len:'8:28' },
  { id:'mfS1-vq-6Q8', cat:'world', title:'The class of 2008', sub:'ICC Under-19 World Cup', by:'ICC', len:'1:44' },
  { id:'lvtEVsiwbZw', cat:'world', title:'World number one', sub:'India player feature · World Cup 2019', by:'ICC', len:'3:25' },
  { id:'nCTUP7-tLrU', cat:'world', title:'Every boundary of T20 WC 2024', sub:'The road to the title', by:'ICC', len:'3:40' },
  { id:'3yiWqnKl7lQ', cat:'world', title:'The epic montage', sub:'T20 World Cup 2024 final', by:'ICC', len:'4:48' },
  { id:'CDUbkFBHb5A', cat:'world', title:'Player of the Match speech', sub:'T20 World Cup 2024 final', by:'Star Sports', len:'3:10' },

  { id:'r1DkW9D4ET0', cat:'craft', title:'Cover drives in Australia', sub:'A compilation', by:'Star Sports', len:'4:11' },
  { id:'5OGkvFUl3G8', cat:'craft', title:'Best cover drives of the World Cup', sub:'Who played it best?', by:'ICC', len:'3:40' },
  { id:'m8u-18Q0s7I', cat:'craft', title:'The Complete Batsman', sub:'Masterclass with Nasser Hussain', by:'Sky Sports Cricket', len:'8:24' },

  { id:'esJKKejAK-g', cat:'legacy', title:'Our 18-year dream came true', sub:'RCB · IPL 2025', by:'Royal Challengers Bengaluru', len:'2:24' },
  { id:'WZPY3xVedQc', cat:'legacy', title:'Kohli on the IPL 2025 win', sub:'In his own words', by:'Royal Challengers Bengaluru', len:'3:07' },
  { id:'rwHOwbTXVzU', cat:'legacy', title:'Chinnaswamy turns white', sub:'A tribute to the King · IPL 2025', by:'Royal Challengers Bengaluru', len:'3:33' },
  { id:'o_IZG7-ZEiE', cat:'legacy', title:'Cricketer of the Decade', sub:'Sir Garfield Sobers Award', by:'ICC', len:'5:53' },
  { id:'SdVD4-7itDo', cat:'legacy', title:'Cricketer of the Year, 2018', sub:'ICC Awards', by:'ICC', len:'2:05' },
];
export const videoById = Object.fromEntries(videos.map(v=>[v.id,v]));
