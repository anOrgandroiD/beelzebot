const fs = require('fs')
const path = require('path')

module.exports = async(client) => {
    
    let rawdata = fs.readFileSync(path.resolve(__dirname, '../phrases.json'))
    let phrases = JSON.parse(rawdata)

    try {
        console.log(`BEELZEBOT HAS INFILTRATED OUR WORLD AS ${client.user.tag}!!!`)
        let randInt = Math.floor(Math.random() * phrases.statusList.length)
        client.user.setActivity(phrases.statusList[randInt][1], { type: phrases.statusList[randInt][0] })
    } catch (err) {
        console.log(err)
    }
}