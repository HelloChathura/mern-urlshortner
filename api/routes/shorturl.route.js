import express from 'express';
import { addShortUrl, test } from '../controllers/shorturl.controller.js';

const router = express.Router();

router.get('/test',test);

router.post("/add" ,addShortUrl)

export default router;