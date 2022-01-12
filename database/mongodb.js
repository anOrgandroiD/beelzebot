const Discord = require('discord.js');
let usersDB = require('./schemas/user.js');

/*------------- USER COMMANDS -------------*/

module.exports.getUserDB = async function(userID, userTag) {
    let userDB = await usersDB.findOne(
        { id: userID }
    )
    if(userDB) {
        return userDB;
    } else {
        userDB = new usersDB({
            id: userID,
            tag: userTag
        })
        await userDB.save().catch(err => console.log(err))
        return userDB
    }
}

module.exports.userDBExists = async function(userID) {
    let userDB = await usersDB.findOne(
        { id: userID }
    )
    if(userDB)
        return userDB
    else
        return false
}

module.exports.soulDrain = async function(userID, drainAmnt) {
    let userDB = await usersDB.findOneAndUpdate(
        { id: userID },
        { $inc:
            { soul: -drainAmnt }
        }
    )
    if(userDB)
        return userDB
    else
        return false
}

module.exports.addCustomRole = async function(userID, role) {
    let userDB = await usersDB.findOneAndUpdate(
        { id: userID },
        { $push: { roles: { name: role } } }
    )
    return userDB
}

module.exports.deleteCustomRole = async function(userID, role) {
    let userDB = await usersDB.findOneAndUpdate(
        { id: userID },
        { $pull: { roles: { name: role } } }
    )
    return userDB
}

module.exports.createdRoles = async function(userID) {
    let userDB = await usersDB.findOne(
        { id: userID }
    )
    return userDB.roles.length
}