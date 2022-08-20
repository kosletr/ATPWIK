const mongoose = require("mongoose");

const Rate = mongoose.model(
  "rate",
  new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  })
);

function getUserRatings(userId) {
  return Rate.find({ userId }).select("-userId -__v -_id");
}

function getProductRatingByUser(productId, userId) {
  return Rate.findOne({ userId, productId }).select("rating -_id");
}


function getRatingStatsForProduct(productId) {
  return Rate.aggregate([
    { $match: { productId: mongoose.Types.ObjectId(productId) } },
    { $group: { _id: null, size: { $count: {} }, total: { $sum: "$rating" } } },
    { $project: { _id: false } }
  ]);
}

function getRatingStatsForAllProducts() {
  return Rate.aggregate([
    { $group: { _id: "$productId", size: { $count: {} }, total: { $sum: "$rating" } } },
  ]);
}

function updateProductRatingByUser(productId, userId, newRating) {
  return Rate.findOneAndUpdate(
    { productId, userId },
    { productId, userId, rating: newRating },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

function deleteProductRatingByUser(productId, userId) {
  return Rate.findOneAndDelete({ productId, userId });
}

module.exports = {
  getUserRatings,
  getProductRatingByUser,
  getRatingStatsForProduct,
  getRatingStatsForAllProducts,
  updateProductRatingByUser,
  deleteProductRatingByUser
};
