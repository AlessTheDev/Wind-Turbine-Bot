module.exports = {
    name: "xp",
    description: "",
    execute(messageSend, args, isInteraction, deferReply){
        if(database == undefined) return messageSend.reply("I can't reach the database, pls retry later");
        let windUser;
        if(messageSend.mentions.users.first()){
            windUser = messageSend.mentions.users.first();
        }else{
            windUser = messageSend.author;
        }
        getDatabaseInfo(windUser.id, function(user){
            if(user.xp == undefined) updateDatabaseInfo(windUser, {$set: { xp: 0 }});
            
            messageSend.reply(`${windUser} has ${user.xp} xp`)
        }, false, true, function(){
            messageSend.reply("I stopped storing data about you")
        })
    }
}