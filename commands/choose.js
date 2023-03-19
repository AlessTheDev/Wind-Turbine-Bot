const ball = ["yes", "no", "maybe", "idk", "idk"];

module.exports = {
    name: "choose",
    description: "",
    execute(interaction, args) {
        let choose = [];
        for (let i = 1; i <= 4; i++) {
            if (args.getString("option" + i.toString()) != null) {
                choose.push(args.getString("option" + i.toString()));
            }
        }
        interaction.reply("options: " + choose.toString() + "\n" + "I choosed " + choose[random(choose.length - 1)])
    }
}