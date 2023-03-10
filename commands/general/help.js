const Command = require("../../structures/CommandClass");
const {
  EmbedBuilder,
  SlashCommandBuilder
} = require("discord.js");
const {
  stripIndents
} = require("common-tags");

module.exports = class Help extends Command {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Returns command information.")
        .setDMPermission(true)
        .addStringOption((str) =>
          str
          .setName("command")
          .setDescription("The command you want to get help for.")
          .setRequired(true)
          .addChoices({
            name: "Help",
            value: "help",
          }, {
            name: "Ping",
            value: "ping",
          }, {
            name: "Geoguessr",
            value: "geo",
          }, {
            name: "Skywars",
            value: "sw",
          }, {
            name: "R6",
            value: "r6",
          }, {
            name: "CSGO",
            value: "csgo",
          })
        ),
      usage: "help <command>",
      category: "Info",
      permissions: ["Use Application Commands", "Send Messages", "Embed Links"],
    });
  }
  async run(client, interaction) {
    const query = interaction.options.getString("command");

    if (query.toLowerCase()) {
      if (client.commands.has(query)) {
        const command = client.commands.get(query);

        const commandEmbed = new EmbedBuilder()
          .setTitle(`**\`${command.name}\`** Command Information`)
          .setThumbnail(
            client.user.displayAvatarURL({
              dynamic: true,
              size: 2048,
            })
          )
          .setColor("#57f287").setDescription(stripIndents `
                    > ${
                      command.contextDescription
                        ? command.contextDescription
                        : command.description
                    }

                    **Usage:** ${
                      command.contextDescription ? "Right-Click > Apps > " : "/"
                    }${command.usage}
                    **Category:** ${command.category}
                    `);
        //**Permissions Needed:** ${command.permissions[0] ? `${command.permissions.join(', ')}` : 'None'}

        await interaction.reply({
          embeds: [commandEmbed],
        });
      } else {
        interaction.reply({
          content: `Command **\`${query}\`** was not found.`,
        });
      }
    }
  }
};