const Discord = require('discord.js')

module.exports = {
    name: "removerole",
    administrator: false,
    soulDrainAmnt: 0.25,

    async execute(client, message, args) {
        roleName = args[0]
        let modifiedRoleName = roleName.replace(/_/g, ' ')
        let role = message.member.roles.cache.find(x => x.name === modifiedRoleName)

        if(role === undefined) {
            await message.reply("I CANNOT REMOVE A ROLE WHICH YOU DO NOT HAVE")
            return
        }

        message.member.roles.remove(role)
        await message.reply("ROLE SUCCESSFULLY REMOVED")
    }
}