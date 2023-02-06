const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", createUser); // http://localhost:3000/users/signup
router.post("/login", loginUser); // http://localhost:3000/users/login
router.get("/logout", logoutUser); // http://localhost:3000/users/logout

module.exports = router;
