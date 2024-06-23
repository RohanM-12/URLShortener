const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: {
      timeStamp: { type: Number },
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", URLSchema);
module.exports = URL;
