const router = require('express').Router();
const messageController = require('./controllers/messageController');

router.get("/messages", messageController.getMessages);
router.post("/messages", messageController.postMessages);

module.exports = router;