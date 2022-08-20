const mongoose = require("mongoose");

const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    shortDesc: {
      type: String,
      minlength: 10,
      maxlength: 100,
      required: true,
    },
    description: {
      type: String,
      minlength: 20,
      maxlength: 1000,
      required: true,
    },
    imageURL: {
      type: String,
      minlength: 10,
      maxlength: 1000,
      required: true,
    },
  })
);

function getAllProductsWithCategoryAndUsername() {
  return Product.find()
    .populate({ path: "category", select: "-__v" })
    .populate({ path: "owner", select: "username" })
    .select("-__v");
}

function getProductById(productId) {
  return Product.findById(productId).select("-__v");
}

function getProductByIdWithCategory(productId) {
  return Product.findById(productId)
    .populate({ path: "category", select: "-__v" })
    .select("-__v");
}

function deleteProductById(productId) {
  return Product.findByIdAndRemove(productId);
}

function updateProduct(productId, newProductInfo) {
  return Product.findOneAndUpdate({ _id: productId }, newProductInfo, { new: true }).select("-__v");
}

function createProduct(newProduct) {
  return new Product(newProduct).save()._id;
}

function getProductsByUser(userId) {
  return Product.find({ owner: userId })
    .populate({ path: "category", select: "-__v" })
    .populate({ path: "owner", select: "username" })
    .select("-__v");
}

module.exports = {
  getAllProductsWithCategoryAndUsername,
  getProductById,
  getProductsByUser,
  getProductByIdWithCategory,
  deleteProductById,
  updateProduct,
  createProduct,
};
