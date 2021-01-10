const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send("Admin access only.");
  next();
};
