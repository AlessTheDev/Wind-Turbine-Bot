const ball = ["yes", "no", "maybe", "idk", "I could ask the same question to you", "Look for the answer in your heart", "idk"];

module.exports = {
    name: "8ball",
    description: "",
    execute(interaction, args){
        if(args.getString("something") == "balls"){
            interaction.reply("balls lol");
            return;
        }
        interaction.reply(`Question: ${args.getString("something")}\nAnswer: ${ball[random(ball.length)]}`);
    }
}
