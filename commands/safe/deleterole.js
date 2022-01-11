const Discord = require('discord.js')

module.exports = {
    name: "deleterole",
    administrator: false,

    async execute(client, message, args) {
        roleName = args[0]
        modifiedRoleName = args[0].replace(/_/g, ' ')
        let role = message.guild.roles.cache.find(x => x.name === modifiedRoleName)

        if(role === undefined) {
            await message.reply("NO ROLE OF THAT NAME EXISTS DINGUS")
            return
        }

        let child = await client.data.getUserDB(message.author.id, message.author.tag)

        if(child.roles.find(x => x.name === roleName) === undefined) {
            await message.reply("YOU CAN'T DELETE A ROLE YOU DIDN'T CREATE")
            return
        }

        role.delete()
        await message.reply("ROLE SUCCESSFULLY BANISHED")
    }
}