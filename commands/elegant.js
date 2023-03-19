const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");


module.exports = {
    name: "elegant",
    description: "",
    async execute(interaction, args, isInteraction) {
        if (!args.getUser("user")) {
            interaction.editReply({files: [await elegantImage(interaction.user)]});
        } else {
            interaction.editReply({files: [await elegantImage(args.getUser("user"))]});
        }
    }
}


async function elegantImage(user) {
    const canvas = Canvas.createCanvas(474, 474);
    const context = canvas.getContext('2d');
    canvas.context.beginPath()
    canvas.context.arc(300, 10, 1000, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage("https://cdn.discordapp.com/attachments/911593422853394452/1001072771301900348/img.png")
        .then(async img => {
            canvas.context.drawImage(img, 0, 0, 474, 474);
        })
    await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 1024 }))
        .then(async img => {
            canvas.context.drawImage(img, 200, 30, 100, 100);
        })
    let atta = new MessageAttachment(canvas.toBuffer(), `funnyImage.png`);
    return atta;
}