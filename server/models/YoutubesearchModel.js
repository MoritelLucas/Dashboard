const mongoose = require("mongoose");

const youtubesearchSchema = new mongoose.Schema({
  kind: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true
  },
  title:  {
    type: String,
    required: true

  },
  description: {
    type: String,
    required: true
  },
  channelTitle: {
    type: String,
    required: true
  },
  thumbnails: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Search", youtubesearchSchema);