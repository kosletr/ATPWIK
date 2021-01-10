const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/testApp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB."));

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/home"));
app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/users"));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server on port ${port}.`));
