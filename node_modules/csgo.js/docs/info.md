
# info
General User Info
## Usage
```js
const { steamid, personaname, avatarfull } = user.info()
/* 
    steamid: '76561198137433783',
    personaname: 'fran sin h',
    avatarfull: 'https://avatars.akamai.steamstatic.com/b5ac48b867b9ac1935fc564eaf1b43e8ac326e24_full.jpg'
*/
```
## Response
```js
Info {
  steam2id: 'STEAM_0:1:88584027',
  steam2id_new: 'STEAM_1:1:88584027',
  steam3id: '[U:1:177168055]',
  steam64id: '76561198137433783',
  steamid: '76561198137433783',
  communityvisibilitystate: 3,
  profilestate: 1,
  personaname: 'fran sin h',
  commentpermission: 1,
  profileurl: 'https://steamcommunity.com/id/iFraan_/',
  avatar: 'https://avatars.akamai.steamstatic.com/b5ac48b867b9ac1935fc564eaf1b43e8ac326e24.jpg',
  avatarmedium: 'https://avatars.akamai.steamstatic.com/b5ac48b867b9ac1935fc564eaf1b43e8ac326e24_medium.jpg',
  avatarfull: 'https://avatars.akamai.steamstatic.com/b5ac48b867b9ac1935fc564eaf1b43e8ac326e24_full.jpg',
  avatarhash: 'b5ac48b867b9ac1935fc564eaf1b43e8ac326e24',
  personastate: 0,
  primaryclanid: '103582791462185335',
  timecreated: 1400627484,
  personastateflags: 0,
  loccountrycode: 'AR'
}
```