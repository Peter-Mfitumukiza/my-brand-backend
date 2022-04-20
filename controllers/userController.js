import {config} from 'dotenv';
config({path: './.env'});
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import hashPassword from '../utils/hashPassword.js';

const { sign } = jwt;

export const register = async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user) return res.send({status:"error", message: "Email already taken!"});

    let newUser = new User({ ...req.body });
    newUser.password = await hashPassword(newUser.password);
    await newUser.save();
    res.send({ status:"success", data: newUser });
}

export const getUsers = async(req,res)=>{
    let users = await User.find();
    return res.send({ status : "success", data: users });
}

export const login = async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.send({ status: "error", message: "Invalid email or password" }).status(401);

    const validPassword = await compare(req.body.password,user.password)
    if(!validPassword)
    return res.send('invalid email or password').status(401)
    const token  =sign(
        {_id:user._id,
            name:user.name,
            email:user.email,
            image:user.image
        }, process.env.JWT_KEY);
    return res.send({ status: "success", data: token }).status(200);
}
