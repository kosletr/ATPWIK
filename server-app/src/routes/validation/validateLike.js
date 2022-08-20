const Joi = require('joi');

const validateLike = (body) => {
  return Joi.object({
    userId: Joi.objectId().required(),
    productId: Joi.objectId().required(),
  }).validate(body);
};

module.exports = validateLike;
