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
async function redirectToGenerated(req, res) {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
}

async function getUrlAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortID: shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  generateNewShortURLController,
  redirectToGenerated,
  getUrlAnalytics,
};
