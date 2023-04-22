const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/ModelUser");
const https = require("../helper/https/Https");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.auth.token;
  if (!token) {
    return https.unauthorized(
      res,
      {},
      "Please Login to access this resourcePlease Login to access this resource"
    );
  }

  const decodedData = jwt.verify(token, process.env.TOKEN_KEY);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    roles === req.cookies.auth.role
      ? next()
      : https.forbidden(
          res,
          {},
          "Role user is not allowed to access this resource"
        );
  };
};
