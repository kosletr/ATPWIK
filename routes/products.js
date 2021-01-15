const router = require("express").Router();
const {
  Product,
  validateProduct,
  validateProductId,
} = require("../models/product");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* Get/Add Product(s) */

router.get("/", async (req, res) => {
  const products = await Product.find()
    .populate("categoryId")
    .select({ __v: 0 });
  return res.send(products);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.message);

  const product = await new Product({
    ...req.body,
    ownerId: req.user._id,
  }).save();

  res.send(product._id);
});

/* Get/Add/Remove Liked Products for current User */

router.get("/like", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  res.send(currentUser.likedProducts);
});

router.post("/like", auth, async (req, res) => {
  const { error } = validateProductId(req.body);
  if (error) return res.status(400).send(error.message);

  const productId = req.body.productId;
  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const currentUser = await User.findById(req.user._id);
  const likedProduct = currentUser.likedProducts.includes(productId);
  if (likedProduct)
    return res
      .status(400)
      .send("The product with the given id is liked already.");

  currentUser.likedProducts.push(productId);
  await currentUser.save();

  res.send(productId);
});

router.delete("/like", auth, async (req, res) => {
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const currentUser = await User.findById(req.user._id);
  const likedProduct = currentUser.likedProducts.includes(productId);
  if (!likedProduct)
    return res
      .status(400)
      .send("The product with the given id is not liked already.");

  currentUser.likedProducts.remove(productId);
  await currentUser.save();

  res.send(productId);
});

/* Get/Update/Remove a specific Product */

router.get("/:id", async (req, res) => {
  const productId = req.params._id;
  const product = await Product.findById(productId).select({ __v: 0 });
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.message);

  const product = await Product.findOneAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params._id);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  res.send(product);
});

module.exports = router;
