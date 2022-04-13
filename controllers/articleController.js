import Article from '../models/Article.js';
import { validateArticle } from '../utils/validations.js';

export const getArticles = async(req,res)=>{
    let articles = await Article.find();
    return res.send({ status:"success", data:articles });
}

export const getSingleArticle = async(req,res)=>{
    try{
        let article = await Article.findOne({ _id: req.params.id});
        return res.send({ status: "success", data: article });
    }catch(err){
        console.log(err);
        res.send({ status:"error", message: "Article doesn't exist!"});
    }

}

export const saveArticle = async(req,res)=>{
    let { error } = await validateArticle({ ...req.body });
    if(error) return res.send({ status: "error", message: error.details[0].message })

    let article = new Article({ ...req.body});
    await article.save();
    res.send({ status: "success", data: article});
}

export const updateArticle = async(req,res)=>{
    let { error } = await validateArticle({ ...req.body });
    if(error) return res.send({ status: "error", message: error.details[0].message })
    try{
        let article = await findOne({ _id: req.params.id});
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
    // let { error } = await validators.validateComment(req.body);
    // if(error){
    //     return res.send({ status: "error", message: error.details[0].message })
    // }
    res.send({ status:"succcess", message: " Logic to comment goes hereee.. " });
}

export const like = async(req,res)=>{
    return res.send({ status:"succcess", message: " Logic to like goes hereee.. " });
}