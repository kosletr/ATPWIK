const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send("Welcome to the api.");
});

module.exports = router;
