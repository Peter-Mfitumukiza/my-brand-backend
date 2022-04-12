const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String
})

module.exports = mongoose.model('user', schema);