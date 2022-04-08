const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    cover: String,
    publish: Boolean,
    enableComments: Boolean,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("article", schema);