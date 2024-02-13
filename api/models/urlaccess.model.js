import mongoose from 'mongoose';

const urlAccessSchema = new mongoose.Schema({
  shortUrlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShortUrl',
    required: true,
  },
  browserAgent: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UrlAccess = mongoose.model('UrlAccess', urlAccessSchema);

//module.exports = UrlAccess;
export default UrlAccess;