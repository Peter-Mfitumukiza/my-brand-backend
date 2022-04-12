const router = require('express').Router();
const messageController = require('./controllers/messageController');
const articleController = require('./controllers/articleController');
const userController = require('./controllers/userController');
const auth = require('./middlewares/auth');

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
router.get("/messages", messageController.getMessages);

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
router.post("/messages", messageController.postMessages);

/**
 * @swagger
 * /articles:
 *   get:
 *     description: get all articles
 *     responses:
 *       '200':
 *          description: retrieved articles sucessfully
*/
router.get("/articles", articleController.getArticles);
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

router.get("/articles/:id", articleController.getSingleArticle);
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
router.post("/articles", articleController.saveArticle);

router.patch("/articles/:id", articleController.updateArticle);
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
router.delete("/articles/:id", articleController.deleteArticle);

router.post("/articles/comment", auth, articleController.comment);

router.get("/users", userController.getUsers);
router.post("/users/login", userController.login);
router.post("/users/register", userController.register);

module.exports = router;