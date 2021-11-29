const { MessageEmbed } = require('discord.js');

const utils = require("./utils");
const {exec} = require("child_process")
const schedule = require('node-schedule')

const servers = {
    "891000842788937748": [
        ['8 0 * * *', removeCountRole, "guild"],
        ['0 13 * * *', removeCountRole, "guild"],
        ['0 * * * *', checkIfOnline, "client"],
        ['30 * * * *', checkIfOnline, "client"],
        ['15 * * * *', checkIfOnline, "client"],
        ['45 * * * *', checkIfOnline, "client"],
    ]
}

const botsIds = ["892318238355095562", "894513740479860777", "875127458570072137"]
const botCmdNames = {"892318238355095562" : "f1", "894513740479860777": "chalert", "875127458570072137": "rav"}

async function check_servers(client){
    let guilds = await client.guilds.fetch()

    for (let [guildId, guildO] of guilds){
        if(Object.keys(servers).includes(guildId)){
            for (let [time, fct, toEval] of servers[guildId]){
                let guild = await guildO.fetch()
                schedule.scheduleJob(time, function (){ fct(eval(toEval)) })
                const date = new Date();
                console.log(`[Logs @${date.toUTCString()}] Scheduled '${fct.name}' with time '${time}' and args '${toEval}'\n`);
            }
        }
    }

    checkIfOnline(client)
}

async function removeCountRole(guild){
    let members = await guild.members.fetch()
    let roleSaitPasCompter = guild.roles.cache.find(r => r.name === "Sait pas compter")

    if (roleSaitPasCompter != undefined){
        for (let [memberId, member] of members){
            if (member.roles.cache.has(roleSaitPasCompter.id)){
                await member.roles.remove(roleSaitPasCompter.id)
                const date = new Date();
                console.log(`[Logs @${date.toUTCString()}] Role removed from ${member.user.username}'`);
            }
        }
        console.log("")
    }
}

async function checkIfOnline(client){
    const guildO = await client.guilds.fetch("891000842788937748")
    const guild = await guildO.fetch()

    for (const id of botsIds){
        member = await guild.members.fetch(id)
        if (member.presence === null){
            exec("bots restart "+botCmdNames[id], (error, stdout, stderr) => {
                console.log("exec null")
                if (error) {
                  console.error(`error:\n${error.message}`);
                  return;
                }
              
                if (stderr) {
                  console.error(`stderr:\n${stderr}`);
                  return;
                }
              
                console.log(`stdout:\n${stdout}`);
              })
            await utils.conan.send({content: "WARNING: "+member.user.username+" is not online (null). Restarting..."})
        }
        else if (member.presence.status == "offline"){
            exec("bots restart "+botCmdNames[id], (error, stdout, stderr) => {
                console.log("exec offline")
                if (error) {
                  console.error(`error:\n${error.message}`);
                  return;
                }
              
                if (stderr) {
                  console.error(`stderr:\n${stderr}`);
                  return;
                }
              
                console.log(`stdout:\n${stdout}`);
            })
            await utils.conan.send({content: "WARNING: "+member.user.username+" is not online (offline). Restarting..."})
        }
    }
}

module.exports = {
    check_servers: check_servers
}
