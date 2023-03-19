const PlayerDuel = require("./PlayerDuel");

module.exports = class DuelLobby{
    constructor(user1, user2){
        this.player1 = new PlayerDuel(user1);
        this.player2 = new PlayerDuel(user2);
        this.index = duelLobbies.length;
        this.turn = 0;
        duelLobbies.push(this);
    }
    turnMessage(){
        
        let THROW = new Discord.MessageButton()
            .setLabel("THROW")
            .setStyle("PRIMARY")
            .setCustomId(`throw,${this.index},${this.getPlayerBasedOnTurn().id}`)

        let EAT = new Discord.MessageButton()
            .setLabel("EAT")
            .setStyle("PRIMARY")
            .setCustomId(`eat,${this.index},${this.getPlayerBasedOnTurn().id}`)

        let row = new Discord.MessageActionRow()
            .addComponents(THROW)
            .addComponents(EAT)

        return ({ content: `<@${this.getPlayerBasedOnTurn().id}> turn`, components: [row] });
    }
    getPlayerBasedOnTurn(){
        if(this.turn % 2 == 0){
            return this.player1;
        }
        return this.player2;
    }
    getOpponentBasedOnTurn(){
        if(this.turn % 2 == 0){
            return this.player2;
        }
        return this.player1;
    }
    swapHp(){
        let p1Hp = this.player1.hp;
        this.player1.hp = this.player2.hp;
        this.player2.hp = p1Hp;
    }
}