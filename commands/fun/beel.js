const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

module.exports = {
    name: "beel",
    administrator: false,

    async execute(client, message, args) {
        let rawdata = fs.readFileSync(path.resolve(__dirname, '../../phrases.json'))
        let phrases = JSON.parse(rawdata)
        
        str = message.content.substring(1, message.length);
        if(str === 'beel'){
            let randInt = Math.floor(Math.random() * phrases.phraseList.length)
            await message.reply(phrases.phraseList[randInt].replace('CLIENT', message.author));
        }
    }
}