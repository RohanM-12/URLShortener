const express = require("express");
const {
  generateNewShortURLController,
  getUrlAnalytics,
} = require("../Controllers/URL");

const URLRoutes = express.Router();

URLRoutes.post("/", generateNewShortURLController);
URLRoutes.get("/analytics/:shortId", getUrlAnalytics);
module.exports = URLRoutes;
