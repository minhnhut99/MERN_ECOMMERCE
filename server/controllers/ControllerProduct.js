const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const https = require("../helper/https/Https")
const Products = require("../models/ModelProduct");
// const ApiCommon = require("../utils/ApiCommon");
exports.createProduct = () => catchAsyncErrors(async(req, res, next) => {
  
})
exports.getAdminAllProduct = () =>
  catchAsyncErrors(async (req, res, next) => {
    const products = await Products.find();
    https.success(res, products, "get all products admin successfully!")
  });
exports.getAllProduct = async (req, res, next) => {
  const resultPerPage = 8;

  const productsCount = await Products.countDocuments();

  // const apiCommon = new ApiCommon(Products.find(), req.query);

  // let products = await apiCommon.query;

  // const filteredProductsCount = products.length;

  // apiCommon.pagination(resultPerPage);

  // products = await apiCommon.query;

  res.status(200).json({
    success: true,
    // products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  });
};
exports.updateProduct = async (req, res) => {};
