const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  cover: {
    type: String,
  },
  token: { type: String },
});

// JWT TOKEN
userSchema.methods.getJWTToken = () => {
  return jwt.sign({ id: this._id }, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = () => {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  console.log("resetToken", resetToken);
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
