<p align="center" style="text-align: center;"><img src="https://api.hypixel.net/assets/images/logo.png" width="300" alt="Hypixel logo"/></p>

---

> A light Hypixel Public API client for Node

[Full documentation](https://ethanent.github.io/hypixel-api/) | [GitHub](https://github.com/ethanent/hypixel-api) | [NPM](https://www.npmjs.com/package/hypixel-api)

## Installation

```shell
npm install --save hypixel-api
```

## Usage

### Getting player information

Getting player information is simple.

```javascript
const HypixelAPI = require('hypixel-api')

const client = new HypixelAPI('API-key')

client.getPlayer('name', 'Ethanent').then((player) => {
	console.log(player)
}).catch((err) => {
	console.error('Error! ' + err)
})
```

### Finding guilds

A guild ID can be found from the guild's name, or a member's UUID or name, like so:

```javascript
client.findGuild('memberName', 'Ethanent').then((data) => {
	console.log(data) // {"success":true,"guild":"52e572a684ae6e67043aa084"}
}).catch((err) => {
	console.error('Error! ' + err)
})
```

### Getting guild information

```javascript
client.getGuild('52e572a684ae6e67043aa084').then((guildData) => {
	console.log(guildData)
}).catch((err) => {
	console.error('Error!' + err)
})
```

## Full documentation

See the [full documentation](https://ethanent.github.io/hypixel-api/) for a complete overview of the functionality of hypixel-api!