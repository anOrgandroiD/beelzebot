const mongoose = require('mongoose')

const getCurrentDate = (number) => {
    var date = new Date(number)
    return date.toUTCString()
}

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    tag: { type: String },
    registedAt: { type: String, default: getCurrentDate(Date.now())},
    soul: { type: Number, default: 100 },
    roles: { type: [{
        name: { type: String}
    }], default: []}
}))