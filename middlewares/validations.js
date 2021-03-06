import Joi from 'joi';

export const validateMessage = async(req, res, next)=>{
    const schema =  new Joi.object({
        name: Joi.string().max(255).min(3).required(),
        email: Joi.string().max(255).min(3).required().email(),
        subject: Joi.string().max(255).min(3).required(),
        content: Joi.string().max(1000).min(5).required()
    });

    const { error } = await schema.validate(req.body);
        
    if(error){
        return res.status(400).json({status:"error", message: error.details[0].message});
    } else{
        return next();
    }
}

export const validateArticle = async(req,res,next)=>{
    const schema =  new Joi.object({
        title: Joi.string().max(255).min(5).required(),
        description: Joi.string().max(600).min(3).required(),
        content: Joi.string().max(2000).min(100).required(),
        cover: Joi.string().uri().required(),
        publish: Joi.bool().required(),
        enableComments: Joi.bool().required(),
        user: Joi.object()
    });

    const { error } = await schema.validate(req.body);
        
    if(error){
        return res.status(400).json({status:"error", message: error.details[0].message});
    } else{
        return next();
    }
}

export const validateUser = async(req,res,next) =>{
    const schema =  new Joi.object({
        name: Joi.string().max(40).min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().max(12).min(6).required(),
        image: Joi.string().uri().required()
    });

    const { error } = await schema.validate(req.body);
        
    if(error){
        return res.status(400).json({status:"error", message: error.details[0].message});
    } else{
        return next();
    }
}

export const validateComment = async(req,res,next) => {
    const schema = new Joi.object({
        content: Joi.string().max(500).required(),
        articleId: Joi.string().max(50).required(),
        user: Joi.object()
    })

    const { error } = await schema.validate(req.body);
        
    if(error){
        return res.status(400).json({status:"error", message: error.details[0].message});
    } else{
        return next();
    }
}

export const validateLogin = async(req, res, next) => {
    const schema = new Joi.object({
        email: Joi.string().max(255).min(3).required().email(),
        password: Joi.string().max(255).min(6).required()
    })
    
    const { error } = await schema.validate(req.body);
        
    if(error){
        return res.status(400).json({status:"error", message: error.details[0].message});
    } else{
        return next();
    }
}
export const validateLike = async(req,res,next) =>{
    const schema = new Joi.object({
        articleId: Joi.string().max(50).required(),
        user: Joi.object()
    })

    const { error } = await schema.validate(req.body);
        
    if(error){
        return res.status(400).json({status:"error", message: error.details[0].message});
    } else{
        return next();
    }
}