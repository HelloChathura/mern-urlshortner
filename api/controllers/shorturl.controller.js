import ShortUrl from "../models/shorturl.model.js";
import crypto from "crypto";

export const test = (req, res) => {
  res.json({
    message: "from c",
  });
};

export const addShortUrl = async (req, res, next) => {
  let rndshorturl = "";
  const { shorturl, originalurl, createduser=1 } = req.body;

    let rndshorturltext = generateRandomText();
    rndshorturl = "https://urlex.site/" + rndshorturltext;
    //const clientIp = req.header("x-forwarded-for") || req.socket.remoteAddress;
    //console.log(ipAddress);

  const newReq = new ShortUrl({
    shorturl: rndshorturl,
    originalurl,
    createduser,
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
