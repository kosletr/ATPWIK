const router = require("express").Router();
const { User } = require("../models/user");
const { Product } = require("../models/product");
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* Get/Add/Remove Products from/to favourites */

router.get("/", auth, async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  res.send(currentUser.likedProducts);
});

router.post("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const currentUser = await User.findById(req.user._id);
  const likedProduct = currentUser.likedProducts.includes(productId);
  if (likedProduct)
    return res
      .status(400)
      .send(
        "The product with the given id has already been added in favourites."
      );

  currentUser.likedProducts.push(productId);
  await currentUser.save();

  res.send(productId);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const currentUser = await User.findById(req.user._id);
  const likedProduct = currentUser.likedProducts.includes(productId);
  if (!likedProduct)
    return res
      .status(400)
      .send(
        "The product with the given id has already been removed from favourites."
      );

  currentUser.likedProducts.remove(productId);
  await currentUser.save();

  res.send(productId);
});

module.exports = router;
