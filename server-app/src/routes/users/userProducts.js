const router = require("express").Router();
const validateProduct = require("../../routes/validation/validateProduct");
const db = require("../../startup/db");
const auth = require("../../middleware/auth");

/* Get all user's products */
router.get("/", auth, async (req, res) => {
  const userId = req.user._id;

  const products = await db.getProductsByUser(userId);
  return res.send(products);
});

/* Get/Add/Update/Remove a user's product */
router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await db.getProductByIdWithCategory(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");
  return res.send(product);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.message);

  const { title, category, price, shortDesc, description, imageURL } = req.body;
  const newProduct = { title, category, price, shortDesc, description, imageURL, owner: req.user._id };

  const productId = await db.createProduct(newProduct);
  return res.send(productId);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.message);

  const productId = req.params.id;
  let product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  if (String(product.owner) !== req.user._id) return res.status(401).send("You do not own this product.");

  const categoryId = req.body.category;
  const categ = await db.getCategoryById(categoryId);
  if (!categ) return res.status(400).send("Invalid category.");

  const { title, category, price, shortDesc, description, imageURL } = req.body;
  const productInfo = { title, category, price, shortDesc, description, imageURL, owner: req.user };

  product = await db.updateProduct(productId, productInfo);
  if (!product) return res.status(404).send("The product with the given id was not found.");
  return res.send(productId);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  if (String(product.owner) !== req.user._id) return res.status(401).send("You do not own this product.");

  await db.deleteProductById(productId);
  return res.send(productId);
});

module.exports = router;
