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

module.exports.validateMessage = validateMessage;
module.exports.validateArticle = validateArticle;