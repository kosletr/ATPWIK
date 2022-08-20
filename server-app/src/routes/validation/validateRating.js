const Joi = require("joi");

const validateRating = (body) => {
  return Joi.object({
    rating: Joi.number().min(1).max(5).required(),
  }).validate(body);
};

module.exports = validateRating;
