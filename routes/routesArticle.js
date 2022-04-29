import express from 'express';
import { getArticles, getSingleArticle, 
    saveArticle, updateArticle, 
    deleteArticle, comment, like } from '../controllers/articleController.js';
import  { validateArticle, validateComment, validateLike } from '../middlewares/validations.js';

import auth from '../middlewares/auth.js';
const router = express.Router();

router.get("/articles", getArticles);

router.get("/articles/:id", getSingleArticle);

router.post("/articles", auth, validateArticle, saveArticle);

router.patch("/articles/comment", auth, validateComment, comment);

router.patch("/articles/like", auth, validateLike, like);

router.patch("/articles/:id", auth, validateArticle, updateArticle);

router.delete("/articles/delete/:id", auth, deleteArticle);

export default router;