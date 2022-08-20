const mongoose = require("mongoose");
const config = require("config");

function connect() {
    return mongoose.connect(config.get("MongoURI"), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => console.log("Connected to MongoDB."));
}

function disconnect() {
    return mongoose.disconnect();
}

module.exports = { connect, disconnect };
