require('dotenv').config()
const Discord = require("discord.js")
const commandHandler = require("./commands/commands")
const utils = require('./utils')
const threads = require('./threads')

///////////////////////////////////////////////////////////////////////////////////////////////////
// 
// BOT LINK
// 
// https://discord.com/
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const TOKEN = process.env.TOKEN
const DIR = process.env.DIR

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] })
client.login(TOKEN)

client.on("ready", botReady)
client.on("messageCreate", getMessage)

async function botReady(){
    const date = new Date();
    console.log(`[Logs @${date.toUTCString()}] ${client.user.username} has connected to Discord\n`);

    let conan = await client.users.fetch("351822142989402123")
    utils.conan = conan

    threads.check_servers(client)
}

async function getMessage(message){
    if(message.author.bot) return
    else{
        commandHandler(message);
    }
}