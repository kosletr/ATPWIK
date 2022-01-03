const router = require("express").Router();
const { Category, validateCategory } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Product } = require("../models/product");

router.get("/", async (req, res) => {
  const categories = await Category.find().select("-__v");
  res.send(categories);
});

router.post("/", [auth, admin], async (req, res) => {
  const { body } = req;
  const { error } = validateCategory(body);
  if (error) return res.status(400).send(error.message);

  const categ = await Category.find({ name: req.body.name });
  if (categ && categ.length !== 0) return res.status(400).send("Category already exists.");

  const category = await new Category(body).save();

  res.send(category._id);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findOneAndDelete({ _id: req.params.id });
  if (!category) return res.status(400).send("Category does not exist.");

  res.status(200);
});

module.exports = router;
