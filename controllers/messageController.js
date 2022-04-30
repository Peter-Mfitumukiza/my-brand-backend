import Message from '../models/Message.js';

export const getMessages = async(req, res)=>{
    let posts = await Message.find();
    res.json({status:"success", data: posts});
}

export const postMessages = async(req, res)=>{
    let post = new Message({
        ...req.body
    });
    await post.save();
    res.json({ status: "success", data: post });
}