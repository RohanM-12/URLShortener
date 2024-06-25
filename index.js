const express = require("express");
const dotenv = require("dotenv/config");
const URL = require("./Models/URL");
const cors = require("cors");
require("colors");
const path = require("path");
const app = express();
const urlRoute = require("./Routes/URL");
const connectToMongoDB = require("./connection");
const { redirectToGenerated } = require("./Controllers/URL");

const corsOptions = {
  origin: "*", // Allow requests from all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
  credentials: true, // Allow sending cookies across origins
};

// middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToMongoDB(process.env.DBCONNECTION)
  .then(() => console.log("Connected to database".bgGreen))
  .catch((error) => console.log(error));

app.use("/url", urlRoute);

app.get("/:shortId", redirectToGenerated);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`.yellow)
);
