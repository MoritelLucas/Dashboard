const mongoose = require("mongoose");

const redditSchema = new mongoose.Schema({
  reddit: {
    type: [],
    required: true,
  },
});

module.exports = mongoose.model("Reddit", redditSchema);