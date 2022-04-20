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
 *     summary: Get all messages
 *     tags:
 *       - Messages
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
 *     tags:
 *       - Messages
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
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       '200':
 *          description: retrieved articles sucessfully
*/
router.get("/articles", getArticles);
/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get a single article
 *     tags:
 *       - Articles
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
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               cover:
 *                 type: string   
 *               enableComments:
 *                 type: boolean
 *               publish:
 *                 type: boolean 
 *     responses:
 *       '201': 
 *          description: Article created successfully  
 *       '400':
 *          description: comment not created, something is wrong with your request      
*/
router.post("/articles", auth, validateArticle, saveArticle);

/**
 * @swagger
 * /articles/comment:
 *   patch:
 *     summary: Comment on an article.
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               articleId:
 *                 type: string
 *               user:
 *                 type: object   
 *     responses:
 *       '201': 
 *          description: comment created successfully
 *       '400':
 *          description: comment not created, something is wrong with your request          
*/
router.patch("/articles/comment", auth, validateComment, comment);

/**
 * @swagger
 * /articles/like:
 *   patch:
 *     summary: Like an article.
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleId:
 *                 type: string
 *               user:
 *                 type: object    
 *     responses:
 *       '201': 
 *          description: message created successfully  
 *       '400':
 *          description: like not saved, something is wrong with your request      
*/

router.patch("/articles/like", auth, validateLike, like);

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: Update an article.
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               cover:
 *                 type: string   
 *               enableComments:
 *                 type: boolean
 *               publish:
 *                 type: boolean   
 *     responses:
 *       '201': 
 *          description: message created successfully  
 *       '400':
 *          description: like not saved, something is wrong with your request      
*/
router.patch("/articles/:id", auth, validateArticle, updateArticle);
/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete a single article.
 *     tags:
 *       - Articles
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
router.delete("/articles/:id", auth, deleteArticle);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *          description: retrieved all users sucessfully
*/
router.get("/users", auth, getUsers);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string 
 *     responses:
 *       '200': 
 *          description: logged in successfully  
 *       '400':
 *          description: something is wrong with your request    
 *       '401':
 *          description: logging in failed, invalid email or password    
*/
router.post("/users/login", validateLogin, login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user.
 *     tags:
 *       - Users
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
 *               password:
 *                 type: string 
 *               image:
 *                 type: string 
 *     responses:
 *       '200': 
 *          description: user registered successfully  
 *       '400':
 *          description: user not registered, something is wrong with your request    
*/
router.post("/users/register", validateUser, register);

export default router;