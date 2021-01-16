const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const app = express();

/* Connect to MongoDB */
mongoose
  .connect(config.get("MongoURI"), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB."));

/* Allow Cross-Origin Requests (for frontend) */
app.use(cors());

/* Parse request bodies as JSON */
app.use(express.json());

/* Routes */
app.use("/", require("./routes/home"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/users"));
app.use("/api/users/likes", require("./routes/userLikes"));
app.use("/api/users/products", require("./routes/userProducts"));

/* Run server on given port */
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server on port ${port}.`));
