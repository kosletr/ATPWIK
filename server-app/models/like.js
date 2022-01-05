const mongoose = require("mongoose");

const Like = mongoose.model(
  "like",
  new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  })
);

const validateLike = (body) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    productId: Joi.objectId().required(),
  });
  return schema.validate(body);
};

module.exports = { Like, validateLike };
