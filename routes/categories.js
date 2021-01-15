const router = require("express").Router();
const { Category, validateCategory } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/", [auth, admin], async (req, res) => {
  const { body } = req;
  const { error } = validateCategory(body);
  if (error) return res.status(400).send(error.message);

  const category = await new Category(body).save();

  res.send(category._id);
});

module.exports = router;
