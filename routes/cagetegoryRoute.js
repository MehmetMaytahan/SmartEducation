const express = require("express");
const router = express.Router();

const { createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

router.post("/", createCategory); // http://localhost:3000/category
router.put("/:id", updateCategory); // http://localhost:3000/category/:id
router.delete("/:id", deleteCategory); // http://localhost:3000/category/:id

module.exports = router;
