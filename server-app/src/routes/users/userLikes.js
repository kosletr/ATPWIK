const router = require("express").Router();
const auth = require("../../middleware/auth");
const db = require("../../startup/db");

/* Get/Add/Remove Products from/to favourites */

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  const likedProducts = await db.getAllProductFavoritesByUser(userId);
  return res.send(likedProducts);
});

router.get("/:id", auth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  const isLiked = await db.getProductFavoriteByUser(productId, userId);
  if (!isLiked) return res.send({ liked: false });
  return res.send({ liked: true });
});

router.post("/:id", auth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  const isLiked = await db.getProductFavoriteByUser(productId, userId);
  if (isLiked) return res.status(400).send("The product with the given id has already been added to favourites.");

  await db.createFavoriteForUser(productId, userId);
  return res.send(productId);
});

router.delete("/:id", auth, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id;

  const product = await db.getProductById(productId);
  if (!product) return res.status(404).send("The product with the given id was not found.");

  const isLiked = await db.getProductFavoriteByUser(productId, userId);
  if (!isLiked) return res.status(400).send("The product with the given id has already been removed from favourites.");

  await db.deleteFavoriteForUser(productId, userId);
  return res.send(productId);
});

module.exports = router;
