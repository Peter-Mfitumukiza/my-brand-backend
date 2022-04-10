const router = require('express').Router();
const messageController = require('./controllers/messageController');
const articleController = require('./controllers/articleController');

router.get("/messages", messageController.getMessages);
router.post("/messages", messageController.postMessages);

router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getSingleArticle);
router.post("/articles", articleController.saveArticle);
router.patch("/articles/:id", articleController.updateArticle);
router.delete("/articles/:id", articleController.deleteArticle);

module.exports = router;