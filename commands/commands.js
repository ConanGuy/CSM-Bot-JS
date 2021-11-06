const utils = require("../utils.js");
const help = require("./help.js")

require('dotenv').config();
const command_prefix = process.env.PREFIX.split(", ");

const commands = {
    help: help, h: help
};

const conanCommands = {
    gg: c_gg, get_guilds: c_gg
};

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    let command = tokens.shift();
    
    let guildsJson = utils.load_guilds()
    const server_prefix = guildsJson[msg.guild.id].prefix;
    
    let allPrefix = [command_prefix, server_prefix]

    let conan = utils.conan

    // Check for the prefix in the command
    for(var prefix of allPrefix){

        // If the prefix has been found at the very beginning of the message
        if(command.indexOf(prefix) == 0){
            command = command.replace(prefix, "");
            
            if (msg.author.id == conan.id){
                if(command in conanCommands){
                    await conanCommands[command](msg, tokens);
                    break
                }
            }
            
            // Check if the command is exists
            if(!(command in commands)){
                return;
            }
            
            // Execute the command
            await commands[command](msg, tokens);

            break;
        } 
    }
}