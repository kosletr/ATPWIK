const router = require("express").Router();
const { Category, validateCategory } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await Category.find().select("-__v");
  res.send(categories);
});

router.post("/", [auth, admin], async (req, res) => {
  const { body } = req;
  const { error } = validateCategory(body);
  if (error) return res.status(400).send(error.message);

  const categ = await Category.find({ name: req.body.name });
  if (categ) return res.status(400).send("Category exists already.");

  const category = await new Category(body).save();

  res.send(category._id);
});

module.exports = router;
