require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validators = require('../utils/validations');
const hashPassword = require('../utils/hashPassword');

async function register(req,res){
    let { error } = await validators.validateUser(req.body);
    if(error) return res.send({status: "error", message: error.details[0].message}).status(400);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.send({status:"error", message: "Email already taken!"});

    let newUser = new User({ ...req.body });
    newUser.password = await hashPassword(newUser.password);
    await newUser.save();
    res.send({ status:"success", data: newUser });
}

async function getUsers(req,res){
    let users = await User.find();
    return res.send({ status : "success", data: users });
}

async function login(req,res){
    let { error } = await validators.validateLogin(req.body);
    if(error) return res.send({status: "error", message: error.details[0].message}).status(400);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.send({ status: "error", message: "Invalid email or password" }).status(400);

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword)
    return res.send('invalid email or password').status(401)
    const token  =jwt.sign(
        {_id:user._id,
            name:user.name,
            email:user.email,
            image:user.image
        }, process.env.JWT_KEY);
    return res.send({ status: "success", data: token });
}

module.exports.getUsers = getUsers;
module.exports.login = login;
module.exports.register = register;