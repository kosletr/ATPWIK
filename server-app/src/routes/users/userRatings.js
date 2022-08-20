const router = require("express").Router();
const auth = require("../../middleware/auth");
const validateRating = require("../../routes/validation/validateRating");
const db = require("../../startup/db");

/* Get/Add/Remove ratings to Products */

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;

  const userRatings = await db.getUserRatings(userId);
  return res.send(userRatings);
});

// Rating by product id
router.get("/:id", auth, async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  const rating = await db.getProductRatingByUser(productId, userId);
  if (!rating) return res.send({ rating: 0 });
  return res.send(rating);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateRating(req.body);
  if (error) return res.status(400).send(error.message);

  const productId = req.params.id;
  const userId = req.user._id;
  const { rating } = req.body;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  await db.updateProductRatingByUser(productId, userId, rating);

  return res.send(productId);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  const rated = await db.getProductRatingByUser(productId, userId);
  if (!rated) return res.status(400).send("The product with the given id has no rating already.");

  await db.deleteProductRatingByUser(productId, userId);

  return res.send(productId);
});

module.exports = router;
