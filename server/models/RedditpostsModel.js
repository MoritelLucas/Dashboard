const mongoose = require("mongoose");

const redditSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  ups: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Redditposts", redditSchema);