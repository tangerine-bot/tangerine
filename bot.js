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
const R6API = require('r6api.js');
const r6api = new R6API('justokuydu@enayu.com', 'Hello12345!');

//Designed by Arnav Dashaputra, https://dashaputra.com, arnav74#0884

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`memes. Use ∼help. Serving ${client.users.size} users.`, {
    type: 'WATCHING'
  }); //PLAYING, LISTENING, WATCHING
  client.user.setStatus('online'); //online, idle, invisible, dnd
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  if (message.author.bot) return; //botception prevention
  if (message.content.indexOf(config.prefix) !== 0) return; //ignore messages without prefix
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //separates command and arguments (first word from all other words)
  const command = args.shift().toLowerCase();
  //////////////////////////////////////////////////////
  if (command === "ping") { //asynchronous guild ping
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  //////////////////////////////////////////////////////
  if (command === "help") {
    const embed = new Discord.RichEmbed()
      .setTitle("blitzbot's list of commands")
      .setColor([251, 204, 23])
      .setDescription("For administration commands, use ∼advanced. For games commands, use ∼games.")
      .setFooter("blitzbot", 'https://raw.githubusercontent.com/blitzbot-public/blitzbot/master/blitzbot.png')
      .setTimestamp()

      .addBlankField(false)
      .addField("‏‏‎👋", "**GENERAL**")
      .addField("`help` <none>", "the page you are on right now!", true)
      .addField("`about` <none>", "prints the about and developer contact page", true)
      .addField("`ping` <none>", "prints the bot's network latency", true)
      .addField("`advanced` <none>", "prints advanced help for server admins", true)

      .addBlankField(false)
      .addField("‏‎🛠️‎", "**UTILITY**")
      .addField("`nickname` <string(nickname)>", "changes your nickname to the specified string", true)
      .addField("`nickreset` <none>", "resets your nickname", true)

      .addBlankField(false)
      .addField("‏‏‎😊‎", "**FUN**")
      .addField("`games`", "prints out all of the game tracking commands", true)
      .addField("`ascii` <string(message)>", "prints your message in ASCII art", true)
      .addField("`diceroll` <none, int(sides of dice)>", "rolls a dice with specified number of sides", true)
      .addField("`guess` <int(max number), int(guess)>", "picks a number 0 to max and checks if the guessed number matches it", true)
      .addField("`randomword`", "prints a random English word", true)
      .addField("`asciiart`", "prints a random ascii emoji", true)
      .addField("`useless`", "no idea what this one does", true)
    //.addField("'CMD'", "DESC", true)


    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "games") {
    const embed = new Discord.RichEmbed()
      .setTitle("blitzbot's list of game trackers")
      .setColor([251, 204, 23])
      .setFooter("blitzbot", 'https://raw.githubusercontent.com/blitzbot-public/blitzbot/master/blitzbot.png')
      .setTimestamp()

      .addBlankField(false)
      .addField("🌈 ", "**Rainbow Six Siege**")
      .addField("`r6` <username, uplay|xb1|psn>", "Rainbow Six Siege PVP stats", true)
      .addField("`r6pve` <username, uplay|xb1|psn>", "Rainbow Six Siege PVE stats", true)

    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "advanced") {
    const embed = new Discord.RichEmbed()
      .setTitle("blitzbot's administration commands")
      .setColor([251, 204, 23])
      .setDescription("You must have special permissions to run these commands. View the master list here: bit.ly/blitzbotAdmin")
      .setFooter("blitzbot", 'https://raw.githubusercontent.com/blitzbot-public/blitzbot/master/blitzbot.png')
      .setTimestamp()
      .addBlankField(true)
      .addField("‏‏‎⚡‎", "**ADMINISTRATION**")
      .addField("`say` <string(message)>", "prints a repeat of the message. Requires MANAGE_MESSAGES.")
      .addField("`kick` <@user, string(reason)>", "kicks the specified user. Requires KICK_MEMBERS.")
      .addField("`ban` <@user, string(reason)>", "bans the specified user. Requires BAN_MEMBERS.")
      .addField("`purge` <int(messages)>", "purges the specified amount of messages from the channel. Requires MANAGE_MESSAGES.")
      .addField("`mute` <@user, int(milliseconds)>", "mutes the specified user for the specified amount of time. Requires MANAGE_ROLES.")
      .addField("`someone` <@user, int(milliseconds)>", "pings a random user in the server. Requires ADMINISTRATOR.")

    //.addField("cmd", "desc")
    //.addBlankField(true)

    message.channel.send({
      embed
    });
  }
  //////////////////////////////////////////////////////
  if (command === "about") {
    message.reply(`Currently using blitzbot version 0.0.7. Last updated 04/22/2020. Support: https://discord.gg/uwcgjYw. Currently serving ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} servers.`)
  }
  //////////////////////////////////////////////////////
  if (command === "say") {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("Sorry, you don't have permissions to use this!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o => {});
    if (!sayMessage) {
      message.reply("Please input an argument")
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
    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 200)
      return message.reply("Please provide a number between 2 and 200 for the number of messages to delete");

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
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
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
  if (command === "diceroll") {
    let diceSides = args.join(" ");
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
    if (!input) {
      return message.reply(`Please guess a number.`)
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
      message.reply(`Please enter a string.`)
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
    if (!message.member.hasPermission('CHANGE_NICKNAME'))
      return message.reply("Sorry, you don't have permissions to use this!");
    else {
      message.member.setNickname(message.author.username);
      return message.reply(`Your nickname is now set to ${message.author.username}.`)
    }
  }
  //////////////////////////////////////////////////////
  if (command === "randomword") {
    message.reply(randomWord());
  }
  //////////////////////////////////////////////////////
  if (command === "asciiart") {
    message.reply(getEmoji());
  }
  //////////////////////////////////////////////////////
  if (command === "someone") {
    if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("Sorry, you don't have permissions to use this!");
    message.reply(`the selected person is: ${message.guild.members.random()}`);
  }
  //////////////////////////////////////////////////////
  if (command === "useless") {

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
    let username = res[0];
    let platform = res[1];

    const id = await r6api.getId(platform, username).then(el => el[0].userId);
    const stats = await r6api.getStats(platform, id).then(el => el[0]);

    let kdr = (stats.pvp.general.kills / stats.pvp.general.deaths).toPrecision(3);
    let wlr = (stats.pvp.general.wins / stats.pvp.general.losses).toPrecision(3);

    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Rainbow Six Siege Stats`)
      .setDescription("For PVE stats, use ∼r6pve")
      .setColor([251, 204, 23])
      .setFooter("blitzbot", 'https://raw.githubusercontent.com/blitzbot-public/blitzbot/master/blitzbot.png')
      .setTimestamp()

      .addField("‏‎🔫‎", "**PVP**")
      .addField("Wins:", `${stats.pvp.general.wins}`, true)
      .addField("Losses:", `${stats.pvp.general.losses}`, true)
      .addField("WLR:", `${wlr}`, true)
      .addField("Kills:", `${stats.pvp.general.kills}`, true)
      .addField("Deaths:", `${stats.pvp.general.deaths}`, true)
      .addField("KDR:", `${kdr}`, true)
      .addField("Matches:", `${stats.pvp.general.matches}`, true)
      .addField("Assists:", `${stats.pvp.general.assists}`, true)
      .addField("Headshots:", `${stats.pvp.general.headshots}`, true)
      .addField("Melee Kills:", `${stats.pvp.general.meleeKills}`, true)
      .addField("Wallbangs:", `${stats.pvp.general.penetrationKills}`, true)
      .addField("Blind Kills:", `${stats.pvp.general.blindKills}`, true)
      .addField("DBNOs:", `${stats.pvp.general.dbno}`, true)
      .addField("DBNO Assists:", `${stats.pvp.general.dbnoAssists}`, true)
      .addField("Revives:", `${stats.pvp.general.revives}`, true)
      .addField("Gadgets Broken:", `${stats.pvp.general.gadgetsDestroyed}`, true)
      .addField("Barricades:", `${stats.pvp.general.barricadesDeployed}`, true)
      .addField("Suicides:", `${stats.pvp.general.suicides}`, true)
      .addField("Playtime:", `${((stats.pvp.general.playtime)/60/60).toPrecision(3)} Hours`, true)
    message.channel.send({
      embed
    });
  }

  //////////////////////////////////////////////////////

  if (command === "r6pve") {

    let input = args.join(" ");
    let res = input.split(" ");
    let username = res[0];
    let platform = res[1];

    const id = await r6api.getId(platform, username).then(el => el[0].userId);
    const stats = await r6api.getStats(platform, id).then(el => el[0]);

    let pvekdr = (stats.pve.general.kills / stats.pve.general.deaths).toPrecision(3);
    let pvewlr = (stats.pve.general.wins / stats.pve.general.losses).toPrecision(3);

    const embed = new Discord.RichEmbed()
      .setTitle(`${username}'s Rainbow Six Siege PVE Stats`)
      .setColor([251, 204, 23])
      .setFooter("blitzbot", 'https://raw.githubusercontent.com/blitzbot-public/blitzbot/master/blitzbot.png')
      .setTimestamp()

      .addField("‏‎🔪‎", "**PVE**")
      .addField("Wins:", `${stats.pve.general.wins}`, true)
      .addField("Losses:", `${stats.pve.general.losses}`, true)
      .addField("WLR:", `${pvewlr}`, true)
      .addField("Kills:", `${stats.pve.general.kills}`, true)
      .addField("Deaths:", `${stats.pve.general.deaths}`, true)
      .addField("KDR:", `${pvekdr}`, true)
      .addField("Matches:", `${stats.pve.general.matches}`, true)

    message.channel.send({
      embed
    });

  }

  //////////////////////////////////////////////////////
});
client.login(config.token);