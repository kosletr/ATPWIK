const Joi = require("joi");

const validateCategory = (body) => {
  return Joi.object({
    name: Joi.string().min(2).max(20).required(),
  }).validate(body);
};

module.exports = validateCategory;