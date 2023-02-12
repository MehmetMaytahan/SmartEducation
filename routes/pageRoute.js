const express = require("express");
const router = express.Router();

const {
  getHomePage,
  getAboutPage,
  getRegisterPage,
  getLoginPage
} = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/register", redirectMiddleware, getRegisterPage);
router.get("/login", redirectMiddleware, getLoginPage);

module.exports = router;
