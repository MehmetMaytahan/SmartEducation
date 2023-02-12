module.exports = roles => {
  return (req, res, next) => {
    const userRole = req.body.role;
    roles.includes(userRole)
      ? next()
      : res.status(401).json({
          success: "fail",
          message: "erisim reddedildi"
        });
  };
};
