// Every figure is a dated milestone, not a live career total. Tests (May 2025) and T20Is (June 2024) are closed careers.
export const recordFormats = [
  ['all', 'Everything'], ['odi', 'ODI'], ['test', 'Test'], ['t20', 'T20 / T20I'], ['ipl', 'IPL'], ['honour', 'Honours'],
];

export const records = [
  // ODI
  { f:'odi', n:'50', l:'ODI hundreds, the first ever', t:'On 15 Nov 2023 in the World Cup semi-final at the Wankhede, he passed Sachin Tendulkar’s 49 to become the first men’s player to 50 ODI centuries.', d:'15 Nov 2023' },
  { f:'odi', n:'51', l:'ODI hundreds by Champions Trophy 2025', t:'The 51st came unbeaten against Pakistan in Dubai on 23 Feb 2025, in a chase he finished himself.', d:'23 Feb 2025' },
  { f:'odi', n:'205', l:'Innings to 10,000 ODI runs', t:'The fastest to the mark in ODI history, reached against West Indies in Visakhapatnam, Oct 2018, beating Tendulkar by 54 innings.', d:'24 Oct 2018' },
  { f:'odi', n:'267', l:'Innings to 13,000 ODI runs', t:'Reached against Pakistan in the 2023 Asia Cup, faster than any batter before him.', d:'Sep 2023' },
  { f:'odi', n:'287', l:'Innings to 14,000 ODI runs', t:'Again the fastest ever, reached against Pakistan in the Champions Trophy, Dubai.', d:'23 Feb 2025' },
  { f:'odi', n:'183', l:'Highest ODI score', t:'Off 148 balls against Pakistan at Mirpur, Asia Cup 2012, in a successful chase of 330.', d:'18 Mar 2012' },
  { f:'odi', n:'133*', l:'Hobart, 36.4 overs', t:'Chasing 321 against Sri Lanka, India had to get there in 40 overs to stay alive. He did it in 36.4, unbeaten on 133 from 86 balls.', d:'5 Feb 2012' },
  { f:'odi', n:'52', l:'Balls to a hundred at Jaipur', t:'Unbeaten 100 from 52 balls against Australia in a chase of 360, then the fastest ODI century by an Indian.', d:'16 Oct 2013' },
  { f:'odi', n:'765', l:'Runs at a single World Cup', t:'The most in any men’s Cricket World Cup, across 11 matches with three hundreds and six fifties. Player of the Tournament.', d:'2023 World Cup' },
  { f:'odi', n:'558', l:'Runs in a six-match ODI series', t:'Against South Africa in 2017/18, an India record for a bilateral series, at an average of 186.', d:'Feb 2018' },
  { f:'odi', n:'35', l:'In the 2011 World Cup final', t:'At 22, he added 83 with Gautam Gambhir to steady India’s chase against Sri Lanka at the Wankhede.', d:'2 Apr 2011' },
  { f:'odi', n:'4×', l:'ICC ODI Cricketer of the Year', t:'2012, 2017, 2018 and 2023. No one has won it more often.', d:'Four times' },

  // Test
  { f:'test', n:'9,230', l:'Test runs', t:'Across 123 Tests at an average of 46.85, closed when he retired from Test cricket on 12 May 2025.', d:'Final tally' },
  { f:'test', n:'30', l:'Test hundreds', t:'With 31 fifties. Seven of the hundreds were double centuries.', d:'Final tally' },
  { f:'test', n:'7', l:'Test double centuries', t:'The most by any Indian batter. Seven times he turned a big hundred into something bigger.', d:'Career' },
  { f:'test', n:'254*', l:'Highest Test score', t:'Unbeaten against South Africa at Pune, India declared on day two after he carried them past 600.', d:'11 Oct 2019' },
  { f:'test', n:'40', l:'Test wins as captain', t:'The most for any India captain, from 68 Tests in charge between 2014 and 2022.', d:'2014–2022' },
  { f:'test', n:'692', l:'Runs, four Tests, Australia', t:'Four hundreds in the 2014/15 Border-Gavaskar Trophy, including twin hundreds at Adelaide.', d:'2014/15' },
  { f:'test', n:'2–1', l:'First Test series win in Australia', t:'Under his captaincy, India won a Test series in Australia for the first time, 2018/19.', d:'Jan 2019' },
  { f:'test', n:'186', l:'Ending a three-year wait', t:'His 28th Test hundred, at Ahmedabad against Australia, March 2023, was the first in the format since Nov 2019.', d:'Mar 2023' },

  // T20
  { f:'t20', n:'4,188', l:'T20I runs', t:'In 125 matches at an average of 48.69, closed when he retired from T20Is after the 2024 final.', d:'Final tally' },
  { f:'t20', n:'122*', l:'First T20I hundred', t:'Off 61 balls against Afghanistan at the 2022 Asia Cup. It ended a 1,020-day wait for an international century.', d:'8 Sep 2022' },
  { f:'t20', n:'3×', l:'Player of the Tournament, T20 World Cup', t:'2014, 2016 and 2022. A record for the tournament.', d:'Three editions' },
  { f:'t20', n:'1,292', l:'T20 World Cup runs', t:'The most in tournament history at the end of the 2024 edition.', d:'To 2024' },
  { f:'t20', n:'82*', l:'MCG, 23 Oct 2022', t:'Off 53 balls against Pakistan, 31 for four became a last-ball win. Two sixes off Haris Rauf turned the chase.', d:'23 Oct 2022' },
  { f:'t20', n:'76', l:'World Cup final, Barbados', t:'The foundation of India’s 176/7 against South Africa. Player of the Match in his final T20I.', d:'29 Jun 2024' },

  // IPL
  { f:'ipl', n:'973', l:'Runs in one IPL season', t:'The most in any IPL season, with four hundreds and seven fifties in 2016.', d:'IPL 2016' },
  { f:'ipl', n:'8,000', l:'First to 8,000 IPL runs', t:'Reached in 2024. The IPL’s leading run-scorer, all of it for one franchise.', d:'IPL 2024' },
  { f:'ipl', n:'741', l:'Orange Cap, 2024', t:'The season’s leading run-scorer again, at a strike rate above 154.', d:'IPL 2024' },
  { f:'ipl', n:'8', l:'IPL hundreds by 2024', t:'The most by any batter in the league’s history at that point.', d:'To 2024' },
  { f:'ipl', n:'18', l:'Seasons, one franchise', t:'Royal Challengers have been his only IPL team since 2008, and in 2025 the 18-year wait for a first title ended.', d:'2008–2025' },
  { f:'ipl', n:'1st', l:'RCB’s IPL title', t:'Royal Challengers Bengaluru won the 2025 IPL on 3 June, in Kohli’s 18th season.', d:'3 Jun 2025' },

  // Honours
  { f:'honour', n:'2×', l:'Sir Garfield Sobers Trophy', t:'ICC Cricketer of the Year in 2017 and 2018. He later won the Cricketer of the Decade award.', d:'2017 · 2018' },
  { f:'honour', n:'3×', l:'Wisden Leading Cricketer', t:'Named the world’s leading cricketer three years running, 2016, 2017 and 2018.', d:'2016–2018' },
  { f:'honour', n:'KR', l:'Rajiv Gandhi Khel Ratna', t:'India’s highest sporting honour, presented at Rashtrapati Bhavan on 25 Sep 2018.', d:'25 Sep 2018' },
  { f:'honour', n:'PS', l:'Padma Shri', t:'Awarded in 2017, after the Arjuna Award in 2013.', d:'2017' },
];

