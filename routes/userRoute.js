const express = require("express");
const { createUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", createUser); // http://localhost:3000/users/signup
router.post("/login", loginUser); // http://localhost:3000/users/login

module.exports = router;
