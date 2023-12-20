import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
  shorturl:{
    type:String,
    required:false,
    unique:true,
  },
  originalurl:{
    type:String,
    required:true,
  },
  createuser:{
    type:Int,
    required:false,
  }

},{timestamps:true});

const ShortUrl = mongoose.model('ShortUrl',shortUrlSchema);

export default ShortUrl;