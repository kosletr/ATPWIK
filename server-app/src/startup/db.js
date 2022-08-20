const { connect, disconnect } = require("../database/mongoose/init");

const category = require("../database/mongoose/category");
const comment = require("../database/mongoose/comment");
const like = require("../database/mongoose/like");
const product = require("../database/mongoose/product");
const rate = require("../database/mongoose/rate");
const user = require("../database/mongoose/user");

module.exports = {
    connect, disconnect,
    ...category, ...comment, ...like, ...product, ...rate, ...user
};
