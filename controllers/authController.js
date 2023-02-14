const User = require("../models/User");
const bcrypt = require("bcrypt");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).render("login", {
      page_name: "login"
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          } else {
            res.status(401).json({
              success: "fail",
              message: "Mail yada sifre hatali"
            });
          }
        });
      }
    });
  } catch (error) {}
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID);
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses
  });
};
