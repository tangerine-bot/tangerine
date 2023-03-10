
# lastMatch
Last Match Stats
> I don't know if this actually updates with the last match or _what_ steam considers to be a last match, but this was in the response so... there's that.
> 
## Usage
```js
const { last_match_damage, last_match_money_spent, last_match_kills, last_match_deaths } = user.lastMatch()
/* 
    last_match_damage: 3270,
    last_match_money_spent: 70450,
    last_match_kills: 20,
    last_match_deaths: 18,
*/
```
## Response
```js
lastMatch:  {
  last_match_t_wins: 14,
  last_match_ct_wins: 11,
  last_match_wins: 9,
  last_match_max_players: 10,
  last_match_kills: 20,
  last_match_deaths: 18,
  last_match_mvps: 2,
  last_match_favweapon_id: 7,
  last_match_favweapon_shots: 117,
  last_match_favweapon_hits: 28,
  last_match_favweapon_kills: 6,
  last_match_damage: 3270,
  last_match_money_spent: 70450,
  last_match_dominations: 0,
  last_match_revenges: 0,
  last_match_contribution_score: 48,
  last_match_rounds: 25
}
```