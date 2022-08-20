const Joi = require('joi');

const validateComment = (body) => {
    return Joi.object({
        description: Joi.string().min(10).max(100).required(),
    }).validate(body);
};

module.exports = validateComment;
