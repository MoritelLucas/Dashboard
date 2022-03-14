const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  hour: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Time", locationSchema);