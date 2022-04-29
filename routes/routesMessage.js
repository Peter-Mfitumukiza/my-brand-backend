import express from 'express';
import { getMessages, postMessages } from '../controllers/messageController.js';
import { validateMessage } from '../middlewares/validations.js';

const router = express.Router();

router.get("/messages", getMessages);

router.post("/messages/new", validateMessage ,postMessages);

export default router;