const mongoose = require("mongoose");
const config = require("config");

module.exports = () => mongoose.connect(config.get("MongoURI"), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("Connected to MongoDB."));
