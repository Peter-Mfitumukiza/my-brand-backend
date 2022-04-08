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

module.exports.validateMessage = validateMessage;