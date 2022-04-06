const joi = require('joi');
const Message = require('../models/Message');

async function getMessages(req, res){
    let posts = await Message.find();
    res.send({status:"success", data: posts});
}

async function postMessages(req, res){
    let post = new Message({
        ...req.body
    });
    await post.save();
    res.send({ status: "success", data: post });
}

module.exports.getMessages = getMessages;
module.exports.postMessages = postMessages;