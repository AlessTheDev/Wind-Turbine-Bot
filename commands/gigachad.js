const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");


module.exports = {
    name: "gigachad",
    description: "",
    async execute(interaction, args) {
        if (!args.getUser("user")) {
            interaction.editReply({ files: [await elegantImage(interaction.user)] });
        } else {
            interaction.editReply({ files: [await elegantImage(args.getUser("user"))] });
        }
    }
}

async function elegantImage(user) {
    var canvas;
    canvas = Canvas.createCanvas(680, 760);
    const context = canvas.getContext('2d');
    canvas.context.beginPath()
    canvas.context.arc(300, 10, 3000, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage("https://cdn.discordapp.com/attachments/870287873075728385/1011588247887020123/Screenshot_2022-08-23_at_12-50-21_834.webp_immagine_WEBP_680_760_pixel.png")
        .then(async img => {
            canvas.context.drawImage(img, 0, 0, 680, 760);
        })
    await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 1024 }))
        .then(async img => {
            canvas.context.drawImage(img, 230, 100, 100, 100);
        })

    let atta = new MessageAttachment(canvas.toBuffer(), `funnyImage.png`);
    return atta;
}