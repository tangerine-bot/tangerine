<div align="center">
    <h1>csgo.js</h1>
    <a href="https://www.codefactor.io/repository/github/ifraan/csgo.js"><img src="https://www.codefactor.io/repository/github/ifraan/csgo.js/badge" alt="CodeFactor" /></a>
    <a href="https://www.npmjs.com/package/csgo.js"><img src="https://badgen.net/npm/v/csgo.js?color=blue" alt="NPM-Version"/></a>
    <a href="https://www.npmjs.com/package/csgo.js"><img src="https://badgen.net/npm/dt/csgo.js?color=blue" alt="NPM-Downloads"/></a>
    <a href="https://github.com/iFraan/csgo.js"><img src="https://badgen.net/github/stars/iFraan/csgo.js?color=yellow" alt="Github Stars"/></a>
    <a href="https://github.com/iFraan/csgo.js/issues"><img src="https://badgen.net/github/issues/iFraan/csgo.js?color=green" alt="Issues"/></a>
    <h2>A <b>CSGO Stats</b> library that uses the official Steam API.</h2>
</div>

### Dependencies
``
axios
``

### Instalattion
To install use:
```shell
npm i csgo.js
```

> You'll need a **Steam API Key**, you can get one free [here](https://steamcommunity.com/dev/apikey)


### Available Methods for user
> You must call **API.fetchUser** before using any other method.

| Method      | Description               | More info                         |
| ----------- | ------------------------- | --------------------------------- |
| info()      | User related Info         | [info.md](docs/info.md)           |
| stats()     | General Stats             | [stats.md](docs/stats.md)         |
| maps()      | Map related Stats         | [maps.md](docs/maps.md)           |
| weapons()   | Weapons Stats             | [weapons.md](docs/weapons.md)     |
| lastMatch() | lastMatch Stats           | [lastMatch.md](docs/lastMatch.md) |
| unknown()   | Unknown Stats             | [unknown.md](docs/unknown.md)     |
| raw         | raw data collected so far | [raw.md](docs/raw.md)             |


### Example usage
> For more example usages go into the `docs` folder or click the links in the table above

```js
const { API } = require('csgo.js');
const { STEAM_TOKEN } = require('./keys.json');

const user = await API.fetchUser('iFraan_', STEAM_TOKEN);
const { kills, deaths, time_played, damage_done } = user.stats();
console.log(kills, deaths, time_played, damage_done);
```


## Disclaimer
This project is fully for educational purposes.