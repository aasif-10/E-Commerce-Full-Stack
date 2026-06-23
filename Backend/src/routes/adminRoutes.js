const express = require("express");
const router = express.Router();
const {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { isAdmin } = require("../middlewares/isAdmin");
const upload = require("../config/multer-config");
const {
  updateOrderStatus,
  getAllOrders,
  getOrderById,
} = require("../controllers/orderController");

/**
 * @description Get all products (Admin only)
 * @route GET /api/admin/products
 * @access Private (Admin)
 */
router.get("/products", isLoggedIn, isAdmin, getProducts);

/**
 * @description Get a product by ID (Admin only)
 * @route GET /api/admin/products/:id
 * @access Private (Admin)
 */
router.get("/products/:id", isLoggedIn, isAdmin, getProductById);

/**
 * @description Create a new product (Admin only)
 * @route POST /api/admin/products
 * @access Private (Admin)
 */
router.post(
  "/products",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  createProduct,
);

/**
 * @description Update a product by ID (Admin only)
 * @route PATCH /api/admin/product/:id
 * @access Private (Admin)
 */
router.patch(
  "/products/:id",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  updateProduct,
);

/**
 * @description Delete a product by ID (Admin only)
 * @route DELETE /api/admin/products/:id
 * @access Private (Admin)
 */
router.delete("/product/:id", isLoggedIn, isAdmin, deleteProduct);

/**
 * @description Get all orders (Admin only)
 * @route GET /api/admin/orders
 * @access Private (Admin)
 */
router.get("/orders", isLoggedIn, isAdmin, getAllOrders);

/**
 * @description Get an order by ID (Admin only)
 * @route GET /api/admin/orders/:id
 * @access Private (Admin)
 */
router.get("/orders/:id", isLoggedIn, isAdmin, getOrderById);

/**
 * @description Update order status
 * @route PATCH /api/orders/:id/status - Update order status
 * @access Private (Admin only)
 */
router.patch("/:id/status", isLoggedIn, isAdmin, updateOrderStatus);

module.exports = router;
