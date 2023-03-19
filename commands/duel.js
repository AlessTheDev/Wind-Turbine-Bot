const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");
const DuelLobby = require("./duelLobby.js");
const DuelObject = require("./DuelObject.js");

const objects = [
    new DuelObject("knife :knife:", 25, -5),
    new DuelObject("wind turbine", 30, 30),
    new DuelObject("rock :rock:", 10, 10),
    new DuelObject("toilet paper:roll_of_paper:", 5, 10),
    new DuelObject("duck:duck:", 5, -5),
    new DuelObject("creeper", 40, -15),
    new DuelObject("pasta:spaghetti:", 10, 40),
    new DuelObject("pizza with pineapple", 40, -30),
    new DuelObject("pizza:pizza:", 10, 30),
    new DuelObject("donut", 10, 10)
]

module.exports = {
    name: "duel",
    description: "",
    async execute(interaction, args) {
        interaction.editReply("I'm creating the lobby...");
        let lobby = createLobbyDuel(interaction.user, args.getUser("user"));
        if (lobby == "you can't duel yourself" || lobby == "you can't duel wind turbine (yet :smirk:)") {
            interaction.editReply(lobby);
            return;
        }
        interaction.editReply("Lobby created!");
        let JOIN = new Discord.MessageButton()
            .setLabel("JOIN")
            .setStyle("PRIMARY")
            .setCustomId(`duelJoin,${lobby.index}`)
        let row = new Discord.MessageActionRow()
            .addComponents(JOIN)

        interaction.channel.send({ content: `<@${lobby.player2.id}> click the button to join`, components: [row], files: [await duelImage(lobby.player1, lobby.player2)] })
            .then(msg => {
                let filter = (interaction) => interaction.customId === "button";
                let collector = msg.createMessageComponentCollector({ filter, time: 15_000 });
                collector.on("end", collected => msg.delete());
            });

    },
    join(interaction, lobby) {
        if (interaction.user.id != duelLobbies[lobby].player2.id) return;
        interaction.deferUpdate();
        interaction.channel.send("*Let's start the game* \n**How to play**\nI will pick a misterious object and you can decide if throw it to your opponent or eat it\n");
        TurnDuel(lobby, interaction);
        let JOIN = new Discord.MessageButton()
            .setLabel("JOINED")
            .setStyle("PRIMARY")
            .setCustomId(`duelJoin`)
            .setDisabled(true)
        let row = new Discord.MessageActionRow()
            .addComponents(JOIN)
        interaction.message.edit({ components: [row] });
    },
    throw(interaction, lobbyIndex) {
        let object = objects[random(objects.length - 1)];
        let lobby = duelLobbies[lobbyIndex];

        if (interaction.user.id != lobby.getPlayerBasedOnTurn().id) return interaction.reply({ content: "action failed", ephemeral: true });
        interaction.deferUpdate();

        interaction.message.channel.send(`you threw a ${object.name}, damage: ${object.damage}`);

        lobby.getOpponentBasedOnTurn().hp -= object.damage;

        if (lobby.getOpponentBasedOnTurn().hp <= 0) {
            interaction.channel.send(`<@${lobby.getPlayerBasedOnTurn().id}> won`);
        } else {
            interaction.channel.send(`<@${lobby.player1.id}> Hp: ${lobby.player1.hp}\n<@${lobby.player2.id}> Hp: ${lobby.player2.hp}`);
            lobby.turn++;
            TurnDuel(lobby.index, interaction);
        }

        setTimeout(function () {
            interaction.message.delete();
        }, 1000);
    },
    eat(interaction, lobbyIndex) {
        let lobby = duelLobbies[lobbyIndex];
        let object = objects[random(objects.length - 1)];

        if (interaction.user.id != lobby.getPlayerBasedOnTurn().id) return interaction.reply({ content: "action failed", ephemeral: true });
        interaction.deferUpdate();
        
        if (random(100) <= 20) {
            interaction.channel.send(`you found the LEGENDARY **uno reverse card**`);
            lobby.swapHp();
        } else {
            interaction.channel.send(`you ate a ${object.name}, ${object.hpRecover} hp`);

            lobby.getPlayerBasedOnTurn().hp += object.hpRecover;
        }

        if (lobby.getPlayerBasedOnTurn().hp <= 0) {
            interaction.channel.send(`<@${lobby.getOpponentBasedOnTurn()}> won`);
        } else {
            lobby.turn++;
            TurnDuel(lobby.index, interaction);
            interaction.channel.send(`<@${lobby.player1.id}> Hp: ${lobby.player1.hp}\n<@${lobby.player2.id}> Hp: ${lobby.player2.hp}`);
        }
        setTimeout(function () {
            interaction.message.delete();
        }, 1000);
    }
}

function createLobbyDuel(Player1, Player2) {
    if (Player1.id == Player2.id) {
        return "you can't duel yourself";
    }
    if (Player2.id == client.user.id) {
        return "you can't duel wind turbine (yet :smirk:)";
    }
    return new DuelLobby(Player1, Player2)
}

async function duelImage(Player1, Player2) {
    const canvas = Canvas.createCanvas(1280, 720);
    const context = canvas.getContext('2d');
    canvas.context.beginPath()
    canvas.context.arc(0, 0, 300000, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911593422853394452/1002590838414643310/duel.png`)
        .then(async img => {
            canvas.context.drawImage(img, 0, 0, 1280, 720);
        })

    await Canvas.loadImage(Player1.avatar)
        .then(async img => {
            canvas.context.drawImage(img, 800, 145, 170, 170);
        })
    try {
        await Canvas.loadImage(Player2.avatar)
            .then(async img => {

                canvas.context.drawImage(img, 250, 145, 170, 170);

            })
    } catch (error) { }

    let atta = new Discord.MessageAttachment(canvas.toBuffer(), `duel.png`)
    return atta;
}

function TurnDuel(lobbyIndex, interaction) {
    interaction.channel.send(duelLobbies[lobbyIndex].turnMessage())

}