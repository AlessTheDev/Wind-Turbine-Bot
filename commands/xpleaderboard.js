module.exports = {
    name: "xpleaderboard",
    description: "",
    execute(messageSend, args, isInteraction, deferReply) {
        getDatabaseInfoInServer(function (leaderboard) {
            const sortedLeaderboard = new Map([...leaderboard].sort((a, b) => b[1] - a[1])); //I had no idea on how to sort an hashmap
            const first = Array.from(sortedLeaderboard.keys())[0]; 
            const second = Array.from(sortedLeaderboard.keys())[1]; 
            const third = Array.from(sortedLeaderboard.keys())[2]; 
            const lb = new Discord.MessageEmbed()
            .setTitle(`${messageSend.guild.name} Leaderboard`)
            .setDescription('Top 3')
            .addFields(
                { name: `1 - ${first}`, value: `${sortedLeaderboard.get(first)}` },
                { name: `2 - ${second}`, value: `${sortedLeaderboard.get(second)}` },
                { name: `3 - ${third}`, value: `${sortedLeaderboard.get(third)}` },
            )
            .setFooter({ text: `you are: #${Array.from(sortedLeaderboard.keys()).indexOf(messageSend.author.username) + 1} with ${sortedLeaderboard.get(messageSend.author.username)}xp`})
            .setTimestamp()
            messageSend.reply({ embeds: [lb] });
        });
    }
}