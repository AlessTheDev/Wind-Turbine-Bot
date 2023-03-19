const PlayerTris = require("./PlayerTris");

module.exports = class TrisLobby {
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