
# Weapons
Weapons Stats
> Not only it pre-calulates _accuracy_ but _kill_per_shot_ too
## Usage
> You can use the constants in the library for names
```js
const { WEAPONS } = require('csgo.js');
// Example 1
const { awp } = user.weapons();
/*
    awp.hits: 10100,
    awp.shots: 33882,
    awp.kills: 9080,
    awp.accuracy: '0.2981',
    awp.kills_per_shot: '0.2680'
*/

// Example 2
const weapons = user.weapons();
const keys = Object.keys(weapons);
for (const name of keys) {
    const weapon = weapons[name];
    if (weapon.kills > 1000) {
        console.log(`You got +1000 kills with ${WEAPONS[name]}!`)
        /* You got +1000 kills with Sawed-Off! */
    }
}
```
## Response
```js
Weapons:  {
  deagle: {
    hits: 13581,
    shots: 65149,
    kills: 5897,
    accuracy: '0.2085',
    kills_per_shot: '0.0905'
  },
  glock: {
    hits: 12173,
    shots: 79289,
    kills: 3203,
    accuracy: '0.1535',
    kills_per_shot: '0.0404'
  },
  elite: {
    hits: 283,
    shots: 1766,
    kills: 55,
    accuracy: '0.1602',
    kills_per_shot: '0.0311'
  },
  fiveseven: {
    hits: 1320,
    shots: 7322,
    kills: 362,
    accuracy: '0.1803',
    kills_per_shot: '0.0494'
  },
  awp: {
    hits: 10100,
    shots: 33882,
    kills: 9080,
    accuracy: '0.2981',
    kills_per_shot: '0.2680'
  },
  ak47: {
    hits: 110252,
    shots: 477441,
    kills: 25254,
    accuracy: '0.2309',
    kills_per_shot: '0.0529'
  },
  aug: {
    hits: 4723,
    shots: 25849,
    kills: 1271,
    accuracy: '0.1827',
    kills_per_shot: '0.0492'
  },
  famas: {
    hits: 5447,
    shots: 25275,
    kills: 1269,
    accuracy: '0.2155',
    kills_per_shot: '0.0502'
  },
  g3sg1: {
    hits: 344,
    shots: 1922,
    kills: 184,
    accuracy: '0.1790',
    kills_per_shot: '0.0957'
  },
  p90: {
    hits: 3995,
    shots: 25436,
    kills: 694,
    accuracy: '0.1571',
    kills_per_shot: '0.0273'
  },
  mac10: {
    hits: 3283,
    shots: 19694,
    kills: 555,
    accuracy: '0.1667',
    kills_per_shot: '0.0282'
  },
  ump45: {
    hits: 5056,
    shots: 27941,
    kills: 1036,
    accuracy: '0.1810',
    kills_per_shot: '0.0371'
  },
  xm1014: {
    hits: 2340,
    shots: 11232,
    kills: 310,
    accuracy: '0.2083',
    kills_per_shot: '0.0276'
  },
  m249: {
    hits: 260,
    shots: 2856,
    kills: 87,
    accuracy: '0.0910',
    kills_per_shot: '0.0305'
  },
  hkp2000: {
    hits: 14937,
    shots: 87978,
    kills: 4800,
    accuracy: '0.1698',
    kills_per_shot: '0.0546'
  },
  p250: {
    hits: 2761,
    shots: 13582,
    kills: 701,
    accuracy: '0.2033',
    kills_per_shot: '0.0516'
  },
  sg556: {
    hits: 4667,
    shots: 29137,
    kills: 1568,
    accuracy: '0.1602',
    kills_per_shot: '0.0538'
  },
  scar20: {
    hits: 416,
    shots: 2347,
    kills: 210,
    accuracy: '0.1772',
    kills_per_shot: '0.0895'
  },
  ssg08: {
    hits: 2655,
    shots: 12092,
    kills: 1327,
    accuracy: '0.2196',
    kills_per_shot: '0.1097'
  },
  mp7: {
    hits: 8218,
    shots: 40390,
    kills: 1324,
    accuracy: '0.2035',
    kills_per_shot: '0.0328'
  },
  mp9: {
    hits: 5688,
    shots: 30242,
    kills: 1003,
    accuracy: '0.1881',
    kills_per_shot: '0.0332'
  },
  nova: {
    hits: 2582,
    shots: 14707,
    kills: 319,
    accuracy: '0.1756',
    kills_per_shot: '0.0217'
  },
  negev: {
    hits: 682,
    shots: 21868,
    kills: 177,
    accuracy: '0.0312',
    kills_per_shot: '0.0081'
  },
  sawedoff: {
    hits: 705,
    shots: 5016,
    kills: 124,
    accuracy: '0.1406',
    kills_per_shot: '0.0247'
  },
  bizon: {
    hits: 2356,
    shots: 13703,
    kills: 333,
    accuracy: '0.1719',
    kills_per_shot: '0.0243'
  },
  tec9: {
    hits: 626,
    shots: 3558,
    kills: 131,
    accuracy: '0.1759',
    kills_per_shot: '0.0368'
  },
  mag7: {
    hits: 1302,
    shots: 6446,
    kills: 202,
    accuracy: '0.2020',
    kills_per_shot: '0.0313'
  },
  m4a1: {
    hits: 41895,
    shots: 229706,
    kills: 10675,
    accuracy: '0.1824',
    kills_per_shot: '0.0465'
  },
  galilar: {
    hits: 4422,
    shots: 24233,
    kills: 1084,
    accuracy: '0.1825',
    kills_per_shot: '0.0447'
  }
}
```