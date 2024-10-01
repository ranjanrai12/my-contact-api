const expresshandler = require("express-async-handler");
const productModel = require("../models/productModel");

/**
 * @GET all products
 * @route /api/product
 * @access public
 */
const getAllProducts = expresshandler(async (req, res, next) => {
  const product = await productModel.find({});
  if (!product) {
    res.status(404);
    throw new Error("Product is not found");
  }
  res.status(200).json(product);
});

/**
 * @POST all products
 * @route /api/product
 * @access public
 */
const createProducts = expresshandler(async (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || !description || !price) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await productModel.create({
    name,
    description,
    price,
    // admin: req.user.userName,
  });
  res.status(201).json(contact);
});

module.exports = { getAllProducts, createProducts };
