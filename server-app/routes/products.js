const router = require("express").Router();
const mongoose = require("mongoose");
const { Product } = require("../models/product");
const { Rate } = require("../models/rate");

/* Get all Products */

router.get("/", async (req, res) => {
  const products = await Product.find()
    .populate({ path: "category", select: "-__v" })
    .populate({ path: "owner", select: "username" })
    .select("-__v");
  return res.send(products);
});

router.get("/ratings/stats", async (req, res) => {
  const ratings = await getRatings();
  return res.send(ratings);
});

function getRatings() {
  return Rate.aggregate([
    { $group: { _id: "$productId", size: { $count: {} }, total: { $sum: "$rating" } } },
  ]);
}

// async function getProductRatingStats(productId) {
//   const productRatings = (await Rate.aggregate([
//     { $match: { productId: mongoose.Types.ObjectId(productId) } },
//     { $group: { _id: null, size: { $count: {} }, total: { $sum: "$rating" } } },
//     { $project: { _id: false } }
//   ]))[0];
// }

module.exports = router;
