import express from 'express';
import { addShortUrl, test, getActualUrlFromShortCode } from '../controllers/shorturl.controller.js';

const router = express.Router();

router.get('/test',test);

router.post("/add" ,addShortUrl);

router.post('/getActualUrl',getActualUrlFromShortCode);

export default router;