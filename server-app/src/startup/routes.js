const express = require("express");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api", require("../routes/home"));
    app.use("/api/auth", require("../routes/users/users"));
    app.use("/api/categories", require("../routes/products/categories"));
    app.use("/api/products", require("../routes/products/products"));
    app.use("/api/users/likes", require("../routes/users/userLikes"));
    app.use("/api/users/ratings", require("../routes/users/userRatings"));
    app.use("/api/users/comments", require("../routes/products/comments"));
    app.use("/api/users/products", require("../routes/users/userProducts"));
};
