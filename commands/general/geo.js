const Command = require("../../structures/CommandClass");
const {
  EmbedBuilder,
  SlashCommandBuilder
} = require("discord.js");
const gis = require("g-i-s");
const country_list_easy = require("../../keys/geo/easy.json");
const country_list_medium = require("../../keys/geo/medium.json");
const country_list_hard = require("../../keys/geo/hard.json");
const state_list = require("../../keys/geo/states.json");
const landmark_list = require("../../keys/geo/landmarks.json");
module.exports = class geo extends Command {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
        .setName("geo")
        .setDescription("Mini Geoguessr!")
        .setDMPermission(true)
        .addStringOption((option) =>
          option
          .setName("gamemode")
          .setDescription(
            "Choose which game mode you want to play! Easy is top 25, medium is top 50, and hard is top 100!"
          )
          .setRequired(true)
          .addChoices({
            name: "Easy",
            value: "Easy",
          }, {
            name: "Medium",
            value: "Medium",
          }, {
            name: "Hard",
            value: "Hard",
          }, {
            name: "States",
            value: "States",
          }, {
            name: "Landmarks",
            value: "Landmarks",
          })
        ),
      usage: "geo",
      category: "Minigames",
      permissions: ["Use Application Commands", "Send Messages", "Embed Links"],
    });
  }

  async run(client, interaction) {
    await interaction.deferReply();
    const gamemode = interaction.options.getString("gamemode");
    const filter = (m) => !m.author.bot;
    var region;
    var regionType;
    var imageType;

    if (`${gamemode}` === "Easy") {
      regionType = "country";
      imageType = "scenery";
      region =
        country_list_easy[Math.floor(Math.random() * country_list_easy.length)];
    } else if (`${gamemode}` === "Medium") {
      regionType = "country";
      imageType = "scenery";
      region =
        country_list_medium[
          Math.floor(Math.random() * country_list_medium.length)
        ];
    } else if (`${gamemode}` === "Hard") {
      regionType = "country";
      imageType = "scenery";
      region =
        country_list_hard[Math.floor(Math.random() * country_list_hard.length)];
    } else if (`${gamemode}` === "States") {
      regionType = "American state";
      imageType = "scenery";
      region = state_list[Math.floor(Math.random() * state_list.length)];
    } else if (`${gamemode}` === "Landmarks") {
      regionType = "location";
      imageType = "photographs";
      region = landmark_list[Math.floor(Math.random() * landmark_list.length)];
    }

    console.log(`The ${regionType} is: ${region}`);
    var correctGuess = false;

    async function logResults(e, res) {
      if (e) {
        console.log(e);
      } else {
        const imageEmbed = new EmbedBuilder()
          .setColor([253, 144, 43])
          .setTitle(`What ${regionType} is this? You have 45 seconds!`)
          .setDescription(`Game mode: **${gamemode}**`)
          .setImage(`${res[0].url}`);
        await interaction.followUp({
          embeds: [imageEmbed],
        });
      }
    }

    await gis(`${imageType} of ${region}`, logResults);

    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 45000,
    });

    collector.on("collect", (m) => {
      if (`${m.content.toLowerCase()}` == region.toLowerCase()) {
        correctGuess = true;
        m.reply("You are correct!");
        collector.stop();
      }
    });

    collector.on("end", (collected) => {
      if (correctGuess == false) {
        interaction.followUp(`Time's up! The answer is **${region}**!`);
      }
    });
  }
};