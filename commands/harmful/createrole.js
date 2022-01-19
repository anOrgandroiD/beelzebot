const Discord = require('discord.js')

module.exports = {
    name: "createrole",
    administrator: false,
    soulDrainAmnt: 0.5,

    async execute(client, message, args) {
        const SOUL_DRAIN_AMNT = 0.5
        const MAX_ROLE_AMNT = 2
        const DEFAULT_COLOR = 0x979c9f

        let userID = message.author.id

        if(await client.data.createdRoles(userID, message.guild.id) >= MAX_ROLE_AMNT) {
            await message.reply("I CANNOT GRANT YOU ANY MORE ROLES AT THIS TIME")
            return
        }

        let roleName = args[0]
        let modifiedRoleName = roleName.replace(/_/g, ' ')
        let role = message.guild.roles.cache.find(x => x.name === modifiedRoleName)

        if(role !== undefined) {
            await message.reply("THIS ROLE ALREADY EXISTS, STOP WASTING MY POWER")
            return
        }

        if(roleName === undefined) {
            await message.reply("YOU DIDN'T SPECIFY A NAME FOR THE NEWLY CREATED ROLE")
            return
        }

        let color = args[1]
        let re = /[0-9A-Fa-f]{6}/g;
        
        if(color !== undefined) {
            if(!re.test(color) || color.length !== 6) {
                await message.reply("YOU MUST PROVIDE A VALID HEX STRING FOR YOUR ROLE'S COLOR")
                return
            }
        } else {
            color = DEFAULT_COLOR
        }

        newRole = await message.guild.roles.create({
            name: modifiedRoleName,
            color: color,
            hoist: true
        })

        //For some reason the position might be under the user's highest role's position by 1, so
        newRole.setPosition(message.member.roles.highest.rawPosition)
        newRole.setPosition(message.member.roles.highest.rawPosition + 1)

        await client.data.addCustomRole(userID, message.guild.id, roleName)
        totalDrainAmnt = Math.random() * SOUL_DRAIN_AMNT + 0.01
        await client.data.soulDrain(userID, message.guild.id, parseFloat(totalDrainAmnt.toFixed(2)))
        await message.reply("YOU SUMMONED A NEW ROLE, DRAINING YOUR SOUL BY " + totalDrainAmnt.toFixed(2) + "%")
    }
}