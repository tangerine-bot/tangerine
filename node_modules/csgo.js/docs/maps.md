
# Maps
Maps Stats
> It pre-calculates win-ratio

Due to omissions in the official API this library can't show stats for a couple of maps including but not limited to:
* Mirage
* Overpass
* Cache

Their data simply do not exist in the official api, this can change in the future.
  
## Usage
> You can use the constants in the library for names
```js
const { MAPS } = require('csgo.js');
// Example 1
const { de_dust2 } = user.maps();
/*
    de_dust2.wins: 1129, 
    de_dust2.played: 2361, 
    de_dust2.wr: '0.4782'
*/

// Example 2
const maps = user.maps();
const keys = Object.keys(maps);
for (const name of keys) {
    const map = maps[name];
    if (map.wr > 0.5) {
        console.log(`Wow you are pretty good in ${MAPS[name]} winning ${wr * 100}% of the rounds!`)
        /* Wow you are pretty good in Nuke winning 51.69% of the rounds! */
    }
}
```
## Response
```js
Maps:  {
  cs_assault: { wins: 1, played: 2, wr: '0.5000' },
  cs_italy: { wins: 2, played: 3, wr: '0.6667' },
  cs_office: { wins: 16, played: 28, wr: '0.5714' },
  de_cbble: { wins: 777, played: 1611, wr: '0.4823' },
  de_dust2: { wins: 1129, played: 2361, wr: '0.4782' },
  de_dust: { wins: 100, played: 0, wr: 'Infinity' },
  de_inferno: { wins: 7636, played: 15242, wr: '0.5010' },
  de_nuke: { wins: 383, played: 741, wr: '0.5169' },
  de_train: { wins: 2630, played: 5349, wr: '0.4917' },
  de_house: { wins: 5, played: 0, wr: 'Infinity' },
  de_vertigo: { wins: 524, played: 1033, wr: '0.5073' },
  ar_monastery: { wins: 1, played: 4, wr: '0.2500' },
  ar_shoots: { wins: 8, played: 19, wr: '0.4211' },
  ar_baggage: { wins: 5, played: 9, wr: '0.5556' },
  de_lake: { wins: 71, played: 165, wr: '0.4303' },
  de_stmarc: { wins: 1, played: 1, wr: '1.0000' },
  de_shorttrain: { wins: 2, played: 3, wr: '0.6667' },
  de_safehouse: { wins: 19, played: 35, wr: '0.5429' }
}
```