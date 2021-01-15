const joi = require("joi");
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
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
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
  const schema = joi.object({
    title: joi.string().min(1).max(20).required(),
    ownerId: joi.objectId(),
    categoryId: joi.objectId().required(),
    price: joi.number().min(0).precision(2).required(),
    shortDesc: joi.string().min(20).max(100).required(),
    description: joi.string().min(20).max(1000).required(),
    imageURL: joi.string().min(10).max(1000).required().uri(),
  });
  return schema.validate(body);
};

const validateProductId = (body) => {
  const productId = joi.object({
    productId: joi.objectId().required(),
  });

  return productId.validate(body);
};

module.exports = { Product, validateProduct, validateProductId };
