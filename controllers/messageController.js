import Message from '../models/Message.js';
import { validateMessage } from '../utils/validations.js';

export const getMessages = async(req, res)=>{
    let posts = await Message.find();
    res.send({status:"success", data: posts});
}

export const postMessages = async(req, res)=>{
    let { error } = await validateMessage({...req.body});
    if(error){
        return res.send({status: "error", message: error.details[0].message}).status(400);
    }

    let post = new Message({
        ...req.body
    });
    await post.save();
    res.send({ status: "success", data: post });
}