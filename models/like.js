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

module.exports = { Like };