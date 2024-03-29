const Command = require('../../structures/CommandClass');

const {
	EmbedBuilder,
	SlashCommandBuilder
} = require('discord.js');
const {
	stripIndents
} = require('common-tags');
module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('ping')
				.setDescription('Returns the bot ping.')
				.setDMPermission(true),
			usage: 'ping',
			category: 'Info',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const now = Date.now();
		await interaction.deferReply();

		const pingEmbed = new EmbedBuilder()
			.setColor([253, 144, 43])
			.setFooter({
				text: "[OSS] Tangerine Team, 2023",
				iconURL: "https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon_full.png",
			})
			.setDescription(stripIndents `
            **Roundtrip:** ${Math.round(Date.now() - now)} ms
            **API:** ${Math.round(client.ws.ping)} ms
            `);

		return await interaction.followUp({
			embeds: [pingEmbed]
		});
	}
};