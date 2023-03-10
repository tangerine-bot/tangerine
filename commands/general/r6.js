const Command = require('../../structures/CommandClass');
const R6 = require('r6s-stats-api');

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
				.setName('r6')
				.setDescription('Returns R6 stats.')
				.setDMPermission(true)
				.addStringOption((option) =>
					option
					.setName("username")
					.setDescription(
						"Ubisoft username"
					)
					.setRequired(true)
				)
				.addStringOption((option) =>
					option
					.setName("platform")
					.setDescription(
						"Platform to check stats of"
					)
					.setRequired(true)
					.addChoices({
						name: "PC",
						value: "pc",
					}, {
						name: "XBOX",
						value: "xbox",
					}, {
						name: "PSN",
						value: "psn",
					})
				),
			usage: 'r6 <username> <platform>',
			category: 'Stats',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const name = interaction.options.getString("username");
		const platform = interaction.options.getString("platform");

		await interaction.deferReply();

		async function main() {
			let general = await R6.general(platform, name);
			const r6Embed = new EmbedBuilder()
				.setTitle(`${general.name}'s R6 Stats`)
				.setThumbnail(general.header)
				.setFooter({
					text: "[OSS] Tangerine Team, 2023",
					iconURL: "https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon_full.png",
				})
				.setColor([253, 144, 43])
				.addFields({
					name: "General",
					value: `\`-\` Level: ${general.level}\n \`-\` Time Played: ${general.time_played}\n \`-\` Games Played: ${general.matches_played}\n`,
					inline: true,
				}, {
					name: "K/D",
					value: `\`-\` Kills: ${general.kills}\n \`-\` Deaths: ${general.deaths}\n \`-\` KD: ${general.kd}\n`,
					inline: true,
				}, {
					name: "W/L",
					value: `\`-\` Wins: ${general.wins}\n \`-\` Losses: ${general.losses}\n \`-\` Winrate: ${general.win_}\n`,
					inline: true,
				}, {
					name: "Headshots",
					value: `\`-\` Headshots: ${general.headshots}\n \`-\` Headshot Rate: ${general.headshot_}\n`,
					inline: true,
				}, {
					name: "Other",
					value: `\`-\` Knifes: ${general.melee_kills}\n \`-\` Blind Kills: ${general.blind_kills}\n`,
					inline: true,
				});

			return await interaction.followUp({
				embeds: [r6Embed]
			});
		};

		main();
	}
};