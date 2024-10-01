const express = require("express");
/**
 * monngoose controller
 */
// const {
//   getAllProducts,
//   createProducts,
// } = require("../controllers/productController");

/**
 * mysql controller
 */
const {
  getAllProducts,
  createProducts,
} = require("../controllers/mysql-controller/productController");

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createProducts);

module.exports = router;
