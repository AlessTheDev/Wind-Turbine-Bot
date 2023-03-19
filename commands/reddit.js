const redditFetch = require('reddit-fetch');

module.exports = {
    name: "reddit",
    description: "",
    async execute(interaction, args) {
        let errors = false;
        getFromReddit(args.get("subreddit").value, interaction.user, interaction);

    },
    delete(interaction) {
        let userId = interaction.customId.split(",")[1];

        if (interaction.customId.startsWith("delete") && !interaction.customId.startsWith("deleteData")) {
            console.log(interaction.customId);
            if (interaction.user.id != userId) { interaction.reply({ content: "no", ephemeral: true }); return; };
            interaction.deferUpdate();
            interaction.message.delete();
        }
    },

}

async function getFromReddit(command, messageAuthor, interaction) {
    console.log("getFromReddit")

    switch (command) {
        case "meme":
            console.log("meme");
            redditFetch({
                subreddit: 'meme',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: false
            }).then(async post => {
                let result = await postCheck(post, messageAuthor);

                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }

            });
            break;
        case "memes":
            redditFetch({
                subreddit: 'memes',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: false
            }).then(async post => {
                let result = await postCheck(post, messageAuthor);
                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }
            });
            break;
        case "amogus":
            redditFetch({
                subreddit: 'amogus',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: true
            }).then(async post => {
                let result = await postCheck(post, messageAuthor);
                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }
            });
            break;
        case "cats":
            redditFetch({
                subreddit: 'cats',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: true

            }).then(async post => {
                let result = await postCheck(post, messageAuthor);
                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }
            });
            break;
        case "food":
            redditFetch({
                subreddit: 'food',
                sort: 'Top',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: false
            }).then(async post => {
                let result = await postCheck(post, messageAuthor);
                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }
            });
            break;
        case "programmermeme":
            redditFetch({
                subreddit: 'ProgrammerHumor',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: false
            }).then(async post => {
                let result = await postCheck(post, messageAuthor);
                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }
            });
            break;
        case "unexpected":
            redditFetch({
                subreddit: 'Unexpected',
                sort: 'hot',
                allowNSFW: false,
                allowModPost: true,
                allowCrossPost: true,
                allowVideo: false
            }).then(async post => {
                let result = await postCheck(post, messageAuthor);
                if (result) {
                    interaction.editReply(result);
                } else {
                    getFromReddit(command, messageAuthor, interaction);
                }
            });
            break;
        default:
            return "error";
    }
}

async function postCheck(post, messageAuthor) {
    let redditEmbed = new Discord.MessageEmbed()
        .setColor('#de8391')

    let DELETE = new Discord.MessageButton()
        .setLabel("DELETE")
        .setStyle("DANGER")
        .setCustomId(`delete,${messageAuthor.id}`)
    let TEXT = new Discord.MessageButton()
        .setLabel("IS THIS CONTENT INAPPROPRIATE?")
        .setStyle("DANGER")
        .setDisabled(true)
        .setCustomId(`sus`)
    let row = new Discord.MessageActionRow()
        .addComponents(TEXT)
        .addComponents(DELETE)
    if (post.url.includes("i.redd")) {
        redditEmbed.setTitle(post.title);
        redditEmbed.setFooter({ text: `made by u/${post.author} || subreddit: r/${post.subreddit}` });
        redditEmbed.setImage(post.url_overridden_by_dest)

        return ({ embeds: [redditEmbed], components: [row] })
    } else if (post.is_video == true) {
        return ({ content: post.media.reddit_video.fallback_url, components: [row] })
    }
    return null;
}