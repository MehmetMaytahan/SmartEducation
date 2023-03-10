const { validationResult } = require("express-validator");

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
    const ReqErrors = validationResult(req);
    const { errors } = ReqErrors;
    console.log(errors);
    for (err of errors) {
      req.flash("error", `${err.msg}`);
      console.log(err.msg);
    }
    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email === "" ? "a" : req.body.email;
    const password = req.body.password;

    const userFind = await User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          } else {
            req.flash("error", "Parola Veya Şifre Hatali");
            res.status(400).redirect("/login");
          }
        });
      } else {
        req.flash("error", "Doğru Email Adresi Yada Şifre Giriniz! ");
        res.status(400).redirect("/login");
      }
    });

    email ? userFind : res.status(400).redirect("/login");
  } catch (error) {}
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const courses = await Course.find({ user: req.session.userID });
  const user = await User.findById(req.session.userID).populate("courses");
  const categories = await Category.find();

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses
  });
};
