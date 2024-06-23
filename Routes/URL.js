const express = require("express");
const { generateNewShortURLController } = require("../Controllers/URL");

const URLRoutes = express.Router();

URLRoutes.post("/", generateNewShortURLController);

module.exports = URLRoutes;
