const express = require("express");
const router = express.Router();

const {
  getHomePage,
  getAboutPage,
  getRegisterPage
} = require("../controllers/pageController");

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/register", getRegisterPage);

module.exports = router;
