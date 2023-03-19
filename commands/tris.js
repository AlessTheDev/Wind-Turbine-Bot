class TrisLobby {
    constructor(user1, user2) {
        this.player1 = new PlayerTris(user1);
        this.player2 = new PlayerTris(user2);
        this.index = trisLobbies.length;
        this.data = "000000000";
        this.turn = 1;
        trisLobbies.push(this);
    }
    getPlayerBasedOnTurn() {
        if (this.turn == 1) {
            return this.player1;
        }
        return this.player2;
    }
    getPlayerEmojiBasedOnTurn() {
        if (this.turn == 2) {
            return "❌";
        }
        return "⭕";
    }
    updateTurn() {
        if (this.turn == 1) {
            this.turn = 2;
        } else {
            this.turn = 1;
        }
    }
    getButtonsArray() {
        return [
            new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`1,${this.index}`),
         new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`2,${this.index}`),
         new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`3,${this.index}`),
        new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`4,${this.index}`),
         new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`5,${this.index}`),
         new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`6,${this.index}`),
        new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`7,${this.index}`),
        new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`8,${this.index}`),
        new Discord.MessageButton()
                .setEmoji("<:blank:991999971299704913>")
                .setStyle("SECONDARY")
                .setCustomId(`9,${this.index}`),
        ]
    }
    getButtons() {
        var one = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`1,${this.index}`)
        var two = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`2,${this.index}`)
        var three = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`3,${this.index}`)
        let four = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`4,${this.index}`)
        var five = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`5,${this.index}`)
        var six = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`6,${this.index}`)
        var seven = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`7,${this.index}`)
        var eight = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`8,${this.index}`)
        var nine = new Discord.MessageButton()
            .setEmoji("<:blank:991999971299704913>")
            .setStyle("SECONDARY")
            .setCustomId(`9,${this.index}`)
        let row1 = new Discord.MessageActionRow()
            .addComponents(one)
            .addComponents(two)
            .addComponents(three)
        let row2 = new Discord.MessageActionRow()
            .addComponents(four)
            .addComponents(five)
            .addComponents(six)
        let row3 = new Discord.MessageActionRow()
            .addComponents(seven)
            .addComponents(eight)
            .addComponents(nine)
        return [row1, row2, row3];
    }

    turnMessage() {

        return ({ content: `<@${this.getPlayerBasedOnTurn().id}> turn`, components: this.getButtons() });
    }

    checkWin() {
        const winPossibilityOne = [0, 3, 6];
        const winPossibilityTwo = [0, 1, 2];
        for (let i = 0; i < 9; i++) {
            if ((this.data.charAt(i) == this.turn && this.data.charAt(i + 1) == this.turn && this.data.charAt(i + 2) == this.turn) && winPossibilityOne.includes(i)) {
                return true;
            } else if ((this.data.charAt(i) == this.turn && this.data.charAt(i + 3) == this.turn && this.data.charAt(i + 6) == this.turn) && winPossibilityTwo.includes(i)) {
                return true;
            } else if ((this.data.charAt(i) == this.turn && this.data.charAt(i + 4) == this.turn && this.data.charAt(i + 8) == this.turn) && i == 0) {
                return true;
            } else if ((this.data.charAt(i) == this.turn && this.data.charAt(i + 2) == this.turn && this.data.charAt(i + 4) == this.turn) && i == 2) {
                return true;
            }
        }

        return false;
    }
    checkDraw() {
        for (let i = 0; i < 9; i++) {
            if (this.data.charAt(i) == 0) {
                return false;
            }
        }
        return true;
    }
}
class PlayerTris{
    constructor(user){
        this.id = user.id;
        this.username = user.username;
        this.avatar = user.displayAvatarURL({ format: "png", size: 1024 });
        this.hp = 100;
    }
}

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
