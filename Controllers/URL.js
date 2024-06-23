const { nanoid } = require("nanoid");
const URL = require("../Models/URL");
async function generateNewShortURLController(req, res) {
  try {
    const shortId = nanoid(8);
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
