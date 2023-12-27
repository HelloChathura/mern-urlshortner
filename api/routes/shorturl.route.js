import express from 'express';
import { addShortUrl, test, getActualUrlFromShortCode } from '../controllers/shorturl.controller.js';

const router = express.Router();

router.get('/test',test);

router.post("/add" ,addShortUrl);

router.get('/getUrl',getActualUrlFromShortCode);

export default router;