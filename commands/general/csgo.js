const Command = require('../../structures/CommandClass');
const {
	API
} = require('csgo.js');
const {
	STEAM_TOKEN
} = require('../../keys/csgo.json');

const {
	EmbedBuilder,
	SlashCommandBuilder
} = require('discord.js');
const {
	stripIndents
} = require('common-tags');

function thousands_separators(x) {
	if (typeof x === "string" || typeof x === "number") {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return 0;
}

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			data: new SlashCommandBuilder()
				.setName('csgo')
				.setDescription('Returns CS:GO stats.')
				.setDMPermission(true)
				.addStringOption((option) =>
					option
					.setName("username")
					.setDescription(
						"Steam username"
					)
					.setRequired(true)
				),
			usage: 'csgo <username>',
			category: 'Stats',
			permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
		});
	}
	async run(client, interaction) {
		const name = interaction.options.getString("username");
		await interaction.deferReply();
		var user;

		try {
			user = await API.fetchUser(`${name}`, STEAM_TOKEN);
		} catch (e) {
			return await interaction.followUp({
				content: `User "${name}" not found.`,
				ephemeral: true
			});
		}

		const {
			kills,
			deaths,
			wins,
			matches_played,
			knife_kills,
			headshot_kills,
			shots_hit,
			shots_fired,
			weapons_donated,
			blind_kills,
		} = user.stats();

		const csEmbed = new EmbedBuilder()
			.setTitle(`${name}'s CS:GO Stats`)
			.setFooter({
				text: "[OSS] Tangerine Team, 2023",
				iconURL: "https://raw.githubusercontent.com/tangerine-bot/tangerine/master/tangerine_icon_full.png",
			})
			.setColor([253, 144, 43])
			.addFields({
				name: "General",
				value: `\`-\` Time Played: ${user.stats().time_played.display}\n \`-\` Games Played: ${thousands_separators(matches_played)}\n`,
				inline: true,
			}, {
				name: "K/D",
				value: `\`-\` Kills: ${thousands_separators(kills)}\n \`-\` Deaths: ${thousands_separators(deaths)}\n \`-\` KD: ${thousands_separators((kills/deaths).toFixed(3))}\n`,
				inline: true,
			}, {
				name: "W/L",
				value: `\`-\` Wins: ${thousands_separators(wins)}\n \`-\` Losses: ${thousands_separators(wins - matches_played)}\n \`-\` Winrate: ${(wins/(wins - matches_played)).toFixed(3)}\n`,
				inline: true,
			}, {
				name: "Aim",
				value: `\`-\` Accuracy: ${(shots_hit/shots_fired).toFixed(3)}\n \`-\` Headshot Kills: ${thousands_separators(headshot_kills)}\n \`-\` Headshot Killrate: ${(headshot_kills/kills).toFixed(3)}\n`,
				inline: true,
			}, {
				name: "Other",
				value: `\`-\` Knifes: ${thousands_separators((knife_kills))}\n \`-\` Blind Kills: ${thousands_separators(blind_kills)}\n \`-\` Weapons Donated: ${thousands_separators(weapons_donated)}\n`,
				inline: true,
			});

		return await interaction.followUp({
			embeds: [csEmbed]
		});

	}
};