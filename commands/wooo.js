const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");


module.exports = {
    name: "wooo",
    description: "",
    async execute(interaction, args) {
        if (!args.getUser("user")) {
            interaction.editReply({files: [await wooImage(interaction.user)]});

        } else {
            interaction.editReply({files: [await wooImage(interaction.user)]});
        }
    }
}

async function wooImage(user, sendMessage) {
    console.log("function")
    const canvas = Canvas.createCanvas(320, 180);
    const context = canvas.getContext('2d');
    canvas.context.beginPath()
    canvas.context.arc(300, 10, 1000, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(`https://cdn.discordapp.com/attachments/911593422853394452/1001154504932200468/wooo.jpg`)
        .then(async img => {
            canvas.context.drawImage(img, 0, 0, 320, 180);
        })
    await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 1024 }))
        .then(async img => {
            canvas.context.drawImage(img, 135, 35, 50, 50);
        })
    let atta = new MessageAttachment(canvas.toBuffer(), `funnyImage.png`)
    return atta;
}