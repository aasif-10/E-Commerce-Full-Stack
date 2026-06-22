const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const {
  getProducts,
  getProductById,
} = require("../controllers/productControllers");

/**
 * @description Get all products
 * @route GET /api/products
 * @access Private
 */
router.get("/", isLoggedIn, getProducts);

/**
 * @description Get a product by ID
 * @route GET /api/products/:id
 * @access Private
 */
router.get("/:id", isLoggedIn, getProductById);

module.exports = router;
