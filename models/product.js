const joi = require("joi");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "product",
  new mongoose.Schema({
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
  })
);

const validateProduct = (body) => {
  const schema = joi.object({
    name: joi.string().min(2).max(10).required(),
    price: joi.number().min(0).required(),
  });
  return schema.validate(body);
};

module.exports = { Product, validateProduct };
