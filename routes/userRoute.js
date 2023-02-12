const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", createUser); // http://localhost:3000/users/signup
router.post("/login", loginUser); // http://localhost:3000/users/login
router.get("/logout", logoutUser); // http://localhost:3000/users/logout
router.get("/dashboard", authMiddleware, getDashboardPage); // http://localhost:3000/users/logout

module.exports = router;
