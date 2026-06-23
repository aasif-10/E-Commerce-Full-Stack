const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

/**
 * @description Add an item to the cart
 * @route POST /api/carts
 * @access Private
 */
router.post("/", isLoggedIn, addToCart);

/**
 * @description Get all items in the cart for the logged-in user
 * @route GET /api/carts
 * @access Private
 */
router.get("/", isLoggedIn, getCartItems);

/**
 * @description Update the quantity of an item in the cart
 * @route PATCH /api/carts/:id
 * @access Private
 */
router.patch("/:id", isLoggedIn, updateCartItem);

/**
 * @description Remove an item from the cart
 * @route DELETE /api/carts/:id
 * @access Private
 */
router.delete("/:id", isLoggedIn, removeCartItem);

module.exports = router;
