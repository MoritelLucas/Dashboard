const mongoose = require("mongoose");

const youtubechannelSchema = new mongoose.Schema({
  channelname: {
    type: String,
    required: true,
  },
  viewCount: {
    type: String,
    required: true,
  },
  subscriberCount: {
    type: String,
    required: true,
  },
  videoCount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Channel", youtubechannelSchema);