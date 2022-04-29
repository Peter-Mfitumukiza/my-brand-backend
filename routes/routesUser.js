import express from 'express';
import { getUsers, login, register } from '../controllers/userController.js';
import { validateUser, validateLogin } from '../middlewares/validations.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get("/users", auth, getUsers);

router.post("/users/login", validateLogin, login);

router.post("/users/register", validateUser, register);

export default router;