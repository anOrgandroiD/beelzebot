const dotenv = require('dotenv').config()
const fs = require('fs')
util = require('util');
readdir = util.promisify(fs.readdir);
const Discord = require('discord.js')
mongoose = require('mongoose')

const client = new Discord.Client({
    intents: ['DIRECT_MESSAGES', 'GUILDS', 'GUILD_MESSAGES']
})

client.events = new Discord.Collection()
client.commands = new Discord.Collection()
client.data = require('./database/mongodb.js')

async function bootSequence() {
    const eventFiles = fs.readdirSync('./events/')
    for(const file of eventFiles) {
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        console.log(`Loading Event ~ ${eventName}`)
        client.on(eventName, event.bind(null, client))
    }

    let folders = await readdir('./commands/');
    folders.forEach(direct => {
        const commandFiles = fs.readdirSync('./commands/' + direct + '/').filter(file => file.endsWith('.js'));
        for(const file of commandFiles) {
            const command = require(`./commands/${direct}/${file}`)
            console.log(`Loading Command ~ ${command.name}`)
            client.commands.set(command.name, command)
        }
    });

    mongoose.connect(process.env.BEELZEBOT_DATABASE, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`BEELZEBOT HAS FOUND HIS NEXT TARGET!!! PREFIX IS ${process.env.BEELZEBOT_PREFIX}`)
    }).catch(() => {
        console.log(`BEELZEBOT COULD NOT FIND A TARGET...`)
    });

    client.login(process.env.BEELZEBOT_TOKEN)
}

bootSequence()

client.on("disconnect", () => client.logger.log("BEELZEBOT'S TIME IN THE DIMENSION IS UP... FOR NOW", "warn"))
    .on("reboot", () => client.logger.log("BEELZEBOT NEEDS TO WASH THE DISHES FOR HIS PARENTS, HE'LL BE RIGHT BACK", "log"))
    .on("error", (error) => client.logger.log(error, "error"))
    .on("warn", (warning) => client.logger.log(warning, "warn"))

process.on("unhandledRejection", (err) => {
    console.error(err)
})