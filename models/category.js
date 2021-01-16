const Joi = require("joi");
const mongoose = require("mongoose");

const Category = mongoose.model(
  "category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
    },
  })
);

const validateCategory = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(10).required(),
  });
  return schema.validate(body);
};

module.exports = { Category, validateCategory };
