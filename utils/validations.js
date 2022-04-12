const Joi = require('joi');

function validateMessage(message){
    const schema =  new Joi.object({
        name:Joi.string().max(255).min(3).required(),
        email: Joi.string().max(255).min(3).required().email(),
        subject:Joi.string().max(255).min(3).required(),
        content:Joi.string().max(1000).min(5).required()
    });
    return schema.validate(message);
}

function validateArticle(article){
    const schema =  new Joi.object({
        title:Joi.string().max(255).min(5).required(),
        description: Joi.string().max(600).min(3).required(),
        content:Joi.string().max(2000).min(100).required(),
        cover:Joi.string().uri().required(),
        publish:Joi.bool().required(),
        enableComments: Joi.bool().required()
    });
    return schema.validate(article);
}

function validateUser(user){
    const schema =  new Joi.object({
        name:Joi.string().max(40).min(3).required(),
        email: Joi.string().required().email(),
        password:Joi.string().max(12).min(6).required(),
        image:Joi.string().uri().required()
    });
    return schema.validate(user);
}

function validateComment(comment){
    const schema = new Joi.object({
        name: Joi.string().max(40).min(3).required(),
        content: Joi.string().max(500).required(),
        articleId: Joi.string().max(50).required()
    })
    return schema.validate(comment);
}

function validateLogin(req){
    const schema = Joi.object({
        email: Joi.string().max(255).min(3).required().email(),
        password:Joi.string().max(255).min(6).required()
    })
    return schema.validate(req);
}

module.exports.validateMessage = validateMessage;
module.exports.validateArticle = validateArticle;
module.exports.validateUser = validateUser;
module.exports.validateComment = validateComment;
module.exports.validateLogin = validateLogin;