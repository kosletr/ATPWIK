const router = require("express").Router();
const { Product, validateProduct } = require("../models/product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const products = await Product.find().select({ __v: 0 });
  return res.send(products);
});

router.post("/", [auth, admin], async (req, res) => {
  const { body } = req;
  const { error } = validateProduct(body);
  if (error) return res.status(400).send(error.message);

  const product = await new Product(body).save();

  res.send(product._id);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).select({ __v: 0 });
  if (!product)
    return res.status(404).send("The product with the given id was not found.");

  res.send(product);
});

module.exports = router;
