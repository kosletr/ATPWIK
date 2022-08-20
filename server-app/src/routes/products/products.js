const router = require("express").Router();
const db = require("../../startup/db");

router.get("/", async (req, res) => {
  const products = await db.getAllProductsWithCategoryAndUsername();
  return res.send(products);
});

router.get("/ratings/stats", async (req, res) => {
  const ratings = await db.getRatingStatsForAllProducts();
  return res.send(ratings);
});

router.get("/ratings/stats/:productId", async (req, res) => {
  const { productId } = req.params;

  const ratings = await db.getRatingStatsForProduct(productId);
  return res.send(ratings[0]);
});

module.exports = router;
