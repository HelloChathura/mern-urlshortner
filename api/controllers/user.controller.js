import User from "../models/user.model.js";
import crypto from "crypto";
import browser from "detect-browser";

export const registerNewUser = async (req, res, next) => {

    const { fullname, email,password, isverified,islockedout=0,lastlockedoutdate=null,isactive=1, } = req.body;
  
    const user = new User({
      fullname,
      email,
      password,
      isverified,
      islockedout,
      lastlockedoutdate,
      isactive
    });
  
    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };