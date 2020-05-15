//Designed by the Tangerine team, https://discord.gg/uwcgjYw or arnav74#0884
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./auth.json");
const ms = require("ms");
const figlet = require('figlet');
const randomWord = require('random-word-by-length');
const {
  getEmoji,
  getAllEmoji,
  getThemes
} = require('random-text-meme');
const {
  r6username,
  r6password
} = require('./keys/r6.json');
const R6API = require('r6api.js');
const r6api = new R6API(r6username, r6password);
const moment = require("moment-timezone");
const clock = require("node-emoji-clock");
const hypixeljs = require('hypixeljs');
const mojangjs = require('mojangjs');
const fetch = require('node-fetch');
const dogeify = require('dogeify-js');
const uwufy = require('uwufy');
const Chance = require('chance');
const chance = new Chance();
const {
  dblusername
} = require('./keys/dbl.json');
const DBL = require("dblapi.js");
const dbl = new DBL(dblusername, client);
const {
  hypixelusername
} = require('./keys/hypixel.json')
hypixeljs.login(hypixelusername);
const wikipics = require('wikipics-api');
const turl = require('turl');
const dogFacts = require('dog-facts');
const pandaFacts = require('panda-facts');
const {
  csgoKey
} = require('./keys/csgo.json')
const csgoStats = require('csgostatsnode');
const csStats = new csgoStats({
  "apikey": `${csgoKey}`
});
const csgoStatsFetch = require('csgo-stats');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(`${csgoKey}`);
const {
  apexKey
} = require('./keys/apex.json')
const apex = require('apexlegendsjs')('9cfe50a1-33ca-42b7-9929-22bc6e0cc03b')
const {
  search
} = require('gdprofiles');
const {
  admin1,
  admin2
} = require('./keys/admin.json')

const tangerineIcon = 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png';
const tangerineVersion = ("0.1.17");
const lastUpdated = ("05/14/2020");

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

client.on("ready", () => {
  console.log(`Tangerine is online, with ${thousands_separators(client.users.size)} users, in ${thousands_separators(client.channels.size)} channels of ${thousands_separators(client.guilds.size)} servers.`);
  client.user.setActivity(`memes. 🍊 ∼help. Serving ${thousands_separators(client.users.size)} users. tangerinebot.com`, {
    type: 'WATCHING' //PLAYING, LISTENING, WATCHING
  });
  client.user.setStatus('online'); //online, idle, invisible, dnd
});

client.on("ready", () => {
  const embed = new Discord.RichEmbed()
    .setTitle(`You have been identified as: Admin 1`)
    .setColor([255, 255, 255])
  client.users.get(`${admin1}`).send({
    embed
  });
});

client.on("ready", () => {
  const embed = new Discord.RichEmbed()
    .setTitle(`You have been identified as: Admin 2`)
    .setColor([255, 255, 255])
  client.users.get(`${admin2}`).send({
    embed
  });
});

client.on('ready', () => {
  var readyAt = client.readyAt;
  for (var i = 0; i < `${client.readyAt}`.length; i++) {
    if (`${client.readyAt}`.charAt(i) === "G") {
      readyAt = `${client.readyAt}`.substring(0, i)
    }
  }
  const embed = new Discord.RichEmbed()
    .setTitle(`Tangerine \`${tangerineVersion}\` is now online  ✅`)
    .setColor([253, 144, 43])
    .setDescription(`Last updated \`${lastUpdated}\`.`)
    .addField("Users:", `\`${thousands_separators(client.users.size)}\``, true)
    .addField("Channels:", `\`${thousands_separators(client.channels.size)}\``, true)
    .addField("Servers:", `\`${thousands_separators(client.guilds.size)}\``, true)
    .addField("Ready at:", `\`${readyAt}\``)
  client.users.get(`${admin1}`).send({
    embed
  });
  client.users.get(`${admin2}`).send({
    embed
  });
});

client.on('ready', () => {
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 1800000);
});

dbl.on('posted', () => {
  console.log('Server count posted!  ✅');
  const embed = new Discord.RichEmbed()
    .setTitle(`DBL Server Status`)
    .setColor([0, 255, 0])
    .setDescription(`Server count updated to \`${thousands_separators(client.guilds.size)}\``)
  client.users.get(`${admin1}`).send({
    embed
  });
  client.users.get(`${admin2}`).send({
    embed
  });
})

dbl.on('error', e => {
  console.log(`DBL Error! ${e}`)
  const embed = new Discord.RichEmbed()
    .setTitle(`DBL Server Status`)
    .setColor([250, 0, 0])
    .setDescription(`Server count update failed.   ❌`)
    .addField(`Reason:`, `\`${e}\``, true)
  client.users.get(`${admin1}`).send({
    embed
  });
  client.users.get(`${admin2}`).send({
    embed
  });
})

client.on("guildCreate", guild => {
  let channel = client.channels.get(
    guild.channels
    .filter(
      c =>
      c.permissionsFor(client.user).has("SEND_MESSAGES") &&
      c.type === "text"
    )
    .map(r => r.id)[0]
  );
});

client.on("guildCreate", guild => {
  console.log(`Added to: ${guild.name} (id: ${guild.id}). This guild has ${thousands_separators(guild.memberCount)} members!`);
  const embed = new Discord.RichEmbed()
    .setTitle(`Added to: ${guild.name} (id: ${guild.id})  ✅`)
    .setColor([0, 255, 0])
    .setDescription(`This guild has ${thousands_separators(guild.memberCount)} members!`)
  client.users.get(`${admin1}`).send({
    embed
  });
  client.users.get(`${admin2}`).send({
    embed
  });
});

client.on("guildDelete", guild => {
  console.log(`Removed from: ${guild.name} (id: ${guild.id})`);
  const embed = new Discord.RichEmbed()
    .setTitle(`Removed from: ${guild.name} (id: ${guild.id})   ❌`)
    .setColor([250, 0, 0])
  client.users.get(`${admin1}`).send({
    embed
  });
  client.users.get(`${admin2}`).send({
    embed
  });
});

const prefix = '~';
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.on('message', message => {
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'prefix') {
    message.reply(`you can either ping me or use \`${prefix}\` as my prefix.`);
  }
  if (command === '') {
    message.reply(`you can either ping me or use \`${prefix}\` as my prefix.`);
  }
});

const tangerine = '🍊';
client.on('message', async message => {
  const prefixRegexT = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(tangerine)})\\s*`);
  if (!prefixRegexT.test(message.content)) return;
  const [, matchedPrefixT] = message.content.match(prefixRegexT);
  const args = message.content.slice(matchedPrefixT.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === '') {
    message.react('🍊');
  }
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  if (message.author.bot) return; //botception prevention
  if (message.content.indexOf(config.prefix) !== 0) return; //ignore messages without prefix
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //separates command and arguments (first word from all other words)
  const command = args.shift().toLowerCase();
  if (message.channel.type === "dm") {
    return message.reply("Sorry, Tangerine does not work in DMs.");
  }
  //////////////////////////////////////////////////////
  if (command === "ping") { //asynchronous guild ping
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Network Latency: ${m.createdTimestamp - message.createdTimestamp}ms. API Latency: ${Math.round(client.ping)}ms`);
  }
  //////////////////////////////////////////////////////
  if (command === "help") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's list of commands")
      .setColor([253, 144, 43])
      .setDescription(`For more help use ~support or ~about, and join the support server!`)
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addBlankField(false)
      .addField("`help`", "the page you are on right now!", true)
      .addField("`general`", "prints out all of the general commands", true)
      .addField("`utility`", "prints out all of the utility commands", true)
      .addField("`fun`", "prints out all of the fun commands", true)
      .addField("`games`", "prints out all of the game tracking commands, includes MC and R6", true)
      .addField("`random`", "prints out all of the random generation commands", true)
      .addField("`advanced`", "prints out all of the administration commands that require special permissions", true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "general") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's list of general commands")
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("`help`", "prints out all of the main Tangerine commands", true)
      .addField("`about`", "prints the about and developer contact page", true)
      .addField("`status`", "prints a shorter form of the about page, with uptime", true)
      .addField("`ping`", "prints the bot's network latency", true)
      .addField("`support`", "sends a message to the bot developers", true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "utility") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's list of utility commands")
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("`nickname` <string(nickname)>", "changes your nickname to the specified string", true)
      .addField("`nickreset`", "resets your nickname", true)
      .addField("`time` <none | string(est|ct|mt|pt)>", "prints the current time", true)
      .addField("`timeEU` <none | string(wet|cet|eet)>", "prints the current time", true)
      .addField("`timeAS` <none | string(mst|sst|ist|bst|mt|it|cst|kst|jst)>", "prints the current time", true)

      .addField("`shorten` <string(URL)>", "shortens the given URL using tinyurl", true)
      .addField("`shout` <string(message)>", "converts your message into regional indicator characters", true)
      .addField("`emojis`", "lists all of the custom emojis on the server", true)

    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "fun") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's list of fun commands")
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("`meme`", "prints a random meme from r/funny", true)
      .addField("`doge` <string(message)>", "doge-ifies your message", true)
      .addField("`uwu` <string(message)>", "uwu-ifies your message", true)
      .addField("`ascii` <string(message)>", "prints your message in ASCII art", true)
      .addField("`useless`", "this is pretty uselss", true)
      .addField("`wikipic`", "displays Wikipedia's picture of the day", true)

    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "games") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's list of game trackers")
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("🌈 ", "**Rainbow Six Siege**")
      .addField("`r6` <username, pc|psn>", "Fetches a player's R6 PVP stats", true)
      .addField("`r6pve` <username, pc|psn>", "Fetches a player's R6 PVE stats", true)
      .addField("`op`", "Prints a random 5v5 operator lineup", true)
      .addField("`map` <rank|new|qm|none>", "Prints a random map in the specified pool", true)
      .addBlankField(false)
      .addField("⛏️ ", "**Minecraft**")
      .addField("`head` <username>", "Fetches and prints the user's head", true)
      .addField("`names` <username>", "Fetches and prints all of the user's names", true)
      .addField("`skin` <username>", "Fetches and prints the user's skin", true)
      .addField("`rawskin` <username>", "Fetches and prints the user's raw skin", true)
      .addBlankField(false)
      .addField("💥", "**Other**")
      .addField("`csgo` <steam vanity username>", "CS:GO stats", true)
      .addField("`apex` <username, pc|psn|xbox>", "APEX Legends stats", true)
      .addField("`gd` <username>", "Geometry Dash stats", true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "random") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's list of random commands")
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("`asciiart`", "prints a random ascii emoji", true)
      .addField("`animal`", "prints a random animal name", true)
      .addField("`color`", "prints and displays a random color", true)
      .addField("`coin`", "flips a coin", true)
      .addField("`word`", "prints a random English word", true)
      .addField("`dice` <none, int(sides of dice)>", "rolls a dice with specified number of sides", true)
      .addField("`rpg` <string(roll sequence, e.g. 5d20)>", "rolls die with specified number of sides", true)
      .addField("`guess` <int(max number), int(guess)>", "checks if picked number matches guessed number", true)
      .addField("`integer`", "prints a random integer", true)
      .addField("`prime`", "prints a prime number", true)
      .addField("`dog`", "prints a random dog fact", true)
      .addField("`panda`", "prints a random panda fact", true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "advanced") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Tangerine's administration commands")
      .setColor([253, 144, 43])
      .setDescription("You must have special permissions to run these commands. View the master list here: bit.ly/tangerineAdmin")
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("`say` <string(message)>", "prints a repeat of the message. Requires MANAGE_MESSAGES.")
      .addField("`kick` <@user, string(reason)>", "kicks the specified user. Requires KICK_MEMBERS.")
      .addField("`ban` <@user, string(reason)>", "bans the specified user. Requires BAN_MEMBERS.")
      .addField("`purge` <int(messages)>", "purges the specified amount of messages from the channel. Requires MANAGE_MESSAGES.")
      .addField("`mute` <@user, int(seconds)>", "mutes the specified user for the specified amount of time. Requires MANAGE_ROLES.")
      .addField("`someone`", "pings a random user in the server. Requires ADMINISTRATOR.")
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "about") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle(`Tangerine ${tangerineVersion}`)
      .setColor([253, 144, 43])
      .setDescription(`Last updated ${lastUpdated}.`)
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addBlankField(true)
      .addField("The Tangerine Team", "arnav74#0884 and EpicN#5997")
      .addField("Official Website", "[Tangerine Website](https://tangerinebot.com)")
      .addField("Support Server", "[Tangerine Support](https://discord.gg/uwcgjYw)")
      .addField("Invite Link", "[Tangerine Bot](https://discordapp.com/api/oauth2/authorize?client_id=701793346225700934&permissions=470281334&scope=bot)")
      .setImage('https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine.gif')
      .addField("Users using:", `${thousands_separators(client.users.size)} users`, true)
      .addField("Channels channeling:", `${thousands_separators(client.channels.size)} channels`, true)
      .addField("Servers serving:", `${thousands_separators(client.guilds.size)} servers`, true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "status") {
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = thousands_separators((totalSeconds % 60).toPrecision(3));
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    const embed = new Discord.RichEmbed()
      .setTitle(`Tangerine ${tangerineVersion}`)
      .setColor([253, 144, 43])
      .setDescription(`Last updated ${lastUpdated}.`)
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("Users using:", `${thousands_separators(client.users.size)} users`, true)
      .addField("Channels channeling:", `${thousands_separators(client.channels.size)} channels`, true)
      .addField("Servers serving:", `${thousands_separators(client.guilds.size)} servers`, true)
      .addField("Uptime:", `${uptime}`)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////  
  if (command === "client") {
    console.log(client);
  }
  //////////////////////////////////////////////////////
  if (command === "say") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("Sorry, you don't have permissions to use this!");
    if (!message.member.hasPermission("MENTION_EVERYONE"))
      return message.reply("Sorry, you don't have permissions to use this!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    if (!sayMessage) {
      message.reply("You must input a message.")
    } else message.channel.send(sayMessage);
  }
  //////////////////////////////////////////////////////
  if (command === "kick") {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }
  //////////////////////////////////////////////////////
  if (command === "ban") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please mention a valid member of this server");
    if (!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  //////////////////////////////////////////////////////
  if (command === "purge") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("Sorry, you don't have permissions to use this!");
    let deleteCountPrimary = parseInt(args[0], 10);
    let deleteCount = deleteCountPrimary + 1;
    if (!deleteCount || deleteCount < 2 || deleteCount > 51)
      return message.reply("Please provide a number between 1 and 50 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({ //deletes
      limit: deleteCount
    });
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  //////////////////////////////////////////////////////
  if (command === "mute") {
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("Sorry, you don't have permissions to use this!");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Couldn't find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute this user! Perhaps check permissions?");
    let muterole = message.guild.roles.find(muterole => muterole.name === "muted");
    //start of create role
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if (!mutetime) return message.reply("You didn't specify a time!");
    await (tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
    setTimeout(function () {
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
  }
  //////////////////////////////////////////////////////
  if (command === "dice") {
    let diceSides = args.join(" ");
    if (args.length === 0 || args.length === 1) {
      if (!diceSides) {
        diceSides = 6;
        let value = Math.round(Math.random() * diceSides)
        return message.reply(`Defaulting to a six-side dice. You rolled: ${value}`)
      } else {
        let value = Math.round(Math.random() * diceSides)
        return message.reply(`Number of sides: ${diceSides}. You rolled: ${value}`)
      }
    } else {
      return message.reply(`You must provide either no inputs or 1 number.`)
    }
  }
  //////////////////////////////////////////////////////
  if (command === "guess") {
    let input = args.join(" ");
    let res = input.split(" ");
    let total = res[0];
    let guess = res[1];
    if (args.length !== 2) {
      return message.reply(`You must provide 2 numbers.`)
    } else {
      let value = Math.round(Math.random() * total)
      if (value == guess) {
        return message.reply(`My number: ${value}. You guessed: ${guess}. GG`)
      } else {
        return message.reply(`My number: ${value}. You guessed: ${guess}. Sorry!`)
      }
    }
  }
  //////////////////////////////////////////////////////
  if (command === "ascii") {
    let input = args.join(" ");
    if (!input) {
      message.reply(`You must provide a message.`)
    } else {
      figlet(input, function (err, data) {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
        }
        message.reply(`\`\`\`${data}\`\`\``)
      });
    }
  }
  //////////////////////////////////////////////////////
  if (command === "nickname") {
    if (args.length === 0) {
      return message.reply('You must provide a nickname.');
    }
    if (!message.member.hasPermission('CHANGE_NICKNAME'))
      return message.reply("Sorry, you don't have permissions to use this!");
    let input = args.join(" ");
    if (!input) {
      message.reply(`Please enter a string.`)
    } else {
      message.member.setNickname(input);
      return message.reply(`Your nickname is now set to ${input}.`)
    }
  }
  //////////////////////////////////////////////////////
  if (command === "nickreset") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    if (!message.member.hasPermission('CHANGE_NICKNAME'))
      return message.reply("Sorry, you don't have permissions to use this!");
    else {
      message.member.setNickname(message.author.username);
      return message.reply(`Your nickname is now set to ${message.author.username}.`)
    }
  }
  //////////////////////////////////////////////////////
  if (command === "word") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    message.reply(randomWord());
  }
  //////////////////////////////////////////////////////
  if (command === "asciiart") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    message.reply(`\`${getEmoji()}\``);
  }
  //////////////////////////////////////////////////////
  if (command === "someone") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.reply("Sorry, you don't have permissions to use this!");
    message.reply(`the selected person is: ${message.guild.members.random()}`);
  }
  //////////////////////////////////////////////////////
  if (command === "useless") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    message.react('❓');
    const filter = (reaction, user) => {
      return ['❓'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
      })
      .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '❓') {
          message.delete().catch(O_o => {});
        } else {}
      })
  }
  //////////////////////////////////////////////////////
  if (command === "r6") {
    let input = args.join(" ");
    let res = input.split(" ");
    if (args.length != 2) {
      return message.reply('Please provide the username and platform of the player.')
    }
    let username = res[0];
    let platform = res[1];
    if (platform === "pc" || platform === "PC" || platform == "Pc") {
      platform = "uplay";
    }
    // if (platform === "xb1" || platform === "XB1" || platform === "Xb1" || platform === "xbox" || platform === "XBOX" || platform === "Xbox" || platform === "xbl" || platform === "XBL") {
    //   platform = "xbl";
    //   console.log(typeof username);
    //   console.log("old username: " + username);
    //   username = username.replace("_", " ");
    //   console.log("new username: " + username);
    // }
    const id = await r6api.getId(platform, username).then(el => el[0].userId);
    const stats = await r6api.getStats(platform, id).then(el => el[0]);
    let kdr = (stats.pvp.general.kills / stats.pvp.general.deaths).toPrecision(3);
    let wlr = (stats.pvp.general.wins / stats.pvp.general.losses).toPrecision(3);
    let hsr = ((stats.pvp.general.headshots / stats.pvp.general.kills) * 100).toPrecision(4);
    let totalassists = thousands_separators(stats.pvp.general.assists + stats.pvp.general.dbnoAssists);
    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Rainbow Six Siege Stats`)
      .setDescription("For PVE stats, use ∼r6pve")
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("‏‎🔫‎", "**PVP**")
      .addField("Wins:", `${thousands_separators(stats.pvp.general.wins)}`, true)
      .addField("Losses:", `${thousands_separators(stats.pvp.general.losses)}`, true)
      .addField("WLR:", `${wlr}`, true)
      .addField("Kills:", `${thousands_separators(stats.pvp.general.kills)}`, true)
      .addField("Deaths:", `${thousands_separators(stats.pvp.general.deaths)}`, true)
      .addField("KDR:", `${kdr}`, true)
      .addField("Matches:", `${thousands_separators(stats.pvp.general.matches)}`, true)
      .addField("Assists:", `${totalassists}`, true)
      .addField("Revives:", `${thousands_separators(stats.pvp.general.revives)}`, true)
      .addField("Headshots:", `${thousands_separators(stats.pvp.general.headshots)}`, true)
      .addField("Headshot%:", `${hsr}%`, true)
      .addField("Melees:", `${thousands_separators(stats.pvp.general.meleeKills)}`, true)
      .addField("Wallbangs:", `${thousands_separators(stats.pvp.general.penetrationKills)}`, true)
      .addField("Blind Kills:", `${thousands_separators(stats.pvp.general.blindKills)}`, true)
      .addField("DBNOs:", `${thousands_separators(stats.pvp.general.dbno)}`, true)
      .addField("Gadgets Broken:", `${thousands_separators(stats.pvp.general.gadgetsDestroyed)}`, true)
      .addField("Barricades:", `${thousands_separators(stats.pvp.general.barricadesDeployed)}`, true)
      .addField("Suicides:", `${thousands_separators(stats.pvp.general.suicides)}`, true)
      .addField("Playtime:", `${((stats.pvp.general.playtime)/60/60).toPrecision(3)} Hours`, true)
    return message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "r6pve") {
    let input = args.join(" ");
    let res = input.split(" ");
    if (args.length != 2) {
      return message.reply('Please provide the username and platform of the player.')
    }
    let username = res[0];
    let platform = res[1];
    if (platform === "pc" || platform === "PC" || platform == "Pc") {
      platform = "uplay";
    }
    const id = await r6api.getId(platform, username).then(el => el[0].userId);
    const stats = await r6api.getStats(platform, id).then(el => el[0]);
    let pvekdr = (stats.pve.general.kills / stats.pve.general.deaths).toPrecision(3);
    let pvewlr = (stats.pve.general.wins / stats.pve.general.losses).toPrecision(3);
    let pvehsr = ((stats.pve.general.headshots / stats.pve.general.kills) * 100).toPrecision(4);
    let pvetotalassists = thousands_separators(stats.pvp.general.assists + stats.pvp.general.dbnoAssists);
    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Rainbow Six Siege PVE Stats`)
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("‏‎🔪‎", "**PVE**")
      .addField("Wins:", `${thousands_separators(stats.pve.general.wins)}`, true)
      .addField("Losses:", `${thousands_separators(stats.pve.general.losses)}`, true)
      .addField("WLR:", `${pvewlr}`, true)
      .addField("Kills:", `${thousands_separators(stats.pve.general.kills)}`, true)
      .addField("Deaths:", `${thousands_separators(stats.pve.general.deaths)}`, true)
      .addField("KDR:", `${pvekdr}`, true)
      .addField("Matches:", `${thousands_separators(stats.pve.general.matches)}`, true)
      .addField("Assists:", `${pvetotalassists}`, true)
      .addField("Revives:", `${thousands_separators(stats.pve.general.revives)}`, true)
      .addField("Headshots:", `${thousands_separators(stats.pve.general.headshots)}`, true)
      .addField("Headshot %:", `${pvehsr}%`, true)
      .addField("Melee Kills:", `${thousands_separators(stats.pve.general.meleeKills)}`, true)
      .addField("Wallbangs:", `${thousands_separators(stats.pve.general.penetrationKills)}`, true)
      .addField("Blind Kills:", `${thousands_separators(stats.pve.general.blindKills)}`, true)
      .addField("DBNOs:", `${thousands_separators(stats.pve.general.dbno)}`, true)
      .addField("Gadgets Broken:", `${thousands_separators(stats.pve.general.gadgetsDestroyed)}`, true)
      .addField("Barricades:", `${thousands_separators(stats.pve.general.barricadesDeployed)}`, true)
      .addField("Suicides:", `${thousands_separators(stats.pve.general.suicides)}`, true)
      .addField("Playtime:", `${((stats.pve.general.playtime)/60/60).toPrecision(3)} Hours`, true)
    return message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "time") {
    var et = moment().tz("America/New_York");
    var ct = moment().tz("America/Chicago");
    var mdt = moment().tz("America/Denver");
    var pt = moment().tz("America/Los_Angeles");
    var etF = clock.timeToEmoji(et) + " \`" + et.format("HH:mm ") + "Eastern Daylight Time\`\n"
    var ctF = clock.timeToEmoji(ct) + " \`" + ct.format("HH:mm ") + "Central Daylight Time\`\n"
    var mdtF = clock.timeToEmoji(mdt) + " \`" + mdt.format("HH:mm ") + "Mountain Daylight Time\`\n"
    var ptF = clock.timeToEmoji(pt) + " \`" + pt.format("HH:mm ") + "Pacific Daylight Time\`"
    if (args.length === 0) {
      const embed = new Discord.RichEmbed()
        .setTitle(`All American times`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Eastern:", `${etF}`)
        .addField("Central:", `${ctF}`)
        .addField("Mountain:", `${mdtF}`)
        .addField("Pacific:", `${ptF}`)
      message.channel.send({
        embed
      });
    } else if (args == "EST" || args == "est" || args == "ET" || args == "et") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Eastern Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${etF}`)
      message.channel.send({
        embed
      });
    } else if (args == "CT" || args == "ct" || args == "CST" || args == "cst") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Central Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${ctF}`)
      message.channel.send({
        embed
      });
    } else if (args == "MDT" || args == "mdt" || args == "MST" || args == "mst" || args == "MT" || args == "mt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Mountain Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${mdtF}`)
      message.channel.send({
        embed
      });
    } else if (args == "PST" || args == "pst" || args == "PT" || args == "pt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Pacific Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${ptF}`)
      message.channel.send({
        embed
      });
    } else {
      return message.reply("Please use one of the American time zones: \`EST, CT, MST, PST\`")
    }
  }
  //////////////////////////////////////////////////////
  if (command === "timeeu") {
    var wet = moment().tz("Europe/Lisbon");
    var cet = moment().tz("Europe/Paris");
    var eet = moment().tz("Europe/Athens");
    var wetF = clock.timeToEmoji(wet) + " \`" + wet.format("HH:mm ") + "Western European Time\`\n"
    var cetF = clock.timeToEmoji(cet) + " \`" + cet.format("HH:mm ") + "Central European Time\`\n"
    var eetF = clock.timeToEmoji(eet) + " \`" + eet.format("HH:mm ") + "Eastern European Time\`\n"
    if (args.length === 0) {
      const embed = new Discord.RichEmbed()
        .setTitle(`All European times`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Western:", `${wetF}`)
        .addField("Central:", `${cetF}`)
        .addField("Eastern:", `${eetF}`)
      message.channel.send({
        embed
      });
    } else if (args == "WET" || args == "wet" || args == "WT" || args == "wt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Western Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${wetF}`)
      message.channel.send({
        embed
      });
    } else if (args == "CET" || args == "cet" || args == "CT" || args == "ct") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Central Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${cetF}`)
      message.channel.send({
        embed
      });
    } else if (args == "EET" || args == "eet" || args == "ET" || args == "et") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Eastern Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${eetF}`)
      message.channel.send({
        embed
      });
    } else {
      return message.reply("Please use one of the European time zones: \`CET, WET, EET\`")
    }
  }
  //////////////////////////////////////////////////////
  if (command === "timeas") {
    var mst = moment().tz("Europe/Moscow"); // +3 Moscow Standard Time
    var sst = moment().tz("Europe/Samara"); // +4 Samara Standard Time
    var ist = moment().tz("Asia/Calcutta"); // +5:30 India Standard Time
    var bst = moment().tz("Asia/Dhaka"); // +6 Bangladesh
    var mt = moment().tz("Asia/Yangon"); // +6:30 Myanmar
    var it = moment().tz("Asia/Vientiane"); // +7 Indochina (Vietnam)
    var cst = moment().tz("Asia/Shanghai"); // +8 China
    var kst = moment().tz("Asia/Seoul"); // +9 Korea/Japan (JST)
    var mstF = clock.timeToEmoji(mst) + " \`" + mst.format("HH:mm ") + "Moscow Standard Time\`\n"
    var sstF = clock.timeToEmoji(sst) + " \`" + sst.format("HH:mm ") + "Samara Standard Time\`\n"
    var istF = clock.timeToEmoji(ist) + " \`" + ist.format("HH:mm ") + "India Standard Time\`\n"
    var bstF = clock.timeToEmoji(bst) + " \`" + bst.format("HH:mm ") + "Bangladesh Time\`\n"
    var mtF = clock.timeToEmoji(mt) + " \`" + mt.format("HH:mm ") + "Myanmar Time\`\n"
    var itF = clock.timeToEmoji(it) + " \`" + it.format("HH:mm ") + "Indochina Time\`\n"
    var cstF = clock.timeToEmoji(cst) + " \`" + cst.format("HH:mm ") + "China Standard Time\`\n"
    var kstF = clock.timeToEmoji(kst) + " \`" + kst.format("HH:mm ") + "Japan/Korea Standard Time\`\n"
    if (args.length === 0) {
      const embed = new Discord.RichEmbed()
        .setTitle(`All European times`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Moscow (+3):", `${mstF}`)
        .addField("Samara (+4):", `${sstF}`)
        .addField("India (+5:30):", `${istF}`)
        .addField("Bangladesh (+6):", `${bstF}`)
        .addField("Myanmar (+6:30):", `${mtF}`)
        .addField("Indochina (+7):", `${itF}`)
        .addField("China (+8):", `${cstF}`)
        .addField("Japan/Korea (+9):", `${kstF}`)
      message.channel.send({
        embed
      });
    } else if (args == "MST" || args == "mst") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Moscow Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${mstF}`)
      message.channel.send({
        embed
      });
    } else if (args == "SST" || args == "sst") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Samara Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${sstF}`)
      message.channel.send({
        embed
      });
    } else if (args == "IST" || args == "ist") {
      const embed = new Discord.RichEmbed()
        .setTitle(`India Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${istF}`)
      message.channel.send({
        embed
      });
    } else if (args == "BST" || args == "bst" || args == "BT" || args == "bt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Bangladesh Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${bstF}`)
      message.channel.send({
        embed
      });
    } else if (args == "MT" || args == "mt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Myanmar Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${mtF}`)
      message.channel.send({
        embed
      });
    } else if (args == "IT" || args == "it") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Indochina Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${itF}`)
      message.channel.send({
        embed
      });
    } else if (args == "CST" || args == "cst" || args == "CT" || args == "ct") {
      const embed = new Discord.RichEmbed()
        .setTitle(`China Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${cstF}`)
      message.channel.send({
        embed
      });
    } else if (args == "KST" || args == "kst" || args == "JST" || args == "jst") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Korea/Japan Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${kstF}`)
      message.channel.send({
        embed
      });
    } else if (args == "MST" || args == "mst") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Moscow Standard Time`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("It is currently:", `${mstF}`)
      message.channel.send({
        embed
      });
    } else {
      return message.reply("Please use one of the Asian time zones: \`MST, SST, IST, BST, MT, IT, CST, KST/JST\`")
    }
  }
  //////////////////////////////////////////////////////
  if (command === "skin") {
    let input = args.join(" ");
    let res = input.split(" ");
    if (args.length !== 1) {
      return message.reply('You must only provide a username after this command.');
    }
    let nickname = res[0];
    mojangjs
      .getUUID(nickname)
      .then(uuid => {
        message.channel.send(
          new Discord.RichEmbed()
          .setTitle(`${nickname}'s Skin`)
          .setDescription("If you can not access your skin, please try again later. There are currently restrictions and slowdowns on the Mojang API.")
          .setFooter("Tangerine", `${tangerineIcon}`)
          .setColor([253, 144, 43])
          .addField(`${nickname}'s UUID`, uuid)
          .setImage(`https://crafatar.com/renders/body/${uuid}`)
          .addField('Instructions', 'To download the skin, click on it, click "open original", then right click, and save.')

        );
      }).catch(console.error);
  }
  //////////////////////////////////////////////////////
  if (command === "head") {
    let input = args.join(" ");
    let res = input.split(" ");
    if (args.length !== 1) {
      return message.reply('You must only provide a username after this command.');
    }
    let nickname = res[0];
    mojangjs
      .getUUID(nickname)
      .then(uuid => {
        message.channel.send(
          new Discord.RichEmbed()
          .setTitle(`${nickname}'s Head`)
          .setDescription("If you can not access your skin, please try again later. There are currently restrictions and slowdowns on the Mojang API.")
          .setFooter("Tangerine", `${tangerineIcon}`)
          .setColor([253, 144, 43])
          .addField(`${nickname}'s UUID`, uuid)
          .setImage(`https://crafatar.com/renders/head/${uuid}`)
          .addField('Instructions', 'To download the skin, click on it, click "open original", then right click, and save.')
        );
      }).catch(console.error);
  }
  //////////////////////////////////////////////////////
  if (command === "rawskin") {
    let input = args.join(" ");
    let res = input.split(" ");
    if (args.length !== 1) {
      return message.reply('You must only provide a username after this command.');
    }
    let nickname = res[0];
    mojangjs
      .getUUID(nickname)
      .then(uuid => {
        message.channel.send(
          new Discord.RichEmbed()
          .setTitle(`${nickname}'s Skin`)
          .setDescription("If you can not access your skin, please try again later. There are currently restrictions and slowdowns on the Mojang API.")
          .setFooter("Tangerine", `${tangerineIcon}`)
          .setColor([253, 144, 43])
          .addField(`${nickname}'s UUID`, uuid)
          .setImage(`https://crafatar.com/skins/${uuid}`)
          .addField('Instructions', 'To download the skin, click on it, click "open original", then right click, and save.')
        );
      }).catch(console.error);
  }
  //////////////////////////////////////////////////////
  if (command === "names") {
    if (args.length !== 1) {
      return message.reply('You must only provide a username after this command.');
    }

    function joinNames(playerNameHistory) {
      let allNames = '';
      for (let i = 0; i < playerNameHistory.length; i++) {
        if (i + 1 !== playerNameHistory.length) {
          allNames += playerNameHistory[i].name + ', ';
        } else {
          allNames += playerNameHistory[i].name;
        }
      }
      return allNames;
    }

    mojangjs
      .getUUID(args[0])
      .then(uuid => {
        mojangjs.nameHistory
          .byUUID(uuid)
          .then(namehistory => {
            const playerHistory = new Discord.RichEmbed()
              .setTitle(`**${args[0]}'s** Names`)
              .setFooter("Tangerine", `${tangerineIcon}`)
              .setThumbnail(`https://crafatar.com/renders/head/${uuid}`)
              .setColor([253, 144, 43])
            for (
              let i = 0; i < (namehistory.length <= 5 ? namehistory.length : 5); i++
            ) {
              if (namehistory[i].changedToAt === undefined) {
                playerHistory.addField(
                  'Registered name',
                  namehistory[i].name
                );
              } else {
                playerHistory.addField(
                  `${moment(
										parseInt(namehistory[i].changedToAt)
									).format('MMMM Do, YYYY')}`,
                  namehistory[i].name
                );
              }
            }
            if (namehistory.length > 5) {
              playerHistory.addField(
                `${args[0]} has too many names for discord formatting`,
                `All of **${args[0]}'s** names are: ${joinNames(namehistory)}`
              );
            }
            message.channel.send(playerHistory);
          })
      })
  }
  //////////////////////////////////////////////////////
  if (command === "meme") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    let url = "https://meme-api.herokuapp.com/gimme";
    let settings = {
      method: "Get"
    };
    fetch(url, settings)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        message.channel.send(
          new Discord.RichEmbed()
          .setTitle(`${json.title}`)
          .addField(`from r/${json.subreddit}`, `[link](${json.postLink})`, true)
          .setFooter("Tangerine", `${tangerineIcon}`)
          .setColor([253, 144, 43])
          .setImage(`${json.url}`)
        );
      });
  }
  //////////////////////////////////////////////////////
  if (command === "doge") {
    if (args.length === 0) {
      return message.reply('You must provide a message.');
    }
    let input = args.join(" ");
    message.reply(await dogeify(input));
  }
  //////////////////////////////////////////////////////
  if (command === "uwu") {
    if (args.length === 0) {
      return message.reply('You must provide a message.');
    }
    let input = args.join(" ");
    message.reply(uwufy(input));
  }

  //////////////////////////////////////////////////////
  if (command === "animal") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    message.reply(chance.animal());
  }
  //////////////////////////////////////////////////////
  if (command === "color") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    var randomColor = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    message.reply(
      new Discord.RichEmbed()
      .setTitle(`Your random color is #${randomColor}.`)
      .setColor(randomColor)
    );
  }
  //////////////////////////////////////////////////////
  if (command === "coin") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    var coin = chance.coin();
    return message.reply(
      new Discord.RichEmbed()
      .setTitle(`Your coin flipped: ${coin}.`)
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
    );
  }
  //////////////////////////////////////////////////////
  if (command === "rpg") {
    let input = args.join(" ");
    if (args.length !== 1) {
      return message.reply('You must only provide a roll argument, ex: 3d10. (amount of die to roll + d + max value of each die)');
    }
    roll = input.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);
    num1 = roll[0];
    num2 = roll[2];
    if (num1 < 1 || num1 > 20 || num2 > 200 || num2 < 1) {
      return message.reply('The maximum roll sequence is 20d200, and the minimum 1d1. Please try again.');
    }

    return message.reply(
      new Discord.RichEmbed()
      .setTitle(`Your die rolled: ${chance.rpg(input)}.`)
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
    );
  }
  //////////////////////////////////////////////////////
  if (command === "integer") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    return message.reply(`your integer is \`${chance.natural()}\``);
  }
  //////////////////////////////////////////////////////
  if (command === "prime") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    return message.reply(`your prime number is \`${chance.prime()}\``);
  }
  //////////////////////////////////////////////////////
  if (command === "wikipic") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments')
    }
    wikipics().then(data => {
      return message.reply(
        new Discord.RichEmbed()
        .setTitle(`Todays wikipedia picture of the day`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setImage(`${data.image}`)
      );
    });
  }
  //////////////////////////////////////////////////////
  if (command === "shorten") {
    let input = args.join(" ");
    if (args.length !== 1) {
      return message.reply('You must provide only one link!')
    }
    turl.shorten(`${input}`).then((res) => {
      return message.reply(
        new Discord.RichEmbed()
        .setTitle(`Your shortened link:`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setDescription(`${res}`)
      );
    });
  }
  //////////////////////////////////////////////////////
  if (command === "dog") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments')
    }
    message.reply(dogFacts.random());
  }
  //////////////////////////////////////////////////////
  if (command === "panda") {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments')
    }
    message.reply(pandaFacts.random());
  }
  //////////////////////////////////////////////////////
  if (command === 'emojis') {
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments')
    }
    const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
    message.channel.send(`List of emojis on this server: ${emojiList}`);
  }
  //////////////////////////////////////////////////////
  if (command === 'shout') {
    if (args.length === 0) {
      return message.reply('You must provide a message')
    }
    let words = [];
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let bannerize = (wordLetters) => {
      let num = /([0-9])/;
      let alph = /([a-z])/;
      let string = [];
      wordLetters.map((wordSet, i1) => {
        wordSet.map((word, i2) => {
          if (word === ' ') {
            string.push(`  `);
          } else if (alph.test(word)) {
            string.push(`:regional_indicator_${word}:`);
          } else if (num.test(word)) {
            for (var i = 0; i < digits.length; i++) {
              if (digits[i] === word) {
                string.push(`:${numbers[i]}:`);
                break;
              }
            }
          }
        });
      });
      let response = (`${string}`);
      let reply = response.replace(/,/g, "");
      message.reply(reply);
    };
    let prepMessage = () => {
      let wordLetters = [];
      words.shift();
      words.map((word) => {
        wordLetters.push([...word]);
      });
      bannerize(wordLetters);
    };
    words = message.content.toLowerCase().split(/(\S+\s+)/).filter(n => n);
    prepMessage();
  }
  //////////////////////////////////////////////////////
  if (command === "csgo") {
    let input = args.join(" ");
    if (args.length != 1) {
      return message.reply('You must provide a valid vanity URL.')
    }
    if (/\w*[A-z]\w*/.test(args[0]) == false) {
      return message.reply('You must provide a valid vanity URL, not Steam ID.')
    }
    var username = input;
    var id;
    csStats.getMySteamID(`${username}`, function (data) {
      id = data;
      steam.getUserSummary(`${id}`).then(summary => {
        const jsonSteam = JSON.stringify(summary);
        let steamParse = JSON.parse(jsonSteam);
        let icon = steamParse.avatar.medium;
        csgoStatsFetch.load({
          key: `${csgoKey}`,
          id: id
        }).then(r => {
          const jsondata = JSON.stringify(r.body.playerstats.stats);
          let parsed = JSON.parse(jsondata);
          var total_matches_won; //total match wins
          var total_matches_played; //total matches played
          var total_matches_lost;
          var wlr; //find at end
          var total_kills;
          var total_deaths;
          var kdr; //end
          var total_kills_headshot;
          var headshot_kill_percent; //end
          var total_kills_knife;
          var total_planted_bombs;
          var total_defused_bombs;
          var total_mvps;
          var total_rounds_played; //total rounds played
          var total_wins; //total rounds won
          var total_time_played;
          var total_dominations;
          var total_revenges;
          var total_wins_pistolround;
          var total_shots_fired;
          var total_shots_hit;
          var total_shot_accuracy; //end
          var total_damage_done;
          var total_money_earned;
          var total_weapons_donated;
          for (var i = 0; i < parsed.length; i++) {
            if (parsed[i].name === "total_matches_won") {
              total_matches_won = thousands_separators(parsed[i].value);
              var total_matches_won1 = i;
            }
            if (parsed[i].name === "total_matches_played") {
              total_matches_played = thousands_separators(parsed[i].value);
              var total_matches_played1 = i;
            }
            if (parsed[i].name === "total_kills") {
              total_kills = thousands_separators(parsed[i].value);
              var total_kills1 = i;
            }
            if (parsed[i].name === "total_deaths") {
              total_deaths = thousands_separators(parsed[i].value);
              var total_deaths1 = i;
            }
            if (parsed[i].name === "total_kills_headshot") {
              total_kills_headshot = thousands_separators(parsed[i].value);
              total_kills_headshot1 = i;
            }
            if (parsed[i].name === "total_kills_knife")
              total_kills_knife = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_planted_bombs")
              total_planted_bombs = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_defused_bombs")
              total_defused_bombs = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_mvps")
              total_mvps = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_rounds_played")
              total_rounds_played = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_wins")
              total_wins = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_time_played") {
              total_time_played = thousands_separators(parsed[i].value);
              total_time_played1 = i;
            }
            if (parsed[i].name === "total_dominations")
              total_dominations = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_revenges")
              total_revenges = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_wins_pistolround")
              total_wins_pistolround = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_shots_fired") {
              total_shots_fired = thousands_separators(parsed[i].value);
              total_shots_fired1 = i;
            }
            if (parsed[i].name === "total_shots_hit") {
              total_shots_hit = thousands_separators(parsed[i].value);
              total_shots_hit1 = i;
            }
            if (parsed[i].name === "total_damage_done")
              total_damage_done = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_money_earned")
              total_money_earned = thousands_separators(parsed[i].value);
            if (parsed[i].name === "total_weapons_donated")
              total_weapons_donated = thousands_separators(parsed[i].value);
          }
          total_matches_lost = thousands_separators(parsed[total_matches_played1].value - parsed[total_matches_won1].value);
          wlr = thousands_separators((parsed[total_matches_won1].value / (parsed[total_matches_played1].value - parsed[total_matches_won1].value)).toPrecision(4));
          kdr = thousands_separators((parsed[total_kills1].value / parsed[total_deaths1].value).toPrecision(4));
          headshot_kill_percent = thousands_separators(((parsed[total_kills_headshot1].value / parsed[total_kills1].value) * 100).toPrecision(4));
          total_time_played = thousands_separators((parsed[total_time_played1].value / 60 / 60).toPrecision(4))
          total_shot_accuracy = thousands_separators(((parsed[total_shots_hit1].value / parsed[total_shots_fired1].value) * 100).toPrecision(4));
          const embed = new Discord.RichEmbed()
            .setTitle(`${username}'s CSGO Stats`)
            .setColor([253, 144, 43])
            .setFooter("Tangerine", `${tangerineIcon}`)
            .setTimestamp()
            .setThumbnail(`${icon}`)
            .addField("Wins:", `${total_matches_won}`, true)
            .addField("Losses:", `${total_matches_lost}`, true)
            .addField("WLR:", `${wlr}`, true)
            .addField("Kills:", `${total_kills}`, true)
            .addField("Deaths:", `${total_deaths}`, true)
            .addField("KDR:", `${kdr}`, true)
            .addField("Headshot Kills:", `${total_kills_headshot}`, true)
            .addField("Headshot Kill%:", `${headshot_kill_percent}%`, true)
            .addField("Knife Kills:", `${total_kills_knife}`, true)
            .addField("Plants:", `${total_planted_bombs}`, true)
            .addField("Defuses:", `${total_defused_bombs}`, true)
            .addField("MVPs:", `${total_mvps}`, true)
            .addField("Rounds Played:", `${total_rounds_played}`, true)
            .addField("Rounds Won:", `${total_wins}`, true)
            .addField("Time played:", `${total_time_played} hours`, true)
            .addField("Dominations:", `${total_dominations}`, true)
            .addField("Revenges:", `${total_revenges}`, true)
            .addField("Pistol Round Wins:", `${total_wins_pistolround}`, true)
            .addField("Shots Fired:", `${total_shots_fired}`, true)
            .addField("Shots Hit:", `${total_shots_hit}`, true)
            .addField("Accuracy:", `${total_shot_accuracy}%`, true)
            .addField("Total Damage Done:", `${total_damage_done}`, true)
            .addField("Total Money Collected:", `$${total_money_earned}`, true)
            .addField("Total Weapons Donated:", `${total_weapons_donated}`, true)
          return message.channel.send({
            embed
          });
        }).catch(e => {
          message.reply("That username does not exist, is private, or is too short. Make sure you are using the vanity URL, and you can visit steamcommunity.com/id/<username> in a browser.");
        });
      });
    });
  }
  //////////////////////////////////////////////////////
  if (command === "apex") {
    if (args.length != 2)
      return message.reply('You must provide a username and console. (PC, XBOX, PSN)')
    if (/\w*[A-z]\w*/.test(args[0]) == false)
      return message.reply('You must provide a valid vanity URL, not Steam ID.')
    var platform;
    if (args[1] === "PC" || args[1] === "pc")
      platform = "PC";
    else if (args[1] === "xbox" || args[1] === "XBOX" || args[1] === "Xbox" || args[1] === "xBox")
      platform = "XBOX";
    else if (args[1] === "playstation" || args[1] === "psn" || args[1] === "PSN")
      platform = "PSN";
    else {
      return message.reply("Sorry, that is not a valid console. (PC, XBOX, PSN)")
    }
    var username = args[0];
    apex.getDetailedPlayer(`${username}`, `${platform}`)
      .then((response) => {
        var avatarUrl = response.metadata.avatarUrl
        var level = thousands_separators(response.metadata.level);
        var collections = thousands_separators(response.metadata.collections);
        var rankName = response.metadata.rankName;
        var rankImage = response.metadata.rankImage;
        var accountID = response.metadata.accountId;
        var countryCode = response.metadata.countryCode;
        if (!response.metadata.countryCode)
          countryCode = "Unavailable";
        const embed = new Discord.RichEmbed()
          .setTitle(`${username}'s APEX Legends Stats`)
          .setColor([253, 144, 43])
          .setFooter("Tangerine", `${tangerineIcon}`)
          .setDescription(`Account ID: \`${accountID}\``)
          .setTimestamp()
          .setThumbnail(`${avatarUrl}`)
          .addField("Level:", `${level}`, true)
          .addField("Collections:", `${collections}`, true)
          .addField("Location:", `${countryCode}`, true)
          .addField("Rank:", `${rankName}`, true)
          .setImage(`${rankImage}`)
        return message.channel.send({
          embed
        });
      })
      .catch((err) => {
        return message.reply(
          "Could not index that username. It is possible that the user has not played a match for a long time, or the username could not be found."
        )
      })
  }
  //////////////////////////////////////////////////////
  if (command === "gd") {
    if (args.length != 1)
      return message.reply('You must provide a username.')
    if (/\w*[A-z]\w*/.test(args[0]) == false)
      return message.reply('You must provide a username, not a user ID.')
    var username = args[0];
    let stats = await search(`${username}`);
    if (!stats || stats === "null" || stats === null)
      return message.reply("Sorry, that username was not found!")
    let playerIcon = stats.img.player;
    let ranking = thousands_separators(stats.top);
    let stars = thousands_separators(stats.stars);
    let diamonds = thousands_separators(stats.diamonds);
    let demons = thousands_separators(stats.demons);
    let secretCoins = thousands_separators(stats.secretCoins);
    let userCoins = thousands_separators(stats.userCoins);
    let recentLevel0name = stats.lastLevels[0].name;
    let recentLevel1name = stats.lastLevels[1].name;
    let recentLevel2name = stats.lastLevels[2].name;
    var isMod;
    if (stats.mod.is === true)
      isMod = stats.mod.right;
    else
      isMod = "Not a mod";
    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Geometry Dash Stats`)
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .setThumbnail(`${playerIcon}`)
      .setDescription(`Global Ranking: ${ranking}`)
      .addField("Stars:", `${stars}`, true)
      .addField("Diamonds:", `${diamonds}`, true)
      .addField("Demons:", `${demons}`, true)
      .addField("Secret Coins:", `${secretCoins}`, true)
      .addField("User Coins:", `${userCoins}`, true)
      .addField("Moderator?", `${isMod}`, true)
      .addField("Recently Uploaded Level 1:", `${recentLevel0name}`)
      .addField("Recently Uploaded Level 2:", `${recentLevel1name}`)
      .addField("Recently Uploaded Level 3:", `${recentLevel2name}`)
    return message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "operators" || command === "operator" || command === "op") {
    if (args.length != 0)
      return message.reply('Do not provide any arguments.')
    var attackers = ["Recruit", "Sledge", "Thatcher", "Ash", "Thermite", "Twitch", "Montagne", "Glaz", "Fuze", "Blitz", "IQ", "Buck", "Blackbeard", "Capitão", "Hibana", "Jackal", "Ying", "Zofia", "Dokkaebi", "Lion", "Finka", "Maverick", "Nomad", "Gridlock", "Nøkk", "Amaru", "Kali", "Iana"];
    var defenders = ["Recruit", "Smoke", "Mute", "Castle", "Pulse", "Doc", "Rook", "Kapkan", "Tachanka", "Jäger", "Bandit", "Frost", "Valkyrie", "Caviera", "Echo", "Mira", "Lesion", "Ela", "Vigil", "Maestro", "Alibi", "Clash", "Kaid", "Mozzie", "Warden", "Goyo", "Wamai", "Oryx"];
    var attacker1;
    var attacker2;
    var attacker3;
    var attacker4;
    var attacker5;
    var defender1;
    var defender2;
    var defender3;
    var defender4;
    var defender5;
    while (!defender1) {
      let index = Math.round(Math.random() * defenders.length)
      index = defenders[index];
      if (!(index === defender2 || index === defender3 || index === defender4 || index === defender5)) {
        defender1 = index;
      }
    }
    while (!defender2) {
      let index = Math.round(Math.random() * defenders.length)
      index = defenders[index];
      if (!(index === defender1 || index === defender3 || index === defender4 || index === defender5)) {
        defender2 = index;
      }
    }
    while (!defender3) {
      let index = Math.round(Math.random() * defenders.length)
      index = defenders[index];
      if (!(index === defender2 || index === defender1 || index === defender4 || index === defender5)) {
        defender3 = index;
      }
    }
    while (!defender4) {
      let index = Math.round(Math.random() * defenders.length)
      index = defenders[index];
      if (!(index === defender2 || index === defender3 || index === defender1 || index === defender5)) {
        defender4 = index;
      }
    }
    while (!defender5) {
      let index = Math.round(Math.random() * defenders.length)
      index = defenders[index];
      if (!(index === defender2 || index === defender3 || index === defender4 || index === defender1)) {
        defender5 = index;
      }
    }
    while (!attacker1) {
      let index = Math.round(Math.random() * attackers.length)
      index = attackers[index];
      if (!(index === attacker2 || index === attacker3 || index === attacker4 || index === attacker5)) {
        attacker1 = index;
      }
    }
    while (!attacker2) {
      let index = Math.round(Math.random() * attackers.length)
      index = attackers[index];
      if (!(index === attacker1 || index === attacker3 || index === attacker4 || index === attacker5)) {
        attacker2 = index;
      }
    }
    while (!attacker3) {
      let index = Math.round(Math.random() * attackers.length)
      index = attackers[index];
      if (!(index === attacker2 || index === attacker1 || index === attacker4 || index === attacker5)) {
        attacker3 = index;
      }
    }
    while (!attacker4) {
      let index = Math.round(Math.random() * attackers.length)
      index = attackers[index];
      if (!(index === attacker2 || index === attacker3 || index === attacker1 || index === attacker5)) {
        attacker4 = index;
      }
    }
    while (!attacker5) {
      let index = Math.round(Math.random() * attackers.length)
      index = attackers[index];
      if (!(index === attacker2 || index === attacker3 || index === attacker4 || index === attacker1)) {
        attacker5 = index;
      }
    }
    const embed = new Discord.RichEmbed()
      .setTitle(`Random R6 Operator Picks`)
      .setColor([253, 144, 43])
      .setFooter("Tangerine", `${tangerineIcon}`)
      .setTimestamp()
      .addField("Attackers:", `**1. **${attacker1}\n**2. **${attacker2}\n**3. **${attacker3}\n**4. **${attacker4}\n**5. **${attacker5}`)
      .addField("Defenders:", `**1. **${defender1}\n**2. **${defender2}\n**3. **${defender3}\n**4. **${defender4}\n**5. **${defender5}`)
    return message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "map") {
    if (args.length != 0)
      return message.reply('Do not provide any arguments.')
    var all = ["Bank", "Border", "Chalet", "Clubhouse", "Coastline", "Consulate", "Favela", "Fortress", "Hereford Base", "House", "Kafe Dostoyevsky", "Kanal", "Oregon", "Outback", "Presidential Plane", "Skyscraper", "Theme Park", "Tower", "Villa", "Yacht"];
    var quickmatch = ["Bank", "Border", "Chalet", "Clubhouse", "Coastline", "Consulate", "Favela", "Fortress", "Hereford Base", "House", "Kafe Dostoyevsky", "Oregon", "Outback", "Presidential Plane", "Skyscraper", "Theme Park", "Tower", "Villa", "Yacht"];
    var newcomer = ["Bank", "Chalet", "Consulate"];
    var ranked = ["Bank", "Border", "Chalet", "Clubhouse", "Coastline", "Consulate", "Kafe Dostoyevsky", "Kanal", "Oregon", "Outback", "Theme Park", "Villa"];
    if (args[0] === "quickmatch" || args[0] === "qm" || args[0] === "quick") {
      let index = Math.round(Math.random() * quickmatch.length)
      index = quickmatch[index];
      const embed = new Discord.RichEmbed()
        .setTitle(`Random R6 Quick Match Map`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Map:", `${index}`)
      return message.channel.send({
        embed
      });
    }
    if (args[0] === "newcomer" || args[0] === "new") {
      let index = Math.round(Math.random() * newcomer.length)
      index = newcomer[index];
      const embed = new Discord.RichEmbed()
        .setTitle(`Random R6 Newcomer Match Map`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Map:", `${index}`)
      return message.channel.send({
        embed
      });
    }
    if (args[0] === "ranked" || args[0] === "rank") {
      let index = Math.round(Math.random() * ranked.length)
      index = ranked[index];
      const embed = new Discord.RichEmbed()
        .setTitle(`Random R6 Ranked Match Map`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Map:", `${index}`)
      return message.channel.send({
        embed
      });
    } else {
      let index = Math.round(Math.random() * all.length)
      index = all[index];
      const embed = new Discord.RichEmbed()
        .setTitle(`Random R6 Map`)
        .setColor([253, 144, 43])
        .setFooter("Tangerine", `${tangerineIcon}`)
        .setTimestamp()
        .addField("Map:", `${index}`)
      return message.channel.send({
        embed
      });
    }
  }
  //////////////////////////////////////////////////////
  if (command === "support" || command === "ticket") {
    let input = args.join(" ");
    if (!input)
      return message.reply('Please provide a message.')
    const embed = new Discord.RichEmbed()
      .setTitle(`Support message from \`${message.member.user.tag}\``)
      .setDescription(`${input}`)
      .setColor([89, 161, 255])
    client.users.get(`${admin1}`).send({
      embed
    });
    client.users.get(`${admin2}`).send({
      embed
    });
    return message.reply("Your message has been recieved and will be looked at shortly. For additional help, please visit https://tangerinebot.com or run ~help.")
  }
  //////////////////////////////////////////////////////
});
client.login(config.token);