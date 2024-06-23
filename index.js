const express = require("express");
const dotenv = require("dotenv/config");
const URL = require("./Models/URL");
require("colors");

const app = express();
const urlRoute = require("./Routes/URL");
const connectToMongoDB = require("./connection");
const { redirectToGenerated } = require("./Controllers/URL");
app.use(express.json());
connectToMongoDB(process.env.DBCONNECTION)
  .then(() => console.log("Connected to database".bgGreen))
  .catch((error) => console.log(error));

app.use("/url", urlRoute);

app.get("/:shortId", redirectToGenerated);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`.yellow)
);
