# raw
un-parsed data for those who want it 

## Usage
```js
const { data, player, stats } = user.raw;
/* 
    stats: {...}, // Response of the steam endpoint
    player: {...}, // Response of the playerdb endpoint,
    data: {...}, // Initial parse of data
*/
```
## Response
```js
Raw:  {
  player: {
    code: 'player.found',
    message: 'Successfully found player by given ID.',
    data: { player: [Object] },
    success: true
  },
  stats: {
    playerstats: {
      steamID: '76561198137433783',
      gameName: 'ValveTestApp260',
      stats: [Array],
      achievements: [Array]
    }
  },
  data: [
    { key: 'kills', name: 'Kills', category: 'Stats', value: 102573 },
    { key: 'deaths', name: 'Deaths', category: 'Stats', value: 66977 },
    { key: 'wins', name: 'Wins', category: 'Stats', value: 35379 },
    {
      key: 'time_played',
      name: 'Time played',
      category: 'Stats',
      value: [Object]
    },
    {
      key: 'planted_bombs',
      name: 'Bombs Planted',
      category: 'Stats',
      value: 5105
    },
    {
      key: 'defused_bombs',
      name: 'Bombs Defused',
      category: 'Stats',
      value: 1015
    },
    ... 140 more items
  ]
}
```