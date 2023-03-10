
# Stats
General Stats
## Usage
```js
// Example 1
const { kills, deaths, time_played, shots_hit, shots_fired } = user.stats();
/*
    kills: 102573,
    deaths: 66977,
    time_played.display: '1350h 35m',
    accuracy: (shots_hit/shots_fired)
*/
```
## Response
```js
Stats:  {
  kills: 102573,
  deaths: 66977,
  time_played: { seconds: 4862116, hours: 1350, display: '1350h 35m' },
  planted_bombs: 5105,
  defused_bombs: 1015,
  wins: 35379,
  damage_done: 11661959,
  money_earned: 198037550,
  headshot_kills: 43473,
  enemy_weapon_kills: 13859,
  pistol_round_wins: 3386,
  weapons_donated: 10549,
  broken_windows: 45,
  kills_enemy_blinded: 1631,
  kills_knife_fight: 186,
  kills_against_zoomed_sniper: 4755,
  dominations: 655,
  domination_overkills: 669,
  revenges: 179,
  shots_hit: 305987,
  shots_fired: 1340418,
  rounds_played: 70621,
  mvps: 12099,
  matches_won: 1523,
  matches_played: 3989,
  contribution_score: 255733,
  molotov_kills: 220,
  xp_earned_games: 98
}
```