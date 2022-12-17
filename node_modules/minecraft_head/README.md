# MinecraftHead [![CI](https://github.com/Basicprogrammer10/MinecraftHead/actions/workflows/main.yml/badge.svg)](https://github.com/Basicprogrammer10/MinecraftHead/actions/workflows/main.yml) [![CodeFactor](https://www.codefactor.io/repository/github/basicprogrammer10/minecrafthead/badge)](https://www.codefactor.io/repository/github/basicprogrammer10/minecrafthead) ![npm](https://img.shields.io/npm/dt/minecraft_head) ![Lines of code](https://img.shields.io/tokei/lines/github/Basicprogrammer10/MinecraftHead)

🕹 Simple NPM package interface to the Mojang API

## Install

```console
$ npm i minecraft_head
```

## Documentation

You can find Documentation [here](https://github.com/Basicprogrammer10/MinecraftHead/wiki)

## Examples

<details open>
<br>

First import the package:

```javascript
const mc = require('minecraft_head'); // Import Module
let player = new mc.player('Sigma76'); // Create a new Player (Can use Name or Uuid)
```

Get UUID or a player:

```javascript
// Will take Player Object or player name as a string
mc.nameToUuid(player)
    .then(data => {
        console.log(data.uuid);
    })
    .catch(console.log);

// Another way if using player Object
player.uuid.then(uuid => {
    console.log(uuid);
});
```

Get Player Name:

```javascript
// Will take player Object or Uuid as a string
mc.uuidToName(player)
    .then(data => {
        console.log(data.name);
    })
    .catch(console.log);

// Another way if using player Object
player.name.then(name => {
    console.log(name);
});
```

Get full name history of a player:

```javascript
// Will take Player Object or Uuid as a string
mc.getNameHistory(player)
    .then(data => {
        console.log(data);
    })
    .catch(console.log);
```

Get a player's name at a specific time:

```javascript
// Will take Player Object or Uuid as a string
// Also takes a Date Object
// Due to API limitations anything before the first name change will be the accounts original name.
mc.getNameAtDate(player, new Date('2017-01-01'))
    .then(name => {
        console.log(name);
    })
    .catch(console.log);
```

Get Player Skin (and cape):

```javascript
// Will take Player Object or Uuid as a string
// Before the Player Object you would need to convert a player name to Uuid yourself
mc.getSkin(player)
    .then(skin => {
        console.log(skin);
    })
    .catch(console.log);
```

Check if server is banned by Mojang:

```javascript
mc.isServerBlocked('playmc.mx')
    .then(data => {
        console.log(data);
    })
    .catch(console.log);
```
