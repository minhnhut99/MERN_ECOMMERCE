const bcrypt = require("bcryptjs");
const https = require("../helper/https/Https");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const saveToken = require("../utils/jwtToken");
const User = require("../models/ModelUser");
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const userInfo = {
        id: user._id,
        email: user.email,
        username: user.username,
      };
      https.success(res, userInfo, "get profie successfully");
    }
  } catch (error) {
    console.log("message error", error);
  }
};

exports.register = catchAsyncErrors(async (req, res) => {
  try {
    const { username, password, email, avatar, role, phone, address } = req.body;
    if (role && role.toLowerCase() === 'admin') {
      return https.fail(res, "Registration with 'admin' role is not allowed");
    }
    if (!username || !email || !password) {
      return https.fail(res, "Missing username, email, or password");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return https.fail(res, "Username already taken!");
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      username,
      password: encryptedPassword,
      email,
      avatar,
      address,
      phone
    });
    await saveToken(user, 201, res);
  } catch (error) {
    console.log("error", error);
  }
});
exports.login = catchAsyncErrors(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return https.fail(res, "Username and password is required");
    }
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      return saveToken(user, 200, res);
    }
    return https.fail(res, "Invalid Credentials");
  } catch (error) {
    console.log(error.message);
  }
});
