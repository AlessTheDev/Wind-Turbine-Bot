const GIFEncoder = require('gifencoder');
const fs = require('fs');
const Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");

registerFont('../Roboto-Black.ttf', { family: 'Roboto' })

module.exports = {
    name: "gif",
    description: "",
    async execute(interaction, args) {
        interaction.editReply({files: [await MakeGif(args.getString("message"))]});
    }
}

async function MakeGif(text) {
    const encoder = new GIFEncoder(1080, 720);
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(100);  // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.

    // use node-canvas
    const canvas = Canvas.createCanvas(1080, 720);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'
    ctx.font = '35px Roboto'
    await Canvas.loadImage(`https://media.discordapp.net/attachments/899656353470087178/991265640230948935/Screenshot_2022-06-28_at_10-50-34_Objection_1.png`)
        .then(async img => {
            canvas.context.drawImage(img, 0, 0, 1080, 720);
        })
    ctx.fillText(text.replace(/.{66}/g, '$&-\n'), 5, 580)
    encoder.addFrame(ctx);

    ctx.font = '35px Roboto'
    await Canvas.loadImage(`https://media.discordapp.net/attachments/899656353470087178/991265639912177724/Screenshot_2022-06-28_at_10-50-25_Objection.png`)
        .then(async img => {
            canvas.context.drawImage(img, 0, 0, 1080, 720);
        })
    ctx.fillText(text.replace(/.{66}/g, '$&-\n'), 5, 580)
    encoder.addFrame(ctx);
    encoder.addFrame(ctx);

    encoder.finish();

    let atta = new MessageAttachment("./myanimated.gif")
    return atta;
}