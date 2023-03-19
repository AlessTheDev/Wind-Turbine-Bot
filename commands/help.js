const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    description: "",
    execute(messageSend, args) {
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Command list')
            .setImage("https://media.discordapp.net/attachments/899656353470087178/982296948629463080/white-abstract-background_23-2148806276.jpg?width=1440&height=570")
            .setDescription('Select a page to see the commands!')
            .setTimestamp()
            .setFooter({ text: 'WindTurbine', iconURL: 'https://images-ext-2.discordapp.net/external/y29KGAnbMYLa35F5sNXvwn4aN3w0yzsYXzQzUf1VEuc/%3Fsize%3D256/https/cdn.discordapp.com/avatars/974007703057883197/01041d7692f5cd5de14705a16e251418.png' });
        let commandList = new Discord.MessageSelectMenu()
            .setCustomId("helpMenu")
            .setPlaceholder("select an option")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: "Funny commands",
                    description: "Funny commands you can use",
                    value: "funnyCommands"
                },
                {
                    label: "Mini games",
                    description: "Funny commands you can use",
                    value: "miniGames"
                },
                {
                    label: "New commands",
                    description: "Check the last commands",
                    value: "newCommands"
                }
            ])
        let INVITE = new Discord.MessageButton()
            .setLabel("INVITE ME")
            .setStyle("LINK")
            .setURL("https://top.gg/bot/974007703057883197/invite")
        let row = new Discord.MessageActionRow()
            .addComponents(INVITE)
        let row1 = new Discord.MessageActionRow()
            .addComponents(commandList)

        messageSend.reply({ embeds: [exampleEmbed], components: [row1, row] });

    },
    changeMenu(interaction) {
        const funnyCommands = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Funny commands')
            .setDescription('List of funny commands')
            .addFields(
                { name: '/rate', value: 'rate something' },
                { name: '/choose', value: 'let the bot decide' },
                { name: '/8ball', value: 'Ask something to the bot' },
                { name: '/elegant', value: 'a funny image with your avatar' },
                { name: '/wooo', value: 'a funny image with your avatar' },
                { name: '/gif', value: 'make a gif!' },
                { name: '/meme', value: 'a meme' },
                { name: '/reddit', value: 'a meme' },
            )
            .setTimestamp()
            .setFooter({ text: 'WindTurbine', iconURL: 'https://images-ext-2.discordapp.net/external/y29KGAnbMYLa35F5sNXvwn4aN3w0yzsYXzQzUf1VEuc/%3Fsize%3D256/https/cdn.discordapp.com/avatars/974007703057883197/01041d7692f5cd5de14705a16e251418.png' });
        const miniGames = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Mini games')
            .setDescription('List of funny commands')
            .addFields(
                { name: '/duel', value: 'a game where you have to throw or eat objects to someone else lol' },
                { name: '/tris', value: 'play tic tac toe with someone' },
            )
            .setTimestamp()
            .setFooter({ text: 'WindTurbine', iconURL: 'https://images-ext-2.discordapp.net/external/y29KGAnbMYLa35F5sNXvwn4aN3w0yzsYXzQzUf1VEuc/%3Fsize%3D256/https/cdn.discordapp.com/avatars/974007703057883197/01041d7692f5cd5de14705a16e251418.png' });
        const newCommands = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('NewCommands')
            .setDescription('List of the new commands')
            .addFields(
                { name: '?support', value: 'if you need support from the official server' },
            )
            .setTimestamp()
            .setFooter({ text: 'WindTurbine', iconURL: 'https://images-ext-2.discordapp.net/external/y29KGAnbMYLa35F5sNXvwn4aN3w0yzsYXzQzUf1VEuc/%3Fsize%3D256/https/cdn.discordapp.com/avatars/974007703057883197/01041d7692f5cd5de14705a16e251418.png' });
        if (interaction.customId == "helpMenu") {
            interaction.deferUpdate();
            switch (interaction.values[0]) {
                case "funnyCommands":
                    interaction.message.edit({ embeds: [funnyCommands] });
                    break;
                case "miniGames":
                    interaction.message.edit({ embeds: [miniGames] });
                    break;
                case "newCommands":
                    interaction.message.edit({ embeds: [newCommands] });
                    break;
            }
        }
    }
}
