const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Please login.");

  try {
    const user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};
