const express = require("express");
const app = express();
const config = require("config");

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Server on port ${port}.`));
