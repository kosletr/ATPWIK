const mongoose = require("mongoose");

const Like = mongoose.model(
  "like",
  new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  })
);

function getAllProductFavoritesByUser(userId) {
  return Like.find({ userId }).distinct("productId");
}

function getProductFavoriteByUser(productId, userId) {
  return Like.findOne({ productId, userId });
}

function createFavoriteForUser(productId, userId) {
  return new Like({ productId, userId }).save();
}

function deleteFavoriteForUser(productId, userId) {
  return Like.findOneAndDelete({ productId, userId });
}


module.exports = {
  getAllProductFavoritesByUser,
  getProductFavoriteByUser,
  createFavoriteForUser,
  deleteFavoriteForUser
};
