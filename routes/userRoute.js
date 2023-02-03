const express = require("express");
const { createUser } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", createUser); // http://localhost:3000/users/signup

module.exports = router;
