const express = require("express");
const dotenv = require("dotenv/config");

require("colors");

const app = express();
const urlRoute = require("./Routes/URL");
const connectToMongoDB = require("./connection");
app.use(express.json());
connectToMongoDB(process.env.DBCONNECTION)
  .then(() => console.log("Connected to database".bgGreen))
  .catch((error) => console.log(error));

app.use("/url", urlRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`.yellow)
);
