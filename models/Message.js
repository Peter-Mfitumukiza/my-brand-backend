const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    content: String 
});

module.exports = mongoose.model("message", schema);