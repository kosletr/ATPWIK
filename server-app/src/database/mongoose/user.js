const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 256,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const jwtPayload = {
    _id: this._id,
    username: this.username,
    firstname: this.firstname,
    lastname: this.lastname,
    isAdmin: this.isAdmin,
  };
  return jwt.sign(jwtPayload, config.get("jwtPrivateKey"));
};

const User = mongoose.model("user", userSchema);

function getAllUsers() {
  return User.find().select({ __v: 0 });
}

function getUserByUsername(username) {
  return User.findOne({ username });
}

function saveNewUser(userInfo) {
  return new User(userInfo).save();
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  saveNewUser
};
