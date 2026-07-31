import express from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;