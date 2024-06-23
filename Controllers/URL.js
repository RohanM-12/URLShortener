const shortId = require("shortid");
const URL = require("../Models/URL");
const shortid = require("shortid");
async function generateNewShortURLController(req, res) {
  try {
    const shortId = shortid();
    const { redirectURL } = req.body;
    if (!redirectURL) {
      return res.status(400).json({
        message: "URL is required",
      });
    }
    await URL.create({
      shortID: shortId,
      redirectURL: redirectURL,
      visitHistory: [],
    });
    return res.status(201).json({
      id: shortId,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
}

module.exports = { generateNewShortURLController };
