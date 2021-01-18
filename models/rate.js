const mongoose = require("mongoose");
const Joi = require("joi");

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

const validateRating = (body) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
  });
  return schema.validate(body);
};

module.exports = { Rate, validateRating };
