const express = require("express");
const router = express.Router();

const { createCategory } = require("../controllers/categoryController");

router.post("/", createCategory); // http://localhost:3000/courses

module.exports = router;
