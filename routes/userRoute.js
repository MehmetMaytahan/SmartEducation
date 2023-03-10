const express = require("express");
const { body } = require("express-validator");
const User = require("../models/User");

const {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// http://localhost:3000/users/signup
router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Lütfen İsim Giriniz! "),
    body("email")
      .isEmail()
      .trim()
      .escape()
      .withMessage("Lütfen Email Adresi Giriniz! ")
      .custom(userEmail => {
        return User.findOne({ email: userEmail }).then(user => {
          if (user) {
            return Promise.reject("Email Zaten Kullanimda ");
          }
        });
      }),
    body("password").not().isEmpty().withMessage("Lütfen Şifre Giriniz! ")
  ],
  createUser
);

// http://localhost:3000/users/login
router.post(
  "/login",
  [
    body("name").not().isEmpty().withMessage("Lütfen İsim Giriniz! "),
    body("password").not().isEmpty().withMessage("Lütfen Parola Giriniz! ")
  ],
  loginUser
);
router.get("/logout", logoutUser); // http://localhost:3000/users/logout
router.get("/dashboard", authMiddleware, getDashboardPage); // http://localhost:3000/users/logout

module.exports = router;
