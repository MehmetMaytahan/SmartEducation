exports.getHomePage = (req, res) => {
  res.status(200).render("index", {
    page_name: "index"
  });
  console.log(req.session.userID);
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about"
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register"
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login"
  });
};
