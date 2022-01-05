const router = require("express").Router();
const { Product } = require("../models/product");
const { Rate } = require("../models/rate");

router.get("/", async (req, res) => {
  // #swagger.tags = ['Products']
  const products = await Product.find()
    .populate({ path: "category", select: "-__v" })
    .populate({ path: "owner", select: "username" })
    .select("-__v");
  return res.send(products);
});

router.get("/ratings/stats", async (req, res) => {
  // #swagger.tags = ['Products', 'Ratings']
  const ratings = await Rate.aggregate([
    {
      $group: {
        _id: "$productId",
        size: { $count: {} },
        total: { $sum: "$rating" }
      }
    },
  ]);
  return res.send(ratings);
});

// async function getProductRatingStats(productId) {
//   const productRatings = (await Rate.aggregate([
//     { $match: { productId: mongoose.Types.ObjectId(productId) } },
//     { $group: { _id: null, size: { $count: {} }, total: { $sum: "$rating" } } },
//     { $project: { _id: false } }
//   ]))[0];
// }

module.exports = router;
