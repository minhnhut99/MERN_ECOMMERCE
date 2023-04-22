const express = require("express");
// const API_CONSTANT = require("../config/api_constant/ApiConstant");
// const authenticationToken = require("../middleware/auth");
// const controllerUser = require("../controllers/ControllerUser");
const { register, login } = require("../controllers/ControllerUser");
const router = new express.Router();
router.post("/register", register);
router.post("/login", login);
// router.post(API_CONSTANT.LOGIN, controllerUser.login);
// router.post(API_CONSTANT.REGISTER, controllerUser.register);
// router
//   .route("/profile")
//   .get(authenticationToken, controllerUser.getUserProfile);
module.exports = router;
