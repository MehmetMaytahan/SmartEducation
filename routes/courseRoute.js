const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses
} = require("../controllers/courseController");

router.post("/", createCourse); // http://localhost:3000/courses
router.get("/", getAllCourses);

module.exports = router;
