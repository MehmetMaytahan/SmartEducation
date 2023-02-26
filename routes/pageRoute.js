const express = require("express");
const router = express.Router();

const {
  getHomePage,
  getAboutPage,
  getRegisterPage,
  getLoginPage,
  getContactPage,
  sendEMail
} = require("../controllers/pageController");
const redirectMiddleware = require("../middlewares/redirectMiddleware");

router.get("/", getHomePage);
router.get("/about", getAboutPage);
router.get("/register", redirectMiddleware, getRegisterPage);
router.get("/login", redirectMiddleware, getLoginPage);
router.get("/contact", getContactPage);
router.post("/contact", sendEMail);

module.exports = router;
