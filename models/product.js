const Joi = require("joi");
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
      minlength: 20,
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

const validateProduct = (body) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(20).required(),
    category: Joi.objectId().required(),
    price: Joi.number().min(0).precision(2).required(),
    shortDesc: Joi.string().min(20).max(100).required(),
    description: Joi.string().min(20).max(1000).required(),
    imageURL: Joi.string().min(10).max(1000).required().uri(),
  });
  return schema.validate(body);
};

module.exports = { Product, validateProduct };
