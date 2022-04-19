import express from 'express';
import { getMessages, postMessages } from './controllers/messageController.js';
import { getArticles, getSingleArticle, 
        saveArticle, updateArticle, 
        deleteArticle, comment, like } from './controllers/articleController.js';
import { getUsers, login, register } from './controllers/userController.js';
import { validateArticle, validateMessage, validateLike,
        validateUser, validateLogin, validateComment } from './middlewares/validations.js';
import auth from './middlewares/auth.js';

const router = express.Router();

// Routes
/**
 * @swagger
 * /messages:
 *   get:
 *     description: messages
 *     responses:
 *       '200':
 *          description: retrieved messages sucessfully
*/
router.get("/messages", getMessages);

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               content:
 *                 type: string    
 *     responses:
 *       '201': 
 *          description: message created successfully       
*/
router.post("/messages", validateMessage ,postMessages);

/**
 * @swagger
 * /articles:
 *   get:
 *     description: get all articles
 *     responses:
 *       '200':
 *          description: retrieved articles sucessfully
*/
router.get("/articles", getArticles);
/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     description: get a single article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the article to retrieve.
 *         schema:
 *           type: integer    
 *     responses:
 *       '200':
 *          description: a single article
*/

router.get("/articles/:id", getSingleArticle);
/**
 * @swagger
 * /articles:
 *   post:
 *     summary: create an article.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               content:
 *                 type: string    
 *     responses:
 *       '201': 
 *          description: message created successfully       
*/
router.post("/articles", validateArticle, saveArticle);

router.patch("/articles/comment", auth, validateComment, comment);
router.patch("/articles/like", auth, validateLike, like);
router.patch("/articles/:id", validateArticle, updateArticle);
/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     description: delete a single article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the article to delete.
 *         schema:
 *           type: integer    
 *     responses:
 *       '200':
 *          description: deleted successfully
*/
router.delete("/articles/:id", deleteArticle);



router.get("/users", getUsers);
router.post("/users/login", validateLogin, login);
router.post("/users/register", validateUser, register);

export default router;