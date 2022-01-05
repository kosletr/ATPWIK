const mongoose = require("mongoose");
const Joi = require('joi');

const Comment = mongoose.model(
    "comment",
    new mongoose.Schema({
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "product",
            required: true,
        },
        description: {
            type: String,
            minlength: 10,
            maxlength: 100,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
            required: true
        }
    })
);

const validateComment = (body) => {
    const schema = Joi.object({
        description: Joi.string().min(10).max(100).required(),
    });
    return schema.validate(body);
};


module.exports = { Comment, validateComment };
