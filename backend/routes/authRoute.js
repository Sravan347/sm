const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/adminAuth"); 
const rateLimit = require("express-rate-limit"); 

// Limit: 5 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // Max 5 requests
  message: {
    message: "Too many login attempts, please try again after 15 minutes",
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});
// Admin Auth Routes
router.post("/login", loginLimiter, login);       // POST /api/auth/login
router.post("/logout", logout);

module.exports = router;
