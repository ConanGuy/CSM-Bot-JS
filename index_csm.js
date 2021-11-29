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

const TOKEN = process.env.TOKEN_CSM

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_PRESENCES"], partials: ["CHANNEL"] })
client.login(TOKEN)

client.on("ready", botReady)
client.on("messageCreate", getMessage)
client.on("guildMemberAdd", memberJoin)

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

async function memberJoin(member){
    if (member.guild.id = "891000842788937748"){
        if (member.user.bot){
            await member.roles.add(member.guild.roles.cache.find(r => r.name == "Haas"))
            const date = new Date();
            console.log(`[Logs @${date.toUTCString()}] Haas added role to bot ${member.user.username}\n`);

        }
        else{
            await member.roles.add(member.guild.roles.cache.find(r => r.name == "Pilote"))
            const date = new Date();
            console.log(`[Logs @${date.toUTCString()}] Pilote added role to bot ${member.user.username}\n`);
        }
    }
}