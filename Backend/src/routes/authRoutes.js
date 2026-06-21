const express = require("express");
const {
  healthCheckController,
} = require("../controllers/healthCheckController");
const {
  register,
  login,
  logout,
  verifyOtp,
  getMe,
} = require("../controllers/authControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

/**
 * @description: Health check route to verify if the backend server is running
 * @route GET /api/auth/health
 * @access: Public
 */
router.get("/health", healthCheckController);

/**
 * @description: User registration route to create a new user account
 * @route POST /api/auth/register
 * @access: Public
 */
router.post("/register", register);

/**
 * @description: User login route to authenticate a user and generate a JWT token
 * @route POST /api/auth/login
 * @access: Public
 */
router.post("/login", login);

/**
 * @description: User logout route to clear the JWT token from cookies
 * @route GET /api/auth/logout
 * @access: Public
 */
router.get("/logout", logout);

/**
 * @description: Verify OTP route to validate the OTP sent to the user's email
 * @route POST /api/auth/verify-otp
 * @access: Public
 */
router.post("/verify-otp", verifyOtp);

/**
 * @description: Get current user details route to fetch the authenticated user's information
 * @route GET /api/auth/get-me
 * @access: Private (requires authentication)
 */
router.get("/get-me", isLoggedIn, getMe);
module.exports = router;
