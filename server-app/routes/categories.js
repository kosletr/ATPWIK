const router = require("express").Router();
const { Category, validateCategory } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  // #swagger.tags = ['Categories']
  const categories = await Category.find().select("-__v");
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Categories']
  const category = await Category.find({ _id: req.params.id }).select("-__v");
  res.send(category);
});

router.post("/", [auth, admin], async (req, res) => {
  // #swagger.tags = ['Categories', 'Admin']
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.message);

  const { name } = req.body;
  const category = await Category.find({ name });
  if (category && category.length !== 0) return res.status(400).send("Category already exists.");

  const { _id: newId } = await new Category(req.body).save();

  res.send(newId);
});

router.put("/:id", [auth, admin], async (req, res) => {
  // #swagger.tags = ['Categories', 'Admin']
  // const { error } = validateCategory(req.body);
  // if (error) return res.status(400).send(error.message);

  const { id: _id } = req.params;
  const { name } = req.body;
  const category = await Category.find({ _id, name });
  if (!category) return res.status(404).send("This category does not exist.");

  await Category.findOneAndUpdate({ _id }, { name });
  res.send(newId);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  // #swagger.tags = ['Categories','Admin']
  const { id } = req.params;
  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) return res.status(400).send("Category does not exist.");

  res.status(200);
});

module.exports = router;
