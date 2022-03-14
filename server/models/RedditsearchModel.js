const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const redditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
  subscribers: {
    type: String,
    required: true,
  },
  public_description: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  banner_img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Redditsearch", redditSchema);