const { MessageEmbed } = require('discord.js');
const utils = require("../utils.js");

/*
    SCHEMA:
        "Category":{
            "command": {
                "Aliases": ["alias1", "alias2"],
                "Description": ["desc"],
                "Options": ["args"]
            },
        }
*/
const helpCommands = {
}

async function help(msg, args) {
    let cmd = args[0] || "help"

    // Create help command
    if (cmd == "help"){
        let botAvatar = await msg.client.user.avatarURL()

        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(msg.client.user.tag, botAvatar || msg.client.user.defaultAvatarURL)
        .setTitle("Command '"+cmd+"': ")
        .addFields(
            { name: 'My purpose', value: "Hey ! My job is to alert every member `WITH THE 'Chalert user' ROLE` of this server when someone joins a vocal channel !\
             I am not the greatest bot of all time but I hope you will like me ^^"},
             { name: 'Aliases', value: "`help`|`h`"},
        )
        .setTimestamp()
        .setFooter('Bot owner: ConanGuy#8900', await utils.conan.avatarURL());
        
        for (const category of Object.keys(helpCommands)){
            let cmds = []
            for (const c of Object.keys(helpCommands[category])){
                cmds.push("`"+c+"`")
            }
            embed.addField(category, cmds.join(', '))
        }

        embed.addField("One more thing", "You can do `chalert.help <command>` to see the details of a command")

        return utils.send(msg, {embeds: [embed]})
    }

    // Get all possible help
    let commandsAliases = {}
    for (let cmd of Object.keys(helpCommands)){
        for (let alias of helpCommands[cmd]["Aliases"]){
            commandsAliases[alias] = cmd
            console.log(alias+": "+cmd)
        }
    }

    // Verify if the alias exists
    let alias = commandsAliases[cmd]
    if (alias === undefined)
        return utils.send(msg, {content: `${cmd} command not found`})

    // Create help message
    let helpDict = helpCommands[alias]
    let aliases = helpDict["Aliases"]
    let desc = helpDict["Description"]
    let opts = helpDict["Options"]

    let aliasesStr = ""
    for (const a of aliases)
        aliasesStr += "`"+a+"`|"
    aliasesStr = aliasesStr.substring(0, aliasesStr.length-1)

    let descStr = ""
    for (const d of desc)
        descStr += "`"+d+"` "
    descStr = descStr.substring(0, descStr.length-1)

    let optsStr = ""
    for (const o of opts)
        optsStr += "`["+o+"]` "
    optsStr = optsStr.substring(0, optsStr.length-1)

    // Create help embed
    const embed = new MessageEmbed()
    .setTitle("Command '"+alias+"': ")
	.addFields(
		{ name: 'Aliases', value: aliasesStr == "" ? "None" : aliasesStr },
		{ name: 'Description', value: descStr == "" ? "None" : descStr},
		{ name: 'Options', value: optsStr == "" ? "None" : optsStr},
	)
	.setTimestamp()

    return await utils.send(msg, {embeds: [embed]})
}

module.exports = async function (msg, args){
    await help(msg, args)
}
