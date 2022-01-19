const Discord = require('discord.js');
let usersDB = require('./schemas/user.js');

/*------------- USER COMMANDS -------------*/

module.exports.getUserDB = async function(userID, guildID, userTag) {
    let userDB = await usersDB.findOne(
        { $and: [
            { id: userID },
            { guild: guildID }
        ]}
    )
    if(userDB) {
        return userDB;
    } else {
        userDB = new usersDB({
            id: userID,
            tag: userTag,
            guild: guildID
        })
        await userDB.save().catch(err => console.log(err))
        return userDB
    }
}

module.exports.userDBExists = async function(userID, guildID) {
    let userDB = await usersDB.findOne(
        {$and:[
            { id: userID },
            { guild: guildID }
        ]}
    )
    if(userDB)
        return userDB
    else
        return false
}

module.exports.soulDrain = async function(userID, guildID, drainAmnt) {
    let userDB = await usersDB.findOneAndUpdate(
        {$and:[
            { id: userID },
            { guild: guildID }
        ]},
        { $inc:
            { soul: -drainAmnt }
        }
    )
    if(userDB)
        return userDB
    else
        return false
}

module.exports.soulRestore = async function(userID, guildID) {
    let userDB = await usersDB.findOneAndUpdate(
        {$and:[
            { id: userID },
            { guild: guildID }
        ]},
        { $set:
            { soul: 100 }
        }
    )
    if(userDB)
        return userDB
    else
        return false
}

module.exports.addCustomRole = async function(userID, guildID, role) {
    let userDB = await usersDB.findOneAndUpdate(
        {$and:[
            { id: userID },
            { guild: guildID }
        ]},
        { $push: { roles: { name: role } } }
    )
    return userDB
}

module.exports.deleteCustomRole = async function(userID, guildID, role) {
    let userDB = await usersDB.findOneAndUpdate(
        {$and:[
            { id: userID },
            { guild: guildID }
        ]},
        { $pull: { roles: { name: role } } }
    )
    return userDB
}

module.exports.createdRoles = async function(userID, guildID) {
    let userDB = await usersDB.findOne(
        {$and:[
            { id: userID },
            { guild: guildID }
        ]}
    )
    return userDB.roles.length
}