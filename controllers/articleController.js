const Article = require('../models/Article');
const validators = require('../utils/validations');

async function getArticles(req,res){
    let articles = await Article.find();
    return res.send({ status:"success", data:articles });
}

async function getSingleArticle(req,res){
    try{
        let article = await Article.findOne({ _id: req.params.id});
        return res.send({ status: "success", data: article });
    }catch(err){
        console.log(err);
        res.send({ status:"error", message: "Article doesn't exist!"});
    }

}

async function saveArticle(req,res){
    let { error } = await validators.validateArticle({ ...req.body });
    if(error) return res.send({ status: "error", message: error.details[0].message })

    let article = new Article({ ...req.body});
    await article.save();
    res.send({ status: "success", data: article});
}

async function updateArticle(req,res){
    let { error } = await validators.validateArticle({ ...req.body });
    if(error) return res.send({ status: "error", message: error.details[0].message })
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

async function deleteArticle(req,res){
    try{
        await Article.findOneAndDelete({ _id: req.params.id});
        return res.send({ status: "success", message: "Article delete successfully" });
    }catch(err){
        console.log(err);
        res.send({ status:"error", message: "Trying to delete an article that doesn't exist!"});
    }
}

module.exports.getArticles = getArticles;
module.exports.getSingleArticle = getSingleArticle;
module.exports.saveArticle = saveArticle;
module.exports.updateArticle = updateArticle;
module.exports.deleteArticle = deleteArticle;