const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
  },
  username: {
    type: String,
    minlength: 4,
    maxlength: 100,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 100,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("user", userSchema);

const validateUser = (body) => {
  const user = joi.object({
    email: joi.string().min(4).max(100).required().email(),
    username: joi.string().min(4).max(100).required(),
    password: joi.string().min(6).max(100).required(),
  });
  return user.validate(body);
};

module.exports = { User, validateUser };
