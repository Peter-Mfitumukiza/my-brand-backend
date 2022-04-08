const Message = require('../models/Message');
const validators = require('../utils/validations');

async function getMessages(req, res){
    let posts = await Message.find();
    res.send({status:"success", data: posts});
}

async function postMessages(req, res){
    let { error } = await validators.validateMessage({...req.body});
    if(error){
        return res.send({status: "error", message: error.details[0].message}).status(400);
    }

    let post = new Message({
        ...req.body
    });
    await post.save();
    res.send({ status: "success", data: post });
}

module.exports.getMessages = getMessages;
module.exports.postMessages = postMessages;