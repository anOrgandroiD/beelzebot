const Discord = require('discord.js')

module.exports = {
    name: "giverole",
    administrator: false,
    soulDrainAmnt: 0.25,

    async execute(client, message, args) {
        const SOUL_DRAIN_AMNT = 0.25

        roleName = args[0]
        let users = [...message.mentions.users.values()]
        let modifiedRoleName = roleName.replace(/_/g, ' ')
        let memberRole = message.member.roles.cache.find(x => x.name === modifiedRoleName)
        let guildRole = message.guild.roles.cache.find(x => x.name === modifiedRoleName)
        let totalDrainAmnt = 0

        if(guildRole === undefined) {
            await message.reply("THIS ROLE HAS NOT BEEN SUMMONED INTO EXISTENCE")
            return
        }

        if(!message.member.permissionsIn(message.channel).has('ADMINISTRATOR') && guildRole.permissions.has('ADMINISTRATOR')) {
            await message.reply("YOU AREN'T ALLOWED TO GIVE ADMINISTRATOR ROLES")
            return
        }

        if(users.length === 0 || (users.length === 1 && users[0].id === message.author.id)) {
            if(memberRole !== undefined) {
                await message.reply("YOU ALREADY WIELD THE POWER OF THIS ROLE")
                return
            }
    
            message.member.roles.add(guildRole)
            totalDrainAmnt += Math.random() * SOUL_DRAIN_AMNT + 0.1
            await message.reply("ROLE SUCCESSFULLY GIVEN, DRAINING YOUR SOUL BY " + totalDrainAmnt.toFixed(2) +"%")
            await client.data.soulDrain(message.author.id, parseFloat(totalDrainAmnt.toFixed(2)))
            return
        }

        let count = 0
        for(let i = 0; i < users.length; i++) {
            memberRole = message.guild.members.cache.get(users[i].id).roles.cache.find(x => x.name === modifiedRoleName)
            if(memberRole === undefined) {
                totalDrainAmnt += Math.random() * SOUL_DRAIN_AMNT + 0.1
                message.guild.members.cache.get(users[i].id).roles.add(guildRole)
                count++
            }
        }

        if(count === 0) {
            await message.reply("NO USERS WERE GIVEN THE ROLE")
        } else if (count === 1) {
            await message.reply("1 USER WAS GIVEN THE ROLE, DRAINING YOUR SOUL BY " + totalDrainAmnt.toFixed(2) +"%")
            await client.data.soulDrain(message.author.id, parseFloat(totalDrainAmnt.toFixed(2)))
        } else {
            await message.reply(count + " USERS WERE GIVEN THE ROLE, DRAINING YOUR SOUL BY " + totalDrainAmnt.toFixed(2) +"%")
            await client.data.soulDrain(message.author.id, parseFloat(totalDrainAmnt.toFixed(2)))
        }
    }
}