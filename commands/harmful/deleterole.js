const Discord = require('discord.js')

module.exports = {
    name: "deleterole",
    administrator: false,

    async execute(client, message, args) {
        const SOUL_DRAIN_AMNT = 0.25

        userID = message.author.id
        roleName = args[0]
        modifiedRoleName = args[0].replace(/_/g, ' ')
        let role = message.guild.roles.cache.find(x => x.name === modifiedRoleName)

        if(role === undefined) {
            await message.reply("NO ROLE OF THAT NAME EXISTS DINGUS")
            return
        }

        let child = await client.data.getUserDB(message.author.id, message.author.tag)

        if(child.roles.find(x => x.name === roleName) === undefined && !message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
            await message.reply("YOU CAN'T DELETE A ROLE YOU DIDN'T CREATE")
            return
        }

        if(child.roles.find(x => x.name === roleName) === undefined) {
            totalDrainAmnt = Math.random() * SOUL_DRAIN_AMNT + 0.1
            await client.data.soulDrain(userID, parseFloat(totalDrainAmnt.toFixed(2)))
            await message.reply("ROLE SUCCESSFULLY BANISHED... FOR " + totalDrainAmnt.toFixed(2) + "% OF YOUR SOUL, OF COURSE")
        } else {
            await message.reply("ROLE SUCCESSFULLY BANISHED")
        }

        role.delete()
        await client.data.deleteCustomRole(userID, roleName)
    }
}