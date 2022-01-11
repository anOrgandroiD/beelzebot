const Discord = require('discord.js')

module.exports = {
    name: "deleterole",
    administrator: false,

    async execute(client, message, args) {
        roleName = args[0]
        modifiedRoleName = args[0].replace(/_/g, ' ')
        let role = message.guild.roles.cache.find(x => x.name === modifiedRoleName)

        if(role !== undefined) {
            role.delete()
            await client.data.deleteCustomRole(message.author.id, roleName)
            await message.reply("ROLE SUCCESSFULLY BANISHED");
        } else {
            await message.reply("NO ROLE OF THAT NAME EXISTS DINGUS");
        }
    }
}