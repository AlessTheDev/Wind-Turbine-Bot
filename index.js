//npm packages
global.Discord = require("discord.js");
const Discord = require("discord.js");
const fs = require('fs');

//is the bot in maintenance mode?
global.maintenance = false;

//Discord client
global.client = new Discord.Client(
    {
        intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_MESSAGE_REACTIONS"],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    }
);

//Secret vars
client.login(process.env.token); //process.env.token

//Duel Lobbies
global.duelLobbies = [];
//Tris Lobbies
global.trisLobbies = [];

//Commands Handler
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); //Find all files stored in the commands folder

for (const file of commandFiles) {
    var command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Client on ready
client.on("ready", () => {
    console.log("bot online");
    console.log(`Currently in ${client.guilds.cache.size} servers`);

    //Create /commands
    makeCommands();

    //Bot Status
    changeStatus()
});

//Slash commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const { commandName, options } = interaction;

    //interactions with defer reply
    const commandsDeferReply = new Map();

    //Defer reply commands
    commandsDeferReply.set("elegant", false);
    commandsDeferReply.set("wooo", false);
    commandsDeferReply.set("gigachad", false);
    commandsDeferReply.set("gif", false);
    commandsDeferReply.set("duel", true);
    commandsDeferReply.set("tris", true);
    commandsDeferReply.set("reddit", false);

    if (commandsDeferReply.has(commandName)) {
        await interaction.deferReply({
            ephemeral: commandsDeferReply.get(commandName)
        })

        await new Promise(resolve => setTimeout(resolve, 5000))
    }
    if (client.commands.has(commandName)) {
        client.commands.get(commandName).execute(interaction, options);
    }
});


//Timer for triggers
var TriggersTimer = new Map();

//Triggers
client.on("messageCreate", (message) => {
    if (((TriggersTimer.get(message.author.id) + 10000 >= Date.now()) && TriggersTimer.has(message.author.id)) || message.author == client.user) { //if there is a timer it will stop
        console.log("timer");
        return;
    }

    if (message.content.toLowerCase().includes("who asked")) {
        message.channel.send(`https://tenor.com/view/i-asked-meme-gumball-gif-23125464`)
    }

    switch (message.content.toLowerCase()) {
        case "hi":
            message.react("👋");
            break;
        case "sus":
            TriggersTimer.set(message.author.id, Date.now());
            message.channel.send("SUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS SUS SUS SUS");
            break;
        case "didn't ask":
            TriggersTimer.set(message.author.id, Date.now());
            message.channel.send(":pensive:");
            break;

        case "he he he haw":
            TriggersTimer.set(message.author.id, Date.now());
            message.channel.send("https://tenor.com/view/clash-royale-heheheha-grrr-emote-king-gif-24764224");
            break;
        case "hehehehaw":
            TriggersTimer.set(message.author.id, Date.now());
            message.channel.send("https://tenor.com/view/clash-royale-heheheha-grrr-emote-king-gif-24764224");
            break;
        case "heheheha":
            TriggersTimer.set(message.author.id, Date.now());
            message.channel.send("https://tenor.com/view/clash-royale-cr-clash-clash-royale-funny-gif-24102791");
            break;
        case "he he he ha":
            TriggersTimer.set(message.author.id, Date.now());
            message.channel.send("https://tenor.com/view/clash-royale-cr-clash-clash-royale-funny-gif-24102791");
            break;
        case "🗿":
            message.react("🗿");
            break;
        case "ratio":
            message.react("👍");
            break;
        case "kirby wtf":
            TriggersTimer.set(message.author.id, Date.now());
            message.reply("https://cdn.discordapp.com/attachments/930901396453224539/1002671071658512474/output.webm?size=4096");
            break;
        case "based":
            TriggersTimer.set(message.author.id, Date.now());
            message.reply("based? based on what?");
            break;
        case "?😔":
            TriggersTimer.set(message.author.id, Date.now());
            message.reply("pensive secret command😔😔");
            break;
        case "cube":
            TriggersTimer.set(message.author.id, Date.now());
            message.reply("CUBE");
            break;
    }
    const content = ["no u", "😏", "😔"];
    const response = ["no u", ":smirk:", ":pensive:"]
    if (message.mentions.users.first() == client.user) {
        for (let i = 0; i < content.length; i++) {
            if (message.content.includes(content[i])) {
                message.reply(response[i]);
                break;
            }
        }
    }
});

//Make commands
async function makeCommands() {

    const data = [
        {
            name: "rate",
            description: "rate something",
            options: [
                {
                    name: "something",
                    description: "What do you want to rate",
                    required: false,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
            ]
        },
        {
            name: "help",
            description: "help menu",
        },
        {
            name: "elegant",
            description: "Image with avatar",
            options: [
                {
                    name: "user",
                    description: "user of the image",
                    required: false,
                    type: Discord.Constants.ApplicationCommandOptionTypes.USER,
                },
            ]
        },
        {
            name: "wooo",
            description: "penguinz0 image with your avatar",
            options: [
                {
                    name: "user",
                    description: "user of the image",
                    required: false,
                    type: Discord.Constants.ApplicationCommandOptionTypes.USER,
                },
            ]
        },
        {
            name: "gigachad",
            description: "be a gigachad",
            options: [
                {
                    name: "user",
                    description: "user of the image",
                    required: false,
                    type: Discord.Constants.ApplicationCommandOptionTypes.USER,
                },
            ]
        },
        {
            name: "tris",
            description: "play tic tac toe with someone",
            options: [
                {
                    name: "user",
                    description: "user to duel",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.USER,
                },
            ]
        },
        {
            name: "duel",
            description: "play a minigame with someone",
            options: [
                {
                    name: "user",
                    description: "user to duel",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.USER,
                },
            ]
        },
        {
            name: "8ball",
            description: "ask something to wind turbine",
            options: [
                {
                    name: "something",
                    description: "what do you want to ask?",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
            ]
        },
        {
            name: "gif",
            description: "create a gif",
            options: [
                {
                    name: "message",
                    description: "your message",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
            ]
        },
        {
            name: "choose",
            description: "let wind turbine choose something",
            options: [
                {
                    name: "option1",
                    description: "enter an option",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
                {
                    name: "option2",
                    description: "enter an option",
                    required: true,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
                {
                    name: "option3",
                    description: "enter an option",
                    required: false,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
                {
                    name: "option4",
                    description: "enter an option",
                    required: false,
                    type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
                },
            ]
        },
        {
            name: "reddit",
            description: "get something from reddit",
            options: [
                {
                    name: "subreddit",
                    description: "choose a subreddit",
                    required: true,
                    choices: [
                        {
                            name: "meme",
                            value: "meme"
                        },
                        {
                            name: "memes",
                            value: "memes"
                        },
                        {
                            name: "programmermeme",
                            value: "programmermeme"
                        },
                        {
                            name: "cats",
                            value: "cats"
                        },
                        {
                            name: "food",
                            value: "food"
                        },
                        {
                            name: "unexpected",
                            value: "unexpected"
                        }
                    ],
                    type: 3,

                },
            ],
        },
    ]
    client.application.commands.set(data);
}

//Help menu
client.on("interactionCreate", interaction => {
    if (!interaction.isSelectMenu()) return;
    client.commands.get("help").changeMenu(interaction);
});

//Tris Join
client.on("interactionCreate", interaction => {
    if (!interaction.isButton() || interaction.customId.startsWith("data")) {
        return;
    }
    if (interaction.customId.startsWith("trisJoin")) {
        let lobby = interaction.customId.split(",")[1];

        client.commands.get("tris").join(interaction, lobby);
    }
})

//Reddit delete button
client.on("interactionCreate", interaction => {
    if (!interaction.isButton() || !interaction.customId.startsWith("delete")) {
        return;
    }
    client.commands.get("reddit").delete(interaction);
})

//Tris play
client.on("interactionCreate", interaction => {
    if (!interaction.isButton()) {
        return;
    }
    let lobby = trisLobbies[interaction.customId.split(",")[1]];
    let isInteraction = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (!isInteraction.includes(interaction.customId.split(",")[0]) || interaction.customId.includes("trisJoin")) {
        return;
    }
    console.log(lobby.getPlayerBasedOnTurn().id)
    if (interaction.user.id != lobby.getPlayerBasedOnTurn().id) {
        return interaction.reply({ content: "wait your turn", ephemeral: true });
    }

    client.commands.get("tris").buttonPressed(interaction, lobby.index);

})

//Duel join button
client.on("interactionCreate", interaction => {
    if (!interaction.isButton()) {
        return;
    }
    let lobby = interaction.customId.split(",")[1];
    if (interaction.customId.startsWith("duelJoin")) {
        client.commands.get("duel").join(interaction, lobby);
    }
})

//Throw and eat
client.on("interactionCreate", interaction => {
    if (!interaction.isButton()) {
        return;
    }

    if (interaction.customId.startsWith("throw")) {
        let lobby = interaction.customId.split(",")[1];
        client.commands.get("duel").throw(interaction, lobby);
    }
    if (interaction.customId.startsWith("eat")) {
        let lobby = interaction.customId.split(",")[1];
        client.commands.get("duel").eat(interaction, lobby);
    }
})

//Change Status
function changeStatus() {
    const playing = ["?help", "/help", "sus"];
    currentlyPlaying = random(playing.length);

    if (maintenance) {
        client.user.setActivity(`maintenance!!!!`);
        client.user.setStatus("dnd")
    } else {
        client.user.setActivity(`${playing[currentlyPlaying]}`);
        client.user.setStatus("online")
    }
    setTimeout(function () {
        changeStatus();
    }, 360000);
}

//Random
global.random = function (maxLength) {
    return Math.floor(Math.random() * maxLength)
}
