const express = require("express");
const router = express.Router();

const { createCourse } = require("../controllers/courseController");

router.post("/", createCourse); // http://localhost:3000/courses

module.exports = router;
