const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourse
} = require("../controllers/courseController");

router.post("/", createCourse); // http://localhost:3000/courses
router.get("/", getAllCourses);
router.get("/:slug", getCourse);

module.exports = router;
