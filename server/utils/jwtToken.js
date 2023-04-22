// Create Token and saving in cookie
const saveToken = (user, statusCode, res) => {
  const auth = {
    token: user.getJWTToken(),
    role: user.role,
  };
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  console.log("usesrrr", user);
  res.status(statusCode).cookie("auth", auth, options).json({
    success: true,
    user,
    auth,
  });
};

module.exports = saveToken;
