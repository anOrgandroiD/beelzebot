const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const fs = require('fs')
const path = require('path')

module.exports = {
    name: "restoreall",
    administrator: false,
    soulDrainAmnt: 0,

    async execute(client, message, args) {
        if(message.author.id !== process.env.OWNER_ID) {
            await message.reply("ONLY ONE WHO HAS SUCCUMBED TO ULTIMATE EVIL HAS THE POWER TO USE THIS COMMAND. YOU ARE NOT THAT SOMEONE")
            return
        }

        let server = await client.guilds.fetch(message.guild.id)
        let list = await server.members.fetch()

        list.forEach(async member => {
            await client.data.soulRestore(member.user.id, message.guild.id)
        })
        await message.reply("ALL USERS HAVE HAD THEIR SOULS COMPLETELY RESTORED")
    }
}