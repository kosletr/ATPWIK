const Joi = require("joi");

const validateProduct = (body) => {
  return Joi.object({
    title: Joi.string().min(1).max(20).required(),
    category: Joi.objectId().required(),
    price: Joi.number().min(0).precision(2).required(),
    shortDesc: Joi.string().min(10).max(100).required(),
    description: Joi.string().min(20).max(1000).required(),
    imageURL: Joi.string().min(10).max(1000).required().uri(),
  }).validate(body);
};

module.exports = validateProduct;

