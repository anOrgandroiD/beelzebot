const Discord = require('discord.js')
const dotenv = require('dotenv').config()
const cmdCooldown = {}

module.exports = async(client, message) => {
    try {
        if(message.author.bot) return

        if(!message.guild) {
            return message.channel.send("I DO NOT ANSWER PERSONALIZED MESSAGES, YOU MEAN NOTHING TO ME!!!")
        }

        let prefix = process.env.BEELZEBOT_PREFIX

        if(!message.content.toLowerCase().startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift().toLowerCase()
        const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if(!cmd) return

        if(cmd.administrator) {
            if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) {
                message.channel.send(`I DO NOT GIVE YOU PERMISSION TO USE THAT COMMAND, SKREE!!!`)
                console.log(`${message.author.tag} used ${cmd.name}... But nothing happened!`)
                return
            }
        }

        let userDB = await client.data.getUserDB(message.author.id, message.author.tag)
        let data = {}
        data.config = process.env
        data.user = userDB
        data.cmd

        //Executes and logs the command
        cmd.execute(client, message, args)
        console.log(`${message.author.tag} used ${cmd.name}`)

    } catch(err) {
        console.error(err)
    }
}