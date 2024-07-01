import express from 'express';
import { registerNewUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerNewUser);

export default router;