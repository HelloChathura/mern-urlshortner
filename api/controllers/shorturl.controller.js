import ShortUrl from "../models/shorturl.model.js";
import crypto from "crypto";
import UrlAccess from "../models/urlaccess.model.js";
import browser from "detect-browser";


export const test = (req, res) => {
  res.json({
    message: "from c",
  });
};

export const addShortUrl = async (req, res, next) => {

  const { shorturl, originalurl,clickcount, createduser = 1,updateduser=1 } = req.body;
  const uniqueShortUrl = await generateUniqueShortUrl();

  const newReq = new ShortUrl({
    shorturl: uniqueShortUrl,
    originalurl,
    clickcount,
    createduser,
    updateduser
  });

  try {
    await newReq.save();
    res.status(201).json(newReq);
  } catch (error) {
    next(error);
  }
};

function generateRandomText() {
  const length = 5;
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomText = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    randomText += charset[randomIndex];
  }

  return randomText;
}

async function generateUniqueShortUrl() {
    let rndshorturltext;
    let rndshorturl;
    let isShortUrlExists;

    do {
        rndshorturltext = generateRandomText();
        rndshorturl = "http://localhost:5173/" + rndshorturltext;

        isShortUrlExists = await ShortUrl.findOne({ shorturl: rndshorturl });

    } while (isShortUrlExists);

    return rndshorturl;
}

export const getActualUrlFromShortCode = async (req, res, next) => {
  try {

      const x = "http://localhost:5173/" + req.body.shortCode;
      const shortUrl = await ShortUrl.findOne({ shorturl: x });
      if (!shortUrl) {
          return res.status(404).json({ error: 'Short URL not found' });
      }

      //Update Tracker
    const userAgent = req.headers['user-agent'];

    const ua = userAgent;
    const browserRegex = /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i;
    const match = ua.match(browserRegex) || [];

    const urlAccess = await UrlAccess.create({
      shortUrlId: shortUrl._id,
      browserAgent: match[1] || '' +" " + match[2] || '0',
      ipAddress: req.ip, 
      timestamp: Date.now(),
    });
    await UrlAccess.updateOne({ $push: { UrlAccess: urlAccess } });

    const actualUrl = shortUrl.originalurl;
    res.json({ actualUrl });
  } catch (error) {
      console.error('Error fetching actual URL:', error);
      res.status(500).json({ error: 'Error fetching actual URL' });
  }
};


