module.exports = {
    name: "rate",
    description: "",
    execute(messageSend, args){
        messageSend.reply(`I rate ${args.getString("something")} a ${getResponse(args[0])}`);
    }
}

function getResponse(args){
    switch(args){
        case "<@974007703057883197>":
            return (`10/10 (best bot ever)`);
        case "<@870270710277341195>":
            return (`Alus \🥺\🥺`);
        case "milk":
            return (`10/10 yes please 🤤🤤 MILK`);
        case "your mom":
            return ("it would be 10/10 if I had one");
        case "ur mom":
            return ("it would be 10/10 if I had one");
        case "aless":
            return ("it would be 10/10 if I had one");
        default:
            return (`${random(11)}/10`);
    }
}
