const router = require("express").Router();
const { Product } = require("../models/product");

/* Get all Products */

router.get("/", async (req, res) => {
  const products = await Product.find()
    .populate({ path: "category", select: "-__v" })
    .populate({ path: "owner", select: "username" })
    .select("-__v");
  return res.send(products);
});

module.exports = router;
