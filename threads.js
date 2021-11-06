const { MessageEmbed } = require('discord.js');

const utils = require("./utils");

const schedule = require('node-schedule')

const servers = {
    "891000842788937748": [
        ['8 0 * * *', removeCountRole],
        ['0 13 * * *', removeCountRole]
    ]
}

async function check_servers(client){
    let guilds = await client.guilds.fetch()

    for (let [guildId, guildO] of guilds){
        if(Object.keys(servers).includes(guildId)){
            for (let [time, fct] of servers[guildId]){
                let guild = await guildO.fetch()
                schedule.scheduleJob(time, function (){ fct(guild) })
                const date = new Date();
                console.log(`[Logs @${date.toUTCString()}] Scheduled '${fct.name}'' with time '${time}'\n`);
            }
        }
    }
}

async function removeCountRole(guild){
    let members = await guild.members.fetch()
    let roleSaitPasCompter = guild.roles.cache.find(r => r.name === "Sait pas compter")

    if (roleSaitPasCompter != undefined){
        for (let [memberId, member] of members){
            if (member.roles.cache.has(roleSaitPasCompter.id)){
                await member.roles.remove(roleSaitPasCompter.id)
                const date = new Date();
                console.log(`[Logs @${date.toUTCString()}] Role removed from ${member.user.username}'\n`);
            }
        }
    }
}

module.exports = {
    check_servers: check_servers
}