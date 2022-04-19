import Article from '../models/Article.js';

export const getArticles = async(req,res)=>{
    let articles = await Article.find();
    return res.status(200).send({ status:"success", data:articles });
}

export const getSingleArticle = async(req,res)=>{
    try{
        let article = await Article.findOne({ _id: req.params.id});
        return res.send({ status: "success", data: article });
    }catch(err){
        res.status(404).send({ status:"error", message: "Article doesn't exist!"});
    }

}

export const saveArticle = async(req,res)=>{
    let article = new Article({ ...req.body});
    await article.save();
    res.status(201).send({ status: "success", data: article});
}

export const updateArticle = async(req,res)=>{
    // console.log(req.params)
    try{
        let article = await Article.findOne({ _id: req.params.id});
        article.title = req.body.title;
        article.description = req.body.description;
        article.content = req.body.content;
        article.cover = req.body.cover;
        article.publish = req.body.publish;
        article.enableComments = req.body.enableComments;
        await article.save();
        res.send({ status: "success", data: article});
    }catch(err){
        console.log(err);
        res.send({ status: "error", message: "Trying to update an article which doesn't exist" });
    }
}

export const deleteArticle = async(req,res)=>{
    try{
        await Article.findOneAndDelete({ _id: req.params.id});
        return res.send({ status: "success", message: "Article delete successfully" });
    }catch(err){
        console.log(err);
        res.send({ status:"error", message: "Trying to delete an article that doesn't exist!"});
    }
}

export const comment = async(req,res)=>{
    
    res.send({ status:"succcess", message: " Logic to comment goes hereee.. " });
}

export const like = async(req,res)=>{
    return res.send({ status:"succcess", message: " Logic to like goes hereee.. " });
}