const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const https = require("../helper/https/Https");
const User =  require("../models/ModelUser")

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

exports.register = async (req, res) => {
  try {
    const { username, password, email, avatar } = req.body;
    if (!(username && email && password)) {
      https.fail(res, "Missing username or password");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      https.fail(res, "Username already taken!");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.toLowerCase(),
      password: encryptedPassword,
      email: email.toLowerCase(),
      avatar
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: 900,
      }
    );
    user.token = token;
    https.success(res, user, "Create user successfully!")
  } catch (error) {
    console.log("error", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      https.fail(res, {}, "Username and password is required");
    }
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: 900,
        }
      );
      user.token = token;
      https.success(res, user, "Login successfully!");
    }
    https.fail(res, {}, "Invalid Credentials");
  } catch (error) {
    console.log(error.message);
  }
};
