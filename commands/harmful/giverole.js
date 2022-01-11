const Discord = require('discord.js')

module.exports = {
    name: "giverole",
    administrator: false,
    soulDrainAmnt: 0.25,

    async execute(client, message, args) {
        roleName = args[0]
        let modifiedRoleName = roleName.replace(/_/g, ' ')
        let role = message.member.roles.cache.find(x => x.name === modifiedRoleName)

        if(role !== undefined) {
            await message.reply("YOU ALREADY WIELD THE POWER OF THIS ROLE")
            return
        }

        role = message.guild.roles.cache.find(x => x.name === modifiedRoleName)

        if(role === undefined) {
            await message.reply("THIS ROLE HAS NOT BEEN SUMMONED INTO EXISTENCE")
            return
        }

        message.member.roles.add(role)
        await message.reply("ROLE SUCCESSFULLY Given")
    }
}