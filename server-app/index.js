const express = require("express");
const app = express();
const config = require("config");

require("./src/startup/cors")(app);
require("./src/startup/routes")(app);
require("./src/startup/db").connect();
require("./src/startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => console.log(`Server on port ${port}.`));

module.exports = server;
