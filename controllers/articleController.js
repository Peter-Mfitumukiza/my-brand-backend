import Article from '../models/Article.js';

export const getArticles = async(req,res)=>{
    let articles = await Article.find();
    return res.status(200).json({ status:"success", data: articles });
}

export const getSingleArticle = async(req,res)=>{
    try{
        let article = await Article.findOne({ _id: req.params.id});
        return res.json({ status: "success", data: article });
    }catch(err){
        res.status(404).json({ status:"error", message: "Article doesn't exist!"});
    }

}

export const saveArticle = async(req,res)=>{
    let article = new Article({ ...req.body});
    await article.save();
    res.status(201).json({ status: "success", data: article});
}

export const updateArticle = async(req,res)=>{
    try{
        let article = await Article.findOne({ _id: req.params.id});
        article.title = req.body.title;
        article.description = req.body.description;
        article.content = req.body.content;
        article.cover = req.body.cover;
        article.publish = req.body.publish;
        article.enableComments = req.body.enableComments;
        await article.save();
        res.status(200).json({ status: "success", data: article});
    }catch(err){
        res.status(404).json({ status: "error", message: "Trying to update an article which doesn't exist" });
    }
}

export const deleteArticle = async(req,res)=>{
    try{
        await Article.findOneAndDelete({ _id: req.params.id});
        return res.status(200).json({ status: "success", message: "Article delete successfully" });
    }catch(err){
        res.status(404).json({ status:"error", message: "Trying to delete an article that doesn't exist!"});
    }
}

export const comment = async(req,res)=>{
    try{
        let article = await Article.findOne({ _id: req.body.articleId});
        article.comments.push({  
            content: req.body.content,
            user: req.body.user
        });
        await article.save();
        return res.status(200).json({ status: "success", data: article });
    }catch(err){
        return res.status(404).json({ status:"error", message: "Trying to comment on an article that doesn't exist!"});
    }
}

export const like = async(req,res)=>{
    try{
        let article = await Article.findOne({ _id: req.body.articleId});
        let ids = [];
        article.likes.forEach( (like) => {
            ids.push(like._id);
        });

        if(ids.includes(req.body.user._id)){
            let index = article.likes.indexOf(req.body.user);
            console.log(index);
            article.likes.splice(index, 1);
            await article.save();
            return res.status(200).json({status:"success", data: article});
        }

        article.likes.push(req.body.user);
        await article.save();
        return res.status(200).json({ status: "success", data: article });
    }catch(err){
        return res.status(404).json({ status:"error", message: "Trying to like an article that doesn't exist!"});
    }
}