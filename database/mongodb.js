const Discord = require('discord.js');
let usersDB = require('./schemas/user.js');

/*------------- USER COMMANDS -------------*/

//Creates the database to store users
module.exports.getUserDB = async function(userID) {
    let userDB = await usersDB.findOne(
        { id: userID }
    );
    if(userDB) {
        return userDB;
    } else {
        return false;
    }
};

module.exports.getUserDB = async function(userID, userTag) {
    let userDB = await usersDB.findOne(
        { id: userID }
    );
    if(userDB) {
        return userDB;
    } else {
        userDB = new usersDB({
            id: userID,
            tag: userTag
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
};

module.exports.userDBExists = async function(userID) {
    let userDB = await usersDB.findOne(
        { id: userID }
    );
    if(userDB)
        return true;
    else
        return false;
};