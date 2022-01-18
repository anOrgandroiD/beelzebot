const Discord = require('discord.js')

module.exports = {
    name: "removerole",
    administrator: false,
    soulDrainAmnt: 0.15,

    async execute(client, message, args) {
        const SOUL_DRAIN_AMNT = 0.15

        roleName = args[0]
        let modifiedRoleName = roleName.replace(/_/g, ' ')
        let role = message.member.roles.cache.find(x => x.name === modifiedRoleName)

        if(role === undefined) {
            await message.reply("I CANNOT REMOVE A ROLE WHICH YOU DO NOT HAVE")
            return
        }

        message.member.roles.remove(role)
        totalDrainAmnt = Math.random() * SOUL_DRAIN_AMNT + 0.1
        await client.data.soulDrain(message.author.id, parseFloat(totalDrainAmnt.toFixed(2)))
        await message.reply("ROLE SUCCESSFULLY REMOVED, DRAINING YOUR SOUL BY " + totalDrainAmnt.toFixed(2) + "%")
    }
}