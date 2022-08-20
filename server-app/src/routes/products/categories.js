const router = require("express").Router();
const validateCategory = require("../../routes/validation/validateCategory");
const db = require("../../startup/db");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await db.getAllCategories();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  const categoryId = req.params.id;
  const category = await db.getCategoryById(categoryId);
  return res.send(category);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.message);

  const { name: categoryName } = req.body;

  const category = await db.getCategoryByName(categoryName);
  if (category) return res.status(400).send("Category already exists.");

  const categoryInfo = { name: categoryName };
  const categoryId = await db.createCategory(categoryInfo);

  return res.send(categoryId);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.message);

  const categoryId = req.params.id;
  const { name: newCategoryName } = req.body;

  const category = await db.getCategoryById(categoryId);
  if (!category) return res.status(404).send("This category does not exist.");

  await db.updateCategoryName(categoryId, newCategoryName);

  return res.send(categoryId);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const categoryId = req.params.id;

  const category = await db.getCategoryById(categoryId);
  if (!category) return res.status(404).send("This category does not exist.");

  await db.deleteCategory(categoryId);

  return res.send(categoryId);
});

module.exports = router;
