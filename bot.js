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

const tangerineVersion = ("0.1.10");
const lastUpdated = ("04/28/2020");
const numberOfCommands = ("46");

//Designed by the Tangerine team, https://discord.gg/uwcgjYw or arnav74#0884

function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

client.on("ready", () => {
  console.log(`Bot has started, with ${thousands_separators(client.users.size)} users, in ${thousands_separators(client.channels.size)} channels of ${thousands_separators(client.guilds.size)} guilds.`);
  client.user.setActivity(`memes. 🍊 ∼help. Serving ${thousands_separators(client.users.size)} users.`, {
    type: 'WATCHING'
  }); //PLAYING, LISTENING, WATCHING
  client.user.setStatus('online'); //online, idle, invisible, dnd
});

client.on('ready', () => {
  setInterval(() => {
    dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
  }, 1800000);
});

dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
  console.log(`Oops! ${e}`);
})

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${thousands_separators(guild.memberCount)} members!`);
  let channel = client.channels.get(
    guild.channels
    .filter(
      c =>
      c.permissionsFor(client.user).has("SEND_MESSAGES") &&
      c.type === "text"
    )
    .map(r => r.id)[0]
  );
  const embed = new Discord.RichEmbed()
    .setTitle("welcome to tangerine!")
    .setColor([253, 144, 43])
    .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
    .setImage('https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine.gif')
    .setTimestamp()
    .addField("**Made by the Tangerine team**", "❤️‏‏‎")
  channel.send({
    embed
  });
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
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
  //////////////////////////////////////////////////////
  if (command === "ping") { //asynchronous guild ping
    let input = args.join(" ");
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
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's list of commands")
      .setColor([253, 144, 43])
      .setDescription(`For more help use ~about and join the support server!`)
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's list of general commands")
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
      .setTimestamp()
      .addField("`help`", "prints out all of the main tangerine commands", true)
      .addField("`about`", "prints the about and developer contact page", true)
      .addField("`ping`", "prints the bot's network latency", true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "utility") {
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's list of utility commands")
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
      .setTimestamp()
      .addField("`nickname` <string(nickname)>", "changes your nickname to the specified string", true)
      .addField("`nickreset`", "resets your nickname", true)
      .addField("`time` <none | string(est|ct|mt|pt)>", "prints the current time", true)
      .addField("`shorten` <string(URL)>", "shortens the given URL using tinyurl", true)
      .addField("`shout` <string(message)>", "converts your message into regional indicator characters", true)
      .addField("`emojis`", "lists all of the custom emojis on the server", true)

    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "fun") {
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's list of fun commands")
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's list of game trackers")
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
      .setTimestamp()
      .addField("🌈 ", "**Rainbow Six Siege**")
      .addField("`r6` <username, pc|psn>", "Rainbow Six Siege PVP stats", true)
      .addField("`r6pve` <username, pc|psn>", "Rainbow Six Siege PVE stats", true)
      .addBlankField(false)
      .addField("⛏️ ", "**Minecraft**")
      .addField("`head` <username>", "Fetches and prints the user's head", true)
      .addField("`names` <username>", "Fetches and prints all of the user's names", true)
      .addField("`skin` <username>", "Fetches and prints the user's skin", true)
      .addField("`rawskin` <username>", "Fetches and prints the user's raw skin", true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "random") {
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's list of random commands")
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle("tangerine's administration commands")
      .setColor([253, 144, 43])
      .setDescription("You must have special permissions to run these commands. View the master list here: bit.ly/tangerineAdmin")
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply(
        'You must not provide any arguments.'
      );
    }
    const embed = new Discord.RichEmbed()
      .setTitle(`tangerine ${tangerineVersion}`)
      .setColor([253, 144, 43])
      .setDescription(`Last updated ${lastUpdated}.`)
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
      .setTimestamp()
      .addBlankField(true)
      .addField("The Tangerine Team", "arnav74#0884 and EpicN#5997")
      .addField("Official Website", "[Tangerine Website](https://dashaputra.com/tangerine)")
      .addField("Support server", "[Tangerine Support](https://discord.gg/uwcgjYw)")
      .addField("Invite to your own server", "[Tangerine Bot](https://bit.ly/tangerineBot)")
      .addField("Vote for us on top.gg!", "[Tangerine Voting](https://top.gg/bot/701793346225700934/vote)")
      .setImage('https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine.gif')
      .addField("Users using:", `${thousands_separators(client.users.size)} users`, true)
      .addField("Channels channeling:", `${thousands_separators(client.channels.size)} channels`, true)
      .addField("Servers serving:", `${thousands_separators(client.guilds.size)} servers`, true)
    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "say") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
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
    let input = args.join(" ");
    let diceSides = args.join(" ");
    if (args.length !== 0 || args.length !== 1) {
      return message.reply(`You must provide either no inputs or 1 number.`)
    }
    if (!diceSides) {
      diceSides = 6;
      let value = Math.round(Math.random() * diceSides)
      return message.reply(`Defaulting to a six-side dice. You rolled: ${value}`)
    } else {
      let value = Math.round(Math.random() * diceSides)
      return message.reply(`Number of sides: ${diceSides}. You rolled: ${value}`)
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
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    message.reply(randomWord());
  }
  //////////////////////////////////////////////////////
  if (command === "asciiart") {
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    message.reply(`\`${getEmoji()}\``);
  }
  //////////////////////////////////////////////////////
  if (command === "someone") {
    let input = args.join(" ");
    if (args.length !== 0) {
      return message.reply('You must not provide any arguments.');
    }
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.reply("Sorry, you don't have permissions to use this!");
    message.reply(`the selected person is: ${message.guild.members.random()}`);
  }
  //////////////////////////////////////////////////////
  if (command === "useless") {
    let input = args.join(" ");
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
    let totalassists = (stats.pvp.general.assists + stats.pvp.general.dbnoAssists);
    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Rainbow Six Siege Stats`)
      .setDescription("For PVE stats, use ∼r6pve")
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
      .setTimestamp()
      .addField("‏‎🔫‎", "**PVP**")
      .addField("Wins:", `${stats.pvp.general.wins}`, true)
      .addField("Losses:", `${stats.pvp.general.losses}`, true)
      .addField("WLR:", `${wlr}`, true)
      .addField("Kills:", `${stats.pvp.general.kills}`, true)
      .addField("Deaths:", `${stats.pvp.general.deaths}`, true)
      .addField("KDR:", `${kdr}`, true)
      .addField("Matches:", `${stats.pvp.general.matches}`, true)
      .addField("Assists:", `${totalassists}`, true)
      .addField("Revives:", `${stats.pvp.general.revives}`, true)
      .addField("Headshots:", `${stats.pvp.general.headshots}`, true)
      .addField("Headshot%:", `${hsr}%`, true)
      .addField("Melees:", `${stats.pvp.general.meleeKills}`, true)
      .addField("Wallbangs:", `${stats.pvp.general.penetrationKills}`, true)
      .addField("Blind Kills:", `${stats.pvp.general.blindKills}`, true)
      .addField("DBNOs:", `${stats.pvp.general.dbno}`, true)
      .addField("Gadgets Broken:", `${stats.pvp.general.gadgetsDestroyed}`, true)
      .addField("Barricades:", `${stats.pvp.general.barricadesDeployed}`, true)
      .addField("Suicides:", `${stats.pvp.general.suicides}`, true)
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
    let pvetotalassists = (stats.pvp.general.assists + stats.pvp.general.dbnoAssists);
    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Rainbow Six Siege PVE Stats`)
      .setColor([253, 144, 43])
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
      .setTimestamp()
      .addField("‏‎🔪‎", "**PVE**")
      .addField("Wins:", `${stats.pve.general.wins}`, true)
      .addField("Losses:", `${stats.pve.general.losses}`, true)
      .addField("WLR:", `${pvewlr}`, true)
      .addField("Kills:", `${stats.pve.general.kills}`, true)
      .addField("Deaths:", `${stats.pve.general.deaths}`, true)
      .addField("KDR:", `${pvekdr}`, true)
      .addField("Matches:", `${stats.pve.general.matches}`, true)
      .addField("Assists:", `${pvetotalassists}`, true)
      .addField("Revives:", `${stats.pve.general.revives}`, true)
      .addField("Headshots:", `${stats.pve.general.headshots}`, true)
      .addField("Headshot %:", `${pvehsr}%`, true)
      .addField("Melee Kills:", `${stats.pve.general.meleeKills}`, true)
      .addField("Wallbangs:", `${stats.pve.general.penetrationKills}`, true)
      .addField("Blind Kills:", `${stats.pve.general.blindKills}`, true)
      .addField("DBNOs:", `${stats.pve.general.dbno}`, true)
      .addField("Gadgets Broken:", `${stats.pve.general.gadgetsDestroyed}`, true)
      .addField("Barricades:", `${stats.pve.general.barricadesDeployed}`, true)
      .addField("Suicides:", `${stats.pve.general.suicides}`, true)
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
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
        .setTimestamp()
        .addField("It is currently:", `${etF}`)
      message.channel.send({
        embed
      });
    } else if (args == "CT" || args == "ct" || args == "CST" || args == "cst") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Central Time`)
        .setColor([253, 144, 43])
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
        .setTimestamp()
        .addField("It is currently:", `${ctF}`)
      message.channel.send({
        embed
      });
    } else if (args == "MDT" || args == "mdt" || args == "MST" || args == "mst" || args == "MT" || args == "mt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Mountain Time`)
        .setColor([253, 144, 43])
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
        .setTimestamp()
        .addField("It is currently:", `${mdtF}`)
      message.channel.send({
        embed
      });
    } else if (args == "PST" || args == "pst" || args == "PT" || args == "pt") {
      const embed = new Discord.RichEmbed()
        .setTitle(`Pacific Time`)
        .setColor([253, 144, 43])
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
          .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
          .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
          .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
          .setColor([253, 144, 43])
          .addField(`${nickname}'s UUID`, uuid)
          .setImage(`https://crafatar.com/skins/${uuid}`)
          .addField('Instructions', 'To download the skin, click on it, click "open original", then right click, and save.')
        );
      }).catch(console.error);
  }
  //////////////////////////////////////////////////////
  if (command === "names") {
    let input = args.join(" ");
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
              .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
          .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
      .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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
        .setFooter("tangerine", 'https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon.png')
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

});
client.login(config.token);