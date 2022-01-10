const mongoose = require('mongoose')

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    tag: { type: String },
    registedAt: { type: Number, deafault: Date.now() },
    soul: { type: Number, deafault: 100 }
}))