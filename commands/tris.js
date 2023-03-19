const TrisLobby = require("./TrisLobby.js");

module.exports = {
    name: "tris",
    description: "",
    execute(interaction, args) {
        let lobby = createLobby(interaction.user, args.getUser("user"));
        if (typeof lobby === 'string' || lobby instanceof String) {
            interaction.editReply(lobby)
            return;
        }
        interaction.editReply("Lobby created");

        let JOIN = new Discord.MessageButton()
            .setLabel("JOIN")
            .setStyle("PRIMARY")
            .setCustomId(`trisJoin,${lobby.index}`)
        let row = new Discord.MessageActionRow()
            .addComponents(JOIN)
        interaction.channel.send({ content: `<@${lobby.player2.id}> click the button to play tic tac toe with <@${lobby.player1.id}>'`, components: [row] })
    },
    join(interaction, lobbyIndex) {
        lobby = trisLobbies[lobbyIndex];
        if (interaction.user.id != lobby.player2.id) return interaction.reply({ content: "you can't join this lobby", ephemeral: true });
        interaction.reply("you joined, if it says interaction failed just click again");
        interaction.message.edit(lobby.turnMessage())
    },
    buttonPressed(interaction, lobbyIndex) {
        let lobby = trisLobbies[lobbyIndex];
        lobby.data = lobby.data.replaceAt(parseInt(interaction.customId.split(",")[0]) - 1, lobby.turn.toString());
        updateButtons(interaction, lobbyIndex);
    }
}

function createLobby(Player1, Player2) {
    if (Player2 == undefined) {
        return "Who do you want to duel??? mention a user lmao";
    }
    if (Player1.id == Player2.id) {
        return "no, ping someone else to play tris";
    }
    if (Player2.id == client.user.id) {
        return "Maybe in the future :smirk:";
    }
    return new TrisLobby(Player1, Player2)
}

function updateButtons(interaction, lobbyIndex) {
    lobby = trisLobbies[lobbyIndex];
    var buttons = lobby.getButtonsArray();

    for (let i = 0; i < 9; i++) {
        if (lobby.data.charAt(i) != 0) {
            buttons[i].setDisabled(true);
            if (lobby.data.charAt(i) == 2) {
                buttons[i].setEmoji("❌");
            } else {
                buttons[i].setEmoji("⭕");
            }

        }

    }
    let row1 = new Discord.MessageActionRow()
        .addComponents(buttons[0])
        .addComponents(buttons[1])
        .addComponents(buttons[2])
    let row2 = new Discord.MessageActionRow()
        .addComponents(buttons[3])
        .addComponents(buttons[4])
        .addComponents(buttons[5])
    let row3 = new Discord.MessageActionRow()
        .addComponents(buttons[6])
        .addComponents(buttons[7])
        .addComponents(buttons[8])
    interaction.message.edit({ components: [row1, row2, row3] });
    if (lobby.checkWin()) {
        interaction.reply({ content: `<@${lobby.getPlayerBasedOnTurn().id}> won` });
        interaction.message.edit(`<@${lobby.getPlayerBasedOnTurn().id}> won`);
        return;
    }

    interaction.deferUpdate();
    if (lobby.checkDraw()) {
        interaction.message.edit({ content: `nobody won` });
        return;
    }
    lobby.updateTurn();
    interaction.message.edit({ content: `<@${lobby.getPlayerBasedOnTurn().id}> (${lobby.getPlayerEmojiBasedOnTurn()}) turn` });
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
