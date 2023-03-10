const Command = require("../../structures/CommandClass");
const HypixelAPI = require("hypixel-api");
const {
  hypixelusername
} = require("../../keys/hypixel.json");
const hyAPI = new HypixelAPI(hypixelusername);
const {
  EmbedBuilder,
  SlashCommandBuilder
} = require("discord.js");

function thousands_separators(x) {
  if (typeof x === "string" || typeof x === "number") {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
}
module.exports = class sw extends Command {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
        .setName("sw")
        .setDescription("Returns user's Hypixel Skywars stats.")
        .setDMPermission(true)
        .addStringOption((option) =>
          option
          .setName("username")
          .setDescription("username")
          .setRequired(true)
        ),
      usage: "sw <username>",
      category: "Stats",
      permissions: ["Use Application Commands", "Send Messages", "Embed Links"],
    });
  }

  async run(client, interaction) {
    const username = interaction.options.getString("username");

    hyAPI
      .getPlayer("name", `${username}`)
      .then(async (player) => {
        await interaction.deferReply();

        let soloNormalWins = player.player.stats.SkyWars.wins_solo_normal;
        let soloNormalLosses = player.player.stats.SkyWars.losses_solo_normal;
        let soloNormalKills = player.player.stats.SkyWars.kills_solo_normal;
        let soloNormalDeaths = player.player.stats.SkyWars.deaths_solo_normal;
        let soloNormalWLR = (soloNormalWins / soloNormalLosses).toFixed(2);
        if (isNaN(soloNormalWLR)) soloNormalWLR = 0;
        let soloNormalKDR = (soloNormalKills / soloNormalDeaths).toFixed(2);
        if (isNaN(soloNormalKDR)) soloNormalKDR = 0;
        soloNormalWins = thousands_separators(soloNormalWins);
        soloNormalLosses = thousands_separators(soloNormalLosses);
        soloNormalKills = thousands_separators(soloNormalKills);
        soloNormalDeaths = thousands_separators(soloNormalDeaths);
        let soloInsaneWins = player.player.stats.SkyWars.wins_solo_insane;
        let soloInsaneLosses = player.player.stats.SkyWars.losses_solo_insane;
        let soloInsaneKills = player.player.stats.SkyWars.kills_solo_insane;
        let soloInsaneDeaths = player.player.stats.SkyWars.deaths_solo_insane;
        let soloInsaneWLR = (soloInsaneWins / soloInsaneLosses).toFixed(2);
        if (isNaN(soloInsaneWLR)) soloInsaneWLR = 0;
        let soloInsaneKDR = (soloInsaneKills / soloInsaneDeaths).toFixed(2);
        if (isNaN(soloInsaneKDR)) soloInsaneKDR = 0;
        soloInsaneWins = thousands_separators(soloInsaneWins);
        soloInsaneLosses = thousands_separators(soloInsaneLosses);
        soloInsaneKills = thousands_separators(soloInsaneKills);
        soloInsaneDeaths = thousands_separators(soloInsaneDeaths);
        let teamNormalWins = player.player.stats.SkyWars.wins_team_normal;
        let teamNormalLosses = player.player.stats.SkyWars.losses_team_normal;
        let teamNormalKills = player.player.stats.SkyWars.kills_team_normal;
        let teamNormalDeaths = player.player.stats.SkyWars.deaths_team_normal;
        let teamNormalWLR = (teamNormalWins / teamNormalLosses).toFixed(2);
        if (isNaN(teamNormalWLR)) teamNormalWLR = 0;
        let teamNormalKDR = (teamNormalKills / teamNormalDeaths).toFixed(2);
        if (isNaN(teamNormalKDR)) teamNormalKDR = 0;
        teamNormalWins = thousands_separators(teamNormalWins);
        teamNormalLosses = thousands_separators(teamNormalLosses);
        teamNormalKills = thousands_separators(teamNormalKills);
        teamNormalDeaths = thousands_separators(teamNormalDeaths);
        let teamInsaneWins = player.player.stats.SkyWars.wins_team_insane;
        let teamInsaneLosses = player.player.stats.SkyWars.losses_team_insane;
        let teamInsaneKills = player.player.stats.SkyWars.kills_team_insane;
        let teamInsaneDeaths = player.player.stats.SkyWars.deaths_team_insane;
        let teamInsaneWLR = (teamInsaneWins / teamInsaneLosses).toFixed(2);
        if (isNaN(teamInsaneWLR)) teamInsaneWLR = 0;
        let teamInsaneKDR = (teamInsaneKills / teamInsaneDeaths).toFixed(2);
        if (isNaN(teamInsaneKDR)) teamInsaneKDR = 0;
        teamInsaneWins = thousands_separators(teamInsaneWins);
        teamInsaneLosses = thousands_separators(teamInsaneLosses);
        teamInsaneKills = thousands_separators(teamInsaneKills);
        teamInsaneDeaths = thousands_separators(teamInsaneDeaths);
        let megaWins = player.player.stats.SkyWars.wins_mega_normal;
        let megaLosses = player.player.stats.SkyWars.losses_mega_normal;
        let megaKills = player.player.stats.SkyWars.kills_mega_normal;
        let megaDeaths = player.player.stats.SkyWars.deaths_mega_normal;
        let megaWLR = (megaWins / megaLosses).toFixed(2);
        if (isNaN(megaWLR)) megaWLR = 0;
        let megaKDR = (megaKills / megaDeaths).toFixed(2);
        if (isNaN(megaKDR)) megaKDR = 0;
        megaWins = thousands_separators(megaWins);
        megaLosses = thousands_separators(megaLosses);
        megaKills = thousands_separators(megaKills);
        megaDeaths = thousands_separators(megaDeaths);
        let mega2Wins = player.player.stats.SkyWars.wins_mega_doubles;
        let mega2Losses = player.player.stats.SkyWars.losses_mega_doubles;
        let mega2Kills = player.player.stats.SkyWars.kills_mega_doubles;
        let mega2Deaths = player.player.stats.SkyWars.deaths_mega_doubles;
        let mega2WLR = (mega2Wins / mega2Losses).toFixed(2);
        if (isNaN(mega2WLR)) mega2WLR = 0;
        let mega2KDR = (mega2Kills / mega2Deaths).toFixed(2);
        if (isNaN(mega2KDR)) mega2KDR = 0;
        if (mega2Wins && mega2Losses && mega2Kills && mega2Deaths) {
          mega2Wins = thousands_separators(mega2Wins);
          mega2Losses = thousands_separators(mega2Losses);
          mega2Kills = thousands_separators(mega2Kills);
          mega2Deaths = thousands_separators(mega2Deaths);
        }
        let labWins = player.player.stats.SkyWars.wins_lab;
        let labLosses = player.player.stats.SkyWars.losses_lab;
        let labKills = player.player.stats.SkyWars.kills_lab;
        let labDeaths = player.player.stats.SkyWars.deaths_lab;
        let labWLR = (labWins / labLosses).toFixed(2);
        if (isNaN(labWLR)) labWLR = 0;
        let labKDR = (labKills / labDeaths).toFixed(2);
        if (isNaN(labKDR)) labKDR = 0;
        if (labWins && labLosses && labKills && labDeaths) {
          labWins = thousands_separators(labWins);
          labLosses = thousands_separators(labLosses);
          labKills = thousands_separators(labKills);
          labDeaths = thousands_separators(labDeaths);
        }
        let rankedWins = player.player.stats.SkyWars.wins_ranked;
        let rankedLosses = player.player.stats.SkyWars.losses_ranked;
        let rankedKills = player.player.stats.SkyWars.kills_ranked;
        let rankedDeaths = player.player.stats.SkyWars.deaths_ranked;
        let rankedWLR = (rankedWins / rankedLosses).toFixed(2);
        if (isNaN(rankedWLR)) rankedWLR = 0;
        let rankedKDR = (rankedKills / rankedDeaths).toFixed(2);
        if (isNaN(rankedKDR)) rankedKDR = 0;
        rankedWins = thousands_separators(rankedWins);
        rankedLosses = thousands_separators(rankedLosses);
        rankedKills = thousands_separators(rankedKills);
        rankedDeaths = thousands_separators(rankedDeaths);
        let totalCoins = player.player.stats.SkyWars.coins;
        totalCoins = thousands_separators(totalCoins);
        let totalHeads = player.player.stats.SkyWars.heads;
        let totalWins = player.player.stats.SkyWars.wins;
        let totalLosses = player.player.stats.SkyWars.losses;
        let totalKills = player.player.stats.SkyWars.kills;
        let totalDeaths = player.player.stats.SkyWars.deaths;
        let totalWLR = (totalWins / totalLosses).toFixed(2);
        if (isNaN(totalWLR)) totalWLR = 0;
        let totalKDR = (totalKills / totalDeaths).toFixed(2);
        if (isNaN(totalKDR)) totalKDR = 0;
        totalHeads = thousands_separators(totalHeads);
        totalWins = thousands_separators(totalWins);
        totalLosses = thousands_separators(totalLosses);
        totalKills = thousands_separators(totalKills);
        totalDeaths = thousands_separators(totalDeaths);
        let totalLevel = 0;
        let xp = player.player.stats.SkyWars.skywars_experience;
        var xps = [
          0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000,
        ];
        if (xp >= 15000) {
          totalLevel = (xp - 15000) / 10000 + 12;
        } else {
          for (var i = 0; i < xps.length; i++) {
            if (xp < xps[i])
              totalLevel = 1 + i + (xp - xps[i - 1]) / (xps[i] - xps[i - 1]);
          }
        }

        var totalLevelRaw = totalLevel.toPrecision(6);
        totalLevelRaw *= 10000;
        var rawXPstr = String(totalLevelRaw).slice(2);
        var rawXP = thousands_separators(Number(rawXPstr));

        for (var i = 0; i < rawXP.length; i++) {
          if (rawXP.charAt(i) == ".") {
            totalLevelRaw += 1;
            rawXPstr = String(totalLevelRaw).slice(2);
            rawXP = thousands_separators(Number(rawXPstr));
            rawXP = rawXP.slice(0, i);
          }
        }

        let seperateXp = thousands_separators(xp);

        for (var i = 0; i < seperateXp.length; i++) {
          if (seperateXp.charAt(i) == ".") {
            seperateXp = seperateXp.slice(0, i);
          }
        }

        var totalLevelClean = totalLevel.toFixed(2);
        totalLevel = totalLevel.toPrecision(4);
        var levelDecimals = totalLevel * 100;
        levelDecimals = levelDecimals.toPrecision(4);
        var last2Str = String(levelDecimals).slice(-2);
        var last2Num = Number(last2Str);

        let prestige = "None";
        let prestigeColor = "635e5d";
        if (totalLevel >= 0 && totalLevel <= 4.99) {
          prestige = "Stone ⚔";
          prestigeColor = "635e5d";
        } else if (totalLevel >= 5 && totalLevel <= 9.99) {
          prestige = "Iron ✙";
          prestigeColor = "d6c6c5";
        } else if (totalLevel >= 10 && totalLevel <= 14.99) {
          prestige = "Gold ❤";
          prestigeColor = "c2ad34";
        } else if (totalLevel >= 15 && totalLevel <= 19.99) {
          prestige = "Diamond ☠";
          prestigeColor = "54ebff";
        } else if (totalLevel >= 20 && totalLevel <= 24.99) {
          prestige = "Emerald ✧";
          prestigeColor = "0e4d16";
        } else if (totalLevel >= 25 && totalLevel <= 29.99) {
          prestige = "Sapphire 🖔";
          prestigeColor = "2fbca7";
        } else if (totalLevel >= 30 && totalLevel <= 34.99) {
          prestige = "Ruby ❦";
          prestigeColor = "780615";
        } else if (totalLevel >= 35 && totalLevel <= 39.99) {
          prestige = "Crystal ❁";
          prestigeColor = "bd269f";
        } else if (totalLevel >= 40 && totalLevel <= 44.99) {
          prestige = "Opal ❣";
          prestigeColor = "3865cf";
        } else if (totalLevel >= 45 && totalLevel <= 49.99) {
          prestige = "Amethyst ☯";
          prestigeColor = "6e28b5";
        } else if (totalLevel >= 50 && totalLevel <= 59.99) {
          prestige = "Rainbow ✺";
          prestigeColor = `${Math.floor(Math.random() * 16777215).toString(
            16
          )}`; //random
        } else if (totalLevel >= 60 && totalLevel <= 500) {
          prestige = "Mythic ✰";
          prestigeColor = `${Math.floor(Math.random() * 16777215).toString(
            16
          )}`; //random
        }

        var setImage = `https://image-charts.com/chart?chs=450x60&chd=a:${last2Num}|${
          100 - last2Num
        }&cht=bhs&chma=-10,0,-10,-10&chf=bg,s,FFFFFF00|b0,lg,0,${prestigeColor},0.1&chco=E3E3E3`;

        if (totalLevel <= 11) {
          const below11embed = new EmbedBuilder()
            .setTitle(`${username}'s Skywars Stats`)
            .setFooter({
              text: "[OSS] Tangerine Team, 2023",
              iconURL: "https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon_full.png",
            })
            .setColor([45, 70, 163])
            .setThumbnail(`https://minotar.net/helm/${username}`)
            .setDescription(
              "After reaching 12 stars, you can see your Skywars experience progress bar."
            )
            .setTimestamp()
            .addFields({
              name: "Solo Normal",
              value: `\`-\` Wins: ${soloNormalWins}\n \`-\` Losses: ${soloNormalLosses}\n \`-\` Kills: ${soloNormalKills}\n \`-\` Deaths: ${soloNormalDeaths}\n \`-\` WLR: ${soloNormalWLR}\n \`-\` KDR: ${soloNormalKDR}\n`,
              inline: true,
            }, {
              name: "Solo Insane",
              value: `\`-\` Wins: ${soloInsaneWins}\n \`-\` Losses: ${soloInsaneLosses}\n \`-\` Kills: ${soloInsaneKills}\n \`-\` Deaths: ${soloInsaneDeaths}\n \`-\` WLR: ${soloInsaneWLR}\n \`-\` KDR: ${soloInsaneKDR}\n`,
              inline: true,
            }, {
              name: "Mega",
              value: `\`-\` Wins: ${megaWins}\n \`-\` Losses: ${megaLosses}\n \`-\` Kills: ${megaKills}\n \`-\` Deaths: ${megaDeaths}\n \`-\` WLR: ${megaWLR}\n \`-\` KDR: ${megaKDR}\n`,
              inline: true,
            }, {
              name: "Teams Normal",
              value: `\`-\` Wins: ${teamNormalWins}\n \`-\` Losses: ${teamNormalLosses}\n \`-\` Kills: ${teamNormalKills}\n \`-\` Deaths: ${teamNormalDeaths}\n \`-\` WLR: ${teamNormalWLR}\n \`-\` KDR: ${teamNormalKDR}\n`,
              inline: true,
            }, {
              name: "Teams Insane",
              value: `\`-\` Wins: ${teamInsaneWins}\n \`-\` Losses: ${teamInsaneLosses}\n \`-\` Kills: ${teamInsaneKills}\n \`-\` Deaths: ${teamInsaneDeaths}\n \`-\` WLR: ${teamInsaneWLR}\n \`-\` KDR: ${teamInsaneKDR}\n`,
              inline: true,
            }, {
              name: "Lab",
              value: `\`-\` Wins: ${labWins}\n \`-\` Losses: ${labLosses}\n \`-\` Kills: ${labKills}\n \`-\` Deaths: ${labDeaths}\n \`-\` WLR: ${labWLR}\n \`-\` KDR: ${labKDR}\n`,
              inline: true,
            }, {
              name: "Ranked",
              value: `\`-\` Wins: ${rankedWins}\n \`-\` Losses: ${rankedLosses}\n \`-\` Kills: ${rankedKills}\n \`-\` Deaths: ${rankedDeaths}\n \`-\` WLR: ${rankedWLR}\n \`-\` KDR: ${rankedKDR}\n`,
              inline: true,
            }, {
              name: "Totals",
              value: `\`-\` Wins: ${totalWins}\n \`-\` Losses: ${totalLosses}\n \`-\` Kills: ${totalKills}\n \`-\` Deaths: ${totalDeaths}\n \`-\` WLR: ${totalWLR}\n \`-\` KDR: ${totalKDR}\n`,
              inline: true,
            }, {
              name: "General",
              value: `\`-\` Level: ${totalLevelClean}\n \`-\` Prestige: ${prestige}\n \`-\` Coins: ${totalCoins}\n \`-\` XP: ${seperateXp}\n \`-\` Heads: ${totalHeads}`,
              inline: true,
            });
          return await interaction.editReply({
            embeds: [below11embed],
          });
        } else {
          const above11embed = new EmbedBuilder()
            .setTitle(`${username}'s Skywars Stats`)
            .setFooter({
              text: "[OSS] Tangerine Team, 2023",
              iconURL: "https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon_full.png",
            })
            .setColor([253, 144, 43])
            .setThumbnail(`https://minotar.net/helm/${username}`)
            .setImage(`${setImage}`)
            .addFields({
              name: "Solo Normal",
              value: `\`-\` Wins: ${soloNormalWins}\n \`-\` Losses: ${soloNormalLosses}\n \`-\` Kills: ${soloNormalKills}\n \`-\` WLR: ${soloNormalWLR}\n \`-\` KDR: ${soloNormalKDR}\n`,
              inline: true,
            }, {
              name: "Solo Insane",
              value: `\`-\` Wins: ${soloInsaneWins}\n \`-\` Losses: ${soloInsaneLosses}\n \`-\` Kills: ${soloInsaneKills}\n \`-\` WLR: ${soloInsaneWLR}\n \`-\` KDR: ${soloInsaneKDR}\n`,
              inline: true,
            }, {
              name: "Mega",
              value: `\`-\` Wins: ${megaWins}\n \`-\` Losses: ${megaLosses}\n \`-\` Kills: ${megaKills}\n \`-\` Deaths: ${megaDeaths}\n \`-\` WLR: ${megaWLR}\n \`-\` KDR: ${megaKDR}\n`,
              inline: true,
            }, {
              name: "Teams Normal",
              value: `\`-\` Wins: ${teamNormalWins}\n \`-\` Losses: ${teamNormalLosses}\n \`-\` Kills: ${teamNormalKills}\n \`-\` Deaths: ${teamNormalDeaths}\n \`-\` WLR: ${teamNormalWLR}\n \`-\` KDR: ${teamNormalKDR}\n`,
              inline: true,
            }, {
              name: "Teams Insane",
              value: `\`-\` Wins: ${teamInsaneWins}\n \`-\` Losses: ${teamInsaneLosses}\n \`-\` Kills: ${teamInsaneKills}\n \`-\` Deaths: ${teamInsaneDeaths}\n \`-\` WLR: ${teamInsaneWLR}\n \`-\` KDR: ${teamInsaneKDR}\n`,
              inline: true,
            }, {
              name: "Lab",
              value: `\`-\` Wins: ${labWins}\n \`-\` Losses: ${labLosses}\n \`-\` Kills: ${labKills}\n \`-\` Deaths: ${labDeaths}\n \`-\` WLR: ${labWLR}\n \`-\` KDR: ${labKDR}\n`,
              inline: true,
            }, {
              name: "Ranked",
              value: `\`-\` Wins: ${rankedWins}\n \`-\` Losses: ${rankedLosses}\n \`-\` Kills: ${rankedKills}\n \`-\` Deaths: ${rankedDeaths}\n \`-\` WLR: ${rankedWLR}\n \`-\` KDR: ${rankedKDR}\n`,
              inline: true,
            }, {
              name: "Totals",
              value: `\`-\` Wins: ${totalWins}\n \`-\` Losses: ${totalLosses}\n \`-\` Kills: ${totalKills}\n \`-\` Deaths: ${totalDeaths}\n \`-\` WLR: ${totalWLR}\n \`-\` KDR: ${totalKDR}\n`,
              inline: true,
            }, {
              name: "General",
              value: `\`-\` Level: ${totalLevelClean}\n \`-\` Prestige: ${prestige}\n \`-\` Coins: ${totalCoins}\n \`-\` XP: ${seperateXp}\n \`-\` Heads: ${totalHeads}`,
              inline: true,
            }, {
              name: "Experience Progress:",
              value: `${rawXP} / 10,000`,
              inline: true,
            });
          return await interaction.editReply({
            embeds: [above11embed],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return interaction.editReply("**That user does not exist!**");
      });
  }
};