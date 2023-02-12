const redirectMiddleware = (req, res, next) => {
  userIN ? res.redirect("/") : next();
};

module.exports = redirectMiddleware;
