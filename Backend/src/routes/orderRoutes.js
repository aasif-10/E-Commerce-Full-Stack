const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  createOrder,
  getOrderById,
  getAllOrderByUser,
} = require("../controllers/orderController");
const router = express.Router();

/**
 * @description Get all orders for a specific user
 * @route GET /api/orders - Get all orders for a specific user
 * @access Private
 */
router.get("/", isLoggedIn, getAllOrderByUser);

/**
 * @description Get order by ID
 * @route GET /api/orders/:id - Get order by ID
 * @access Private
 */
router.get("/:id", isLoggedIn, getOrderById);

/**
 * @description Create a new order
 * @route POST /api/orders - Create a new order
 * @access Private
 */
router.post("/", isLoggedIn, createOrder);

module.exports = router;
