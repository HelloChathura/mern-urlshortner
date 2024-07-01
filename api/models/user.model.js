import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
      },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isverified: {
    type: Boolean,
    required: true,
  },
  islockedout: {
    type: Boolean,
    required: false,
  },
  lastlockedoutdate: {
    type: Date,
    required: false,
  },
  isactive: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;