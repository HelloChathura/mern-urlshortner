import ShortUrl from "../models/shorturl.model.js";
import crypto from "crypto";

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

export const getActualUrlFromShortCode = async (req,res) => {
    console.log("inside");
    const shortUrl = await ShortUrl.findOne({shorturl : req.body.shortUrl});
    console.log("-----------------------");
    console(shortUrl);
    console.log("-----------------------");
    await res.ShortUrl;
}
