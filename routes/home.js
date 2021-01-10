const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is home");
});

router.get("/api", (req, res) => {
  res.send("This is the api");
});

module.exports = router;
