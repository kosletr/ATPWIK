const Joi = require("joi");

const validateUser = (body) => {
  return Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(4).max(50).required().email(),
    password: Joi.string().min(6).max(50).required(),
  }).validate(body);
};

module.exports = validateUser;