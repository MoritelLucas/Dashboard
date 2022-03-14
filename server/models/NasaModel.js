const mongoose = require("mongoose");

const redditSchema = new mongoose.Schema({
  earth_date: {
    type: String,
    required: true,
  },
  img_src: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Nasa", redditSchema);