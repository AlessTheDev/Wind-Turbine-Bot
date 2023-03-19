module.exports = class PlayerTris{
    constructor(user){
        this.id = user.id;
        this.username = user.username;
        this.avatar = user.displayAvatarURL({ format: "png", size: 1024 });
        this.hp = 100;
    }
}