const router = require("express").Router();
const { Product, validateProduct } = require("../models/product");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Like } = require("../models/like");

/* Get all user's products */
router.get("/", auth, async (req, res) => {
  const products = await Product.find({ owner: req.user._id })
    .populate({ path: "category", select: "-__v" })
    .populate({ path: "owner", select: "username" })
    .select("-__v");
  res.send(products);
});

/* Get/Add/Update/Remove a user's product */
router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId)
    .populate({ path: "category", select: "-__v" })
    .select({ __v: 0 });
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  res.send(product);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.message);

  const product = await new Product({
    ...req.body,
    owner: req.user._id,
  }).save();

  res.send(product._id);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.message);

  let product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  if (product.owner._id !== req.user._id)
    return res.status(401).send("You do not own this product.");

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category.");

  req.body.owner = req.user;

  product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-__v");
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  res.send(product);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;

  if (product.owner._id !== userId)
    return res.status(401).send("You do not own this product.");

  // Todo: use fawn here
  await Like.findOneAndDelete({ productId, userId });
  // await Product.findByIdAndRemove(productId);

  res.send(product);
});

module.exports = router;
