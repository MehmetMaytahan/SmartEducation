const express = require("express");
const router = express.Router();

const {
  getHomePage,
  getAboutPage,
  getRegisterPage,
  getLoginPage
} = require("../controllers/pageController");

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);

module.exports = router;
