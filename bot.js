require('dotenv').config()
const { Client, Intents } = require('discord.js')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

const fs = require('fs')
const path = require('path')

let rawdata = fs.readFileSync(path.resolve(__dirname, 'phrases.json'))
let phrases = JSON.parse(rawdata)

const symbol = 'Ψ';

client.on('ready', () => {
    console.log(`BEELZEBOT IS LOGGED IN AS ${client.user.tag} AND READY TO TAKE OVER THE WORLD, BZZ!!!`)
})

client.on('messageCreate', async message => {
    if(message.content[0] === symbol) {
        str = message.content.substring(1, message.length);
        if(str === 'chaos'){
            let randInt = Math.floor(Math.random() * phrases.phraseList.length)
            await message.reply(phrases.phraseList[randInt]);
        }
    }
})

client.login(process.env.CHAOSBOT_TOKEN)