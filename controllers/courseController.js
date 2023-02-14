const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      user: req.session.userID
    });
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .populate("user"); // son yuklenenden itibaren siraliyor
    const categories = await Category.find().sort({ name: "asc" }); // alfabe'ye gore siraliyor
    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses"
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find().sort({ name: "asc" }); // alfabe'ye gore siraliyor

    res.status(200).render("course", {
      page_name: "courses",
      course,
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
};
