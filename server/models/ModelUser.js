const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter your username"],
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters"],
    required: [true, "Enter your password"],
  },
  avatar: {
    type:String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
  cover: {
    type: String,
  },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
