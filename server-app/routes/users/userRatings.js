const router = require("express").Router();
const { Product } = require("../../models/product");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { Rate, validateRating } = require("../../models/rate");

/* Get/Add/Remove ratings to Products */

router.get("/", auth, async (req, res) => {
  const rating = await Rate.find({ userId: req.user._id }).select(
    "-userId -__v -_id"
  );
  res.send(rating);
});

// Rating by product id
router.get("/:id", auth, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;

  const rating = await Rate.findOne({ userId, productId }).select(
    "rating -_id"
  );
  if (!rating) return res.send({ rating: 0 });

  res.send(rating);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateRating(req.body);
  if (error) return res.status(400).send(error.message);

  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;
  const data = { userId, productId };
  const rating = req.body.rating;

  await Rate.findOneAndUpdate(
    data,
    { ...data, rating },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.send(productId);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  const userId = req.user._id;
  const data = { userId, productId };

  const rated = await Rate.findOne(data);
  if (!rated)
    return res
      .status(400)
      .send("The product with the given id has no rating already.");

  await Rate.findOneAndDelete(data);

  res.send(productId);
});

module.exports = router;
