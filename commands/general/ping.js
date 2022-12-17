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
			.setColor([45, 70, 163])
			.setFooter({
				text: 'Created by alt#0001 for the Extorious Guild. 2022.',
				iconURL: 'https://cdn.discordapp.com/avatars/680525837334085658/65909733c50e0eba2c22a3d519aef39b.png'
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