const router = require("express").Router();
const { Product } = require("../../models/product");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { Like, validateLike } = require("../../models/like");

/* Get/Add/Remove Products from/to favourites */

router.get("/", auth, async (req, res) => {
  const liked = await Like.find({ userId: req.user._id }).distinct("productId");

  res.send(liked);
});

router.get("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;
  const data = { userId, productId };

  const liked = await Like.findOne(data);
  if (!liked) return res.send({ liked: false });

  res.send({ liked: true });
});

router.post("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;
  const data = { userId, productId };

  const liked = await Like.findOne(data);
  if (liked)
    return res
      .status(400)
      .send(
        "The product with the given id has already been added to favourites."
      );

  await new Like(data).save();

  res.send(productId);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;
  const data = { userId, productId };

  const liked = await Like.findOne(data);
  if (!liked)
    return res
      .status(400)
      .send(
        "The product with the given id has already been removed from favourites."
      );

  await Like.findOneAndDelete(data);

  res.send(productId);
});

module.exports = router;
