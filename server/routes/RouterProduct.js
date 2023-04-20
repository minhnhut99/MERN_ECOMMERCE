const express = require("express");
const { getAllProduct, getAdminAllProduct } = require("../controllers/ControllerProduct");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = new express.Router();
router.get("/products", getAllProduct);
router.get("/admin/products", isAuthenticatedUser, authorizeRoles('admin'),getAdminAllProduct);
module.exports = router;
