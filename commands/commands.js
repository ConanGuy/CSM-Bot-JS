const utils = require("../utils.js");
const help = require("./help.js")

require('dotenv').config();
const command_prefix = process.env.PREFIX.split(", ");

const commands = {
    help: help, h: help
};

const conanCommands = {
};

module.exports = async function (msg){
    let tokens = msg.content.split(" ");
    let command = tokens.shift().toLowerCase();
    
    let allPrefix = [command_prefix]

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